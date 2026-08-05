import StyleDictionary from 'style-dictionary';
import fs from 'node:fs';

// VERSION at the repo root is the release-version source of truth
// (written by set-release-version.mjs). Stamped into DESIGN.md.
const RELEASE_VERSION = (() => {
  try {
    return fs.readFileSync(new URL('./VERSION', import.meta.url), 'utf-8').trim();
  } catch {
    return '0.0.0';
  }
})();

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
  const s = String(value).trim();
  const m = s.match(/^([\d.]+)(?:px|dp|sp)?$/i);
  return m ? Number.parseFloat(m[1]) : Number.NaN;
}

/**
 * @param {unknown} value
 * @param {'dp' | 'sp'} unit
 */
function toAndroidDimen(value, unit) {
  const n = parsePx(value);
  if (!Number.isNaN(n)) return `${n}${unit}`;
  const s = String(value).trim();
  if (/^\d+(\.\d+)?(dp|sp)$/i.test(s)) return s.toLowerCase();
  const num = s.match(/^([\d.]+)/);
  if (num) return `${num[1]}${unit}`;
  return s;
}

/**
 * Compose Kotlin literal for a dimension token, matching the Android XML 1:1 px → dp scale.
 * The default Style Dictionary compose group uses size/remToDp which multiplies by 16, so a
 * 2px token becomes 32.dp — do not use it.
 * @param {unknown} value
 * @param {'dp' | 'sp'} unit
 */
function toComposeLiteral(value, unit) {
  const n = parsePx(value);
  return Number.isNaN(n) ? `0.${unit}` : `${n}.${unit}`;
}

// Compose token types this repo can express as real Compose values.
// Shadow / cubicBezier / fontFamily need first-class Compose types (Shadow, Easing, FontFamily)
// that depend on runtime resources — leave them XML-only for now.
const COMPOSE_SUPPORTED_TYPES = new Set([
  'color',
  'dimension',
  'fontSize',
  'number',
  'fontWeight',
  'duration',
]);

/**
 * @param {{ path?: string[] } | undefined} token
 */
