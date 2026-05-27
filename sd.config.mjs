import StyleDictionary from 'style-dictionary';

// ============================================================
// Style Dictionary Config — Design System Tokens
// ============================================================
// This config reads all token JSON files from tokens/ and
// builds platform-specific outputs into dist/ (Gradle uses ./build/).
//
// Run:  pnpm run build
// ============================================================
//
// Android: do NOT use the built-in `android` transformGroup — its
// size/remToDp treats numeric values as rem and multiplies by 16
// (4px in Figma → 64dp). We use 1:1 px → dp/sp instead.

/** @param {unknown} value */
function parsePx(value) {
  const m = String(value).match(/^([\d.]+)px$/);
  return m ? Number.parseFloat(m[1]) : Number.NaN;
}

const ANDROID_XML_HEADER = `<?xml version="1.0" encoding="UTF-8"?>

<!--
  Do not edit directly, this file was auto-generated.
-->
`;

/** @param {string} value */
function escAndroidString(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '\\"');
}

const sd = new StyleDictionary({
  hooks: {
    transforms: {
      'size/pxToAndroidUnit': {
        type: 'value',
        filter: (token) => token.$type === 'dimension' || token.$type === 'fontSize',
        transform: (token) => {
          const n = parsePx(token.$value);
          if (Number.isNaN(n)) return token.$value;
          const unit =
            token.$type === 'fontSize' || token.path?.[0] === 'font' ? 'sp' : 'dp';
          return `${n}${unit}`;
        },
      },
      'duration/msInteger': {
        type: 'value',
        filter: (token) => token.$type === 'duration',
        transform: (token) => {
          const m = String(token.$value).match(/^(\d+)ms$/);
          return m ? Number(m[1]) : token.$value;
        },
      },
    },
    transformGroups: {
      'android/px': [
        'attribute/cti',
        'name/snake',
        'color/hex8android',
        'size/pxToAndroidUnit',
        'duration/msInteger',
      ],
    },
    formats: {
      'android/integers-all': async ({ dictionary }) => {
        const lines = dictionary.allTokens
          .filter((t) => ['number', 'fontWeight', 'duration'].includes(t.$type))
          .map((t) => `  <integer name="${t.name}">${t.$value}</integer>`);
        return `${ANDROID_XML_HEADER}<resources>\n${lines.join('\n')}\n</resources>\n`;
      },
      'android/strings-all': async ({ dictionary }) => {
        const lines = dictionary.allTokens
          .filter((t) =>
            ['fontFamily', 'shadow', 'cubicBezier', 'gradient'].includes(t.$type),
          )
          .map((t) => `  <string name="${t.name}">${escAndroidString(t.$value)}</string>`);
        return `${ANDROID_XML_HEADER}<resources>\n${lines.join('\n')}\n</resources>\n`;
      },
    },
  },
  source: ['tokens/**/*.json'],
  platforms: {

    // ── Web: CSS Custom Properties ─────────────────────────
    css: {
      transformGroup: 'css',
      buildPath: 'dist/web/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,  // keeps references like var(--color-brand-primary)
          },
        },
      ],
    },

    // ── Web: JavaScript / TypeScript module ─────────────────
    js: {
      transformGroup: 'js',
      buildPath: 'dist/web/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
      ],
    },

    // ── Android: XML resources ──────────────────────────────
    android: {
      transformGroup: 'android/px',
      buildPath: 'dist/android/',
      files: [
        {
          destination: 'colors.xml',
          format: 'android/colors',
          filter: (token) => token.$type === 'color',
        },
        {
          destination: 'dimens.xml',
          format: 'android/dimens',
          filter: (token) =>
            token.$type === 'dimension' && token.path?.[0] !== 'font',
        },
        {
          destination: 'font_dimens.xml',
          format: 'android/fontDimens',
          filter: (token) =>
            token.path?.[0] === 'font' &&
            (token.$type === 'fontSize' || token.$type === 'dimension'),
        },
        {
          destination: 'integers.xml',
          format: 'android/integers-all',
        },
        {
          destination: 'strings.xml',
          format: 'android/strings-all',
        },
      ],
    },

    // ── iOS: Swift file ─────────────────────────────────────
    ios: {
      transformGroup: 'ios-swift',
      buildPath: 'dist/ios/',
      files: [
        {
          destination: 'DesignTokens.swift',
          format: 'ios-swift/class.swift',
          className: 'DesignTokens',
        },
      ],
    },

    // ── Flutter: Dart constants ──────────────────────────────
    flutter: {
      transformGroup: 'flutter',
      buildPath: 'dist/flutter/',
      files: [
        {
          destination: 'design_tokens.dart',
          format: 'flutter/class.dart',
          className: 'DesignTokens',
        },
      ],
    },

    // ── Compose / KMP: Kotlin object ────────────────────────
    compose: {
      transformGroup: 'compose',
      buildPath: 'dist/compose/',
      files: [
        {
          destination: 'DesignTokens.kt',
          format: 'compose/object',
          options: {
            className: 'DesignTokens',
            packageName: 'com.estebanruano.designtokens',
          },
        },
      ],
    },

    // ── JSON dump (for debugging / other tools) ─────────────
    json: {
      transformGroup: 'js',
      buildPath: 'dist/json/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/flat',
        },
      ],
    },
  },
});

// Build all platforms
await sd.buildAllPlatforms();
console.log('\n✅ All platforms built successfully!\n');
