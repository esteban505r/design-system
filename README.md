# Design System Tokens

Single source of truth for all design tokens — authored either in **`figma/tokens.json`** or **`design-system-foundations.md`**, then generated into `tokens/` and platform `dist/` outputs.

## Documentation

| Guide | Audience |
|-------|----------|
| **[Figma SSOT (`figma-ssot` branch)](docs/figma-ssot.md)** | Figma JSON as source — `pnpm run sync:figma` |
| **[Workflow & production](docs/workflow-and-production.md)** | Markdown as source — `pnpm run sync:md`, releases |
| [General next steps](docs/general-next-steps.md) | Platform leads — adopting tokens across web, mobile, Flutter |
| [Android + Material 3](docs/android-material3-next-steps.md) | Android / Compose — theme mapping |
| [design-system-foundations.md](design-system-foundations.md) | Designers — token values and naming (source of truth) |

## Quick Start

```bash
pnpm install

# From Figma JSON (figma-ssot branch / Tokens Studio export):
pnpm run sync:figma

# From foundations markdown (main-style workflow):
pnpm run sync:md
```

| Command | Source | Generates |
|---------|--------|-----------|
| **`pnpm run sync:figma`** | `figma/tokens.json` | `tokens/`, `dist/**`, `package.json` ← `$metadata.version` |
| **`pnpm run sync:md`** | `design-system-foundations.md` (`figma-tokens` JSON block) | `tokens/`, `figma/tokens.json`, `dist/**`, `package.json` ← `**Version:**` |

`pnpm run sync` is an alias for **`sync:figma`** on the current branch.

### Pipelines

**Figma → everything**

```
figma/tokens.json  →  pnpm run sync:figma  →  tokens/ + dist/
```

**Markdown → everything**

```
design-system-foundations.md  →  pnpm run sync:md  →  tokens/ + figma/tokens.json + dist/
```

### Versioning (releases)

Release numbers for **npm** (`@estebanruano/design-tokens`), **Android Maven** (`tokensVersion`), and the `version` field in `package.json` all come from the `**Version:** x.y.z` line at the top of `design-system-foundations.md`. **`pnpm run parse`** and **`pnpm run sync`** write that value into `package.json`; Gradle uses `package.json` when `-PtokensVersion` / `TOKENS_VERSION` are unset. Bump `**Version:**` for each release (npm and GitHub Packages reject duplicate versions).

**Further reading:** [Workflow & production](docs/workflow-and-production.md) · [General next steps](docs/general-next-steps.md) · [Android + Material 3](docs/android-material3-next-steps.md)

## Using tokens on the web

Web artifacts are **`dist/web/tokens.css`** (CSS custom properties on `:root`) and **`dist/web/tokens.js`** (named ES module exports). **`dist/figma/tokens.json`** is for Figma Variables / Tokens Studio import. **`dist/json/tokens.json`** is a flat Style Dictionary dump for scripts.

### Figma

