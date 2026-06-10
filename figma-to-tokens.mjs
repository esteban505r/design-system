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

// Release version source of truth: RELEASE_VERSION env (publish workflows) → VERSION file.
// figma/tokens.json $metadata.version is intentionally ignored for releases.
const versionFileValue = fs.existsSync('VERSION')
  ? fs.readFileSync('VERSION', 'utf-8').trim()
  : undefined;
const releaseVersion = process.env.RELEASE_VERSION?.trim() || versionFileValue;
if (releaseVersion) syncPackageJsonVersion(releaseVersion);

const { filesWritten } = writeTokensFromFigmaSource(source, outputDir, {
  label: inputFile,
});

copyFigmaJsonToDist(inputFile);

console.log(`\n✅ ${filesWritten} token file(s) written to ${outputDir}/`);
console.log(`\nNext: pnpm run build   (or pnpm run sync if you only needed parse)\n`);
