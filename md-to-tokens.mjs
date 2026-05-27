#!/usr/bin/env node

// Reads design-system-foundations.md → tokens/ (same pipeline as figma/tokens.json).
//
// The markdown file must include a ```json figma-tokens block in Tokens Studio /
// Figma Variables export shape (flat names: primary-color, type-h1, spacing-md, …).
//
// Usage: node md-to-tokens.mjs [design-system-foundations.md] [--out tokens]

import fs from 'fs';
import path from 'path';
import {
  resolveFigmaCollection,
  syncPackageJsonVersion,
  writeFigmaTokensJson,
  writeTokensFromFigmaSource,
} from './figma-collection-to-tokens.mjs';

const FIGMA_EXTENSIONS = {
  'com.figma.scopes': ['ALL_SCOPES'],
  'com.figma.hiddenFromPublishing': false,
};

/** Semver from `**Version:** x.y.z` */
function extractDesignSystemVersion(markdown, sourceLabel) {
  const m = markdown.match(/\*\*Version:\*\*\s*(.+)/);
  if (!m) {
    console.error(
      `❌ Missing **Version:** semver in ${sourceLabel}. Add a line like: **Version:** 1.2.3`,
    );
    process.exit(1);
  }
  const v = m[1].trim();
  if (!/^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$/.test(v)) {
    console.error(`❌ Invalid **Version:** "${v}" in ${sourceLabel}`);
    process.exit(1);
  }
  return v;
}

/**
 * @param {Record<string, unknown>} obj
 */
function isFigmaFlatCollection(obj) {
  return Object.keys(obj).some((k) => k.includes('-') && !k.startsWith('$'));
}

/**
 * @param {string} md
 */
function extractFigmaTokensSource(md) {
  const tagged = md.match(/```json\s+figma-tokens\s*\n([\s\S]*?)```/);
  if (tagged) {
    return JSON.parse(tagged[1]);
  }

  const jsonRegex = /```json\s*\n([\s\S]*?)```/g;
  let match;
  while ((match = jsonRegex.exec(md)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      if (isFigmaFlatCollection(parsed)) {
        return {
          'Global/Mode 1': parsed,
          $themes: [],
          $metadata: { tokenSetOrder: ['Global/Mode 1'] },
        };
      }
      const setKey = Object.keys(parsed).find((k) => !k.startsWith('$'));
      if (setKey && typeof parsed[setKey] === 'object' && isFigmaFlatCollection(
        /** @type {Record<string, unknown>} */ (parsed[setKey]),
      )) {
        return parsed;
      }
    } catch {
      console.warn(`⚠️  Skipping malformed JSON block at offset ${match.index}`);
    }
  }

  console.error(
    '❌ No Figma-format token block found. Add a ```json figma-tokens section matching figma/tokens.json (Tokens Studio export).',
  );
  process.exit(1);
}

/** Strip $extensions for markdown-authored tokens (optional parity with export). */
function normalizeCollectionForFigmaJson(collection) {
  /** @type {Record<string, unknown>} */
  const out = {};
  for (const [name, token] of Object.entries(collection)) {
    if (!token || typeof token !== 'object' || !('$value' in token)) continue;
    const t = /** @type {Record<string, unknown>} */ (token);
    out[name] = {
      $value: t.$value,
      $type: t.$type ?? 'string',
      $extensions: { ...FIGMA_EXTENSIONS },
    };
  }
  return out;
}

const args = process.argv.slice(2);
const inputFile = args.find((a) => !a.startsWith('--')) || 'design-system-foundations.md';
const outFlag = args.indexOf('--out');
const outputDir = outFlag !== -1 ? args[outFlag + 1] : 'tokens';
const figmaOutFlag = args.indexOf('--figma-out');
const figmaOut =
  figmaOutFlag !== -1 ? args[figmaOutFlag + 1] : 'figma/tokens.json';

if (!fs.existsSync(inputFile)) {
  console.error(`❌ File not found: ${inputFile}`);
  process.exit(1);
}

const md = fs.readFileSync(inputFile, 'utf-8');
const designSystemVersion = extractDesignSystemVersion(md, inputFile);
syncPackageJsonVersion(designSystemVersion);

console.log(`📄 ${inputFile} (Figma Tokens Studio format)\n`);

const figmaSource = extractFigmaTokensSource(md);
const { collectionName, collection } = resolveFigmaCollection(figmaSource);

const normalizedCollection = normalizeCollectionForFigmaJson(
  /** @type {Record<string, { $value: unknown, $type?: string }>} */ (collection),
);

const canonicalName = collectionName.includes('Mode') ? collectionName : 'Global/Mode 1';

const figmaDocument = {
  [canonicalName]: normalizedCollection,
  $themes: Array.isArray(figmaSource.$themes) ? figmaSource.$themes : [],
  $metadata: {
    ...(typeof figmaSource.$metadata === 'object' && figmaSource.$metadata
      ? figmaSource.$metadata
      : {}),
    tokenSetOrder: [canonicalName],
  },
};

writeFigmaTokensJson(figmaDocument, figmaOut);
console.log(`  ✔ ${path.relative(process.cwd(), path.resolve(figmaOut))}`);

const { filesWritten } = writeTokensFromFigmaSource(figmaDocument, outputDir, {
  label: `${inputFile} → ${collectionName}`,
});

console.log(`\n✅ ${filesWritten} token file(s) written to ${outputDir}/`);
console.log(`\nNext: pnpm run build   (or pnpm run sync:md for full pipeline)\n`);
