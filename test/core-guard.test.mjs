// core/tokens/ holds the scales every brand shares. Only a brand with
// `ownsCore` may rewrite them; for anyone else a disagreement must fail the
// build rather than silently win or lose, because last-writer-wins would make
// the built output depend on the order brands happen to be processed in.
//
// This is not hypothetical: the Oter set on the `main` branch disagrees with
// Belcorp on radius.sm (6 vs 4), motion.duration.fast (150 vs 100),
// z-index.modal (1050 vs 200) and z-index.toast (1060 vs 300).

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { writeTokensFromFigmaSource } from '../pipeline/figma-collection-to-tokens.mjs';

/** A Figma collection carrying one core token and one brand token. */
const collection = (radiusSm) => ({
  'radius-sm': { $value: radiusSm, $type: 'number' },
  'primary-500': { $value: '#BE5B06', $type: 'color' },
});

function withTempDirs(fn) {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'ds-core-guard-'));
  const coreDir = path.join(base, 'core');
  const brandDir = path.join(base, 'brand');
  fs.mkdirSync(coreDir, { recursive: true });
  fs.mkdirSync(brandDir, { recursive: true });
  try {
    return fn({ coreDir, brandDir });
  } finally {
    fs.rmSync(base, { recursive: true, force: true });
  }
}

test('a core-owning brand writes core/ and the brand tree to separate roots', () => {
  withTempDirs(({ coreDir, brandDir }) => {
    writeTokensFromFigmaSource(collection(4), { coreDir, brandDir, ownsCore: true });

    const radius = JSON.parse(fs.readFileSync(path.join(coreDir, 'radius/radius.json'), 'utf-8'));
    assert.equal(radius.radius.sm.$value, '4px', 'radius belongs to core/');

    assert.ok(
      fs.existsSync(path.join(brandDir, 'color/primary.json')),
      'colour belongs to the brand, not core/',
    );
    assert.ok(
      !fs.existsSync(path.join(brandDir, 'radius/radius.json')),
      'a core category must not be duplicated into the brand tree',
    );
  });
});

test('a non-core-owning brand that agrees with core/ is accepted', () => {
  withTempDirs(({ coreDir, brandDir }) => {
    writeTokensFromFigmaSource(collection(4), { coreDir, brandDir, ownsCore: true });
    // Same value, different brand — must pass, and must not leave scratch files.
    writeTokensFromFigmaSource(collection(4), { coreDir, brandDir, ownsCore: false });
    assert.ok(!fs.existsSync(path.join(coreDir, '.check')), 'comparison scratch dir was cleaned up');
  });
});

test('a non-core-owning brand that disagrees with core/ fails loudly', () => {
  withTempDirs(({ coreDir, brandDir }) => {
    writeTokensFromFigmaSource(collection(4), { coreDir, brandDir, ownsCore: true });

    assert.throws(
      // Exactly the Oter/Belcorp radius.sm disagreement.
      () => writeTokensFromFigmaSource(collection(6), { coreDir, brandDir, ownsCore: false }),
      (err) => {
        assert.match(err.message, /disagrees with core/);
        assert.match(err.message, /radius\.json/);
        return true;
      },
    );

    // The rejected value must not have been written anywhere.
    const radius = JSON.parse(fs.readFileSync(path.join(coreDir, 'radius/radius.json'), 'utf-8'));
    assert.equal(radius.radius.sm.$value, '4px', 'core/ kept the owning brand’s value');
    assert.ok(!fs.existsSync(path.join(coreDir, '.check')), 'comparison scratch dir was cleaned up');
  });
});
