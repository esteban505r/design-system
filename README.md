# Design System Tokens

Single source of truth for all design tokens. One `pnpm run build` generates platform-specific outputs for Web, Android, iOS, Flutter, and Compose Multiplatform.

## Quick Start

```bash
pnpm install

# Full pipeline: markdown → token JSONs → all platform outputs
pnpm run sync

# Or run each step separately:
pnpm run parse    # markdown → token JSONs only
pnpm run build    # token JSONs → platform outputs only
```

Outputs land in `dist/` (Gradle uses `./build/`, so token outputs use `dist/` to avoid clashes):

```
dist/
├── web/
│   ├── tokens.css          # CSS custom properties
│   └── tokens.js           # ES6 JavaScript constants
├── android/
│   ├── colors.xml          # Android color resources
│   ├── dimens.xml          # Android dimension resources
│   └── font_dimens.xml     # Android font dimensions
├── ios/
│   └── DesignTokens.swift  # Swift constants (UIColor)
├── flutter/
│   └── design_tokens.dart  # Dart constants (Color)
├── compose/
│   └── DesignTokens.kt     # Kotlin object (Compose Color/Dp)
└── json/
    └── tokens.json         # Flat JSON (debugging / other tools)
```

## How It Works

The pipeline has two stages:

**Stage 1 — `pnpm run parse`** runs `md-to-tokens.mjs`, which reads `design-system-foundations.md`, extracts every JSON code block, converts to DTCG format (`$value` / `$type`), and writes each token category to its own file under `tokens/`.

**Stage 2 — `pnpm run build`** runs Style Dictionary, which reads all `tokens/**/*.json` files and generates platform-specific outputs in `dist/`.

**`pnpm run sync`** runs both stages in sequence — this is the single command the design team needs.

### Workflow

```
design-system-foundations.md    ← Designers edit this (the human-readable source)
         │
         ▼  pnpm run parse
    tokens/**/*.json            ← DTCG-format JSON (auto-generated)
         │
         ▼  pnpm run build
    dist/                       ← Platform outputs (auto-generated; commit with PR)
    ├── web/tokens.css
    ├── web/tokens.js
    ├── android/colors.xml
    ├── android/dimens.xml
    ├── ios/DesignTokens.swift
    ├── flutter/design_tokens.dart
    ├── compose/DesignTokens.kt
    └── json/tokens.json
```

## Token Structure

```
tokens/
├── color/
│   ├── primary.json        # Brand primary scale (00–800)
│   ├── secondary.json      # Brand secondary scale (00–800)
│   ├── neutral.json        # Gray scale (0–1000)
│   └── semantic.json       # Success, warning, error, info
├── typography/
│   └── scale.json          # Font families, weights, sizes, line heights
├── spacing/
│   └── spacing.json        # 4px base unit scale (0–40)
├── radius/
│   └── radius.json         # Border radii (none–full)
├── shadow/
│   └── shadow.json         # Elevation levels (sm–xl)
├── motion/
│   └── motion.json         # Duration + easing curves
└── opacity/
    └── opacity.json        # Disabled, hover, pressed, focus, scrim
```

## How to Update Tokens

### For engineers (Claude Code)
```bash
claude "Update primary-500 to #8855CC in tokens/color/primary.json, rebuild, commit and push"
```

### For designers (GitHub Web UI)
1. Generate updated JSON in Claude chat/Claude Design
2. Go to the file on GitHub → Edit → paste new content
3. Create branch + open PR → CI validates → reviewer merges

### For non-technical team (Cloud automation)
1. Save updated JSON file to shared OneDrive/Google Drive folder
2. n8n automation validates and opens a PR automatically

## Adding a New Token

1. Add the token to the appropriate JSON file under `tokens/`
2. Follow the DTCG-compatible format:
   ```json
   {
     "token-name": {
       "$value": "#FF0000",
       "$type": "color",
       "$description": "Optional description"
     }
   }
   ```
3. Run `pnpm run sync` to verify all platforms generate correctly
4. Commit and push — CI validates; merge to `main` publishes the Android library (see below)

## Automation (GitHub Actions)

This repo can run the full “edit markdown → tokens → PR → Maven” loop on GitHub:

| Workflow | When | What it does |
|----------|------|----------------|
| **Sync tokens from markdown** | Push that changes `design-system-foundations.md` | Runs `pnpm run sync`, commits `tokens/` + `dist/` to the same branch, opens a PR into `main` if none exists (skipped on `main` if you only get the commit). |
| **CI** | Pull requests to `main` | `pnpm run sync` then fails if anything drifts from the commit; builds `:design-tokens-android` with Gradle. |
| **Publish Android library** | Push to `main` (paths touching tokens, `dist/`, Android module, or Gradle) or manual **Run workflow** | `pnpm run sync`, then `./gradlew :design-tokens-android:publish` to **GitHub Packages**. Maven **groupId**, **artifactId**, and Android **namespace** are set in **`gradle.properties`** (`mavenGroupId`, `mavenArtifactId`, `tokensAndroidNamespace`). Version comes from **`package.json`**. |

