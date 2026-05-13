#!/usr/bin/env node

// ============================================================
// md-to-tokens.mjs
// ============================================================
// Reads a Design System Foundations markdown file and generates
// Style Dictionary-compatible token JSON files (DTCG format).
//
// Usage:
//   node md-to-tokens.mjs <input.md> [--out tokens/]
//
// The script extracts JSON code blocks from the markdown,
// infers token types, converts to DTCG format ($value/$type),
// and writes each category to its own file.
// ============================================================

import fs from 'fs';
import path from 'path';

// ── CLI args ────────────────────────────────────────────────
const args = process.argv.slice(2);
const inputFile = args.find(a => !a.startsWith('--')) || 'design-system-foundations.md';
const outFlag = args.indexOf('--out');
const outputDir = outFlag !== -1 ? args[outFlag + 1] : 'tokens';

if (!fs.existsSync(inputFile)) {
  console.error(`❌ File not found: ${inputFile}`);
  process.exit(1);
}

const md = fs.readFileSync(inputFile, 'utf-8');

// ── Extract JSON code blocks ────────────────────────────────
const jsonBlocks = [];
const jsonRegex = /```json\s*\n([\s\S]*?)```/g;
let match;
while ((match = jsonRegex.exec(md)) !== null) {
  try {
    jsonBlocks.push(JSON.parse(match[1]));
  } catch (e) {
    console.warn(`⚠️  Skipping malformed JSON block at offset ${match.index}`);
  }
}

if (jsonBlocks.length === 0) {
  console.error('❌ No JSON blocks found in the markdown file.');
  process.exit(1);
}

console.log(`📄 Found ${jsonBlocks.length} JSON block(s) in ${inputFile}\n`);

