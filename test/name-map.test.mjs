// The name map is the contract between what a designer types in Figma and the
// identifier every platform emits. A drift here silently renames or drops
// tokens in consumers, so both directions are pinned.

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  FIGMA_TO_TOKEN_PATH,
  tokenPathToFigmaName,
  figmaTokenToDtcg,
} from '../pipeline/token-name-map.mjs';

test('tokenPathToFigmaName inverts FIGMA_TO_TOKEN_PATH', () => {
  const broken = [];
  for (const [figmaName, tokenPath] of Object.entries(FIGMA_TO_TOKEN_PATH)) {
    const roundTripped = tokenPathToFigmaName(tokenPath);
    if (roundTripped !== figmaName) {
      broken.push(`${figmaName} → [${tokenPath.join(', ')}] → ${roundTripped}`);
    }
  }
  assert.deepEqual(broken, [], 'these names do not survive a path round trip');
});

test('token paths are unique — no two Figma names claim the same path', () => {
  const seen = new Map();
  const collisions = [];
  for (const [figmaName, tokenPath] of Object.entries(FIGMA_TO_TOKEN_PATH)) {
    const key = tokenPath.join('.');
    if (seen.has(key)) collisions.push(`${key}: ${seen.get(key)} and ${figmaName}`);
    seen.set(key, figmaName);
  }
  assert.deepEqual(collisions, []);
});

// Nested Figma variables (tokens.json) are the source of truth. The legacy map
// still has to round-trip the old flat names; new paths are emitted with
// tokenPathToFigmaName's fallback and do not need an entry here.

test('figmaTokenToDtcg assigns the right $type by name prefix', () => {
  const cases = [
    ['primary-500', { $value: '#be5b06', $type: 'color' }, 'color', '#BE5B06'],
    ['type-h1', { $value: 40 }, 'fontSize', '40px'],
    ['transition-fast', { $value: 150 }, 'duration', '150ms'],
    ['space-4', { $value: 12 }, 'dimension', '12px'],
  ];
  for (const [name, input, expectedType, expectedValue] of cases) {
    const out = figmaTokenToDtcg(name, input);
    assert.equal(out.$type, expectedType, `${name} $type`);
    assert.equal(out.$value, expectedValue, `${name} $value`);
  }
});

test('colour hex is normalised to uppercase', () => {
  assert.equal(figmaTokenToDtcg('primary-500', { $value: '#be5b06', $type: 'color' }).$value, '#BE5B06');
  assert.equal(figmaTokenToDtcg('primary-500', { $value: '#BE5B06', $type: 'color' }).$value, '#BE5B06');
});
