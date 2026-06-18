// Unit tests for specValueToDtcg — the path-keyed DTCG type inference that turns
// plain DESIGN.md frontmatter values into typed tokens.

import test from 'node:test';
import assert from 'node:assert/strict';
import { specValueToDtcg } from '../token-name-map.mjs';

test('colors: hex is uppercased, typed color', () => {
  assert.deepStrictEqual(specValueToDtcg(['color', 'brand', 'primary'], '#dc2626'), {
    $value: '#DC2626',
    $type: 'color',
  });
});

test('colors: 8-digit hex (alpha) is uppercased', () => {
  assert.deepStrictEqual(specValueToDtcg(['color', 'brand', 'primary-tint-15'], '#ef444426'), {
    $value: '#EF444426',
    $type: 'color',
  });
});

test('colors: non-hex values pass through untouched', () => {
  assert.deepStrictEqual(specValueToDtcg(['color', 'misc', 'overlay'], 'rgba(0,0,0,0.5)'), {
    $value: 'rgba(0,0,0,0.5)',
    $type: 'color',
  });
});

test('gradient: auth is typed gradient, value untouched', () => {
  const v = 'linear-gradient(to bottom right, #DC2626, #2E0505)';
  assert.deepStrictEqual(specValueToDtcg(['color', 'gradient', 'auth'], v), {
    $value: v,
    $type: 'gradient',
  });
});

test('gradient: color stops are plain colors, not gradients', () => {
  assert.deepStrictEqual(specValueToDtcg(['color', 'gradient', 'auth-gradient-color-1'], '#B91C1C'), {
    $value: '#B91C1C',
    $type: 'color',
  });
});

test('typography.family → fontFamily string', () => {
  assert.deepStrictEqual(specValueToDtcg(['font', 'family', 'sans'], 'Geist'), {
    $value: 'Geist',
    $type: 'fontFamily',
  });
});

test('typography.weight → fontWeight number (coerces string input)', () => {
  assert.deepStrictEqual(specValueToDtcg(['font', 'weight', 'bold'], 700), {
    $value: 700,
    $type: 'fontWeight',
  });
  assert.deepStrictEqual(specValueToDtcg(['font', 'weight', 'bold'], '700'), {
    $value: 700,
    $type: 'fontWeight',
  });
});

test('typography.size → fontSize px (from px-string or bare number)', () => {
  assert.deepStrictEqual(specValueToDtcg(['font', 'size', 'h1'], '28px'), {
    $value: '28px',
    $type: 'fontSize',
  });
  assert.deepStrictEqual(specValueToDtcg(['font', 'size', 'h1'], 28), {
    $value: '28px',
    $type: 'fontSize',
  });
});

test('spacing & radius → dimension px', () => {
  assert.deepStrictEqual(specValueToDtcg(['spacing', 'md'], '16px'), {
    $value: '16px',
    $type: 'dimension',
  });
  assert.deepStrictEqual(specValueToDtcg(['radius', 'full'], '9999px'), {
    $value: '9999px',
    $type: 'dimension',
  });
});

test('shadow → shadow string', () => {
  const v = '0 1px 2px 0 rgba(0,0,0,0.05)';
  assert.deepStrictEqual(specValueToDtcg(['shadow', 'sm'], v), { $value: v, $type: 'shadow' });
});

test('motion.duration → duration ms (from ms-string or bare number)', () => {
  assert.deepStrictEqual(specValueToDtcg(['motion', 'duration', 'base'], '200ms'), {
    $value: '200ms',
    $type: 'duration',
  });
  assert.deepStrictEqual(specValueToDtcg(['motion', 'duration', 'base'], 200), {
    $value: '200ms',
    $type: 'duration',
  });
});

test('motion.easing → cubicBezier string', () => {
  const v = 'cubic-bezier(.4, 0, .2, 1)';
  assert.deepStrictEqual(specValueToDtcg(['motion', 'easing', 'standard'], v), {
    $value: v,
    $type: 'cubicBezier',
  });
});

test('z-index → number (including 0)', () => {
  assert.deepStrictEqual(specValueToDtcg(['z-index', 'modal'], 1050), {
    $value: 1050,
    $type: 'number',
  });
  assert.deepStrictEqual(specValueToDtcg(['z-index', 'base'], 0), { $value: 0, $type: 'number' });
});
