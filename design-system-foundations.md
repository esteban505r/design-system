# Design System Foundations

**Version:** 1.0.3  
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
| `primary-00` | `#ECFDF5` |
| `primary-50` | `#D1FAE5` |
| `primary-100` | `#A7F3D0` |
| `primary-200` | `#6EE7B7` |
| `primary-300` | `#34D399` |
| `primary-400` | `#10B981` |
| `primary-500` | `#059669` |
| `primary-600` | `#047857` |
| `primary-700` | `#065F46` |
| `primary-800` | `#064E3B` |

### 1.2 Secondary

| Token | Value |
|---|---|
| `secondary-00` | `#F0FDFA` |
| `secondary-50` | `#CCFBF1` |
| `secondary-100` | `#99F6E4` |
| `secondary-200` | `#5EEAD4` |
| `secondary-300` | `#2DD4BF` |
| `secondary-400` | `#14B8A6` |
| `secondary-500` | `#0D9488` |
| `secondary-600` | `#0F766E` |
| `secondary-700` | `#115E59` |
| `secondary-800` | `#134E4A` |

### 1.3 Neutral / Gray

| Token | Value |
|---|---|
| `neutral-0` | `#FFFFFF` |
| `neutral-50` | `#F7FAF8` |
| `neutral-100` | `#EDF2EF` |
| `neutral-200` | `#D8E3DC` |
| `neutral-300` | `#B8C9BF` |
| `neutral-400` | `#8A9E90` |
| `neutral-500` | `#5F7566` |
| `neutral-600` | `#47594C` |
| `neutral-700` | `#344038` |
| `neutral-800` | `#212922` |
| `neutral-900` | `#121714` |
| `neutral-1000` | `#000000` |

### 1.4 Semantic

Use these tokens exclusively for feedback states (alerts, toasts, badges, form validation). Do not use primary or secondary tokens for semantic purposes.

| Token | Value | Usage |
|---|---|---|
| `success-light` | `#D1FAE5` | Background, subtle highlight |
| `success` | `#059669` | Icon, text, border |
| `success-dark` | `#064E3B` | Hover / pressed state |
| `warning-light` | `#FEF9C3` | Background, subtle highlight |
| `warning` | `#CA8A04` | Icon, text, border |
| `warning-dark` | `#713F12` | Hover / pressed state |
| `error-light` | `#FEE2E2` | Background, subtle highlight |
| `error` | `#DC2626` | Icon, text, border |
| `error-dark` | `#7F1D1D` | Hover / pressed state |
| `info-light` | `#CCFBF1` | Background, subtle highlight |
| `info` | `#0D9488` | Icon, text, border |
| `info-dark` | `#134E4A` | Hover / pressed state |

### 1.5 Implementation

```css
:root {
  /* Primary — emerald */
  --color-primary-00:  #ECFDF5;
  --color-primary-50:  #D1FAE5;
  --color-primary-100: #A7F3D0;
  --color-primary-200: #6EE7B7;
  --color-primary-300: #34D399;
  --color-primary-400: #10B981;
  --color-primary-500: #059669;
  --color-primary-600: #047857;
  --color-primary-700: #065F46;
  --color-primary-800: #064E3B;

  /* Secondary — teal */
  --color-secondary-00:  #F0FDFA;
  --color-secondary-50:  #CCFBF1;
  --color-secondary-100: #99F6E4;
  --color-secondary-200: #5EEAD4;
  --color-secondary-300: #2DD4BF;
  --color-secondary-400: #14B8A6;
  --color-secondary-500: #0D9488;
  --color-secondary-600: #0F766E;
  --color-secondary-700: #115E59;
  --color-secondary-800: #134E4A;

  /* Neutral — sage gray */
  --color-neutral-0:    #FFFFFF;
  --color-neutral-50:   #F7FAF8;
  --color-neutral-100:  #EDF2EF;
  --color-neutral-200:  #D8E3DC;
  --color-neutral-300:  #B8C9BF;
  --color-neutral-400:  #8A9E90;
  --color-neutral-500:  #5F7566;
  --color-neutral-600:  #47594C;
  --color-neutral-700:  #344038;
  --color-neutral-800:  #212922;
  --color-neutral-900:  #121714;
  --color-neutral-1000: #000000;

  /* Semantic */
  --color-success-light: #D1FAE5;
  --color-success:       #059669;
  --color-success-dark:  #064E3B;
  --color-warning-light: #FEF9C3;
  --color-warning:       #CA8A04;
  --color-warning-dark:  #713F12;
  --color-error-light:   #FEE2E2;
  --color-error:         #DC2626;
  --color-error-dark:    #7F1D1D;
  --color-info-light:    #CCFBF1;
  --color-info:          #0D9488;
  --color-info-dark:     #134E4A;
}
```

```json
{
  "color": {
    "primary": {
      "00":  { "value": "#ECFDF5" },
      "50":  { "value": "#D1FAE5" },
      "100": { "value": "#A7F3D0" },
      "200": { "value": "#6EE7B7" },
      "300": { "value": "#34D399" },
      "400": { "value": "#10B981" },
      "500": { "value": "#059669" },
      "600": { "value": "#047857" },
      "700": { "value": "#065F46" },
      "800": { "value": "#064E3B" }
    },
    "secondary": {
      "00":  { "value": "#F0FDFA" },
      "50":  { "value": "#CCFBF1" },
      "100": { "value": "#99F6E4" },
      "200": { "value": "#5EEAD4" },
      "300": { "value": "#2DD4BF" },
      "400": { "value": "#14B8A6" },
      "500": { "value": "#0D9488" },
      "600": { "value": "#0F766E" },
      "700": { "value": "#115E59" },
      "800": { "value": "#134E4A" }
    },
    "neutral": {
      "0":    { "value": "#FFFFFF" },
      "50":   { "value": "#F7FAF8" },
      "100":  { "value": "#EDF2EF" },
      "200":  { "value": "#D8E3DC" },
      "300":  { "value": "#B8C9BF" },
      "400":  { "value": "#8A9E90" },
      "500":  { "value": "#5F7566" },
      "600":  { "value": "#47594C" },
      "700":  { "value": "#344038" },
      "800":  { "value": "#212922" },
      "900":  { "value": "#121714" },
      "1000": { "value": "#000000" }
    },
    "semantic": {
      "success-light": { "value": "#D1FAE5" },
      "success":       { "value": "#059669" },
      "success-dark":  { "value": "#064E3B" },
      "warning-light": { "value": "#FEF9C3" },
      "warning":       { "value": "#CA8A04" },
      "warning-dark":  { "value": "#713F12" },
      "error-light":   { "value": "#FEE2E2" },
      "error":         { "value": "#DC2626" },
      "error-dark":    { "value": "#7F1D1D" },
      "info-light":    { "value": "#CCFBF1" },
      "info":          { "value": "#0D9488" },
      "info-dark":     { "value": "#134E4A" }
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
