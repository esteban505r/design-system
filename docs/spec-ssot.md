# DESIGN.md as single source of truth

Token **values** are authored in **`DESIGN.md`** (the google-labs
[DESIGN.md](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md)
format — YAML frontmatter + human-readable body). Everything else is generated,
including `figma/tokens.json`.

---

## Pipeline

```
DESIGN.md                       ← SSOT (edit the YAML frontmatter)
        │
        │  node spec-to-tokens.mjs
        ▼
   tokens/**/*.json             ← DTCG JSON for Style Dictionary
        │
        ├─ node sd.config.mjs        →  dist/web, dist/android, dist/ios, dist/flutter, dist/compose, dist/json
        └─ node tokens-to-figma.mjs  →  figma/tokens.json (generated) + dist/figma/tokens.json
```

**One command:** `pnpm run sync` = `sync:spec` = parse → build → export Figma JSON.

| Script | Purpose |
|--------|---------|
| `pnpm run sync` | Full pipeline from `DESIGN.md` |
| `pnpm run parse` | `DESIGN.md` → `tokens/` |
| `pnpm run build` | `tokens/` → platform `dist/` |
| `pnpm run spec:write` | Regenerate `DESIGN.md` frontmatter from `tokens/` (preserves the body) |
| `pnpm run spec:verify` | Write frontmatter to `dist/DESIGN.generated.md` to diff against `DESIGN.md` |
| `pnpm run figma:export` | Regenerate `figma/tokens.json` from `tokens/` only |
| `pnpm run sync:figma` | **Legacy** one-way import `figma/tokens.json` → `tokens/` (migration/fallback) |

---

## Frontmatter format

The frontmatter mirrors the `tokens/` tree with plain values; `$type` is inferred
by token path during parse (`spec-to-tokens.mjs` → `specValueToDtcg`).

```yaml
---
version: alpha                # DESIGN.md format version (not the release version)
name: Oter Design System
description: ...
colors:
  brand:    { primary: "#DC2626", primary-hover: "#B91C1C", ... }
  surface:  { background: "#0F0505", ... }
  text:     { primary: "#FDF0F0", ... }
  semantic: { success: ..., danger: ..., ... }
  eisenhower: { urgency-urgent: ..., importance-high: ... }
  gradient: { auth: "linear-gradient(...)", auth-gradient-color-1: ... }
typography:
  family: { sans: Geist, mono: "Geist Mono", brand: Geist, mobile: Lexend }
  weight: { regular: 400, semibold: 600, extrabold: 800, ... }
  size:   { h1: 28px, body: 16px, caption: 12px, ... }
spacing:  { xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, xxl: 64px }
rounded:  { sm: 6px, md: 8px, lg: 12px, xl: 16px, full: 9999px }
shadow:   { sm: ..., md: ..., lg: ..., xl: ... }
motion:
  duration: { fast: 150ms, base: 200ms, slow: 300ms }
  easing:   { standard: "cubic-bezier(.4, 0, .2, 1)" }
zIndex:   { base: 0, dropdown: 1000, modal: 1050, tooltip: 1070, ... }
---
```

### Category aliases

DESIGN.md vocabulary ↔ internal token category (`SPEC_TO_CATEGORY` in
`token-name-map.mjs`):

| Frontmatter key | Token category |
|-----------------|----------------|
| `colors` | `color` |
| `typography` | `font` |
| `rounded` | `radius` |
| `zIndex` | `z-index` |
| `spacing` / `shadow` / `motion` | identity |

---

## Editing tokens

### Engineers (local)

```bash
# Edit DESIGN.md frontmatter, then:
pnpm run sync
git add DESIGN.md tokens/ dist/ figma/tokens.json package.json
git commit -m "tokens: update from DESIGN.md"
```

Never hand-edit `tokens/`, `dist/**`, or `figma/tokens.json` — they are generated.

### Designers (Figma)

`figma/tokens.json` is now a **generated output**. After a sync lands, import the
regenerated **`figma/tokens.json`** (or `dist/figma/tokens.json`) into
[Tokens Studio for Figma](https://tokens.studio/). To push values the other way,
edit them in `DESIGN.md` and run `pnpm run sync`.

---

## GitHub Actions (production)

| Workflow | Trigger | Action |
|----------|---------|--------|
| **Sync tokens from DESIGN.md** | Push to `DESIGN.md` or manual | `pnpm run sync`, commit, PR to `main` |
| **CI** | PR to `main` / `belcorp` | `pnpm run sync`, fail on drift, assemble Android |
| **Publish web / Android** | Manual | `pnpm run sync` before publish (version from `VERSION`) |

**Repo settings:** Settings → Actions → General → Workflow permissions →
**Read and write** + **Allow GitHub Actions to create and approve pull requests**
(for `gh pr create`; otherwise the sync commit still pushes and you open the PR).

---

## Release path

Release versions for npm, Android Maven, and `package.json` all come from the
**`VERSION`** file (single-line semver). `DESIGN.md`'s `version: alpha` is the
*format* version and is ignored for releases.

1. `pnpm run version:set -- --version x.y.z` → commit.
2. Edit `DESIGN.md`, `pnpm run sync`, commit (or let the sync workflow do it).
3. Run **Publish web tokens (npm)** and/or **Publish Android library** from `main`.

npm export: `@estebanruano/design-tokens/spec` → `DESIGN.md`,
`@estebanruano/design-tokens/figma` → `figma/tokens.json`.

---

## Mapping reference

| Token path | Frontmatter location |
|------------|----------------------|
| `color.brand.primary` | `colors.brand.primary` |
| `color.surface.background` | `colors.surface.background` |
| `color.semantic.success` | `colors.semantic.success` |
| `color.gradient.auth` | `colors.gradient.auth` |
| `font.size.h1` | `typography.size.h1` |
| `spacing.md` | `spacing.md` |
| `radius.md` | `rounded.md` |
| `motion.duration.base` | `motion.duration.base` |
| `z-index.modal` | `zIndex.modal` |

Type inference lives in `specValueToDtcg` (`token-name-map.mjs`). The reverse
Figma name mapping (`tokenPathToFigmaName`) still drives `tokens-to-figma.mjs`.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| CI drift | Run `pnpm run sync`, commit `tokens/`, `dist/`, `figma/tokens.json`, `package.json` |
| `createPullRequest` not permitted | Enable **Allow GitHub Actions to create and approve pull requests**; sync still pushed — open PR manually |
| No frontmatter found | Ensure `DESIGN.md` starts with a `---` … `---` YAML block |
| Verify frontmatter parity | `pnpm run spec:verify` then diff `dist/DESIGN.generated.md` against `DESIGN.md` |
| Migrate from the old Figma SSOT | `pnpm run sync:figma` (figma→tokens) then `pnpm run spec:write` to regenerate `DESIGN.md` |

---

*See also [workflow-and-production.md](workflow-and-production.md) for registry publishing.*
