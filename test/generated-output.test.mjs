// Guards on dist/ — these encode the two defect classes that shipped silently
// because CI only ever grepped the Android outputs:
//
//   1. `className` set as a file-level key instead of under `options`, so
//      Style Dictionary emitted `public class {` / `class {` — files that do
//      not compile.
//   2. The built-in rem→px size transforms multiplying every dimension by
//      basePxFontSize (16), so spacing-4 came out as 192 instead of 12.
//
// Both were invisible to a human reading a 300-line generated file.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { REPO_ROOT, brandDistDir, loadAllBrands } from '../pipeline/brands.mjs';

const read = (abs) => fs.readFileSync(abs, 'utf-8');

/** The generated files every brand must produce, keyed by platform. */
const distFilesFor = (brand) => {
  const d = brandDistDir(brand);
  return {
    compose: path.join(d, 'compose/DesignTokens.kt'),
    swift: path.join(d, 'ios/DesignTokens.swift'),
    dart: path.join(d, 'flutter/design_tokens.dart'),
    androidDimens: path.join(d, 'android/dimens.xml'),
  };
};

const brands = loadAllBrands();
const rel = (abs) => path.relative(REPO_ROOT, abs);

for (const brand of brands) {
const DIST = distFilesFor(brand);
const t = (name, fn) => test(`[${brand.id}] ${name}`, fn);

t('every generated file exists (run `pnpm run build` first)', () => {
  for (const abs of Object.values(DIST)) {
    assert.ok(fs.existsSync(abs), `missing ${rel(abs)}`);
  }
});

t('generated types are named — no anonymous class declarations', () => {
  assert.match(read(DIST.swift), /public class DesignTokens \{/);
  assert.match(read(DIST.dart), /class DesignTokens \{/);
  assert.match(read(DIST.compose), /object DesignTokens \{/);

  for (const [name, abs] of Object.entries(DIST)) {
    if (name === 'androidDimens') continue;
    const anonymous = read(abs)
      .split('\n')
      .filter((l) => /^\s*(public\s+)?(class|object)\s*\{\s*$/.test(l));
    assert.deepEqual(anonymous, [], `${rel(abs)} has an anonymous type declaration`);
  }
});

/** name → numeric value, per platform. */
function composeDimens(src) {
  return Object.fromEntries(
    [...src.matchAll(/val (\w+) = ([\d.]+)\.(?:dp|sp)/g)].map((m) => [m[1], Number(m[2])]),
  );
}
function swiftDimens(src) {
  return Object.fromEntries(
    [...src.matchAll(/let (\w+) = CGFloat\(([\d.]+)\)/g)].map((m) => [m[1], Number(m[2])]),
  );
}
function dartDimens(src) {
  return Object.fromEntries(
    [...src.matchAll(/const (\w+) = ([\d.]+);/g)].map((m) => [m[1], Number(m[2])]),
  );
}

t('dimension values agree across Compose, Swift and Dart', () => {
  const compose = composeDimens(read(DIST.compose));
  const swift = swiftDimens(read(DIST.swift));
  const dart = dartDimens(read(DIST.dart));

  const shared = Object.keys(compose).filter((k) => k in swift && k in dart);
  assert.ok(shared.length > 20, `expected many shared dimensions, got ${shared.length}`);

  const mismatched = shared.filter(
    (k) => !(compose[k] === swift[k] && compose[k] === dart[k]),
  );
  assert.deepEqual(
    mismatched.map((k) => `${k}: compose=${compose[k]} swift=${swift[k]} dart=${dart[k]}`),
    [],
    'a platform is scaling dimensions differently (the rem→px ×16 bug)',
  );
});

t('known dimensions keep their 1:1 px scale', () => {
  // Anchors with hand-checked values. If a built-in rem transform sneaks back
  // in, these become 16× larger.
  const expected = { spacing4: 12, radiusMd: 8, fontSizeH1: 40 };
  const compose = composeDimens(read(DIST.compose));
  const swift = swiftDimens(read(DIST.swift));
  const dart = dartDimens(read(DIST.dart));

  for (const [name, value] of Object.entries(expected)) {
    assert.equal(compose[name], value, `compose ${name}`);
    assert.equal(swift[name], value, `swift ${name}`);
    assert.equal(dart[name], value, `dart ${name}`);
  }
});

t('android dimens.xml is well formed and unscaled', () => {
  const xml = read(DIST.androidDimens);
  // `28pxpx` — the malformed-unit signature the publish workflow greps for.
  assert.doesNotMatch(xml, /\d(px){2,}/, 'malformed duplicated unit');
  assert.match(xml, /<dimen name="spacing_4">12dp<\/dimen>/);
  assert.match(xml, /<dimen name="font_size_h1">40sp<\/dimen>/);
});

t('no unresolved CSS leaks into typed platform outputs', () => {
  // rgba()/cubic-bezier() are valid CSS but not valid Kotlin/Swift/Dart values.
  for (const abs of [DIST.compose, DIST.swift, DIST.dart]) {
    const src = read(abs);
    assert.doesNotMatch(src, /=\s*rgba\(/, `${rel(abs)} contains a raw rgba() value`);
    assert.doesNotMatch(src, /=\s*cubic-bezier\(/, `${rel(abs)} contains a raw cubic-bezier()`);
  }
});

t('shadow and cubicBezier tokens are omitted from typed languages', () => {
  // They are CSS strings with no single-value equivalent. Emitting them raw
  // produced `let elevation1 = 0px 1px 2px rgba(0, 0, 0, 0.05)`.
  for (const abs of [DIST.compose, DIST.swift, DIST.dart]) {
    const body = read(abs)
      .split('\n')
      .filter((l) => !l.trimStart().startsWith('//'))
      .join('\n');
    assert.doesNotMatch(body, /\belevation1\b/, `${rel(abs)} still emits a shadow token`);
    assert.doesNotMatch(body, /\bmotionEasing/, `${rel(abs)} still emits a cubicBezier token`);
  }
});

t('swift imports the framework its values actually come from', () => {
  // Style Dictionary picks the import from the transformGroup *name*: only the
  // literal 'ios-swift' yields UIKit, anything else silently yields SwiftUI.
  // Our colours are UIColor(...), so a SwiftUI-only import is wrong.
  const src = read(DIST.swift);
  if (/UIColor\(/.test(src)) {
    assert.match(src, /^import UIKit$/m, 'file uses UIColor but does not import UIKit');
  }
});

t('string-valued tokens are quoted', () => {
  // Unquoted, a font family emits as a bare identifier and does not compile.
  assert.match(read(DIST.swift), /let fontFamilyPrimary = "[^"]+"/);
  assert.match(read(DIST.dart), /const fontFamilyPrimary = "[^"]+"/);
});
}
