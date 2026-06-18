// Tests for the DESIGN.md frontmatter parser: extraction, aliasing, and
// metadata-key handling.

import test from 'node:test';
import assert from 'node:assert/strict';
import YAML from 'yaml';
import { SPEC_TO_CATEGORY, CATEGORY_TO_SPEC } from '../token-name-map.mjs';
import {
  extractFrontmatter,
  buildTokenTreeFromSpec,
  RESERVED_KEYS,
} from '../spec-collection-to-tokens.mjs';

test('extractFrontmatter returns the YAML block, or null when absent', () => {
  assert.equal(extractFrontmatter('---\na: 1\nb: 2\n---\nbody text'), 'a: 1\nb: 2');
  assert.equal(extractFrontmatter('# just markdown, no frontmatter'), null);
});

test('category aliases are exact inverses of each other', () => {
  for (const [specKey, category] of Object.entries(SPEC_TO_CATEGORY)) {
    assert.equal(CATEGORY_TO_SPEC[category], specKey, `${category} ↔ ${specKey}`);
  }
});

test('RESERVED_KEYS covers the documented metadata fields', () => {
  for (const key of ['version', 'name', 'description']) {
    assert.ok(RESERVED_KEYS.has(key), `reserved: ${key}`);
  }
});

test('buildTokenTreeFromSpec applies aliases and skips metadata keys', () => {
  const data = YAML.parse(
    [
      'version: alpha',
      'name: X',
      'description: Y',
      'colors:',
      '  brand:',
      '    primary: "#dc2626"',
      'rounded:',
      '  md: 8px',
      'zIndex:',
      '  modal: 1050',
      'typography:',
      '  weight:',
      '    bold: 700',
    ].join('\n'),
  );

  const { tree, mapped } = buildTokenTreeFromSpec(data);

  assert.equal(mapped, 4, 'only the 4 token leaves are mapped');
  // colors → color
  assert.deepStrictEqual(tree.color.brand.primary, { $value: '#DC2626', $type: 'color' });
  // rounded → radius
  assert.deepStrictEqual(tree.radius.md, { $value: '8px', $type: 'dimension' });
  // zIndex → z-index
  assert.deepStrictEqual(tree['z-index'].modal, { $value: 1050, $type: 'number' });
  // typography → font
  assert.deepStrictEqual(tree.font.weight.bold, { $value: 700, $type: 'fontWeight' });
  // metadata keys never leak into the token tree
  for (const key of ['version', 'name', 'description']) {
    assert.ok(!(key in tree), `${key} not in tree`);
  }
});

test('buildTokenTreeFromSpec tolerates empty / missing frontmatter', () => {
  assert.deepStrictEqual(buildTokenTreeFromSpec(null), { tree: {}, mapped: 0 });
  assert.deepStrictEqual(buildTokenTreeFromSpec({}), { tree: {}, mapped: 0 });
});
