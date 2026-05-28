# Oter — Design System & Product Screens

> Oter is a life-management platform spanning **finance, tasks, habits, nutrition, workouts, and study**. The product ships **dark-first** on an orange-on-umber palette, with a light theme that inverts surfaces while preserving the brand hue.

**Version:** 1.0.9 · **Scope:** Web · Desktop · Mobile (iOS, Android, Compose) · **Status:** Active

---

## Overview

This project holds the Oter design-system foundations and a set of high-fidelity product screens built directly on its tokens. Every screen consumes the same CSS custom properties exported from `ds/colors_and_type.css`, so the look stays consistent across surfaces and themes.

**Golden rule: always use tokens.** Never hardcode hex values, font sizes, spacing numbers, radii, shadows, durations, or z-index integers in component code.

---

## Project structure

```
ds/
  colors_and_type.css            Token definitions (CSS custom properties)
  colors_and_type.standalone.css Self-contained variant (inlined fonts)
  fonts/                         Lexend TTFs (mobile typeface)
  icon.png · logo.png            Otter mascot mark + wordmark

DesignSystem.html                Living design-system reference
LoginScreen.html                 Mobile login (Variant B — hero gradient + sheet)
Oter Login Screen.html           Login, bundled as standalone offline HTML
Finance.html                     Finance feature screens
Tasks Screen.html                Tasks / Eisenhower matrix
Workout.html                     Workout feature screens
```

Screens are React + Babel prototypes; shared scaffolds (`design-canvas.jsx`, `ios-frame.jsx`) and per-feature `*.jsx` files compose into each HTML entry point.

---

## Design tokens

### Color

Every color token and its current value (from `tokens.json` · `Global/Mode 1`).

**Brand / primary**

| Token | Value |
|---|---|
| `primary-color` | `#F97316` |
| `primary-hover` | `#EA580C` |
| `primary-light` | `#FB923C` |
| `primary-tint` | `#9A3412` |
| `primary-tint-15` | `#F9731626` |
| `primary-tint-20` | `#F9731633` |

**Surfaces & borders**

| Token | Value |
|---|---|
| `background-color` | `#1A0A08` |
| `surface-color` | `#2A1408` |
| `surface-hover` | `#3D1F0C` |
| `border-color` | `#4D2810` |
| `border-light` | `#6B3A18` |

**Text**

| Token | Value |
|---|---|
| `text-primary` | `#FFEDD5` |
| `text-secondary` | `#FDBA74` |
| `text-tertiary` | `#C2410C` |

**Semantic** — feedback states only; never brand tokens.

| Token | Value | Token | Value |
|---|---|---|---|
| `success-color` | `#FB923C` | `success-hover` | `#F97316` |
| `warning-color` | `#FDBA74` | `warning-hover` | `#FB923C` |
| `danger-color` | `#EA580C` | `danger-hover` | `#C2410C` |
| `info-color` | `#F97316` | `info-hover` | `#EA580C` |

**Eisenhower** — urgency × importance; reserved for the tasks matrix.

| Token | Value | Token | Value |
|---|---|---|---|
| `urgency-urgent` | `#EA580C` | `importance-high` | `#FB923C` |
| `urgency-moderate` | `#F97316` | `importance-medium` | `#FDBA74` |
| `urgency-not` | `#9A3412` | `importance-low` | `#7C2D12` |

**Auth gradient** — reserved for login / register heroes.

| Token | Value |
|---|---|
| `auth-gradient` | `linear-gradient(to bottom right, #EA580C, #7C2D12)` |
| `auth-gradient-color-1` | `#C2410C` |
| `auth-gradient-color-2` | `#9A3412` |

Both themes share token names — values flip when `.light-theme` is set on `<html>`.

### Typography — three typefaces

- **Geist** (`--font-sans`) — web + desktop UI
- **Geist Mono** (`--font-mono`) — tabular numerics, code, tokens
- **Lexend** (`--font-mobile`) — Android / iOS / Compose (ships 100→900 from `ds/fonts/`)

Prefer the semantic `--type-*` shorthand (`var(--type-h2)`, `var(--type-body)`, `var(--type-button)`) over hand-rolled font declarations. Anything showing a time, balance, count, or duration must use `.tabular`.

### Scales

| Scale | Tokens |
|---|---|
| **Spacing** (4px base) | `xs` 4 · `sm` 8 · `md` 16 · `lg` 24 · `xl` 32 · `xxl` 64 |
| **Radius** | `sm` 6 · `md` 8 · `lg` 12 · `xl` 16 · `full` 9999 |
| **Shadow** | `sm` → `xl` (soft, layered — borders first, shadow second) |
| **Motion** | `fast` 150ms · `base` 200ms · `slow` 300ms — all `cubic-bezier(.4, 0, .2, 1)`, never bouncy |
| **Z-index** | `dropdown` 1000 → `tooltip` 1070 |

---

## Conventions

- **Dark-first.** Build and review on dark theme; verify the light inversion second.
- **`gap` over margin.** Lay out flex/grid rows with `gap: var(--spacing-*)`, not per-child margins.
- **Token naming is final.** Don't rename, shorten, or alias tokens locally — it breaks cross-platform consistency (web CSS vars, Compose `Theme.kt`, RN / iOS exports).
- **Missing values = pending, not optional.** If a token isn't defined, wait for it rather than improvising.
- **All values in `px`** (or `rem` where noted); conversion to `sp` / `pt` / `dp` happens at the token-pipeline level.

---

## Token source of truth

Token values live in the **`figma-tokens`** JSON block of the foundations doc (Tokens Studio format). On the `figma-ssot` branch, `figma/tokens.json` is canonical and syncs via `pnpm run sync:figma`; on `main`, edit the JSON block and run `pnpm run sync:md`. These feed a Style Dictionary export pipeline targeting web, React Native, native iOS, and Android.

---

*Last updated: May 2026 · Oter Design Systems team*
