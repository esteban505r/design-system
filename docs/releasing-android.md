# Releasing the Android token library

How to cut and ship a new version of `com.estebanruano:tokens-android-belcorp` — the AAR that the
Somos Belcorp Android app consumes. Read this before changing a colour that ships to production.

**Related docs**

| Document | Purpose |
|----------|---------|
| [figma-ssot.md](figma-ssot.md) | The `brands/belcorp/figma/tokens.json` source-of-truth pipeline |
| [workflow-and-production.md](workflow-and-production.md) | Repo setup, GitHub Actions and the release path |
| [brands.md](brands.md) | The multi-brand model — why the module is `:tokens-android-belcorp` |
| [android-material3-next-steps.md](android-material3-next-steps.md) | Material 3 mapping for Compose |

---

## 1. What actually reaches the app

This is the single most common source of confusion, so it comes first.

```
brands/belcorp/figma/tokens.json         ← SOURCE OF TRUTH (edit this)
        │  pnpm run sync
        ▼
core/tokens/**                           ← shared geometry, DTCG (committed)
brands/belcorp/tokens/light/**           ← this brand's values, DTCG (committed)
        │  pipeline/sd.config.mjs (Style Dictionary)
        ▼
dist/belcorp/android/*.xml
dist/belcorp/compose/DesignTokens.kt     ← generated, committed
brands/belcorp/DESIGN.md                 ← generated token reference
        │  Gradle Copy task (syncAndroidTokensFromDist / syncComposeTokensFromDist)
        │  ⚠️  runs on `preBuild` of :tokens-android-belcorp — NOT during `pnpm run sync`
        ▼
platforms/android/belcorp/src/main/…     ← module sources baked into the AAR
        │  :tokens-android-belcorp:publish
        ▼
GitHub Packages  →  app's libs.versions.toml  →  app build  →  device
```

The Gradle module is **`:tokens-android-belcorp`** — one module per brand, named from
`artifactId` in `brands/belcorp/brand.json`. `settings.gradle.kts` discovers it from the
directory; there is no `:design-tokens-android`. The shared build logic lives in
`buildSrc/src/main/kotlin/design-tokens-brand-module.gradle.kts`, so every brand module's own
`build.gradle.kts` is a single `plugins { }` block.

**`pnpm run sync` regenerates `dist/` only.** It does *not* update the Android module's own
sources. Those are populated by a Gradle `Copy` task wired to `preBuild`, which only fires when you
run a Gradle build of the module (`publish`, `publishToMavenLocal`, `assemble`).

> **If a colour change "isn't showing up in the app", this is almost always why:** `dist/` was
> regenerated but no Gradle build ran, so the AAR still contains the previous values. Check
> `platforms/android/belcorp/src/main/res/values/colors.xml`, not `dist/belcorp/android/colors.xml`.

---

## 2. Release checklist

### 2.1 Edit the tokens

Edit `brands/belcorp/figma/tokens.json` — never the token tree (`core/tokens/` + `brands/*/tokens/`), `dist/`, or the module sources. All four are generated
and will be overwritten on the next sync.

```bash
cd ~/Projects/design-system
$EDITOR brands/belcorp/figma/tokens.json
```

Every colour token must carry a `$value` and `$type`:

```json
"purple-900": {
  "$value": "#2d0865",
  "$type": "color",
  "$extensions": {
    "com.figma.scopes": ["ALL_SCOPES"],
    "com.figma.hiddenFromPublishing": false
  }
}
```

**Adding a *new* token requires two extra edits:**

1. `pipeline/token-name-map.mjs` — map the flat Figma name to its token path.
   ```js
   'purple-900': ['color', 'purple', '900'],
   ```
   **An unmapped name now fails the sync**, listing every offending token. It used to be
   skipped with only a console warning, which meant a variable a designer added in Figma
   could vanish from every platform unnoticed. `--allow-unmapped` restores the old
   skip-with-warning behaviour, for deliberate migrations only.

