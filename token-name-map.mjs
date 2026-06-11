// Shared flat Figma name ↔ nested token path mapping (Belcorp Design System 5.0).
// Flat names mirror the CSS custom properties in the DS source (tokens.css).

/** @type {Record<string, string[]>} */
export const FIGMA_TO_TOKEN_PATH = {
  // ── Color primitives — primary purple ramp ──────────────
  'primary-00': ['color', 'primary', '00'],
  'primary-50': ['color', 'primary', '50'],
  'primary-100': ['color', 'primary', '100'],
  'primary-200': ['color', 'primary', '200'],
  'primary-300': ['color', 'primary', '300'],
  'primary-400': ['color', 'primary', '400'],
  'primary-500': ['color', 'primary', '500'],
  'primary-600': ['color', 'primary', '600'],
  'primary-700': ['color', 'primary', '700'],
  'primary-800': ['color', 'primary', '800'],
  // ── Color primitives — secondary gold ramp ──────────────
  'secondary-00': ['color', 'secondary', '00'],
  'secondary-50': ['color', 'secondary', '50'],
  'secondary-100': ['color', 'secondary', '100'],
  'secondary-200': ['color', 'secondary', '200'],
  'secondary-300': ['color', 'secondary', '300'],
  'secondary-400': ['color', 'secondary', '400'],
  'secondary-500': ['color', 'secondary', '500'],
  'secondary-600': ['color', 'secondary', '600'],
  'secondary-700': ['color', 'secondary', '700'],
  'secondary-800': ['color', 'secondary', '800'],
  // ── Color primitives — cool grey neutrals ────────────────
  'neutral-0': ['color', 'neutral', '0'],
  'neutral-50': ['color', 'neutral', '50'],
  'neutral-100': ['color', 'neutral', '100'],
  'neutral-200': ['color', 'neutral', '200'],
  'neutral-300': ['color', 'neutral', '300'],
  'neutral-400': ['color', 'neutral', '400'],
  'neutral-500': ['color', 'neutral', '500'],
  'neutral-600': ['color', 'neutral', '600'],
  'neutral-700': ['color', 'neutral', '700'],
  'neutral-800': ['color', 'neutral', '800'],
  'neutral-900': ['color', 'neutral', '900'],
  'neutral-1000': ['color', 'neutral', '1000'],
  // ── Color primitives — status ────────────────────────────
  'status-success-light': ['color', 'status', 'success-light'],
  'status-success': ['color', 'status', 'success'],
  'status-success-dark': ['color', 'status', 'success-dark'],
  'status-warning-light': ['color', 'status', 'warning-light'],
  'status-warning': ['color', 'status', 'warning'],
  'status-warning-dark': ['color', 'status', 'warning-dark'],
  'status-error-light': ['color', 'status', 'error-light'],
  'status-error': ['color', 'status', 'error'],
  'status-error-dark': ['color', 'status', 'error-dark'],
  'status-info-light': ['color', 'status', 'info-light'],
  'status-info': ['color', 'status', 'info'],
  'status-info-dark': ['color', 'status', 'info-dark'],
  // ── Color primitives — sub-brand identities ──────────────
  'brand-belcorp': ['color', 'brand', 'belcorp'],
  'brand-esika': ['color', 'brand', 'esika'],
  'brand-lbel': ['color', 'brand', 'lbel'],
  'brand-cyzone': ['color', 'brand', 'cyzone'],
  // ── Color semantics — text ───────────────────────────────
  'text-primary': ['color', 'text', 'primary'],
  'text-secondary': ['color', 'text', 'secondary'],
  'text-tertiary': ['color', 'text', 'tertiary'],
  'text-disabled': ['color', 'text', 'disabled'],
  'text-inverse': ['color', 'text', 'inverse'],
  'text-brand': ['color', 'text', 'brand'],
  'text-success': ['color', 'text', 'success'],
  'text-warning': ['color', 'text', 'warning'],
  'text-error': ['color', 'text', 'error'],
  'text-info': ['color', 'text', 'info'],
  // ── Color semantics — background ─────────────────────────
  'bg-page': ['color', 'bg', 'page'],
  'bg-surface': ['color', 'bg', 'surface'],
  'bg-subtle': ['color', 'bg', 'subtle'],
  'bg-brand': ['color', 'bg', 'brand'],
  'bg-brand-subtle': ['color', 'bg', 'brand-subtle'],
  'bg-success': ['color', 'bg', 'success'],
  'bg-warning': ['color', 'bg', 'warning'],
  'bg-error': ['color', 'bg', 'error'],
  'bg-info': ['color', 'bg', 'info'],
  'bg-overlay': ['color', 'bg', 'overlay'],
  'bg-disabled': ['color', 'bg', 'disabled'],
  // ── Color semantics — border ─────────────────────────────
  'border-default': ['color', 'border', 'default'],
  'border-strong': ['color', 'border', 'strong'],
  'border-brand': ['color', 'border', 'brand'],
  'border-disabled': ['color', 'border', 'disabled'],
  // ── Color semantics — interactive ────────────────────────
  'interactive-primary-default': ['color', 'interactive', 'primary', 'default'],
  'interactive-primary-hover': ['color', 'interactive', 'primary', 'hover'],
  'interactive-primary-active': ['color', 'interactive', 'primary', 'active'],
  'interactive-primary-disabled': ['color', 'interactive', 'primary', 'disabled'],
  'interactive-primary-text': ['color', 'interactive', 'primary', 'text'],
  'interactive-focus-ring': ['color', 'interactive', 'focus-ring'],
  // ── Typography — family & weights ────────────────────────
  'font-primary': ['font', 'family', 'primary'],
  'font-regular': ['font', 'weight', 'regular'],
  'font-medium': ['font', 'weight', 'medium'],
  'font-semibold': ['font', 'weight', 'semibold'],
  'font-bold': ['font', 'weight', 'bold'],
  // ── Typography — sizes ───────────────────────────────────
  'type-display': ['font', 'size', 'display'],
  'type-h1': ['font', 'size', 'h1'],
  'type-h2': ['font', 'size', 'h2'],
  'type-h3': ['font', 'size', 'h3'],
  'type-h4': ['font', 'size', 'h4'],
  'type-h5': ['font', 'size', 'h5'],
  'type-body-lg': ['font', 'size', 'body-lg'],
  'type-body-md': ['font', 'size', 'body-md'],
  'type-body-sm': ['font', 'size', 'body-sm'],
  'type-button': ['font', 'size', 'button'],
  'type-label': ['font', 'size', 'label'],
  'type-overline': ['font', 'size', 'overline'],
  // ── Typography — line heights ────────────────────────────
  'leading-display': ['font', 'line-height', 'display'],
  'leading-h1': ['font', 'line-height', 'h1'],
  'leading-h2': ['font', 'line-height', 'h2'],
  'leading-h3': ['font', 'line-height', 'h3'],
  'leading-h4': ['font', 'line-height', 'h4'],
  'leading-h5': ['font', 'line-height', 'h5'],
  'leading-body-lg': ['font', 'line-height', 'body-lg'],
  'leading-body-md': ['font', 'line-height', 'body-md'],
  'leading-body-sm': ['font', 'line-height', 'body-sm'],
  'leading-button': ['font', 'line-height', 'button'],
  'leading-label': ['font', 'line-height', 'label'],
  'leading-overline': ['font', 'line-height', 'overline'],
  // ── Spacing (4px base grid) ──────────────────────────────
  'space-1': ['spacing', '1'],
  'space-2': ['spacing', '2'],
  'space-3': ['spacing', '3'],
  'space-4': ['spacing', '4'],
  'space-5': ['spacing', '5'],
  'space-6': ['spacing', '6'],
  'space-7': ['spacing', '7'],
  'space-8': ['spacing', '8'],
  'space-9': ['spacing', '9'],
  'space-10': ['spacing', '10'],
  'space-11': ['spacing', '11'],
  'space-12': ['spacing', '12'],
  'space-13': ['spacing', '13'],
  'space-14': ['spacing', '14'],
  // ── Radius (+ component aliases, resolved values) ────────
  'radius-none': ['radius', 'none'],
  'radius-xs': ['radius', 'xs'],
  'radius-sm': ['radius', 'sm'],
  'radius-md': ['radius', 'md'],
  'radius-lg': ['radius', 'lg'],
  'radius-xl': ['radius', 'xl'],
  'radius-2xl': ['radius', '2xl'],
  'radius-full': ['radius', 'full'],
  'radius-card': ['radius', 'card'],
  'radius-modal': ['radius', 'modal'],
  'radius-badge': ['radius', 'badge'],
  'radius-button': ['radius', 'button'],
  'radius-input': ['radius', 'input'],
  // ── Stroke ───────────────────────────────────────────────
  'stroke-sm': ['stroke', 'sm'],
  'stroke-md': ['stroke', 'md'],
  'stroke-lg': ['stroke', 'lg'],
  // ── Elevation (shadow strings) ───────────────────────────
  'elevation-1': ['elevation', '1'],
  'elevation-2': ['elevation', '2'],
  'elevation-3': ['elevation', '3'],
  'elevation-4': ['elevation', '4'],
  'elevation-5': ['elevation', '5'],
  // ── Motion ───────────────────────────────────────────────
  'transition-instant': ['motion', 'duration', 'instant'],
  'transition-fast': ['motion', 'duration', 'fast'],
  'transition-normal': ['motion', 'duration', 'normal'],
  'transition-slow': ['motion', 'duration', 'slow'],
  'transition-slower': ['motion', 'duration', 'slower'],
  'ease-default': ['motion', 'easing', 'default'],
  'ease-in': ['motion', 'easing', 'in'],
  'ease-out': ['motion', 'easing', 'out'],
  // ── Z-index ──────────────────────────────────────────────
  'z-base': ['z-index', 'base'],
  'z-raised': ['z-index', 'raised'],
  'z-overlay': ['z-index', 'overlay'],
  'z-modal': ['z-index', 'modal'],
  'z-toast': ['z-index', 'toast'],
};

