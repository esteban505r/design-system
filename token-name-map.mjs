// Shared flat Figma name ↔ nested token path mapping (SomosBelcorp design system).

/** @type {Record<string, string[]>} */
export const FIGMA_TO_TOKEN_PATH = {
  // Color — brand
  'brand-primary': ['color', 'brand', 'primary'],
  'brand-primary-dark': ['color', 'brand', 'primary-dark'],
  'brand-primary-surface': ['color', 'brand', 'primary-surface'],
  'brand-primary-tint': ['color', 'brand', 'primary-tint'],
  'brand-secondary': ['color', 'brand', 'secondary'],
  // Color — surface
  'surface-background': ['color', 'surface', 'background'],
  'surface-color': ['color', 'surface', 'surface'],
  'surface-alt': ['color', 'surface', 'surface-alt'],
  'border-color': ['color', 'surface', 'border'],
  'border-strong': ['color', 'surface', 'border-strong'],
  'surface-disabled': ['color', 'surface', 'disabled'],
  'overlay-color': ['color', 'surface', 'overlay'],
  // Color — text
  'text-primary': ['color', 'text', 'primary'],
  'text-secondary': ['color', 'text', 'secondary'],
  'text-tertiary': ['color', 'text', 'tertiary'],
  'text-disabled': ['color', 'text', 'disabled'],
  'text-placeholder': ['color', 'text', 'placeholder'],
  'text-inverse': ['color', 'text', 'inverse'],
  // Color — semantic
  'success-color': ['color', 'semantic', 'success'],
  'success-surface': ['color', 'semantic', 'success-surface'],
  'error-color': ['color', 'semantic', 'error'],
  'error-container': ['color', 'semantic', 'error-container'],
  'danger-color': ['color', 'semantic', 'danger'],
  'danger-surface': ['color', 'semantic', 'danger-surface'],
  'warning-color': ['color', 'semantic', 'warning'],
  'warning-surface': ['color', 'semantic', 'warning-surface'],
  'info-color': ['color', 'semantic', 'info'],
  'info-surface': ['color', 'semantic', 'info-surface'],
  // Typography — families & weights
  'font-brand': ['font', 'family', 'brand'],
  'font-heading': ['font', 'family', 'heading'],
  'font-regular': ['font', 'weight', 'regular'],
  'font-bold': ['font', 'weight', 'bold'],
  'font-extrabold': ['font', 'weight', 'extrabold'],
  // Typography — sizes
  'type-caption': ['font', 'size', 'caption'],
  'type-body-sm': ['font', 'size', 'body-sm'],
  'type-body': ['font', 'size', 'body'],
  'type-body-md': ['font', 'size', 'body-md'],
  'type-subtitle': ['font', 'size', 'subtitle'],
  'type-h6': ['font', 'size', 'h6'],
  'type-title': ['font', 'size', 'title'],
  'type-h4': ['font', 'size', 'h4'],
  'type-h3': ['font', 'size', 'h3'],
  'type-h2': ['font', 'size', 'h2'],
  'type-h1': ['font', 'size', 'h1'],
  // Typography — line heights
  'leading-caption': ['font', 'line-height', 'caption'],
  'leading-body': ['font', 'line-height', 'body'],
  'leading-body-md': ['font', 'line-height', 'body-md'],
  'leading-subtitle': ['font', 'line-height', 'subtitle'],
  'leading-h6': ['font', 'line-height', 'h6'],
  'leading-h4': ['font', 'line-height', 'h4'],
  'leading-h3': ['font', 'line-height', 'h3'],
  'leading-h2': ['font', 'line-height', 'h2'],
  'leading-h1': ['font', 'line-height', 'h1'],
  // Spacing
  'spacing-xxs': ['spacing', 'xxs'],
  'spacing-xs': ['spacing', 'xs'],
  'spacing-sm': ['spacing', 'sm'],
  'spacing-md': ['spacing', 'md'],
  'spacing-lg': ['spacing', 'lg'],
  'spacing-xl': ['spacing', 'xl'],
  'spacing-xxl': ['spacing', 'xxl'],
  'spacing-xxxl': ['spacing', 'xxxl'],
  // Radius
  'radius-xs': ['radius', 'xs'],
  'radius-sm': ['radius', 'sm'],
  'radius-md': ['radius', 'md'],
  'radius-lg': ['radius', 'lg'],
  'radius-xl': ['radius', 'xl'],
  'radius-xxl': ['radius', 'xxl'],
  'radius-pill': ['radius', 'pill'],
  // Stroke
  'stroke-sm': ['stroke', 'sm'],
  'stroke-md': ['stroke', 'md'],
  'stroke-lg': ['stroke', 'lg'],
  // Motion
  'transition-fast': ['motion', 'duration', 'fast'],
  'transition-base': ['motion', 'duration', 'base'],
  'transition-slow': ['motion', 'duration', 'slow'],
};

