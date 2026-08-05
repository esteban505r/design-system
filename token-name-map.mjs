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
  // ── Belcorp app palette — core ramps (exact values shipping in the Android app) ──
  // blue
  'blue-100': ['color', 'blue', '100'],
  'blue-300': ['color', 'blue', '300'],
  'blue-50': ['color', 'blue', '50'],
  'blue-600': ['color', 'blue', '600'],
  'blue-700': ['color', 'blue', '700'],
  // burgundy
  'burgundy-800': ['color', 'burgundy', '800'],
  // cyan
  'cyan-500': ['color', 'cyan', '500'],
  // gray
  'gray-100': ['color', 'gray', '100'],
  'gray-200': ['color', 'gray', '200'],
  'gray-300': ['color', 'gray', '300'],
  'gray-400': ['color', 'gray', '400'],
  'gray-50': ['color', 'gray', '50'],
  'gray-500': ['color', 'gray', '500'],
  'gray-600': ['color', 'gray', '600'],
  'gray-700': ['color', 'gray', '700'],
  'gray-800': ['color', 'gray', '800'],
  'gray-850': ['color', 'gray', '850'],
  // green
  'green-50': ['color', 'green', '50'],
  'green-700': ['color', 'green', '700'],
  // orange
  'orange-500': ['color', 'orange', '500'],
  // pink
  'pink-100': ['color', 'pink', '100'],
  'pink-200': ['color', 'pink', '200'],
  'pink-400': ['color', 'pink', '400'],
  'pink-50': ['color', 'pink', '50'],
  'pink-500': ['color', 'pink', '500'],
  'pink-700': ['color', 'pink', '700'],
  // purple
  'purple-100': ['color', 'purple', '100'],
  'purple-200': ['color', 'purple', '200'],
  'purple-300': ['color', 'purple', '300'],
  'purple-400': ['color', 'purple', '400'],
  'purple-50': ['color', 'purple', '50'],
  'purple-500': ['color', 'purple', '500'],
  'purple-600': ['color', 'purple', '600'],
  'purple-900': ['color', 'purple', '900'],
  'purple-950': ['color', 'purple', '950'],
  // red
  'red-100': ['color', 'red', '100'],
  'red-400': ['color', 'red', '400'],
  'red-50': ['color', 'red', '50'],
  'red-600': ['color', 'red', '600'],
  'red-700': ['color', 'red', '700'],
  // yellow
  'yellow-50': ['color', 'yellow', '50'],
  'yellow-500': ['color', 'yellow', '500'],
  // brown
  'brown-600': ['color', 'brown', '600'],
  // ── Belcorp app palette — feature-module colours reclaimed from hardcoded literals ──
  'app-divider-onboarding': ['color', 'app', 'divider-onboarding'],
  'app-border-subtle': ['color', 'app', 'border-subtle'],
  'app-tab-fallback-accent': ['color', 'app', 'tab-fallback-accent'],
  'app-quiz-progress-completed': ['color', 'app', 'quiz-progress-completed'],
  'app-quiz-feedback-green': ['color', 'app', 'quiz-feedback-green'],
  'app-quiz-answer-correct': ['color', 'app', 'quiz-answer-correct'],
  'app-scrim-30': ['color', 'app', 'scrim-30'],
  'app-header-text-dark': ['color', 'app', 'header-text-dark'],
  'app-shimmer-highlight': ['color', 'app', 'shimmer-highlight'],
  'app-brand-tint-05': ['color', 'app', 'brand-tint-05'],
  'app-stat-text-gray': ['color', 'app', 'stat-text-gray'],
  'app-points-orange': ['color', 'app', 'points-orange'],
  'app-quiz-progress-track': ['color', 'app', 'quiz-progress-track'],
  'app-dream-survey-bg': ['color', 'app', 'dream-survey-bg'],
  'app-purple-deep-action': ['color', 'app', 'purple-deep-action'],
  'app-divider-dotted': ['color', 'app', 'divider-dotted'],
  'app-divider-solid-dark': ['color', 'app', 'divider-solid-dark'],
  'app-learning-path-dark': ['color', 'app', 'learning-path-dark'],
  'app-unbeatable-purple': ['color', 'app', 'unbeatable-purple'],
  'app-scrim-50': ['color', 'app', 'scrim-50'],
  'app-highlight-arrow': ['color', 'app', 'highlight-arrow'],
  'app-points-amber': ['color', 'app', 'points-amber'],
  'app-points-teal': ['color', 'app', 'points-teal'],
  'app-period-purple': ['color', 'app', 'period-purple'],
  'app-referrals-bg': ['color', 'app', 'referrals-bg'],
  'app-gana-plus-purple': ['color', 'app', 'gana-plus-purple'],
  'app-gana-plus-indigo': ['color', 'app', 'gana-plus-indigo'],
  'app-quiz-feedback-bg': ['color', 'app', 'quiz-feedback-bg'],
  'app-quiz-message-text': ['color', 'app', 'quiz-message-text'],
  'app-header-purple-deep': ['color', 'app', 'header-purple-deep'],
  'app-header-purple-light': ['color', 'app', 'header-purple-light'],
  'app-tracker-bg': ['color', 'app', 'tracker-bg'],
  'app-earnings-pink-bg': ['color', 'app', 'earnings-pink-bg'],
  'app-learning-path-purple': ['color', 'app', 'learning-path-purple'],
  'app-learning-path-bg': ['color', 'app', 'learning-path-bg'],
  'app-learning-path-pink': ['color', 'app', 'learning-path-pink'],
  'app-learning-path-lilac': ['color', 'app', 'learning-path-lilac'],
  'app-unbeatable-dark': ['color', 'app', 'unbeatable-dark'],
  'app-campaign-purple': ['color', 'app', 'campaign-purple'],
  'app-modifier-lilac': ['color', 'app', 'modifier-lilac'],
  'app-modifier-indigo': ['color', 'app', 'modifier-indigo'],
  'app-tab-unselected': ['color', 'app', 'tab-unselected'],
  'app-pdp-bg': ['color', 'app', 'pdp-bg'],
  'app-video-controls-bg': ['color', 'app', 'video-controls-bg'],
  'app-shadow-15': ['color', 'app', 'shadow-15'],
  'app-tooltip-purple': ['color', 'app', 'tooltip-purple'],
  'app-payment-blue': ['color', 'app', 'payment-blue'],
  // ── Belcorp app palette — feature one-offs & alpha variants (not core ramp) ──
  // app/black
  'app-black-alpha-40': ['color', 'app', 'black', 'alpha-40'],
  // app/blue
  'app-blue-50-light': ['color', 'app', 'blue', '50-light'],
  'app-blue-alpha-50': ['color', 'app', 'blue', 'alpha-50'],
  // app/gray
  'app-gray-300-light': ['color', 'app', 'gray', '300-light'],
  'app-gray-50-warm': ['color', 'app', 'gray', '50-warm'],
  'app-gray-600-warm': ['color', 'app', 'gray', '600-warm'],
  // app/green
  'app-green-alpha-20': ['color', 'app', 'green', 'alpha-20'],
  // app/pink
  'app-pink-50-dark': ['color', 'app', 'pink', '50-dark'],
  // app/purple
  'app-purple-100-message': ['color', 'app', 'purple', '100-message'],
  'app-purple-100-quiz': ['color', 'app', 'purple', '100-quiz'],
  'app-purple-200-alpha-15': ['color', 'app', 'purple', '200-alpha-15'],
  'app-purple-200-gradient': ['color', 'app', 'purple', '200-gradient'],
  'app-purple-200-light': ['color', 'app', 'purple', '200-light'],
  'app-purple-200-mid': ['color', 'app', 'purple', '200-mid'],
  'app-purple-300-end': ['color', 'app', 'purple', '300-end'],
  'app-purple-300-scrim': ['color', 'app', 'purple', '300-scrim'],
  'app-purple-400-light': ['color', 'app', 'purple', '400-light'],
  'app-purple-50-bottom': ['color', 'app', 'purple', '50-bottom'],
  'app-purple-50-tip': ['color', 'app', 'purple', '50-tip'],
  'app-purple-500-action': ['color', 'app', 'purple', '500-action'],
  'app-purple-500-animation': ['color', 'app', 'purple', '500-animation'],
  'app-purple-500-light': ['color', 'app', 'purple', '500-light'],
  'app-purple-600-consultora': ['color', 'app', 'purple', '600-consultora'],
  'app-purple-600-gana': ['color', 'app', 'purple', '600-gana'],
  'app-purple-600-light': ['color', 'app', 'purple', '600-light'],
  'app-purple-600-mid': ['color', 'app', 'purple', '600-mid'],
  'app-purple-700-alpha-50': ['color', 'app', 'purple', '700-alpha-50'],
  'app-purple-700-light': ['color', 'app', 'purple', '700-light'],
  'app-purple-800-alpha-20': ['color', 'app', 'purple', '800-alpha-20'],
  'app-purple-800-animation': ['color', 'app', 'purple', '800-animation'],
  'app-purple-900-brillante': ['color', 'app', 'purple', '900-brillante'],
  'app-purple-900-dark': ['color', 'app', 'purple', '900-dark'],
  // app/red
  'app-red-alpha-50': ['color', 'app', 'red', 'alpha-50'],
  // app/white
  'app-white-alpha-75': ['color', 'app', 'white', 'alpha-75'],
  // app/yellow
  'app-yellow-alpha-50': ['color', 'app', 'yellow', 'alpha-50'],
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
