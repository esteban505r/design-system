# Oter — Design System Foundations

> **Branch `figma-ssot`:** edit **[`figma/tokens.json`](figma/tokens.json)** as the single source of truth → `pnpm run sync:figma`. On **`main`**, edit the **`figma-tokens`** JSON block below (same format) → `pnpm run sync:md`.

**Version:** 1.0.9
**Scope:** Web · Desktop · Mobile (iOS, Android, Compose)
**Status:** Reference (see `figma/tokens.json` on `figma-ssot`)
**Source of truth (figma-ssot branch):** [`figma/tokens.json`](figma/tokens.json)

> Oter is a life-management platform spanning finance, tasks, habits, nutrition, workouts, and study. The product ships **dark-first** on an indigo-on-slate palette, with a light theme that inverts surfaces while preserving the brand hue. Use design tokens instead of hardcoded values.
>
> **Production pipeline on `figma-ssot`:** [docs/figma-ssot.md](docs/figma-ssot.md)


## Token definitions (Figma / Tokens Studio format)

Machine-readable source for `pnpm run sync:md`. Use the **same flat names and `$value` / `$type` shape** as [`figma/tokens.json`](figma/tokens.json) (Tokens Studio export). Tables and CSS blocks below are documentation only — **edit this block** (or `figma/tokens.json` on `figma-ssot`) to change token values.

```json figma-tokens
{
  "Global/Mode 1": {
    "auth-gradient": {
      "$value": "linear-gradient(to bottom right, #4338CA, #6B21A8)",
      "$type": "string",
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
    "easing-standard": {
      "$value": "cubic-bezier(0.4, 0, 0.2, 1)",
      "$type": "string",
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
    "font-brand": {
      "$value": "Geist",
      "$type": "string",
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
    "font-mobile": {
      "$value": "Lexend",
      "$type": "string",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "font-mono": {
      "$value": "Geist Mono",
      "$type": "string",
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
    "font-sans": {
      "$value": "Geist",
      "$type": "string",
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
    "primary-color": {
      "$value": "#6366f1",
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
    "primary-tint-15": {
      "$value": "rgba(99,102,241,0.15)",
      "$type": "color",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "primary-tint-20": {
      "$value": "rgba(99,102,241,0.20)",
      "$type": "color",
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
    "shadow-lg": {
      "$value": "0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(0,0,0,0.10)",
      "$type": "string",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "shadow-md": {
      "$value": "0 4px 6px -1px rgba(0,0,0,0.10), 0 2px 4px -2px rgba(0,0,0,0.10)",
      "$type": "string",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "shadow-sm": {
      "$value": "0 1px 2px 0 rgba(0,0,0,0.05)",
      "$type": "string",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "shadow-xl": {
      "$value": "0 20px 25px -5px rgba(0,0,0,0.10), 0 8px 10px -6px rgba(0,0,0,0.10)",
      "$type": "string",
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
      "$value": "16px",
      "$type": "fontSize",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "type-body-sm": {
      "$value": "14px",
      "$type": "fontSize",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "type-button": {
      "$value": "16px",
      "$type": "fontSize",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "type-caption": {
      "$value": "12px",
      "$type": "fontSize",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "type-h1": {
      "$value": "28px",
      "$type": "fontSize",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "type-h2": {
      "$value": "24px",
      "$type": "fontSize",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "type-h3": {
      "$value": "20px",
      "$type": "fontSize",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "type-h4": {
      "$value": "18px",
      "$type": "fontSize",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "type-h5": {
      "$value": "16px",
      "$type": "fontSize",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "type-h6": {
      "$value": "14px",
      "$type": "fontSize",
      "$extensions": {
        "com.figma.scopes": [
          "ALL_SCOPES"
        ],
        "com.figma.hiddenFromPublishing": false
      }
    },
    "type-mono": {
      "$value": "14px",
      "$type": "fontSize",
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
      "global",
      "Global/Mode 1"
    ],
    "version": "1.0.9"
  }
}
```

---

## Table of Contents