After `pnpm run figma` or `pnpm run sync`, import **`dist/figma/tokens.json`** in [Tokens Studio for Figma](https://tokens.studio/) (or your Variables sync plugin). Token names match Oter CSS variables (`primary-color`, `text-primary`, `type-h1`, …). Override the collection name with `FIGMA_COLLECTION="My Set"` if needed.

### In this monorepo / locally

Point your app at the folder (or run `pnpm run sync` after token edits):

```bash
pnpm add "design-tokens@file:../design-system"
# or: npm install file:../path/to/design-system
```

Then import CSS once (global variables) and/or use JS constants:

```ts
import '@estebanruano/design-tokens/css';
import { ColorPrimary500, Spacing4 } from '@estebanruano/design-tokens';
```

```css
/* Bundlers that resolve package exports */
@import '@estebanruano/design-tokens/css';

.my-button {
  background: var(--color-brand-primary);
  padding: var(--spacing-4);
}
```

### Published npm package (recommended for apps)

The package name is **`@estebanruano/design-tokens`**. The published version is the `**Version:**` line in `design-system-foundations.md` (copied into `package.json` when you run **`pnpm run sync`** before **Publish web tokens (npm)**). Install from the public npm registry:

```bash
pnpm add @estebanruano/design-tokens
# or: npm install @estebanruano/design-tokens
```

Use the same **`import '@estebanruano/design-tokens/css'`** and **`import { … } from '@estebanruano/design-tokens'`** paths; **`@estebanruano/design-tokens/json`** resolves to the flat **`tokens.json`** if you need it in Node or build scripts.

#### npm release checklist (maintainers)

1. GitHub → **Actions** → **Publish web tokens (npm)** or **Publish Android library** → **Run workflow** on **`main`** (or **`figma-ssot`**).
2. Enter the **version** (semver, e.g. `1.0.10`) — updates **`**Version:**`** in **`design-system-foundations.md`** (not `figma/tokens.json` metadata), then syncs and publishes.
3. **First time only (npm):** bootstrap with **`npm publish --access public`**, then configure **Trusted publishing** for **`publish-web.yml`** (see **[First publish on npm (bootstrap)](#first-publish-on-npm-bootstrap)**).
4. **Locally:** `pnpm run version:set -- --version 1.0.10` then `pnpm run sync:md` and commit if you want the version bump on the branch before running Actions.

### Fetching without a package manager (CDN)

After a version is on [npm](https://www.npmjs.com/), CDNs mirror tarballs, for example:

- `https://cdn.jsdelivr.net/npm/@estebanruano/design-tokens@x.y.z/dist/web/tokens.css`
- `https://cdn.jsdelivr.net/npm/@estebanruano/design-tokens@x.y.z/dist/web/tokens.js` (ES module; use `type="module"` in a script tag only if your page setup supports it)

Pin the version in the URL for reproducible builds. For production SPAs, prefer installing the package so your bundler fingerprints assets and you stay on supported import semantics.

## Token Structure

```
tokens/
├── color/
│   ├── brand.json          # Indigo brand (primary, hover, tints)
│   ├── surface.json        # Slate surfaces + borders
│   ├── text.json           # Text ramp
│   ├── semantic.json       # Success, warning, danger, info
│   ├── eisenhower.json     # Tasks matrix accents
│   └── gradient.json       # Auth hero gradient
├── typography/
│   ├── family.json         # Geist, Geist Mono, Lexend
│   ├── weight.json
│   └── scale.json          # Semantic type scale (h1–mono)
├── spacing/
│   └── spacing.json        # xs → xxl (4px base)
├── radius/
│   └── radius.json         # sm → full
├── shadow/
│   └── shadow.json         # sm → xl
├── motion/
│   ├── duration.json
│   └── easing.json
└── z-index/
    └── z-index.json        # Stacking ladder
```

## How to Update Tokens

### For engineers (Claude Code)
```bash
claude "Update color.brand.primary to #4F46E5 in design-system-foundations.md, run pnpm run sync, commit and push"
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
       "$value": "#F97316",
       "$type": "color",
       "$description": "Optional description"
     }
   }
   ```
3. Run `pnpm run sync` to verify all platforms generate correctly
4. Commit and push — CI validates; merge to `main`, then run **Publish Android library** and/or **Publish web tokens (npm)** manually when you want a Maven or npm release (see below)

## Automation (GitHub Actions)

Full setup, branch flows, Figma in prod, release checklists, and troubleshooting: **[docs/workflow-and-production.md](docs/workflow-and-production.md)**.

| Workflow | When | What it does |
|----------|------|----------------|
| **Sync tokens from Figma JSON** | Push to `figma/tokens.json` (or manual) | `pnpm run sync:figma` → commit `tokens/`, `dist/`, `package.json` |
| **Sync tokens from markdown** | Manual only (Actions → Run workflow) | `pnpm run sync:md` → commit `tokens/`, `figma/tokens.json`, `dist/`, `package.json` |
| **CI** | PR to `main` | `sync:figma` on `figma-ssot` branch PRs, else `sync:md` → fail on drift → assemble Android |
| **Publish web tokens (npm)** | Manual | `sync:figma` or `sync:md` by branch → `npm publish` |
| **Publish Android library** | Manual | `sync:figma` or `sync:md` by branch → Gradle publish |

Merging to `main` does **not** publish npm or Maven — run publish workflows when consumers need a new version.

#### npm: Trusted publishing setup

Web publishes use **[npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/)** from GitHub Actions (no long-lived **`NPM_TOKEN`**). Requirements from npm: **Node ≥ 22.14**, **npm CLI ≥ 11.5.1** (the workflow upgrades npm before publish).

##### First publish on npm (bootstrap)

The public registry has no **`@estebanruano/design-tokens`** until the first successful **`npm publish`**. Do this **before** opening Trusted publishing in the npm UI (that screen needs an existing package). Run as an npm user (or org) that is allowed to publish under the **`@estebanruano`** scope. Use **Node ≥ 18.12** for `pnpm`:

```bash
cd /path/to/design-system
nvm use 22                    # or another Node ≥ 18.12 (pnpm); ≥ 22.14 to match CI
pnpm install --frozen-lockfile
pnpm run sync
npm login                     # browser login, or use a granular publish token (see npm docs)
npm publish --access public   # creates the package; version = package.json (from **Version:** in the MD)
```

Check with **`npm view @estebanruano/design-tokens version`**. If publish fails with **403**, your npm user does not own the **`estebanruano`** scope — create an npm org or change **`package.json` → `name`** to a scope you control. If you see **404 Scope not found**, the **`@estebanruano`** scope does not exist on npm yet: create an organization named **`estebanruano`** at [npmjs.com/org/create](https://www.npmjs.com/org/create) (and add your user), **or** rename the package to a scope you already have (for example **`@<your-npm-username>/design-tokens`**) and update imports in apps + Trusted publishing after the first publish.

##### Connect GitHub Actions (Trusted publishing)

After the package exists on npm:

1. On **[npmjs.com](https://www.npmjs.com/)** → package **`@estebanruano/design-tokens`** → **Settings** → **Trusted publishing** → choose **GitHub Actions**.
2. Set the publisher so values match **exactly** (npm does not validate until publish):
   - **Repository:** `esteban505r/design-system` (or your fork’s `owner/name` — then set **`package.json` → `repository.url`** to that repo’s HTTPS URL, [required by npm](https://docs.npmjs.com/trusted-publishers/)).
   - **Workflow filename:** `publish-web.yml` (filename only, including `.yml`).
3. Run **Actions → Publish web tokens (npm)** on **`main`** to confirm OIDC works; then you can [revoke](https://docs.npmjs.com/revoking-access-tokens) any bootstrap publish token you no longer need.
4. Optional hardening: under package **Publishing access**, npm recommends restricting token-based publishes ([docs](https://docs.npmjs.com/trusted-publishers/)).

If **Publish web tokens (npm)** fails with **ENEEDAUTH** or trusted-publisher errors, re-check the workflow filename, repository name, and **`repository.url`** in **`package.json`** (`https://github.com/esteban505r/design-system.git` for this upstream repo).

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
    implementation("com.estebanruano:tokens-android:1.0.2")
}
```

Use the same **`mavenGroupId`**, **`mavenArtifactId`**, and release version (`**Version:**` / `package.json`) as in this design-system repo’s **`gradle.properties`** / **`design-system-foundations.md`** (e.g. `com.estebanruano:tokens-android`).

**Authenticate for GitHub Packages** (local machine): add to `~/.gradle/gradle.properties` (do not commit):

```properties
gpr.user=YOUR_GITHUB_USERNAME
gpr.key=YOUR_PAT_WITH_read:packages
```

In **CI** for the consuming app, inject the same values (e.g. repository secrets mapped to env vars or `ORG_GRADLE_PROJECT_gpr.*` so Gradle picks them up).

**Material 3 and multi-project structure:** see [docs/android-material3-next-steps.md](docs/android-material3-next-steps.md) for mapping tokens to M3 (Compose + Views), shared theme libraries vs apps, and flavors / multiple products.

### Using tokens in Android app code

The **`tokens-android`** artifact is a normal **`com.android.library`**: it ships **resource XML** only. After `implementation(...)`, those resources are **merged** into your app module, so you reference them like any other library resource.

**Local repo vs published AAR:** this repo keeps **four** files under `dist/android/` (`colors.xml`, `dimens.xml`, `integers.xml`, `strings.xml`). Android Studio often shows them as **one combined `<resources>` block** when you inspect the library dependency — that is normal. If colors or `font_size_*` differ from your local `dist/android/`, the app is almost certainly on an **older Maven version**; bump the dependency and re-run **Publish Android library** with a new version after `pnpm run sync`.

**Resource names** match the generated files in **`dist/android/`**: `colors.xml`, `dimens.xml` (spacing, radius, **and font sizes in `sp`**), `integers.xml`, `strings.xml`. There is no `R.font_dimens` type — font sizes are normal **`R.dimen`** entries (e.g. `R.dimen.font_size_h1`, `@dimen/font_size_h1` in XML).

**Font sizes in Compose:** `dimensionResource()` returns `Dp`, but `Text.fontSize` needs `TextUnit` (`sp`). Use:

```kotlin
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.res.dimensionResource

Text(
    fontSize = with(LocalDensity.current) {
        dimensionResource(R.dimen.font_size_h1).toSp()
    },
)
```

**XML layouts**

```xml
<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:textColor="@color/color_brand_primary"
    android:textSize="@dimen/font_size_body"
    android:padding="@dimen/spacing_md" />
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

## Semver guidelines (token changes)

When you bump `**Version:**` in the foundations doc for a release, align the bump with the kind of token change (same ideas as [semver](https://semver.org/)):

- **Major** (2.0.0): Breaking change — token renamed or removed
- **Minor** (1.1.0): New tokens added
- **Patch** (1.0.1): Token value changed