2. `pipeline/token-writer.mjs` — if the new path introduces a category that has no `subCategories` entry
   yet, add one so it lands in a real file instead of `color/other.json`.
   ```js
   purple: 'color/purple.json',
   ```

### 2.2 Bump the version

`VERSION` at the repo root is the release-version source of truth. `package.json` and
`design-system-foundations.md` are mirrors kept in sync by the script — do not hand-edit them.

```bash
pnpm run version:set -- --version 3.1.0
```

Semver, applied to token *values* rather than API shape:

| Change | Bump |
|--------|------|
| New token added; no existing value changes | **minor** |
| Existing token's value changes (visual change in consumers) | **minor** at minimum; **major** if it is a brand/primary colour |
| Token renamed or removed | **major** — it breaks `DesignTokens.*` call sites at compile time |
| Codegen/pipeline fix with byte-identical output | **patch** |

**Never re-publish an existing version.** GitHub Packages returns HTTP 409 and the workflow fails.
More importantly, a version that means two different things is how you get an app that shows stale
colours no one can explain — bump instead.

### 2.3 Regenerate and verify locally

```bash
pnpm run sync
```

Then check the generated output actually contains what you expect:

```bash
grep -c 'name="' dist/belcorp/android/colors.xml         # 240 colours
grep -c 'name="' dist/belcorp/android/dimens.xml         # 54 dimens
grep -c 'name="' dist/belcorp/android/integers.xml       # 14 integers
grep -c 'name="' dist/belcorp/android/strings.xml        # 9 strings
grep -c '^\s*val ' dist/belcorp/compose/DesignTokens.kt  # Compose token count (308)
grep 'color_primary_500' dist/belcorp/android/colors.xml # spot-check a value you changed
head -10 brands/belcorp/DESIGN.md                        # version + token count
```

**Resource naming.** The 317 Android resource names split into **240 colours**, which are
`color_*` and carry **no** prefix, and **77 non-colour** resources — 54 dimens, 14 integers,
9 strings — which are **all `bds_`-prefixed** (`bds_font_size_h1`, `bds_radius_card`,
`bds_motion_duration_fast`, `bds_elevation_1`).

Library resources merge into the consuming app's namespace, and on a name clash **the app
silently wins over the library** — no warning, no build failure, just a wrong value at
runtime. Names like `spacing_4`, `radius_card` or `font_size_h1` are generic enough that any
feature module would plausibly reinvent them, and they had zero references in either
consumer, so prefixing them cost nothing. The 240 `color_*` names were left bare
deliberately: they are specific enough that nobody reinvents them, and renaming them would
have churned hundreds of call sites in the real consumer. Compose is unaffected —
`DesignTokens.colorPrimary500` is already namespaced by object and package.

The invariant is asserted in `test/generated-output.test.mjs`, not by `android.resourcePrefix`
— AGP lints every resource against a single prefix, so setting it would flag all 240
deliberately-bare colours.

`brands/belcorp/DESIGN.md` is **automatically regenerated by this same build** —
never edit it by hand. It lists every token with the exact identifier to type on
each platform (Compose, Android XML, iOS, Flutter, CSS), so it is the reference
to hand anyone asking "what do I call this colour". Tokens with no
representation on a platform show `—` rather than a name that would not compile.

It regenerates on `pnpm run sync`, on `pnpm run build`, in the **Sync tokens from
Figma JSON** workflow, and inside both publish workflows — which re-run
`sync:figma` from a clean checkout. CI re-runs the sync on every PR and fails on
any diff, so it cannot silently fall behind.

### 2.4 Smoke-test against the app before publishing — the `~/.m2` loop

**Iterate against `~/.m2`, not GitHub Packages.** Published versions are
immutable, so every remote publish permanently burns a version number. The local
Maven repository has no such rule: you can republish the *same* version as many
times as you like, which makes it the right place to get a token change right
before it becomes permanent.

This is the loop to use for all day-to-day token work.

**1. Publish to `~/.m2`**

