// Brand discovery and the brand × mode token resolution rules.
//
// A token's *identity* is its path (`color.bg.brand`); its *value* is a
// function of (brand, mode). Layers, later wins:
//
//   1. core/tokens/                          — one value for every brand/mode
//   2. brands/<brand>/tokens/<mode>/         — that brand's values for that mode
//
// Everything downstream (Style Dictionary, the Figma ingest, Gradle) asks this
// module where files live, so adding a brand never means editing a path literal.

import fs from 'node:fs';
import path from 'node:path';

export const REPO_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');

export const BRANDS_DIR = path.join(REPO_ROOT, 'brands');
export const CORE_TOKENS_DIR = path.join(REPO_ROOT, 'core', 'tokens');

/**
 * Categories that belong to the design system rather than to any one brand.
 * These are geometry and timing — a rebrand changes colour and type, not the
 * spacing scale. They live in core/tokens/ and are shared by every brand.
 *
 * `duration`/`easing` appear alongside `motion` because token-writer's fileMap
 * accepts both the nested (`motion.duration`) and flat (`duration`) shapes.
 */
export const CORE_CATEGORIES = new Set([
  'spacing',
  'radius',
  'stroke',
  'z-index',
  'motion',
  'duration',
  'easing',
]);

/**
 * @typedef {object} Brand
 * @property {string} id
 * @property {string} name
 * @property {string} artifactId    Maven artifact for the Android token module
 * @property {string} npmSubpath    Subpath under the web package's exports
 * @property {boolean} ownsCore     May this brand's Figma export rewrite core/?
 * @property {string[]} modes       Declared modes; `light` is always required
 * @property {string} dir           Absolute path to brands/<id>/
 * @property {Array<{path: string, owner: string, reason: string, review: string}>} extensions
 */

/** @returns {string[]} brand ids, sorted, so output order never depends on the filesystem. */
export function listBrandIds() {
  if (!fs.existsSync(BRANDS_DIR)) return [];
  return fs
    .readdirSync(BRANDS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory() && fs.existsSync(path.join(BRANDS_DIR, e.name, 'brand.json')))
    .map((e) => e.name)
    .sort();
}

/**
 * @param {string} id
 * @returns {Brand}
 */
export function loadBrand(id) {
  const dir = path.join(BRANDS_DIR, id);
  const manifest = path.join(dir, 'brand.json');
  if (!fs.existsSync(manifest)) {
    const known = listBrandIds();
    throw new Error(
      `Unknown brand "${id}" — no ${path.relative(REPO_ROOT, manifest)}.\n` +
        `Known brands: ${known.length ? known.join(', ') : '(none)'}`,
    );
  }
  const raw = JSON.parse(fs.readFileSync(manifest, 'utf-8'));
  if (raw.id !== id) {
    throw new Error(`brands/${id}/brand.json declares id "${raw.id}" — it must match its directory`);
  }
  const modes = raw.modes?.length ? raw.modes : ['light'];
  if (!modes.includes('light')) {
    throw new Error(`Brand "${id}" must declare a "light" mode — it is the fallback for every mode`);
  }
  return {
    id,
    name: raw.name ?? id,
    artifactId: raw.artifactId ?? `tokens-android-${id}`,
    npmSubpath: raw.npmSubpath ?? id,
    // Defaults namespace each new brand apart; Belcorp pins the already-published
    // values in its brand.json so existing consumers keep compiling.
    androidNamespace: raw.androidNamespace ?? `com.estebanruano.tokens.${id}`,
    composePackage: raw.composePackage ?? `com.estebanruano.designtokens.${id}`,
    ownsCore: raw.ownsCore === true,
    modes,
    dir,
    extensions: raw.extensions ?? [],
  };
}

/** @returns {Brand[]} */
export function loadAllBrands() {
  return listBrandIds().map(loadBrand);
}

/**
 * The single brand a command should act on. Explicit `--brand`/`BRAND` wins;
 * otherwise, if exactly one brand exists, use it. Ambiguity is an error rather
 * than a guess — silently building the wrong brand is worse than stopping.
 *
 * @param {string[]} [argv]
 */
export function resolveBrandArg(argv = process.argv.slice(2)) {
  const flag = argv.indexOf('--brand');
  const requested = flag !== -1 ? argv[flag + 1] : process.env.BRAND?.trim();
  if (requested) return loadBrand(requested);

  const ids = listBrandIds();
  if (ids.length === 1) return loadBrand(ids[0]);
  throw new Error(
    ids.length === 0
      ? 'No brands found under brands/ — each needs a brand.json'
      : `Multiple brands (${ids.join(', ')}) — pass --brand <id> or set BRAND`,
  );
}

/** Absolute path to a brand's token directory for one mode. */
export function brandTokensDir(brand, mode) {
  return path.join(brand.dir, 'tokens', mode);
}

/** Absolute path to a brand's Figma export (its SSOT). */
export function brandFigmaFile(brand) {
  return path.join(brand.dir, 'figma', 'tokens.json');
}

/** Where built artifacts for a brand go. */
export function brandDistDir(brand) {
  return path.join(REPO_ROOT, 'dist', brand.id);
}

/** Every *.json under `dir`, as paths relative to it. */
function tokenFilesUnder(dir) {
  if (!fs.existsSync(dir)) return [];
  /** @type {string[]} */ const found = [];
  const walk = (sub) => {
    for (const entry of fs.readdirSync(path.join(dir, sub), { withFileTypes: true })) {
      const rel = path.join(sub, entry.name);
      if (entry.isDirectory()) walk(rel);
      else if (entry.name.endsWith('.json')) found.push(rel);
    }
  };
  walk('');
  return found;
}

/**
 * Style Dictionary sources for one brand × mode: an explicit file list, not a
 * glob per layer.
 *
 * The order matters twice over. Style Dictionary merges later files over
 * earlier ones, so a mode's own file must come after the base it overrides —
 * and it emits tokens in source order, so the file list also fixes the order of
 * every generated artifact.
 *
 * Sorting by each file's path *relative to its layer root* is what keeps those
 * two needs from fighting: `spacing/spacing.json` sorts the same whether it
 * lives in core/ or in a brand, so moving a category between roots cannot
 * reshuffle every output file. The layer index only breaks ties, which is
 * exactly where override precedence belongs.
 *
 * `light` sits beneath every non-light mode, so a dark file need only carry the
 * tokens that actually differ instead of restating the whole set.
 *
 * @param {Brand} brand
 * @param {string} mode
 * @returns {string[]} absolute file paths, in merge order
 */
export function tokenSources(brand, mode = 'light') {
  const roots = [CORE_TOKENS_DIR];
  if (mode !== 'light') roots.push(brandTokensDir(brand, 'light'));
  roots.push(brandTokensDir(brand, mode));

  return roots
    .flatMap((root, layer) => tokenFilesUnder(root).map((rel) => ({ root, rel, layer })))
    .sort((a, b) => a.rel.localeCompare(b.rel) || a.layer - b.layer)
    .map(({ root, rel }) => path.join(root, rel));
}

/**
 * Split a category-keyed token tree into the part core/ owns and the part the
 * brand owns, so one Figma export can feed both roots.
 *
 * @param {Record<string, unknown>} tree
 * @returns {{ core: Record<string, unknown>, brand: Record<string, unknown> }}
 */
export function splitCoreAndBrand(tree) {
  /** @type {Record<string, unknown>} */ const core = {};
  /** @type {Record<string, unknown>} */ const brand = {};
  for (const [category, data] of Object.entries(tree)) {
    (CORE_CATEGORIES.has(category) ? core : brand)[category] = data;
  }
  return { core, brand };
}
