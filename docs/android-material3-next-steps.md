# Android next steps: design tokens + Material 3

This document describes how to **use the published token artifact** (`tokens-android` / `dist/android`) together with **Material 3 (M3)** in real apps, how to **map tokens to M3 roles**, and how to **structure codebases** when the same token set is shared across several projects.

The token package is **primitive** (colors, dimens, font dimens as Android resources). **Material 3** is a **component and semantics layer** (roles like `primary`, `surface`, `onSurface`, shapes, motion). Your work is to define a **clear boundary** between “what comes from the design system repo” and “what each app composes with M3.”

For **all platforms** (web, iOS, Flutter, governance), see [general-next-steps.md](general-next-steps.md).

---

## 1. How this repo fits with Material 3

| Layer | Owned by | Contents |
|--------|-----------|----------|
| **Tokens** | This `design-system` repo | `color_*`, `dimen/*`, etc. from `design-system-foundations.md` → Style Dictionary → AAR |
| **Brand / theme mapping** | Each product line (or a shared internal library) | Maps token resources → `Theme.Material3.*` XML and/or Compose `ColorScheme` / `Typography` / `Shapes` |
| **M3 components** | AndroidX Material3 | `MaterialButton`, `TextField`, `NavigationBar`, Compose `Button`, `Card`, … |
| **App-specific UI** | Individual apps | Screens, navigation, one-off layouts; uses theme + tokens for anything not covered by M3 defaults |

Material 3 does **not** read your XML color names automatically. You **bridge** tokens into M3 by setting theme attributes (Views) or building a `ColorScheme` (Compose) from `@color/color_*` values.

Official references:

