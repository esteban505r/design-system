// A Figma export with two token sets used to resolve to `keys[0]` silently. A
// bad Tokens Studio round-trip (real case: commit 7812c58) duplicated the
// collection into `Global/Mode 1` + `Global/Mode 1/Global/Mode 1`, and picking
// the first dropped 36 tokens with no error — every surviving name is mapped,
// so the unmapped guard never fires. It must now fail loudly.

import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveFigmaCollection } from '../pipeline/figma-collection-to-tokens.mjs';

const token = (value) => ({ $value: value, $type: 'color' });

// Shape of the corrupt export, minus 550 tokens of noise.
const CORRUPT = {
  'Global/Mode 1': {
    'bg-brand': token('#BE5B06'),
    'primary-500': token('#BE5B06'),
    'text-primary': token('#111111'),
  },
  'Global/Mode 1/Global/Mode 1': {
    'bg-brand': token('#BE5B06'),
    'primary-500': token('#BE5B06'),
  },
  $themes: [],
  $metadata: { tokenSetOrder: ['Global/Mode 1'] },
};

test('two token sets throw instead of silently picking the first', () => {
  assert.throws(
    () => resolveFigmaCollection(CORRUPT),
    (err) => {
      assert.match(err.message, /2 token sets/);
      assert.match(err.message, /"Global\/Mode 1" \(3 tokens\)/);
      assert.match(err.message, /"Global\/Mode 1\/Global\/Mode 1" \(2 tokens\)/);
      assert.match(err.message, /Tokens Studio round-trip/);
      return true;
    },
  );
});

test('an explicit collection name still resolves a multi-set export', () => {
  const { collectionName, collection } = resolveFigmaCollection(CORRUPT, {
    collectionName: 'Global/Mode 1',
  });
  assert.equal(collectionName, 'Global/Mode 1');
  assert.equal(Object.keys(collection).length, 3);
});

test('a single token set resolves', () => {
  const { collectionName, collection } = resolveFigmaCollection({
    'Global/Mode 1': { 'primary-500': token('#BE5B06') },
    $themes: [],
    $metadata: {},
  });
  assert.equal(collectionName, 'Global/Mode 1');
  assert.equal(collection['primary-500'].$value, '#BE5B06');
});

test('a legitimately nested single collection still unwraps', () => {
  const { collection } = resolveFigmaCollection({
    'Global/Mode 1': {
      'Global/Mode 1': { 'primary-500': token('#BE5B06') },
    },
  });
  assert.deepEqual(Object.keys(collection), ['primary-500']);
});

test('a flat Tokens Studio export is the collection, not many sets', () => {
  const { collectionName, collection } = resolveFigmaCollection({
    'primary-500': token('#BE5B06'),
    'bg-brand': token('#BE5B06'),
  });
  assert.equal(collectionName, 'Global/Mode 1');
  assert.equal(Object.keys(collection).length, 2);
});

test('$themes and $metadata are not counted as token sets', () => {
  const { collection } = resolveFigmaCollection({
    'Global/Mode 1': { 'primary-500': token('#BE5B06') },
    $themes: [{ name: 'light' }],
    $metadata: { tokenSetOrder: ['Global/Mode 1'] },
  });
  assert.deepEqual(Object.keys(collection), ['primary-500']);
});
