# Brands

This repository is **one mainline with brands as configuration**. Brands used to
be separate git branches, which meant every pipeline fix had to be applied twice
and the two branches drifted apart. They are now directories.

## Layout

```
core/tokens/                    scales shared by every brand: spacing, radius,
                                stroke, z-index, motion
brands/<id>/
  brand.json                    identity, coordinates, declared modes
  figma/tokens.json             this brand's source of truth (Tokens Studio export)
  tokens/light/                 generated DTCG: colour, typography, elevation
  DESIGN.md                     generated catalogue for this brand
pipeline/                       the generator, shared by all brands
platforms/android/<id>/         one Gradle module per brand (one line each)
dist/<id>/<platform>/           built artifacts
```

## How a token's value is resolved

A token's **identity** is its path (`color.bg.brand`). Its **value** is a
function of (brand, mode). Layers, later wins:

1. `core/tokens/` — one value for every brand and mode
2. `brands/<id>/tokens/light/` — the brand's own values
3. `brands/<id>/tokens/<mode>/` — only what that mode changes

`light` sits beneath every other mode, so a dark file carries only the tokens
that actually differ rather than restating the whole set.

Only `light` is built today. `pipeline/brands.mjs` already layers any mode, but
every platform writes one flat file per artifact, so a second mode would
overwrite the first instead of landing in `values-night/` or a dark
`ColorScheme`. Emitting those is spec-generator work.

## Who owns `core/`

Exactly one brand carries `"ownsCore": true`; its Figma export is what writes
`core/tokens/`. Any other brand whose export disagrees with `core/` **fails the
build**, naming the files that differ.

That guard is not hypothetical. The Oter token set still on the `main` branch
disagrees with Belcorp on four of the ten core tokens they share:

| Token | Oter | Belcorp |
|---|---|---|
| `radius.sm` | 6 | 4 |
| `motion.duration.fast` | 150 | 100 |
| `z-index.modal` | 1050 | 200 |
| `z-index.toast` | 1060 | 300 |

Last-writer-wins would have made the built output depend on the order brands
happen to be processed in. Failing is the only honest option — the disagreement
is a design decision, not something a build can resolve.

## Adding a brand

1. `brands/<id>/brand.json` — start from `brands/belcorp/brand.json`. Leave
   `ownsCore` unset unless this brand is replacing the one that owns core.
2. `brands/<id>/figma/tokens.json` — the Tokens Studio export.
3. Map any new Figma names in `pipeline/token-name-map.mjs`. Unmapped names are
   a hard error, so nothing can silently vanish.
4. `platforms/android/<id>/` — copy Belcorp's directory. Its `build.gradle.kts`
   is one line; `settings.gradle.kts` discovers the rest.
5. `pnpm run sync && pnpm test`.

Nothing in `pipeline/` should need editing. If it does, that is the signal that
something brand-specific has leaked into shared code.

### Namespaces are per brand

`androidNamespace` and `composePackage` in `brand.json` must be unique — two
AARs sharing an R-class namespace produce duplicate `R` classes, and two
`DesignTokens` objects in one package collide. Belcorp pins the values already
published (`com.estebanruano.tokens`, `com.estebanruano.designtokens`); changing
them breaks every consumer, so new brands take the defaults instead.

## Versioning

One `VERSION` for all brands. A brand-only change bumps everyone, which is
cheap; per-brand versions would multiply the release matrix by N for no real
benefit.
