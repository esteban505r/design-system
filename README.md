# Design System Tokens

A **design-token pipeline**, not a component library. Design authors token values
in Figma; this repo turns one export per brand into artifacts for Android, web,
iOS and Flutter.

```
brands/<brand>/figma/tokens.json     ← the single source of truth (per brand)
        │  pnpm run sync
        ▼
core/tokens/ + brands/<brand>/tokens/<mode>/     ← DTCG JSON (committed, generated)
        │
        ▼
dist/<brand>/{android,compose,web,ios,flutter,json,figma}/
```

Today one brand ships: **Belcorp**, published as
**`com.estebanruano:tokens-android-belcorp`** to GitHub Packages and consumed by
`app-consultoras-replatform-android` (`:core:presentation:designsystem`).

**Never edit `core/tokens/`, `brands/*/tokens/` or `dist/` by hand** — every one
of those files is regenerated, and CI fails the PR if what you committed differs
from what the pipeline produces.

## Documentation

| Guide | Audience |
|-------|----------|
| **[brands/belcorp/DESIGN.md](brands/belcorp/DESIGN.md)** | **Every token, with the exact identifier to type on each platform. Generated — start here, never edit it.** |
| **[Brands](docs/brands.md)** | How brands, modes and `core/` fit together; how to add a brand |
| **[Foundations & the semantic layer](docs/foundations-and-semantics.md)** | **Design team** — what design owns, why apps must bind to semantic roles rather than primitives, and what is still missing |
| **[Figma SSOT](docs/figma-ssot.md)** | How a Figma export becomes platform artifacts |
| **[Releasing the Android library](docs/releasing-android.md)** | Shipping a new AAR — checklist, versioning, rollback |
| [Workflow & production](docs/workflow-and-production.md) | Repo settings, branch protection, registry setup |
| [General next steps](docs/general-next-steps.md) | Platform leads — adopting tokens across web, mobile, Flutter |
| [Android + Material 3](docs/android-material3-next-steps.md) | Android / Compose — theme mapping |

## Quick start

```bash
pnpm install
pnpm run sync     # parse every brand's Figma export, then build every platform
pnpm test
```

| Command | Does |
|---------|------|
| **`pnpm run sync`** | `parse` + `build` for every brand. This is the one you want. |
| `pnpm run parse` | Figma export → the token tree, per brand |
| `pnpm run build` | token tree → `dist/<brand>/**` and `brands/<brand>/DESIGN.md` |
| `pnpm run figma:verify` | Regenerate the Figma export from the token tree and diff it against the SSOT |
| `pnpm test` | Round-trip, name-map, core-ownership and generated-output guards |

Every command acts on all brands. Add `--brand <id>` to narrow:
`node pipeline/sd.config.mjs --brand belcorp`.

## Repository layout

```
core/tokens/              scales shared by every brand: spacing, radius, stroke,
                          z-index, motion
brands/<id>/
  brand.json              identity, Maven/npm coordinates, declared modes
  figma/tokens.json       this brand's source of truth
  tokens/light/           generated DTCG: colour, typography, elevation
  DESIGN.md               generated token catalogue
pipeline/                 the generator, shared by every brand
platforms/android/<id>/   one Gradle module per brand (one line each)
buildSrc/                 the convention plugin all brand modules apply
dist/<id>/<platform>/     built artifacts (committed)
test/                     the guards CI runs
```

See **[docs/brands.md](docs/brands.md)** for how values resolve across
`core/` → brand → mode, and what it takes to add a brand.

## Versioning

One **`VERSION`** file at the repo root, shared by every brand — a brand-only
change bumps them all, which is cheap, where per-brand versions would multiply
the release matrix.

```bash
pnpm run version:set -- --version 3.1.0   # writes VERSION and mirrors it into package.json
pnpm run sync
```

Gradle reads `VERSION` when `-PtokensVersion` / `TOKENS_VERSION` are unset.
Bump for each release — GitHub Packages and npm both reject duplicate versions.

| Bump | Meaning |
|---|---|
| **Major** | A token was renamed or removed |
| **Minor** | New tokens added |
| **Patch** | A token value changed |

## Changing a token

1. Change the variable in **Figma** and export to
   `brands/<brand>/figma/tokens.json` (Tokens Studio, or your Variables sync).
2. If the name is new, map it in `pipeline/token-name-map.mjs`
   (`FIGMA_TO_TOKEN_PATH`). **An unmapped name fails the build** and names
   itself in the error — pass `--allow-unmapped` only while migrating.
3. `pnpm run sync && pnpm test`.
4. Commit the Figma export *and* the regenerated tree and `dist/`. CI re-runs the
   sync and fails on any drift.

