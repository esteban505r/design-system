# Design System Tokens

Single source of truth for all design tokens. One `npm run build` generates platform-specific outputs for Web, Android, iOS, Flutter, and Compose Multiplatform.

## Quick Start

```bash
npm install

# Full pipeline: markdown → token JSONs → all platform outputs
npm run sync

# Or run each step separately:
npm run parse    # markdown → token JSONs only
npm run build    # token JSONs → platform outputs only
```

Outputs land in `build/`:

```
build/
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

**Stage 1 — `npm run parse`** runs `md-to-tokens.mjs`, which reads `design-system-foundations.md`, extracts every JSON code block, converts to DTCG format (`$value` / `$type`), and writes each token category to its own file under `tokens/`.

**Stage 2 — `npm run build`** runs Style Dictionary, which reads all `tokens/**/*.json` files and generates platform-specific outputs in `build/`.

**`npm run sync`** runs both stages in sequence — this is the single command the design team needs.

### Workflow

```
design-system-foundations.md    ← Designers edit this (the human-readable source)
         │
         ▼  npm run parse
    tokens/**/*.json            ← DTCG-format JSON (auto-generated)
         │
         ▼  npm run build
    build/                      ← Platform outputs (auto-generated)
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
3. Run `npm run build` to verify all platforms generate correctly
4. Commit and push — CI will rebuild and publish

## Adding a New Platform

Edit `sd.config.mjs` and add a new platform entry. See [Style Dictionary docs](https://styledictionary.com) for available formats and transform groups.

## Versioning

- **Major** (2.0.0): Breaking change — token renamed or removed
- **Minor** (1.1.0): New tokens added
- **Patch** (1.0.1): Token value changed
