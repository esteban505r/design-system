# Oter — Design System & Product Screens

> Oter is a life-management platform spanning **finance, tasks, habits, nutrition, workouts, and study**. The product ships **dark-first** on a pink-on-plum palette, with a light theme that inverts surfaces while preserving the brand hue.

**Version:** 1.0.21 
**Scope:** Web · Desktop · Mobile (iOS, Android, Compose) · **Status:** Active

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

### Color — five token groups

| Group | Tokens | Notes |
|---|---|---|
| **Brand (pink)** | `primary-color` `#EC4899`, `primary-hover`, `primary-light`, `primary-tint-15/20` | Buttons, focus rings, active states |
| **Surfaces (plum)** | `background-color` `#1A0A13`, `surface-color`, `surface-hover`, `border-color`, `border-light` | Canvas, cards, dividers |
| **Text** | `text-primary` `#FDF2F8`, `text-secondary`, `text-tertiary` | Warm rose ramp |
| **Semantic** | `success` · `warning` · `danger` · `info` (each with `-hover`) | Feedback states only — never brand tokens |
| **Eisenhower** | `urgency-*` × `importance-*` | Reserved for the tasks matrix |

Both themes share token names — values flip when `.light-theme` is set on `<html>`. The **auth gradient** (`--auth-gradient: linear-gradient(to bottom right, #BE185D, #86198F)`) is reserved for login / register heroes.

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

## Token data

Machine-readable source for **`pnpm run sync:md`**. Edit values here (not `figma/tokens.json`).

```json design-tokens
{
  "Global/Mode 1/Global/Mode 1": {
    "primary-color": {
      "$value": "#64f263",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "primary-hover": {
      "$value": "#4f46e5",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "primary-light": {
      "$value": "#818cf8",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "primary-tint": {
      "$value": "#343c75",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "background-color": {
      "$value": "#0f172a",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "surface-color": {
      "$value": "#1e293b",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "border-color": {
      "$value": "#334155",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "text-primary": {
      "$value": "#f8fafc",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "text-secondary": {
      "$value": "#94a3b8",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "text-tertiary": {
      "$value": "#64748b",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "danger-color": {
      "$value": "#ef4444",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "success-color": {
      "$value": "#22c55e",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "warning-color": {
      "$value": "#f59e0b",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "info-color": {
      "$value": "#3b82f6",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "auth-gradient-color-1": {
      "$value": "#4338ca",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "auth-gradient-color-2": {
      "$value": "#6b21a8",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "border-light": {
      "$value": "#475569",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "danger-hover": {
      "$value": "#dc2626",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "importance-high": {
      "$value": "#3b82f6",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "importance-low": {
      "$value": "#6b7280",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "importance-medium": {
      "$value": "#8b5cf6",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "info-hover": {
      "$value": "#2563eb",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "primary-tint-15": {
      "$value": "#6366f126",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "primary-tint-20": {
      "$value": "#6366f133",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "success-hover": {
      "$value": "#16a34a",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "surface-hover": {
      "$value": "#334155",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "urgency-moderate": {
      "$value": "#f59e0b",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "urgency-not": {
      "$value": "#6b7280",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "urgency-urgent": {
      "$value": "#ef4444",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "warning-hover": {
      "$value": "#d97706",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "type-h1": {
      "$value": 28,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "type-h2": {
      "$value": 24,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "spacing-xs": {
      "$value": 4,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "spacing-sm": {
      "$value": 8,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "spacing-md": {
      "$value": 16,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "font-bold": {
      "$value": 700,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "font-extrabold": {
      "$value": 800,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "font-medium": {
      "$value": 500,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "font-regular": {
      "$value": 400,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "font-semibold": {
      "$value": 600,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "radius-full": {
      "$value": 9999,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "radius-lg": {
      "$value": 12,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "radius-md": {
      "$value": 8,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "radius-sm": {
      "$value": 6,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "radius-xl": {
      "$value": 16,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "spacing-lg": {
      "$value": 24,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "spacing-xl": {
      "$value": 32,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "spacing-xxl": {
      "$value": 64,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "transition-base": {
      "$value": 200,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "transition-fast": {
      "$value": 150,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "transition-slow": {
      "$value": 300,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "type-body": {
      "$value": 16,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "type-body-sm": {
      "$value": 14,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "type-button": {
      "$value": 16,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "type-caption": {
      "$value": 12,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "type-h3": {
      "$value": 20,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "type-h4": {
      "$value": 18,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "type-h5": {
      "$value": 16,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "type-h6": {
      "$value": 14,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "type-mono": {
      "$value": 14,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "z-base": {
      "$value": 0,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "z-dropdown": {
      "$value": 1000,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "z-fixed": {
      "$value": 1030,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "z-modal": {
      "$value": 1050,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "z-modal-backdrop": {
      "$value": 1040,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "z-sticky": {
      "$value": 1020,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "z-toast": {
      "$value": 1060,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "z-tooltip": {
      "$value": 1070,
      "$type": "number",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    }
  },
  "$themes": [],
  "$metadata": {
    "tokenSetOrder": [
      "Global/Mode 1/Global/Mode 1"
    ]
  }
}
```

## Token source of truth

**Markdown path:** edit the **`design-tokens`** JSON block above and **`**Version:**`**, then run **`pnpm run sync:md`** (does not read `figma/tokens.json`). **Figma path:** edit **`figma/tokens.json`** and run **`pnpm run sync:figma`**.

---

*Last updated: May 2026 · Oter Design Systems team*
