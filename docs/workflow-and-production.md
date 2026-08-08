# Workflow & production guide

Repository setup, GitHub Actions, and the release path.

This document covers the **operational** side. For the token pipeline itself see
[figma-ssot.md](figma-ssot.md); for the multi-brand model see [brands.md](brands.md);
for consuming the artifacts see the [README](../README.md).

> **History note.** This guide once described a second source of truth —
> `design-system-foundations.md`, parsed by `md-to-tokens.mjs` via `pnpm run sync:md`.
> That pipeline, its script and its workflow were removed. Nothing below refers to
> it any more; if you find a `sync:md` reference anywhere in this repo, it is a bug.

---

## 1. Prerequisites

### 1.1 Local machine

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | **≥ 18.12** | Required by `pnpm` and `package.json` `engines` |
| pnpm | **10.x** | See `packageManager` in `package.json`; `corepack enable` picks it up |
| Git | any recent | Branch / PR workflow |
| Java | **17** | Only to build or publish the Android AARs locally |

```bash
cd /path/to/design-system
corepack enable
pnpm install --frozen-lockfile
pnpm run sync && pnpm test
```

The first Gradle invocation compiles `buildSrc/` and needs network access to
resolve the Android and Kotlin Gradle plugins. Later builds work offline.

CI uses **Node 20** for sync and tests, and **Node 22.14** for the npm publish
(a trusted-publishing requirement).

### 1.2 GitHub repository settings

Configure once per repo:

1. **Settings → Actions → General → Workflow permissions**
   - Select **Read and write permissions**, so the sync bot can commit and push.
   - Check **Allow GitHub Actions to create and approve pull requests**, needed by
     **Sync tokens from Figma JSON**. Without it the sync commit still lands but
     `gh pr create` fails with `createPullRequest` not permitted.

2. **Branch protection on `main`** (recommended)
   - Require PR reviews.
   - Require the **CI** status check.
   - Do not allow bypassing failed checks for token changes — the drift check is
     the only thing standing between a hand-edited `dist/` and a shipped artifact.