```bash
cd ~/Projects/design-system
pnpm run sync                                        # regenerate dist/ + DESIGN.md
./gradlew :tokens-android-belcorp:publishToMavenLocal
ls ~/.m2/repository/com/estebanruano/tokens-android-belcorp/
```

> `pnpm run sync` alone is **not** enough. It regenerates `dist/` only; the
> module sources baked into the AAR are updated by a Gradle copy task on
> `preBuild`, which `publishToMavenLocal` triggers. Skipping this step is the
> single most common reason a change "does not show up".

**2. Point the app at it — no file edits**

The app's `settings.gradle.kts` takes a `designSystemLocal` Gradle property. When
set, the design-system repository resolves from `mavenLocal()` instead of GitHub
Packages:

```bash
cd ~/Projects/Belcorp/app-consultoras-replatform-android
# set the version you just published
sed -i 's/^design-system-tokens = .*/design-system-tokens = "3.0.0"/' gradle/libs.versions.toml

./gradlew :app:assembleAllCountriesDevDebug -PdesignSystemLocal
```

For a longer session — and to make **Android Studio** use it too, since the IDE
does not pass your command-line flags — put it in your *user-level* properties,
which are outside the repo and so can never be committed by accident:

```properties
# ~/.gradle/gradle.properties
designSystemLocal=true
```

Delete that line to go back to the published artifact. `designSystemLocal=false`
also works and is explicit.

**3. Verify it actually landed**

A successful build is not proof the values reached the APK. Check the artifact:

```bash
APK=app/build/outputs/apk/allCountriesDev/debug/app-allCountries-dev-debug.apk

# a colour — bare name, no prefix
aapt2 dump resources "$APK" | grep -A1 'color/color_primary_500$'

# a dimen — bds_-prefixed. `dimen/font_size_h1` no longer exists; if you grep
# for the unprefixed name you will conclude, wrongly, that nothing shipped.
aapt2 dump resources "$APK" | grep -A1 'dimen/bds_font_size_h1$'
```

**Why a Gradle property rather than editing the repository block**

The `exclusiveContent` filter claims the whole `com.estebanruano` group, so a
local repository has to *replace* the remote one — adding `mavenLocal()`
alongside it fails, because two repositories cannot both claim one group
exclusively. That used to mean hand-editing `settings.gradle.kts` and
remembering to revert it, which is a committed file: forgetting breaks CI and
every other developer, since the artifact only exists on your machine. The
property removes that failure mode — the checked-in file is always correct.

> **Do not commit the app pointing at an unpublished version.** The
> `designSystemLocal` property keeps `settings.gradle.kts` clean, but
> `gradle/libs.versions.toml` is still a committed file — if it names a version
> that only exists in your `~/.m2`, the branch will not build for anyone else.
> Publish first, or say so explicitly in the commit message.

Verify the values actually reached the merged resources rather than trusting the build succeeded:

```bash
grep -r 'color_primary_500' app/build/intermediates/*/merged*/ | head
```

### 2.5 Commit and publish

```bash
git add brands/ core/ dist/ VERSION package.json design-system-foundations.md pipeline/
git commit -m "feat(color): <what changed> (v3.1.0)"
git push origin belcorp
```

(`brands/` covers the SSOT, the generated token tree and `DESIGN.md`; `core/` covers the
shared geometry. The module sources under `platforms/android/<id>/src/` are **gitignored** —
they are Gradle copies of `dist/`, not artifacts to commit.)

Simpler and safer: `git add -A`. CI stages every file and fails on any diff after
re-running `sync`, so forgetting a generated file — `brands/<brand>/DESIGN.md` included — blocks
the PR rather than shipping a stale artifact.

Publish is **manual**:

> GitHub → **Actions** → **Publish Android library** → **Run workflow** → pick the branch.

Since brands became directories, the branch no longer selects a palette — **the workflow
publishes every brand discovered under `brands/`**, in one run, at the single version in
`VERSION`. Picking a branch now only chooses which commit to publish from.

