#!/usr/bin/env node

// Rebuild tokens.json from the Fractal DS 5.0 variable collections.
//
// Multibrand colour semantics are what Somos Belcorp and FFVV both use.
// Ésika, L'Bel and Cyzone are the other modes of the same collections.
// App-only names (color.app.*, x.ffvv.*) are not in the Figma file and are
// not imported.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CORE_TOKENS_DIR, brandTokensDir, loadAllBrands } from './brands.mjs';
import { pruneUnwrittenTokenFiles, writeTokensFromTree } from './token-writer.mjs';
import { buildStudioDocument, writeStudioDocument } from './studio-document.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.join(HERE, 'fractal');

const BRANDS = ['belcorp', 'esika', 'lbel', 'cyzone'];
const MODES = ['belcorp', 'esika', 'lbel', 'cyzone'];

function setAt(tree, parts, leaf) {
  let node = tree;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    const next = node[key];
    // A Figma name can be both a token and a parent (`tabs/item/indicator` and
    // `tabs/item/indicator/disabled`). A DTCG node cannot be both, so the longer
    // name becomes a sibling (`indicator-disabled`).
    if (next && typeof next === 'object' && '$value' in next) {
      node[parts.slice(i).join('-')] = leaf;
      return;
    }
    if (!next || typeof next !== 'object') node[key] = {};
    node = node[key];
  }
  node[parts[parts.length - 1]] = leaf;
}

function color(value) {
  return { $value: value, $type: 'color' };
}
function dim(value) {
  return { $value: typeof value === 'number' ? px(value) : value, $type: 'dimension' };
}
function px(n) {
  return `${n}px`;
}
function ref(path) {
  return `{${path}}`;
}

function colorAlias(spec) {
  const name = spec.slice(2);
  return ref(`color.${name.split('/').join('.')}`);
}

function dimAlias(spec) {
  if (!spec.includes(':')) return dim(Number(spec));
  const kind = spec[0];
  const parts = spec.slice(2).split('/');
  if (kind === 'P') {
    const head = { space: 'spacing', radius: 'radius', stroke: 'stroke', size: 'size' }[parts[0]];
    if (!head) throw new Error(`Unknown primitive dimension ${spec}`);
    return dim(ref(`${head}.${parts.slice(1).join('.')}`));
  }
  return dim(ref(`component.${parts.join('.')}`));
}

function parseTsv(file) {
  return fs
    .readFileSync(path.join(DATA, file), 'utf-8')
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => line.split('\t'));
}

function addColorSemantics(tree, rows, modeIndex) {
  for (const cols of rows) {
    const spec = cols.length === 2 ? cols[1] : cols[modeIndex + 1];
    setAt(tree, ['color', ...cols[0].split('/')], color(colorAlias(spec)));
  }
}

function addComponent(tree, rows, modeIndex) {
  for (const cols of rows) {
    const spec = cols.length === 2 ? cols[1] : cols[modeIndex + 1];
    setAt(tree, ['component', ...cols[0].split('/')], dimAlias(spec));
  }
}

const primitives = JSON.parse(fs.readFileSync(path.join(DATA, 'primitives.json'), 'utf-8'));

/** @type {Record<string, unknown>} */
const global = {};