3. **Secrets**
   - Sync, CI and Android publish use the built-in `GITHUB_TOKEN`.
   - npm publish uses **no `NPM_TOKEN`** — it is
     [Trusted Publishing](https://docs.npmjs.com/trusted-publishers/) over OIDC.
   - Android *consumers* need `gpr.user` / `gpr.key` (a PAT with `read:packages`).

**Org-owned repos:** these options may be locked at
**Organization → Settings → Actions → General**, in which case an org admin has
to allow PR creation for workflows.

---

## 2. GitHub Actions

| Workflow | Trigger | What it does |
|---|---|---|
| **Sync tokens from Figma JSON** | Push to `brands/*/figma/tokens.json`, or manual | `pnpm run sync`, commit, open or update a PR |
| **CI** | PR to `main` / `belcorp` | sync → `pnpm test` → fail on drift → assemble every brand's AAR; `flutter analyze` and `swiftc -typecheck` the generated Dart and Swift |
| **Publish Android library** | Manual | sync → validate each brand's dist → Gradle `publish` |
| **Publish web tokens (npm)** | Manual | sync → `npm publish` |

### 2.1 The drift check

CI re-runs the sync from a clean checkout and fails if any generated file differs
from what you committed. This is what keeps `dist/`, the token tree and every
`DESIGN.md` honest: they are committed artifacts, but they are never authored.

If CI tells you to run sync locally, do exactly that and commit the result —
never hand-edit the file it complained about.

> **One exception, and it matters.** That advice assumes the SSOT is correct and the
> generated files have fallen behind it. If the drift was *caused* by a bad
> `brands/*/figma/tokens.json` — a damaged Tokens Studio export, say — then re-running sync
> regenerates every artifact from the damage and asks you to commit it. Read the diff on the
> export before you sync. See
> [figma-ssot.md § Exactly one token set](figma-ssot.md#exactly-one-token-set--a-multi-set-export-fails-the-build).

### 2.2 Publish workflows

**Neither publish workflow takes inputs.** Both read the release version from the
root **`VERSION`** file:

```bash
pnpm run version:set -- --version x.y.z   # writes VERSION, mirrors into package.json
pnpm run sync
git commit -am "chore(release): x.y.z"
# then: Actions → Publish … → Run workflow
```

Because the version comes from a committed file rather than a form field, what
gets published is always reproducible from the commit.

**Android (`publish-android.yml`)** — publishes every brand module, at the version
in `VERSION`. Modules are discovered from `brands/*/brand.json` by
`settings.gradle.kts`, each requiring a matching `platforms/android/<id>/`
directory; the job runs a bare `./gradlew publish`, with no module path. A **409
Conflict** means that version already exists in GitHub Packages; bump `VERSION`
and re-run.

**Web (`publish-web.yml`)** — Node 22.14, npm ≥ 11.5.1, `id-token: write` for
OIDC. The npm **Trusted Publisher** entry must match this repository and the
workflow filename `publish-web.yml` exactly.

> **Web publishing is currently blocked.** `package.json` sets `private: true`,
> which `npm publish` refuses. The package name and export paths are also still
> single-brand. Resolve both before relying on this workflow.

---

## 3. Roles

### 3.1 Designers / design ops

1. Change variables in Figma.
2. Export to `brands/<brand>/figma/tokens.json` and push.
3. Review the PR the sync workflow opens — the diff shows every platform artifact
   your change produced.

New token names must be mapped in `pipeline/token-name-map.mjs` or the build
fails naming them. That failure is deliberate: it is what stops a variable you
authored from disappearing silently.

### 3.2 Engineers

- Never hand-edit `core/tokens/`, `brands/*/tokens/`, `dist/` or any `DESIGN.md`.
- Run `pnpm run sync && pnpm test` before committing token changes.
- Pipeline changes belong in `pipeline/`; nothing brand-specific should live there.

### 3.3 Release manager

See the checklist in [§ 5](#5-release-checklist) and the full Android procedure,
including the local `~/.m2` verification loop, in
[releasing-android.md](releasing-android.md).

---

## 4. Versioning model

| Source | Field |
|---|---|
| **Authoritative** | the root **`VERSION`** file |
| Mirror | `package.json` `version` — written by `version:set` and by every sync |
| Android publish | Maven version, from `VERSION` unless `-PtokensVersion` / `TOKENS_VERSION` is set |
| npm publish | package version, from `package.json` |

**One version for every brand.** A brand-only change bumps them all, which is
cheap; per-brand versions would multiply the release matrix for no real benefit.

| Bump | Meaning |
|---|---|
| **Major** | A token was renamed or removed — it breaks `DesignTokens.*` call sites at compile time |
| **Minor** | New tokens added |
| **Patch** | A token value changed, with no change to the set of names |

That table describes the **token contract**, not risk: a value change is invisible to the
compiler but is a visual change in every consumer.

In practice releases have been bumped by visual impact rather than by contract, and the
history says so — v2.5.0 restored the real palette (a value change, released as a **minor**)
and v3.0.0 rebranded the primary ramp purple → orange (a value change, released as
**major**). The operative guidance for anything that ships to an app is the fuller table in
[releasing-android.md § 2.2](releasing-android.md#22-bump-the-version): a value change is
minor at minimum, and major if it is a brand or primary colour.

---

## 5. Release checklist

- [ ] Token changes merged with green CI
- [ ] `pnpm run version:set -- --version x.y.z`, then `pnpm run sync`
- [ ] `pnpm test` passes and `git status` is clean after the sync
- [ ] Commit `VERSION`, `package.json` and any regenerated files
- [ ] **Publish Android library** → verify the package appears in GitHub Packages
- [ ] Optionally verify against the real app first via `publishToMavenLocal` —
      see [releasing-android.md](releasing-android.md)
- [ ] Consumer PRs bump the Maven coordinate
- [ ] Release notes list renamed or removed tokens

---

## 6. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| CI: "run `pnpm run sync:figma` locally" | Generated files out of date | `pnpm run sync`, commit the result |
| Build fails naming unmapped tokens | A Figma name has no mapping | Add it to `FIGMA_TO_TOKEN_PATH` in `pipeline/token-name-map.mjs` |
| Build fails "disagrees with core/" | Two brands claim different values for a shared scale | See [brands.md](brands.md) |
| Maven 409 | That version is already published | Bump `VERSION`, commit, re-run |
| npm `ENEEDAUTH` | Trusted Publisher mismatch | Match repo + `publish-web.yml` on npm; check `repository.url` in `package.json` |
| npm refuses to publish | `package.json` is `private: true` | Expected — see § 2.2 |
| First Gradle build fails offline | `buildSrc` needs to resolve AGP and Kotlin | Run once with network |
| Sync bot cannot push | Workflow permissions | Enable read/write for Actions |
| Stale values in an app | Consumer not bumped | Pin the new version in the app |

---

## 7. What is *not* automated, by design

- **Publishing on merge.** Releases are manual, so a version is always a decision.
- **Figma does not pull from GitHub.** Design ops imports
  `dist/<brand>/figma/tokens.json` (or configures Tokens Studio git sync).
- **Consumer apps do not auto-update.** Each app bumps its own dependency.

This keeps production releases deliberate and traceable to a commit.
