# Design System Foundations

**Version:** 1.0.0  
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
| `primary-00` | `#E0F7FA` |
| `primary-50` | `#B2EBF2` |
| `primary-100` | `#80DEEA` |
| `primary-200` | `#4DD0E1` |
| `primary-300` | `#26C6DA` |
| `primary-400` | `#00BCD4` |
| `primary-500` | `#0097A7` |
| `primary-600` | `#00838F` |
| `primary-700` | `#006064` |
| `primary-800` | `#004D40` |

### 1.2 Secondary

| Token | Value |
|---|---|
| `secondary-00` | `#FFF3E0` |
| `secondary-50` | `#FFE0B2` |
| `secondary-100` | `#FFCC80` |
| `secondary-200` | `#FFB74D` |
| `secondary-300` | `#FFA726` |
| `secondary-400` | `#FF9800` |
| `secondary-500` | `#F57C00` |
| `secondary-600` | `#E65100` |
| `secondary-700` | `#BF360C` |
| `secondary-800` | `#870000` |

### 1.3 Neutral / Gray

| Token | Value |
|---|---|
| `neutral-0` | `#FFFBF5` |
| `neutral-50` | `#F5F0EB` |
| `neutral-100` | `#E8E0D8` |
| `neutral-200` | `#D4C9BC` |
| `neutral-300` | `#B8A99A` |
| `neutral-400` | `#8C7F72` |
| `neutral-500` | `#6B5E54` |
| `neutral-600` | `#4E433C` |
| `neutral-700` | `#362E29` |
| `neutral-800` | `#211C19` |
| `neutral-900` | `#0D0B0A` |
| `neutral-1000` | `#000000` |

### 1.4 Semantic

Use these tokens exclusively for feedback states (alerts, toasts, badges, form validation). Do not use primary or secondary tokens for semantic purposes.

| Token | Value | Usage |
|---|---|---|
| `success-light` | `#C8E6C9` | Background, subtle highlight |
| `success` | `#2E7D32` | Icon, text, border |
| `success-dark` | `#1B5E20` | Hover / pressed state |
| `warning-light` | `#FFF9C4` | Background, subtle highlight |
| `warning` | `#F9A825` | Icon, text, border |
| `warning-dark` | `#F57F17` | Hover / pressed state |
| `error-light` | `#FFCDD2` | Background, subtle highlight |
| `error` | `#C62828` | Icon, text, border |
| `error-dark` | `#B71C1C` | Hover / pressed state |
| `info-light` | `#E1F5FE` | Background, subtle highlight |
| `info` | `#0277BD` | Icon, text, border |
| `info-dark` | `#01579B` | Hover / pressed state |

### 1.5 Implementation

```css
:root {
  /* Primary — ocean / cyan */
  --color-primary-00:  #E0F7FA;
  --color-primary-50:  #B2EBF2;
  --color-primary-100: #80DEEA;
  --color-primary-200: #4DD0E1;
  --color-primary-300: #26C6DA;
  --color-primary-400: #00BCD4;
  --color-primary-500: #0097A7;
  --color-primary-600: #00838F;
  --color-primary-700: #006064;
  --color-primary-800: #004D40;

  /* Secondary — warm amber / orange */
  --color-secondary-00:  #FFF3E0;
  --color-secondary-50:  #FFE0B2;
  --color-secondary-100: #FFCC80;
  --color-secondary-200: #FFB74D;
  --color-secondary-300: #FFA726;
  --color-secondary-400: #FF9800;
  --color-secondary-500: #F57C00;
  --color-secondary-600: #E65100;
  --color-secondary-700: #BF360C;
  --color-secondary-800: #870000;

  /* Neutral — warm stone */
  --color-neutral-0:    #FFFBF5;
  --color-neutral-50:   #F5F0EB;
  --color-neutral-100:  #E8E0D8;
  --color-neutral-200:  #D4C9BC;
  --color-neutral-300:  #B8A99A;
  --color-neutral-400:  #8C7F72;
  --color-neutral-500:  #6B5E54;
  --color-neutral-600:  #4E433C;
  --color-neutral-700:  #362E29;
  --color-neutral-800:  #211C19;
  --color-neutral-900:  #0D0B0A;
  --color-neutral-1000: #000000;

  /* Semantic */
  --color-success-light: #C8E6C9;
  --color-success:       #2E7D32;
  --color-success-dark:  #1B5E20;
  --color-warning-light: #FFF9C4;
  --color-warning:       #F9A825;
  --color-warning-dark:  #F57F17;
  --color-error-light:   #FFCDD2;
  --color-error:         #C62828;
  --color-error-dark:    #B71C1C;
  --color-info-light:    #E1F5FE;
  --color-info:          #0277BD;
  --color-info-dark:     #01579B;
}
```

```json
{
  "color": {
    "primary": {
      "00":  { "value": "#E0F7FA" },
      "50":  { "value": "#B2EBF2" },
      "100": { "value": "#80DEEA" },
      "200": { "value": "#4DD0E1" },
      "300": { "value": "#26C6DA" },
      "400": { "value": "#00BCD4" },
      "500": { "value": "#0097A7" },
      "600": { "value": "#00838F" },
      "700": { "value": "#006064" },
      "800": { "value": "#004D40" }
    },
    "secondary": {
      "00":  { "value": "#FFF3E0" },
      "50":  { "value": "#FFE0B2" },
      "100": { "value": "#FFCC80" },
      "200": { "value": "#FFB74D" },
      "300": { "value": "#FFA726" },
      "400": { "value": "#FF9800" },
      "500": { "value": "#F57C00" },
      "600": { "value": "#E65100" },
      "700": { "value": "#BF360C" },
      "800": { "value": "#870000" }
    },
    "neutral": {
      "0":    { "value": "#FFFBF5" },
      "50":   { "value": "#F5F0EB" },
      "100":  { "value": "#E8E0D8" },
      "200":  { "value": "#D4C9BC" },
      "300":  { "value": "#B8A99A" },
      "400":  { "value": "#8C7F72" },
      "500":  { "value": "#6B5E54" },
      "600":  { "value": "#4E433C" },
      "700":  { "value": "#362E29" },
      "800":  { "value": "#211C19" },
      "900":  { "value": "#0D0B0A" },
      "1000": { "value": "#000000" }
    },
    "semantic": {
      "success-light": { "value": "#C8E6C9" },
      "success":       { "value": "#2E7D32" },
      "success-dark":  { "value": "#1B5E20" },
      "warning-light": { "value": "#FFF9C4" },
      "warning":       { "value": "#F9A825" },
      "warning-dark":  { "value": "#F57F17" },
      "error-light":   { "value": "#FFCDD2" },
      "error":         { "value": "#C62828" },
      "error-dark":    { "value": "#B71C1C" },
      "info-light":    { "value": "#E1F5FE" },
      "info":          { "value": "#0277BD" },
      "info-dark":     { "value": "#01579B" }
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
