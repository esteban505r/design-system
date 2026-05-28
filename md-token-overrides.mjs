// Parse token tables from design-system-foundations.md → Figma flat names.

import { FIGMA_TO_TOKEN_PATH } from './token-name-map.mjs';

/** @param {string} name */
function isMappedToken(name) {
  return Boolean(FIGMA_TO_TOKEN_PATH[name]);
}

/**
 * @param {string} raw
 */
function normalizeValue(raw) {
  const v = raw.trim();
  if (/^#[0-9A-Fa-f]{3,8}$/.test(v)) return v.toUpperCase();
  return v;
}

/**
 * @param {string} figmaName
 * @param {string} rawValue
 */
function valueToToken(figmaName, rawValue) {
  const value = normalizeValue(rawValue);
  if (value.startsWith('linear-gradient')) {
    return { $value: value, $type: 'gradient' };
  }
  if (value.startsWith('cubic-bezier')) {
    return { $value: value, $type: 'cubicBezier' };
  }
  if (value.startsWith('#')) {
    return { $value: value, $type: 'color' };
  }
  if (figmaName.startsWith('transition-')) {
    const ms = value.replace(/\s*ms$/i, '');
    return { $value: `${ms}ms`, $type: 'duration' };
  }
  if (figmaName.startsWith('z-')) {
    return { $value: Number(value), $type: 'number' };
  }
  if (figmaName.startsWith('spacing-') || figmaName.startsWith('radius-')) {
    const n = value.replace(/\s*px$/i, '');
    return { $value: `${n}px`, $type: 'dimension' };
  }
  if (figmaName.startsWith('type-')) {
    const n = value.replace(/\s*px$/i, '');
    return { $value: `${n}px`, $type: 'fontSize' };
  }
  return { $value: value, $type: 'string' };
}

/**
 * @param {string} name
 * @param {string} value
 */
function registerPair(overrides, name, value) {
  if (!isMappedToken(name)) return false;
  if (/^(Token|Value|Scale|Tokens)$/i.test(name)) return false;
  overrides.set(name, valueToToken(name, value));
  return true;
}

/**
 * `| `token` | `value` |` and 4-column variant in Design tokens section.
 * @param {string} md
 * @param {Map<string, { $value: unknown, $type: string }>} overrides
 */
function parseTokenValueTables(md, overrides) {
  const section = md.match(/## Design tokens[\s\S]*?(?=\n---\n|\n## [^#])/);
  const body = section ? section[0] : md;
  let count = 0;

  for (const line of body.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|') || trimmed.includes('---')) continue;
    if (/^\|\s*Token\s*\|/i.test(trimmed)) continue;

    const cells = [...trimmed.matchAll(/`([^`]+)`/g)].map((m) => m[1].trim());
    for (let i = 0; i + 1 < cells.length; i += 2) {
      const name = cells[i];
      const value = cells[i + 1];
      if (!name || !value) continue;
      if (registerPair(overrides, name, value)) count++;
    }
  }
  return count;
}

/**
 * @param {string} shortName
 * @param {'spacing' | 'radius' | 'motion' | 'z'} scale
 */
function scaleTokenName(shortName, scale) {
  if (scale === 'spacing') return `spacing-${shortName}`;
  if (scale === 'radius') return `radius-${shortName}`;
  if (scale === 'motion') return `transition-${shortName}`;
  if (scale === 'z') return `z-${shortName}`;
  return null;
}

/**
 * @param {string} cell
 * @param {'spacing' | 'radius' | 'motion' | 'z'} scale
 * @param {Map<string, { $value: unknown, $type: string }>} overrides
 */
function parseScaleCell(cell, scale, overrides) {
  if (scale === 'motion') {
    const motionRe = /`([a-z0-9-]+)`\s+(\d+)\s*ms/gi;
    let m;
    while ((m = motionRe.exec(cell)) !== null) {
      const figmaName = scaleTokenName(m[1], scale);
      if (!figmaName) continue;
      registerPair(overrides, figmaName, `${m[2]}ms`);
    }
    const easing = cell.match(/`cubic-bezier\(([^)]+)\)`/i);
    if (easing) {
      registerPair(overrides, 'easing-standard', `cubic-bezier(${easing[1]})`);
    }
    return;
  }

  const re = /`([a-z0-9-]+)`\s+(\d+)/gi;
  let m;
  while ((m = re.exec(cell)) !== null) {
    const figmaName = scaleTokenName(m[1], scale);
    if (!figmaName) continue;
    const unit = scale === 'z' ? String(m[2]) : `${m[2]}px`;
    registerPair(overrides, figmaName, unit);
  }

  if (scale === 'z') {
    const range = cell.match(/`([a-z0-9-]+)`\s+(\d+)\s*→\s*`([a-z0-9-]+)`\s+(\d+)/i);
    if (range) {
      registerPair(overrides, scaleTokenName(range[1], scale), range[2]);
      registerPair(overrides, scaleTokenName(range[3], scale), range[4]);
    }
  }
}

/**
 * @param {string} md
 * @returns {Map<string, { $value: unknown, $type: string }>}
 */
export function extractMarkdownTokenOverrides(md) {
  /** @type {Map<string, { $value: unknown, $type: string }>} */
  const overrides = new Map();

  parseTokenValueTables(md, overrides);

  const scaleRowRe =
    /\*\*(Spacing|Radius|Motion|Z-index)\*\*[^|\n]*\|([^|\n]+)\|/gi;
  let match;
  while ((match = scaleRowRe.exec(md)) !== null) {
    const kind = match[1].toLowerCase().replace('-index', '');
    /** @type {'spacing' | 'radius' | 'motion' | 'z'} */
    const scale = kind === 'z' ? 'z' : /** @type {const} */ (kind);
    parseScaleCell(match[2], scale, overrides);
  }

  return overrides;
}

/**
 * @param {Record<string, unknown>} collection
 * @param {Map<string, { $value: unknown, $type: string }>} overrides
 * @returns {number}
 */
export function applyMarkdownOverrides(collection, overrides) {
  let count = 0;
  for (const [name, patch] of overrides) {
    if (!isMappedToken(name) && !(name in collection)) continue;
    const prev = collection[name];
    collection[name] = {
      ...(typeof prev === 'object' && prev !== null ? prev : {}),
      $value: patch.$value,
      $type: patch.$type,
    };
    count++;
  }
  return count;
}