The workflow reads `VERSION` — there is no version input. It re-runs `pnpm run sync:figma` from a
clean checkout and fails the build if:

- `VERSION` is missing or not valid semver
- no `brands/*/figma/tokens.json` exists on that branch
- for **any** brand, one of `colors.xml` / `dimens.xml` / `integers.xml` / `strings.xml` is
  missing from `dist/<brand>/android`
- a brand's `dimens.xml` is missing the typography dimen, or contains malformed units
  (e.g. `28pxpx`)
- a brand's `dist/<brand>/compose/DesignTokens.kt` is missing or contains invalid Kotlin
  (unquoted CSS, `rgba(`, `cubic-bezier`) or the old rem-multiplied sizes
- `package.json` version disagrees with `VERSION` after sync

Validation runs per brand deliberately, so a broken brand cannot ride along with a healthy one.

> **Known gap.** The typography check in `publish-android.yml` greps for
> `name="font_size_h1"`, which no longer matches anything — the resource is
> `bds_font_size_h1` since the prefix landed. Until that grep is updated the publish job will
> fail on a correct `dist/`, so treat a `has no font_size_h1 (typography tokens missing)`
> error as a workflow bug rather than a token problem, and verify against
> § 2.3 before touching the tokens.

Because the workflow re-syncs from source, **a hand-edited `dist/` will be silently overwritten** —
another reason to only ever edit `brands/belcorp/figma/tokens.json`.

### 2.6 Consume the new version

In the app repo:

```toml
# gradle/libs.versions.toml
design-system-tokens = "3.0.0"
```

Consumers need a GitHub PAT with `read:packages` in `~/.gradle/gradle.properties`:

```properties
gpr.user=<github-username>
gpr.key=<PAT with read:packages>
```

The property is **`gpr.key`**, not `gpr.token` — it is read by
`project.findProperty("gpr.key")` in the consumer's repository block (see the snippet in the
[README](../README.md)). A misspelled property is not an error; it simply resolves to null and
you get an authentication failure that looks like an expired token.

CI falls back to `GITHUB_ACTOR` + `GITHUB_TOKEN`. The full consumer-side repository block is
in the [README](../README.md); the app repo also documents it in
`docs/design-system/consuming-design-system.md`.

---

## 3. Version history, immutability and rollback

### 3.1 Published versions are immutable

A version, once published to GitHub Packages, cannot be replaced. Re-publishing the same
coordinate returns **HTTP 409 Conflict** and the workflow fails. This is a feature: a version
that means two different things is unresolvable after the fact, and it is how you get an app
showing stale colours that nobody can explain.

The consequence for day-to-day work: **do not iterate against the registry.** Every remote
publish permanently burns a version number. Iterate with `-PdesignSystemLocal` and
`:tokens-android-belcorp:publishToMavenLocal` — the local Maven repository has no
immutability rule, so you can republish the same version as many times as it takes to get a
change right before it becomes permanent. That loop is § 2.4.

### 3.2 Version history

> **This is a listing of the local Maven cache, not a confirmed registry listing.** The
> authoritative list is GitHub Packages, which requires a PAT with `read:packages`:
>
> ```bash
> curl -su "$USER:$GH_PAT" \
>   https://maven.pkg.github.com/esteban505r/design-system/com/estebanruano/tokens-android-belcorp/maven-metadata.xml
> ```
>
> Without a valid token that returns `Your request could not be authenticated by the GitHub
> Packages service`, which is what happened when this table was compiled. What follows is
> `ls ~/.m2/repository/com/estebanruano/tokens-android-belcorp/` on one developer machine,
> cross-referenced with the `VERSION` file at each release commit. **A version being absent
> here does not mean it was never published, and a version being present does not prove it
> was** — `publishToMavenLocal` writes to the same directory.

