// Shared flat Figma name ↔ nested token path mapping (Oter design system).

/** @type {Record<string, string[]>} */
export const FIGMA_TO_TOKEN_PATH = {
  'primary-color': ['color', 'brand', 'primary'],
  'primary-hover': ['color', 'brand', 'primary-hover'],
  'primary-light': ['color', 'brand', 'primary-light'],
  'primary-tint-15': ['color', 'brand', 'primary-tint-15'],
  'primary-tint-20': ['color', 'brand', 'primary-tint-20'],
  'background-color': ['color', 'surface', 'background'],
  'surface-color': ['color', 'surface', 'surface'],
  'surface-hover': ['color', 'surface', 'surface-hover'],
  'border-color': ['color', 'surface', 'border'],
  'border-light': ['color', 'surface', 'border-light'],
  'text-primary': ['color', 'text', 'primary'],
  'text-secondary': ['color', 'text', 'secondary'],
  'text-tertiary': ['color', 'text', 'tertiary'],
  'success-color': ['color', 'semantic', 'success'],
  'success-hover': ['color', 'semantic', 'success-hover'],
  'warning-color': ['color', 'semantic', 'warning'],
  'warning-hover': ['color', 'semantic', 'warning-hover'],
  'danger-color': ['color', 'semantic', 'danger'],
  'danger-hover': ['color', 'semantic', 'danger-hover'],
  'info-color': ['color', 'semantic', 'info'],
  'info-hover': ['color', 'semantic', 'info-hover'],
  'urgency-urgent': ['color', 'eisenhower', 'urgency-urgent'],
  'urgency-moderate': ['color', 'eisenhower', 'urgency-moderate'],
  'urgency-not': ['color', 'eisenhower', 'urgency-not'],
  'importance-high': ['color', 'eisenhower', 'importance-high'],
  'importance-medium': ['color', 'eisenhower', 'importance-medium'],
  'importance-low': ['color', 'eisenhower', 'importance-low'],
  'auth-gradient': ['color', 'gradient', 'auth'],
  'auth-gradient-color-1': ['color', 'gradient', 'auth-gradient-color-1'],
  'auth-gradient-color-2': ['color', 'gradient', 'auth-gradient-color-2'],
  'font-sans': ['font', 'family', 'sans'],
  'font-mono': ['font', 'family', 'mono'],
  'font-mobile': ['font', 'family', 'mobile'],
  'font-brand': ['font', 'family', 'brand'],
  'font-regular': ['font', 'weight', 'regular'],
  'font-medium': ['font', 'weight', 'medium'],
  'font-semibold': ['font', 'weight', 'semibold'],
  'font-bold': ['font', 'weight', 'bold'],
  'font-extrabold': ['font', 'weight', 'extrabold'],
  'type-h1': ['font', 'size', 'h1'],
  'type-h2': ['font', 'size', 'h2'],
  'type-h3': ['font', 'size', 'h3'],
  'type-h4': ['font', 'size', 'h4'],
  'type-h5': ['font', 'size', 'h5'],
  'type-h6': ['font', 'size', 'h6'],
  'type-body': ['font', 'size', 'body'],
  'type-body-sm': ['font', 'size', 'body-sm'],
  'type-caption': ['font', 'size', 'caption'],
  'type-button': ['font', 'size', 'button'],
  'type-mono': ['font', 'size', 'mono'],
  'spacing-xs': ['spacing', 'xs'],
  'spacing-sm': ['spacing', 'sm'],
  'spacing-md': ['spacing', 'md'],
  'spacing-lg': ['spacing', 'lg'],
  'spacing-xl': ['spacing', 'xl'],
  'spacing-xxl': ['spacing', 'xxl'],
  'radius-sm': ['radius', 'sm'],
  'radius-md': ['radius', 'md'],
  'radius-lg': ['radius', 'lg'],
  'radius-xl': ['radius', 'xl'],
  'radius-full': ['radius', 'full'],
  'shadow-sm': ['shadow', 'sm'],
  'shadow-md': ['shadow', 'md'],
  'shadow-lg': ['shadow', 'lg'],
  'shadow-xl': ['shadow', 'xl'],
  'transition-fast': ['motion', 'duration', 'fast'],
  'transition-base': ['motion', 'duration', 'base'],
  'transition-slow': ['motion', 'duration', 'slow'],
  'easing-standard': ['motion', 'easing', 'standard'],
  'z-base': ['z-index', 'base'],
  'z-dropdown': ['z-index', 'dropdown'],
  'z-sticky': ['z-index', 'sticky'],
  'z-fixed': ['z-index', 'fixed'],
  'z-modal-backdrop': ['z-index', 'modal-backdrop'],
  'z-modal': ['z-index', 'modal'],
  'z-toast': ['z-index', 'toast'],
  'z-tooltip': ['z-index', 'tooltip'],
};

