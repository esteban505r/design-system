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
import { splitCoreAndBrand } from './brands.mjs';

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
 * A Figma token with no entry in FIGMA_TO_TOKEN_PATH used to be dropped with a
 * console warning, so a designer who added a variable in Figma saw it silently
 * vanish from every platform. Unmapped names are now a hard failure; pass
 * `allowUnmapped` (CLI: --allow-unmapped) only while migrating.
 *
 * @param {Record<string, { $value: unknown, $type?: string }>} collection
 * @param {{ allowUnmapped?: boolean }} [options]
 */
export function buildTokenTreeFromFigmaCollection(collection, options = {}) {
  /** @type {Record<string, unknown>} */
  const tree = {};
  let mapped = 0;
  /** @type {string[]} */
  const unmapped = [];

  for (const [figmaName, figmaToken] of Object.entries(collection)) {
    if (!figmaToken || typeof figmaToken !== 'object' || !('$value' in figmaToken)) continue;

    const tokenPath = FIGMA_TO_TOKEN_PATH[figmaName];
    if (!tokenPath) {
      unmapped.push(figmaName);
      continue;
    }

    const dtcg = figmaTokenToDtcg(figmaName, figmaToken);
    setTokenAtPath(tree, tokenPath, dtcg);
    mapped++;
  }

  if (unmapped.length > 0) {
    if (!options.allowUnmapped) {
      throw new Error(
        `${unmapped.length} Figma token(s) have no mapping and would be dropped:\n` +
          unmapped.map((n) => `  • ${n}`).join('\n') +
          `\n\nAdd each to FIGMA_TO_TOKEN_PATH in token-name-map.mjs, or re-run with` +
          ` --allow-unmapped to skip them deliberately.`,
      );
    }
    for (const name of unmapped) {
      console.warn(`⚠️  No mapping for Figma token "${name}" — skipped`);
    }
  }

  return { tree, mapped, skipped: unmapped.length, unmapped };
}

/**
 * One Figma export feeds two roots: the brand-agnostic scales land in
 * `core/tokens/`, everything else in `brands/<id>/tokens/<mode>/`.
 *
 * Only a brand with `ownsCore` may rewrite core/. For any other brand a
 * divergence is a hard error: two brands silently disagreeing on the spacing
 * scale is precisely the drift core/ exists to prevent, and last-writer-wins
 * would make the built output depend on brand build order.
 *
 * @param {Record<string, unknown>} source
 * @param {string | { coreDir: string, brandDir: string, ownsCore?: boolean }} dest
 *   A plain string keeps the old single-root behaviour (used by the tests).
 * @param {{ collectionName?: string, label?: string, allowUnmapped?: boolean }} [options]
 */
export function writeTokensFromFigmaSource(source, dest = 'tokens', options = {}) {
  const { collectionName, collection } = resolveFigmaCollection(source, options);
  const { tree, mapped, skipped } = buildTokenTreeFromFigmaCollection(
    /** @type {Record<string, { $value: unknown, $type?: string }>} */ (collection),
    { allowUnmapped: options.allowUnmapped },
  );

  const label = options.label || collectionName;
  console.log(`📄 ${label} (${mapped} mapped, ${skipped} skipped)\n`);

  if (typeof dest === 'string') {
    const { filesWritten } = writeTokensFromTree(tree, dest);
    return { collectionName, mapped, skipped, filesWritten };
  }

  const { core, brand } = splitCoreAndBrand(tree);
  let filesWritten = 0;

  if (dest.ownsCore) {
    filesWritten += writeTokensFromTree(core, dest.coreDir).filesWritten;
  } else {
    assertCoreUnchanged(core, dest.coreDir);
  }
  filesWritten += writeTokensFromTree(brand, dest.brandDir).filesWritten;

  return { collectionName, mapped, skipped, filesWritten };
}

/**
 * Fail if a non-core-owning brand's export disagrees with core/.
 *
 * @param {Record<string, unknown>} core  core-category tree from this brand
 * @param {string} coreDir
 */
function assertCoreUnchanged(core, coreDir) {
  const { writtenPaths } = writeTokensFromTree(core, path.join(coreDir, '.check'));
  const differences = [];
  for (const written of writtenPaths) {
    const actual = written.replace(`${path.sep}.check${path.sep}`, path.sep);
    const got = fs.readFileSync(written, 'utf-8');
    const want = fs.existsSync(actual) ? fs.readFileSync(actual, 'utf-8') : null;
    if (got !== want) differences.push(path.relative(process.cwd(), actual));
  }
  fs.rmSync(path.join(coreDir, '.check'), { recursive: true, force: true });

  if (differences.length > 0) {
    throw new Error(
      `This brand's Figma export disagrees with core/ on:\n` +
        differences.map((d) => `  • ${d}`).join('\n') +
        `\n\ncore/ holds the brand-agnostic scales. Either align the Figma file with` +
        ` core/, or move the value out of a core category and into the brand.`,
    );
  }
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

export function copyFigmaJsonToDist(inputFile, distDir = 'dist') {
  const dest = path.resolve(distDir, 'figma/tokens.json');
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
