---
version: alpha
name: Oter Design System
description: Single source of truth for Oter design tokens across web, Android, iOS, Flutter, and Compose.
colors:
  brand:
    primary: "#EA580C"
    primary-hover: "#C2410C"
    primary-light: "#FB923C"
    primary-tint: "#7C2D12"
    primary-tint-15: "#F9731626"
    primary-tint-20: "#F9731633"
  surface:
    background: "#0F0A05"
    border: "#3D2A1E"
    border-light: "#50382A"
    surface: "#1A1109"
    surface-hover: "#291C12"
  text:
    primary: "#FFF7ED"
    secondary: "#FED7AA"
    tertiary: "#C2410C"
  semantic:
    danger: "#C2410C"
    danger-hover: "#C2410C"
    info: "#F97316"
    info-hover: "#C2410C"
    success: "#FB923C"
    success-hover: "#F97316"
    warning: "#FED7AA"
    warning-hover: "#FB923C"
  eisenhower:
    importance-high: "#FB923C"
    importance-low: "#2E1505"
    importance-medium: "#FED7AA"
    urgency-moderate: "#F97316"
    urgency-not: "#7C2D12"
    urgency-urgent: "#C2410C"
  gradient:
    auth: "linear-gradient(to bottom right, #EA580C, #2E1505)"
    auth-gradient-color-1: "#C2410C"
    auth-gradient-color-2: "#7C2D12"
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

> Oter is a life-management platform spanning **finance, tasks, habits, nutrition, workouts, and study**. The product ships **dark-first** on an orange-on-umber palette.

The machine-readable design tokens live in the YAML frontmatter above — **this is the single source of truth**. Run `pnpm run sync` after editing them to regenerate `tokens/`, `dist/**`, and `figma/tokens.json`. Never hand-edit those generated outputs.

## Overview

Dark-first, high-contrast UI with a single evocative orange accent driving interaction. Calm umber surfaces; the brand orange is reserved for the most important action per screen.

## Colors

- **Brand** — `primary` (#EA580C) is the sole interaction driver, with hover/light/tint variants for states and washes.
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