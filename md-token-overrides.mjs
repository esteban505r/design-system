// Parse explicit token values from design-system-foundations.md tables → Figma flat names.

import { FIGMA_TO_TOKEN_PATH } from './token-name-map.mjs';

/**
 * @param {string} figmaName
 * @param {unknown} value
 */
function inferTokenType(figmaName, value) {
  const s = String(value);
  if (s.startsWith('#')) return 'color';
  if (s.startsWith('linear-gradient')) return 'gradient';
  if (figmaName.startsWith('transition-')) return 'duration';
  if (figmaName.startsWith('z-')) return 'number';
  if (figmaName.startsWith('spacing-') || figmaName.startsWith('radius-')) return 'dimension';
  if (figmaName.startsWith('type-')) return 'fontSize';
  return 'string';
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
      if (!figmaName || !FIGMA_TO_TOKEN_PATH[figmaName]) continue;
      overrides.set(figmaName, { $value: `${m[2]}ms`, $type: 'duration' });
    }
    return;
  }

  const re = /`([a-z0-9-]+)`\s+(\d+)/gi;
  let m;
  while ((m = re.exec(cell)) !== null) {
    const figmaName = scaleTokenName(m[1], scale);
    if (!figmaName || !FIGMA_TO_TOKEN_PATH[figmaName]) continue;
    const unit = scale === 'z' ? '' : 'px';
    overrides.set(figmaName, {
      $value: unit ? `${m[2]}${unit}` : Number(m[2]),
      $type: inferTokenType(figmaName, m[2]),
    });
  }
}

/**
 * Values documented in markdown tables (e.g. `primary-color` `#EC4899`, spacing scales).
 * @param {string} md
 * @returns {Map<string, { $value: unknown, $type: string }>}
 */
export function extractMarkdownTokenOverrides(md) {
  /** @type {Map<string, { $value: unknown, $type: string }>} */
  const overrides = new Map();

  const hexPair = /`([a-z0-9-]+)`\s*`(#[0-9A-Fa-f]{3,8})`/gi;
  let match;
  while ((match = hexPair.exec(md)) !== null) {
    const name = match[1];
    if (!FIGMA_TO_TOKEN_PATH[name]) continue;
    overrides.set(name, {
      $value: match[2].toUpperCase(),
      $type: 'color',
    });
  }

  const grad = md.match(
    /--auth-gradient:\s*(linear-gradient\(\s*to\s+bottom\s+right\s*,\s*#[0-9A-Fa-f]{3,8}\s*,\s*#[0-9A-Fa-f]{3,8}\s*\))/i,
  );
  if (grad) {
    overrides.set('auth-gradient', { $value: grad[1], $type: 'gradient' });
  }

  const scaleRowRe =
    /\*\*(Spacing|Radius|Motion|Z-index)\*\*[^|\n]*\|([^|\n]+)\|/gi;
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
    if (!FIGMA_TO_TOKEN_PATH[name]) continue;
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
