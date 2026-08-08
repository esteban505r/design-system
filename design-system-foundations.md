# Belcorp Design System — Foundations

> Centralized design tokens for Belcorp (DS 5.0) — consultant app on Android today, iOS next.
> **`brands/belcorp/figma/tokens.json` is the absolute single source of truth**; the token
> tree and `dist/` are generated from it by `pnpm run sync`.

**Version:** 3.0.0

> ## This document holds rules, not values
>
> It used to reproduce every colour ramp, type step and spacing value by hand.
> Nothing regenerated those tables, so after the v3.0.0 rebrand they documented a
> purple primary (`#7D4DBE`) while the system shipped an orange one (`#BE5B06`) —
> for months, with no test able to notice.
>
> **Token values now live in one place only: [`brands/belcorp/DESIGN.md`](brands/belcorp/DESIGN.md)**,
> regenerated on every build and drift-checked by CI. What remains here is the
> part a generator cannot produce: the rules, the intent, and the release policy.

---

## Golden rule

**Always use tokens — semantic first.** Never hardcode hex values, font sizes, spacing
numbers, radii, stroke widths, or duration integers in component code. Components consume
semantic tokens (`text-*`, `bg-*`, `border-*`, `interactive-*`); primitives (`primary-500`,
`neutral-200`, …) are for the semantic layer, showcases, and documented exceptions only.
Token edits happen in `brands/belcorp/figma/tokens.json` (flat Tokens Studio names) followed by
`pnpm run sync`.

> **This rule is not currently met, and closing it is design-led work.** The semantic layer
> is 43 colour tokens against 118 absorbed app one-offs, and the Android app binds to
> primitives rather than roles — so a rebrand still needs a manual audit of call sites.
> What design needs to author for the rule to become followable, and who owns which tier,
> is in **[docs/foundations-and-semantics.md](docs/foundations-and-semantics.md)**.

v2.0.0 adopted **Belcorp Design System 5.0** (Figma: _Claude Design.fig_) — a breaking
change from the v1 set that was seeded from the legacy app theme. v3.0.0 rebranded the
primary ramp from purple to orange.

## What the token set covers

Every token, with its current value and the exact identifier to type on each platform, is
in **[`brands/belcorp/DESIGN.md`](brands/belcorp/DESIGN.md)**. The families:

| Family | Shape | Owner |
|---|---|---|
| Colour primitives | `primary`, `secondary`, `neutral` ramps, plus per-hue ramps | Brand |
| Colour semantics | `text-*`, `bg-*`, `border-*`, `interactive-*`, `status-*` | Brand |
| `color.app.*` | Absorbed app one-offs — **debt**, frozen, to be drained | Nobody |
| Sub-brands | Belcorp, Ésika, L'Bel, Cyzone header/badge colours | Brand |
| Typography | One family (Montserrat), four weights, a size and line-height scale | Brand |
| Elevation | Five soft, never-coloured shadow steps | Brand |
| Spacing, radius, stroke | Geometry scales | **`core/`** — shared by every brand |
| Motion, z-index | Durations, easings, the stacking ladder | **`core/`** — shared by every brand |

The `core/` rows are deliberate: a rebrand changes colour and type, not the spacing scale.
See [docs/brands.md](docs/brands.md) for how a value resolves across `core/` → brand → mode,
and for the guard that stops two brands disagreeing about a shared scale.

## Naming rules

A semantic token whose name describes appearance has not actually moved up a tier:

| Prefer | Avoid | Why |
|---|---|---|
| `bg-elevated` | `bg-white` | Stops being true in dark mode |
| `text-on-brand` | `text-white` | Ties the name to today's brand colour |
| `border-subtle` | `border-gray-200` | Names the palette position, not the intent |
| `status-error` | `red-600` | Meaning, not hue |

## Releasing

Consumers resolve **`com.estebanruano:tokens-android-belcorp`** from GitHub Packages.
Bump the **`VERSION`** file, commit, then run **Actions → Publish Android library** — no
inputs; it syncs from the Figma export and publishes the version in `VERSION`.

```bash
pnpm install && pnpm run version:set -- --version x.y.z && pnpm run sync
GITHUB_REPOSITORY=esteban505r/design-system \
GITHUB_ACTOR=<user> GITHUB_TOKEN=<PAT write:packages> \
./gradlew :tokens-android-belcorp:publish
```

Semver: **major** = token renamed/removed · **minor** = new tokens · **patch** = value change.

Full checklist, local `~/.m2` verification loop and rollback:
[docs/releasing-android.md](docs/releasing-android.md).