// ── Type inference ──────────────────────────────────────────
function inferType(key, value) {
  const v = String(value).trim();
  if (/^#[0-9A-Fa-f]{3,8}$/.test(v)) return 'color';
  // Shadow: has px offsets + rgba (e.g. "0px 1px 2px rgba(...)")
  if (/\d+px\s+\d+px.*rgba?\(/.test(v)) return 'shadow';
  if (/rgba?\(/.test(v) && !/\d+px/.test(v)) return 'color';
  if (/^\d+px$/.test(v)) return 'dimension';
  if (/^\d+(\.\d+)?rem$/.test(v)) return 'dimension';
  if (/^\d+ms$/.test(v)) return 'duration';
  if (/^cubic-bezier/.test(v)) return 'cubicBezier';
  if (/box-shadow|^\d+px\s+\d+px/.test(v)) return 'shadow';
  if (typeof value === 'number' && value >= 100 && value <= 900) return 'fontWeight';
  if (typeof value === 'number') return 'number';
  // Font family heuristic
  if (/sans-serif|serif|monospace|Montserrat|Inter|Roboto/i.test(v)) return 'fontFamily';
  return undefined;
}

// ── Convert a legacy SD object to DTCG format ───────────────
function toDTCG(obj, parentKey = '') {
  const result = {};

  for (const [key, val] of Object.entries(obj)) {
    if (val === null || val === undefined) continue;

    // Leaf node: has a "value" property (legacy SD format)
    if (typeof val === 'object' && 'value' in val && !('$value' in val)) {
      const dtcgToken = {
        '$value': val.value,
      };

      // Infer $type
      const type = inferType(key, val.value);
      if (type) dtcgToken['$type'] = type;

      // Carry over extra metadata
      if (val.weight !== undefined) dtcgToken['$extensions'] = { weight: val.weight };
      if (val.style !== undefined) {
        dtcgToken['$extensions'] = { ...dtcgToken['$extensions'], style: val.style };
      }
      if (val.description) dtcgToken['$description'] = val.description;

      result[key] = dtcgToken;
    }
    // Already DTCG format
    else if (typeof val === 'object' && '$value' in val) {
      result[key] = val;
    }
    // Nested group
    else if (typeof val === 'object') {
      result[key] = toDTCG(val, key);
    }
    // Raw value (shouldn't happen in well-formed input, but handle gracefully)
    else {
      result[key] = val;
    }
  }

  return result;
}

// ── Map top-level keys to file paths ────────────────────────
// The markdown contains multiple JSON blocks. We merge them by
// top-level key, then write each category to its own file.

const merged = {};

for (const block of jsonBlocks) {
  for (const [topKey, topVal] of Object.entries(block)) {
    if (!merged[topKey]) {
      merged[topKey] = {};
    }
    // Merge sub-keys (e.g., color.primary, color.secondary from different blocks)
    if (typeof topVal === 'object') {
      Object.assign(merged[topKey], topVal);
    }
  }
}

// Category → file mapping
const fileMap = {
  'color': {
    // Split color into separate files by sub-category
    split: true,
    subCategories: {
      'primary':   'color/primary.json',
      'secondary': 'color/secondary.json',
      'neutral':   'color/neutral.json',
      'semantic':  'color/semantic.json',
      // Catch-all for unexpected sub-keys
      '_default':  'color/other.json',
    },
  },
  'font': {
    split: true,
    subCategories: {
      'family': 'typography/family.json',
      'weight': 'typography/weight.json',
      'size':   'typography/scale.json',
      '_default': 'typography/other.json',
    },
  },
  'spacing':   { split: false, file: 'spacing/spacing.json' },
  'radius':    { split: false, file: 'radius/radius.json' },
  'elevation': { split: false, file: 'shadow/elevation.json' },
  'shadow':    { split: false, file: 'shadow/shadow.json' },
  'duration':  { split: false, file: 'motion/duration.json' },
  'easing':    { split: false, file: 'motion/easing.json' },
  'opacity':   { split: false, file: 'opacity/opacity.json' },
};

// ── Write files ─────────────────────────────────────────────
let filesWritten = 0;

for (const [category, data] of Object.entries(merged)) {
  const mapping = fileMap[category];

  if (!mapping) {
    // Unknown category — write as-is
    const filePath = path.join(outputDir, `${category}/${category}.json`);
    writeTokenFile(filePath, { [category]: toDTCG(data) });
    continue;
  }

  if (mapping.split) {
    // Split into sub-files
    const unmatched = {};
    for (const [subKey, subData] of Object.entries(data)) {
      const subFile = mapping.subCategories[subKey] || mapping.subCategories['_default'];
      if (subFile) {
        const filePath = path.join(outputDir, subFile);
        const wrapper = {};
        wrapper[category] = {};
        wrapper[category][subKey] = toDTCG(typeof subData === 'object' ? subData : { value: subData });
        writeTokenFile(filePath, wrapper);
      }
    }
  } else {
    // Single file
    const filePath = path.join(outputDir, mapping.file);
    writeTokenFile(filePath, { [category]: toDTCG(data) });
  }
}

function writeTokenFile(filePath, data) {
  const fullPath = path.resolve(filePath);
  const dir = path.dirname(fullPath);

  // If file already exists, merge (don't overwrite sibling keys)
  let existing = {};
  if (fs.existsSync(fullPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
    } catch (e) { /* overwrite if unparseable */ }
  }

  const merged = deepMerge(existing, data);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, JSON.stringify(merged, null, 2) + '\n');
  filesWritten++;

  const relative = path.relative(process.cwd(), fullPath);
  console.log(`  ✔ ${relative}`);
}

function deepMerge(target, source) {
  const result = { ...target };
  for (const [key, val] of Object.entries(source)) {
    if (typeof val === 'object' && val !== null && !Array.isArray(val) && typeof result[key] === 'object') {
      result[key] = deepMerge(result[key], val);
    } else {
      result[key] = val;
    }
  }
  return result;
}

console.log(`\n✅ ${filesWritten} token file(s) written to ${outputDir}/`);
console.log(`\nNext steps:`);
console.log(`  1. Review the generated files`);
console.log(`  2. Run: npm run build     (to generate platform outputs)`);
console.log(`  3. Commit and push\n`);
