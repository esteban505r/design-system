# General next steps (all platforms)

This document is the **cross-platform roadmap** for adopting tokens in product codebases. For **pipeline setup, GitHub Actions, Figma, and production releases**, start with **[workflow-and-production.md](workflow-and-production.md)**.

---

## 1. Operating model

| Artifact | Role |
|----------|------|
| **`brands/<brand>/figma/tokens.json`** | The **source of truth** for that brand's token values, exported from Figma |
| **`core/tokens/**` + `brands/<brand>/tokens/<mode>/**`** | Machine-readable DTCG JSON (`pnpm run parse`) |
| **`brands/<brand>/DESIGN.md`** | Generated human-readable catalogue — every token, per-platform identifiers |
| **`VERSION`** | The release version, shared by every brand |
| **`dist/<brand>/**`** | Web, Android, Compose, iOS, Flutter and Figma outputs (`pnpm run build`) |

**Rule:** design changes the Figma export; engineers run **`pnpm run sync`**, review the
diff in the token tree and `dist/`, and merge. Nothing generated is ever hand-edited — CI
regenerates everything and fails the PR on any difference.

---

## 2. Day-to-day workflow

1. Export the changed variables from Figma to **`brands/<brand>/figma/tokens.json`**.
2. Run **`pnpm run sync && pnpm test`** locally (Node ≥ 18.12; use **`pnpm`**, not `npm install`).
3. Commit the Figma export, the token tree, **`dist/`** and **`package.json`** (CI enforces no drift on PRs).
4. Merge to **`main`**.
5. **Publish** when consumers need a new version:
   - **Web:** GitHub Actions → **Publish web tokens (npm)** (Trusted Publishing; see [workflow-and-production.md](workflow-and-production.md)).
   - **Android Maven:** **Publish Android library** (GitHub Packages).

See **[workflow-and-production.md](workflow-and-production.md)** for GitHub Actions, publish workflows, and release checklists.

---

## 3. Versioning and releases

- The root **`VERSION`** file drives **`package.json`** and the default **Android** Maven
  version. Write it with `pnpm run version:set -- --version x.y.z`. One version covers
  every brand.
- **npm** and **GitHub Packages** reject duplicate versions — bump `VERSION` for each release.
- Align semver bumps with the kind of change (see **Versioning** in the README): renames/removals → major; new tokens → minor; value-only tweaks → patch.

---

## 4. By platform (what to do next)

### 4.1 Web

**Artifacts:** `dist/belcorp/web/tokens.css`, `dist/belcorp/web/tokens.js`, `dist/belcorp/json/tokens.json`.

**Distribution:** not yet published — `package.json` is `private: true` and its export paths are still single-brand. Consume `dist/<brand>/web/` from the repo meanwhile; see the README.

**Integration:**

- Import **CSS** once for **`:root`** variables (`var(--color-primary-500)`, `var(--spacing-4)`, …).
- Use **JS** exports when you need typed constants in TypeScript or build scripts.
- **Design system vs product UI:** this repo ships **tokens only**, not React/Vue components. Your product (or a separate internal package) owns component primitives; tokens feed **CSS variables**, **Tailwind theme extension**, or **CSS-in-JS** theme objects built from the same values.

**Next steps:** wire tokens into your global stylesheet or design-provider; pin versions in `package.json` once the package publishes.

---

### 4.2 Android

**Artifacts:** `dist/<brand>/android/*.xml` plus `dist/<brand>/compose/DesignTokens.kt`, packaged as **`com.estebanruano:tokens-android-<brand>`** on GitHub Packages.

**Integration:** add Maven dependency; reference **`@color/color_*`** and **`@dimen/bds_*`** (also `@integer/bds_*`, `@string/bds_*`) from merged resources. Colours are unprefixed; every non-colour resource carries the `bds_` prefix so it cannot be shadowed by an app-module resource of the same name — see the README for the rule and why colours are exempt.

**Material 3:** map token resources to **`Theme.Material3.*`** / Compose **`ColorScheme`** — see [android-material3-next-steps.md](android-material3-next-steps.md).

**Next steps:** add dependency → theme mapping → pilot screen → consider a shared internal “shell” library for all apps (described in the Android doc).

---

### 4.3 iOS

**Artifact:** `dist/belcorp/ios/DesignTokens.swift` (generated **`DesignTokens`** API — confirm exact types in the file after each sync).

