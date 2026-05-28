#!/usr/bin/env node

// Markdown workflow: design-system-foundations.md (**Version:** + table values) + design-tokens.json → outputs.
//
// Writes: tokens/, design-tokens.json (normalized), figma/tokens.json, dist/figma/tokens.json.
// Does not read figma/tokens.json as input. Use sync:figma when Figma JSON is the SSOT.
//
// Usage:
//   node md-to-tokens.mjs [design-system-foundations.md] [--tokens design-tokens.json] [--out tokens]

import fs from 'fs';
import path from 'path';
import {
  applyMarkdownOverrides,
  extractMarkdownTokenOverrides,
} from './md-token-overrides.mjs';
import {
  copyFigmaJsonToDist,
  resolveFigmaCollection,
  syncPackageJsonVersion,
  writeFigmaTokensJson,
  writeTokensFromFigmaSource,
} from './figma-collection-to-tokens.mjs';

const FIGMA_EXTENSIONS = {
  'com.figma.scopes': ['ALL_SCOPES'],
  'com.figma.hiddenFromPublishing': false,
};

const SEMVER_RE = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$/;
const DEFAULT_TOKENS_FILE = 'design-tokens.json';
const DESIGN_TOKEN_FENCE_TAGS = ['design-tokens', 'figma-tokens'];

/** @param {string} collectionName */
function canonicalCollectionName(collectionName) {
  if (!collectionName?.includes('Mode')) return 'Global/Mode 1';
  if (collectionName === 'Global/Mode 1' || collectionName.endsWith('/Global/Mode 1')) {
    return 'Global/Mode 1';
  }
  return collectionName;
}

/** Semver from `**Version:** x.y.z` (rest of line may hold Scope, Status, etc.) */
function extractDesignSystemVersion(markdown, sourceLabel) {
  const m = markdown.match(/\*\*Version:\*\*\s*(\d+\.\d+\.\d+(?:-[a-zA-Z0-9.]+)?)/);
  if (!m) {
    console.error(
      `❌ Missing **Version:** semver in ${sourceLabel}. Add a line like: **Version:** 1.2.3`,
    );
    process.exit(1);
  }
  const v = m[1].trim();
  if (!SEMVER_RE.test(v)) {
    console.error(`❌ Invalid **Version:** "${v}" in ${sourceLabel}`);
    process.exit(1);
  }
  return v;
}

/**
 * @param {Record<string, unknown>} obj
 */
function isFlatTokenCollection(obj) {
  return Object.keys(obj).some((k) => k.includes('-') && !k.startsWith('$'));
}

/**
 * Optional legacy: tokens embedded in markdown fenced block.
 * @param {string} md
 */
function extractDesignTokensFromMarkdown(md) {
  for (const tag of DESIGN_TOKEN_FENCE_TAGS) {
    const tagged = md.match(new RegExp('```json\\s+' + tag + '\\s*\\n([\\s\\S]*?)```'));
    if (tagged) {
      return JSON.parse(tagged[1]);
    }
  }

  const jsonRegex = /```json\s*\n([\s\S]*?)```/g;
  let match;
  while ((match = jsonRegex.exec(md)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      if (isFlatTokenCollection(parsed)) {
        return {
          'Global/Mode 1': parsed,
          $themes: [],
          $metadata: { tokenSetOrder: ['Global/Mode 1'] },
        };
      }
      const setKey = Object.keys(parsed).find((k) => !k.startsWith('$'));
      if (setKey && typeof parsed[setKey] === 'object' && isFlatTokenCollection(
        /** @type {Record<string, unknown>} */ (parsed[setKey]),
      )) {
        return parsed;
      }
    } catch {
      console.warn(`⚠️  Skipping malformed JSON block at offset ${match.index}`);
    }
  }
  return null;
}

/**
 * @param {string} tokensFile
 */
function loadDesignTokensFile(tokensFile) {
  const resolved = path.resolve(tokensFile);
  if (!fs.existsSync(resolved)) {
    console.error(`❌ Token file not found: ${tokensFile}`);
    console.error('   Create it (Tokens Studio export shape) or run sync:figma and copy to design-tokens.json.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(resolved, 'utf-8'));
}

/** Strip $extensions for markdown-authored tokens (optional parity with export). */
function normalizeCollectionForExport(collection) {
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
const tokensFlag = args.indexOf('--tokens');
const tokensFile =
  tokensFlag !== -1 ? args[tokensFlag + 1] : DEFAULT_TOKENS_FILE;
const figmaOutFlag = args.indexOf('--figma-out');
const figmaOut =
  figmaOutFlag !== -1 && args[figmaOutFlag + 1] && !args[figmaOutFlag + 1].startsWith('--')
    ? args[figmaOutFlag + 1]
    : 'figma/tokens.json';

if (!fs.existsSync(inputFile)) {
  console.error(`❌ File not found: ${inputFile}`);
  process.exit(1);
}

const md = fs.readFileSync(inputFile, 'utf-8');
const designSystemVersion = extractDesignSystemVersion(md, inputFile);
syncPackageJsonVersion(designSystemVersion);

let tokenSource = loadDesignTokensFile(tokensFile);
let tokenInputLabel = tokensFile;

const fromMd = extractDesignTokensFromMarkdown(md);
if (fromMd) {
  console.warn(
    `⚠️  Using \`\`\`json design-tokens block in ${inputFile} — prefer editing ${tokensFile} and keeping foundations as docs only.`,
  );
  tokenSource = fromMd;
  tokenInputLabel = `${inputFile} (embedded JSON)`;
}

console.log(`📄 ${inputFile} + ${tokenInputLabel}\n`);

const { collectionName, collection } = resolveFigmaCollection(tokenSource);

const mdOverrides = extractMarkdownTokenOverrides(md);
const overrideCount = applyMarkdownOverrides(
  /** @type {Record<string, unknown>} */ (collection),
  mdOverrides,
);
if (overrideCount > 0) {
  console.log(`📝 Applied ${overrideCount} token value(s) from ${inputFile} tables\n`);
}

const normalizedCollection = normalizeCollectionForExport(
  /** @type {Record<string, { $value: unknown, $type?: string }>} */ (collection),
);

const canonicalName = canonicalCollectionName(collectionName);

const tokenDocument = {
  [canonicalName]: normalizedCollection,
  $themes: Array.isArray(tokenSource.$themes) ? tokenSource.$themes : [],
  $metadata: {
    ...(typeof tokenSource.$metadata === 'object' && tokenSource.$metadata
      ? tokenSource.$metadata
      : {}),
    tokenSetOrder: [canonicalName],
    version: designSystemVersion,
  },
};

// Keep machine-readable exports aligned (md path → Figma file + dist copy).
writeFigmaTokensJson(tokenDocument, tokensFile);
console.log(`  ✔ ${path.relative(process.cwd(), path.resolve(tokensFile))} (normalized)`);

writeFigmaTokensJson(tokenDocument, figmaOut);
console.log(`  ✔ ${path.relative(process.cwd(), path.resolve(figmaOut))}`);

copyFigmaJsonToDist(figmaOut);

const { filesWritten } = writeTokensFromFigmaSource(tokenDocument, outputDir, {
  label: `${tokenInputLabel} → ${canonicalName}`,
});

console.log(`\n✅ ${filesWritten} token file(s) written to ${outputDir}/`);
console.log(`\nNext: pnpm run build   (or pnpm run sync:md for full pipeline)\n`);
