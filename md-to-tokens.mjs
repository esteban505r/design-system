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
// Also syncs **Version:** from the markdown into package.json (npm + Gradle publish).
// The script extracts JSON code blocks from the markdown,
// infers token types, converts to DTCG format ($value/$type),
// and writes each category to its own file.
// ============================================================

import fs from 'fs';
import path from 'path';

/** Semver from `**Version:** x.y.z` near the top of the foundations doc (required). */
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
    console.error(
      `❌ Invalid **Version:** "${v}" in ${sourceLabel} (expected semver, e.g. 1.2.3 or 2.0.0-rc.1)`,
    );
    process.exit(1);
  }
  return v;
}

/** Keep package.json in sync so npm publish + Gradle consumers use the same release as the MD. */
function syncPackageJsonVersion(version) {
  const pkgPath = path.resolve(process.cwd(), 'package.json');
  if (!fs.existsSync(pkgPath)) {
    console.warn('⚠️  No package.json in cwd — skipping version sync');
    return;
  }
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  if (pkg.version === version) {
    console.log(`📦 package.json version ${version} (already in sync)\n`);
    return;
  }
  pkg.version = version;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`📦 package.json → version ${version} (from foundations markdown)\n`);
}

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

// ── Release version (single source of truth for npm + Android) ──
const designSystemVersion = extractDesignSystemVersion(md, inputFile);
syncPackageJsonVersion(designSystemVersion);

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
  if (/^linear-gradient\(/i.test(v) || /^radial-gradient\(/i.test(v)) return 'gradient';
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
  if (/sans-serif|serif|monospace|Geist|Lexend|Inter|Roboto/i.test(v)) return 'fontFamily';
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

      const type = inferType(key, val.value);
      if (type) dtcgToken['$type'] = type;

      const extensions = {};
      if (val.weight !== undefined) extensions.weight = val.weight;
      if (val.style !== undefined) extensions.style = val.style;
      if (val.lineHeight !== undefined) extensions.lineHeight = val.lineHeight;
      if (val.letterSpacing !== undefined) extensions.letterSpacing = val.letterSpacing;
      if (val.family !== undefined) extensions.family = val.family;
      if (Object.keys(extensions).length > 0) {
        dtcgToken['$extensions'] = extensions;
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
// Aligned with design-system-foundations.md (Oter token groups).

const fileMap = {
  color: {
    split: true,
    subCategories: {
      brand: 'color/brand.json',
      surface: 'color/surface.json',
      text: 'color/text.json',
      semantic: 'color/semantic.json',
      eisenhower: 'color/eisenhower.json',
      gradient: 'color/gradient.json',
      _default: 'color/other.json',
    },
  },
  font: {
    split: true,
    subCategories: {
      family: 'typography/family.json',
      weight: 'typography/weight.json',
      size: 'typography/scale.json',
      _default: 'typography/other.json',
    },
  },
  spacing: { split: false, file: 'spacing/spacing.json' },
  radius: { split: false, file: 'radius/radius.json' },
  shadow: { split: false, file: 'shadow/shadow.json' },
  motion: {
    split: true,
    subCategories: {
      easing: 'motion/easing.json',
      duration: 'motion/duration.json',
      _default: 'motion/other.json',
    },
  },
  'z-index': { split: false, file: 'z-index/z-index.json' },
  // Legacy top-level keys (older markdown) — still supported if present
  elevation: { split: false, file: 'shadow/elevation.json' },
  duration: { split: false, file: 'motion/duration.json' },
  easing: { split: false, file: 'motion/easing.json' },
  opacity: { split: false, file: 'opacity/opacity.json' },
};

/** Token files from pre-Oter scales; removed when regenerating from current foundations. */
const OBSOLETE_TOKEN_FILES = [
  'color/primary.json',
  'color/secondary.json',
  'color/neutral.json',
  'motion/motion.json',
  'shadow/elevation.json',
  'opacity/opacity.json',
];

// ── Merge JSON blocks from markdown ─────────────────────────
const merged = {};

for (const block of jsonBlocks) {
  for (const [topKey, topVal] of Object.entries(block)) {
    if (!merged[topKey]) {
      merged[topKey] = {};
    }
    if (typeof topVal === 'object') {
      Object.assign(merged[topKey], topVal);
    }
  }
}

// ── Write files ─────────────────────────────────────────────
let filesWritten = 0;
const writtenPaths = new Set();

for (const [category, data] of Object.entries(merged)) {
  const mapping = fileMap[category];

  if (!mapping) {
    const filePath = path.join(outputDir, `${category}/${category}.json`);
    writeTokenFile(filePath, { [category]: toDTCG(data) });
    continue;
  }

  if (mapping.split) {
    for (const [subKey, subData] of Object.entries(data)) {
      const subFile = mapping.subCategories[subKey] || mapping.subCategories._default;
      if (subFile) {
        const filePath = path.join(outputDir, subFile);
        const wrapper = {};
        wrapper[category] = {};
        wrapper[category][subKey] = toDTCG(
          typeof subData === 'object' ? subData : { value: subData },
        );
        writeTokenFile(filePath, wrapper);
      }
    }
  } else {
    const filePath = path.join(outputDir, mapping.file);
    writeTokenFile(filePath, { [category]: toDTCG(data) });
  }
}

function writeTokenFile(filePath, data) {
  const fullPath = path.resolve(filePath);
  const dir = path.dirname(fullPath);

  // Foundations markdown is authoritative — replace file contents (no merge with stale keys).
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2) + '\n');
  filesWritten++;
  writtenPaths.add(fullPath);

  const relative = path.relative(process.cwd(), fullPath);
  console.log(`  ✔ ${relative}`);
}

function pruneObsoleteTokenFiles() {
  const removed = [];
  for (const rel of OBSOLETE_TOKEN_FILES) {
    const fullPath = path.resolve(outputDir, rel);
    if (fs.existsSync(fullPath) && !writtenPaths.has(fullPath)) {
      fs.unlinkSync(fullPath);
      removed.push(path.relative(process.cwd(), fullPath));
    }
  }
  if (removed.length > 0) {
    console.log('\n🗑️  Removed obsolete token file(s):');
    for (const rel of removed) {
      console.log(`  ✖ ${rel}`);
    }
  }
}

pruneObsoleteTokenFiles();

console.log(`\n✅ ${filesWritten} token file(s) written to ${outputDir}/`);
console.log(`\nNext steps:`);
console.log(`  1. Review the generated files`);
console.log(`  2. Run: pnpm run figma     (tokens/ → dist/figma/tokens.json for Figma)`);
console.log(`  3. Run: pnpm run build     (tokens/ → dist/ for web, Android, iOS, …)`);
console.log(`     Or: pnpm run sync       (all steps)`);
console.log(`  4. Commit package.json (if version changed), tokens/, dist/, and push\n`);