1. [Color System](#1-color-system)
2. [Typography System](#2-typography-system)
3. [Spacing Scale](#3-spacing-scale)
4. [Radius Scale](#4-radius-scale)
5. [Elevation / Shadows](#5-elevation--shadows)
6. [Motion](#6-motion)
7. [Z-Index Ladder](#7-z-index-ladder)
8. [General Guidelines](#8-general-guidelines)

---

## 1. Color System

Five token groups: **Brand** (indigo), **Surfaces** (slate), **Text**, **Semantic**, and the **Eisenhower** accents used by the tasks UI. Reference tokens by name in all code — never use raw hex values. Both themes share token names; the value flips when `.light-theme` is set on `<html>`.

### 1.1 Brand / Primary — Indigo

| Token | Dark theme | Light theme | Usage |
|---|---|---|---|
| `primary-color` | `#6366F1` (indigo-500) | `#4F46E5` (indigo-600) | Buttons, focus rings, active states |
| `primary-hover` | `#4F46E5` (indigo-600) | `#3730A3` (indigo-800) | Hover state for primary actions |
| `primary-light` | `#818CF8` (indigo-400) | `#6366F1` (indigo-500) | Active nav text, accent type |
| `primary-tint-15` | `rgba(99, 102, 241, 0.15)` | — | Pill backgrounds, selected hover |
| `primary-tint-20` | `rgba(99, 102, 241, 0.20)` | — | Selected nav item background |

### 1.2 Surfaces — Slate

| Token | Dark theme | Light theme | Usage |
|---|---|---|---|
| `background-color` | `#0F172A` (slate-900) | `#F8FAFC` (slate-50) | App canvas, base background |
| `surface-color` | `#1E293B` (slate-800) | `#FFFFFF` | Cards, navbar, sidebar |
| `surface-hover` | `#334155` (slate-700) | `#F1F5F9` (slate-100) | Hover state on surface |
| `border-color` | `#334155` (slate-700) | `#E2E8F0` (slate-200) | Dividers, default borders |
| `border-light` | `#475569` (slate-600) | `#CBD5E1` (slate-300) | Hover divider, emphasized border |

### 1.3 Text — Slate ramp

| Token | Dark theme | Light theme | Usage |
|---|---|---|---|
| `text-primary` | `#F8FAFC` (slate-50) | `#0F172A` (slate-900) | Headings, body copy |
| `text-secondary` | `#94A3B8` (slate-400) | `#64748B` (slate-500) | Subtext, helper copy |
| `text-tertiary` | `#64748B` (slate-500) | `#94A3B8` (slate-400) | Captions, disabled labels |

### 1.4 Semantic — Status

Use these tokens exclusively for feedback states (alerts, toasts, badges, form validation, overdue items, transaction direction). Do not use brand tokens for semantic purposes.

| Token | Dark / Light | Usage |
|---|---|---|
| `success-color` | `#22C55E` / `#16A34A` | Completed tasks, income transactions |
| `success-hover` | `#16A34A` / `#15803D` | Hover / pressed state |
| `warning-color` | `#F59E0B` / `#D97706` | Reschedule, caution, streak flame |
| `warning-hover` | `#D97706` / `#B45309` | Hover / pressed state |
| `danger-color` | `#EF4444` / `#DC2626` | Destructive actions, overdue, expense |
| `danger-hover` | `#DC2626` / `#B91C1C` | Hover / pressed state |
| `info-color` | `#3B82F6` / `#2563EB` | Neutral information |
| `info-hover` | `#2563EB` / `#1D4ED8` | Hover / pressed state |

### 1.5 Eisenhower — Urgency × Importance

Reserved for the tasks matrix board. Do not repurpose for general semantic states.

| Token | Value |
|---|---|
| `urgency-urgent` | `#EF4444` |
| `urgency-moderate` | `#F59E0B` |
| `urgency-not` | `#6B7280` |
| `importance-high` | `#3B82F6` |
| `importance-medium` | `#8B5CF6` |
| `importance-low` | `#6B7280` |

### 1.6 Auth Gradient

Used only on login / register hero backgrounds. Use the **gradient** shorthand in CSS; use the two **color** stops where platforms need solid variables (Figma, Android `@color/`, etc.).

| Token | Value |
|---|---|
| `auth-gradient` | `linear-gradient(to bottom right, #4338CA, #6B21A8)` (indigo-700 → purple-800) |
| `auth-gradient-color-1` | `#4338CA` (indigo-700) |
| `auth-gradient-color-2` | `#6B21A8` (purple-800) |

### 1.7 Implementation

```css
:root,
.dark-theme {
  /* Brand / primary — indigo */
  --primary-color:    #6366f1;
  --primary-hover:    #4f46e5;
  --primary-light:    #818cf8;
  --primary-tint-15:  rgba(99, 102, 241, 0.15);
  --primary-tint-20:  rgba(99, 102, 241, 0.20);

  /* Surfaces — slate */
  --background-color: #0f172a;
  --surface-color:    #1e293b;
  --surface-hover:    #334155;

  /* Text */
  --text-primary:     #f8fafc;
  --text-secondary:   #94a3b8;
  --text-tertiary:    #64748b;

  /* Borders */
  --border-color:     #334155;
  --border-light:     #475569;

  /* Semantic */
  --danger-color:     #ef4444;
  --danger-hover:     #dc2626;
  --success-color:    #22c55e;
  --success-hover:    #16a34a;
  --warning-color:    #f59e0b;
  --warning-hover:    #d97706;
  --info-color:       #3b82f6;
  --info-hover:       #2563eb;

  /* Auth gradient */
  --auth-gradient: linear-gradient(to bottom right, #4338ca, #6b21a8);
  --auth-gradient-color-1: #4338ca;
  --auth-gradient-color-2: #6b21a8;

  /* Eisenhower */
  --urgency-urgent:    #ef4444;
  --urgency-moderate:  #f59e0b;
  --urgency-not:       #6b7280;
  --importance-high:   #3b82f6;
  --importance-medium: #8b5cf6;
  --importance-low:    #6b7280;
}

.light-theme {
  --primary-color:    #4f46e5;
  --primary-hover:    #3730a3;
  --primary-light:    #6366f1;
  --background-color: #f8fafc;
  --surface-color:    #ffffff;
  --surface-hover:    #f1f5f9;
  --text-primary:     #0f172a;
  --text-secondary:   #64748b;
  --text-tertiary:    #94a3b8;
  --border-color:     #e2e8f0;
  --border-light:     #cbd5e1;
  --danger-color:     #dc2626;
  --danger-hover:     #b91c1c;
  --success-color:    #16a34a;
  --success-hover:    #15803d;
  --warning-color:    #d97706;
  --warning-hover:    #b45309;
  --info-color:       #2563eb;
  --info-hover:       #1d4ed8;
}
```


---

## 2. Typography System

Oter uses **three** typefaces, each scoped to a clear role: **Geist** on the web, **Geist Mono** for tabular numerics and code, and **Lexend** on mobile (Android / iOS / Compose). Reach for the semantic `--type-*` shorthand whenever possible — it bakes in weight, size, and line-height together.

### 2.1 Font Families

| Token | Value | Role |
|---|---|---|
| `font-sans` | `"Geist", "Inter", system-ui, …` | Web + desktop UI |
| `font-mono` | `"Geist Mono", ui-monospace, Menlo, …` | Tabular numerics, code, tokens |
| `font-mobile` | `"Lexend", system-ui, …` | Android / iOS / Compose |
| `font-brand` | `var(--font-sans)` | Wordmark — paired with the otter mascot |

> Lexend ships with the full **100 → 900** weight ramp from local TTFs in `ds/fonts/`. The web stack relies on Google Fonts for Geist + Geist Mono.

### 2.2 Font Weights

| Token | Value |
|---|---|
| `font-regular` | `400` |
| `font-medium` | `500` |
| `font-semibold` | `600` |
| `font-bold` | `700` |
| `font-extrabold` | `800` |

### 2.3 Type Scale

All sizes are in `px`. The scale is **semantic** — favor `var(--type-h2)` over hand-rolling a font shorthand.

#### Display & Headings

| Token | Size | Line-height | Weight | Letter-spacing |
|---|---|---|---|---|
| `type-h1` | `28px` | `33.6` (1.2) | `700` | `-0.01em` |
| `type-h2` | `24px` | `30` (1.25) | `700` | `-0.005em` |
| `type-h3` | `20px` | `26` (1.3) | `700` | — |
| `type-h4` | `18px` | `24.3` (1.35) | `700` | — |
| `type-h5` | `16px` | `22.4` (1.4) | `700` | — |
| `type-h6` | `14px` | `19.6` (1.4) | `700` | — |

#### Body & UI Text

| Token | Size | Line-height | Weight |
|---|---|---|---|
| `type-body` | `16px` | `24` (1.5) | `400` |
| `type-body-sm` | `14px` | `21` (1.5) | `400` |
| `type-caption` | `12px` | `16.8` (1.4) | `400` |
| `type-button` | `16px` | `16` (1.0) | `600` |
| `type-mono` | `14px` | `21` (1.5) | `400` |

#### Wordmark

| Token | Size | Weight | Letter-spacing |
|---|---|---|---|
| `brand-wordmark` | `20px` | `700` | `-0.01em` |

#### Utilities

- `.tabular` → `font-variant-numeric: tabular-nums;` — required on all time, balance, and counter displays.
- `.pill` → status-pill component (12px / 500 / `primary-tint-15` background).

### 2.4 Implementation

```css
:root {
  /* Families */
  --font-sans:   "Geist", "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono:   "Geist Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  --font-mobile: "Lexend", system-ui, -apple-system, sans-serif;
  --font-brand:  var(--font-sans);

  /* Semantic scale */
  --type-h1:      700 28px/1.2  var(--font-sans);
  --type-h2:      700 24px/1.25 var(--font-sans);
  --type-h3:      700 20px/1.3  var(--font-sans);
  --type-h4:      700 18px/1.35 var(--font-sans);
  --type-h5:      700 16px/1.4  var(--font-sans);
  --type-h6:      700 14px/1.4  var(--font-sans);
  --type-body:    400 16px/1.5  var(--font-sans);
  --type-body-sm: 400 14px/1.5  var(--font-sans);
  --type-caption: 400 12px/1.4  var(--font-sans);
  --type-button:  600 16px/1    var(--font-sans);
  --type-mono:    400 14px/1.5  var(--font-mono);
}
```


---

## 3. Spacing Scale

Base unit is `4px`. Mirrors the Compose `Dimensions.kt` ramp (4 / 8 / 16 / 32 / 64). Use these for padding, margin, and **`gap`** in flex/grid (the Oter codebase prefers `gap` over per-element margins). Never hardcode numeric values.

| Token | rem | px |
|---|---|---|
| `spacing-xs` | `0.25rem` | `4px` |
| `spacing-sm` | `0.5rem` | `8px` |
| `spacing-md` | `1rem` | `16px` |
| `spacing-lg` | `1.5rem` | `24px` |
| `spacing-xl` | `2rem` | `32px` |
| `spacing-xxl` | `4rem` | `64px` |

### Implementation

```css
:root {
  --spacing-xs:  0.25rem; /*  4px */
  --spacing-sm:  0.5rem;  /*  8px */
  --spacing-md:  1rem;    /* 16px */
  --spacing-lg:  1.5rem;  /* 24px */
  --spacing-xl:  2rem;    /* 32px */
  --spacing-xxl: 4rem;    /* 64px */
}
```


---

## 4. Radius Scale

Use these tokens for `border-radius` on all UI elements. Cards and modals lean generous; pills and avatars use the `full` value.

| Token | Value | Usage |
|---|---|---|
| `radius-sm` | `6px` | Compact chips, small badges |
| `radius-md` | `8px` | Default button / input |
| `radius-lg` | `12px` | Cards, modals |
| `radius-xl` | `16px` | Dashboard surface, large containers |
| `radius-full` | `9999px` | Pills, avatars, toggles |

### Implementation

```css
:root {
  --radius-sm:   6px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-full: 9999px;
}
```


---

## 5. Elevation / Shadows

Cards in Oter **lean on borders first, shadow second** — shadows stay soft and layered, never stark. The dark theme reads well without them; on light theme they take more of the work.

| Token | Value | Usage |
|---|---|---|
| `shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Hairline separation, sticky headers |
| `shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | Cards, list items |
| `shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | Dropdowns, tooltips, popovers |
| `shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Modals, drawers, dialogs |

### Implementation

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
```


> **Mobile note:** React Native and Compose do not support `box-shadow` directly. Use `shadow*` props (iOS), the `elevation` prop / `Modifier.shadow` (Android / Compose). Map shadow tokens at the pipeline level rather than hardcoding platform values in components.

---

## 6. Motion

A single curve — `cubic-bezier(.4, 0, .2, 1)` — at three durations. **Never bouncy.** Motion expresses confidence, not personality.

| Token | Duration | Curve | Usage |
|---|---|---|---|
| `transition-fast` | `150ms` | `cubic-bezier(.4, 0, .2, 1)` | Hover, focus, micro-feedback |
| `transition-base` | `200ms` | `cubic-bezier(.4, 0, .2, 1)` | Default UI transitions |
| `transition-slow` | `300ms` | `cubic-bezier(.4, 0, .2, 1)` | Modal open, page enter |

### Implementation

```css
:root {
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
```


---

## 7. Z-Index Ladder

An explicit, evenly-spaced ladder. **Never use ad-hoc numbers in product code** — pick the token whose role matches the surface you're stacking.

| Token | Value | Usage |
|---|---|---|
| `z-base` | `0` | Default flow |
| `z-dropdown` | `1000` | Menus, comboboxes |
| `z-sticky` | `1020` | Sticky headers, sub-nav |
| `z-fixed` | `1030` | Fixed top bar, floating CTA |
| `z-modal-backdrop` | `1040` | Scrim behind modal |
| `z-modal` | `1050` | Modal panel |
| `z-toast` | `1060` | Transient notifications |
| `z-tooltip` | `1070` | Tooltips — always on top |

### Implementation

```css
:root {
  --z-base:           0;
  --z-dropdown:    1000;
  --z-sticky:      1020;
  --z-fixed:       1030;
  --z-modal-backdrop: 1040;
  --z-modal:       1050;
  --z-toast:       1060;
  --z-tooltip:     1070;
}
```


---

## 8. General Guidelines

- **Always use tokens.** Never hardcode hex values, font sizes, spacing numbers, radius values, shadow strings, durations, or z-index integers in component code.
- **Dark-first.** Build and review components on the dark theme first; verify the light theme inversion second. Both themes share token names — only the values flip.
- **Prefer semantic shortcuts.** Reach for `var(--type-h2)` over hand-rolled font shorthands; reach for `var(--transition-base)` over raw durations.
- **`gap` over margin.** Lay out flex/grid rows with `gap: var(--spacing-*)` rather than margins on individual children — this keeps the Oter codebase resilient under direct-manipulation edits.
- **Tabular numerics are non-negotiable.** Anything that displays a time, balance, count, or duration must use `.tabular` (`font-variant-numeric: tabular-nums`).
- **Token naming is final.** Do not rename, shorten, or alias tokens locally — this breaks cross-platform consistency between web (CSS custom properties), Compose (`Theme.kt`), and the React Native / iOS exports.
- **Missing values = pending, not optional.** If a token isn't defined in this document, wait for it to be officially added rather than improvising a value.
- **All values are in `px` (or `rem` where noted).** Conversion to `sp` / `pt` / `dp` happens at the token pipeline level, not in component code.
- **Cross-platform scope.** These tokens apply to web (CSS custom properties), React Native, native iOS, and Android via a Style Dictionary export pipeline. Token values are defined in the **figma-tokens** JSON block above (Figma / Tokens Studio format).

---

*Last updated: May 2026 · Oter Design Systems team*