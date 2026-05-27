#!/usr/bin/env node

// ============================================================
// figma-to-tokens.mjs
// ============================================================
// Reads figma/tokens.json (Tokens Studio / Figma Variables export)
// and writes Style Dictionary token JSON under tokens/.
//
// Usage:
//   node figma-to-tokens.mjs [--in figma/tokens.json] [--out tokens]
// ============================================================

import fs from 'fs';
import path from 'path';
import { FIGMA_TO_TOKEN_PATH, figmaTokenToDtcg } from './token-name-map.mjs';
import { setTokenAtPath, writeTokensFromTree } from './token-writer.mjs';

const args = process.argv.slice(2);
const inFlag = args.indexOf('--in');
const outFlag = args.indexOf('--out');
const inputFile = inFlag !== -1 ? args[inFlag + 1] : 'figma/tokens.json';
const outputDir = outFlag !== -1 ? args[outFlag + 1] : 'tokens';
const collectionFromEnv = process.env.FIGMA_COLLECTION;

if (!fs.existsSync(inputFile)) {
  console.error(`❌ Figma tokens file not found: ${inputFile}`);
  console.error('   Export from Tokens Studio or copy your tokens.json to figma/tokens.json');
  process.exit(1);
}

const source = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

/** @type {string | undefined} */
let collectionName = collectionFromEnv;
if (!collectionName) {
  const keys = Object.keys(source).filter(k => !k.startsWith('$'));
  if (keys.length === 0) {
    console.error('❌ No token set found in Figma JSON (expected a collection key, e.g. "Global/Mode 1")');
    process.exit(1);
  }
  collectionName = keys[0];
}

/** @type {Record<string, { $value: unknown, $type?: string }>} */
const collection = source[collectionName];
if (!collection || typeof collection !== 'object') {
  console.error(`❌ Token set "${collectionName}" not found in ${inputFile}`);
  process.exit(1);
}

syncPackageJsonVersion(source.$metadata);

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

console.log(`📄 ${inputFile} → "${collectionName}" (${mapped} mapped, ${skipped} skipped)\n`);

const { filesWritten } = writeTokensFromTree(tree, outputDir);

copyFigmaSourceToDist(inputFile);

console.log(`\n✅ ${filesWritten} token file(s) written to ${outputDir}/`);
console.log(`\nNext: pnpm run build   (or pnpm run sync if you only needed parse)\n`);

function syncPackageJsonVersion(metadata) {
  const version = metadata?.version;
  if (!version || typeof version !== 'string') return;

  const pkgPath = path.resolve('package.json');
  if (!fs.existsSync(pkgPath)) return;

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  if (pkg.version === version) {
    console.log(`📦 package.json version ${version} (already in sync)\n`);
    return;
  }
  pkg.version = version;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`📦 package.json → version ${version} (from figma/tokens.json $metadata)\n`);
}

function copyFigmaSourceToDist(inputFile) {
  const dest = path.resolve('dist/figma/tokens.json');
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(path.resolve(inputFile), dest);
  console.log(`  ✔ ${path.relative(process.cwd(), dest)} (copy of SSOT)`);
}
