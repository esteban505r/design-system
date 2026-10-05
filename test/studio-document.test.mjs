// tokens.json is the Tokens Studio file. The folder tree is what Style
// Dictionary reads. The two have to describe the same tokens: expanding the
// document must reproduce every committed DTCG file, and rebuilding the
// document from those files must reproduce tokens.json.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { CORE_TOKENS_DIR, REPO_ROOT, brandTokensDir, loadAllBrands } from '../pipeline/brands.mjs';
import {
  STUDIO_FILE,
  applyPrimitiveColorValues,
  applyStudioDocument,
  buildStudioDocument,
} from '../pipeline/studio-document.mjs';

const brands = loadAllBrands();

/** @param {string} dir */
function jsonFiles(dir) {
  /** @type {string[]} */
  const found = [];
  if (!fs.existsSync(dir)) return found;
  const walk = (sub) => {
    for (const entry of fs.readdirSync(path.join(dir, sub), { withFileTypes: true })) {
      const rel = path.join(sub, entry.name);
      if (entry.isDirectory()) walk(rel);
      else if (entry.name.endsWith('.json')) found.push(rel);
    }
  };
  walk('');
  return found.sort();
}

test('tokens.json brand sets match the token tree', () => {
  const disk = JSON.parse(fs.readFileSync(STUDIO_FILE, 'utf-8'));
  const built = buildStudioDocument();
  // The plugin keeps Figma variable collections in the same file (`Color / Semantic/Multibrand`).
  // Those are not brand sets. Tokens Studio also pluralizes fontSize/fontFamily.
  for (const key of [ 'global', ...brands.map((brand) => brand.id) ]) {
    normalizeTypes(disk[key]);
  }
  // Figma variable edits land in `Color / Primitive/Value`. Expand prefers those
  // values, so the folder tree matches global only after that overlay.
  applyPrimitiveColorValues(disk.global, disk['Color / Primitive/Value']);
  for (const key of [ 'global', ...brands.map((brand) => brand.id) ]) {
    assert.deepEqual(disk[key], built[key], key);
  }
  for (const brand of brands) {
    const theme = disk.$themes.find((item) => item.id === `${brand.id}-light`);
    assert.ok(theme, `missing theme for ${brand.id}`);
  }
});

function normalizeTypes(node) {
  if (!node || typeof node !== 'object') return;
  if (node.$type === 'fontSizes') node.$type = 'fontSize';
  if (node.$type === 'fontFamilies') node.$type = 'fontFamily';
  if (node.$type === 'fontWeights') node.$type = 'fontWeight';
  for (const [key, value] of Object.entries(node)) {
    if (!key.startsWith('$')) normalizeTypes(value);
  }
}

test('expanding tokens.json reproduces the folder tree', () => {
  const doc = JSON.parse(fs.readFileSync(STUDIO_FILE, 'utf-8'));
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ds-studio-'));
  const coreDir = path.join(tmp, 'core');
  /** @type {Map<string, string>} */
  const brandDirs = new Map(brands.map((brand) => [brand.id, path.join(tmp, brand.id)]));

  try {
    applyStudioDocument(doc, {
      coreDir,
      brandDir: (brand) => brandDirs.get(brand.id),
    });

    assertSameTree(CORE_TOKENS_DIR, coreDir);
    for (const brand of brands) {
      assertSameTree(brandTokensDir(brand, 'light'), brandDirs.get(brand.id));
    }
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

/**
 * @param {string} expectedDir
 * @param {string} actualDir
 */
function assertSameTree(expectedDir, actualDir) {
  const expected = jsonFiles(expectedDir);
  const actual = jsonFiles(actualDir);
  assert.deepEqual(
    actual,
    expected,
    `file list differs under ${path.relative(REPO_ROOT, expectedDir)}`,
  );
  for (const rel of expected) {
    const want = fs.readFileSync(path.join(expectedDir, rel), 'utf-8');
    const got = fs.readFileSync(path.join(actualDir, rel), 'utf-8');
    assert.equal(got, want, rel);
  }
}