/** @type {Map<string, string>} */
const pathToFigmaCache = new Map(
  Object.entries(FIGMA_TO_TOKEN_PATH).map(([figma, p]) => [p.join('|'), figma]),
);

const FONT_FAMILY_LEAVES = ['primary'];
const FONT_WEIGHT_LEAVES = ['regular', 'medium', 'semibold', 'bold'];

/**
 * @param {string[]} tokenPath
 */
export function tokenPathToFigmaName(tokenPath) {
  const key = tokenPath.join('|');
  const cached = pathToFigmaCache.get(key);
  if (cached) return cached;

  const [category, group, ...rest] = tokenPath;
  const leaf = rest.length > 0 ? rest.join('-') : group;

  if (category === 'color') {
    // primitives and semantics share the `<group>-<leaf>` shape
    if (
      ['primary', 'secondary', 'neutral', 'status', 'brand', 'text', 'bg', 'border'].includes(
        group,
      )
    ) {
      return `${group}-${leaf}`;
    }
    if (group === 'interactive') return `interactive-${leaf}`;
  }
  if (category === 'font' && group === 'size') return `type-${leaf}`;
  if (category === 'font' && group === 'line-height') return `leading-${leaf}`;
  if (category === 'font' && group === 'weight') return `font-${leaf}`;
  if (category === 'font' && group === 'family') return `font-${leaf}`;
  if (category === 'spacing') return `space-${group}`;
  if (category === 'radius') return `radius-${group}`;
  if (category === 'stroke') return `stroke-${group}`;
  if (category === 'elevation') return `elevation-${group}`;
  if (category === 'motion' && group === 'duration') return `transition-${leaf}`;
  if (category === 'motion' && group === 'easing') return `ease-${leaf}`;
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

  if (figmaName.startsWith('elevation-')) {
    return { $value: String($value), $type: 'shadow' };
  }

  if (figmaName.startsWith('ease-')) {
    return { $value: String($value), $type: 'cubicBezier' };
  }

  if (figmaName.startsWith('z-')) {
    return { $value: $value, $type: 'number' };
  }

  if (
    figmaName.startsWith('leading-') ||
    figmaName.startsWith('space-') ||
    figmaName.startsWith('radius-') ||
    figmaName.startsWith('stroke-')
  ) {
    return { $value: withUnit($value, 'px'), $type: 'dimension' };
  }

  return { $value, $type: $type || 'string' };
}
