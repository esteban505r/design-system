---
version: alpha
name: Oter Design System
description: Single source of truth for Oter design tokens across web, Android, iOS, Flutter, and Compose.
colors:
  brand:
    primary: "#16A34A"
    primary-hover: "#15803D"
    primary-light: "#4ADE80"
    primary-tint: "#14532D"
    primary-tint-15: "#22C55E26"
    primary-tint-20: "#22C55E33"
  surface:
    background: "#050F08"
    surface: "#0D1A11"
    border: "#1E3D29"
    border-light: "#2A5039"
    surface-hover: "#15291C"
  text:
    primary: "#F0FDF4"
    secondary: "#86EFAC"
    tertiary: "#15803D"
  semantic:
    danger: "#15803D"
    success: "#4ADE80"
    warning: "#86EFAC"
    info: "#22C55E"
    danger-hover: "#15803D"
    info-hover: "#15803D"
    success-hover: "#22C55E"
    warning-hover: "#4ADE80"
  eisenhower:
    importance-high: "#4ADE80"
    importance-low: "#052E10"
    importance-medium: "#86EFAC"
    urgency-moderate: "#22C55E"
    urgency-not: "#14532D"
    urgency-urgent: "#15803D"
  gradient:
    auth-gradient-color-1: "#15803D"
    auth-gradient-color-2: "#14532D"
    auth: "linear-gradient(to bottom right, #16A34A, #052E10)"
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
    h1: 28px
    h2: 24px
    body: 16px
    body-sm: 14px
    button: 16px
    caption: 12px
    h3: 20px
    h4: 18px
    h5: 16px
    h6: 14px
    mono: 14px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
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

> Oter is a life-management platform spanning **finance, tasks, habits, nutrition, workouts, and study**. The product ships **dark-first** on a red-on-umber palette.

The machine-readable design tokens live in the YAML frontmatter above — **this is the single source of truth**. Run `pnpm run sync` after editing them to regenerate `tokens/`, `dist/**`, and `figma/tokens.json`. Never hand-edit those generated outputs.

## Overview

Dark-first, high-contrast UI with a single evocative red accent driving interaction. Calm umber surfaces; the brand red is reserved for the most important action per screen.

## Colors

- **Brand** — `primary` (#DC2626) is the sole interaction driver, with hover/light/tint variants for states and washes.
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