/** @type {Map<string, string>} */
const pathToFigmaCache = new Map(
  Object.entries(FIGMA_TO_TOKEN_PATH).map(([figma, p]) => [p.join('|'), figma]),
);

/**
 * @param {string[]} tokenPath
 */
export function tokenPathToFigmaName(tokenPath) {
  const key = tokenPath.join('|');
  const cached = pathToFigmaCache.get(key);
  if (cached) return cached;

  const [category, group, ...rest] = tokenPath;
  const leaf = rest.length > 0 ? rest.join('-') : group;

  if (category === 'color' && group === 'text') return `text-${leaf}`;
  if (category === 'color' && (group === 'brand' || group === 'surface' || group === 'semantic')) {
    return leaf;
  }
  if (category === 'color' && group === 'gradient') {
    if (leaf === 'auth') return 'auth-gradient';
    return leaf;
  }
  if (category === 'color' && group === 'eisenhower') return leaf;
  if (category === 'font' && group === 'size') return `type-${leaf}`;
  if (category === 'font' && group === 'weight') return `font-${leaf}`;
  if (category === 'font' && group === 'family') return `font-${leaf}`;
  if (category === 'spacing') return `spacing-${group}`;
  if (category === 'radius') return `radius-${group}`;
  if (category === 'shadow') return `shadow-${group}`;
  if (category === 'motion' && group === 'duration') return `transition-${leaf}`;
  if (category === 'motion' && group === 'easing') return `easing-${leaf}`;
  if (category === 'z-index') return `z-${group}`;

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

  if (figmaName === 'auth-gradient') {
    return { $value, $type: 'gradient' };
  }

  if ($type === 'color') {
    const v = String($value);
    const normalized =
      v.startsWith('#') ? v.toUpperCase() : v;
    return { $value: normalized, $type: 'color' };
  }

  if (figmaName.startsWith('font-') && ['sans', 'mono', 'mobile', 'brand'].includes(figmaName.slice(5))) {
    return { $value: String($value), $type: 'fontFamily' };
  }

  if (
    figmaName.startsWith('font-') &&
    ['regular', 'medium', 'semibold', 'bold', 'extrabold'].includes(figmaName.slice(5))
  ) {
    return { $value: $value, $type: 'fontWeight' };
  }

  if (figmaName.startsWith('z-')) {
    return { $value: $value, $type: 'number' };
  }

  if (figmaName.startsWith('transition-')) {
    return { $value: withUnit($value, 'ms'), $type: 'duration' };
  }

  if (figmaName.startsWith('shadow-')) {
    return { $value: String($value), $type: 'shadow' };
  }

  if (figmaName === 'easing-standard') {
    return { $value: String($value), $type: 'cubicBezier' };
  }

  if (figmaName.startsWith('type-')) {
    return { $value: withUnit($value, 'px'), $type: 'fontSize' };
  }

  if (figmaName.startsWith('spacing-') || figmaName.startsWith('radius-')) {
    return { $value: withUnit($value, 'px'), $type: 'dimension' };
  }

  return { $value, $type: $type || 'string' };
}
