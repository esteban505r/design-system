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
| `primary-00` | `#FAFAFA` |
| `primary-50` | `#F4F4F5` |
| `primary-100` | `#E4E4E7` |
| `primary-200` | `#D4D4D8` |
| `primary-300` | `#A1A1AA` |
| `primary-400` | `#71717A` |
| `primary-500` | `#52525B` |
| `primary-600` | `#3F3F46` |
| `primary-700` | `#27272A` |
| `primary-800` | `#18181B` |

### 1.2 Secondary

| Token | Value |
|---|---|
| `secondary-00` | `#F8FAFC` |
| `secondary-50` | `#F1F5F9` |
| `secondary-100` | `#E2E8F0` |
| `secondary-200` | `#CBD5E1` |
| `secondary-300` | `#94A3B8` |
| `secondary-400` | `#64748B` |
| `secondary-500` | `#475569` |
| `secondary-600` | `#334155` |
| `secondary-700` | `#1E293B` |
| `secondary-800` | `#0F172A` |

### 1.3 Neutral / Gray

| Token | Value |
|---|---|
| `neutral-0` | `#FFFFFF` |
| `neutral-50` | `#FAFAFA` |
| `neutral-100` | `#F5F5F5` |
| `neutral-200` | `#E5E5E5` |
| `neutral-300` | `#D4D4D4` |
| `neutral-400` | `#A3A3A3` |
| `neutral-500` | `#737373` |
| `neutral-600` | `#525252` |
| `neutral-700` | `#404040` |
| `neutral-800` | `#262626` |
| `neutral-900` | `#171717` |
| `neutral-1000` | `#000000` |

### 1.4 Semantic

Use these tokens exclusively for feedback states (alerts, toasts, badges, form validation). Do not use primary or secondary tokens for semantic purposes.

| Token | Value | Usage |
|---|---|---|
| `success-light` | `#F5F5F5` | Background, subtle highlight |
| `success` | `#404040` | Icon, text, border |
| `success-dark` | `#171717` | Hover / pressed state |
| `warning-light` | `#E5E5E5` | Background, subtle highlight |
| `warning` | `#525252` | Icon, text, border |
| `warning-dark` | `#262626` | Hover / pressed state |
| `error-light` | `#E7E7E7` | Background, subtle highlight |
| `error` | `#1A1A1A` | Icon, text, border |
| `error-dark` | `#0A0A0A` | Hover / pressed state |
| `info-light` | `#EDEDED` | Background, subtle highlight |
| `info` | `#363636` | Icon, text, border |
| `info-dark` | `#141414` | Hover / pressed state |

### 1.5 Implementation

```css
:root {
  /* Primary — zinc / neutral black */
  --color-primary-00:  #FAFAFA;
  --color-primary-50:  #F4F4F5;
  --color-primary-100: #E4E4E7;
  --color-primary-200: #D4D4D8;
  --color-primary-300: #A1A1AA;
  --color-primary-400: #71717A;
  --color-primary-500: #52525B;
  --color-primary-600: #3F3F46;
  --color-primary-700: #27272A;
  --color-primary-800: #18181B;

  /* Secondary — slate gray */
  --color-secondary-00:  #F8FAFC;
  --color-secondary-50:  #F1F5F9;
  --color-secondary-100: #E2E8F0;
  --color-secondary-200: #CBD5E1;
  --color-secondary-300: #94A3B8;
  --color-secondary-400: #64748B;
  --color-secondary-500: #475569;
  --color-secondary-600: #334155;
  --color-secondary-700: #1E293B;
  --color-secondary-800: #0F172A;

  /* Neutral — white to black */
  --color-neutral-0:    #FFFFFF;
  --color-neutral-50:   #FAFAFA;
  --color-neutral-100:  #F5F5F5;
  --color-neutral-200:  #E5E5E5;
  --color-neutral-300:  #D4D4D4;
  --color-neutral-400:  #A3A3A3;
  --color-neutral-500:  #737373;
  --color-neutral-600:  #525252;
  --color-neutral-700:  #404040;
  --color-neutral-800:  #262626;
  --color-neutral-900:  #171717;
  --color-neutral-1000: #000000;

  /* Semantic — grayscale feedback */
  --color-success-light: #F5F5F5;
  --color-success:       #404040;
  --color-success-dark:  #171717;
  --color-warning-light: #E5E5E5;
  --color-warning:       #525252;
  --color-warning-dark:  #262626;
  --color-error-light:   #E7E7E7;
  --color-error:         #1A1A1A;
  --color-error-dark:    #0A0A0A;
  --color-info-light:    #EDEDED;
  --color-info:          #363636;
  --color-info-dark:     #141414;
}
```

```json
{
  "color": {
    "primary": {
      "00":  { "value": "#FAFAFA" },
      "50":  { "value": "#F4F4F5" },
      "100": { "value": "#E4E4E7" },
      "200": { "value": "#D4D4D8" },
      "300": { "value": "#A1A1AA" },
      "400": { "value": "#71717A" },
      "500": { "value": "#52525B" },
      "600": { "value": "#3F3F46" },
      "700": { "value": "#27272A" },
      "800": { "value": "#18181B" }
    },
    "secondary": {
      "00":  { "value": "#F8FAFC" },
      "50":  { "value": "#F1F5F9" },
      "100": { "value": "#E2E8F0" },
      "200": { "value": "#CBD5E1" },
      "300": { "value": "#94A3B8" },
      "400": { "value": "#64748B" },
      "500": { "value": "#475569" },
      "600": { "value": "#334155" },
      "700": { "value": "#1E293B" },
      "800": { "value": "#0F172A" }
    },
    "neutral": {
      "0":    { "value": "#FFFFFF" },
      "50":   { "value": "#FAFAFA" },
      "100":  { "value": "#F5F5F5" },
      "200":  { "value": "#E5E5E5" },
      "300":  { "value": "#D4D4D4" },
      "400":  { "value": "#A3A3A3" },
      "500":  { "value": "#737373" },
      "600":  { "value": "#525252" },
      "700":  { "value": "#404040" },
      "800":  { "value": "#262626" },
      "900":  { "value": "#171717" },
      "1000": { "value": "#000000" }
    },
    "semantic": {
      "success-light": { "value": "#F5F5F5" },
      "success":       { "value": "#404040" },
      "success-dark":  { "value": "#171717" },
      "warning-light": { "value": "#E5E5E5" },
      "warning":       { "value": "#525252" },
      "warning-dark":  { "value": "#262626" },
      "error-light":   { "value": "#E7E7E7" },
      "error":         { "value": "#1A1A1A" },
      "error-dark":    { "value": "#0A0A0A" },
      "info-light":    { "value": "#EDEDED" },
      "info":          { "value": "#363636" },
      "info-dark":     { "value": "#141414" }
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
