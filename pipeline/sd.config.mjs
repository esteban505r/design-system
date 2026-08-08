import StyleDictionary from 'style-dictionary';
import fs from 'node:fs';
import path from 'node:path';
import { brandDistDir, loadAllBrands, resolveBrandArg, tokenSources } from './brands.mjs';

// VERSION at the repo root is the release-version source of truth
// (written by set-release-version.mjs). Stamped into DESIGN.md.
// One VERSION for all brands: a brand-only change bumps everyone, which is
// cheap, where per-brand versions would multiply the release matrix by N.
const RELEASE_VERSION = (() => {
  try {
    return fs.readFileSync(new URL('../VERSION', import.meta.url), 'utf-8').trim();
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
// Token values are px. Every built-in size transform treats them as rem and
// multiplies by basePxFontSize (16) — 4px in Figma → 64dp. So NONE of the
// built-in `android`, `compose`, `ios-swift` or `flutter` transformGroups may
// be used here; each has a 1:1 replacement below:
//
//   android      → android/px      (size/pxToAndroidUnit)
//   compose      → compose/typed   (size/pxToComposeDp, size/pxToComposeSp)
//   ios-swift    → ios/px          (size/pxToSwiftCGFloat)
//   flutter      → flutter/px      (size/pxToFlutterDouble)

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

// shadow and cubicBezier are CSS strings ("0px 1px 2px rgba(…)",
// "cubic-bezier(…)") with no single-value equivalent in Swift or Dart. Emitted
// raw they become bare unquoted expressions that do not compile, so they are
// filtered out of those platforms the same way COMPOSE_SUPPORTED_TYPES filters
// them out of Kotlin. fontFamily IS representable — see font/quoteFamily.
const TYPED_LANG_UNSUPPORTED_TYPES = new Set(['shadow', 'cubicBezier']);

/** @param {{ $type?: string }} token */
const isTypedLangSupported = (token) => !TYPED_LANG_UNSUPPORTED_TYPES.has(token.$type ?? '');

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

/**
 * One Style Dictionary config per brand × mode. Everything above this point —
 * transforms, transform groups and formats — is brand-agnostic and shared, so
 * adding a brand adds token *values*, never pipeline code.
 *
 * @param {import('./brands.mjs').Brand} brand
 * @param {string} mode
 */
const configFor = (brand, mode) => {
  // Relative so Style Dictionary's own logging stays readable.
  const dist = `${path.relative(process.cwd(), brandDistDir(brand))}/`;

  return {
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
      // Swift/Dart have no dp-vs-sp distinction, so one transform covers both
      // dimension and fontSize. Built-in size/swift/remToCGFloat and
      // size/flutter/remToDouble multiply by basePxFontSize (16) — see the
      // header note; our values are already px, so emit them 1:1.
      'size/pxToSwiftCGFloat': {
        type: 'value',
        filter: (token) => token.$type === 'dimension' || token.$type === 'fontSize',
        transform: (token) => {
          const n = parsePx(token.$value);
          return `CGFloat(${(Number.isNaN(n) ? 0 : n).toFixed(2)})`;
        },
      },
      'size/pxToFlutterDouble': {
        type: 'value',
        filter: (token) => token.$type === 'dimension' || token.$type === 'fontSize',
        transform: (token) => {
          const n = parsePx(token.$value);
          return (Number.isNaN(n) ? 0 : n).toFixed(2);
        },
      },
      // A font family is a string; without quoting it emits as a bare
      // identifier (`let fontFamilyPrimary = Montserrat`) and does not compile.
      'font/quoteFamily': {
        type: 'value',
        filter: (token) => token.$type === 'fontFamily',
        transform: (token) => `"${String(token.$value).replace(/"/g, '\\"')}"`,
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
      // iOS/Flutter groups without the built-in rem→px transforms (which
      // multiply by 16). Otherwise identical to the built-in ios-swift/flutter
      // groups, so colour and asset handling stays stock.
      'ios/px': [
        'attribute/cti',
        'name/camel',
        'color/UIColorSwift',
        'content/swift/literal',
        'asset/swift/literal',
        'size/pxToSwiftCGFloat',
        'font/quoteFamily',
      ],
      'flutter/px': [
        'attribute/cti',
        'name/camel',
        'color/hex8flutter',
        'size/pxToFlutterDouble',
        'content/flutter/literal',
        'asset/flutter/literal',
        'font/quoteFamily',
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
        const brandName = options.brand?.name ?? 'Design System';
        const brandId = options.brand?.id ?? 'brand';
        const figmaPath = `brands/${brandId}/figma/tokens.json`;
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
        out.push(`# ${brandName} Design System — Token Reference\n`);
        out.push(
          '> ## 🤖 Automatically generated — do not edit\n' +
            '>\n' +
            '> This file is written by `pipeline/sd.config.mjs` (the `markdown/design-doc`\n' +
            `> format) from **\`${figmaPath}\`**, the single source of truth. Any edit you\n` +
            '> make here is overwritten the next time it regenerates.\n' +
            '>\n' +
            '> **To change a value:** change the token in Figma, export to\n' +
            `> \`${figmaPath}\`, then run \`pnpm run sync\`.\n`,
        );
        out.push('### When this file regenerates\n');
        out.push('| When | What triggers it |');
        out.push('|---|---|');
        out.push(`| \`pnpm run sync\` (or \`sync:figma\`) | Manually, after editing \`${figmaPath}\` |`);
        out.push('| `pnpm run build` | Style Dictionary rebuild — the `docs` platform runs with every other platform |');
        out.push(`| **Sync tokens from Figma JSON** workflow | A push touching \`${figmaPath}\`, or manual dispatch |`);
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
          'Generated by `pipeline/sd.config.mjs` (`markdown/design-doc`). ' +
            'See `docs/releasing-android.md` for how a change here reaches an application.\n',
        );
        return out.join('\n');
      },
    },
  },
  source: tokenSources(brand, mode),
  platforms: {

    // ── Web: CSS Custom Properties ─────────────────────────
    css: {
      transformGroup: 'css',
      buildPath: `${dist}web/`,
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
      buildPath: `${dist}web/`,
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
      buildPath: `${dist}android/`,
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
      transformGroup: 'ios/px',
      buildPath: `${dist}ios/`,
      files: [
        {
          destination: 'DesignTokens.swift',
          format: 'ios-swift/class.swift',
          filter: isTypedLangSupported,
          // className MUST live under `options` — as a file-level key Style
          // Dictionary never receives it and emits `public class {`, which
          // does not compile. Same trap as flutter below; compare compose.
          options: {
            className: 'DesignTokens',
            // Pinned: Style Dictionary picks the import from the transformGroup
            // *name* (only the literal 'ios-swift' yields UIKit, anything else
            // yields SwiftUI). Our values are UIColor(...), a UIKit type, so
            // this must not drift with the group name.
            import: ['UIKit'],
          },
        },
      ],
    },

    // ── Flutter: Dart constants ──────────────────────────────
    flutter: {
      transformGroup: 'flutter/px',
      buildPath: `${dist}flutter/`,
      files: [
        {
          destination: 'design_tokens.dart',
          format: 'flutter/class.dart',
          filter: isTypedLangSupported,
          // See the iOS note above: file-level `className` is silently ignored.
          options: {
            className: 'DesignTokens',
          },
        },
      ],
    },

    // ── Compose / KMP: Kotlin object ────────────────────────
    // Uses our compose/typed group (1:1 px → dp/sp) — never the built-in `compose` group.
    compose: {
      transformGroup: 'compose/typed',
      buildPath: `${dist}compose/`,
      files: [
        {
          destination: 'DesignTokens.kt',
          format: 'compose/typed-object',
          options: {
            className: 'DesignTokens',
            packageName: brand.composePackage,
          },
        },
      ],
    },

    // ── JSON dump (for debugging / other tools) ─────────────
    json: {
      transformGroup: 'js',
      buildPath: `${dist}json/`,
      files: [
        {
          destination: 'tokens.json',
          format: 'json/flat',
        },
      ],
    },

    // ── DESIGN.md: the human-facing catalogue ──────────────
    // One per brand, next to that brand's tokens — each brand has its own
    // palette, so a single root catalogue could only ever describe one of them.
    // No transformGroup: the doc shows source values and derives every
    // platform identifier from token.path itself.
    docs: {
      buildPath: `${path.relative(process.cwd(), brand.dir)}/`,
      options: { version: RELEASE_VERSION, brand, mode },
      files: [
        {
          destination: 'DESIGN.md',
          format: 'markdown/design-doc',
        },
      ],
    },
  },
  };
};

// Build every brand × mode, or just the one named by --brand.
const only = process.argv.includes('--brand') || process.env.BRAND ? [resolveBrandArg()] : null;
const brands = only ?? loadAllBrands();

if (brands.length === 0) {
  console.error('❌ No brands found under brands/ — each needs a brand.json');
  process.exit(1);
}

// Only `light` is built today. The resolver (brands.mjs) already layers any
// mode, but every platform here writes one flat file per artifact, so building
// a second mode would overwrite the first rather than sit beside it as
// values-night/ or a dark ColorScheme. Emitting those is Phase 3 generator
// work; until then, building only light is honest rather than lossy.
for (const brand of brands) {
  const sd = new StyleDictionary(configFor(brand, 'light'));
  await sd.buildAllPlatforms();
}

console.log(`\n✅ Built ${brands.map((b) => b.id).join(', ')} successfully!\n`);