Pushing a change to `brands/*/figma/tokens.json` also triggers the **Sync tokens
from Figma JSON** workflow, which does steps 3–4 and opens a PR.

## Using the tokens

### Android

Add the GitHub Packages repository and the artifact:

```kotlin
repositories {
    maven {
        url = uri("https://maven.pkg.github.com/esteban505r/design-system")
        credentials {
            username = project.findProperty("gpr.user") as String? ?: System.getenv("GITHUB_ACTOR")
            password = project.findProperty("gpr.key") as String? ?: System.getenv("GITHUB_TOKEN")
        }
    }
}

dependencies {
    implementation("com.estebanruano:tokens-android-belcorp:3.0.0")
}
```

The artifact id and version come from `brands/<brand>/brand.json` and `VERSION`.
Authenticate locally by adding to `~/.gradle/gradle.properties` (never commit it):

```properties
gpr.user=YOUR_GITHUB_USERNAME
gpr.key=YOUR_PAT_WITH_read:packages
```

The AAR ships **resource XML plus a Compose object**. Resources merge into your
app module, so you reference them like any other library resource. Names match
the generated files in `dist/belcorp/android/`: `colors.xml`, `dimens.xml`
(spacing, radius **and font sizes in `sp`**), `integers.xml`, `strings.xml`.
There is no `R.font_dimens` type — font sizes are normal `R.dimen` entries.

**XML**

```xml
<TextView
    android:textColor="@color/color_primary_500"
    android:textSize="@dimen/font_size_h1"
    android:padding="@dimen/spacing_4" />
```

**Compose** — the generated `DesignTokens` object is typed (`Color`, `Dp`, `TextUnit`),
so it needs no `LocalDensity` dance:

```kotlin
import com.estebanruano.designtokens.DesignTokens

Text(
    text = "Hola",
    color = DesignTokens.colorPrimary500,
    fontSize = DesignTokens.fontSizeH1,
)
```

Compose artifacts are `compileOnly` in the token module, so the AAR never forces
a Compose version on you — your app's own Compose dependency is used.

If you prefer resources in Compose, `colorResource(R.color.color_primary_500)`
and `dimensionResource(R.dimen.spacing_4)` work as usual. Note
`dimensionResource` returns `Dp`, so a font size needs
`with(LocalDensity.current) { dimensionResource(R.dimen.font_size_h1).toSp() }`.

**Name clashes:** if your app defines the same resource name in its own
`res/values/`, the app resource wins. A stable prefix in the token build would
avoid this long-term.

### Web

Generated into `dist/<brand>/web/`:

| File | What |
|---|---|
| `tokens.css` | CSS custom properties on `:root` |
| `tokens.js` | Named ES module exports |
| `../json/tokens.json` | Flat Style Dictionary dump for scripts |
| `../figma/tokens.json` | Copy of the SSOT, for Figma/Tokens Studio import |

```css
.my-button {
  background: var(--color-primary-500);
  padding: var(--spacing-4);
}
```

> **Not published to npm yet.** `package.json` is `private: true`, and the
> package name and subpath exports are still brand-specific rather than the
> `@scope/tokens/<brand>/css` shape that multi-brand consumption wants.
> Consume `dist/<brand>/web/` from the repo until that lands.

### iOS and Flutter

`dist/<brand>/ios/DesignTokens.swift` and
`dist/<brand>/flutter/design_tokens.dart` are generated and **compile-checked in
CI** (`swiftc -typecheck`, `flutter analyze`). They are not packaged for SPM or
pub yet — publishing creates a support obligation, and no consumer has imported
them. Copy the file, or vendor the directory, in the meantime.

## Automation

| Workflow | When | What it does |
|----------|------|--------------|
| **Sync tokens from Figma JSON** | Push to `brands/*/figma/tokens.json`, or manual | `pnpm run sync` → commit → open a PR |
| **CI** | PR to `main` / `belcorp` | sync → `pnpm test` → fail on drift → assemble every brand's AAR; type-check the generated Swift and Dart |
| **Publish Android library** | Manual | sync → validate every brand's dist → Gradle `publish` |
| **Publish web tokens (npm)** | Manual | sync → `npm publish` (blocked while `private: true`) |

Merging does **not** publish. Run a publish workflow when consumers need a new
version.

## Adding a platform

Add an entry to the `platforms` map in `pipeline/sd.config.mjs`. Note the warning
at the top of that file: token values are **px**, and every built-in Style
Dictionary size transform treats them as **rem** and multiplies by 16. Use the
`android/px`, `compose/typed`, `ios/px` and `flutter/px` groups defined there,
never the stock `android` / `compose` / `ios-swift` / `flutter` groups.