/** @type {Map<string, string>} */
const pathToFigmaCache = new Map(
  Object.entries(FIGMA_TO_TOKEN_PATH).map(([figma, p]) => [p.join('|'), figma]),
);

const FONT_FAMILY_LEAVES = ['brand', 'heading'];
const FONT_WEIGHT_LEAVES = ['regular', 'medium', 'semibold', 'bold', 'extrabold'];

/**
 * @param {string[]} tokenPath
 */
export function tokenPathToFigmaName(tokenPath) {
  const key = tokenPath.join('|');
  const cached = pathToFigmaCache.get(key);
  if (cached) return cached;

  const [category, group, ...rest] = tokenPath;
  const leaf = rest.length > 0 ? rest.join('-') : group;

  if (category === 'color' && group === 'brand') return `brand-${leaf}`;
  if (category === 'color' && group === 'text') return `text-${leaf}`;
  if (category === 'color' && group === 'surface') return `surface-${leaf}`;
  if (category === 'color' && group === 'semantic') return leaf.includes('-') ? leaf : `${leaf}-color`;
  if (category === 'font' && group === 'size') return `type-${leaf}`;
  if (category === 'font' && group === 'line-height') return `leading-${leaf}`;
  if (category === 'font' && group === 'weight') return `font-${leaf}`;
  if (category === 'font' && group === 'family') return `font-${leaf}`;
  if (category === 'spacing') return `spacing-${group}`;
  if (category === 'radius') return `radius-${group}`;
  if (category === 'stroke') return `stroke-${group}`;
  if (category === 'motion' && group === 'duration') return `transition-${leaf}`;

  return tokenPath.join('-');
}

/** @param {unknown} value @param {string} unit */
function withUnit(value, unit) {
  const s = String(value).trim();
  const m = s.match(/^([\d.]+)(?:px|dp|sp|ms)?$/i);
  if (!m) return s;
  return `${m[1]}${unit}`;
}

/**
 * @param {string} figmaName
 * @param {{ $value: unknown, $type?: string }} figmaToken
 */
export function figmaTokenToDtcg(figmaName, figmaToken) {
  const { $value, $type } = figmaToken;

  if ($type === 'color') {
    const v = String($value);
    const normalized = v.startsWith('#') ? v.toUpperCase() : v;
    return { $value: normalized, $type: 'color' };
  }

  if (figmaName.startsWith('font-') && FONT_FAMILY_LEAVES.includes(figmaName.slice(5))) {
    return { $value: String($value), $type: 'fontFamily' };
  }

  if (figmaName.startsWith('font-') && FONT_WEIGHT_LEAVES.includes(figmaName.slice(5))) {
    return { $value: $value, $type: 'fontWeight' };
  }

  if (figmaName.startsWith('transition-')) {
    return { $value: withUnit($value, 'ms'), $type: 'duration' };
  }

  if (figmaName.startsWith('type-')) {
    return { $value: withUnit($value, 'px'), $type: 'fontSize' };
  }

  if (
    figmaName.startsWith('leading-') ||
    figmaName.startsWith('spacing-') ||
    figmaName.startsWith('radius-') ||
    figmaName.startsWith('stroke-')
  ) {
    return { $value: withUnit($value, 'px'), $type: 'dimension' };
  }

  return { $value, $type: $type || 'string' };
}
