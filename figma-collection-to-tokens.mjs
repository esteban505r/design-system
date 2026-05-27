// Shared: Figma Tokens Studio collection → nested tokens/ tree (DTCG).

import fs from 'fs';
import path from 'path';
import { FIGMA_TO_TOKEN_PATH, figmaTokenToDtcg } from './token-name-map.mjs';

const DEFAULT_COLLECTION = 'Global/Mode 1';

/**
 * Unwrap mistaken double nesting (`Global/Mode 1/Global/Mode 1`) from bad round-trips.
 * @param {Record<string, unknown>} collection
 * @param {string} collectionName
 */
function unwrapNestedCollection(collection, collectionName) {
  const keys = Object.keys(collection).filter((k) => !k.startsWith('$'));
  if (
    keys.length === 1 &&
    typeof collection[keys[0]] === 'object' &&
    collection[keys[0]] !== null &&
    Object.keys(/** @type {Record<string, unknown>} */ (collection[keys[0]])).some(
      (k) => FIGMA_TO_TOKEN_PATH[k],
    )
  ) {
    return {
      collectionName: keys[0],
      collection: /** @type {Record<string, unknown>} */ (collection[keys[0]]),
    };
  }
  return { collectionName, collection };
}
import { setTokenAtPath, writeTokensFromTree } from './token-writer.mjs';

/**
 * @param {Record<string, unknown>} source  Full Figma export or `{ "Global/Mode 1": { ... } }`
 * @param {{ collectionName?: string }} [options]
 */
export function resolveFigmaCollection(source, options = {}) {
  if (!source || typeof source !== 'object') {
    throw new Error('Invalid Figma token source');
  }

  /** @type {string | undefined} */
  let collectionName = options.collectionName || process.env.FIGMA_COLLECTION;
  /** @type {Record<string, unknown> | undefined} */
  let collection;

  if (!collectionName) {
    const keys = Object.keys(source).filter((k) => !k.startsWith('$'));
    if (keys.length === 1 && typeof source[keys[0]] === 'object') {
      collectionName = keys[0];
      collection = /** @type {Record<string, unknown>} */ (source[collectionName]);
    } else if (keys.some((k) => FIGMA_TO_TOKEN_PATH[k])) {
      collectionName = options.collectionName || 'Global/Mode 1';
      collection = /** @type {Record<string, unknown>} */ (source);
    } else if (keys.length > 0) {
      collectionName = keys[0];
      collection = /** @type {Record<string, unknown>} */ (source[collectionName]);
    }
  } else {
    collection = /** @type {Record<string, unknown>} */ (source[collectionName]);
  }

  if (!collection || typeof collection !== 'object') {
    throw new Error(
      `Token set not found (expected "Global/Mode 1" or flat Tokens Studio names like primary-color)`,
    );
  }

  const unwrapped = unwrapNestedCollection(
    /** @type {Record<string, unknown>} */ (collection),
    collectionName,
  );
  if (!unwrapped.collectionName.includes('Mode')) {
    unwrapped.collectionName = DEFAULT_COLLECTION;
  }

  return {
    collectionName: unwrapped.collectionName,
    collection: unwrapped.collection,
    metadata: source.$metadata,
  };
}

/**
 * @param {Record<string, { $value: unknown, $type?: string }>} collection
 */
export function buildTokenTreeFromFigmaCollection(collection) {
  /** @type {Record<string, unknown>} */
  const tree = {};
  let mapped = 0;
  let skipped = 0;

  for (const [figmaName, figmaToken] of Object.entries(collection)) {
    if (!figmaToken || typeof figmaToken !== 'object' || !('$value' in figmaToken)) continue;

    const tokenPath = FIGMA_TO_TOKEN_PATH[figmaName];
    if (!tokenPath) {
      console.warn(`⚠️  No mapping for Figma token "${figmaName}" — skipped`);
      skipped++;
      continue;
    }

    const dtcg = figmaTokenToDtcg(figmaName, figmaToken);
    setTokenAtPath(tree, tokenPath, dtcg);
    mapped++;
  }

  return { tree, mapped, skipped };
}

/**
 * @param {Record<string, unknown>} source
 * @param {string} outputDir
 * @param {{ collectionName?: string, label?: string }} [options]
 */
export function writeTokensFromFigmaSource(source, outputDir = 'tokens', options = {}) {
  const { collectionName, collection } = resolveFigmaCollection(source, options);
  const { tree, mapped, skipped } = buildTokenTreeFromFigmaCollection(
    /** @type {Record<string, { $value: unknown, $type?: string }>} */ (collection),
  );

  const label = options.label || collectionName;
  console.log(`📄 ${label} (${mapped} mapped, ${skipped} skipped)\n`);

  const { filesWritten } = writeTokensFromTree(tree, outputDir);
  return { collectionName, mapped, skipped, filesWritten };
}

/** @param {string} version */
export function syncPackageJsonVersion(version) {
  const pkgPath = path.resolve('package.json');
  if (!fs.existsSync(pkgPath)) return;
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  if (pkg.version === version) {
    console.log(`📦 package.json version ${version} (already in sync)\n`);
    return;
  }
  pkg.version = version;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`📦 package.json → version ${version}\n`);
}

export function copyFigmaJsonToDist(inputFile) {
  const dest = path.resolve('dist/figma/tokens.json');
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(path.resolve(inputFile), dest);
  console.log(`  ✔ ${path.relative(process.cwd(), dest)} (copy of SSOT)`);
}

/**
 * @param {Record<string, unknown>} source  Full Figma export object
 * @param {string} outFile
 */
export function writeFigmaTokensJson(source, outFile) {
  const outPath = path.resolve(outFile);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(source, null, 2) + '\n');
  return outPath;
}
