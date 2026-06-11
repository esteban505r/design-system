# Belcorp Design System — Foundations

> Centralized design tokens for Belcorp (DS 5.0) — consultant app on Android today, iOS next.
> **`figma/tokens.json` is the absolute single source of truth** — `tokens/` and `dist/`
> are generated from it by `pnpm run sync:figma`. This document is documentation only;
> the Maven release version comes from the `VERSION` file at the repo root (the version
> line below is a synced mirror).

**Version:** 2.0.0 · **Scope:** Android (Compose) · iOS (planned) · **Status:** Active

---

## Golden rule

**Always use tokens — semantic first.** Never hardcode hex values, font sizes, spacing
numbers, radii, stroke widths, or duration integers in component code. Components consume
semantic tokens (`text-*`, `bg-*`, `border-*`, `interactive-*`); primitives (`primary-500`,
`neutral-200`, …) are for the semantic layer, showcases, and documented exceptions only.
Token edits happen in `figma/tokens.json` (flat Tokens Studio names) followed by
`pnpm run sync:figma`.

v2.0.0 adopts **Belcorp Design System 5.0** (Figma: _Claude Design.fig_) — a breaking
change from the v1 set that was seeded from the legacy app theme.

## Color primitives

**Primary — corporate purple** (`primary-00 … primary-800`)

`00 #F5F0FC` · `50 #EBE2F8` · `100 #D6C4F2` · `200 #B896E7` · `300 #9D6ED9` ·
`400 #8A5ACE` · **`500 #7D4DBE`** · `600 #6436AB` · `700 #471F86` · `800 #2D0F5E`

**Secondary — warm gold** (`secondary-00 … secondary-800`) — accent CTAs, promos, badges;
never the primary CTA. Text on white uses 700/800 for WCAG AA.

`00 #FFFDF5` · `50 #FFF8E1` · `100 #FFECB3` · `200 #FFE082` · `300 #FFD54F` ·
`400 #FFCA28` · **`500 #FFBD42`** · `600 #FFB300` · `700 #E79B1D` · `800 #C28B30`

**Neutrals — cool greys** (`neutral-0 … neutral-1000`)

`0 #FFFFFF` · `50 #F9FAFB` · `100 #F3F4F6` · `200 #E5E7EB` · `300 #D1D5DB` ·
`400 #9CA3AF` · `500 #6B7280` · `600 #4B5563` · `700 #374151` · `800 #1F2937` ·
`900 #030712` · `1000 #000000`

**Status** — each with a pale `-light` tint for badge backgrounds and a `-dark` step for text:

| Token | Light | Base | Dark |
|---|---|---|---|
| `status-success*` | `#BBF7D0` | `#16A34A` | `#15803D` |
| `status-warning*` | `#FEF3C7` | `#FFB90A` | `#BD750F` |
| `status-error*` | `#FEE2E2` | `#DC2626` | `#B91C1C` |
| `status-info*` | `#DBEAFE` | `#2563EB` | `#1245D4` |

**Sub-brands** — for brand headers/badges and each sub-brand's own surfaces only:
`brand-belcorp #7D4DBE` · `brand-esika #E1251B` · `brand-lbel #2E1A47` · `brand-cyzone #A90061`

## Color semantics

- **Text**: `primary` neutral-900 · `secondary` neutral-600 · `tertiary` neutral-400 ·
  `disabled` neutral-300 · `inverse` neutral-0 · `brand` primary-500 ·
  `success/warning/error/info` = status `-dark` steps
- **Background**: `page`/`surface` neutral-0 · `subtle` neutral-50 · `brand` primary-500 ·
  `brand-subtle` primary-50 · status backgrounds = `-light` tints ·
  `overlay` rgba(3,7,18,0.60) · `disabled` neutral-100
- **Border**: `default` neutral-200 · `strong` neutral-300 · `brand` primary-500 ·
  `disabled` neutral-200
- **Interactive (primary action)**: `default` 500 · `hover` 600 · `active` 700 ·
  `disabled` neutral-200 · `text` neutral-0 · `focus-ring` primary-400 (3 px)

## Typography

Single family: **Montserrat** (`font-primary`). Weights: `regular 400` · `medium 500` ·
`semibold 600` · `bold 700`. Line-height 100% for headings/button/overline, 150% for body/label.

| Style | Size / LH (sp) | Weight |
|---|---|---|
| `display` | 72 / 72 | Bold |
| `h1` | 40 / 40 | Bold |
| `h2` | 32 / 32 | Bold |
| `h3` | 24 / 24 | SemiBold |
| `h4` | 20 / 20 | SemiBold |
| `h5` | 16 / 16 | SemiBold |
| `body-lg` | 16 / 24 | Regular |
| `body-md` | 14 / 21 | Regular |
| `body-sm` | 12 / 18 | Regular |
| `button` | 14 / 14 | SemiBold |
| `label` | 14 / 21 | Medium |
| `overline` | 12 / 12 | Bold, UPPERCASE, +0.08em tracking (tracking applied app-side) |

## Dimensions

- **Spacing** (`space-1 … space-14`, 4 px base): 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 96, 128
- **Radius**: `none 0` · `xs 2` · `sm 4` · `md 8` · `lg 12` · `xl 16` · `2xl 24` · `full 9999`
  — aliases: `card 12` · `modal 16` · `badge full` · `button 8` · `input 8`
- **Stroke**: `sm 1` · `md 2` · `lg 4`

## Elevation

Soft, short shadows — never colored: `1` hairline · `2` cards · `3` popovers · `4` modals ·
`5` toasts (string tokens; Compose uses dp approximations 1/2/4/8/16).

## Motion

Durations (ms): `instant 0` · `fast 100` · `normal 200` · `slow 300` · `slower 500`.
Easing: `default cubic-bezier(0.4, 0, 0.2, 1)` · `in` · `out`. No bouncy springs.

## Z-index

`base 0` · `raised 10` · `overlay 100` · `modal 200` · `toast 300`.

## Releasing

Consumers resolve **`com.estebanruano:tokens-android-belcorp`** from GitHub Packages.
Bump the **`VERSION`** file (`pnpm run version:set -- --version x.y.z`), commit, then run
**Actions → Publish Android library** on the `belcorp` branch — no inputs; it syncs from
`figma/tokens.json` and publishes the version in `VERSION`. Or locally:

```bash
pnpm install && pnpm run version:set -- --version x.y.z && pnpm run sync:figma
GITHUB_REPOSITORY=esteban505r/design-system \
GITHUB_ACTOR=<user> GITHUB_TOKEN=<PAT write:packages> \
./gradlew :design-tokens-android:publish
```

Semver: **major** = token renamed/removed · **minor** = new tokens · **patch** = value change.
