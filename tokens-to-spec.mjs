#!/usr/bin/env node

// ============================================================
// tokens-to-spec.mjs  —  tokens/ → DESIGN.md frontmatter
// ============================================================
// DESIGN.md is the source of truth; this is the reverse converter, used to:
//   1. Bootstrap DESIGN.md from the current tokens/ on first cut-over so the
//      initial frontmatter exactly equals today's committed values.
//   2. Verify (spec:verify): regenerate to a temp file and diff against
//      DESIGN.md to detect drift.
//
// The human-authored markdown body below the frontmatter is preserved when the
// target file already exists; otherwise a default body is written.
//
// Usage:
//   node tokens-to-spec.mjs                       # write/refresh DESIGN.md
//   node tokens-to-spec.mjs --out /tmp/gen.md     # verify target
// ============================================================

import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import { CATEGORY_TO_SPEC } from './token-name-map.mjs';

const args = process.argv.slice(2);
const inFlag = args.indexOf('--in');
const outFlag = args.indexOf('--out');
const inputDir = inFlag !== -1 ? args[inFlag + 1] : 'tokens';
const outputFile = outFlag !== -1 ? args[outFlag + 1] : 'DESIGN.md';

// Curated read order → deterministic, readable frontmatter. Within each file
// the original key order is preserved (it drives tokens/ round-trip order).
const FILE_ORDER = [
  'color/brand.json',
  'color/surface.json',
  'color/text.json',
  'color/semantic.json',
  'color/eisenhower.json',
  'color/gradient.json',
  'typography/family.json',
  'typography/weight.json',
  'typography/scale.json',
  'spacing/spacing.json',
  'radius/radius.json',
  'shadow/shadow.json',
  'motion/duration.json',
  'motion/easing.json',
  'z-index/z-index.json',
];

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
  for (const [key, value] of Object.entries(obj)) {
    collectLeaves(value, [...prefix, key], out);
  }
}

if (!fs.existsSync(inputDir)) {
  console.error(`❌ Token directory not found: ${inputDir} (run pnpm run sync first)`);
  process.exit(1);
}

// Release version lives in the VERSION file (single source of truth) — it is
// intentionally NOT mirrored into the frontmatter to avoid drift.
/** @type {Record<string, unknown>} */
const frontmatter = {
  version: 'alpha',
  name: 'Oter Design System',
  description:
    'Single source of truth for Oter design tokens across web, Android, iOS, Flutter, and Compose.',
};

let tokenCount = 0;
for (const rel of FILE_ORDER) {
  const full = path.resolve(inputDir, rel);
  if (!fs.existsSync(full)) continue;
  const root = JSON.parse(fs.readFileSync(full, 'utf-8'));
  /** @type {Array<{ path: string[], token: Record<string, unknown> }>} */
  const leaves = [];
  collectLeaves(root, [], leaves);
  for (const { path: tokenPath, token } of leaves) {
    const [category, ...rest] = tokenPath;
    const specKey = CATEGORY_TO_SPEC[category] || category;
    let node = /** @type {Record<string, unknown>} */ (
      (frontmatter[specKey] ??= {})
    );
    for (let i = 0; i < rest.length - 1; i++) {
      node = /** @type {Record<string, unknown>} */ ((node[rest[i]] ??= {}));
    }
    node[rest[rest.length - 1]] = token.$value;
    tokenCount++;
  }
}

const DEFAULT_BODY = `
# Oter Design System

> Oter is a life-management platform spanning **finance, tasks, habits, nutrition, workouts, and study**. The product ships **dark-first** on a red-on-umber palette.

The machine-readable design tokens live in the YAML frontmatter above — **this is the single source of truth**. Run \`pnpm run sync\` after editing them to regenerate \`tokens/\`, \`dist/**\`, and \`figma/tokens.json\`. Never hand-edit those generated outputs.

## Overview

Dark-first, high-contrast UI with a single evocative red accent driving interaction. Calm umber surfaces; the brand red is reserved for the most important action per screen.

## Colors

- **Brand** — \`primary\` (#DC2626) is the sole interaction driver, with hover/light/tint variants for states and washes.
- **Surface** — layered umber backgrounds and borders for depth in dark mode.
- **Text** — a readable ramp from \`primary\` down to \`tertiary\`.
- **Semantic** — success / warning / danger / info plus hover variants.
- **Eisenhower** — urgency and importance accents for the tasks matrix.
- **Gradient** — the auth hero gradient.

## Typography

Geist for sans + brand, Geist Mono for code, Lexend on mobile. Weights run regular → extrabold; the size scale spans \`h1\` → \`mono\`.

## Layout

Spacing follows a 4px base (\`xs\` → \`xxl\`). Use tokens, never raw pixel values.

## Shapes

Corner radii (\`rounded\`) run \`sm\` → \`full\`; avoid mixing rounded and sharp corners in the same view.

## Elevation & Depth

Four shadow steps (\`sm\` → \`xl\`) express hierarchy; prefer tonal surfaces over heavy shadows in dark mode.

## Motion

Durations \`fast\` / \`base\` / \`slow\` with a single standard easing curve.

## Do's and Don'ts

- Do use \`colors.brand.primary\` only for the single most important action per screen.
- Do reference tokens everywhere — never hardcode hex, sizes, spacing, radii, shadows, durations, or z-index integers.
- Don't edit \`tokens/\`, \`dist/\`, or \`figma/tokens.json\` by hand; they are generated from this file.
`;

/** Preserve the existing markdown body, or fall back to the default template. */
function resolveBody() {
  if (fs.existsSync(outputFile)) {
    const existing = fs.readFileSync(outputFile, 'utf-8');
    const match = existing.match(/^---\r?\n[\s\S]*?\r?\n---\s*?\r?\n([\s\S]*)$/);
    if (match) return match[1].replace(/^\n+/, '\n');
  }
  return DEFAULT_BODY;
}

const yamlBlock = YAML.stringify(frontmatter, { lineWidth: 0 }).replace(/\n+$/, '\n');
const body = resolveBody();
const output = `---\n${yamlBlock}---\n${body.startsWith('\n') ? body : '\n' + body}`;

const outPath = path.resolve(outputFile);
fs.writeFileSync(outPath, output.endsWith('\n') ? output : output + '\n');

console.log(`✅ Wrote ${tokenCount} tokens → ${path.relative(process.cwd(), outPath)}`);
if (path.basename(outPath) !== 'DESIGN.md') {
  console.log('   (verify mode) Compare with DESIGN.md to confirm no drift.\n');
}
