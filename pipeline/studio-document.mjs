// Tokens Studio single-file document.
//
// The plugin's free Git sync writes one JSON file. Multi-file sync (a folder
// of JSON files, one per token set) is a Pro feature, and this repo's DTCG
// tree is a different folder layout again — Style Dictionary wants
// core/tokens/** and brands/<id>/tokens/<mode>/**. Those folders stay as a
// generated build input. The file Token Studio pushes and pulls is tokens.json
// at the repo root: every token set lives in that one document, and a theme
// enables "global" plus exactly one brand.

import fs from 'node:fs';
import path from 'node:path';
import {
  CORE_TOKENS_DIR,
  REPO_ROOT,
  brandTokensDir,
  loadAllBrands,
  splitCoreAndBrand,
} from './brands.mjs';
import { pruneUnwrittenTokenFiles, writeTokensFromTree } from './token-writer.mjs';

export const STUDIO_FILE = path.join(REPO_ROOT, 'tokens.json');

const GLOBAL_SET = 'global';
const PRIMITIVE_COLOR_SET = 'Color / Primitive/Value';

/**
 * Deep-merge DTCG JSON files under `dir` into one tree.
 * Leaves (`$value`) replace; everything else merges. File order is sorted so
 * the result does not depend on directory iteration order.
 *
 * @param {string} dir
 * @returns {Record<string, unknown>}
 */
export function loadTokenTree(dir) {
  /** @type {Record<string, unknown>} */
  const tree = {};
  if (!fs.existsSync(dir)) return tree;
  for (const file of tokenJsonFiles(dir)) {
    mergeTrees(tree, JSON.parse(fs.readFileSync(file, 'utf-8')));
  }
  return tree;
}

/**
 * @param {import('./brands.mjs').Brand[]} [brands]
 */
export function buildStudioDocument(brands = loadAllBrands()) {
  /** @type {Record<string, unknown>} */
  const doc = {};
  /** @type {string[]} */
  const order = [GLOBAL_SET];
  doc[GLOBAL_SET] = loadTokenTree(CORE_TOKENS_DIR);

  for (const brand of brands) {
    order.push(brand.id);
    doc[brand.id] = loadTokenTree(brandTokensDir(brand, 'light'));
  }

  doc.$themes = brands.map((brand) => ({
    id: `${brand.id}-light`,
    name: `${brand.name} Light`,
    selectedTokenSets: Object.fromEntries(
      order.map((setName) => [
        setName,
        setName === GLOBAL_SET || setName === brand.id ? 'enabled' : 'disabled',
      ]),
    ),
    $figmaStyleReferences: {},
  }));
  doc.$metadata = { tokenSetOrder: order };
  return doc;
}

/**
 * @param {Record<string, unknown>} [doc]
 * @param {string} [file]
 */
export function writeStudioDocument(doc = buildStudioDocument(), file = STUDIO_FILE) {
  fs.writeFileSync(file, JSON.stringify(doc, null, 2) + '\n');
  return file;
}

/**
 * Expand a Tokens Studio document into the folder tree Style Dictionary reads.
 *
 * @param {Record<string, unknown>} doc
 * @param {{
 *   coreDir?: string,
 *   brandDir?: (brand: import('./brands.mjs').Brand) => string,
 *   brands?: import('./brands.mjs').Brand[],
 * }} [dest]
 */
export function applyStudioDocument(doc, dest = {}) {
  if (!doc || typeof doc !== 'object') {
    throw new Error('tokens.json is not a JSON object');
  }

  const brands = dest.brands ?? loadAllBrands();
  const known = new Set(brands.map((brand) => brand.id));
  const sets = Object.keys(doc).filter((key) => !key.startsWith('$'));
  // Tokens Studio also stores each Figma variable collection (`Color / Semantic/Multibrand`).
  // Those stay in the file the plugin pushes. The brand sets are what we expand.
  const figmaCollections = sets.filter((key) => key.includes(' / '));
  const unknown = sets.filter(
    (key) => key !== GLOBAL_SET && !known.has(key) && !figmaCollections.includes(key),
  );
  if (unknown.length > 0) {
    throw new Error(
      `tokens.json has token set(s) with no brand: ${unknown.join(', ')}.\n` +
        `   Known sets: ${GLOBAL_SET}, ${[...known].join(', ')}.\n` +
        `   Add a brands/<id>/brand.json for a new brand, or rename the set to a brand id.`,
    );
  }
  if (!sets.includes(GLOBAL_SET)) {
    throw new Error(
      `tokens.json is missing the "${GLOBAL_SET}" token set.\n` +
        `   Shared scales (spacing, radius, stroke, z-index, motion) belong there.`,
    );
  }

  const globalTree = asTree(doc[GLOBAL_SET], GLOBAL_SET);
  normalizeStudioTypes(globalTree);
  // Editing a Figma color variable updates `Color / Primitive/Value` on push.
  // The `global` set is a second copy and can stay on the previous hex.
  // Take the primitive collection's $value in memory. Do not write tokens.json.
  applyPrimitiveColorValues(globalTree, doc[PRIMITIVE_COLOR_SET]);
  // Primitives live in global. Multibrand, Ésika, L'Bel and Cyzone are the
  // Figma modes; a sub-brand set only carries what that mode overrides.
  const coreDir = dest.coreDir ?? CORE_TOKENS_DIR;
  const coreWrite = writeTokensFromTree(globalTree, coreDir);
  pruneUnwrittenTokenFiles(coreDir, coreWrite.writtenPaths);
  let filesWritten = coreWrite.filesWritten;

  for (const brand of brands) {
    if (!Object.prototype.hasOwnProperty.call(doc, brand.id)) {
      throw new Error(
        `tokens.json is missing the "${brand.id}" token set.\n` +
          `   $metadata.tokenSetOrder must list every brand next to "${GLOBAL_SET}".`,
      );
    }
    const tree = asTree(doc[brand.id], brand.id);
    normalizeStudioTypes(tree);
    const split = splitCoreAndBrand(tree);
    const shared = Object.keys(split.core);
    if (shared.length > 0) {
      throw new Error(
        `Token set "${brand.id}" contains shared scales (${shared.join(', ')}).\n` +
          `   Move them into "${GLOBAL_SET}". A theme enables "${GLOBAL_SET}" together with one brand.`,
      );
    }
    const brandDir = dest.brandDir ? dest.brandDir(brand) : brandTokensDir(brand, 'light');
    const brandWrite = writeTokensFromTree(split.brand, brandDir);
    pruneUnwrittenTokenFiles(brandDir, brandWrite.writtenPaths);
    filesWritten += brandWrite.filesWritten;
  }

  return { filesWritten, sets: [GLOBAL_SET, ...brands.map((brand) => brand.id)] };
}

