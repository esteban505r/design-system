#!/usr/bin/env node

// ============================================================
// tokens-to-figma.mjs (the reverse direction — verify / export)
// ============================================================
// The brand's figma/tokens.json is the source of truth; edit that. This script
// regenerates it from the token tree so the round trip can be diffed:
//   node pipeline/tokens-to-figma.mjs --brand belcorp --out /tmp/generated.json
//   diff brands/belcorp/figma/tokens.json /tmp/generated.json
// That diff is what test/lossless.test.mjs asserts is empty.
// ============================================================

import fs from 'fs';
import path from 'path';
import { tokenPathToFigmaName } from './token-name-map.mjs';
import {
  CORE_TOKENS_DIR,
  REPO_ROOT,
  brandDistDir,
  brandFigmaFile,
  brandTokensDir,
  resolveBrandArg,
} from './brands.mjs';

const args = process.argv.slice(2);
const inFlag = args.indexOf('--in');
const outFlag = args.indexOf('--out');
const modeFlag = args.indexOf('--mode');
const mode = modeFlag !== -1 ? args[modeFlag + 1] : 'light';

let brand;
try {
  brand = resolveBrandArg(args);
} catch (err) {
  console.error(`\n❌ ${err instanceof Error ? err.message : err}\n`);
  process.exit(1);
}

// A brand's export is assembled from both layers the resolver reads: the shared
// core scales plus that brand's own values. Reading only one would silently
// drop half the tokens and make the round-trip diff look like data loss.
const inputDirs =
  inFlag !== -1 ? [args[inFlag + 1]] : [CORE_TOKENS_DIR, brandTokensDir(brand, mode)];
// Default is a throwaway under dist/ so verifying can never clobber the source
// of truth; --to-ssot is the deliberate opt-in to overwrite it.
const outputFile =
  outFlag !== -1
    ? args[outFlag + 1]
    : args.includes('--to-ssot')
      ? brandFigmaFile(brand)
      : path.join(brandDistDir(brand), 'figma/tokens.generated.json');
const collectionName = process.env.FIGMA_COLLECTION || 'Global/Mode 1';

const FIGMA_EXTENSIONS = {
  'com.figma.scopes': ['ALL_SCOPES'],
  'com.figma.hiddenFromPublishing': false,
};

function readTokenFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  /** @type {Array<{ path: string[], token: Record<string, unknown> }>} */
  const leaves = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      leaves.push(...readTokenFiles(full));
      continue;
    }
    if (!entry.name.endsWith('.json')) continue;
    const root = JSON.parse(fs.readFileSync(full, 'utf-8'));
    collectLeaves(root, [], leaves);
  }
  return leaves;
}

function collectLeaves(node, prefix, out) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return;
  const obj = /** @type {Record<string, unknown>} */ (node);
  if ('$value' in obj) {
    out.push({ path: prefix, token: obj });
    return;
  }
  for (const [key, val] of Object.entries(obj)) {
    collectLeaves(val, [...prefix, key], out);
  }
}

function normalizeForFigma(rawValue, $type) {
  const value = String(rawValue).trim();
  if ($type === 'color') {
    if (value.startsWith('#')) return { $value: value.toLowerCase(), $type: 'color' };
    return { $value: value, $type: 'color' };
  }
  if ($type === 'gradient') return null;
  if ($type === 'dimension' && /^\d+(\.\d+)?px$/.test(value)) {
    return { $value: Number.parseFloat(value), $type: 'number' };
  }
  if ($type === 'duration' && /^\d+ms$/.test(value)) {
    return { $value: Number.parseInt(value, 10), $type: 'number' };
  }
  if ($type === 'number' || $type === 'fontWeight') {
    return { $value: rawValue, $type: 'number' };
  }
  if ($type === 'fontFamily') return { $value: value, $type: 'string' };
  if ($type === 'shadow' || $type === 'cubicBezier') {
    return { $value: value, $type: 'string' };
  }
  return { $value: rawValue, $type: $type || 'string' };
}

function buildFigmaToken(rawValue, $type) {
  const normalized = normalizeForFigma(rawValue, $type);
  if (!normalized) return null;
  return { ...normalized, $extensions: { ...FIGMA_EXTENSIONS } };
}

function addToken(tokenPath, token, target) {
  const rawValue = token.$value;
  const $type = /** @type {string | undefined} */ (token.$type);

  if (tokenPath.join('|') === 'color|gradient|auth' && $type === 'gradient') {
    const figmaToken = buildFigmaToken(rawValue, 'string');
    if (figmaToken) target['auth-gradient'] = figmaToken;
    return;
  }

  const name = tokenPathToFigmaName(tokenPath);
  const figmaToken = buildFigmaToken(rawValue, $type);
  if (figmaToken) target[name] = figmaToken;
}

for (const dir of inputDirs) {
  if (!fs.existsSync(dir)) {
    console.error(`❌ Token directory not found: ${path.relative(REPO_ROOT, dir)}`);
    process.exit(1);
  }
}

const leaves = inputDirs.flatMap((dir) => readTokenFiles(path.resolve(dir)));
/** @type {Record<string, unknown>} */
const collection = {};

for (const { path: tokenPath, token } of leaves) {
  addToken(tokenPath, token, collection);
}

const sortedNames = Object.keys(collection).sort((a, b) => a.localeCompare(b));
/** @type {Record<string, unknown>} */
const orderedCollection = {};
for (const name of sortedNames) {
  orderedCollection[name] = collection[name];
}

/** @type {Record<string, unknown>} */
const metadata = {
  tokenSetOrder: ['global', collectionName],
};

const pkgPath = path.resolve('package.json');
if (fs.existsSync(pkgPath)) {
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    if (pkg.version) metadata.version = pkg.version;
  } catch {
    /* ignore */
  }
}

const output = {
  [collectionName]: orderedCollection,
  $themes: [],
  $metadata: metadata,
};

const outPath = path.resolve(outputFile);
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n');

const relative = path.relative(process.cwd(), outPath);
console.log(`✅ Generated ${sortedNames.length} tokens → ${relative}`);

const ssotPath = brandFigmaFile(brand);
if (outPath === ssotPath) {
  const distCopy = path.join(brandDistDir(brand), 'figma/tokens.json');
  fs.mkdirSync(path.dirname(distCopy), { recursive: true });
  fs.copyFileSync(outPath, distCopy);
  console.log(`   Copied to ${path.relative(process.cwd(), distCopy)}`);
} else {
  console.log(`   Compare with ${path.relative(REPO_ROOT, ssotPath)} to verify SSOT parity.`);
}
console.log('');