- [Material 3 in Compose](https://developer.android.com/develop/ui/compose/designsystems/material3)
- [ColorScheme](https://developer.android.com/reference/kotlin/androidx/compose/material3/ColorScheme)
- [Custom design systems in Compose](https://developer.android.com/develop/ui/compose/designsystems/custom) (extension theme, `CompositionLocal`, or fully custom)
- [Material 3 for View-based XML](https://developer.android.com/develop/ui/views/theming/material-theme) (theme attributes, `Theme.Material3.*`)

---

## 2. Mapping design tokens → Material 3 color roles

Your tokens use names like `color_primary_500`, `color_semantic_error`, `color_neutral_0`. M3 uses **semantic roles** (e.g. `colorPrimary`, `colorOnPrimary`, `colorError`, `colorSurface`, `colorOnSurface`).

### 2.1 Recommended approach

1. **Pick a mapping table** (design + eng agreement) from token → M3 role for **light** and **dark** (if you support dark theme, you need two tables or generated schemes).
2. **Implement once** in a small **theme module** or `res/values/themes.xml` (+ `values-night` if needed), referencing **only** `@color/color_*` from the token AAR — no hex in the app.
3. **Optional:** generate `ColorScheme` / XML theme from the same mapping using a tiny script or Gradle task in CI, so drift is caught in review.

Example **conceptual** mapping (adjust to your real token names after `pnpm run sync`):

| M3 role (theme attr / ColorScheme field) | Typical token source |
|------------------------------------------|----------------------|
| Primary / onPrimary | `primary-*` (e.g. 500 / 0 or neutral on primary) |
| Secondary / onSecondary | `secondary-*` |
| Error / onError | `semantic_error` + `neutral_0` or dedicated on-error |
| Surface / onSurface | `neutral_0`–`neutral_100` / `neutral_900` |
| Outline | `neutral_400` or `primary-700` |
| Tertiary (if used) | spare ramp or same as secondary with different weights |

Use [Material Theme Builder](https://material.io/blog/announcing-material-theme-builder) only as **inspiration** for role coverage; your **source of truth** remains `design-system-foundations.md`.

### 2.2 Dynamic color (Material You)

If a product uses **dynamic color** on Android 12+, M3 can derive schemes from wallpaper. That **overlaps** with a fixed token palette. Decide per product:

- **Brand-locked apps:** disable dynamic color for primary brand surfaces; still use tokens for spacing, type scale, and non-dynamic regions.
- **System-harmonized apps:** allow dynamic `ColorScheme` but keep **token-backed** dimens, radii, and semantic colors for accessibility-critical areas (e.g. error from tokens).

Document the decision in the app’s README so teams do not mix strategies accidentally.

---

## 3. Views (XML) vs Compose

### 3.1 View / XML

- Apply **`Theme.Material3.DayNight`** (or DayNight.NoActionBar) as parent in `themes.xml`.
- Override **`colorPrimary`**, **`colorOnPrimary`**, **`colorError`**, **`android:colorBackground`**, etc., with **`@color/color_primary_500`** (etc.) from the token library.
- Prefer **M3 widgets** (`MaterialButton`, `TextInputLayout` with M3 style) so elevation and states stay aligned with Google’s behavior.

### 3.2 Jetpack Compose

- Build **`lightColorScheme(...)`** / **`darkColorScheme(...)`** (or `dynamicLightColorScheme` if you opt in) using `Color(ContextCompat.getColor(context, R.color.color_primary_500))` for each role, or read dimens for non-color tokens.
- Wrap the root in **`MaterialTheme(colorScheme = …, typography = …, shapes = …)`**.
- For **extra** tokens not on `ColorScheme`, use the [custom design system](https://developer.android.com/develop/ui/compose/designsystems/custom) pattern (`CompositionLocal` + data class) so feature code does not reach into `R.color` randomly.

---

## 4. Structuring components across projects

Think in **three rings** so multiple apps can share work without forking the token repo.

### Ring A — Token distribution (already here)

- **Artifact:** `com.estebanruano:tokens-android` (Maven coordinates from this repo).
- **Rule:** only **semantic names** from tokens (`spacing_4`, `color_primary_500`); **no** app hex.

### Ring B — Shared “shell” (recommended internal artifact)

Create **one** internal Android library (mono-repo module or separate versioned repo), e.g. `our-design-system-android`:

| Responsibility | Examples |
|----------------|----------|
| M3 theme wiring | `themes.xml`, `Theme.OurApp` extending Material3, light/night |
| Compose theme | `OurTheme { MaterialTheme(...) }`, optional `CompositionLocal` for extended tokens |
| Typography | Map token font dimens to `TextStyle` / M3 `Typography` |
| Shapes | Map token radius to `Shapes` |
| Reusable primitives | Thin wrappers: `OurPrimaryButton`, `OurScreenScaffold` that only use theme + tokens |

**Apps depend on:** `tokens-android` **transitively** through `our-design-system-android`, or explicitly on both — pick one policy and stick to it (transitive is simpler for app Gradle files).

### Ring C — Product apps

| Responsibility | Examples |
|----------------|----------|
| Features | Screens, ViewModels, navigation |
| Product-specific composition | When to use `Card` vs custom list row |
| Flavors / white-label | Different `Application` or `res/values-brand-b/` that still use **same** token keys but **different** theme XML pointing at different token steps (if you add brand-specific ramps later) |

**Rule:** feature modules **do not** define new colors; they use theme or `OurTheme` extension colors only.

---

## 5. Multiple projects (multi-app, white-label, B2B/B2C)

### 5.1 Single codebase, multiple brands

- **Product flavors** (`brandA`, `brandB`) with `src/brandA/res/values/themes.xml` overriding the same M3 attributes but pointing at **different token keys** only if you publish **brand-specific token builds**; otherwise use **one** token AAR and map flavors to different **subset** of the same ramp (e.g. flavor picks `primary_600` vs `primary_500` as `colorPrimary`).
- Keep **one** mapping document per flavor in Ring B’s repo to avoid tribal knowledge.

### 5.2 Same org, different apps (different Gradle roots)

- Pin the **same** `tokens-android` **version** across apps in a BOM or Renovate/Dependabot policy.
- **Ring B** library can still be shared as a second Maven artifact so M3 mapping stays consistent.

### 5.3 Forked / legacy apps

- Onboard by: add dependency → replace hardcoded colors in `themes.xml` / Compose theme first → then chip away at layouts.
- Do **not** fork the token repo per app; bump **version** in foundations when tokens change globally.

---

## 6. Practical next steps (checklist)

1. **Lock dependency:** add `implementation("com.estebanruano:tokens-android:…")` and verify `R.color.*` names in merged `res/values/colors.xml` from the AAR.
2. **Write mapping doc** (could live next to this file): table token → M3 role for light/dark.
3. **Implement theme** in Ring B (XML and/or Compose) using only `@color/color_*` / dimen resources.
4. **Audit one screen** end-to-end with M3 components and the new theme.
5. **Define** dynamic-color policy per product.
6. **Plan** Ring B library extraction before you copy-paste theme into a second app.

---

## 7. Where to evolve this documentation

- Add **concrete** `themes.xml` and `Theme.kt` snippets once Ring B exists in a repo (link from here).
- If you add **dark** tokens to `design-system-foundations.md`, regenerate and extend the mapping tables for `values-night`.

This file is **guidance**, not a second source of truth for numeric token values — those always come from **`design-system-foundations.md`** and the generated Android XML.
