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
  loadAllBrands,
  resolveBrandArg,
} from './brands.mjs';

const args = process.argv.slice(2);
const modeFlag = args.indexOf('--mode');
const mode = modeFlag !== -1 ? args[modeFlag + 1] : 'light';
// Escape hatch for the migration window only — unmapped names otherwise fail.
const allowUnmapped = args.includes('--allow-unmapped');
// --in overrides a brand's own export; useful for testing a file before it lands.
const inFlag = args.indexOf('--in');

const fail = (err) => {
  console.error(`\n❌ ${err instanceof Error ? err.message : err}\n`);
  process.exit(1);
};

// Parse every brand, or just the one named. Matches sd.config.mjs, so
// `pnpm run sync` covers the whole repo without naming brands one at a time.
// --in only makes sense for a single brand, so it implies one.
let brands;
try {
  const explicit = args.includes('--brand') || process.env.BRAND || inFlag !== -1;
  brands = explicit ? [resolveBrandArg(args)] : loadAllBrands();
} catch (err) {
  fail(err);
}

if (brands.length === 0) fail('No brands found under brands/ — each needs a brand.json');

// Release version source of truth: RELEASE_VERSION env (publish workflows) → VERSION file.
// The export's own $metadata.version is intentionally ignored for releases.
// One VERSION covers every brand, so this is written once, not per brand.
const versionFile = path.join(REPO_ROOT, 'VERSION');
const versionFileValue = fs.existsSync(versionFile)
  ? fs.readFileSync(versionFile, 'utf-8').trim()
  : undefined;
const releaseVersion = process.env.RELEASE_VERSION?.trim() || versionFileValue;
if (releaseVersion) syncPackageJsonVersion(releaseVersion);

let total = 0;
for (const brand of brands) {
  const inputFile = inFlag !== -1 ? args[inFlag + 1] : brandFigmaFile(brand);

  if (!brand.modes.includes(mode)) {
    fail(
      `Brand "${brand.id}" does not declare mode "${mode}"\n` +
        `   Declared modes: ${brand.modes.join(', ')} (see brands/${brand.id}/brand.json)`,
    );
  }
  if (!fs.existsSync(inputFile)) {
    fail(
      `Figma tokens file not found: ${path.relative(REPO_ROOT, inputFile)}\n` +
        '   Export from Tokens Studio or Figma Variables into that path.',
    );
  }

  const source = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
  console.log(`🎨 ${brand.name} (${brand.id}) — mode "${mode}"\n`);

  try {
    const { filesWritten } = writeTokensFromFigmaSource(
      source,
      {
        coreDir: CORE_TOKENS_DIR,
        brandDir: brandTokensDir(brand, mode),
        ownsCore: brand.ownsCore,
      },
      { label: path.relative(REPO_ROOT, inputFile), allowUnmapped },
    );
    total += filesWritten;
  } catch (err) {
    fail(err);
  }

  copyFigmaJsonToDist(inputFile, brandDistDir(brand));
}

console.log(`\n✅ ${total} token file(s) written for ${brands.map((b) => b.id).join(', ')}`);
console.log(`\nNext: pnpm run build   (or pnpm run sync if you only needed parse)\n`);
