#!/usr/bin/env node

// Reads a brand's Figma export (Tokens Studio) and writes the DTCG token tree:
//
//   brands/<brand>/figma/tokens.json
//     → core/tokens/**            (brand-agnostic scales, if the brand owns core)
//     → brands/<brand>/tokens/<mode>/**
//
// Usage: node pipeline/figma-to-tokens.mjs [--brand <id>] [--mode light]

import fs from 'fs';
import path from 'path';
import {
  copyFigmaJsonToDist,
  syncPackageJsonVersion,
  writeTokensFromFigmaSource,
} from './figma-collection-to-tokens.mjs';
import {
  CORE_TOKENS_DIR,
  REPO_ROOT,
  brandDistDir,
  brandFigmaFile,
  brandTokensDir,
  resolveBrandArg,
} from './brands.mjs';

const args = process.argv.slice(2);
const modeFlag = args.indexOf('--mode');
const mode = modeFlag !== -1 ? args[modeFlag + 1] : 'light';
// Escape hatch for the migration window only — unmapped names otherwise fail.
const allowUnmapped = args.includes('--allow-unmapped');

let brand;
try {
  brand = resolveBrandArg(args);
} catch (err) {
  console.error(`\n❌ ${err instanceof Error ? err.message : err}\n`);
  process.exit(1);
}

// --in overrides the brand's own export; useful for testing a file before it lands.
const inFlag = args.indexOf('--in');
const inputFile = inFlag !== -1 ? args[inFlag + 1] : brandFigmaFile(brand);

if (!brand.modes.includes(mode)) {
  console.error(`❌ Brand "${brand.id}" does not declare mode "${mode}"`);
  console.error(`   Declared modes: ${brand.modes.join(', ')} (see brands/${brand.id}/brand.json)`);
  process.exit(1);
}

if (!fs.existsSync(inputFile)) {
  console.error(`❌ Figma tokens file not found: ${path.relative(REPO_ROOT, inputFile)}`);
  console.error('   Export from Tokens Studio or Figma Variables into that path.');
  process.exit(1);
}

const source = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

// Release version source of truth: RELEASE_VERSION env (publish workflows) → VERSION file.
// The export's own $metadata.version is intentionally ignored for releases.
const versionFile = path.join(REPO_ROOT, 'VERSION');
const versionFileValue = fs.existsSync(versionFile)
  ? fs.readFileSync(versionFile, 'utf-8').trim()
  : undefined;
const releaseVersion = process.env.RELEASE_VERSION?.trim() || versionFileValue;
if (releaseVersion) syncPackageJsonVersion(releaseVersion);

console.log(`🎨 ${brand.name} (${brand.id}) — mode "${mode}"\n`);

let filesWritten;
try {
  ({ filesWritten } = writeTokensFromFigmaSource(
    source,
    {
      coreDir: CORE_TOKENS_DIR,
      brandDir: brandTokensDir(brand, mode),
      ownsCore: brand.ownsCore,
    },
    { label: path.relative(REPO_ROOT, inputFile), allowUnmapped },
  ));
} catch (err) {
  console.error(`\n❌ ${err instanceof Error ? err.message : err}\n`);
  process.exit(1);
}

copyFigmaJsonToDist(inputFile, brandDistDir(brand));

console.log(`\n✅ ${filesWritten} token file(s) written for ${brand.id}`);
console.log(`\nNext: pnpm run build   (or pnpm run sync if you only needed parse)\n`);