| Version | Release commit | What changed |
|---------|---------------|--------------|
| 2.0.0 | `0b55d8a` | Belcorp Design System 5.0 token set — breaking; replaced the v1 set seeded from the legacy app theme |
| 2.1.0 | `de67557` | Typed Compose `DesignTokens.kt` shipped inside the AAR |
| 2.2.0 | `2a8915d` | Belcorp Android app palette absorbed |
| 2.3.0 | `f229b32` | **Verification release** — every colour token set to red. Not a real palette |
| 2.4.0 | `9e651b0` | Verification palette reworked to preserve perceptual lightness (§ 5) |
| 2.5.0 | `ccfddad` | Real Belcorp palette restored |
| 2.6.0 | `baf3f13` | Recurring Belcorp drawable colours absorbed |
| 3.0.0 | `a68a00d` | **Breaking** — primary ramp rebranded from purple to orange (`#7D4DBE` → `#BE5B06`) |

Two things to read out of that table. **2.0.0 is in git history but not in the local cache**,
which is exactly why the caveat above matters. And **2.3.0 and 2.4.0 are deliberately wrong
palettes** — verification releases, described in § 5. Never pin an app to either.

Current `VERSION`: **3.0.0**.

### 3.3 Rollback

To roll back, pin the app to the previous *real* version:

```toml
design-system-tokens = "2.6.0"
```

To roll forward instead, restore the old token values, bump to a **new** version, and publish that.
Never try to overwrite a bad release in place.

---

## 4. Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Colour changed in `dist/` but not in the app | Gradle copy task never ran | `./gradlew :tokens-android-belcorp:publishToMavenLocal` |
| CI fails on a `brands/<brand>/DESIGN.md` diff | Tokens changed without re-running sync | `pnpm run sync` and commit — never hand-edit `brands/<brand>/DESIGN.md` |
| Sync fails naming tokens with "no mapping" | Not in `pipeline/token-name-map.mjs` | Add the mapping and re-run `pnpm run sync`. `--allow-unmapped` downgrades it to a warning — only while migrating a set deliberately |
| New token landed in `color/other.json` | No `subCategories` entry | Add it to `fileMap.color.subCategories` in `pipeline/token-writer.mjs` |
| Publish fails with HTTP 409 | That version already exists | Bump `VERSION` — never re-publish |
| App can't resolve the artifact | Missing/expired/misspelled `gpr.key`, or the version is only in `~/.m2` | Check `gpr.user`/`gpr.key` in `~/.gradle/gradle.properties`; or build with `-PdesignSystemLocal` |
| Works locally, fails for everyone else | `designSystemLocal=true` is set in your `~/.gradle/gradle.properties` and the version was never published | Publish it, or drop the version back to a published one |
| Republished to `~/.m2` but the app sees the old values | Gradle cached the module metadata | `./gradlew --refresh-dependencies` |
| App resolves an old version despite the bump | Gradle cached the module metadata | `./gradlew --refresh-dependencies` |
| Published the wrong token values | Ran against a branch whose `brands/*/figma/tokens.json` is not what you meant | Bump `VERSION` and re-run from the right commit — the published one cannot be replaced |
| A `@dimen`/`@integer`/`@string` lookup resolves to nothing | Using the pre-`bds_` name | Every non-colour resource is `bds_`-prefixed; colours are not. See § 2.3 |

---

## 5. Verification releases (deliberate visual changes)

To prove end-to-end propagation, it is useful to publish a version where every colour is obviously
wrong — then confirm the app changes.

**Do not flatten every token to the same value.** Setting all 240 colours to `#ff0000` makes the UI
one solid block: text disappears into its background, borders vanish, and overlays stop reading as
overlays, so you cannot tell propagation from breakage.

Instead, keep each token's **perceptual lightness** and shift only the hue. Light colours stay
light, dark stay dark, contrast ordering survives, and every surface is still unmistakably wrong:

- convert each original value to CIE Lab and read `L*`
- compress `L*` into roughly `[15, 87]` so nothing is pure black or pure white
- re-render at a fixed hue with near-maximum in-gamut chroma
- carry the original alpha through untouched

Give the verification build its **own version number** and never reuse it for a real release — a
version that means both "real palette" and "test palette" is unresolvable after the fact.
