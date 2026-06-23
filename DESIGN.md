---
version: alpha
name: Oter Design System
description: Single source of truth for Oter design tokens across web, Android, iOS, Flutter, and Compose.
colors:
  brand:
    primary: "#A855F7"
    primary-hover: "#7E22CE"
    primary-light: "#D8B4FE"
    primary-tint: "#4C1D95"
    primary-tint-15: "#C084FC26"
    primary-tint-20: "#C084FC33"
  surface:
    background: "#0F050F"
    border: "#3D1F47"
    border-light: "#50305F"
    surface: "#1A0F2E"
    surface-hover: "#291B3D"
  text:
    primary: "#F5F3FF"
    secondary: "#E9D5FF"
    tertiary: "#7E22CE"
  semantic:
    danger: "#7E22CE"
    danger-hover: "#7E22CE"
    info: "#C084FC"
    info-hover: "#7E22CE"
    success: "#D8B4FE"
    success-hover: "#C084FC"
    warning: "#E9D5FF"
    warning-hover: "#D8B4FE"
  eisenhower:
    importance-high: "#D8B4FE"
    importance-low: "#2E0530"
    importance-medium: "#E9D5FF"
    urgency-moderate: "#C084FC"
    urgency-not: "#4C1D95"
    urgency-urgent: "#7E22CE"
  gradient:
    auth: "linear-gradient(to bottom right, #A855F7, #2E0530)"
    auth-gradient-color-1: "#7E22CE"
    auth-gradient-color-2: "#4C1D95"
typography:
  family:
    brand: Geist
    mobile: Lexend
    mono: Geist Mono
    sans: Geist
  weight:
    bold: 700
    extrabold: 800
    medium: 500
    regular: 400
    semibold: 600
  size:
    body: 16px
    body-sm: 14px
    button: 16px
    caption: 12px
    h1: 28px
    h2: 24px
    h3: 20px
    h4: 18px
    h5: 16px
    h6: 14px
    mono: 14px
spacing:
  lg: 24px
  md: 16px
  sm: 8px
  xl: 32px
  xs: 4px
  xxl: 64px
rounded:
  full: 9999px
  lg: 12px
  md: 8px
  sm: 6px
  xl: 16px
shadow:
  lg: 0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(0,0,0,0.10)
  md: 0 4px 6px -1px rgba(0,0,0,0.10), 0 2px 4px -2px rgba(0,0,0,0.10)
  sm: 0 1px 2px 0 rgba(0,0,0,0.05)
  xl: 0 20px 25px -5px rgba(0,0,0,0.10), 0 8px 10px -6px rgba(0,0,0,0.10)
motion:
  duration:
    base: 200ms
    fast: 150ms
    slow: 300ms
  easing:
    standard: cubic-bezier(.4, 0, .2, 1)
zIndex:
  base: 0
  dropdown: 1000
  fixed: 1030
  modal: 1050
  modal-backdrop: 1040
  sticky: 1020
  toast: 1060
  tooltip: 1070
---

# Oter Design System

> Oter is a life-management platform spanning **finance, tasks, habits, nutrition, workouts, and study**. The product ships **dark-first** on a purple-on-deep-violet palette.

The machine-readable design tokens live in the YAML frontmatter above — **this is the single source of truth**. Run `pnpm run sync` after editing them to regenerate `tokens/`, `dist/**`, and `figma/tokens.json`. Never hand-edit those generated outputs.

## Overview

Dark-first, high-contrast UI with a single evocative purple accent driving interaction. Calm deep-violet surfaces; the brand purple is reserved for the most important action per screen.

## Colors

- **Brand** — `primary` (#A855F7) is the sole interaction driver, with hover/light/tint variants for states and washes.
- **Surface** — layered umber backgrounds and borders for depth in dark mode.
- **Text** — a readable ramp from `primary` down to `tertiary`.
- **Semantic** — success / warning / danger / info plus hover variants.
- **Eisenhower** — urgency and importance accents for the tasks matrix.
- **Gradient** — the auth hero gradient.

## Typography

Geist for sans + brand, Geist Mono for code, Lexend on mobile. Weights run regular → extrabold; the size scale spans `h1` → `mono`.

## Layout

Spacing follows a 4px base (`xs` → `xxl`). Use tokens, never raw pixel values.

## Shapes

Corner radii (`rounded`) run `sm` → `full`; avoid mixing rounded and sharp corners in the same view.

## Elevation & Depth

Four shadow steps (`sm` → `xl`) express hierarchy; prefer tonal surfaces over heavy shadows in dark mode.

## Motion

Durations `fast` / `base` / `slow` with a single standard easing curve.

## Do's and Don'ts

- Do use `colors.brand.primary` only for the single most important action per screen.
- Do reference tokens everywhere — never hardcode hex, sizes, spacing, radii, shadows, durations, or z-index integers.
- Don't edit `tokens/`, `dist/`, or `figma/tokens.json` by hand; they are generated from this file.