/**
 * @param {string} dir
 * @returns {string[]}
 */
function tokenJsonFiles(dir) {
  /** @type {string[]} */
  const found = [];
  const walk = (sub) => {
    for (const entry of fs.readdirSync(path.join(dir, sub), { withFileTypes: true })) {
      const rel = path.join(sub, entry.name);
      if (entry.isDirectory()) walk(rel);
      else if (entry.name.endsWith('.json')) found.push(path.join(dir, rel));
    }
  };
  walk('');
  return found.sort();
}

/**
 * @param {Record<string, unknown>} into
 * @param {unknown} extra
 */
function mergeTrees(into, extra) {
  if (!extra || typeof extra !== 'object' || Array.isArray(extra)) return;
  for (const [key, value] of Object.entries(extra)) {
    if (isBranch(value) && isBranch(into[key])) {
      mergeTrees(/** @type {Record<string, unknown>} */ (into[key]), value);
    } else if (isBranch(value)) {
      into[key] = {};
      mergeTrees(/** @type {Record<string, unknown>} */ (into[key]), value);
    } else {
      into[key] = value;
    }
  }
}

/**
 * @param {unknown} value
 */
function isBranch(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value) && !('$value' in value);
}

/**
 * @param {unknown} value
 * @param {string} setName
 * @returns {Record<string, unknown>}
 */
function asTree(value, setName) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`Token set "${setName}" must be an object of tokens`);
  }
  return /** @type {Record<string, unknown>} */ (value);
}

/**
 * Copy `$value` from the Figma color-primitive collection onto the matching
 * token under `global.color`. Paths that exist on only one side are left alone.
 * Mutates `globalTree` only.
 *
 * @param {Record<string, unknown>} globalTree
 * @param {unknown} primitiveSet
 */
export function applyPrimitiveColorValues(globalTree, primitiveSet) {
  const color = globalTree?.color;
  if (!color || typeof color !== 'object' || !primitiveSet || typeof primitiveSet !== 'object') {
    return;
  }
  overlayTokenValues(
    /** @type {Record<string, unknown>} */ (color),
    /** @type {Record<string, unknown>} */ (primitiveSet),
  );
}

/**
 * @param {Record<string, unknown>} target
 * @param {Record<string, unknown>} source
 */
function overlayTokenValues(target, source) {
  if ('$value' in source && '$value' in target) {
    target.$value = source.$value;
    return;
  }
  for (const [key, value] of Object.entries(source)) {
    if (key.startsWith('$') || !value || typeof value !== 'object') continue;
    const next = target[key];
    if (!next || typeof next !== 'object') continue;
    overlayTokenValues(
      /** @type {Record<string, unknown>} */ (next),
      /** @type {Record<string, unknown>} */ (value),
    );
  }
}

/** Tokens Studio writes the plural DTCG names. Style Dictionary expects the singular ones. */
const STUDIO_TYPE_ALIASES = {
  fontSizes: 'fontSize',
  fontFamilies: 'fontFamily',
  fontWeights: 'fontWeight',
};

/**
 * @param {unknown} node
 */
function normalizeStudioTypes(node) {
  if (!node || typeof node !== 'object') return;
  if (typeof node.$type === 'string' && STUDIO_TYPE_ALIASES[node.$type]) {
    node.$type = STUDIO_TYPE_ALIASES[node.$type];
  }
  for (const [key, value] of Object.entries(node)) {
    if (!key.startsWith('$')) normalizeStudioTypes(value);
  }
}
