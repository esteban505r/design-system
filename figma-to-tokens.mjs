#!/usr/bin/env node

// Reads figma/tokens.json (Tokens Studio export) → tokens/**/*.json

import fs from 'fs';
import {
  copyFigmaJsonToDist,
  syncPackageJsonVersion,
  writeTokensFromFigmaSource,
} from './figma-collection-to-tokens.mjs';

const args = process.argv.slice(2);
const inFlag = args.indexOf('--in');
const outFlag = args.indexOf('--out');
const inputFile = inFlag !== -1 ? args[inFlag + 1] : 'figma/tokens.json';
const outputDir = outFlag !== -1 ? args[outFlag + 1] : 'tokens';

if (!fs.existsSync(inputFile)) {
  console.error(`❌ Figma tokens file not found: ${inputFile}`);
  console.error('   Export from Tokens Studio or copy your tokens.json to figma/tokens.json');
  process.exit(1);
}

const source = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

// Publish workflows set RELEASE_VERSION before sync; do not overwrite with stale Figma $metadata.
const releaseVersion = process.env.RELEASE_VERSION?.trim();
if (releaseVersion) {
  syncPackageJsonVersion(releaseVersion);
} else {
  const version = source.$metadata?.version;
  if (typeof version === 'string') syncPackageJsonVersion(version);
}

const { filesWritten } = writeTokensFromFigmaSource(source, outputDir, {
  label: inputFile,
});

copyFigmaJsonToDist(inputFile);

console.log(`\n✅ ${filesWritten} token file(s) written to ${outputDir}/`);
console.log(`\nNext: pnpm run build   (or pnpm run sync if you only needed parse)\n`);
