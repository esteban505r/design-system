# Design System Foundations

**Version:** 1.0.2
**Scope:** Web · Mobile (iOS, Android)  
**Status:** Active

> Use design tokens instead of hardcoded values. All tokens in this document are the single source of truth. Do not invent, alias, or override values locally — this breaks cross-platform consistency.

---

## Table of Contents

1. [Color System](#1-color-system)
2. [Typography System](#2-typography-system)
3. [Spacing Scale](#3-spacing-scale)
4. [Radius Scale](#4-radius-scale)
5. [Elevation / Shadows](#5-elevation--shadows)
6. [General Guidelines](#6-general-guidelines)

---

## 1. Color System

Four token groups: Primary, Secondary, Neutral, and Semantic. Reference tokens by name in all code — never use raw hex values.

### 1.1 Primary

| Token | Value |
|---|---|
| `primary-00` | `#FFF8F3` |
| `primary-50` | `#FFEDD5` |
| `primary-100` | `#FED7AA` |
| `primary-200` | `#FDBA74` |
| `primary-300` | `#FB923C` |
| `primary-400` | `#F97316` |
| `primary-500` | `#EA580C` |
| `primary-600` | `#C2410C` |
| `primary-700` | `#9A3412` |
| `primary-800` | `#7C2D12` |

### 1.2 Secondary

| Token | Value |
|---|---|
| `secondary-00` | `#FFFBEB` |
| `secondary-50` | `#FEF3C7` |
| `secondary-100` | `#FDE68A` |
| `secondary-200` | `#FCD34D` |
| `secondary-300` | `#FBBF24` |
| `secondary-400` | `#F59E0B` |
| `secondary-500` | `#D97706` |
| `secondary-600` | `#B45309` |
| `secondary-700` | `#92400E` |
| `secondary-800` | `#78350F` |

### 1.3 Neutral / Gray

| Token | Value |
|---|---|
| `neutral-0` | `#FFFAF7` |
| `neutral-50` | `#F7EFEA` |
| `neutral-100` | `#EADFD5` |
| `neutral-200` | `#D9C8BB` |
| `neutral-300` | `#BEA89A` |
| `neutral-400` | `#948272` |
| `neutral-500` | `#6F5E52` |
| `neutral-600` | `#51443C` |
| `neutral-700` | `#3A302A` |
| `neutral-800` | `#241E1A` |
| `neutral-900` | `#0F0D0B` |
| `neutral-1000` | `#000000` |

### 1.4 Semantic

Use these tokens exclusively for feedback states (alerts, toasts, badges, form validation). Do not use primary or secondary tokens for semantic purposes.

| Token | Value | Usage |
|---|---|---|
| `success-light` | `#FCE7D4` | Background, subtle highlight |
| `success` | `#C45C26` | Icon, text, border |
| `success-dark` | `#7A3A18` | Hover / pressed state |
| `warning-light` | `#FEF9C3` | Background, subtle highlight |
| `warning` | `#F59E0B` | Icon, text, border |
| `warning-dark` | `#B45309` | Hover / pressed state |
| `error-light` | `#FFDAD6` | Background, subtle highlight |
| `error` | `#D84315` | Icon, text, border |
| `error-dark` | `#8B2500` | Hover / pressed state |
| `info-light` | `#FFF4E6` | Background, subtle highlight |
| `info` | `#FF8F00` | Icon, text, border |
| `info-dark` | `#E65100` | Hover / pressed state |

### 1.5 Implementation

```css
:root {
  /* Primary — orange */
  --color-primary-00:  #FFF8F3;
  --color-primary-50:  #FFEDD5;
  --color-primary-100: #FED7AA;
  --color-primary-200: #FDBA74;
  --color-primary-300: #FB923C;
  --color-primary-400: #F97316;
  --color-primary-500: #EA580C;
  --color-primary-600: #C2410C;
  --color-primary-700: #9A3412;
  --color-primary-800: #7C2D12;

  /* Secondary — amber */
  --color-secondary-00:  #FFFBEB;
  --color-secondary-50:  #FEF3C7;
  --color-secondary-100: #FDE68A;
  --color-secondary-200: #FCD34D;
  --color-secondary-300: #FBBF24;
  --color-secondary-400: #F59E0B;
  --color-secondary-500: #D97706;
  --color-secondary-600: #B45309;
  --color-secondary-700: #92400E;
  --color-secondary-800: #78350F;

  /* Neutral — warm peach / stone */
  --color-neutral-0:    #FFFAF7;
  --color-neutral-50:   #F7EFEA;
  --color-neutral-100:  #EADFD5;
  --color-neutral-200:  #D9C8BB;
  --color-neutral-300:  #BEA89A;
  --color-neutral-400:  #948272;
  --color-neutral-500:  #6F5E52;
  --color-neutral-600:  #51443C;
  --color-neutral-700:  #3A302A;
  --color-neutral-800:  #241E1A;
  --color-neutral-900:  #0F0D0B;
  --color-neutral-1000: #000000;

  /* Semantic */
  --color-success-light: #FCE7D4;
  --color-success:       #C45C26;
  --color-success-dark:  #7A3A18;
  --color-warning-light: #FEF9C3;
  --color-warning:       #F59E0B;
  --color-warning-dark:  #B45309;
  --color-error-light:   #FFDAD6;
  --color-error:         #D84315;
  --color-error-dark:    #8B2500;
  --color-info-light:    #FFF4E6;
  --color-info:          #FF8F00;
  --color-info-dark:     #E65100;
}
```

```json
{
  "color": {
    "primary": {
      "00":  { "value": "#FFF8F3" },
      "50":  { "value": "#FFEDD5" },
      "100": { "value": "#FED7AA" },
      "200": { "value": "#FDBA74" },
      "300": { "value": "#FB923C" },
      "400": { "value": "#F97316" },
      "500": { "value": "#EA580C" },
      "600": { "value": "#C2410C" },
      "700": { "value": "#9A3412" },
      "800": { "value": "#7C2D12" }
    },
    "secondary": {
      "00":  { "value": "#FFFBEB" },
      "50":  { "value": "#FEF3C7" },
      "100": { "value": "#FDE68A" },
      "200": { "value": "#FCD34D" },
      "300": { "value": "#FBBF24" },
      "400": { "value": "#F59E0B" },
      "500": { "value": "#D97706" },
      "600": { "value": "#B45309" },
      "700": { "value": "#92400E" },
      "800": { "value": "#78350F" }
    },
    "neutral": {
      "0":    { "value": "#FFFAF7" },
      "50":   { "value": "#F7EFEA" },
      "100":  { "value": "#EADFD5" },
      "200":  { "value": "#D9C8BB" },
      "300":  { "value": "#BEA89A" },
      "400":  { "value": "#948272" },
      "500":  { "value": "#6F5E52" },
      "600":  { "value": "#51443C" },
      "700":  { "value": "#3A302A" },
      "800":  { "value": "#241E1A" },
      "900":  { "value": "#0F0D0B" },
      "1000": { "value": "#000000" }
    },
    "semantic": {
      "success-light": { "value": "#FCE7D4" },
      "success":       { "value": "#C45C26" },
      "success-dark":  { "value": "#7A3A18" },
      "warning-light": { "value": "#FEF9C3" },
      "warning":       { "value": "#F59E0B" },
      "warning-dark":  { "value": "#B45309" },
      "error-light":   { "value": "#FFDAD6" },
      "error":         { "value": "#D84315" },
      "error-dark":    { "value": "#8B2500" },
      "info-light":    { "value": "#FFF4E6" },
      "info":          { "value": "#FF8F00" },
      "info-dark":     { "value": "#E65100" }
    }
  }
}
```

---

## 2. Typography System

All text uses a single font family across display, body, and mono roles. Sizes and weights are tokenized — do not hardcode either.

> ⚠️ `font-mono` is currently set to `Montserrat`, which is not a monospace typeface. This token should be updated to a dedicated monospace font before production use.

### 2.1 Font Families

| Token | Value |
|---|---|
| `font-display` | `Montserrat` |
| `font-body` | `Montserrat` |
| `font-mono` | `Montserrat` |

### 2.2 Font Weights

| Token | Value |
|---|---|
| `font-regular` | `400` |
| `font-medium` | `500` |
| `font-semibold` | `600` |
| `font-bold` | `700` |

### 2.3 Type Scale

All sizes are in `px`. Line-height values are not yet defined — do not hardcode defaults.

#### Display & Headings

| Token | Size | Weight |
|---|---|---|
| `hero` | `72px` | `700` |
| `h1` | `40px` | `700` |
| `h2` | `32px` | `700` |
| `h3` | `24px` | `600` |
| `h4` | `20px` | `600` |
| `h5` | `16px` | `600` |

#### Body & UI Text

| Token | Size | Weight | Style |
|---|---|---|---|
| `body-lg` | `16px` | `400` | — |
| `body-md` | `14px` | `400` | — |
| `body-sm` | `12px` | `400` | — |
| `label` | `14px` | `500` | — |
| `button` | `14px` | `600` | — |
| `overline` | `12px` | `700` | — |
| `caption-italic` | `12px` | `400` | italic |

> ⚠️ Line-height values are not yet defined. Do not use arbitrary line-height values until tokens are officially added to this document.

### 2.4 Implementation

```css
:root {
  /* Font families */
  --font-display: 'Montserrat', sans-serif;
  --font-body:    'Montserrat', sans-serif;
  --font-mono:    'Montserrat', monospace; /* ⚠️ Pending monospace replacement */

  /* Font weights */
  --font-weight-regular:  400;
  --font-weight-medium:   500;
  --font-weight-semibold: 600;
  --font-weight-bold:     700;

  /* Display & Headings */
  --font-size-hero: 72px;
  --font-size-h1:   40px;
  --font-size-h2:   32px;
  --font-size-h3:   24px;
  --font-size-h4:   20px;
  --font-size-h5:   16px;

  /* Body & UI */
  --font-size-body-lg:        16px;
  --font-size-body-md:        14px;
  --font-size-body-sm:        12px;
  --font-size-label:          14px;
  --font-size-button:         14px;
  --font-size-overline:       12px;
  --font-size-caption-italic: 12px;
}
```

```json
{
  "font": {
    "family": {
      "display": { "value": "Montserrat" },
      "body":    { "value": "Montserrat" },
      "mono":    { "value": "Montserrat" }
    },
    "weight": {
      "regular":  { "value": 400 },
      "medium":   { "value": 500 },
      "semibold": { "value": 600 },
      "bold":     { "value": 700 }
    },
    "size": {
      "hero":           { "value": "72px", "weight": 700 },
      "h1":             { "value": "40px", "weight": 700 },
      "h2":             { "value": "32px", "weight": 700 },
      "h3":             { "value": "24px", "weight": 600 },
      "h4":             { "value": "20px", "weight": 600 },
      "h5":             { "value": "16px", "weight": 600 },
      "body-lg":        { "value": "16px", "weight": 400 },
      "body-md":        { "value": "14px", "weight": 400 },
      "body-sm":        { "value": "12px", "weight": 400 },
      "label":          { "value": "14px", "weight": 500 },
      "button":         { "value": "14px", "weight": 600 },
      "overline":       { "value": "12px", "weight": 700 },
      "caption-italic": { "value": "12px", "weight": 400, "style": "italic" }
    }
  }
}
```

---

## 3. Spacing Scale

Base unit is `4px`. All tokens are multiples of this base. Use these for padding, margin, gap, and layout sizing — never hardcode numeric values.

| Token | Value |
|---|---|
| `spacing-1` | `4px` |
| `spacing-2` | `8px` |
| `spacing-3` | `12px` |
| `spacing-4` | `16px` |
| `spacing-5` | `20px` |
| `spacing-6` | `24px` |
| `spacing-8` | `32px` |
| `spacing-10` | `40px` |
| `spacing-12` | `48px` |
| `spacing-16` | `64px` |
| `spacing-24` | `96px` |

### Implementation

```css
:root {
  --spacing-1:  4px;
  --spacing-2:  8px;
  --spacing-3:  12px;
  --spacing-4:  16px;
  --spacing-5:  20px;
  --spacing-6:  24px;
  --spacing-8:  32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-16: 64px;
  --spacing-24: 96px;
}
```

```json
{
  "spacing": {
    "1":  { "value": "4px" },
    "2":  { "value": "8px" },
    "3":  { "value": "12px" },
    "4":  { "value": "16px" },
    "5":  { "value": "20px" },
    "6":  { "value": "24px" },
    "8":  { "value": "32px" },
    "10": { "value": "40px" },
    "12": { "value": "48px" },
    "16": { "value": "64px" },
    "24": { "value": "96px" }
  }
}
```

---

## 4. Radius Scale

Use these tokens for `border-radius` on all UI elements. Do not apply arbitrary radius values outside this scale.

| Token | Value | Usage |
|---|---|---|
| `radius-none` | `0px` | Sharp corners, dividers |
| `radius-sm` | `4px` | Inputs, tags, small chips |
| `radius-md` | `8px` | Buttons, compact cards |
| `radius-lg` | `12px` | Cards, panels |
| `radius-xl` | `16px` | Modals, sheets |
| `radius-2xl` | `24px` | Large containers |
| `radius-full` | `9999px` | Pills, avatars, toggles |

### Implementation

```css
:root {
  --radius-none: 0px;
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-2xl:  24px;
  --radius-full: 9999px;
}
```

```json
{
  "radius": {
    "none": { "value": "0px" },
    "sm":   { "value": "4px" },
    "md":   { "value": "8px" },
    "lg":   { "value": "12px" },
    "xl":   { "value": "16px" },
    "2xl":  { "value": "24px" },
    "full": { "value": "9999px" }
  }
}
```

---

## 5. Elevation / Shadows

Elevation tokens define depth using `box-shadow`. Apply them based on a component's conceptual layer — do not mix levels arbitrarily.

| Token | Value | Usage |
|---|---|---|
| `elevation-hairline` | `0px 1px 2px rgba(0,0,0,0.05)` | Subtle separation, sticky headers |
| `elevation-card` | `0px 2px 8px rgba(0,0,0,0.08)` | Cards, list items |
| `elevation-popover` | `0px 4px 16px rgba(0,0,0,0.10)` | Dropdowns, tooltips, popovers |
| `elevation-modal` | `0px 8px 32px rgba(0,0,0,0.12)` | Modals, drawers, dialogs |

### Implementation

```css
:root {
  --elevation-hairline: 0px 1px 2px rgba(0, 0, 0, 0.05);
  --elevation-card:     0px 2px 8px rgba(0, 0, 0, 0.08);
  --elevation-popover:  0px 4px 16px rgba(0, 0, 0, 0.10);
  --elevation-modal:    0px 8px 32px rgba(0, 0, 0, 0.12);
}
```

```json
{
  "elevation": {
    "hairline": { "value": "0px 1px 2px rgba(0,0,0,0.05)" },
    "card":     { "value": "0px 2px 8px rgba(0,0,0,0.08)" },
    "popover":  { "value": "0px 4px 16px rgba(0,0,0,0.10)" },
    "modal":    { "value": "0px 8px 32px rgba(0,0,0,0.12)" }
  }
}
```

> **Mobile note:** React Native does not support `box-shadow` directly. Use `shadow*` props (iOS) or the `elevation` prop (Android). Maintain a platform-specific mapping layer in your token pipeline rather than hardcoding platform values in components.

---

## 6. General Guidelines

- **Always use tokens.** Never hardcode hex values, font sizes, spacing numbers, radius values, or shadow strings in component code.
- **Token naming is final.** Do not rename, shorten, or alias tokens locally — this breaks cross-platform consistency.
- **Missing values = pending, not optional.** If a token isn't defined in this document, wait for it to be officially added rather than improvising a value.
- **All values are in `px`.** Conversion to `rem`, `sp`, or `pt` should happen at the token pipeline level, not in component code.
- **Cross-platform scope.** These tokens apply to web (CSS custom properties), React Native, native iOS, and Android via a Style Dictionary export pipeline.
- **Token tooling.** This document is the source of truth until a formal token pipeline (e.g. Style Dictionary, Tokens Studio) is in place. All JSON structures follow Style Dictionary's standard format and are ready for direct use.

---

*Last updated: May 2026 · Design Systems team*
