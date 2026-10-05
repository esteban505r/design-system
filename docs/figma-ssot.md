# Figma as the single source of truth

Token **values** are authored in Tokens Studio and synced to **`tokens.json`**
at the repository root. That is one file for every brand. Tokens Studio's
folder sync (a JSON file per token set) is a Pro feature and is not the layout
this repo uses.

In the plugin, set the GitHub storage location to **file** and the path to:

```
tokens.json
```

Set the token format to **W3C DTCG** (`$value` / `$type`). The document has one
token set named `global` (spacing, radius, stroke, z-index, motion) and one set
per brand (`belcorp`, `esika`, `lbel`, `cyzone`, `ffvv`). A theme enables
`global` plus that brand. Groups inside a set are nested JSON, not extra files.

`brands/<brand>/figma/tokens.json` is still produced, as a flat export of that
brand. It is generated. Edit `tokens.json`.

---

## Pipeline

```
tokens.json                              ← SSOT (Tokens Studio file sync)
        │
        │  pnpm run parse  (pipeline/studio-to-tokens.mjs)
        ▼
core/tokens/**                           ← shared scales, from the "global" set
brands/<brand>/tokens/<mode>/**          ← that brand's colour, type, elevation
brands/<brand>/figma/tokens.json         ← flat export, generated
        │
        │  pnpm run build  (pipeline/sd.config.mjs)
        ▼
dist/<brand>/{web,android,compose,ios,flutter,json}/
        │
        ├── brands/<brand>/DESIGN.md         ← generated token reference
        └── dist/<brand>/figma/tokens.json   ← copy of the SSOT
```

**One command:** `pnpm run sync` = `parse` + `build`, for every brand.

| Script | Purpose |
|--------|---------|
| `pnpm run sync` | Full pipeline, all brands |
| `pnpm run parse` | Figma export → token tree, plus the SSOT copy under `dist/<brand>/figma/` |
| `pnpm run build` | Token tree → platform `dist/<brand>/` **and `brands/<brand>/DESIGN.md`** |
| `pnpm run figma:verify` | Regenerate the export from the token tree into `dist/<brand>/figma/tokens.generated.json` and diff it against the SSOT |

Each accepts `--brand <id>` to act on one brand. Without it, all brands are processed.

### Why the parse step writes to two places

`core/tokens/` holds the scales every brand shares — spacing, radius, stroke,
z-index, motion. A rebrand changes colour and type, not geometry, so those live
outside any brand.

Exactly one brand carries `"ownsCore": true` in its `brand.json`; its export is
what writes `core/`. Any other brand whose export disagrees with `core/` **fails
the build**, naming the files that differ, rather than silently winning or losing.
See [brands.md](brands.md).

A brand that supplies no core-category tokens at all simply inherits `core/` and
never trips the guard — that is FFVV's case, and it is the expected shape for a
brand that has colour and type but no geometry system of its own.

The reverse direction follows the same rule: **a brand's regenerated export
contains exactly what that brand authors.** `pnpm run figma:verify` includes
`core/` only for the brand that owns it. Including inherited scales for everyone
would regenerate tokens that were never in that brand's Figma file, and the
round-trip test would read them as spurious additions.

### `brands/<brand>/DESIGN.md` — generated, never authored

It is written by the `docs` platform in `pipeline/sd.config.mjs`, which runs as
part of Style Dictionary's build — so it regenerates whenever any platform output
does. Editing it does nothing; the next build overwrites it.

| When | Trigger |
|---|---|
| `pnpm run sync` | Manual, after editing a Figma export |
| `pnpm run build` | Style Dictionary rebuild on its own |
| **Sync tokens from Figma JSON** | Push touching `brands/*/figma/tokens.json`, or manual dispatch |
| **Publish Android library** / **Publish web** | Both re-run the sync from a clean checkout before publishing |
| **CI**, on PRs to `main` or `belcorp` | Re-runs the sync and **fails on any diff** |

That last row is the guarantee: a stale `DESIGN.md` blocks the PR exactly as a
stale `dist/` would, so the reference can never drift from the artifact the apps
compile against.

---

## Editing tokens

### Designers

1. Change tokens in **Tokens Studio**.
2. **Push** to GitHub. Storage location is the file `tokens.json`, not a folder.
3. Commit and push that file if the plugin did not push it itself.
4. **Sync tokens from Figma JSON** runs `pnpm run sync` and opens or updates a PR.

### Engineers (local)

```bash
# after pulling the export from design
pnpm run sync && pnpm test
git add brands/ core/ dist/ package.json
git commit -m "chore(tokens): update from Figma SSOT"
```

**Version:** releases are driven by the root **`VERSION`** file, not by the
export's `$metadata.version` — see [releasing-android.md](releasing-android.md).

---

## File format

```json
{
  "Global/Mode 1": {
    "primary-500": {
      "$value": "#7D4DBE",
      "$type": "color",
      "$extensions": { "com.figma.scopes": ["ALL_SCOPES"] }
    }
  },
  "$themes": [],
  "$metadata": { "tokenSetOrder": ["global", "Global/Mode 1"] }
}
```

Flat names (`primary-500`, `space-4`, `type-h1`) map to nested token paths via
`FIGMA_TO_TOKEN_PATH` in `pipeline/token-name-map.mjs`.

> **An unmapped name fails the build.** It used to be dropped with a console
> warning, so a designer who added a variable in Figma saw it silently vanish
> from every platform. The error names every offending token. Pass
> `--allow-unmapped` only while migrating a set deliberately.

