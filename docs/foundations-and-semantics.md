# Foundations and the semantic layer — what design owns

**Audience:** the design team, plus anyone deciding what belongs in this repo.

The short version: **applications must bind to semantic tokens, not to colour values or
palette positions.** That only works if the design team authors a semantic vocabulary
complete enough to describe every surface an app renders. Today it is not, and this
document says what is missing and why it matters.

**Related**

| Document | Purpose |
|----------|---------|
| [DESIGN.md](../brands/belcorp/DESIGN.md) | Every token as it exists right now (generated) |
| [figma-ssot.md](figma-ssot.md) | How `brands/belcorp/figma/tokens.json` becomes platform artifacts |
| [brands.md](brands.md) | The multi-brand model — brands, modes and `core/` |
| [releasing-android.md](releasing-android.md) | Shipping a change to an application |
| [design-system-foundations.md](../design-system-foundations.md) | The rules and release policy |

---

## 1. The three tiers

```
PRIMITIVE          primary-500 = #BE5B06
                   "a colour that exists in the palette"
                   Owner: design. Apps must NOT reference these.
     │
     ▼
SEMANTIC           bg-brand → primary-500
                   "the role this colour plays"
                   Owner: design. This is what applications consume.
     │
     ▼
COMPONENT          button-primary-bg → bg-brand
                   "the one place this role is used"
                   Owner: design, optional. Use when a component needs to
                   diverge without dragging the whole role with it.
```

The distinction that matters: **a primitive answers "what colour is it", a semantic token
answers "what is it for".** Only the second survives a rebrand.

## 2. Why applications must not bind to primitives

Suppose an app writes `colorPrimary500` wherever it needs the brand colour. Rebranding
then changes every one of those places — including the ones that were only *coincidentally*
that colour. There is no way to tell, from the token name, which usages meant "the brand"
and which meant "that particular shade". The value is centralised; the intent is not.

This is not a thought experiment here. v3.0.0 moved the primary ramp from purple to
orange, and because the app binds to `colorPrimary500`, the change could not be reviewed
by looking at the token — every call site had to be checked by hand.

Now suppose the app writes `bgBrand`. Design changes what `bg-brand` points to and every
usage is correct by construction, because each one declared its intent at the call site.

**This is the entire reason to run a design system across several applications.** Shared
primitives give you a shared palette. Only shared *semantics* give you a shared rebrand,
a shared dark mode, and a shared accessibility fix.

## 3. Who owns what

| Layer | Owner | Responsibility |
|---|---|---|
| Primitives | **Design** | The palette. Values, ramps, how many steps. |
| **Semantics** | **Design** | The vocabulary of roles, and what each maps to. |
| Component tokens | **Design** (optional) | Per-component overrides where a role is too coarse. |
| Binding UI to semantics | Engineering | Every component reads a semantic token, never a primitive. |
| `color.app.*` | Nobody — it is debt | Values absorbed from app code during migration. To be drained. |

The split to hold onto: **design decides what the roles are; engineering decides which role
a given piece of UI plays.** Neither can do the other's half. Engineering cannot invent
`bg-elevated` and have it mean anything; design cannot know that a particular card in the
checkout flow is an elevated surface.

## 4. Where we actually are

Counted from `brands/belcorp/figma/tokens.json` at the time of writing:

