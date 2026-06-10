# SomosBelcorp — Design System Foundations

> Centralized design tokens for the SomosBelcorp consultant app (Android today, iOS next).
> On this `belcorp` branch the DTCG JSON files under `tokens/` are the **single source of
> truth** — there is no Figma/markdown parse step. This document describes the token set;
> the `**Version:**` line below drives the Maven release version.

**Version:** 1.0.0 · **Scope:** Android (Compose) · iOS (planned) · **Status:** Active

---

## Golden rule

**Always use tokens.** Never hardcode hex values, font sizes, spacing numbers, radii,
stroke widths, or duration integers in component code.

Values were seeded from the production app theme (`Colors.kt`, `Dimentions.kt` in
`:core:presentation:designsystem`), so adopting tokens is visually neutral.

## Color

**Brand**

| Token | Value | Notes |
|---|---|---|
| `color.brand.primary` | `#7D4DBE` | Core Belcorp purple |
| `color.brand.primary-dark` | `#6436AB` | Splash / emphasis |
| `color.brand.primary-surface` | `#F0ECF5` | Card & screen backgrounds |
| `color.brand.primary-tint` | `#E0D1FF` | Dividers, selection |
| `color.brand.secondary` | `#6F5B40` | Material 3 secondary |

**Surface** — `background #FFFFFF`, `surface #FFFFFF`, `surface-alt #F6F6F6`,
`border #CCCCCC`, `border-strong #353434`, `disabled #D9D9D9`, `overlay #00000066`.

**Text** — `primary #000000`, `secondary #545353`, `tertiary #777676`,
`disabled #707070`, `placeholder #BDBDBD`, `inverse #FFFFFF`.

**Semantic** — `success #038356` (+`-surface #E6F3EE`), `error #BA1A1A`
(+`-container #FFDAD6`), `danger #D40000` (+`-surface #FBE5E5`), `warning #FFC83E`
(+`-surface #FFF9EC`), `info #2596BE` (+`-surface #D7ECF9`).

## Dimensions

- **Spacing** (4px base): `xxs 2` · `xs 4` · `sm 8` · `md 16` · `lg 24` · `xl 32` · `xxl 48` · `xxxl 64`
- **Radius**: `xs 2` · `sm 4` · `md 8` · `lg 12` · `xl 16` · `xxl 24` · `pill 100`
- **Stroke**: `sm 1` · `md 2` · `lg 4`

## Typography

- **Families**: brand `Mulish`, heading `Montserrat` (font files live in the app's `:core:resources`)
- **Sizes (sp)**: `caption 12` · `body-sm 13` · `body 14` · `body-md 16` · `subtitle 18` · `h6 20` · `title 22` · `h4 24` · `h3 32` · `h2 42` · `h1 48`
- **Line heights (sp)**: `caption 16` · `body 20` · `body-md 24` · `subtitle 26` · `h6 28` · `h4 32` · `h3 36` · `h2 48` · `h1 56`
- **Weights**: `regular 400` · `bold 700` · `extrabold 800`

## Motion

Durations (ms): `fast 150` · `base 200` · `slow 300`.

## Releasing

Consumers resolve **`com.estebanruano:tokens-android-belcorp`** from GitHub Packages.
Run **Actions → Publish Android library** on the `belcorp` branch with `source = tokens`,
or locally:

```bash
pnpm install && pnpm run build
TOKENS_VERSION=x.y.z GITHUB_REPOSITORY=esteban505r/design-system \
GITHUB_ACTOR=<user> GITHUB_TOKEN=<PAT write:packages> \
./gradlew :design-tokens-android:publish -PtokensVersion=x.y.z
```

Semver: **major** = token renamed/removed · **minor** = new tokens · **patch** = value change.
