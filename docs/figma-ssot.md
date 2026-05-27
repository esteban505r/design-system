# Figma JSON as single source of truth (`figma-ssot` branch)

On branch **`figma-ssot`**, token **values** are authored in **`figma/tokens.json`** (Tokens Studio / Figma Variables export format). Everything else is generated.

---

## Pipeline

```
figma/tokens.json          ← SSOT (commit this file)
        │
        │  pnpm run parse  (figma-to-tokens.mjs)
        ▼
   tokens/**/*.json        ← DTCG JSON for Style Dictionary
        │
        │  pnpm run build  (sd.config.mjs)
        ▼
   dist/web, dist/android, dist/ios, …
        │
        └── dist/figma/tokens.json   ← copy of SSOT (for npm export path)
```

**One command:** `pnpm run sync:figma` = `parse` + `build`.

| Script | Purpose |
|--------|---------|
| `pnpm run sync:figma` | Full pipeline from `figma/tokens.json` |
| `pnpm run parse` | `figma/tokens.json` → `tokens/` + copy to `dist/figma/` |
| `pnpm run build` | `tokens/` → platform `dist/` |
| `pnpm run sync:md` | **Other path** — from `design-system-foundations.md` (see [workflow-and-production.md](workflow-and-production.md)) |
| `pnpm run figma:verify` | Diff `tokens/` export vs SSOT (`dist/figma/tokens.generated.json`) |

---

## Editing tokens

### Designers (recommended)

1. Change variables in **Figma** (Tokens Studio).
2. **Export** or sync to `figma/tokens.json` in this repo (Plugins → export JSON, or your Tokens Studio git sync).
3. Set **`$metadata.version`** in `figma/tokens.json` when cutting a release (semver, e.g. `"1.0.6"`).
4. Commit and push `figma/tokens.json`.
5. **Sync tokens from Figma JSON** (GitHub Action) runs `pnpm run sync:figma` and opens/updates a PR with `tokens/` + `dist/`.

### Engineers (local)

```bash
# Edit figma/tokens.json (or pull from design)
pnpm run sync:figma
git add figma/tokens.json tokens/ dist/ package.json
git commit -m "chore(tokens): update from Figma SSOT"
```

**Version:** `figma-to-tokens.mjs` copies `$metadata.version` into `package.json` when present.

---

## File format

`figma/tokens.json` matches Tokens Studio export:

```json
{
  "Global/Mode 1": {
    "primary-color": {
      "$value": "#6366f1",
      "$type": "color",
      "$extensions": { "com.figma.scopes": ["ALL_SCOPES"], … }
    }
  },
  "$themes": [],
  "$metadata": {
    "version": "1.0.5",
    "tokenSetOrder": ["global", "Global/Mode 1"]
  }
}
```

Flat names (`primary-color`, `spacing-md`, `type-h1`) map to nested paths under `tokens/` via `token-name-map.mjs`. Unknown Figma names log a warning and are skipped.

---

## GitHub Actions (production)

| Workflow | Trigger | Action |
|----------|---------|--------|
| **Sync tokens from Figma JSON** | Push to `figma/tokens.json` or manual | `pnpm run sync:figma`, commit, PR to `main` |
| **Sync tokens from markdown** | Manual only (`workflow_dispatch`) | `pnpm run sync:md` |
| **CI** | PR to `main` | `sync:figma` when head branch is `figma-ssot`, else `sync:md` |
| **Publish web / Android** | Manual | branch-based sync before publish |

### Repo settings

1. **Settings → Actions → General → Workflow permissions**
   - **Read and write permissions** (so the bot can commit and push).
   - Check **Allow GitHub Actions to create and approve pull requests** — required for `gh pr create`. If this is off, you get:
     `GitHub Actions is not permitted to create or approve pull requests (createPullRequest)`.
     The sync commit still lands on your branch; open the PR to `main` yourself.

2. **Branch protection:** require CI on PRs that change generated files.

**Org-owned repos:** the same options may be locked at **Organization → Settings → Actions → General**. An org admin must allow PR creation for workflows, or you open PRs manually.

### Release path

1. Bump **`**Version:**`** via **Publish** workflow input or in `design-system-foundations.md` (publish does not write `figma/tokens.json` `$metadata`).
2. Merge sync PR to `main` (or push on `figma-ssot` and merge branch when ready).
3. Run **Publish web tokens (npm)** and/or **Publish Android library** from `main`.
4. Import/sync Figma file in design tools if needed (SSOT already lives in git).

npm package export: `@estebanruano/design-tokens/figma` → **`figma/tokens.json`** (committed SSOT, not only `dist/`).

---

## Mapping reference

| Figma name | Token path |
|------------|------------|
| `primary-color` | `color.brand.primary` |
| `background-color` | `color.surface.background` |
| `text-primary` | `color.text.primary` |
| `success-color` | `color.semantic.success` |
| `auth-gradient-color-1` | `color.gradient.auth-gradient-color-1` |
| `type-h1` | `font.size.h1` |
| `spacing-md` | `spacing.md` |
| `transition-base` | `motion.duration.base` |
| `z-modal` | `z-index.modal` |

Full map: `token-name-map.mjs`.

---

## Migrating back to markdown SSOT

On `main` (markdown-driven):

- SSOT: `design-system-foundations.md`
- Pipeline: `md-to-tokens` → `tokens-to-figma` → `build`

To merge `figma-ssot` into `main`, decide which SSOT wins, then adjust `package.json` `scripts.sync` and workflows accordingly.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `createPullRequest` not permitted | Repo **Settings → Actions → General** → enable **Allow GitHub Actions to create and approve pull requests** (org admins may need to allow this org-wide). Sync still pushed — open PR to `main` manually. |
| CI drift | Run `pnpm run sync:figma`, commit `tokens/` + `dist/` |
| Unmapped Figma token warning | Add entry to `FIGMA_TO_TOKEN_PATH` in `token-name-map.mjs` |
| Wrong collection name | Set `FIGMA_COLLECTION="Your Set"` when running `figma-to-tokens.mjs` |
| Verify parity | `pnpm run figma:verify` then `diff figma/tokens.json dist/figma/tokens.generated.json` |

---

*Branch: `figma-ssot` · See also [workflow-and-production.md](workflow-and-production.md) for registry publishing.*