### Exactly one token set — a multi-set export fails the build

The export must contain **one** collection (`Global/Mode 1` above). If it contains more than
one, the parse step throws, naming every candidate set with its token count:

```
Figma export has 2 token sets; expected exactly one. Found:
"Global/Mode 1" (281 tokens), "Global/Mode 1/Global/Mode 1" (272 tokens).
This usually means a bad Tokens Studio round-trip duplicated the collection.
Re-export from Figma, or pass an explicit collection name
(the collectionName option, or the FIGMA_COLLECTION env var).
```

The counts are what make the message useful: they tell you which set is the real one without
opening the file.

Those are real numbers. `resolveFigmaCollection` used to fall back to `keys[0]` whenever it
found more than one set, and commit `7812c58` on the remote is exactly that file — alongside
the genuine `"Global/Mode 1"` (281 leaves) it carries a duplicated
`"Global/Mode 1/Global/Mode 1"` (272 leaves). Ingesting the wrong one would have dropped
tokens **with no error at all**, because every name that survived is still present in
`FIGMA_TO_TOKEN_PATH`, so the unmapped-name guard never fires. Silent token loss is the worst
failure this pipeline can have, and nothing downstream would have caught it: not the parse
step, not `pnpm test`, not the Android build. A hard failure is the only safe behaviour.

**How to resolve it**

1. **Re-export from Figma.** This is almost always the right fix — the duplication is an
   artifact of the round-trip, not something design authored.
2. If the file genuinely holds several collections and you know which one you want, name it:
   `FIGMA_COLLECTION="Global/Mode 1" pnpm run parse` (or pass `collectionName`). That escape
   hatch exists so the guard never becomes a wall.

Confirm the fix by token count, not by the build going green:

```bash
node -e "const s=require('./brands/belcorp/figma/tokens.json');
const k=Object.keys(s).filter(x=>!x.startsWith('\$'));
console.log(k.map(n=>n+': '+Object.keys(s[n]).length))"
# → [ 'Global/Mode 1: 317' ]
```

> **The CI drift advice does not apply here.** When the drift gate fails it prints
> ``Run `pnpm run sync:figma` locally and commit `core/`, `brands/`, `dist/`, and
> `package.json`.`` That advice is **wrong for any drift whose cause is upstream in the Figma
> export.** Re-running sync against a damaged export does not repair it — it regenerates
> every artifact *from* the damage and asks you to commit the result, which is precisely how
> the loss above would have been made permanent. The drift gate was in fact the only check
> that would have fired, and following its instructions would have defeated it.
>
> So before running sync to "fix drift", read the diff on `brands/*/figma/tokens.json`. If
> the export itself is wrong, fix the export; sync is only the remedy when the SSOT is
> correct and the generated files have fallen behind it.

### Mapping reference (Belcorp)

| Figma name | Token path |
|------------|------------|
| `primary-500` | `color.primary.500` |
| `text-primary` | `color.text.primary` |
| `bg-page` | `color.bg.page` |
| `status-error` | `color.status.error` |
| `type-h1` | `font.size.h1` |
| `space-4` | `spacing.4` |
| `radius-md` | `radius.md` |
| `transition-fast` | `motion.duration.fast` |
| `z-modal` | `z-index.modal` |

Full map: `pipeline/token-name-map.mjs`. The table is shared across brands — it
translates a name to a path, which is brand-agnostic; the *values* are what differ.

---

## GitHub Actions

| Workflow | Trigger | Action |
|----------|---------|--------|
| **Sync tokens from Figma JSON** | Push to `brands/*/figma/tokens.json`, or manual | `pnpm run sync`, commit, open a PR |
| **CI** | PR to `main` / `belcorp` | sync → `pnpm test` → fail on drift → assemble each brand's AAR → type-check generated Swift and Dart |
| **Publish web / Android** | Manual | sync, then publish at the version in `VERSION` |

### Repo settings

1. **Settings → Actions → General → Workflow permissions**
   - **Read and write permissions**, so the bot can commit and push.
   - Check **Allow GitHub Actions to create and approve pull requests** — required for `gh pr create`. Without it you get
     `GitHub Actions is not permitted to create or approve pull requests (createPullRequest)`;
     the sync commit still lands, but you open the PR yourself.

2. **Branch protection:** require CI on PRs that change generated files.

**Org-owned repos:** the same options may be locked at
**Organization → Settings → Actions → General**, in which case an org admin must
allow PR creation for workflows.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails naming unmapped tokens | Add each to `FIGMA_TO_TOKEN_PATH` in `pipeline/token-name-map.mjs` |
| Build fails "disagrees with core/" | Two brands claim different values for a shared scale — see [brands.md](brands.md) |
| `Figma export has N token sets; expected exactly one` | A duplicated collection from a bad Tokens Studio round-trip. Re-export; only name a set explicitly if the file legitimately holds several — see above |
| CI drift | Run `pnpm run sync`, commit `core/`, `brands/`, `dist/`, `package.json` — **but first check the export is not itself the cause**, see above |
| `createPullRequest` not permitted | Enable PR creation for Actions (see repo settings above) |
| Wrong collection name | Set `FIGMA_COLLECTION="Your Set"` when running the parse step |
| Verify parity | `pnpm run figma:verify`, then diff the SSOT against `dist/<brand>/figma/tokens.generated.json`. `pnpm test` asserts this automatically. |

---

*See also [brands.md](brands.md) for the multi-brand model and
[workflow-and-production.md](workflow-and-production.md) for registry setup.*
