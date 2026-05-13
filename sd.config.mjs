import StyleDictionary from 'style-dictionary';

// ============================================================
// Style Dictionary Config — Design System Tokens
// ============================================================
// This config reads all token JSON files from tokens/ and
// builds platform-specific outputs into build/.
//
// Run:  npm run build
// ============================================================

const sd = new StyleDictionary({
  source: ['tokens/**/*.json'],
  platforms: {

    // ── Web: CSS Custom Properties ─────────────────────────
    css: {
      transformGroup: 'css',
      buildPath: 'build/web/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,  // keeps references like var(--color-primary-500)
          },
        },
      ],
    },

    // ── Web: JavaScript / TypeScript module ─────────────────
    js: {
      transformGroup: 'js',
      buildPath: 'build/web/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
      ],
    },

    // ── Android: XML resources ──────────────────────────────
    android: {
      transformGroup: 'android',
      buildPath: 'build/android/',
      files: [
        {
          destination: 'colors.xml',
          format: 'android/colors',
          filter: (token) => token.$type === 'color',
        },
        {
          destination: 'dimens.xml',
          format: 'android/dimens',
          filter: (token) => token.$type === 'dimension',
        },
        {
          destination: 'font_dimens.xml',
          format: 'android/fontDimens',
          filter: (token) => token.path?.[0] === 'font' && token.$type === 'dimension',
        },
      ],
    },

    // ── iOS: Swift file ─────────────────────────────────────
    ios: {
      transformGroup: 'ios-swift',
      buildPath: 'build/ios/',
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
      buildPath: 'build/flutter/',
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
      buildPath: 'build/compose/',
      files: [
        {
          destination: 'DesignTokens.kt',
          format: 'compose/object',
          className: 'DesignTokens',
          packageName: 'com.yourorg.designtokens',
        },
      ],
    },

    // ── JSON dump (for debugging / other tools) ─────────────
    json: {
      transformGroup: 'js',
      buildPath: 'build/json/',
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
