# Role requests — how applications ask for semantic tokens

**Audience:** application teams asking for a colour role, and the design team resolving it.

[foundations-and-semantics.md](foundations-and-semantics.md) says what the semantic layer is
and why the 43 roles that exist today are not enough. This document is the mechanism for
closing that gap, and the first batch of requests, measured from two real consumers.

**Related**

| Document | Purpose |
|----------|---------|
| [foundations-and-semantics.md](foundations-and-semantics.md) | The three tiers, and why apps must not bind to primitives |
| [brands.md](brands.md) | The multi-brand model — brands as modes over one vocabulary |
| [figma-ssot.md](figma-ssot.md) | How `brands/belcorp/figma/tokens.json` becomes platform artifacts |
| [DESIGN.md](../brands/belcorp/DESIGN.md) | Every token as it exists right now (generated) |

---

## 1. The rule

> **Applications propose role NAMES. Design resolves what each role RESOLVES TO.**

A request is three things: a **name**, a **description of what the colour is for**, and a
**call-site count**. It is never a hex value, and never a primitive.

The reason is the whole argument of
[foundations-and-semantics.md §2](foundations-and-semantics.md#2-why-applications-must-not-bind-to-primitives).
The moment an application supplies the value, the role stops surviving a rebrand — the app
has re-recorded "what colour is it" under a name that claims to record "what is it for".
Design resolves the value in Figma, as an **alias to a primitive**, so the relationship is
visible to designers instead of living in a JSON diff.

Applications know something design cannot: that a particular card in the checkout flow is an
elevated surface, and that it is elevated in 340 other places too. Design knows something
applications cannot: whether "elevated" is one role or three, and what it should be in
Ésika. Neither half works alone.

### The filter

| Signal | Outcome |
|---|---|
| **Both** apps independently need the role | Semantic token. Promote. |
| **One** app needs it | Component or domain token, or stays in the consumer. |
| Neither can justify it **by role** — only by value | Stays in the frozen `color.app.*`. |

Two teams that never coordinated arriving at the same role name is the strongest evidence
available that the role is real and not a local accident. That is the bar.

## 2. The evidence

Two Android/Compose consumers, both of which independently derived a semantic layer because
the design system did not supply one.

**ffvv-android-replatform** —
`capabilities/src/main/kotlin/biz/belcorp/salesforce/capabilities/presentation/theme/ColorSemanthics.kt`
defines `object Sem` with **83 members**, each pointing at an `object Raw` of 83 hardcoded
`Color(0x…)` literals. There are **1,962 `Sem.` references across 298 `.kt` files**. It also
wires dark mode for real — `ColorThemes.kt` carries `LightColors` and `DarkColors` with 14
slots each.

**app-consultoras-replatform-android** —
`capabilities/src/main/kotlin/com/mindstix/capabilities/presentation/theme/Colors.kt` has no
`Sem` object; it exposes **21 `ColorScheme` extension properties** plus **9 domain colour
objects**. It already consumes this design system: **131 `DesignTokens.` references** and
**436 `@color/color_` references across 229 XML files**.

The shape of the finding: 83 + 21 hand-rolled roles, none of them shared, none of them
theme-safe, and both sets describing largely the same surfaces.

## 3. Already covered — free wins, zero design work

These consumer members map onto semantic tokens that **already exist**. No request needed;
both apps can migrate now.

> **Status: taken, for FFVV.** The mapping below was applied. `brands/ffvv/` now supplies
> **18** of these role names, `ColorsRaw.kt` is deleted, and `Sem` reads the published
> tokens. The remaining 65 members are fenced under `x.ffvv.*` until roles exist for them.
>
> One correction from doing it: this table reads as though FFVV could adopt Belcorp's
> *values*. It cannot — FFVV's primary is the purple that v3.0.0 replaced, and exactly one
> of its 82 colours matches a Belcorp token in value and meaning. What is shared is the
> **role name**; FFVV supplies its own value for each. That is the whole multi-brand model,
> and reading this table any other way produces a repaint. See [brands.md](brands.md).
>
> Consultoras' column below is still outstanding.

### FFVV `Sem.*`

| FFVV member | Existing DS token |
|---|---|
| `TextPrimary` | `color.text.primary` |
| `TextSecondary` | `color.text.secondary` |
| `TextTertiary` | `color.text.tertiary` |
| `TextHeading` | `color.text.primary` |
| `TextInactive` | `color.text.disabled` |
| `StateError`, `StateError2`, `StateError3` | `color.status.error` (+ `-light` / `-dark`) |
| `StateErrorContainer`, `…2`, `…3` | `color.bg.error` (+ `color.status.error-light`) |
| `StateSuccess`, `…2`, `…3` | `color.status.success` (+ `-light` / `-dark`) |
| `StateSuccessContainer`, `…2`, `…3` | `color.bg.success` (+ `color.status.success-light`) |
| `StateWarning`, `…2` | `color.status.warning` (+ `-light`) |
| `StateWarningContainer`, `…2` | `color.bg.warning` (+ `color.status.warning-light`) |
| `SurfaceBannerMontoFaltante` | `color.bg.warning` |
| `OverlayPrimary`, `OverlayLight` | `color.bg.overlay` |
| `BorderPrimary` | `color.border.default` |
| `ActionPrimary` | `color.interactive.primary.default` |
| `ActionDisabled` | `color.interactive.primary.disabled` |
| `SurfacePrimary` | `color.bg.surface` |
| `SurfaceBrandSubtle` | `color.bg.brand-subtle` |
| `EsikaBrandProfile` | `color.brand.esika` |
| `CyzoneBrandProfile` | `color.brand.cyzone` |

**About the numbered escapes.** `TextInactive2`–`TextInactive6`, `StateError2/3`,
`StateSuccess2/3`, `StateWarning2`, and the `…Container2/3` variants are not distinct roles.
They are five slightly different greys and three slightly different reds that accumulated
because there was no vocabulary to collapse them into. They land on the existing
`status-*` / `status-*-light` / `status-*-dark` ramps, or on `text.disabled` /
`text.tertiary`. **Collapsing them removes roughly 20 of FFVV's 83 members without design
authoring a single new token.** Where a numbered variant genuinely cannot collapse, that is
itself a finding worth raising — but the default assumption should be that it can.

### Consultoras `ColorScheme` extensions

| Consultoras property | Existing DS token |
|---|---|
| `textPrimary`, `primaryTextColor` | `color.text.primary` |
| `textSecondary`, `lightGreyTextColor` | `color.text.secondary` |
| `textDisabled` | `color.text.disabled` |
| `textError` | `color.text.error` |
| `textSuccess` | `color.text.success` |
| `outlineDefault` | `color.border.default` |
| `outlineDisabled` | `color.border.disabled` |
| `dividerColor`, `dividerDefault` | `color.border.default` |
| `dividerColorGrey` | `color.border.default` |
| `dividerColorBlack` | `color.border.strong` |
| `surfaceBackground` | `color.bg.surface` |
| `primaryBackground` | `color.bg.page` |
| `primaryButtonColor` | `color.interactive.primary.default` |
| `brandPrimary` | `color.bg.brand` |

For reference, the complete current semantic vocabulary — 43 tokens, verified against the
SSOT:

| Family | Count | Tokens |
|---|---:|---|
| `bg` | 11 | `brand`, `brand-subtle`, `disabled`, `error`, `info`, `overlay`, `page`, `subtle`, `success`, `surface`, `warning` |
| `status` | 12 | `error`, `error-dark`, `error-light`, `info`, `info-dark`, `info-light`, `success`, `success-dark`, `success-light`, `warning`, `warning-dark`, `warning-light` |
| `text` | 10 | `brand`, `disabled`, `error`, `info`, `inverse`, `primary`, `secondary`, `success`, `tertiary`, `warning` |
| `interactive` | 6 | `focus-ring`, `primary-active`, `primary-default`, `primary-disabled`, `primary-hover`, `primary-text` |
| `border` | 4 | `brand`, `default`, `disabled`, `strong` |

## 4. Requested new semantic roles

Everything here is backed by **both** consumers unless marked otherwise. Call-site counts are
given only where they were actually measured; where a per-member count was not gathered, the
column says so rather than guessing.

| Proposed token | Requested by | Evidence | `color.app.*` it would retire |
|---|---|---|---|
| `color.bg.elevated` | both | FFVV `SurfaceThird`, `SurfaceFour`, `SurfaceFive`; consultoras `welcomeCardBackground`. Per-member counts not gathered. | Candidates among the "slightly different white or grey" group, e.g. `app-gray-50-warm`, `app-gray-300-light`. Needs a per-token audit. |
| `color.bg.sunken` | both | FFVV `SurfaceSecondary`; consultoras' surface layering (`surfaceBackground` used against `primaryBackground`). Per-member counts not gathered. | `app-gray-50-warm` and neighbours — same audit. |
| `color.interactive.secondary.default` | both | FFVV `ActionSecondary`, `ActionPrimaryVariant`, `ActionPrimaryVariant2`; consultoras `brandSecondary` | — |
| `color.interactive.secondary.hover` | both | as above | — |
| `color.interactive.secondary.active` | both | as above | — |
| `color.interactive.secondary.disabled` | both | as above | — |
| `color.interactive.secondary.text` | both | as above | — |
| `color.border.subtle` | consultoras (primary), FFVV (implied) | consultoras `dividerSubtle`. Completes the existing `default` / `strong` ramp downward. | **`app-border-subtle`** — an exact-name duplicate already sitting in the escape hatch. Also `app-divider-dotted`, `app-divider-onboarding`. |
| `color.border.error` | consultoras | `outlineError`. The border family already has `disabled` and no `error`, which is the asymmetry. | — |
| `color.text.on-brand` | both | The white-on-brand contrast obligation. Every brand surface in both apps pairs with a text colour chosen by eye. | — |
| `color.text.on-status` | FFVV | `StateErrorContainerOn` | — |

**Count delta: 43 → 54 semantic tokens.**

The `interactive.secondary.*` set is the strongest signal in the batch. FFVV needed *three*
members to express "the non-primary action" (`ActionSecondary` plus two `ActionPrimaryVariant`
escapes), which is what a missing role looks like from the inside; consultoras arrived at the
same place from a different direction with `brandSecondary`. The existing
`interactive.primary.*` set already has exactly this five-state shape, so the secondary set is
a mechanical mirror rather than a new pattern.

`color.text.on-brand` deserves a note. `color.text.inverse` exists — but it conflates "text on
a dark surface" with "text on the brand colour". Those were the same value while the brand was
purple. After v3.0.0 moved the primary ramp to orange they are no longer obviously the same,
and there is nothing in the token name to tell a caller which of the two meanings they picked.
Splitting them is the kind of fix that only the semantic tier can make.

### Conditional — needs more evidence before promotion

| Proposed token | Evidence so far | What is missing |
|---|---|---|
| `color.bg.selected` | FFVV `SurfaceSelected`, `SurfaceBrandChecked`, `SurfaceBrandCheckedNew` | Whether consultoras has the same need. Its 436 `@color/color_` XML references have not been analysed for selection-state usage. |
| `color.border.selected` | FFVV, same three members plus `BorderPrimary` used as a checked outline | Same. |

Four FFVV members pointing at "selected" is a real signal, but it is **one app**. Under the
filter in §1 that makes it a component token, not a semantic one. Promote to semantic only if
the consultoras XML audit shows independent demand. **With both conditionals promoted the
count would be 43 → 56.** Do not author them on FFVV's evidence alone.

## 5. Domain namespaces — needs business sign-off, not design sign-off

These are not semantics. They encode business concepts, and naming them wrongly is more
expensive than leaving them in the escape hatch, because a domain namespace outlives every
redesign. They need someone who owns the *programme* to sign off on the canonical set of
levels, not someone who owns the palette.

### `tier.*` — consultant levels (~7 tokens)

Both apps model this independently:

- FFVV: `DiamondBG`, `GoldBG`, `PlatinumBG`, `SilverBG`, `BronceBG`, `PreBronceBG` (6)
- Consultoras: `ConsultantLevelColors` (7), plus `IncentiveLevelColors` (3)

**Two teams deriving the same business concept without coordinating is the strongest
promotion signal anywhere in this dataset.** What blocks it is not whether to promote but
*what the canonical level set is* — FFVV has six, consultoras has seven, and nobody in
engineering can decide which is right.

### `camino.*` — Camino Brillante (~6+ tokens)

Both apps model this too. FFVV: `ConsultantBG`, `CoralBG`, `AmbarBG`, `PerlaBG`, `TopacioBG`,
`BrigthBG` (6).

> **Reconcile `camino.*` against `tier.*` before authoring either one.**

This is the single highest-risk item in the document. Coral, Ámbar, Perla and Topacio are
gemstone/mineral names; so are the level names. If the Camino Brillante ladder and the
consultant tier ladder are the same progression under two programme names, authoring both
namespaces bakes a permanent duplication into the design system — two token families that
must be kept in sync forever by hand, which is exactly the failure mode this repository
exists to prevent.

The SSOT makes the risk concrete rather than hypothetical. `color.app.*` **already contains 24
`app-camino-*` entries**, absorbed during the Android migration:

```
ambar, ambar-deep, brillante, brillante-deep, club-card-bg, club-card-gold,
club-card-highlight, consultora, consultora-deep, coral, coral-deep, cristal,
cristal-light, diamante, diamante-light, first-level, gran-brillante,
gran-brillante-light, jade, perla-deep, rubi, rubi-light, topacio, topacio-deep
```

Two things fall out of that list:

1. **It is larger than FFVV's six.** `cristal`, `jade`, `rubi`, `gran-brillante`,
   `first-level` and the `club-card-*` group have no FFVV counterpart. FFVV's six is a subset,
   not the set. Any canonical `camino.*` must be derived from the full list, not from FFVV.
2. **`diamante` appears in `app-camino-*`, and `DiamondBG` appears in FFVV's tier group.**
   That is the overlap, in the data, not in theory. Either one of the two is misfiled, or the
   two ladders genuinely share a level — and which it is cannot be settled from code.

Note also that the SSOT has `app-camino-perla-deep` but no `app-camino-perla`, while FFVV has
`PerlaBG`. Whichever of the two is the "real" Perla is a question for the programme owner.

### `discount-scale.*` — stays in the consumer

Consultoras `DiscountScaleColors` (L1–L7) and `DiscountScaleHeaderColors` (3). **One app
only.** Under the filter this stays consumer-local until a second consumer needs it. A
seven-step scale that exists in exactly one place is a feature, not a system.

## 6. Explicitly not promoted

### Single-app component colours — stay in the consumer

FFVV: `MarkerPlanned`, `MarkerPlanned2/3/4`, `RDDCalendar`, `SellBG`, `InspiraBG`,
`InspiraMoreBG`, `InspiraIcon`, `SurfaceSuccessGradientStart`, `SurfaceSuccessGradientEnd`,
`SurfaceLevelDeep`, `SurfaceISAStart`, `SurfaceISAMid`, `SurfaceISAEnd`, `SurfaceFirstKit`,
`SurfaceSecondKit`, `SurfaceThirdKit`, `MakeUpCat`, `FragancesCat`.

Consultoras: `HomeEarningsColors` (7), `QuizColors` (10), `PdnKitColors` (2),
`BestEarningColors` (3), `BorderColors` (4 — audit against `color.border.*` first; some of
these are likely already covered by §3).

These are one screen or one component in one app. Naming them in the shared vocabulary would
mean every future brand has to supply a value for "the Inspira icon colour", which is not a
question a brand can answer.

### Delete rather than tokenise

| Member | Why |
|---|---|
| `Others` | Semantically empty. A token name that says nothing cannot be resolved by design, cannot be answered by a brand, and cannot be reviewed. |
| `WhatsApp` | A third-party brand mark. It is fixed by WhatsApp's brand guidelines, must not change in a rebrand, and belongs in an asset — not in a token file whose entire purpose is per-brand resolution. |
| `IconChevron` | A component internal. If the chevron needs its own colour, that is `color.text.tertiary` or a component token in the consumer, not a shared role. |
| The numbered variants | `TextInactive2`–`6`, `StateError2/3`, `StateSuccess2/3`, `StateWarning2`, `…Container2/3`. See §3 — they collapse onto existing ramps. |

## 7. How to submit a request

1. **The app opens a request** containing, for each proposed role: the **name**, a
   **description of what the colour is for**, and a **call-site count**. No hex values. If the
   count is unknown, say so — an unknown count is a weaker request, not a disqualified one.
2. **Design authors it in Figma** as an **alias to a primitive**, not a raw value
   ([foundations-and-semantics.md §5.4](foundations-and-semantics.md#5-what-the-design-team-needs-to-produce)).
   Design decides what it resolves to; the app does not.
3. **Export** to `brands/belcorp/figma/tokens.json`.
4. **Add the flat name to `FIGMA_TO_TOKEN_PATH`** in `pipeline/token-name-map.mjs`. That map
   currently holds **exactly 317 entries, 1:1 with the SSOT**. An unmapped name is a **hard
   build error** — `test/unmapped.test.mjs` fails and names the token.
5. `pnpm run sync && pnpm test` — regenerates every platform plus `brands/<brand>/DESIGN.md`.
6. **Minor version bump.** Adding a role is additive. *Changing what an existing role resolves
   to* is a visual change in every consumer and is not a minor bump; see
   [releasing-android.md](releasing-android.md).

**Step 4 is why design and engineering land in the same PR.** The hard error is deliberate: it
used to be a console warning, which meant a role design had authored could vanish from every
platform with nobody noticing. Now a token authored in Figma is not shippable until someone has
mapped it, and a mapping with no Figma token behind it is equally an error. Neither half of the
change can merge alone — which is the correct shape for a boundary that two teams share.

## 8. What success looks like

The measure is not the token count. It is:

- **`color.app.*` shrinking from 118.** Every retirement in the tables above is a role that
  got named. `app-border-subtle` is the cheapest one available — it is a semantic token
  already, filed in the wrong tier.
- **`Sem.` and the `ColorScheme` extensions disappearing.** 83 + 21 hand-rolled roles and
  1,962 call sites is the cost of the missing vocabulary, paid twice, in two repositories that
  cannot share a fix.
- **FFVV's `DarkColors` becoming the design system's job.** FFVV already ships a real dark
  theme with 14 slots per scheme. That work is currently unshareable because it is expressed
  in local literals. A semantic vocabulary is what would make it a mode
  ([brands.md](brands.md)) instead of one app's private effort.
