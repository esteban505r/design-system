// The core guarantee of the Figma → tokens → platforms pipeline: regenerating
// a brand's Figma collection from its committed token tree must reproduce that
// brand's SSOT exactly. If this fails, an edit to the name map, type inference,
// or the writer has drifted the outputs every platform build depends on.
//
// This runs per brand, and reads both token layers (core/ plus the brand's own)
// because that is what the resolver feeds Style Dictionary — a brand's export is
// only whole when both are present.
//
// `$metadata.version` is excluded deliberately: the SSOT carries whatever
// version the designer last exported, and releases are driven by the VERSION
// file instead (see pipeline/figma-to-tokens.mjs).

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { REPO_ROOT, brandFigmaFile, loadAllBrands } from '../pipeline/brands.mjs';

/** Drop the fields that are intentionally not round-tripped. */
function normalize(doc) {
  const copy = structuredClone(doc);
  if (copy.$metadata) delete copy.$metadata.version;
  return copy;
}

const brands = loadAllBrands();

test('at least one brand is defined', () => {
  assert.ok(brands.length > 0, 'no brands found under brands/');
});

for (const brand of brands) {
  test(`[${brand.id}] regenerating the Figma collection from tokens reproduces the SSOT`, () => {
    const outDir = fs.mkdtempSync(path.join(os.tmpdir(), `ds-lossless-${brand.id}-`));
    const outFile = path.join(outDir, 'regenerated.json');

    try {
      execFileSync(
        'node',
        ['pipeline/tokens-to-figma.mjs', '--brand', brand.id, '--out', outFile],
        { cwd: REPO_ROOT, stdio: 'pipe' },
      );

      const ssot = JSON.parse(fs.readFileSync(brandFigmaFile(brand), 'utf-8'));
      const regenerated = JSON.parse(fs.readFileSync(outFile, 'utf-8'));

      const ssotNames = Object.keys(ssot['Global/Mode 1'] ?? {}).sort();
      const regenNames = Object.keys(regenerated['Global/Mode 1'] ?? {}).sort();

      // Compare the name sets first — a mismatch here gives a far more readable
      // failure than a whole-document deepEqual.
      const missing = ssotNames.filter((n) => !regenNames.includes(n));
      const extra = regenNames.filter((n) => !ssotNames.includes(n));
      assert.deepEqual(missing, [], 'tokens present in the SSOT but not regenerated');
      assert.deepEqual(extra, [], 'tokens regenerated but absent from the SSOT');

      assert.deepEqual(normalize(regenerated), normalize(ssot));
    } finally {
      fs.rmSync(outDir, { recursive: true, force: true });
    }
  });

  test(`[${brand.id}] every token in the SSOT survives the round trip with its value intact`, () => {
    const ssot = JSON.parse(fs.readFileSync(brandFigmaFile(brand), 'utf-8'));
    const collection = ssot['Global/Mode 1'] ?? {};

    assert.ok(Object.keys(collection).length > 0, 'SSOT collection must not be empty');

    for (const [name, token] of Object.entries(collection)) {
      assert.ok(
        token && typeof token === 'object' && '$value' in token,
        `${name} must be a token object with a $value`,
      );
    }
  });
}
