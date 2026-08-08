# Consumers

Who depends on this library, at what version, and who owns the bump.

A design system with one consumer does not need an inventory. A design system
with N consumers cannot remove a token without one — nobody can prove the last
usage is gone, so nothing is ever deleted and the token set only grows. This
file is the record that makes removal decidable.

Everything below was measured against the repositories as they stood on
**2026-08-07**, at design system **`VERSION` 3.0.0**. Every number has the
command that produced it, so it can be re-measured rather than trusted.

---

## Inventory

| App | Platform | Artifact consumed | Version pinned | Integration status | Owns the bump |
|---|---|---|---|---|---|
| `tech-belcorp/app-consultoras-replatform-android` (`belcorp-somos`) | Android — Kotlin, Compose, Material 3 | `com.estebanruano:tokens-android-belcorp` (AAR, GitHub Packages) | `3.0.0` | **Unmerged.** Lives on branch `chore/design-tokens-standardization`, 15 commits / 412 files ahead of `origin/development` | **TBD** |
| `tech-belcorp/ffvv-android-replatform` (`ffvv`) | Android — Kotlin, Compose, Material 3 | none | — | **Prospective.** Zero consumption today; hand-rolled semantic layer in-repo | **TBD** |

No iOS, Flutter, or web consumer exists. See [No other consumers](#no-other-consumers).

Nothing in this table is shipped to production yet. The `belcorp-somos`
integration is real and builds, but it has not been merged to `development`,
so the correct reading is "one integration in review", not "one app on tokens".

---

## Consumer 1 — `app-consultoras-replatform-android`

### Wiring

Three files, and only three:

| File | What it does |
|---|---|
| `settings.gradle.kts` | Declares the `DesignSystemGitHubPackages` repository, scoped with `exclusiveContent` to the `com.estebanruano` group, plus the `gpr.user`/`GPR_USER` credential chain |
| `gradle/libs.versions.toml` | `design-system-tokens = "3.0.0"` (line 98) and the coordinate `com.estebanruano:tokens-android-belcorp` (line 230) |
| `capabilities/build.gradle.kts` | `api(libs.design.system.tokens)` (line 59) |

`api`, not `implementation`, is load-bearing: the 14 modules that depend on
`:capabilities` get `DesignTokens` on their compile classpath transitively.
`:capabilities` is injected by the `biz.belcorp.consultoras.android.feature`
convention plugin, so a grep for `project(":capabilities")` under-reports the
dependency set.

### Toolchain

Kotlin 2.4.10, AGP 9.2.1, compose-bom 2026.06.01, `compileSdk`/`targetSdk` 36,
`minSdk` 26, JVM target 21.

### Adoption baseline

Run these from the repo root of the consumer. The numbers are the 2026-08-07
baseline; the point of writing them down is that the direction of travel is
checkable later.

```bash
# Compose token references (baseline: 131, all in one file)
grep -rn "DesignTokens\." --include=*.kt . | grep -v "/build/" | wc -l
grep -rl "DesignTokens\." --include=*.kt . | grep -v "/build/"

# Split by tier — this is the number that matters (baseline: 81 / 48 / 2)
grep -Eho "DesignTokens\.[A-Za-z0-9]*" \
  capabilities/src/main/kotlin/com/mindstix/capabilities/presentation/theme/Colors.kt \
  | sed 's/DesignTokens\.//' \
  | sed -E 's/^colorApp.*/APP/; s/^(colorBg|colorText|colorBorder|colorInteractive|colorStatus|colorBrand|colorSurface|colorIcon).*/SEMANTIC/; s/^color[A-Z].*/PRIMITIVE/' \
  | sort | uniq -c

# XML colour references (baseline: 436 references across 229 files)
grep -rn "@color/color_" --include=*.xml . | grep -v "/build/" | wc -l
grep -rl "@color/color_" --include=*.xml . | grep -v "/build/" | wc -l

# …of which app-namespace one-offs (baseline: 134)
grep -rn "@color/color_app_" --include=*.xml . | grep -v "/build/" | wc -l

# Non-colour resources consumed (baseline: 0)
grep -rn "@dimen/" --include=*.xml . | grep -v "/build/" | wc -l

# Raw literals still in feature modules (baseline: 1,014 dp / 244 sp)
grep -rEno "[0-9]+\.dp" --include=*.kt ./feature-* ./features-* | wc -l
grep -rEno "[0-9]+\.sp" --include=*.kt ./feature-* ./features-* | wc -l

# Raw colour literals anywhere (baseline: 0 — keep it there)
grep -rEno "Color\(0x[0-9A-Fa-f]{6,8}\)" --include=*.kt . | grep -v "/build/" | wc -l
```

| Metric | Baseline 2026-08-07 | Target |
|---|---|---|
| `DesignTokens.` references | 131 in 1 file | — |
| …primitive (`colorPrimary500`, `colorNeutral0`, …) | 48 | **0** |
| …`color.app.*` one-offs | 81 Kotlin + 134 XML, against 118 tokens defined | monotonically down from 118 |
| …semantic (`colorBg*`, `colorText*`, …) | 2 | up |
| `@color/color_` XML references | 436 across 229 files | — |
| `@dimen/` references | 0 | up (see below) |
| Raw `.dp` in feature modules | 1,014 | down |
| Raw `.sp` in feature modules | 244 | down |
| Raw `Color(0x…)` | 0 | stays 0 |

### What this tells you

**It is a colour-only integration.** `Type.kt` and `Dimentions.kt` contain zero
`DesignTokens` references, and there are zero `@dimen/` references anywhere in
the app. The 77 non-colour resources in the AAR — 54 dimens, 14 integers, 9
strings — are shipped and entirely unconsumed. Spacing, radius, typography and
motion are still local constants and raw literals.

**It binds to primitives, not semantics.** Of the 131 Compose references, 48
read a palette position (`colorPrimary500`, `colorNeutral0`) and 2 read a role.
The colour migration bridged each app literal to the token whose hex matched
byte-for-byte — the only way to guarantee zero visual change across ~1,000
substitutions — but that records the value, not the intent. v3.0.0 moved the
primary ramp from purple to orange and every call site had to be reviewed by
hand. It will have to be reviewed by hand again on the next rebrand, until the
primitive count reaches 0.

The remaining 81 references are `color.app.*`: one-offs that exist because the
app needed a colour the semantic vocabulary could not name. That set is frozen
at 118 tokens. It should only ever shrink, as design names the roles those
colours were standing in for — see
[foundations-and-semantics.md](foundations-and-semantics.md) and
[role-requests.md](role-requests.md).

---

## Consumer 2 — `ffvv-android-replatform`

**Not integrated.** No `com.estebanruano` coordinate appears in any build file,
version catalog, or settings script:

```bash
grep -rn "estebanruano\|tokens-android" --include=*.gradle --include=*.kts --include=*.toml . | grep -v "/build/"
# baseline: no output
```

It is listed here because it is the next consumer, and because what it has
built in the meantime changes what integration should look like.

### Toolchain

Kotlin 2.3.21, AGP 9.1.1, compose-bom 2026.05.01, `compileSdk` 37, `minSdk` 29,
`targetSdk` 36.

The embedded `unete` module (sources at `unete4-android-library/`) carries its
own version catalog pinning compose-bom 2025.01.01. This is not an obstacle:

- The AAR declares Compose as `compileOnly`, so it contributes **no** Compose
  constraint to any consumer's resolution graph.
- `unete` is a normal Gradle module, not an included build — root
  `settings.gradle` includes `:unete` and remaps
  `project(':unete').projectDir` at `unete4-android-library/`. Root
  `dependencyResolutionManagement` repositories therefore apply to it, so it
  resolves the DS AAR without separate wiring.

### It already has a semantic layer

`capabilities/src/main/kotlin/biz/belcorp/salesforce/capabilities/presentation/theme/`:

| File | Contents |
|---|---|
| `ColorsRaw.kt` | `object Raw` — 83 `val`s, all hardcoded `Color(0x…)` |
| `ColorSemanthics.kt` | `object Sem` — 83 `val`s, each aliasing a `Raw` member by role (`ActionPrimary = Raw.Purple600`) |
| `ColorThemes.kt` | `LightColors` + `DarkColors`, 14 Material 3 `ColorScheme` slots each, both built from `Sem` |
| `AppTheme.kt` | branches on `darkTheme` to pick the scheme |

This is the primitive → semantic split this repo asks for, hand-rolled locally.
It is also the only consumer with real dark-mode wiring. That makes ffvv the
better integration target of the two: `Raw` is exactly the layer the AAR
replaces, and `Sem` is exactly the layer that should survive. The migration is
retargeting 83 `Raw` values at `DesignTokens`, not rewriting 1,961 call sites.

It also makes ffvv a source of requirements: `DarkColors` needs a dark mode from
the pipeline. Only `light` is built today (see [brands.md](brands.md)), so a
faithful integration is blocked on emitting a second mode.

### Adoption baseline

```bash
# Semantic references (baseline: 1,961 across 298 files)
grep -rEno "\bSem\.[A-Za-z0-9]+" --include=*.kt . | grep -v "/build/" | wc -l
grep -rlE "\bSem\." --include=*.kt . | grep -v "/build/" | wc -l

# Raw colour literals — 82 are the Raw object itself, 67 are call sites
grep -rEno "Color\(0x[0-9A-Fa-f]{6,8}\)" --include=*.kt . | grep -v "/build/" | wc -l
grep -rEno "Color\(0x[0-9A-Fa-f]{6,8}\)" --include=*.kt . | grep -v "/build/" \
  | grep -v "presentation/theme/" | wc -l

# Compose built-in black and white (baseline: 292)
grep -rEno "Color\.(White|Black)" --include=*.kt . | grep -v "/build/" | wc -l

# Raw dimensions (baseline: 353 dp / 92 sp)
grep -rEno "[0-9]+\.dp" --include=*.kt . | grep -v "/build/" | wc -l
grep -rEno "[0-9]+\.sp" --include=*.kt . | grep -v "/build/" | wc -l
```

| Metric | Baseline 2026-08-07 | Target |
|---|---|---|
| `Sem.` references | 1,961 across 298 files | up (it is the right layer) |
| `Color(0x…)` total | 149 | down |
| …outside the theme package | 67 | **0** |
| `Color.White` / `Color.Black` | 292 | down |
| Raw `.dp` | 353 | down |
| Raw `.sp` | 92 | down |

That repo has concurrent work in flight, so these will drift. Re-run before
quoting them.

---

## No other consumers

The pipeline emits Android XML, Compose, Swift, Dart, CSS, JS and JSON. Only
**Android XML and Compose** have ever been consumed by anything.

- **iOS:** none. The one `iosApp.xcodeproj` in the consultoras repo contains a
  `project.xcworkspace` and no `project.pbxproj` — it is an empty KMP scaffold,
  not a project.
- **Flutter:** none.
- **Web:** none. `package.json` is still `private: true`.

Packaging for SPM and pub is deliberately deferred until a real consumer exists;
publishing creates a support obligation. The Swift and Dart outputs are still
type-checked and analyzed in CI (`.github/workflows/ci.yml`) because both
shipped for months in a state that could not compile at all — the check is what
caught it, and it costs nothing.

When a consumer appears on any of those platforms, it goes in the table above
before it goes into production.

---

## Compatibility

The AAR is built with:

| | |
|---|---|
| AGP | 8.5.2 |
| Kotlin | 1.9.24 |
| `compileSdk` | 34 |
| `minSdk` | 24 |
| Java source/target | 17 |
| Compose (`compileOnly`) | `ui-graphics` / `ui-unit` 1.6.8 |

Consuming that from AGP 9.x, Kotlin 2.x, `compileSdk` 36/37 is fine, and none of
this is a coincidence of luck:

- **AAR metadata constrains consumers to be *newer*, never older.** The
  `minCompileSdk` / `minAgpVersion` fields in the AAR say "you must be at least
  this new". A consumer above the floor is exactly the supported case; a
  consumer below it fails loudly at configuration time.
- **Kotlin 2.x reads 1.9 metadata.** Binary metadata is forward-compatible
  across that boundary, and the AAR's entire Kotlin surface is one generated
  `object` of `val`s — no inline functions, no generics, no coroutines, no
  reflection. There is nothing in it for a metadata change to break.
- **`compileOnly` means 1.6.8 is a floor, not a pin.** The Compose artifacts
  never reach a consumer's runtime or resolution graph; the consumer's own
  compose-bom supplies `Color`, `Dp` and `TextUnit`. That is also why a
  consumer's compose-bom version — 2026.06.01, 2026.05.01, or `unete`'s
  2025.01.01 — is irrelevant to the DS.
- **`minSdk` 24 is below every consumer's** (26 and 29), so resource and
  manifest merging never raise the app's floor.

This is not theory. Consumer 1 builds against this exact AAR at AGP 9.2.1 /
Kotlin 2.4.10 / `compileSdk` 36 today.

The one real constraint is the **resource namespace**, not the toolchain: the
AAR's 240 `color_*` names are unprefixed and merge into the app's namespace,
where an app-side resource of the same name silently wins. The 77 non-colour
resources are prefixed `bds_` for that reason. See the Android section of the
[README](../README.md).

---

## How to add a consumer

1. **Add the row to the table above first**, with owner `TBD` if it is not yet
   assigned. A consumer that is not in this file cannot be considered when a
   token is renamed or removed.
2. **Read [releasing-android.md](releasing-android.md)** for credentials, the
   repository block, and the `mavenLocal()` smoke test. Do not copy another
   consumer's `settings.gradle.kts` blind — the credential chain has changed
   since the first integration.
3. **Pin an exact version.** No ranges, no `+`, no SNAPSHOT. One `VERSION`
   covers every brand, and published versions are immutable.
4. **Scope the repository with `exclusiveContent`** to the `com.estebanruano`
   group, so a GitHub Packages outage cannot stall resolution of anything else.
5. **Expose it with `api` from exactly one module**, not `implementation` in
   many. Consumer 1 does this from `:capabilities`; it is the reason the wiring
   is three files rather than fourteen.
6. **Bind to semantic tokens.** If no semantic token fits, that is a request to
   design to name the role — see [role-requests.md](role-requests.md) — not a
   reason to reach for a primitive or to grow `color.app.*`, which is frozen.
7. **Record the baseline.** Add the app's adoption metrics to this file as
   greppable one-liners with the day-one numbers, the way the two sections above
   do. A baseline written after six months of drift is not a baseline.
8. **Name the bump owner.** Someone has to decide when this app moves to the
   next `VERSION` and to review the diff when it does. `TBD` is an honest
   placeholder for a week, not for a year.
9. **Check the governance checklist** in
   [general-next-steps.md](general-next-steps.md) — the consumer-inventory item
   there is this file.