**Repo settings you need**

1. **Actions → General → Workflow permissions**: allow **Read and write** so the sync job can push commits and open PRs.
2. **Publishing**: GitHub Packages uses `GITHUB_TOKEN` from Actions (`packages: write` is set in the publish workflow). Bump **`version` in `package.json`** for every new Maven release — **the same version cannot be published twice** (Gradle will fail with **HTTP 409 Conflict** if you try).

**Android apps** add the GitHub Packages Maven URL and dependency (replace `OWNER/REPO`):

```kotlin
repositories {
    maven {
        url = uri("https://maven.pkg.github.com/OWNER/REPO")
        credentials {
            username = project.findProperty("gpr.user") as String? ?: System.getenv("GITHUB_ACTOR")
            password = project.findProperty("gpr.key") as String? ?: System.getenv("GITHUB_TOKEN")
        }
    }
}

dependencies {
    implementation("com.estebanruano:tokens-android:1.0.1")
}
```

Use the same **`mavenGroupId`**, **`mavenArtifactId`**, and **`package.json` `version`** as in this design-system repo’s **`gradle.properties`** / **`package.json`** (e.g. `com.estebanruano:tokens-android`).

**Authenticate for GitHub Packages** (local machine): add to `~/.gradle/gradle.properties` (do not commit):

```properties
gpr.user=YOUR_GITHUB_USERNAME
gpr.key=YOUR_PAT_WITH_read:packages
```

In **CI** for the consuming app, inject the same values (e.g. repository secrets mapped to env vars or `ORG_GRADLE_PROJECT_gpr.*` so Gradle picks them up).

### Using tokens in Android app code

The **`tokens-android`** artifact is a normal **`com.android.library`**: it ships **resource XML** only (colors, dimens, font dimens, etc.). After `implementation(...)`, those resources are **merged** into your app module, so you reference them like any other library resource.

**Resource names** match the generated files in this repo under **`dist/android/`** (e.g. `colors.xml`, `dimens.xml`). Typical names look like `color_primary_500`, `color_neutral_500`, `spacing_4`, `radius_md` — always confirm the exact `name="…"` in those files when you add or rename tokens.

**XML layouts**

```xml
<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:textColor="@color/color_primary_500"
    android:padding="@dimen/spacing_4" />
```

**`styles.xml` / Material theme**

```xml
<style name="Theme.MyApp" parent="Theme.Material3.DayNight.NoActionBar">
    <item name="colorPrimary">@color/color_primary_500</item>
    <item name="colorOnPrimary">@color/color_neutral_0</item>
</style>
```

**Kotlin (Views, no Compose)** — use your **application module** `R` (it includes merged library resources):

```kotlin
import androidx.core.content.ContextCompat
import com.yourapp.R

val color = ContextCompat.getColor(context, R.color.color_primary_500)
view.setBackgroundColor(color)

val paddingPx = resources.getDimensionPixelSize(R.dimen.spacing_4)
```

**Jetpack Compose**

```kotlin
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.dimensionResource
import com.yourapp.R

@Composable
fun BrandSurface() {
    Surface(color = colorResource(R.color.color_primary_500)) {
        // …
    }
}
```

`dimensionResource(R.dimen.…)` follows normal Android `dimen` semantics; check the AndroidX Compose docs for your BOM to see how values map to **`Dp`** in composables.

**`R` class / non-transitive R**

With **`android.nonTransitiveRClass=true`**, you still normally use **`com.yourapp.R`** in the **app** module for merged resources from dependencies. The library’s own namespace (`tokensAndroidNamespace` in `gradle.properties`) is mainly for the AAR’s internal `R` / manifest, not something you must import in app code unless you choose to.

**Name clashes**

If your app defines the same resource name (e.g. `color_primary_500`) in `res/values/`, the **app resource overrides** the library. To avoid collisions long-term, add a stable prefix in the token build (e.g. `ds_color_primary_500`) in Style Dictionary / naming convention.

Local Gradle in **this** repo copies `dist/android/*.xml` into `design-tokens-android` on each `preBuild` — run **`pnpm run sync`** before `./gradlew` if `dist/android` is missing.

## Adding a New Platform

Edit `sd.config.mjs` and add a new platform entry. See [Style Dictionary docs](https://styledictionary.com) for available formats and transform groups.

## Versioning

- **Major** (2.0.0): Breaking change — token renamed or removed
- **Minor** (1.1.0): New tokens added
- **Patch** (1.0.1): Token value changed
