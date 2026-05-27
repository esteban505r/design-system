#!/usr/bin/env node

// ============================================================
// tokens-to-figma.mjs
// ============================================================
// Reads DTCG token JSON from tokens/ and writes a single flat
// Tokens Studio / Figma Variables import file.
//
// Usage:
//   node tokens-to-figma.mjs [--in tokens] [--out dist/figma/tokens.json]
//   FIGMA_COLLECTION="Global/Mode 1" node tokens-to-figma.mjs
// ============================================================

import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const inFlag = args.indexOf('--in');
const outFlag = args.indexOf('--out');
const inputDir = inFlag !== -1 ? args[inFlag + 1] : 'tokens';
const outputFile =
  outFlag !== -1 ? args[outFlag + 1] : 'dist/figma/tokens.json';
const collectionName = process.env.FIGMA_COLLECTION || 'Global/Mode 1';

const FIGMA_EXTENSIONS = {
  'com.figma.scopes': ['ALL_SCOPES'],
  'com.figma.hiddenFromPublishing': false,
};

/** @param {string} filePath */
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

/**
 * @param {unknown} node
 * @param {string[]} prefix
 * @param {Array<{ path: string[], token: Record<string, unknown> }>} out
 */
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

/**
 * Map token path → flat Figma variable name (aligned with Oter CSS names).
 * @param {string[]} tokenPath
 */
function pathToFigmaName(tokenPath) {
  const key = tokenPath.join('|');

  /** @type {Record<string, string>} */
  const exact = {
    'color|brand|primary': 'primary-color',
    'color|surface|background': 'background-color',
    'color|surface|surface': 'surface-color',
    'color|surface|border': 'border-color',
    'color|semantic|success': 'success-color',
    'color|semantic|warning': 'warning-color',
    'color|semantic|danger': 'danger-color',
    'color|semantic|info': 'info-color',
  };

  if (exact[key]) return exact[key];

  const [category, group, ...rest] = tokenPath;
  const leaf = rest.length > 0 ? rest.join('-') : group;

  if (category === 'color' && group === 'text') {
    return `text-${leaf}`;
  }
  if (category === 'color' && (group === 'brand' || group === 'surface' || group === 'semantic')) {
    return leaf;
  }
  if (category === 'color' && group === 'eisenhower') {
    return leaf;
  }
  if (category === 'font' && group === 'size') {
    return `type-${leaf}`;
  }
  if (category === 'font' && group === 'weight') {
    return `font-${leaf}`;
  }
  if (category === 'font' && group === 'family') {
    return `font-${leaf}`;
  }
  if (category === 'spacing') {
    return `spacing-${group}`;
  }
  if (category === 'radius') {
    return `radius-${group}`;
  }
  if (category === 'shadow') {
    return `shadow-${group}`;
  }
  if (category === 'motion' && group === 'duration') {
    return `transition-${leaf}`;
  }
  if (category === 'motion' && group === 'easing') {
    return `easing-${leaf}`;
  }
  if (category === 'z-index') {
    return `z-${group}`;
  }

  return tokenPath.join('-');
}

/** @param {string} value */
function parseGradientStops(value) {
  const matches = value.match(/#[0-9A-Fa-f]{3,8}/g);
  return matches ?? [];
}

/**
 * @param {unknown} rawValue
 * @param {string | undefined} $type
 * @returns {{ $value: unknown, $type: string } | null}
 */
function normalizeForFigma(rawValue, $type) {
  const value = String(rawValue).trim();

  if ($type === 'color') {
    if (value.startsWith('#')) {
      return { $value: value.toLowerCase(), $type: 'color' };
    }
    if (/^rgba?\(/i.test(value)) {
      return { $value: value, $type: 'color' };
    }
    return { $value: value, $type: 'color' };
  }

  if ($type === 'gradient') {
    return null; // handled via stop expansion
  }

  if ($type === 'dimension' && /^\d+(\.\d+)?px$/.test(value)) {
    return { $value: Number.parseFloat(value), $type: 'number' };
  }

  if ($type === 'duration' && /^\d+ms$/.test(value)) {
    return { $value: Number.parseInt(value, 10), $type: 'number' };
  }

  if ($type === 'number' || $type === 'fontWeight') {
    return { $value: rawValue, $type: 'number' };
  }

  if ($type === 'fontFamily') {
    return { $value: value, $type: 'string' };
  }

  if ($type === 'shadow' || $type === 'cubicBezier') {
    return { $value: value, $type: 'string' };
  }

  return { $value: rawValue, $type: $type || 'string' };
}

/** @param {unknown} rawValue */
function buildFigmaToken(rawValue, $type) {
  const normalized = normalizeForFigma(rawValue, $type);
  if (!normalized) return null;

  return {
    ...normalized,
    $extensions: { ...FIGMA_EXTENSIONS },
  };
}

/**
 * @param {string[]} tokenPath
 * @param {Record<string, unknown>} token
 * @param {Record<string, unknown>} target
 */
function addToken(tokenPath, token, target) {
  const rawValue = token.$value;
  const $type = /** @type {string | undefined} */ (token.$type);

  // Auth gradient → two solid colors for Figma variables
  if (tokenPath.join('|') === 'color|gradient|auth' && $type === 'gradient') {
    const stops = parseGradientStops(String(rawValue));
    if (stops[0]) {
      target['auth-gradient-color-1'] = buildFigmaToken(stops[0], 'color');
    }
    if (stops[1]) {
      target['auth-gradient-color-2'] = buildFigmaToken(stops[1], 'color');
    }
    return;
  }

  const name = pathToFigmaName(tokenPath);
  const figmaToken = buildFigmaToken(rawValue, $type);
  if (figmaToken) {
    target[name] = figmaToken;
  }
}

if (!fs.existsSync(inputDir)) {
  console.error(`❌ Token directory not found: ${inputDir}`);
  console.error('   Run: pnpm run parse');
  process.exit(1);
}

const leaves = readTokenFiles(path.resolve(inputDir));
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

const output = {
  [collectionName]: orderedCollection,
  $themes: [],
  $metadata: {
    tokenSetOrder: ['global', collectionName],
  },
};

const outPath = path.resolve(outputFile);
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n');

const relative = path.relative(process.cwd(), outPath);
console.log(`✅ Figma tokens written to ${relative}`);
console.log(`   ${sortedNames.length} variables in "${collectionName}"\n`);
