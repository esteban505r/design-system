#!/usr/bin/env node

// ============================================================
// spec-to-tokens.mjs  —  DESIGN.md (SSOT) → tokens/**/*.json
// ============================================================
// DESIGN.md is the single source of truth (google-labs DESIGN.md format).
// Its YAML frontmatter holds the token values; this script parses them into
// the nested DTCG tree under tokens/, which Style Dictionary then builds into
// dist/** and tokens-to-figma.mjs exports into figma/tokens.json.
//
//   DESIGN.md → spec-to-tokens.mjs → tokens/ → sd.config.mjs → dist/**
//                                          └→ tokens-to-figma.mjs → figma/tokens.json
//
// Mirror of figma-to-tokens.mjs (the legacy Figma-import front end).
// ============================================================

import fs from 'fs';
import YAML from 'yaml';
import { writeTokensFromTree } from './token-writer.mjs';
import { syncPackageJsonVersion } from './figma-collection-to-tokens.mjs';
import { buildTokenTreeFromSpec, extractFrontmatter } from './spec-collection-to-tokens.mjs';

const args = process.argv.slice(2);
const inFlag = args.indexOf('--in');
const outFlag = args.indexOf('--out');
const inputFile = inFlag !== -1 ? args[inFlag + 1] : 'DESIGN.md';
const outputDir = outFlag !== -1 ? args[outFlag + 1] : 'tokens';

if (!fs.existsSync(inputFile)) {
  console.error(`❌ DESIGN.md not found: ${inputFile}`);
  console.error('   This file is the source of truth — author tokens in its YAML frontmatter.');
  process.exit(1);
}

const raw = fs.readFileSync(inputFile, 'utf-8');
const frontmatter = extractFrontmatter(raw);
if (frontmatter === null) {
  console.error(`❌ No YAML frontmatter found in ${inputFile} (expected a leading --- … --- block)`);
  process.exit(1);
}

const data = YAML.parse(frontmatter) || {};
const { tree, mapped } = buildTokenTreeFromSpec(data);

console.log(`📄 ${inputFile} (${mapped} tokens)\n`);

const { filesWritten } = writeTokensFromTree(tree, outputDir);

// Release version source of truth: RELEASE_VERSION env (publish workflows) →
// VERSION file. DESIGN.md frontmatter `version` is the format version (alpha)
// and is intentionally ignored for releases.
const versionFileValue = fs.existsSync('VERSION')
  ? fs.readFileSync('VERSION', 'utf-8').trim()
  : undefined;
const releaseVersion = process.env.RELEASE_VERSION?.trim() || versionFileValue;
if (releaseVersion) syncPackageJsonVersion(releaseVersion);

console.log(`\n✅ ${filesWritten} token file(s) written to ${outputDir}/`);
console.log(`\nNext: pnpm run build   (or pnpm run sync to also regenerate figma/tokens.json)\n`);
