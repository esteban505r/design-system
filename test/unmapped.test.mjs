// A Figma token with no entry in FIGMA_TO_TOKEN_PATH used to be dropped with a
// console warning, so a designer who added a variable saw it vanish from every
// platform with no error anywhere. It must now fail loudly.

import test from 'node:test';
import assert from 'node:assert/strict';
import { buildTokenTreeFromFigmaCollection } from '../pipeline/figma-collection-to-tokens.mjs';

const KNOWN = { 'primary-500': { $value: '#BE5B06', $type: 'color' } };
const UNKNOWN = { 'totally-new-token': { $value: '#123456', $type: 'color' } };

test('an unmapped token throws, naming the offender', () => {
  assert.throws(
    () => buildTokenTreeFromFigmaCollection({ ...KNOWN, ...UNKNOWN }),
    (err) => {
      assert.match(err.message, /totally-new-token/);
      assert.match(err.message, /token-name-map\.mjs/);
      return true;
    },
  );
});

test('allowUnmapped downgrades the failure to a skip', () => {
  const result = buildTokenTreeFromFigmaCollection(
    { ...KNOWN, ...UNKNOWN },
    { allowUnmapped: true },
  );
  assert.equal(result.mapped, 1);
  assert.equal(result.skipped, 1);
  assert.deepEqual(result.unmapped, ['totally-new-token']);
});

test('a fully mapped collection needs no escape hatch', () => {
  const result = buildTokenTreeFromFigmaCollection(KNOWN);
  assert.equal(result.mapped, 1);
  assert.equal(result.skipped, 0);
  assert.equal(result.tree.color.primary['500'].$value, '#BE5B06');
});

test('entries that are not tokens are ignored, not treated as unmapped', () => {
  const result = buildTokenTreeFromFigmaCollection({
    ...KNOWN,
    'not-a-token': 'just a string',
  });
  assert.equal(result.mapped, 1);
  assert.equal(result.skipped, 0);
});
