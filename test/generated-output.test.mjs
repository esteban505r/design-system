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
    androidIntegers: path.join(d, 'android/integers.xml'),
    androidStrings: path.join(d, 'android/strings.xml'),
    androidColors: path.join(d, 'android/colors.xml'),
  };
};

/** The `bds_` namespace carried by every non-colour Android resource. */
const ANDROID_RES_PREFIX = 'bds_';

/** Every `name="…"` declared in an Android values file. */
const resourceNames = (src) => [...src.matchAll(/\sname="([^"]+)"/g)].map((m) => m[1]);

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
    if (name.startsWith('android')) continue;
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
  // in, these become 16× larger. spacing/radius come from core/, so every brand
  // has them whatever its own token set contains.
  const expected = { spacing4: 12, radiusMd: 8 };
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
  assert.match(xml, /<dimen name="bds_spacing_4">12dp<\/dimen>/);
});

// ── Android resource namespacing ───────────────────────────
// AGP merges the AAR's res/values into the app's flat namespace, and on a name
// clash the *application* silently wins — no warning, no build failure, just a
// wrong value at runtime. `android.resourcePrefix` cannot guard this, because
// it lints every resource in the library against one prefix and colours are
// deliberately left bare. These tests are that guard instead.

t('non-colour android resources are namespaced with bds_', () => {
  for (const key of ['androidDimens', 'androidIntegers', 'androidStrings']) {
    const names = resourceNames(read(DIST[key]));
    assert.ok(names.length > 0, `${rel(DIST[key])} declares no resources`);
    const bare = names.filter((n) => !n.startsWith(ANDROID_RES_PREFIX));
    assert.deepEqual(bare, [], `${rel(DIST[key])} has unprefixed resource names`);
  }
});

t('android colours are deliberately NOT prefixed', () => {
  // color_* is distinctive enough not to collide and carries hundreds of
  // @color/ references in the consumer apps. Prefixing it is a breaking
  // migration for no benefit — if this fails, the prefix has leaked.
  const names = resourceNames(read(DIST.androidColors));
  assert.ok(names.length > 0, `${rel(DIST.androidColors)} declares no resources`);
  const prefixed = names.filter((n) => n.startsWith(ANDROID_RES_PREFIX));
  assert.deepEqual(prefixed, [], `${rel(DIST.androidColors)} has bds_-prefixed colours`);
});

t('the XML prefix does not leak into the Compose object', () => {
  // The prefix is applied where each XML file writes name="…", not to
  // token.name — so Compose (how both Android consumers actually read tokens)
  // is untouched. DesignTokens.kt is already namespaced by object + package.
  const src = read(DIST.compose);
  assert.match(src, /\bval color[A-Z]\w* = Color\(/, 'no colour tokens to check');
  assert.doesNotMatch(src, /bds_/, `${rel(DIST.compose)} picked up the XML resource prefix`);
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
  // Only brands that ship a font family have one to check — FFVV is colour-only.
  const swift = read(DIST.swift);
  if (/let fontFamilyPrimary\b/.test(swift)) {
    assert.match(swift, /let fontFamilyPrimary = "[^"]+"/);
    assert.match(read(DIST.dart), /const fontFamilyPrimary = "[^"]+"/);
  }
});
}

// ── Belcorp's published contract ────────────────────────────
// The tests above hold for every brand. These are specific to Belcorp because
// they pin identifiers a shipped consumer already compiles against: renaming
// any of them breaks app-consultoras-replatform-android at its next bump.
const belcorp = brands.find((b) => b.id === 'belcorp');
if (belcorp) {
  const D = distFilesFor(belcorp);

  test('[belcorp] the identifiers the live consumer references still exist', () => {
    assert.match(read(D.compose), /\bcolorPrimary500\b/, 'Compose: colorPrimary500');
    assert.ok(
      resourceNames(read(D.androidColors)).includes('color_primary_500'),
      'XML: @color/color_primary_500',
    );
    assert.match(read(D.androidDimens), /<dimen name="bds_font_size_h1">36sp<\/dimen>/);
  });
}