function isFontSizeOrLineHeight(token) {
  return token?.path?.[0] === 'font' && ['size', 'line-height'].includes(token.path?.[1]);
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

// ── DESIGN.md helpers ──────────────────────────────────────
// Every platform derives its identifier from token.path, so the human-facing
// catalogue can list all of them side by side without building each platform.
const pathToCamel = (p) => {
  const parts = p.join('-').split(/[-_]/).filter(Boolean);
  return (
    parts[0].toLowerCase() +
    parts
      .slice(1)
      .map((s) => s[0].toUpperCase() + s.slice(1))
      .join('')
  );
};
const pathToSnake = (p) => p.join('_').replace(/-/g, '_').toLowerCase();
const pathToKebab = (p) => `--${p.join('-').replace(/_/g, '-').toLowerCase()}`;

/** Section heading for a token: color.primary.500 → "color · primary". */
const groupOf = (token) => {
  const p = token.path ?? [];
  return p.length > 2 ? `${p[0]} · ${p[1]}` : (p[0] ?? 'other');
};

/**
 * Android resource kind for a token type, matching how the android/*-all
 * formats below split tokens across colors/dimens/integers/strings.xml.
 * A reference to the wrong resource kind will not compile, so this must
 * stay in step with those formats.
 */
const androidResourceKind = (type) => {
  if (type === 'color') return 'color';
  if (type === 'dimension' || type === 'fontSize') return 'dimen';
  if (type === 'number' || type === 'fontWeight' || type === 'duration') return 'integer';
  return 'string';
};

const sd = new StyleDictionary({
  hooks: {
    transforms: {
      'size/pxToAndroidUnit': {
        type: 'value',
        filter: (token) => token.$type === 'dimension' || token.$type === 'fontSize',
        transform: (token) => {
          const unit =
            token.$type === 'fontSize' || token.path?.[0] === 'font' ? 'sp' : 'dp';
          return toAndroidDimen(token.$value, unit);
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
      // Emit `X.dp` for non-typography dimension tokens.
      'size/pxToComposeDp': {
        type: 'value',
        filter: (token) =>
          token.$type === 'dimension' && !isFontSizeOrLineHeight(token),
        transform: (token) => toComposeLiteral(token.$value, 'dp'),
      },
      // Emit `X.sp` for fontSize + font.line-height (Compose treats both as TextUnit).
      'size/pxToComposeSp': {
        type: 'value',
        filter: (token) => token.$type === 'fontSize' || isFontSizeOrLineHeight(token),
        transform: (token) => toComposeLiteral(token.$value, 'sp'),
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
      // Compose group without the built-in size/remToDp (which multiplies px by 16).
      'compose/typed': [
        'attribute/cti',
        'name/camel',
        'color/composeColor',
        'size/pxToComposeDp',
        'size/pxToComposeSp',
        'duration/msInteger',
      ],
    },
    formats: {
      // Built-in android/dimens skips fontSize; android/fontDimens only has fontSize.
      // One dimens.xml matches Android docs and R.dimen.* for everything.
      'android/dimens-all': async ({ dictionary }) => {
        const lines = dictionary.allTokens
          .filter((t) => {
            if (t.$type === 'fontSize') return true;
            if (t.$type !== 'dimension') return false;
            // Typography dimensions (font.size.*, font.line-height.*) must use sp in dimens.xml
            if (t.path?.[0] === 'font' && ['size', 'line-height'].includes(t.path?.[1])) {
              return true;
            }
            return t.path?.[0] !== 'font';
          })
          .map((t) => `  <dimen name="${t.name}">${t.$value}</dimen>`);
        return `${ANDROID_XML_HEADER}<resources>\n${lines.join('\n')}\n</resources>\n`;
      },
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
          .map(
            (t) =>
              `  <string name="${t.name}" translatable="false">${escAndroidString(t.$value)}</string>`,
          );
        return `${ANDROID_XML_HEADER}<resources>\n${lines.join('\n')}\n</resources>\n`;
      },
      // Compose object: only emit tokens with a real Compose representation.
      // Assumes the compose/typed transformGroup has already turned $value into a valid Kotlin literal.
      'compose/typed-object': async ({ dictionary, options }) => {
        const packageName = options.packageName ?? 'com.estebanruano.designtokens';
        const className = options.className ?? 'DesignTokens';
        const skipped = [];
        const lines = [];
        for (const token of dictionary.allTokens) {
          if (!COMPOSE_SUPPORTED_TYPES.has(token.$type)) {
            skipped.push(`${token.name} (${token.$type})`);
            continue;
          }
          lines.push(`    val ${token.name} = ${token.$value}`);
        }
        const skippedComment =
          skipped.length > 0
            ? `\n// Skipped (no Compose representation): ${skipped.join(', ')}\n`
            : '\n';
        return `// Do not edit directly — auto-generated by sd.config.mjs (compose/typed).
// Source: https://github.com/esteban505r/design-system
${skippedComment}
package ${packageName}

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

object ${className} {
${lines.join('\n')}
}
`;
      },
      // Human-facing token catalogue. Generated from the same source as every
      // other platform so it cannot drift from what the apps actually consume.
      'markdown/design-doc': async ({ dictionary, options }) => {
        const version = options.version ?? '0.0.0';
        const all = dictionary.allTokens;

        const byGroup = new Map();
        for (const t of all) {
          const g = groupOf(t);
          if (!byGroup.has(g)) byGroup.set(g, []);
          byGroup.get(g).push(t);
        }

        const counts = {};
        for (const t of all) counts[t.$type] = (counts[t.$type] ?? 0) + 1;

        const out = [];
        out.push('# Belcorp Design System — Token Reference\n');
        out.push(
          '> ## 🤖 Automatically generated — do not edit\n' +
            '>\n' +
            '> This file is written by `sd.config.mjs` (the `markdown/design-doc` format)\n' +
            '> from **`figma/tokens.json`**, the single source of truth. Any edit you make\n' +
            '> here is overwritten the next time it regenerates.\n' +
            '>\n' +
            '> **To change a value:** change the token in Figma, export to\n' +
            '> `figma/tokens.json`, then run `pnpm run sync`.\n',
        );
        out.push('### When this file regenerates\n');
        out.push('| When | What triggers it |');
        out.push('|---|---|');
        out.push('| `pnpm run sync` (or `sync:figma`) | Manually, after editing `figma/tokens.json` |');
        out.push('| `pnpm run build` | Style Dictionary rebuild — the `docs` platform runs with every other platform |');
        out.push('| **Sync tokens from Figma JSON** workflow | A push touching `figma/tokens.json`, or manual dispatch |');
        out.push('| **Publish Android library** / **Publish web** | Both re-run `sync:figma` from a clean checkout before publishing |');
        out.push('| **CI**, on every PR to `main` or `belcorp` | Re-runs `sync:figma` and **fails the build if this file differs** from what was committed |\n');
        out.push(
          'That last row is what keeps it honest: a stale `DESIGN.md` blocks the PR, ' +
            'so what you read here always matches the artifact the apps compile against.\n',
        );
        out.push(`**Version:** ${version}  `);
        out.push(`**Tokens:** ${all.length}  `);
        out.push(
          `**By type:** ${Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .map(([k, v]) => `${k} ${v}`)
            .join(' · ')}\n`,
        );

        out.push('## How to reference a token\n');
        out.push(
          'Every token below is listed with the exact identifier to type on each platform.\n',
        );
        out.push('| Platform | Import | Example |');
        out.push('|---|---|---|');
        out.push(
          '| Compose | `com.estebanruano.designtokens.DesignTokens` | `DesignTokens.colorPrimary500` |',
        );
        out.push('| Android XML | AAR resources | `@color/color_primary_500` |');
        out.push('| iOS (Swift) | `DesignTokens` | `DesignTokens.colorPrimary500` |');
        out.push('| Flutter | `design_tokens.dart` | `DesignTokens.colorPrimary500` |');
        out.push('| Web (CSS) | `tokens.css` | `var(--color-primary-500)` |');
        out.push('| Web (JS) | `tokens.js` | `ColorPrimary500` |\n');

        out.push('## Contents\n');
        for (const g of [...byGroup.keys()].sort()) {
          const anchor = g.replace(/ · /g, '--').replace(/[^a-z0-9-]/gi, '-').toLowerCase();
          out.push(`- [${g}](#${anchor}) — ${byGroup.get(g).length}`);
        }
        out.push('');

        for (const g of [...byGroup.keys()].sort()) {
          const tokens = byGroup.get(g).sort((a, b) => a.path.join().localeCompare(b.path.join()));
          out.push(`## ${g}\n`);
          out.push('| Token | Value | Compose / iOS / Flutter | Android XML | CSS |');
          out.push('|---|---|---|---|---|');
          for (const t of tokens) {
            const p = t.path;
            const value = String(t.original?.$value ?? t.$value);
            // Compose, iOS and Flutter only emit types they can represent;
            // show an em dash rather than an identifier that does not exist.
            const code = COMPOSE_SUPPORTED_TYPES.has(t.$type) ? `\`${pathToCamel(p)}\`` : '—';
            const res = `\`@${androidResourceKind(t.$type)}/${pathToSnake(p)}\``;
            out.push(
              `| \`${p.join('.')}\` | \`${value}\` | ${code} | ${res} | \`${pathToKebab(p)}\` |`,
            );
          }
          out.push('');
        }

        out.push('---\n');
        out.push(
          'Generated by `sd.config.mjs` (`markdown/design-doc`). ' +
            'See `docs/releasing-android.md` for how a change here reaches an application.\n',
        );
        return out.join('\n');
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
          format: 'android/dimens-all',
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
    // Uses our compose/typed group (1:1 px → dp/sp) — never the built-in `compose` group.
    compose: {
      transformGroup: 'compose/typed',
      buildPath: 'dist/compose/',
      files: [
        {
          destination: 'DesignTokens.kt',
          format: 'compose/typed-object',
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

    // ── DESIGN.md: the human-facing catalogue ──────────────
    // Written to the repo root so it is the first thing a reader finds.
    // No transformGroup: the doc shows source values and derives every
    // platform identifier from token.path itself.
    docs: {
      buildPath: './',
      options: { version: RELEASE_VERSION },
      files: [
        {
          destination: 'DESIGN.md',
          format: 'markdown/design-doc',
        },
      ],
    },
  },
});

// Build all platforms
await sd.buildAllPlatforms();
console.log('\n✅ All platforms built successfully!\n');