| Tier | Colour tokens |
|---|---:|
| `color.app.*` — absorbed one-offs | **118** |
| Primitive ramps | 75 |
| **Semantic** (`text`, `bg`, `border`, `interactive`, `status`) | **43** |
| Brand (Belcorp, Ésika, Cyzone, L'Bel) | 4 |

Two things follow from those numbers.

**The escape hatch is nearly three times the vocabulary.** `color.app.*` exists because the
Android migration absorbed every colour the app already used, at its exact value, so the
migration could be proven to change nothing visually. That was the right call for a
migration and is the wrong shape for a design system. Each of those 118 is a surface whose
*role* nobody has named.

**The Android app binds to primitives, not to the 43.** It reads `colorNeutral0` and
`colorPrimary500`. So the app is fully tokenised — no hardcoded colour survives — but a
rebrand still requires reviewing usages by hand, because the intent was never recorded.
That is the single largest gap between where the system is and what it promises.

Existing semantic families, for reference: `bg` (11), `status` (12), `text` (10),
`interactive` (6), `border` (4).

## 5. What the design team needs to produce

In rough priority order.

**5.1 Complete the vocabulary.** The current 43 cover a flat page: one background, one
surface, default borders. Real screens need more. The gaps visible from the app's one-offs:

- **Surface hierarchy** — page vs card vs sheet vs elevated vs overlaid. Many of the 118
  are "a slightly different white or grey", which is a hierarchy nobody has named.
- **Interactive states beyond primary** — secondary and tertiary actions, destructive
  actions, and the hover/pressed/disabled/focus set for each.
- **On-colour text roles** — what text is legible on a brand surface, a status surface, an
  image. This is where contrast obligations live.
- **Feature/domain colours** — the Camino Brillante level palette is a real, permanent
  design domain. It deserves proper naming, not the `color.app.*` bucket.

**5.2 Populate the multi-brand model.** ~~Decide it~~ — the shape is settled: brands are
**modes over one semantic vocabulary**, not separate token sets. A brand is a directory
under `brands/`, supplying values for shared role names; `core/` holds the geometry every
brand agrees on. See [brands.md](brands.md).

What remains is the design half, and it is the same work as 5.1: **the vocabulary those
brands would share does not exist yet.** Ésika, Cyzone and L'Bel can only become brands
once there are roles for them to supply values *for*. Adding them against today's 43
semantic tokens would force each brand to redefine primitives instead, which is the
separate-token-sets outcome wearing a different directory layout.

**5.3 Name roles, not values.** A semantic token whose name describes appearance has not
actually moved up a tier:

| Prefer | Avoid | Why |
|---|---|---|
| `bg-elevated` | `bg-white` | Stops being true in dark mode |
| `text-on-brand` | `text-white` | Ties the name to today's brand colour |
| `border-subtle` | `border-gray-200` | Names the palette position, not the intent |
| `status-error` | `red-600` | Meaning, not hue |

**5.4 Author it in Figma.** `brands/belcorp/figma/tokens.json` is the single source of truth and is
exported from Figma variables. Semantic tokens should be **aliases to primitives inside
Figma**, so the relationship is visible to designers rather than living only in a JSON
file. The pipeline preserves whatever structure Figma exports.

## 6. The rule for applications

> **An application may reference semantic tokens. It may not reference primitives.**

Primitives are for the semantic layer to consume, plus showcases and documented
exceptions. This is already stated as the golden rule in
[design-system-foundations.md](../design-system-foundations.md); what is missing is a
semantic layer complete enough to make it followable, and enforcement.

Engineering side of the contract:

- New UI binds to a semantic token. If no suitable role exists, that is a **request to
  design**, not a licence to reach for a primitive.
- `color.app.*` is frozen. Nothing new goes in; entries leave as roles are named.
- The existing primitive bindings in the Android app get migrated to semantic names as the
  vocabulary lands.

## 7. Adding a semantic token

1. Design defines the role and what it aliases, in Figma.
2. Export to `brands/belcorp/figma/tokens.json`.
3. Add the flat name to `FIGMA_TO_TOKEN_PATH` in `pipeline/token-name-map.mjs`.
   **An unmapped name now fails the build**, naming the token. It used to be skipped with
   only a console warning, which meant a role design had authored could disappear from
   every platform without anyone noticing.
4. `pnpm run sync && pnpm test`, which regenerates every platform plus `brands/<brand>/DESIGN.md`.
5. Version and release per [releasing-android.md](releasing-android.md). Adding a token is
   a minor bump; changing what an existing role points to is a visual change in every
   consumer and should be treated accordingly.

## 8. How we will know it worked

Not "how many tokens exist" — that number goes up either way. The measures that matter:

- **`color.app.*` shrinking.** It is 118. Every retirement is a role that got named.
- **Applications referencing zero primitives.** Currently the Android app is entirely
  primitive-bound.
- **A brand colour change reviewed by looking at the token, not by auditing call sites.**
  That is the whole promise, and it is testable: change `bg-brand`, and every surface that
  moves should be one that *should* have moved.
