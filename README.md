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
2. **Publishing**: GitHub Packages uses `GITHUB_TOKEN` from Actions (`packages: write` is set in the publish workflow). Bump **`version` in `package.json`** when you need a new Maven coordinate — republishing the same version is rejected.

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
    implementation("com.estebanruano:tokens-android:1.0.0")
}
```

Use the same **`mavenGroupId`**, **`mavenArtifactId`**, and **`package.json` `version`** as in this design-system repo’s **`gradle.properties`** / **`package.json`** (e.g. `com.estebanruano:tokens-android`).

Local Gradle copies `dist/android/*.xml` into `design-tokens-android` on each `preBuild` — run **`pnpm run sync`** before `./gradlew` if `dist/android` is missing.

## Adding a New Platform

Edit `sd.config.mjs` and add a new platform entry. See [Style Dictionary docs](https://styledictionary.com) for available formats and transform groups.

## Versioning

- **Major** (2.0.0): Breaking change — token renamed or removed
- **Minor** (1.1.0): New tokens added
- **Patch** (1.0.1): Token value changed