**Integration (typical):**

- Copy the generated file into your Xcode project or add a build phase that copies from a **git submodule** / **Swift Package** that wraps published artifacts (this repo does not yet ship a first-party SPM binary; teams often vendor the file or generate in CI).
- Replace hardcoded **`UIColor`** / asset catalog duplicates with **`DesignTokens`** (or your thin wrapper) so spacing and colors stay aligned.

**Next steps:** decide **vendored Swift** vs **generated in consumer CI** from `tokens.json`; document where iOS lives relative to Android/web so token renames propagate.

---

### 4.4 Flutter

**Artifact:** `dist/belcorp/flutter/design_tokens.dart` (`DesignTokens` class).

**Integration:** add the file to your app or package `lib/`, import, use **`Color(...)`** / dimension constants as generated.

**Next steps:** map token colors to **`ThemeData`** (`colorScheme`, `textTheme`) once in `MaterialApp` theme; keep widget code reading **`Theme.of(context)`** instead of raw `DesignTokens` everywhere for easier dark mode and testing.

---

### 4.5 Compose Multiplatform / shared Kotlin

**Artifact:** `dist/belcorp/compose/DesignTokens.kt` (package **`com.estebanruano.designtokens`** in current config — verify in file header after sync).

**Integration:** add source to shared KMP module or publish an internal artifact that wraps this file.

**Next steps:** align with **Android** Compose **`MaterialTheme`** the same way as native Android (see Android doc); on non-Android targets, use tokens for raw **`Color`** / **`Dp`** until you define a second UI kit.

---

### 4.6 Figma

**Artifact:** `dist/belcorp/figma/tokens.json` (Tokens Studio / Figma Variables import).

**Use cases:** design library variables, design–dev parity with CSS names (`primary-color`, `type-h1`, …).

**Next steps:** import after each token release; see [figma-ssot.md](figma-ssot.md).

### 4.7 JSON and tooling

**Artifact:** `dist/belcorp/json/tokens.json` (flat Style Dictionary dump).

**Use cases:** CI checks, documentation generators, one-off scripts — not the Figma format (use `dist/belcorp/figma/tokens.json` for that).

**Next steps:** avoid treating JSON as the **authoring** source; generate it from this repo in CI when other tools need it.

---

## 5. Structuring work across many projects

Use a **clear split of responsibilities** so every app does not re-implement the same mapping.

| Layer | What it is | Who maintains it |
|-------|------------|-------------------|
| **Tokens** | This repo — values, scales, naming | Design systems / platform leads |
| **Semantic mapping** | “Token X means primary CTA background on web / `colorPrimary` on Android / `ColorScheme.primary` in Compose” | Often a **small shared doc** + one **internal library per stack** (web theme package, Android theme AAR, Flutter theme package) |
| **Components** | Buttons, inputs, navigation chrome | Product org or shared UI kit team |
| **Applications** | Screens, flows, experiments | Product squads |

**Multi-brand / multi-app:** brands live side by side in this repo as directories under `brands/`, sharing one pipeline and one version — not as forked repos or branches. Geometry the brands agree on lives in `core/`; a brand that disagrees with `core/` fails the build rather than silently overriding it. See [brands.md](brands.md).

---

## 6. Governance checklist

- [ ] **Owners:** named people for Figma exports vs merge vs publish workflows.
- [ ] **Slack / doc link:** where consumers read release notes when `VERSION` bumps.
- [ ] **Breaking changes:** communicate renames (`color_*` / CSS variable names) before merging; use **major** semver when renames/removals ship.
- [ ] **Consumer inventory:** list which apps use npm vs Maven vs vendored Swift so no platform is left behind on a token change.

---

## 7. Optional future improvements (this repo)

- Ship **iOS** via **Swift Package Manager** and **Flutter** via a pub package. Both files
  are generated and compile-checked in CI already; only the packaging is missing, and it is
  deliberately deferred until a real consumer exists.
- Bind tokens to target design systems declaratively (Material 3, Tailwind, SwiftUI,
  Flutter `ThemeData`) so no consuming app hand-writes theme glue.
- Unblock the npm publish: drop `private: true` and move to per-brand subpath exports.

For Android-only Material 3 detail, continue with [android-material3-next-steps.md](android-material3-next-steps.md).