for (const [name, value] of Object.entries(primitives.color)) {
  setAt(global, ['color', ...name.split('/')], color(value));
}
for (const [name, value] of Object.entries(primitives.spacing)) {
  setAt(global, ['spacing', name], dim(value));
}
for (const [name, value] of Object.entries(primitives.radius)) {
  setAt(global, ['radius', name], dim(value));
}
for (const [name, value] of Object.entries(primitives.stroke)) {
  setAt(global, ['stroke', name], dim(value));
}
for (const [name, value] of Object.entries(primitives.size)) {
  setAt(global, ['size', name], dim(value));
}
for (const [name, value] of Object.entries(primitives.fontSize)) {
  setAt(global, ['font', 'size', name], { $value: px(value), $type: 'fontSize' });
}
for (const [name, value] of Object.entries(primitives.lineHeight)) {
  setAt(global, ['font', 'line-height', name], { $value: px(value), $type: 'dimension' });
}
for (const [name, value] of Object.entries(primitives.fontWeight)) {
  setAt(global, ['font', 'weight', name], { $value: value, $type: 'fontWeight' });
}
for (const [name, value] of Object.entries(primitives.duration)) {
  setAt(global, ['motion', 'duration', name], { $value: `${value}ms`, $type: 'duration' });
}
for (const [name, value] of Object.entries(primitives.easing)) {
  setAt(global, ['motion', 'easing', name], { $value: value, $type: 'cubicBezier' });
}
for (const [name, alias] of Object.entries(primitives.motionSemantic)) {
  const [group, leaf] = name.split('/');
  const target = alias.split('/');
  // Semantic `motion/easing/enter` and primitive `easing/enter` are the same path.
  // Keep the primitive value instead of aliasing the token to itself.
  if (group === target[0] && leaf === target[1]) continue;
  setAt(global, ['motion', group, leaf], {
    $value: ref(`motion.${target.join('.')}`),
    $type: group === 'duration' ? 'duration' : 'cubicBezier',
  });
}
for (const [name, value] of Object.entries(primitives.zLevel)) {
  setAt(global, ['z-index', 'level', name], { $value: value, $type: 'number' });
}
for (const [name, level] of Object.entries(primitives.zSemantic)) {
  setAt(global, ['z-index', name], {
    $value: ref(`z-index.level.${level}`),
    $type: 'number',
  });
}
for (const [name, value] of Object.entries(primitives.layout)) {
  setAt(global, ['layout', ...name.split('/')], dim(value));
}
for (const [mode, values] of Object.entries(primitives.layoutMode)) {
  for (const [name, spec] of Object.entries(values)) {
    const leaf =
      typeof spec === 'number'
        ? { $value: spec, $type: 'number' }
        : { $value: spec, $type: 'dimension' };
    setAt(global, ['layout', mode, ...name.split('/')], leaf);
  }
}
for (const [mode, sizeAlias] of Object.entries(primitives.iconSize)) {
  setAt(global, ['icon', 'size', mode], dim(ref(`component.icon.size.${mode}`)));
}
for (const [mode, stroke] of Object.entries(primitives.iconStroke)) {
  setAt(global, ['icon', 'stroke', mode], dim(stroke));
}

const colorRows = parseTsv('color.tsv');
const dimRows = parseTsv('dimension.tsv');

// Shared component geometry uses the Multibrand column. The three radii that
// differ per brand are still seeded here and overridden below.
addComponent(global, dimRows, 0);

/** @type {Record<string, Record<string, unknown>>} */
const brands = {};
for (const id of BRANDS) brands[id] = {};
// FFVV consumes the Multibrand semantic layer. It does not get an app palette.
brands.ffvv = {};

for (let i = 0; i < MODES.length; i++) {
  addColorSemantics(brands[MODES[i]], colorRows, i);
}
addColorSemantics(brands.ffvv, colorRows, 0);

const families = {
  belcorp: { accent: 'Montserrat', base: 'Montserrat', body: 'Montserrat', display: 'Montserrat' },
  ffvv: { accent: 'Montserrat', base: 'Montserrat', body: 'Montserrat', display: 'Montserrat' },
  esika: { accent: 'Hellix', base: 'Work Sans', body: 'Hellix', display: 'Hellix' },
  lbel: { accent: 'Ivar', base: 'DM Sans', body: 'Gotham', display: 'Sweet Sans Pro' },
  cyzone: { accent: 'Golden Youth Caps', base: 'Red Hat Text', body: 'Lasiver', display: 'Sorren' },
};
for (const [id, faces] of Object.entries(families)) {
  for (const [role, family] of Object.entries(faces)) {
    setAt(brands[id], ['font', 'family', role], { $value: family, $type: 'fontFamily' });
  }
}

// Sub-brands flatten the three semantic radii. Belcorp and FFVV keep Multibrand.
for (const id of ['esika', 'lbel', 'cyzone']) {
  for (const row of dimRows) {
    if (row.length === 2) continue;
    const spec = row[{ esika: 2, lbel: 3, cyzone: 4 }[id]];
    setAt(brands[id], ['component', ...row[0].split('/')], dimAlias(spec));
  }
}

const coreWrite = writeTokensFromTree(global, CORE_TOKENS_DIR);
pruneUnwrittenTokenFiles(CORE_TOKENS_DIR, coreWrite.writtenPaths);

for (const brand of loadAllBrands()) {
  const tree = brands[brand.id];
  if (!tree) throw new Error(`No Fractal export for brand ${brand.id}`);
  const dir = brandTokensDir(brand, 'light');
  const written = writeTokensFromTree(tree, dir);
  pruneUnwrittenTokenFiles(dir, written.writtenPaths);
}

const file = writeStudioDocument(buildStudioDocument());
console.log(`✅ Fractal variables written to ${path.relative(process.cwd(), file)}`);
