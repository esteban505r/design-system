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
| `primary-00` | `#F5F0FC` |
| `primary-50` | `#EBE2F8` |
| `primary-100` | `#D6C4F2` |
| `primary-200` | `#B896E7` |
| `primary-300` | `#9D6ED9` |
| `primary-400` | `#8A5ACE` |
| `primary-500` | `#7D4DBE` |
| `primary-600` | `#6436AB` |
| `primary-700` | `#471F86` |
| `primary-800` | `#2D0F5E` |

### 1.2 Secondary

| Token | Value |
|---|---|
| `secondary-00` | `#FFFDF5` |
| `secondary-50` | `#FFF8E1` |
| `secondary-100` | `#FFECB3` |
| `secondary-200` | `#FFE082` |
| `secondary-300` | `#FFD54F` |
| `secondary-400` | `#FFCA28` |
| `secondary-500` | `#FFBD42` |
| `secondary-600` | `#FFB300` |
| `secondary-700` | `#E79B1D` |
| `secondary-800` | `#C28B30` |

### 1.3 Neutral / Gray

| Token | Value |
|---|---|
| `neutral-0` | `#FFFFFF` |
| `neutral-50` | `#F9FAFB` |
| `neutral-100` | `#F3F4F6` |
| `neutral-200` | `#E5E7EB` |
| `neutral-300` | `#D1D5DB` |
| `neutral-400` | `#9CA3AF` |
| `neutral-500` | `#6B7280` |
| `neutral-600` | `#4B5563` |
| `neutral-700` | `#374151` |
| `neutral-800` | `#1F2937` |
| `neutral-900` | `#030712` |
| `neutral-1000` | `#000000` |

### 1.4 Semantic

Use these tokens exclusively for feedback states (alerts, toasts, badges, form validation). Do not use primary or secondary tokens for semantic purposes.

| Token | Value | Usage |
|---|---|---|
| `success-light` | `#BBF7D0` | Background, subtle highlight |
| `success` | `#16A34A` | Icon, text, border |
| `success-dark` | `#15803D` | Hover / pressed state |
| `warning-light` | `#FEF3C7` | Background, subtle highlight |
| `warning` | `#FFB90A` | Icon, text, border |
| `warning-dark` | `#BD750F` | Hover / pressed state |
| `error-light` | `#FEE2E2` | Background, subtle highlight |
| `error` | `#DC2626` | Icon, text, border |
| `error-dark` | `#B91C1C` | Hover / pressed state |
| `info-light` | `#DBEAFE` | Background, subtle highlight |
| `info` | `#2563EB` | Icon, text, border |
| `info-dark` | `#1245D4` | Hover / pressed state |

### 1.5 Implementation

```css
:root {
  /* Primary */
  --color-primary-00:  #F5F0FC;
  --color-primary-50:  #EBE2F8;
  --color-primary-100: #D6C4F2;
  --color-primary-200: #B896E7;
  --color-primary-300: #9D6ED9;
  --color-primary-400: #8A5ACE;
  --color-primary-500: #7D4DBE;
  --color-primary-600: #6436AB;
  --color-primary-700: #471F86;
  --color-primary-800: #2D0F5E;

  /* Secondary */
  --color-secondary-00:  #FFFDF5;
  --color-secondary-50:  #FFF8E1;
  --color-secondary-100: #FFECB3;
  --color-secondary-200: #FFE082;
  --color-secondary-300: #FFD54F;
  --color-secondary-400: #FFCA28;
  --color-secondary-500: #FFBD42;
  --color-secondary-600: #FFB300;
  --color-secondary-700: #E79B1D;
  --color-secondary-800: #C28B30;

  /* Neutral */
  --color-neutral-0:    #FFFFFF;
  --color-neutral-50:   #F9FAFB;
  --color-neutral-100:  #F3F4F6;
  --color-neutral-200:  #E5E7EB;
  --color-neutral-300:  #D1D5DB;
  --color-neutral-400:  #9CA3AF;
  --color-neutral-500:  #6B7280;
  --color-neutral-600:  #4B5563;
  --color-neutral-700:  #374151;
  --color-neutral-800:  #1F2937;
  --color-neutral-900:  #030712;
  --color-neutral-1000: #000000;

  /* Semantic */
  --color-success-light: #BBF7D0;
  --color-success:       #16A34A;
  --color-success-dark:  #15803D;
  --color-warning-light: #FEF3C7;
  --color-warning:       #FFB90A;
  --color-warning-dark:  #BD750F;
  --color-error-light:   #FEE2E2;
  --color-error:         #DC2626;
  --color-error-dark:    #B91C1C;
  --color-info-light:    #DBEAFE;
  --color-info:          #2563EB;
  --color-info-dark:     #1245D4;
}
```

```json
{
  "color": {
    "primary": {
      "00":  { "value": "#F5F0FC" },
      "50":  { "value": "#EBE2F8" },
      "100": { "value": "#D6C4F2" },
      "200": { "value": "#B896E7" },
      "300": { "value": "#9D6ED9" },
      "400": { "value": "#8A5ACE" },
      "500": { "value": "#7D4DBE" },
      "600": { "value": "#6436AB" },
      "700": { "value": "#471F86" },
      "800": { "value": "#2D0F5E" }
    },
    "secondary": {
      "00":  { "value": "#FFFDF5" },
      "50":  { "value": "#FFF8E1" },
      "100": { "value": "#FFECB3" },
      "200": { "value": "#FFE082" },
      "300": { "value": "#FFD54F" },
      "400": { "value": "#FFCA28" },
      "500": { "value": "#FFBD42" },
      "600": { "value": "#FFB300" },
      "700": { "value": "#E79B1D" },
      "800": { "value": "#C28B30" }
    },
    "neutral": {
      "0":    { "value": "#FFFFFF" },
      "50":   { "value": "#F9FAFB" },
      "100":  { "value": "#F3F4F6" },
      "200":  { "value": "#E5E7EB" },
      "300":  { "value": "#D1D5DB" },
      "400":  { "value": "#9CA3AF" },
      "500":  { "value": "#6B7280" },
      "600":  { "value": "#4B5563" },
      "700":  { "value": "#374151" },
      "800":  { "value": "#1F2937" },
      "900":  { "value": "#030712" },
      "1000": { "value": "#000000" }
    },
    "semantic": {
      "success-light": { "value": "#BBF7D0" },
      "success":       { "value": "#16A34A" },
      "success-dark":  { "value": "#15803D" },
      "warning-light": { "value": "#FEF3C7" },
      "warning":       { "value": "#FFB90A" },
      "warning-dark":  { "value": "#BD750F" },
      "error-light":   { "value": "#FEE2E2" },
      "error":         { "value": "#DC2626" },
      "error-dark":    { "value": "#B91C1C" },
      "info-light":    { "value": "#DBEAFE" },
      "info":          { "value": "#2563EB" },
      "info-dark":     { "value": "#1245D4" }
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
