# Multibrand Design System — Token Reference

> ## 🤖 Automatically generated — do not edit
>
> This file is written by `pipeline/sd.config.mjs` (the `markdown/design-doc`
> format) from **`tokens.json`**, the single source of truth. Any edit you
> make here is overwritten the next time it regenerates.
>
> **To change a value:** change the token in Figma, export to
> `tokens.json`, then run `pnpm run sync`.

### When this file regenerates

| When | What triggers it |
|---|---|
| `pnpm run sync` (or `sync:figma`) | Manually, after editing `tokens.json` |
| `pnpm run build` | Style Dictionary rebuild — the `docs` platform runs with every other platform |
| **Sync tokens from Figma JSON** workflow | A push touching `tokens.json`, or manual dispatch |
| **Publish Android library** / **Publish web** | Both re-run `sync:figma` from a clean checkout before publishing |
| **CI**, on every PR to `main` or `belcorp` | Re-runs `sync:figma` and **fails the build if this file differs** from what was committed |

That last row is what keeps it honest: a stale `DESIGN.md` blocks the PR, so what you read here always matches the artifact the apps compile against.

**Version:** 6.0.1  
**Tokens:** 766  
**By type:** color 439 · dimension 283 · number 14 · fontSize 12 · duration 7 · fontFamily 4 · fontWeight 4 · cubicBezier 3

## How to reference a token

Every token below is listed with the exact identifier to type on each platform.

| Platform | Import | Example |
|---|---|---|
| Compose | `com.estebanruano.designtokens.DesignTokens` | `DesignTokens.colorTextDefault` |
| Android XML | AAR resources | `@color/color_text_default`, `@dimen/bds_spacing_4` |
| iOS (Swift) | `DesignTokens` | `DesignTokens.colorTextDefault` |
| Flutter | `design_tokens.dart` | `DesignTokens.colorTextDefault` |
| Web (CSS) | `tokens.css` | `var(--color-text-default)` |
| Web (JS) | `tokens.js` | `ColorTextDefault` |

> **Android XML naming.** Every non-colour resource — `@dimen`, `@integer`, `@string` — is prefixed `bds_`. Names like `spacing_4` or `radius_md` are generic enough that an application module could define its own, and when an app and a library declare the same resource name AGP silently resolves to the app's value. Colours are **not** prefixed: `color_*` is already distinctive and is referenced throughout the consuming apps. The exact identifier for each token is in the **Android XML** column below — copy it from there.

## Contents

- [color · action](#color--action) — 29
- [color · alert](#color--alert) — 15
- [color · alpha](#color--alpha) — 7
- [color · badge](#color--badge) — 2
- [color · border](#color--border) — 6
- [color · bottom-sheet](#color--bottom-sheet) — 4
- [color · brand](#color--brand) — 40
- [color · breadcrumb-item](#color--breadcrumb-item) — 4
- [color · breadcrumb-separator](#color--breadcrumb-separator) — 1
- [color · card](#color--card) — 4
- [color · checkbox](#color--checkbox) — 16
- [color · data](#color--data) — 4
- [color · data-table](#color--data-table) — 2
- [color · dialog](#color--dialog) — 4
- [color · disclosure](#color--disclosure) — 13
- [color · drawer](#color--drawer) — 2
- [color · feedback](#color--feedback) — 24
- [color · field](#color--field) — 19
- [color · filter-chip](#color--filter-chip) — 16
- [color · focus](#color--focus) — 2
- [color · highlight](#color--highlight) — 4
- [color · icon](#color--icon) — 9
- [color · loader](#color--loader) — 3
- [color · menu](#color--menu) — 2
- [color · menu-item](#color--menu-item) — 15
- [color · navigation-item](#color--navigation-item) — 7
- [color · neutral](#color--neutral) — 11
- [color · overlay](#color--overlay) — 2
- [color · pagination-control](#color--pagination-control) — 8
- [color · pagination-gap](#color--pagination-gap) — 1
- [color · pagination-page](#color--pagination-page) — 8
- [color · popover](#color--popover) — 4
- [color · product-card](#color--product-card) — 10
- [color · progress-bar](#color--progress-bar) — 6
- [color · promotion](#color--promotion) — 3
- [color · radio](#color--radio) — 13
- [color · segmented](#color--segmented) — 13
- [color · select-menu](#color--select-menu) — 2
- [color · select-option](#color--select-option) — 5
- [color · skeleton](#color--skeleton) — 1
- [color · state](#color--state) — 9
- [color · state-message](#color--state-message) — 2
- [color · status-tag](#color--status-tag) — 12
- [color · step-item](#color--step-item) — 14
- [color · surface](#color--surface) — 8
- [color · switch](#color--switch) — 13
- [color · table-cell](#color--table-cell) — 2
- [color · table-row](#color--table-row) — 5
- [color · tabs](#color--tabs) — 9
- [color · text](#color--text) — 7
- [color · toast](#color--toast) — 15
- [color · tooltip](#color--tooltip) — 2
- [component · accordion](#component--accordion) — 1
- [component · alert](#component--alert) — 5
- [component · badge](#component--badge) — 4
- [component · bottom-sheet](#component--bottom-sheet) — 6
- [component · breadcrumb](#component--breadcrumb) — 1
- [component · breadcrumb-item](#component--breadcrumb-item) — 4
- [component · button](#component--button) — 6
- [component · card](#component--card) — 4
- [component · checkbox](#component--checkbox) — 13
- [component · control](#component--control) — 3
- [component · data-table](#component--data-table) — 2
- [component · dialog](#component--dialog) — 7
- [component · disclosure](#component--disclosure) — 6
- [component · drawer](#component--drawer) — 6
- [component · field](#component--field) — 7
- [component · filter-chip](#component--filter-chip) — 7
- [component · icon](#component--icon) — 4
- [component · loader](#component--loader) — 6
- [component · menu](#component--menu) — 5
- [component · menu-item](#component--menu-item) — 8
- [component · navigation](#component--navigation) — 1
- [component · navigation-group](#component--navigation-group) — 2
- [component · navigation-item](#component--navigation-item) — 5
- [component · pagination](#component--pagination) — 1
- [component · pagination-control](#component--pagination-control) — 5
- [component · pagination-page](#component--pagination-page) — 3
- [component · popover](#component--popover) — 5
- [component · product-card](#component--product-card) — 6
- [component · progress-bar](#component--progress-bar) — 2
- [component · radio](#component--radio) — 14
- [component · radius](#component--radius) — 4
- [component · segmented](#component--segmented) — 9
- [component · select-menu](#component--select-menu) — 3
- [component · select-option](#component--select-option) — 5
- [component · skeleton](#component--skeleton) — 2
- [component · state-message](#component--state-message) — 4
- [component · status-tag](#component--status-tag) — 4
- [component · step-item](#component--step-item) — 6
- [component · stepper](#component--stepper) — 1
- [component · switch](#component--switch) — 14
- [component · table-cell](#component--table-cell) — 2
- [component · table-row](#component--table-row) — 2
- [component · tabs](#component--tabs) — 6
- [component · textarea](#component--textarea) — 2
- [component · toast](#component--toast) — 6
- [component · tooltip](#component--tooltip) — 5
- [font · family](#font--family) — 4
- [font · line-height](#font--line-height) — 12
- [font · size](#font--size) — 12
- [font · weight](#font--weight) — 4
- [icon · size](#icon--size) — 4
- [icon · stroke](#icon--stroke) — 4
- [layout · breakpoint](#layout--breakpoint) — 1
- [layout · compact](#layout--compact) — 4
- [layout · container](#layout--container) — 1
- [layout · viewport](#layout--viewport) — 3
- [layout · wide](#layout--wide) — 4
- [motion · duration](#motion--duration) — 7
- [motion · easing](#motion--easing) — 3
- [radius](#radius) — 6
- [size](#size) — 11
- [spacing](#spacing) — 9
- [stroke](#stroke) — 2
- [z-index](#z-index) — 6
- [z-index · level](#z-index--level) — 6

## color · action

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.action.destructive.background.default` | `{color.feedback.error.default}` | `colorActionDestructiveBackgroundDefault` | `@color/color_action_destructive_background_default` | `--color-action-destructive-background-default` |
| `color.action.destructive.background.disabled` | `{color.neutral.200}` | `colorActionDestructiveBackgroundDisabled` | `@color/color_action_destructive_background_disabled` | `--color-action-destructive-background-disabled` |
| `color.action.destructive.background.hover` | `{color.feedback.error.dark}` | `colorActionDestructiveBackgroundHover` | `@color/color_action_destructive_background_hover` | `--color-action-destructive-background-hover` |
| `color.action.destructive.background.pressed` | `{color.feedback.error.dark}` | `colorActionDestructiveBackgroundPressed` | `@color/color_action_destructive_background_pressed` | `--color-action-destructive-background-pressed` |
| `color.action.destructive.border.default` | `{color.feedback.error.default}` | `colorActionDestructiveBorderDefault` | `@color/color_action_destructive_border_default` | `--color-action-destructive-border-default` |
| `color.action.destructive.border.disabled` | `{color.neutral.300}` | `colorActionDestructiveBorderDisabled` | `@color/color_action_destructive_border_disabled` | `--color-action-destructive-border-disabled` |
| `color.action.destructive.content.default` | `{color.neutral.0}` | `colorActionDestructiveContentDefault` | `@color/color_action_destructive_content_default` | `--color-action-destructive-content-default` |
| `color.action.destructive.content.disabled` | `{color.neutral.400}` | `colorActionDestructiveContentDisabled` | `@color/color_action_destructive_content_disabled` | `--color-action-destructive-content-disabled` |
| `color.action.link.content.default` | `{color.brand.multibrand.primary.500}` | `colorActionLinkContentDefault` | `@color/color_action_link_content_default` | `--color-action-link-content-default` |
| `color.action.link.content.disabled` | `{color.neutral.400}` | `colorActionLinkContentDisabled` | `@color/color_action_link_content_disabled` | `--color-action-link-content-disabled` |
| `color.action.link.content.visited` | `{color.brand.multibrand.primary.700}` | `colorActionLinkContentVisited` | `@color/color_action_link_content_visited` | `--color-action-link-content-visited` |
| `color.action.primary.background.default` | `{color.brand.multibrand.primary.500}` | `colorActionPrimaryBackgroundDefault` | `@color/color_action_primary_background_default` | `--color-action-primary-background-default` |
| `color.action.primary.background.disabled` | `{color.neutral.200}` | `colorActionPrimaryBackgroundDisabled` | `@color/color_action_primary_background_disabled` | `--color-action-primary-background-disabled` |
| `color.action.primary.content.default` | `{color.neutral.0}` | `colorActionPrimaryContentDefault` | `@color/color_action_primary_content_default` | `--color-action-primary-content-default` |
| `color.action.primary.content.disabled` | `{color.neutral.400}` | `colorActionPrimaryContentDisabled` | `@color/color_action_primary_content_disabled` | `--color-action-primary-content-disabled` |
| `color.action.primary.state.hover` | `{color.state.on-brand.hover}` | `colorActionPrimaryStateHover` | `@color/color_action_primary_state_hover` | `--color-action-primary-state-hover` |
| `color.action.primary.state.pressed` | `{color.state.on-brand.pressed}` | `colorActionPrimaryStatePressed` | `@color/color_action_primary_state_pressed` | `--color-action-primary-state-pressed` |
| `color.action.secondary.background.default` | `{color.alpha.transparent}` | `colorActionSecondaryBackgroundDefault` | `@color/color_action_secondary_background_default` | `--color-action-secondary-background-default` |
| `color.action.secondary.background.disabled` | `{color.alpha.transparent}` | `colorActionSecondaryBackgroundDisabled` | `@color/color_action_secondary_background_disabled` | `--color-action-secondary-background-disabled` |
| `color.action.secondary.border.default` | `{color.neutral.200}` | `colorActionSecondaryBorderDefault` | `@color/color_action_secondary_border_default` | `--color-action-secondary-border-default` |
| `color.action.secondary.border.disabled` | `{color.neutral.300}` | `colorActionSecondaryBorderDisabled` | `@color/color_action_secondary_border_disabled` | `--color-action-secondary-border-disabled` |
| `color.action.secondary.content.default` | `{color.neutral.1000}` | `colorActionSecondaryContentDefault` | `@color/color_action_secondary_content_default` | `--color-action-secondary-content-default` |
| `color.action.secondary.content.disabled` | `{color.neutral.400}` | `colorActionSecondaryContentDisabled` | `@color/color_action_secondary_content_disabled` | `--color-action-secondary-content-disabled` |
| `color.action.secondary.state.hover` | `{color.state.on-surface.hover}` | `colorActionSecondaryStateHover` | `@color/color_action_secondary_state_hover` | `--color-action-secondary-state-hover` |
| `color.action.secondary.state.pressed` | `{color.state.on-surface.pressed}` | `colorActionSecondaryStatePressed` | `@color/color_action_secondary_state_pressed` | `--color-action-secondary-state-pressed` |
| `color.action.tertiary.content.default` | `{color.brand.multibrand.primary.500}` | `colorActionTertiaryContentDefault` | `@color/color_action_tertiary_content_default` | `--color-action-tertiary-content-default` |
| `color.action.tertiary.content.disabled` | `{color.neutral.400}` | `colorActionTertiaryContentDisabled` | `@color/color_action_tertiary_content_disabled` | `--color-action-tertiary-content-disabled` |
| `color.action.tertiary.state.hover` | `{color.state.on-surface.hover}` | `colorActionTertiaryStateHover` | `@color/color_action_tertiary_state_hover` | `--color-action-tertiary-state-hover` |
| `color.action.tertiary.state.pressed` | `{color.state.on-surface.pressed}` | `colorActionTertiaryStatePressed` | `@color/color_action_tertiary_state_pressed` | `--color-action-tertiary-state-pressed` |

## color · alert

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.alert.background.error` | `{color.feedback.error.background}` | `colorAlertBackgroundError` | `@color/color_alert_background_error` | `--color-alert-background-error` |
| `color.alert.background.info` | `{color.feedback.info.background}` | `colorAlertBackgroundInfo` | `@color/color_alert_background_info` | `--color-alert-background-info` |
| `color.alert.background.neutral` | `{color.surface.subtle}` | `colorAlertBackgroundNeutral` | `@color/color_alert_background_neutral` | `--color-alert-background-neutral` |
| `color.alert.background.success` | `{color.feedback.success.background}` | `colorAlertBackgroundSuccess` | `@color/color_alert_background_success` | `--color-alert-background-success` |
| `color.alert.background.warning` | `{color.feedback.warning.background}` | `colorAlertBackgroundWarning` | `@color/color_alert_background_warning` | `--color-alert-background-warning` |
| `color.alert.border.error` | `{color.feedback.error.border}` | `colorAlertBorderError` | `@color/color_alert_border_error` | `--color-alert-border-error` |
| `color.alert.border.info` | `{color.feedback.info.border}` | `colorAlertBorderInfo` | `@color/color_alert_border_info` | `--color-alert-border-info` |
| `color.alert.border.neutral` | `{color.border.default}` | `colorAlertBorderNeutral` | `@color/color_alert_border_neutral` | `--color-alert-border-neutral` |
| `color.alert.border.success` | `{color.feedback.success.border}` | `colorAlertBorderSuccess` | `@color/color_alert_border_success` | `--color-alert-border-success` |
| `color.alert.border.warning` | `{color.feedback.warning.border}` | `colorAlertBorderWarning` | `@color/color_alert_border_warning` | `--color-alert-border-warning` |
| `color.alert.content.error` | `{color.feedback.error.content}` | `colorAlertContentError` | `@color/color_alert_content_error` | `--color-alert-content-error` |
| `color.alert.content.info` | `{color.feedback.info.content}` | `colorAlertContentInfo` | `@color/color_alert_content_info` | `--color-alert-content-info` |
| `color.alert.content.neutral` | `{color.text.subtle}` | `colorAlertContentNeutral` | `@color/color_alert_content_neutral` | `--color-alert-content-neutral` |
| `color.alert.content.success` | `{color.feedback.success.content}` | `colorAlertContentSuccess` | `@color/color_alert_content_success` | `--color-alert-content-success` |
| `color.alert.content.warning` | `{color.feedback.warning.content}` | `colorAlertContentWarning` | `@color/color_alert_content_warning` | `--color-alert-content-warning` |

## color · alpha

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.alpha.black.08` | `#00000014` | `colorAlphaBlack08` | `@color/color_alpha_black_08` | `--color-alpha-black-08` |
| `color.alpha.black.12` | `#0000001f` | `colorAlphaBlack12` | `@color/color_alpha_black_12` | `--color-alpha-black-12` |
| `color.alpha.black.40` | `#00000066` | `colorAlphaBlack40` | `@color/color_alpha_black_40` | `--color-alpha-black-40` |
| `color.alpha.black.60` | `#00000099` | `colorAlphaBlack60` | `@color/color_alpha_black_60` | `--color-alpha-black-60` |
| `color.alpha.transparent` | `#ffffff00` | `colorAlphaTransparent` | `@color/color_alpha_transparent` | `--color-alpha-transparent` |
| `color.alpha.white.08` | `#ffffff14` | `colorAlphaWhite08` | `@color/color_alpha_white_08` | `--color-alpha-white-08` |
| `color.alpha.white.12` | `#ffffff1f` | `colorAlphaWhite12` | `@color/color_alpha_white_12` | `--color-alpha-white-12` |

## color · badge

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.badge.background` | `{color.feedback.error.default}` | `colorBadgeBackground` | `@color/color_badge_background` | `--color-badge-background` |
| `color.badge.content` | `{color.text.inverse}` | `colorBadgeContent` | `@color/color_badge_content` | `--color-badge-content` |

## color · border

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.border.brand` | `{color.brand.multibrand.primary.500}` | `colorBorderBrand` | `@color/color_border_brand` | `--color-border-brand` |
| `color.border.default` | `{color.neutral.200}` | `colorBorderDefault` | `@color/color_border_default` | `--color-border-default` |
| `color.border.disabled` | `{color.neutral.200}` | `colorBorderDisabled` | `@color/color_border_disabled` | `--color-border-disabled` |
| `color.border.inverse` | `{color.neutral.0}` | `colorBorderInverse` | `@color/color_border_inverse` | `--color-border-inverse` |
| `color.border.strong` | `{color.neutral.300}` | `colorBorderStrong` | `@color/color_border_strong` | `--color-border-strong` |
| `color.border.subtle` | `{color.neutral.100}` | `colorBorderSubtle` | `@color/color_border_subtle` | `--color-border-subtle` |

## color · bottom-sheet

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.bottom-sheet.background` | `{color.surface.raised}` | `colorBottomSheetBackground` | `@color/color_bottom_sheet_background` | `--color-bottom-sheet-background` |
| `color.bottom-sheet.body` | `{color.text.default}` | `colorBottomSheetBody` | `@color/color_bottom_sheet_body` | `--color-bottom-sheet-body` |
| `color.bottom-sheet.support` | `{color.text.subtle}` | `colorBottomSheetSupport` | `@color/color_bottom_sheet_support` | `--color-bottom-sheet-support` |
| `color.bottom-sheet.title` | `{color.text.default}` | `colorBottomSheetTitle` | `@color/color_bottom_sheet_title` | `--color-bottom-sheet-title` |

## color · brand

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.brand.cyzone.magenta` | `#af0061` | `colorBrandCyzoneMagenta` | `@color/color_brand_cyzone_magenta` | `--color-brand-cyzone-magenta` |
| `color.brand.cyzone.primary` | `#af0061` | `colorBrandCyzonePrimary` | `@color/color_brand_cyzone_primary` | `--color-brand-cyzone-primary` |
| `color.brand.esika.apple-red` | `#ba0000` | `colorBrandEsikaAppleRed` | `@color/color_brand_esika_apple_red` | `--color-brand-esika-apple-red` |
| `color.brand.esika.beige` | `#ffd5b6` | `colorBrandEsikaBeige` | `@color/color_brand_esika_beige` | `--color-brand-esika-beige` |
| `color.brand.esika.berry-red` | `#590015` | `colorBrandEsikaBerryRed` | `@color/color_brand_esika_berry_red` | `--color-brand-esika-berry-red` |
| `color.brand.esika.bright-yellow` | `#f0ff00` | `colorBrandEsikaBrightYellow` | `@color/color_brand_esika_bright_yellow` | `--color-brand-esika-bright-yellow` |
| `color.brand.esika.cherry-red` | `#880000` | `colorBrandEsikaCherryRed` | `@color/color_brand_esika_cherry_red` | `--color-brand-esika-cherry-red` |
| `color.brand.esika.plum` | `#3c000f` | `colorBrandEsikaPlum` | `@color/color_brand_esika_plum` | `--color-brand-esika-plum` |
| `color.brand.esika.primary` | `#ff0000` | `colorBrandEsikaPrimary` | `@color/color_brand_esika_primary` | `--color-brand-esika-primary` |
| `color.brand.lbel.gold.dark` | `#b08e4a` | `colorBrandLbelGoldDark` | `@color/color_brand_lbel_gold_dark` | `--color-brand-lbel-gold-dark` |
| `color.brand.lbel.gold.light` | `#e0c079` | `colorBrandLbelGoldLight` | `@color/color_brand_lbel_gold_light` | `--color-brand-lbel-gold-light` |
| `color.brand.lbel.primary` | `#40006b` | `colorBrandLbelPrimary` | `@color/color_brand_lbel_primary` | `--color-brand-lbel-primary` |
| `color.brand.lbel.purple.100` | `#dccdff` | `colorBrandLbelPurple100` | `@color/color_brand_lbel_purple_100` | `--color-brand-lbel-purple-100` |
| `color.brand.lbel.purple.200` | `#bea5f5` | `colorBrandLbelPurple200` | `@color/color_brand_lbel_purple_200` | `--color-brand-lbel-purple-200` |
| `color.brand.lbel.purple.300` | `#9b7edb` | `colorBrandLbelPurple300` | `@color/color_brand_lbel_purple_300` | `--color-brand-lbel-purple-300` |
| `color.brand.lbel.purple.400` | `#7d4dbe` | `colorBrandLbelPurple400` | `@color/color_brand_lbel_purple_400` | `--color-brand-lbel-purple-400` |
| `color.brand.lbel.purple.primary` | `#40006b` | `colorBrandLbelPurplePrimary` | `@color/color_brand_lbel_purple_primary` | `--color-brand-lbel-purple-primary` |
| `color.brand.multibrand.cyzone.primary` | `#af0061` | `colorBrandMultibrandCyzonePrimary` | `@color/color_brand_multibrand_cyzone_primary` | `--color-brand-multibrand-cyzone-primary` |
| `color.brand.multibrand.esika.primary` | `#e1251b` | `colorBrandMultibrandEsikaPrimary` | `@color/color_brand_multibrand_esika_primary` | `--color-brand-multibrand-esika-primary` |
| `color.brand.multibrand.lbel.primary` | `#40006b` | `colorBrandMultibrandLbelPrimary` | `@color/color_brand_multibrand_lbel_primary` | `--color-brand-multibrand-lbel-primary` |
| `color.brand.multibrand.primary.00` | `#f5f0fc` | `colorBrandMultibrandPrimary00` | `@color/color_brand_multibrand_primary_00` | `--color-brand-multibrand-primary-00` |
| `color.brand.multibrand.primary.100` | `#d6c4f2` | `colorBrandMultibrandPrimary100` | `@color/color_brand_multibrand_primary_100` | `--color-brand-multibrand-primary-100` |
| `color.brand.multibrand.primary.200` | `#b896e7` | `colorBrandMultibrandPrimary200` | `@color/color_brand_multibrand_primary_200` | `--color-brand-multibrand-primary-200` |
| `color.brand.multibrand.primary.300` | `#9d6ed9` | `colorBrandMultibrandPrimary300` | `@color/color_brand_multibrand_primary_300` | `--color-brand-multibrand-primary-300` |
| `color.brand.multibrand.primary.400` | `#8a5ace` | `colorBrandMultibrandPrimary400` | `@color/color_brand_multibrand_primary_400` | `--color-brand-multibrand-primary-400` |
| `color.brand.multibrand.primary.50` | `#ebe2f8` | `colorBrandMultibrandPrimary50` | `@color/color_brand_multibrand_primary_50` | `--color-brand-multibrand-primary-50` |
| `color.brand.multibrand.primary.500` | `#7d4dbe` | `colorBrandMultibrandPrimary500` | `@color/color_brand_multibrand_primary_500` | `--color-brand-multibrand-primary-500` |
| `color.brand.multibrand.primary.600` | `#6436ab` | `colorBrandMultibrandPrimary600` | `@color/color_brand_multibrand_primary_600` | `--color-brand-multibrand-primary-600` |
| `color.brand.multibrand.primary.700` | `#471f86` | `colorBrandMultibrandPrimary700` | `@color/color_brand_multibrand_primary_700` | `--color-brand-multibrand-primary-700` |
| `color.brand.multibrand.primary.800` | `#2d0f5e` | `colorBrandMultibrandPrimary800` | `@color/color_brand_multibrand_primary_800` | `--color-brand-multibrand-primary-800` |
| `color.brand.multibrand.secondary.00` | `#fffdf5` | `colorBrandMultibrandSecondary00` | `@color/color_brand_multibrand_secondary_00` | `--color-brand-multibrand-secondary-00` |
| `color.brand.multibrand.secondary.100` | `#ffecb3` | `colorBrandMultibrandSecondary100` | `@color/color_brand_multibrand_secondary_100` | `--color-brand-multibrand-secondary-100` |
| `color.brand.multibrand.secondary.200` | `#ffe082` | `colorBrandMultibrandSecondary200` | `@color/color_brand_multibrand_secondary_200` | `--color-brand-multibrand-secondary-200` |
| `color.brand.multibrand.secondary.300` | `#ffd54f` | `colorBrandMultibrandSecondary300` | `@color/color_brand_multibrand_secondary_300` | `--color-brand-multibrand-secondary-300` |
| `color.brand.multibrand.secondary.400` | `#ffca28` | `colorBrandMultibrandSecondary400` | `@color/color_brand_multibrand_secondary_400` | `--color-brand-multibrand-secondary-400` |
| `color.brand.multibrand.secondary.50` | `#fff8e1` | `colorBrandMultibrandSecondary50` | `@color/color_brand_multibrand_secondary_50` | `--color-brand-multibrand-secondary-50` |
| `color.brand.multibrand.secondary.500` | `#ffbd42` | `colorBrandMultibrandSecondary500` | `@color/color_brand_multibrand_secondary_500` | `--color-brand-multibrand-secondary-500` |
| `color.brand.multibrand.secondary.600` | `#ffb300` | `colorBrandMultibrandSecondary600` | `@color/color_brand_multibrand_secondary_600` | `--color-brand-multibrand-secondary-600` |
| `color.brand.multibrand.secondary.700` | `#e79b1d` | `colorBrandMultibrandSecondary700` | `@color/color_brand_multibrand_secondary_700` | `--color-brand-multibrand-secondary-700` |
| `color.brand.multibrand.secondary.800` | `#c28b30` | `colorBrandMultibrandSecondary800` | `@color/color_brand_multibrand_secondary_800` | `--color-brand-multibrand-secondary-800` |

## color · breadcrumb-item

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.breadcrumb-item.background.default` | `{color.surface.default}` | `colorBreadcrumbItemBackgroundDefault` | `@color/color_breadcrumb_item_background_default` | `--color-breadcrumb-item-background-default` |
| `color.breadcrumb-item.content.current` | `{color.text.default}` | `colorBreadcrumbItemContentCurrent` | `@color/color_breadcrumb_item_content_current` | `--color-breadcrumb-item-content-current` |
| `color.breadcrumb-item.content.link` | `{color.text.brand}` | `colorBreadcrumbItemContentLink` | `@color/color_breadcrumb_item_content_link` | `--color-breadcrumb-item-content-link` |
| `color.breadcrumb-item.focus.outer` | `{color.focus.ring.outer}` | `colorBreadcrumbItemFocusOuter` | `@color/color_breadcrumb_item_focus_outer` | `--color-breadcrumb-item-focus-outer` |

## color · breadcrumb-separator

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.breadcrumb-separator.content` | `{color.text.disabled}` | `colorBreadcrumbSeparatorContent` | `@color/color_breadcrumb_separator_content` | `--color-breadcrumb-separator-content` |

## color · card

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.card.background.default` | `{color.surface.default}` | `colorCardBackgroundDefault` | `@color/color_card_background_default` | `--color-card-background-default` |
| `color.card.background.elevated` | `{color.surface.raised}` | `colorCardBackgroundElevated` | `@color/color_card_background_elevated` | `--color-card-background-elevated` |
| `color.card.background.outlined` | `{color.surface.default}` | `colorCardBackgroundOutlined` | `@color/color_card_background_outlined` | `--color-card-background-outlined` |
| `color.card.border.outlined` | `{color.border.default}` | `colorCardBorderOutlined` | `@color/color_card_border_outlined` | `--color-card-border-outlined` |

## color · checkbox

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.checkbox.control.background.default` | `{color.surface.default}` | `colorCheckboxControlBackgroundDefault` | `@color/color_checkbox_control_background_default` | `--color-checkbox-control-background-default` |
| `color.checkbox.control.background.disabled` | `{color.surface.disabled}` | `colorCheckboxControlBackgroundDisabled` | `@color/color_checkbox_control_background_disabled` | `--color-checkbox-control-background-disabled` |
| `color.checkbox.control.background.selected` | `{color.action.primary.background.default}` | `colorCheckboxControlBackgroundSelected` | `@color/color_checkbox_control_background_selected` | `--color-checkbox-control-background-selected` |
| `color.checkbox.control.background.selected-disabled` | `{color.action.primary.background.disabled}` | `colorCheckboxControlBackgroundSelectedDisabled` | `@color/color_checkbox_control_background_selected_disabled` | `--color-checkbox-control-background-selected-disabled` |
| `color.checkbox.control.border.default` | `{color.border.strong}` | `colorCheckboxControlBorderDefault` | `@color/color_checkbox_control_border_default` | `--color-checkbox-control-border-default` |
| `color.checkbox.control.border.disabled` | `{color.border.subtle}` | `colorCheckboxControlBorderDisabled` | `@color/color_checkbox_control_border_disabled` | `--color-checkbox-control-border-disabled` |
| `color.checkbox.control.border.selected` | `{color.border.brand}` | `colorCheckboxControlBorderSelected` | `@color/color_checkbox_control_border_selected` | `--color-checkbox-control-border-selected` |
| `color.checkbox.control.mark.default` | `{color.icon.inverse}` | `colorCheckboxControlMarkDefault` | `@color/color_checkbox_control_mark_default` | `--color-checkbox-control-mark-default` |
| `color.checkbox.control.mark.disabled` | `{color.icon.inverse}` | `colorCheckboxControlMarkDisabled` | `@color/color_checkbox_control_mark_disabled` | `--color-checkbox-control-mark-disabled` |
| `color.checkbox.focus.ring` | `{color.focus.ring.outer}` | `colorCheckboxFocusRing` | `@color/color_checkbox_focus_ring` | `--color-checkbox-focus-ring` |
| `color.checkbox.group.label.default` | `{color.text.default}` | `colorCheckboxGroupLabelDefault` | `@color/color_checkbox_group_label_default` | `--color-checkbox-group-label-default` |
| `color.checkbox.group.support.default` | `{color.field.support.default}` | `colorCheckboxGroupSupportDefault` | `@color/color_checkbox_group_support_default` | `--color-checkbox-group-support-default` |
| `color.checkbox.group.support.error` | `{color.field.support.error}` | `colorCheckboxGroupSupportError` | `@color/color_checkbox_group_support_error` | `--color-checkbox-group-support-error` |
| `color.checkbox.label.default` | `{color.text.default}` | `colorCheckboxLabelDefault` | `@color/color_checkbox_label_default` | `--color-checkbox-label-default` |
| `color.checkbox.label.disabled` | `{color.text.disabled}` | `colorCheckboxLabelDisabled` | `@color/color_checkbox_label_disabled` | `--color-checkbox-label-disabled` |
| `color.checkbox.state.hover` | `{color.state.on-surface.hover}` | `colorCheckboxStateHover` | `@color/color_checkbox_state_hover` | `--color-checkbox-state-hover` |

## color · data

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.data.series.1` | `{color.brand.multibrand.primary.500}` | `colorDataSeries1` | `@color/color_data_series_1` | `--color-data-series-1` |
| `color.data.series.2` | `{color.brand.multibrand.secondary.500}` | `colorDataSeries2` | `@color/color_data_series_2` | `--color-data-series-2` |
| `color.data.series.3` | `{color.feedback.info.default}` | `colorDataSeries3` | `@color/color_data_series_3` | `--color-data-series-3` |
| `color.data.series.4` | `{color.neutral.600}` | `colorDataSeries4` | `@color/color_data_series_4` | `--color-data-series-4` |

## color · data-table

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.data-table.background` | `{color.surface.default}` | `colorDataTableBackground` | `@color/color_data_table_background` | `--color-data-table-background` |
| `color.data-table.border` | `{color.border.default}` | `colorDataTableBorder` | `@color/color_data_table_border` | `--color-data-table-border` |

## color · dialog

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.dialog.background` | `{color.surface.raised}` | `colorDialogBackground` | `@color/color_dialog_background` | `--color-dialog-background` |
| `color.dialog.body` | `{color.text.default}` | `colorDialogBody` | `@color/color_dialog_body` | `--color-dialog-body` |
| `color.dialog.support` | `{color.text.subtle}` | `colorDialogSupport` | `@color/color_dialog_support` | `--color-dialog-support` |
| `color.dialog.title` | `{color.text.default}` | `colorDialogTitle` | `@color/color_dialog_title` | `--color-dialog-title` |

## color · disclosure

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.disclosure.background.default` | `{color.surface.default}` | `colorDisclosureBackgroundDefault` | `@color/color_disclosure_background_default` | `--color-disclosure-background-default` |
| `color.disclosure.background.disabled` | `{color.surface.default}` | `colorDisclosureBackgroundDisabled` | `@color/color_disclosure_background_disabled` | `--color-disclosure-background-disabled` |
| `color.disclosure.background.focus` | `{color.surface.default}` | `colorDisclosureBackgroundFocus` | `@color/color_disclosure_background_focus` | `--color-disclosure-background-focus` |
| `color.disclosure.background.hover` | `{color.state.on-surface.hover}` | `colorDisclosureBackgroundHover` | `@color/color_disclosure_background_hover` | `--color-disclosure-background-hover` |
| `color.disclosure.background.pressed` | `{color.state.on-surface.pressed}` | `colorDisclosureBackgroundPressed` | `@color/color_disclosure_background_pressed` | `--color-disclosure-background-pressed` |
| `color.disclosure.body` | `{color.text.default}` | `colorDisclosureBody` | `@color/color_disclosure_body` | `--color-disclosure-body` |
| `color.disclosure.divider` | `{color.border.default}` | `colorDisclosureDivider` | `@color/color_disclosure_divider` | `--color-disclosure-divider` |
| `color.disclosure.focus.inner` | `{color.focus.ring.inner}` | `colorDisclosureFocusInner` | `@color/color_disclosure_focus_inner` | `--color-disclosure-focus-inner` |
| `color.disclosure.focus.outer` | `{color.focus.ring.outer}` | `colorDisclosureFocusOuter` | `@color/color_disclosure_focus_outer` | `--color-disclosure-focus-outer` |
| `color.disclosure.icon.default` | `{color.icon.default}` | `colorDisclosureIconDefault` | `@color/color_disclosure_icon_default` | `--color-disclosure-icon-default` |
| `color.disclosure.icon.disabled` | `{color.icon.disabled}` | `colorDisclosureIconDisabled` | `@color/color_disclosure_icon_disabled` | `--color-disclosure-icon-disabled` |
| `color.disclosure.title.default` | `{color.text.default}` | `colorDisclosureTitleDefault` | `@color/color_disclosure_title_default` | `--color-disclosure-title-default` |
| `color.disclosure.title.disabled` | `{color.text.disabled}` | `colorDisclosureTitleDisabled` | `@color/color_disclosure_title_disabled` | `--color-disclosure-title-disabled` |

## color · drawer

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.drawer.background` | `{color.surface.raised}` | `colorDrawerBackground` | `@color/color_drawer_background` | `--color-drawer-background` |
| `color.drawer.title` | `{color.text.default}` | `colorDrawerTitle` | `@color/color_drawer_title` | `--color-drawer-title` |

## color · feedback

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.feedback.error.background` | `{color.feedback.error.light}` | `colorFeedbackErrorBackground` | `@color/color_feedback_error_background` | `--color-feedback-error-background` |
| `color.feedback.error.border` | `{color.feedback.error.default}` | `colorFeedbackErrorBorder` | `@color/color_feedback_error_border` | `--color-feedback-error-border` |
| `color.feedback.error.content` | `{color.feedback.error.dark}` | `colorFeedbackErrorContent` | `@color/color_feedback_error_content` | `--color-feedback-error-content` |
| `color.feedback.error.dark` | `#b91c1c` | `colorFeedbackErrorDark` | `@color/color_feedback_error_dark` | `--color-feedback-error-dark` |
| `color.feedback.error.default` | `#dc2626` | `colorFeedbackErrorDefault` | `@color/color_feedback_error_default` | `--color-feedback-error-default` |
| `color.feedback.error.light` | `#fee2e2` | `colorFeedbackErrorLight` | `@color/color_feedback_error_light` | `--color-feedback-error-light` |
| `color.feedback.info.background` | `{color.feedback.info.light}` | `colorFeedbackInfoBackground` | `@color/color_feedback_info_background` | `--color-feedback-info-background` |
| `color.feedback.info.border` | `{color.feedback.info.default}` | `colorFeedbackInfoBorder` | `@color/color_feedback_info_border` | `--color-feedback-info-border` |
| `color.feedback.info.content` | `{color.feedback.info.dark}` | `colorFeedbackInfoContent` | `@color/color_feedback_info_content` | `--color-feedback-info-content` |
| `color.feedback.info.dark` | `#1245d4` | `colorFeedbackInfoDark` | `@color/color_feedback_info_dark` | `--color-feedback-info-dark` |
| `color.feedback.info.default` | `#2563eb` | `colorFeedbackInfoDefault` | `@color/color_feedback_info_default` | `--color-feedback-info-default` |
| `color.feedback.info.light` | `#dbeafe` | `colorFeedbackInfoLight` | `@color/color_feedback_info_light` | `--color-feedback-info-light` |
| `color.feedback.success.background` | `{color.feedback.success.light}` | `colorFeedbackSuccessBackground` | `@color/color_feedback_success_background` | `--color-feedback-success-background` |
| `color.feedback.success.border` | `{color.feedback.success.default}` | `colorFeedbackSuccessBorder` | `@color/color_feedback_success_border` | `--color-feedback-success-border` |
| `color.feedback.success.content` | `{color.feedback.success.dark}` | `colorFeedbackSuccessContent` | `@color/color_feedback_success_content` | `--color-feedback-success-content` |
| `color.feedback.success.dark` | `#166534` | `colorFeedbackSuccessDark` | `@color/color_feedback_success_dark` | `--color-feedback-success-dark` |
| `color.feedback.success.default` | `#16a34a` | `colorFeedbackSuccessDefault` | `@color/color_feedback_success_default` | `--color-feedback-success-default` |
| `color.feedback.success.light` | `#bbf7d0` | `colorFeedbackSuccessLight` | `@color/color_feedback_success_light` | `--color-feedback-success-light` |
| `color.feedback.warning.background` | `{color.feedback.warning.light}` | `colorFeedbackWarningBackground` | `@color/color_feedback_warning_background` | `--color-feedback-warning-background` |
| `color.feedback.warning.border` | `{color.feedback.warning.default}` | `colorFeedbackWarningBorder` | `@color/color_feedback_warning_border` | `--color-feedback-warning-border` |
| `color.feedback.warning.content` | `{color.feedback.warning.dark}` | `colorFeedbackWarningContent` | `@color/color_feedback_warning_content` | `--color-feedback-warning-content` |
| `color.feedback.warning.dark` | `#92400e` | `colorFeedbackWarningDark` | `@color/color_feedback_warning_dark` | `--color-feedback-warning-dark` |
| `color.feedback.warning.default` | `#ffb90a` | `colorFeedbackWarningDefault` | `@color/color_feedback_warning_default` | `--color-feedback-warning-default` |
| `color.feedback.warning.light` | `#fef3c7` | `colorFeedbackWarningLight` | `@color/color_feedback_warning_light` | `--color-feedback-warning-light` |

## color · field

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.field.background.default` | `{color.surface.default}` | `colorFieldBackgroundDefault` | `@color/color_field_background_default` | `--color-field-background-default` |
| `color.field.background.disabled` | `{color.surface.disabled}` | `colorFieldBackgroundDisabled` | `@color/color_field_background_disabled` | `--color-field-background-disabled` |
| `color.field.border.default` | `{color.border.default}` | `colorFieldBorderDefault` | `@color/color_field_border_default` | `--color-field-border-default` |
| `color.field.border.disabled` | `{color.border.disabled}` | `colorFieldBorderDisabled` | `@color/color_field_border_disabled` | `--color-field-border-disabled` |
| `color.field.border.error` | `{color.feedback.error.border}` | `colorFieldBorderError` | `@color/color_field_border_error` | `--color-field-border-error` |
| `color.field.border.focus` | `{color.border.brand}` | `colorFieldBorderFocus` | `@color/color_field_border_focus` | `--color-field-border-focus` |
| `color.field.border.hover` | `{color.border.strong}` | `colorFieldBorderHover` | `@color/color_field_border_hover` | `--color-field-border-hover` |
| `color.field.border.success` | `{color.feedback.success.border}` | `colorFieldBorderSuccess` | `@color/color_field_border_success` | `--color-field-border-success` |
| `color.field.content.default` | `{color.text.default}` | `colorFieldContentDefault` | `@color/color_field_content_default` | `--color-field-content-default` |
| `color.field.content.disabled` | `{color.text.disabled}` | `colorFieldContentDisabled` | `@color/color_field_content_disabled` | `--color-field-content-disabled` |
| `color.field.content.placeholder` | `{color.text.placeholder}` | `colorFieldContentPlaceholder` | `@color/color_field_content_placeholder` | `--color-field-content-placeholder` |
| `color.field.icon.default` | `{color.icon.default}` | `colorFieldIconDefault` | `@color/color_field_icon_default` | `--color-field-icon-default` |
| `color.field.icon.disabled` | `{color.icon.disabled}` | `colorFieldIconDisabled` | `@color/color_field_icon_disabled` | `--color-field-icon-disabled` |
| `color.field.label.default` | `{color.text.default}` | `colorFieldLabelDefault` | `@color/color_field_label_default` | `--color-field-label-default` |
| `color.field.label.disabled` | `{color.text.disabled}` | `colorFieldLabelDisabled` | `@color/color_field_label_disabled` | `--color-field-label-disabled` |
| `color.field.support.default` | `{color.text.subtle}` | `colorFieldSupportDefault` | `@color/color_field_support_default` | `--color-field-support-default` |
| `color.field.support.disabled` | `{color.text.disabled}` | `colorFieldSupportDisabled` | `@color/color_field_support_disabled` | `--color-field-support-disabled` |
| `color.field.support.error` | `{color.feedback.error.content}` | `colorFieldSupportError` | `@color/color_field_support_error` | `--color-field-support-error` |
| `color.field.support.success` | `{color.feedback.success.content}` | `colorFieldSupportSuccess` | `@color/color_field_support_success` | `--color-field-support-success` |

## color · filter-chip

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.filter-chip.background.default` | `{color.surface.raised}` | `colorFilterChipBackgroundDefault` | `@color/color_filter_chip_background_default` | `--color-filter-chip-background-default` |
| `color.filter-chip.background.disabled` | `{color.surface.disabled}` | `colorFilterChipBackgroundDisabled` | `@color/color_filter_chip_background_disabled` | `--color-filter-chip-background-disabled` |
| `color.filter-chip.background.hover` | `{color.state.on-surface.hover}` | `colorFilterChipBackgroundHover` | `@color/color_filter_chip_background_hover` | `--color-filter-chip-background-hover` |
| `color.filter-chip.background.selected` | `{color.state.selected.background}` | `colorFilterChipBackgroundSelected` | `@color/color_filter_chip_background_selected` | `--color-filter-chip-background-selected` |
| `color.filter-chip.background.selected-disabled` | `{color.action.primary.background.disabled}` | `colorFilterChipBackgroundSelectedDisabled` | `@color/color_filter_chip_background_selected_disabled` | `--color-filter-chip-background-selected-disabled` |
| `color.filter-chip.background.selected-hover` | `{color.state.on-brand.hover}` | `colorFilterChipBackgroundSelectedHover` | `@color/color_filter_chip_background_selected_hover` | `--color-filter-chip-background-selected-hover` |
| `color.filter-chip.border.default` | `{color.border.default}` | `colorFilterChipBorderDefault` | `@color/color_filter_chip_border_default` | `--color-filter-chip-border-default` |
| `color.filter-chip.border.disabled` | `{color.border.disabled}` | `colorFilterChipBorderDisabled` | `@color/color_filter_chip_border_disabled` | `--color-filter-chip-border-disabled` |
| `color.filter-chip.border.selected` | `{color.state.selected.border}` | `colorFilterChipBorderSelected` | `@color/color_filter_chip_border_selected` | `--color-filter-chip-border-selected` |
| `color.filter-chip.border.selected-disabled` | `{color.border.disabled}` | `colorFilterChipBorderSelectedDisabled` | `@color/color_filter_chip_border_selected_disabled` | `--color-filter-chip-border-selected-disabled` |
| `color.filter-chip.content.default` | `{color.text.default}` | `colorFilterChipContentDefault` | `@color/color_filter_chip_content_default` | `--color-filter-chip-content-default` |
| `color.filter-chip.content.disabled` | `{color.text.disabled}` | `colorFilterChipContentDisabled` | `@color/color_filter_chip_content_disabled` | `--color-filter-chip-content-disabled` |
| `color.filter-chip.content.selected` | `{color.state.selected.content}` | `colorFilterChipContentSelected` | `@color/color_filter_chip_content_selected` | `--color-filter-chip-content-selected` |
| `color.filter-chip.content.selected-disabled` | `{color.text.disabled}` | `colorFilterChipContentSelectedDisabled` | `@color/color_filter_chip_content_selected_disabled` | `--color-filter-chip-content-selected-disabled` |
| `color.filter-chip.focus.inner` | `{color.focus.ring.inner}` | `colorFilterChipFocusInner` | `@color/color_filter_chip_focus_inner` | `--color-filter-chip-focus-inner` |
| `color.filter-chip.focus.outer` | `{color.focus.ring.outer}` | `colorFilterChipFocusOuter` | `@color/color_filter_chip_focus_outer` | `--color-filter-chip-focus-outer` |

## color · focus

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.focus.ring.inner` | `{color.neutral.0}` | `colorFocusRingInner` | `@color/color_focus_ring_inner` | `--color-focus-ring-inner` |
| `color.focus.ring.outer` | `{color.brand.multibrand.primary.400}` | `colorFocusRingOuter` | `@color/color_focus_ring_outer` | `--color-focus-ring-outer` |

## color · highlight

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.highlight.background.default` | `{color.brand.multibrand.secondary.500}` | `colorHighlightBackgroundDefault` | `@color/color_highlight_background_default` | `--color-highlight-background-default` |
| `color.highlight.background.subtle` | `{color.brand.multibrand.secondary.50}` | `colorHighlightBackgroundSubtle` | `@color/color_highlight_background_subtle` | `--color-highlight-background-subtle` |
| `color.highlight.border` | `{color.brand.multibrand.secondary.600}` | `colorHighlightBorder` | `@color/color_highlight_border` | `--color-highlight-border` |
| `color.highlight.content` | `{color.neutral.900}` | `colorHighlightContent` | `@color/color_highlight_content` | `--color-highlight-content` |

## color · icon

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.icon.brand` | `{color.brand.multibrand.primary.500}` | `colorIconBrand` | `@color/color_icon_brand` | `--color-icon-brand` |
| `color.icon.default` | `{color.neutral.1000}` | `colorIconDefault` | `@color/color_icon_default` | `--color-icon-default` |
| `color.icon.disabled` | `{color.neutral.400}` | `colorIconDisabled` | `@color/color_icon_disabled` | `--color-icon-disabled` |
| `color.icon.error` | `{color.feedback.error.content}` | `colorIconError` | `@color/color_icon_error` | `--color-icon-error` |
| `color.icon.info` | `{color.feedback.info.content}` | `colorIconInfo` | `@color/color_icon_info` | `--color-icon-info` |
| `color.icon.inverse` | `{color.neutral.0}` | `colorIconInverse` | `@color/color_icon_inverse` | `--color-icon-inverse` |
| `color.icon.subtle` | `{color.neutral.600}` | `colorIconSubtle` | `@color/color_icon_subtle` | `--color-icon-subtle` |
| `color.icon.success` | `{color.feedback.success.content}` | `colorIconSuccess` | `@color/color_icon_success` | `--color-icon-success` |
| `color.icon.warning` | `{color.feedback.warning.content}` | `colorIconWarning` | `@color/color_icon_warning` | `--color-icon-warning` |

## color · loader

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.loader.content.brand` | `{color.icon.brand}` | `colorLoaderContentBrand` | `@color/color_loader_content_brand` | `--color-loader-content-brand` |
| `color.loader.content.default` | `{color.icon.default}` | `colorLoaderContentDefault` | `@color/color_loader_content_default` | `--color-loader-content-default` |
| `color.loader.content.inverse` | `{color.icon.inverse}` | `colorLoaderContentInverse` | `@color/color_loader_content_inverse` | `--color-loader-content-inverse` |

## color · menu

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.menu.background` | `{color.surface.raised}` | `colorMenuBackground` | `@color/color_menu_background` | `--color-menu-background` |
| `color.menu.border` | `{color.border.default}` | `colorMenuBorder` | `@color/color_menu_border` | `--color-menu-border` |

## color · menu-item

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.menu-item.background.default` | `{color.surface.raised}` | `colorMenuItemBackgroundDefault` | `@color/color_menu_item_background_default` | `--color-menu-item-background-default` |
| `color.menu-item.background.destructive-hover` | `{color.feedback.error.background}` | `colorMenuItemBackgroundDestructiveHover` | `@color/color_menu_item_background_destructive_hover` | `--color-menu-item-background-destructive-hover` |
| `color.menu-item.background.destructive-pressed` | `{color.feedback.error.background}` | `colorMenuItemBackgroundDestructivePressed` | `@color/color_menu_item_background_destructive_pressed` | `--color-menu-item-background-destructive-pressed` |
| `color.menu-item.background.focus` | `{color.state.on-surface.hover}` | `colorMenuItemBackgroundFocus` | `@color/color_menu_item_background_focus` | `--color-menu-item-background-focus` |
| `color.menu-item.background.hover` | `{color.state.on-surface.hover}` | `colorMenuItemBackgroundHover` | `@color/color_menu_item_background_hover` | `--color-menu-item-background-hover` |
| `color.menu-item.background.pressed` | `{color.state.on-surface.pressed}` | `colorMenuItemBackgroundPressed` | `@color/color_menu_item_background_pressed` | `--color-menu-item-background-pressed` |
| `color.menu-item.content.default` | `{color.text.default}` | `colorMenuItemContentDefault` | `@color/color_menu_item_content_default` | `--color-menu-item-content-default` |
| `color.menu-item.content.destructive` | `{color.feedback.error.content}` | `colorMenuItemContentDestructive` | `@color/color_menu_item_content_destructive` | `--color-menu-item-content-destructive` |
| `color.menu-item.content.disabled` | `{color.text.disabled}` | `colorMenuItemContentDisabled` | `@color/color_menu_item_content_disabled` | `--color-menu-item-content-disabled` |
| `color.menu-item.content.subtle` | `{color.text.subtle}` | `colorMenuItemContentSubtle` | `@color/color_menu_item_content_subtle` | `--color-menu-item-content-subtle` |
| `color.menu-item.divider` | `{color.border.subtle}` | `colorMenuItemDivider` | `@color/color_menu_item_divider` | `--color-menu-item-divider` |
| `color.menu-item.focus-ring` | `{color.focus.ring.outer}` | `colorMenuItemFocusRing` | `@color/color_menu_item_focus_ring` | `--color-menu-item-focus-ring` |
| `color.menu-item.icon.default` | `{color.icon.default}` | `colorMenuItemIconDefault` | `@color/color_menu_item_icon_default` | `--color-menu-item-icon-default` |
| `color.menu-item.icon.destructive` | `{color.feedback.error.content}` | `colorMenuItemIconDestructive` | `@color/color_menu_item_icon_destructive` | `--color-menu-item-icon-destructive` |
| `color.menu-item.icon.disabled` | `{color.icon.disabled}` | `colorMenuItemIconDisabled` | `@color/color_menu_item_icon_disabled` | `--color-menu-item-icon-disabled` |

## color · navigation-item

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.navigation-item.background.default` | `{color.surface.default}` | `colorNavigationItemBackgroundDefault` | `@color/color_navigation_item_background_default` | `--color-navigation-item-background-default` |
| `color.navigation-item.background.hover` | `{color.state.on-surface.hover}` | `colorNavigationItemBackgroundHover` | `@color/color_navigation_item_background_hover` | `--color-navigation-item-background-hover` |
| `color.navigation-item.background.selected` | `{color.surface.brand-subtle}` | `colorNavigationItemBackgroundSelected` | `@color/color_navigation_item_background_selected` | `--color-navigation-item-background-selected` |
| `color.navigation-item.content.default` | `{color.text.default}` | `colorNavigationItemContentDefault` | `@color/color_navigation_item_content_default` | `--color-navigation-item-content-default` |
| `color.navigation-item.content.disabled` | `{color.text.disabled}` | `colorNavigationItemContentDisabled` | `@color/color_navigation_item_content_disabled` | `--color-navigation-item-content-disabled` |
| `color.navigation-item.content.selected` | `{color.text.brand}` | `colorNavigationItemContentSelected` | `@color/color_navigation_item_content_selected` | `--color-navigation-item-content-selected` |
| `color.navigation-item.focus.outer` | `{color.focus.ring.outer}` | `colorNavigationItemFocusOuter` | `@color/color_navigation_item_focus_outer` | `--color-navigation-item-focus-outer` |

## color · neutral

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.neutral.0` | `#ffffff` | `colorNeutral0` | `@color/color_neutral_0` | `--color-neutral-0` |
| `color.neutral.100` | `#f6f6f6` | `colorNeutral100` | `@color/color_neutral_100` | `--color-neutral-100` |
| `color.neutral.1000` | `#000000` | `colorNeutral1000` | `@color/color_neutral_1000` | `--color-neutral-1000` |
| `color.neutral.200` | `#efefef` | `colorNeutral200` | `@color/color_neutral_200` | `--color-neutral-200` |
| `color.neutral.300` | `#c4c4c4` | `colorNeutral300` | `@color/color_neutral_300` | `--color-neutral-300` |
| `color.neutral.400` | `#949393` | `colorNeutral400` | `@color/color_neutral_400` | `--color-neutral-400` |
| `color.neutral.500` | `#777676` | `colorNeutral500` | `@color/color_neutral_500` | `--color-neutral-500` |
| `color.neutral.600` | `#545353` | `colorNeutral600` | `@color/color_neutral_600` | `--color-neutral-600` |
| `color.neutral.700` | `#3b3a3a` | `colorNeutral700` | `@color/color_neutral_700` | `--color-neutral-700` |
| `color.neutral.800` | `#212121` | `colorNeutral800` | `@color/color_neutral_800` | `--color-neutral-800` |
| `color.neutral.900` | `#111111` | `colorNeutral900` | `@color/color_neutral_900` | `--color-neutral-900` |

## color · overlay

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.overlay.scrim` | `{color.alpha.black.40}` | `colorOverlayScrim` | `@color/color_overlay_scrim` | `--color-overlay-scrim` |
| `color.overlay.strong` | `{color.alpha.black.60}` | `colorOverlayStrong` | `@color/color_overlay_strong` | `--color-overlay-strong` |

## color · pagination-control

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.pagination-control.background.default` | `{color.surface.default}` | `colorPaginationControlBackgroundDefault` | `@color/color_pagination_control_background_default` | `--color-pagination-control-background-default` |
| `color.pagination-control.background.hover` | `{color.state.on-surface.hover}` | `colorPaginationControlBackgroundHover` | `@color/color_pagination_control_background_hover` | `--color-pagination-control-background-hover` |
| `color.pagination-control.background.pressed` | `{color.state.on-surface.pressed}` | `colorPaginationControlBackgroundPressed` | `@color/color_pagination_control_background_pressed` | `--color-pagination-control-background-pressed` |
| `color.pagination-control.content.default` | `{color.text.default}` | `colorPaginationControlContentDefault` | `@color/color_pagination_control_content_default` | `--color-pagination-control-content-default` |
| `color.pagination-control.content.disabled` | `{color.text.disabled}` | `colorPaginationControlContentDisabled` | `@color/color_pagination_control_content_disabled` | `--color-pagination-control-content-disabled` |
| `color.pagination-control.focus.outer` | `{color.focus.ring.outer}` | `colorPaginationControlFocusOuter` | `@color/color_pagination_control_focus_outer` | `--color-pagination-control-focus-outer` |
| `color.pagination-control.icon.default` | `{color.icon.default}` | `colorPaginationControlIconDefault` | `@color/color_pagination_control_icon_default` | `--color-pagination-control-icon-default` |
| `color.pagination-control.icon.disabled` | `{color.icon.disabled}` | `colorPaginationControlIconDisabled` | `@color/color_pagination_control_icon_disabled` | `--color-pagination-control-icon-disabled` |

## color · pagination-gap

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.pagination-gap.content` | `{color.text.disabled}` | `colorPaginationGapContent` | `@color/color_pagination_gap_content` | `--color-pagination-gap-content` |

## color · pagination-page

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.pagination-page.background.current` | `{color.surface.brand-subtle}` | `colorPaginationPageBackgroundCurrent` | `@color/color_pagination_page_background_current` | `--color-pagination-page-background-current` |
| `color.pagination-page.background.default` | `{color.surface.default}` | `colorPaginationPageBackgroundDefault` | `@color/color_pagination_page_background_default` | `--color-pagination-page-background-default` |
| `color.pagination-page.background.hover` | `{color.state.on-surface.hover}` | `colorPaginationPageBackgroundHover` | `@color/color_pagination_page_background_hover` | `--color-pagination-page-background-hover` |
| `color.pagination-page.background.pressed` | `{color.state.on-surface.pressed}` | `colorPaginationPageBackgroundPressed` | `@color/color_pagination_page_background_pressed` | `--color-pagination-page-background-pressed` |
| `color.pagination-page.content.current` | `{color.text.brand}` | `colorPaginationPageContentCurrent` | `@color/color_pagination_page_content_current` | `--color-pagination-page-content-current` |
| `color.pagination-page.content.default` | `{color.text.default}` | `colorPaginationPageContentDefault` | `@color/color_pagination_page_content_default` | `--color-pagination-page-content-default` |
| `color.pagination-page.content.disabled` | `{color.text.disabled}` | `colorPaginationPageContentDisabled` | `@color/color_pagination_page_content_disabled` | `--color-pagination-page-content-disabled` |
| `color.pagination-page.focus.outer` | `{color.focus.ring.outer}` | `colorPaginationPageFocusOuter` | `@color/color_pagination_page_focus_outer` | `--color-pagination-page-focus-outer` |

## color · popover

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.popover.background` | `{color.surface.raised}` | `colorPopoverBackground` | `@color/color_popover_background` | `--color-popover-background` |
| `color.popover.body` | `{color.text.subtle}` | `colorPopoverBody` | `@color/color_popover_body` | `--color-popover-body` |
| `color.popover.border` | `{color.border.default}` | `colorPopoverBorder` | `@color/color_popover_border` | `--color-popover-border` |
| `color.popover.title` | `{color.text.default}` | `colorPopoverTitle` | `@color/color_popover_title` | `--color-popover-title` |

## color · product-card

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.product-card.background.available` | `{color.surface.default}` | `colorProductCardBackgroundAvailable` | `@color/color_product_card_background_available` | `--color-product-card-background-available` |
| `color.product-card.background.out-of-stock` | `{color.surface.default}` | `colorProductCardBackgroundOutOfStock` | `@color/color_product_card_background_out_of_stock` | `--color-product-card-background-out-of-stock` |
| `color.product-card.brand` | `{color.text.subtle}` | `colorProductCardBrand` | `@color/color_product_card_brand` | `--color-product-card-brand` |
| `color.product-card.focus.outer` | `{color.focus.ring.outer}` | `colorProductCardFocusOuter` | `@color/color_product_card_focus_outer` | `--color-product-card-focus-outer` |
| `color.product-card.media.background` | `{color.surface.subtle}` | `colorProductCardMediaBackground` | `@color/color_product_card_media_background` | `--color-product-card-media-background` |
| `color.product-card.name.available` | `{color.text.default}` | `colorProductCardNameAvailable` | `@color/color_product_card_name_available` | `--color-product-card-name-available` |
| `color.product-card.name.out-of-stock` | `{color.text.disabled}` | `colorProductCardNameOutOfStock` | `@color/color_product_card_name_out_of_stock` | `--color-product-card-name-out-of-stock` |
| `color.product-card.previous-price` | `{color.text.subtle}` | `colorProductCardPreviousPrice` | `@color/color_product_card_previous_price` | `--color-product-card-previous-price` |
| `color.product-card.price.available` | `{color.text.default}` | `colorProductCardPriceAvailable` | `@color/color_product_card_price_available` | `--color-product-card-price-available` |
| `color.product-card.price.out-of-stock` | `{color.text.disabled}` | `colorProductCardPriceOutOfStock` | `@color/color_product_card_price_out_of_stock` | `--color-product-card-price-out-of-stock` |

## color · progress-bar

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.progress-bar.fill.brand` | `{color.surface.brand}` | `colorProgressBarFillBrand` | `@color/color_progress_bar_fill_brand` | `--color-progress-bar-fill-brand` |
| `color.progress-bar.fill.error` | `{color.feedback.error.content}` | `colorProgressBarFillError` | `@color/color_progress_bar_fill_error` | `--color-progress-bar-fill-error` |
| `color.progress-bar.fill.success` | `{color.feedback.success.content}` | `colorProgressBarFillSuccess` | `@color/color_progress_bar_fill_success` | `--color-progress-bar-fill-success` |
| `color.progress-bar.track.brand` | `{color.surface.brand-subtle}` | `colorProgressBarTrackBrand` | `@color/color_progress_bar_track_brand` | `--color-progress-bar-track-brand` |
| `color.progress-bar.track.error` | `{color.feedback.error.background}` | `colorProgressBarTrackError` | `@color/color_progress_bar_track_error` | `--color-progress-bar-track-error` |
| `color.progress-bar.track.success` | `{color.feedback.success.background}` | `colorProgressBarTrackSuccess` | `@color/color_progress_bar_track_success` | `--color-progress-bar-track-success` |

## color · promotion

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.promotion.discount.background` | `{color.brand.multibrand.secondary.500}` | `colorPromotionDiscountBackground` | `@color/color_promotion_discount_background` | `--color-promotion-discount-background` |
| `color.promotion.discount.border` | `{color.brand.multibrand.secondary.700}` | `colorPromotionDiscountBorder` | `@color/color_promotion_discount_border` | `--color-promotion-discount-border` |
| `color.promotion.discount.content` | `{color.neutral.900}` | `colorPromotionDiscountContent` | `@color/color_promotion_discount_content` | `--color-promotion-discount-content` |

## color · radio

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.radio.control.border.default` | `{color.border.strong}` | `colorRadioControlBorderDefault` | `@color/color_radio_control_border_default` | `--color-radio-control-border-default` |
| `color.radio.control.border.disabled` | `{color.border.subtle}` | `colorRadioControlBorderDisabled` | `@color/color_radio_control_border_disabled` | `--color-radio-control-border-disabled` |
| `color.radio.control.border.hover` | `{color.border.brand}` | `colorRadioControlBorderHover` | `@color/color_radio_control_border_hover` | `--color-radio-control-border-hover` |
| `color.radio.control.border.selected` | `{color.border.brand}` | `colorRadioControlBorderSelected` | `@color/color_radio_control_border_selected` | `--color-radio-control-border-selected` |
| `color.radio.control.dot.disabled` | `{color.icon.disabled}` | `colorRadioControlDotDisabled` | `@color/color_radio_control_dot_disabled` | `--color-radio-control-dot-disabled` |
| `color.radio.control.dot.selected` | `{color.icon.brand}` | `colorRadioControlDotSelected` | `@color/color_radio_control_dot_selected` | `--color-radio-control-dot-selected` |
| `color.radio.focus.ring` | `{color.focus.ring.outer}` | `colorRadioFocusRing` | `@color/color_radio_focus_ring` | `--color-radio-focus-ring` |
| `color.radio.group.label.default` | `{color.text.default}` | `colorRadioGroupLabelDefault` | `@color/color_radio_group_label_default` | `--color-radio-group-label-default` |
| `color.radio.group.support.default` | `{color.text.subtle}` | `colorRadioGroupSupportDefault` | `@color/color_radio_group_support_default` | `--color-radio-group-support-default` |
| `color.radio.group.support.error` | `{color.feedback.error.content}` | `colorRadioGroupSupportError` | `@color/color_radio_group_support_error` | `--color-radio-group-support-error` |
| `color.radio.label.default` | `{color.text.default}` | `colorRadioLabelDefault` | `@color/color_radio_label_default` | `--color-radio-label-default` |
| `color.radio.label.disabled` | `{color.text.disabled}` | `colorRadioLabelDisabled` | `@color/color_radio_label_disabled` | `--color-radio-label-disabled` |
| `color.radio.state.hover` | `{color.state.on-surface.hover}` | `colorRadioStateHover` | `@color/color_radio_state_hover` | `--color-radio-state-hover` |

## color · segmented

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.segmented.background` | `{color.surface.subtle}` | `colorSegmentedBackground` | `@color/color_segmented_background` | `--color-segmented-background` |
| `color.segmented.focus.inner` | `{color.focus.ring.inner}` | `colorSegmentedFocusInner` | `@color/color_segmented_focus_inner` | `--color-segmented-focus-inner` |
| `color.segmented.focus.ring` | `{color.focus.ring.outer}` | `colorSegmentedFocusRing` | `@color/color_segmented_focus_ring` | `--color-segmented-focus-ring` |
| `color.segmented.item.background.default` | `{color.surface.subtle}` | `colorSegmentedItemBackgroundDefault` | `@color/color_segmented_item_background_default` | `--color-segmented-item-background-default` |
| `color.segmented.item.background.disabled` | `{color.surface.disabled}` | `colorSegmentedItemBackgroundDisabled` | `@color/color_segmented_item_background_disabled` | `--color-segmented-item-background-disabled` |
| `color.segmented.item.background.hover` | `{color.surface.raised}` | `colorSegmentedItemBackgroundHover` | `@color/color_segmented_item_background_hover` | `--color-segmented-item-background-hover` |
| `color.segmented.item.background.selected` | `{color.action.primary.background.default}` | `colorSegmentedItemBackgroundSelected` | `@color/color_segmented_item_background_selected` | `--color-segmented-item-background-selected` |
| `color.segmented.item.background.selected-disabled` | `{color.action.primary.background.disabled}` | `colorSegmentedItemBackgroundSelectedDisabled` | `@color/color_segmented_item_background_selected_disabled` | `--color-segmented-item-background-selected-disabled` |
| `color.segmented.item.content.default` | `{color.text.default}` | `colorSegmentedItemContentDefault` | `@color/color_segmented_item_content_default` | `--color-segmented-item-content-default` |
| `color.segmented.item.content.disabled` | `{color.text.disabled}` | `colorSegmentedItemContentDisabled` | `@color/color_segmented_item_content_disabled` | `--color-segmented-item-content-disabled` |
| `color.segmented.item.content.selected` | `{color.text.inverse}` | `colorSegmentedItemContentSelected` | `@color/color_segmented_item_content_selected` | `--color-segmented-item-content-selected` |
| `color.segmented.item.content.selected-disabled` | `{color.text.disabled}` | `colorSegmentedItemContentSelectedDisabled` | `@color/color_segmented_item_content_selected_disabled` | `--color-segmented-item-content-selected-disabled` |
| `color.segmented.item.state.selected-hover` | `{color.state.on-brand.hover}` | `colorSegmentedItemStateSelectedHover` | `@color/color_segmented_item_state_selected_hover` | `--color-segmented-item-state-selected-hover` |

## color · select-menu

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.select-menu.background` | `{color.surface.raised}` | `colorSelectMenuBackground` | `@color/color_select_menu_background` | `--color-select-menu-background` |
| `color.select-menu.border` | `{color.border.default}` | `colorSelectMenuBorder` | `@color/color_select_menu_border` | `--color-select-menu-border` |

## color · select-option

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.select-option.background.default` | `{color.surface.raised}` | `colorSelectOptionBackgroundDefault` | `@color/color_select_option_background_default` | `--color-select-option-background-default` |
| `color.select-option.background.hover` | `{color.surface.subtle}` | `colorSelectOptionBackgroundHover` | `@color/color_select_option_background_hover` | `--color-select-option-background-hover` |
| `color.select-option.content.default` | `{color.text.default}` | `colorSelectOptionContentDefault` | `@color/color_select_option_content_default` | `--color-select-option-content-default` |
| `color.select-option.content.disabled` | `{color.text.disabled}` | `colorSelectOptionContentDisabled` | `@color/color_select_option_content_disabled` | `--color-select-option-content-disabled` |
| `color.select-option.icon.selected` | `{color.icon.brand}` | `colorSelectOptionIconSelected` | `@color/color_select_option_icon_selected` | `--color-select-option-icon-selected` |

## color · skeleton

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.skeleton.background` | `{color.surface.subtle}` | `colorSkeletonBackground` | `@color/color_skeleton_background` | `--color-skeleton-background` |

## color · state

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.state.on-brand.hover` | `{color.alpha.white.08}` | `colorStateOnBrandHover` | `@color/color_state_on_brand_hover` | `--color-state-on-brand-hover` |
| `color.state.on-brand.pressed` | `{color.alpha.white.12}` | `colorStateOnBrandPressed` | `@color/color_state_on_brand_pressed` | `--color-state-on-brand-pressed` |
| `color.state.on-inverse.hover` | `{color.alpha.white.08}` | `colorStateOnInverseHover` | `@color/color_state_on_inverse_hover` | `--color-state-on-inverse-hover` |
| `color.state.on-inverse.pressed` | `{color.alpha.white.12}` | `colorStateOnInversePressed` | `@color/color_state_on_inverse_pressed` | `--color-state-on-inverse-pressed` |
| `color.state.on-surface.hover` | `{color.alpha.black.08}` | `colorStateOnSurfaceHover` | `@color/color_state_on_surface_hover` | `--color-state-on-surface-hover` |
| `color.state.on-surface.pressed` | `{color.alpha.black.12}` | `colorStateOnSurfacePressed` | `@color/color_state_on_surface_pressed` | `--color-state-on-surface-pressed` |
| `color.state.selected.background` | `{color.brand.multibrand.primary.50}` | `colorStateSelectedBackground` | `@color/color_state_selected_background` | `--color-state-selected-background` |
| `color.state.selected.border` | `{color.brand.multibrand.primary.500}` | `colorStateSelectedBorder` | `@color/color_state_selected_border` | `--color-state-selected-border` |
| `color.state.selected.content` | `{color.brand.multibrand.primary.700}` | `colorStateSelectedContent` | `@color/color_state_selected_content` | `--color-state-selected-content` |

## color · state-message

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.state-message.description` | `{color.text.subtle}` | `colorStateMessageDescription` | `@color/color_state_message_description` | `--color-state-message-description` |
| `color.state-message.title` | `{color.text.default}` | `colorStateMessageTitle` | `@color/color_state_message_title` | `--color-state-message-title` |

## color · status-tag

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.status-tag.background.brand` | `{color.surface.brand-subtle}` | `colorStatusTagBackgroundBrand` | `@color/color_status_tag_background_brand` | `--color-status-tag-background-brand` |
| `color.status-tag.background.error` | `{color.feedback.error.background}` | `colorStatusTagBackgroundError` | `@color/color_status_tag_background_error` | `--color-status-tag-background-error` |
| `color.status-tag.background.info` | `{color.feedback.info.background}` | `colorStatusTagBackgroundInfo` | `@color/color_status_tag_background_info` | `--color-status-tag-background-info` |
| `color.status-tag.background.neutral` | `{color.surface.subtle}` | `colorStatusTagBackgroundNeutral` | `@color/color_status_tag_background_neutral` | `--color-status-tag-background-neutral` |
| `color.status-tag.background.success` | `{color.feedback.success.background}` | `colorStatusTagBackgroundSuccess` | `@color/color_status_tag_background_success` | `--color-status-tag-background-success` |
| `color.status-tag.background.warning` | `{color.feedback.warning.background}` | `colorStatusTagBackgroundWarning` | `@color/color_status_tag_background_warning` | `--color-status-tag-background-warning` |
| `color.status-tag.content.brand` | `{color.text.brand}` | `colorStatusTagContentBrand` | `@color/color_status_tag_content_brand` | `--color-status-tag-content-brand` |
| `color.status-tag.content.error` | `{color.feedback.error.content}` | `colorStatusTagContentError` | `@color/color_status_tag_content_error` | `--color-status-tag-content-error` |
| `color.status-tag.content.info` | `{color.feedback.info.content}` | `colorStatusTagContentInfo` | `@color/color_status_tag_content_info` | `--color-status-tag-content-info` |
| `color.status-tag.content.neutral` | `{color.text.subtle}` | `colorStatusTagContentNeutral` | `@color/color_status_tag_content_neutral` | `--color-status-tag-content-neutral` |
| `color.status-tag.content.success` | `{color.feedback.success.content}` | `colorStatusTagContentSuccess` | `@color/color_status_tag_content_success` | `--color-status-tag-content-success` |
| `color.status-tag.content.warning` | `{color.feedback.warning.content}` | `colorStatusTagContentWarning` | `@color/color_status_tag_content_warning` | `--color-status-tag-content-warning` |

## color · step-item

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.step-item.connector.complete` | `{color.surface.brand}` | `colorStepItemConnectorComplete` | `@color/color_step_item_connector_complete` | `--color-step-item-connector-complete` |
| `color.step-item.connector.current` | `{color.border.default}` | `colorStepItemConnectorCurrent` | `@color/color_step_item_connector_current` | `--color-step-item-connector-current` |
| `color.step-item.connector.upcoming` | `{color.border.default}` | `colorStepItemConnectorUpcoming` | `@color/color_step_item_connector_upcoming` | `--color-step-item-connector-upcoming` |
| `color.step-item.label.complete` | `{color.text.default}` | `colorStepItemLabelComplete` | `@color/color_step_item_label_complete` | `--color-step-item-label-complete` |
| `color.step-item.label.current` | `{color.text.brand}` | `colorStepItemLabelCurrent` | `@color/color_step_item_label_current` | `--color-step-item-label-current` |
| `color.step-item.label.upcoming` | `{color.text.subtle}` | `colorStepItemLabelUpcoming` | `@color/color_step_item_label_upcoming` | `--color-step-item-label-upcoming` |
| `color.step-item.marker.background.complete` | `{color.surface.brand}` | `colorStepItemMarkerBackgroundComplete` | `@color/color_step_item_marker_background_complete` | `--color-step-item-marker-background-complete` |
| `color.step-item.marker.background.current` | `{color.surface.brand-subtle}` | `colorStepItemMarkerBackgroundCurrent` | `@color/color_step_item_marker_background_current` | `--color-step-item-marker-background-current` |
| `color.step-item.marker.background.upcoming` | `{color.surface.default}` | `colorStepItemMarkerBackgroundUpcoming` | `@color/color_step_item_marker_background_upcoming` | `--color-step-item-marker-background-upcoming` |
| `color.step-item.marker.border.current` | `{color.border.brand}` | `colorStepItemMarkerBorderCurrent` | `@color/color_step_item_marker_border_current` | `--color-step-item-marker-border-current` |
| `color.step-item.marker.border.upcoming` | `{color.border.default}` | `colorStepItemMarkerBorderUpcoming` | `@color/color_step_item_marker_border_upcoming` | `--color-step-item-marker-border-upcoming` |
| `color.step-item.marker.content.complete` | `{color.action.primary.content.default}` | `colorStepItemMarkerContentComplete` | `@color/color_step_item_marker_content_complete` | `--color-step-item-marker-content-complete` |
| `color.step-item.marker.content.current` | `{color.text.brand}` | `colorStepItemMarkerContentCurrent` | `@color/color_step_item_marker_content_current` | `--color-step-item-marker-content-current` |
| `color.step-item.marker.content.upcoming` | `{color.text.subtle}` | `colorStepItemMarkerContentUpcoming` | `@color/color_step_item_marker_content_upcoming` | `--color-step-item-marker-content-upcoming` |

## color · surface

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.surface.brand` | `{color.brand.multibrand.primary.500}` | `colorSurfaceBrand` | `@color/color_surface_brand` | `--color-surface-brand` |
| `color.surface.brand-subtle` | `{color.brand.multibrand.primary.50}` | `colorSurfaceBrandSubtle` | `@color/color_surface_brand_subtle` | `--color-surface-brand-subtle` |
| `color.surface.default` | `{color.neutral.0}` | `colorSurfaceDefault` | `@color/color_surface_default` | `--color-surface-default` |
| `color.surface.disabled` | `{color.neutral.100}` | `colorSurfaceDisabled` | `@color/color_surface_disabled` | `--color-surface-disabled` |
| `color.surface.inverse` | `{color.neutral.1000}` | `colorSurfaceInverse` | `@color/color_surface_inverse` | `--color-surface-inverse` |
| `color.surface.page` | `{color.neutral.100}` | `colorSurfacePage` | `@color/color_surface_page` | `--color-surface-page` |
| `color.surface.raised` | `{color.neutral.0}` | `colorSurfaceRaised` | `@color/color_surface_raised` | `--color-surface-raised` |
| `color.surface.subtle` | `{color.neutral.100}` | `colorSurfaceSubtle` | `@color/color_surface_subtle` | `--color-surface-subtle` |

## color · switch

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.switch.focus.ring` | `{color.focus.ring.outer}` | `colorSwitchFocusRing` | `@color/color_switch_focus_ring` | `--color-switch-focus-ring` |
| `color.switch.label.default` | `{color.text.default}` | `colorSwitchLabelDefault` | `@color/color_switch_label_default` | `--color-switch-label-default` |
| `color.switch.label.disabled` | `{color.text.disabled}` | `colorSwitchLabelDisabled` | `@color/color_switch_label_disabled` | `--color-switch-label-disabled` |
| `color.switch.state.off-hover` | `{color.state.on-surface.hover}` | `colorSwitchStateOffHover` | `@color/color_switch_state_off_hover` | `--color-switch-state-off-hover` |
| `color.switch.state.on-hover` | `{color.state.on-brand.hover}` | `colorSwitchStateOnHover` | `@color/color_switch_state_on_hover` | `--color-switch-state-on-hover` |
| `color.switch.support.default` | `{color.text.subtle}` | `colorSwitchSupportDefault` | `@color/color_switch_support_default` | `--color-switch-support-default` |
| `color.switch.support.disabled` | `{color.text.disabled}` | `colorSwitchSupportDisabled` | `@color/color_switch_support_disabled` | `--color-switch-support-disabled` |
| `color.switch.thumb.background.default` | `{color.surface.default}` | `colorSwitchThumbBackgroundDefault` | `@color/color_switch_thumb_background_default` | `--color-switch-thumb-background-default` |
| `color.switch.thumb.background.disabled` | `{color.surface.default}` | `colorSwitchThumbBackgroundDisabled` | `@color/color_switch_thumb_background_disabled` | `--color-switch-thumb-background-disabled` |
| `color.switch.track.background.off` | `{color.border.default}` | `colorSwitchTrackBackgroundOff` | `@color/color_switch_track_background_off` | `--color-switch-track-background-off` |
| `color.switch.track.background.off-disabled` | `{color.surface.disabled}` | `colorSwitchTrackBackgroundOffDisabled` | `@color/color_switch_track_background_off_disabled` | `--color-switch-track-background-off-disabled` |
| `color.switch.track.background.on` | `{color.action.primary.background.default}` | `colorSwitchTrackBackgroundOn` | `@color/color_switch_track_background_on` | `--color-switch-track-background-on` |
| `color.switch.track.background.on-disabled` | `{color.action.primary.background.disabled}` | `colorSwitchTrackBackgroundOnDisabled` | `@color/color_switch_track_background_on_disabled` | `--color-switch-track-background-on-disabled` |

## color · table-cell

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.table-cell.text.data` | `{color.text.default}` | `colorTableCellTextData` | `@color/color_table_cell_text_data` | `--color-table-cell-text-data` |
| `color.table-cell.text.header` | `{color.text.default}` | `colorTableCellTextHeader` | `@color/color_table_cell_text_header` | `--color-table-cell-text-header` |

## color · table-row

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.table-row.background.default` | `{color.surface.default}` | `colorTableRowBackgroundDefault` | `@color/color_table_row_background_default` | `--color-table-row-background-default` |
| `color.table-row.background.header` | `{color.surface.subtle}` | `colorTableRowBackgroundHeader` | `@color/color_table_row_background_header` | `--color-table-row-background-header` |
| `color.table-row.background.hover` | `{color.state.on-surface.hover}` | `colorTableRowBackgroundHover` | `@color/color_table_row_background_hover` | `--color-table-row-background-hover` |
| `color.table-row.background.selected` | `{color.surface.brand-subtle}` | `colorTableRowBackgroundSelected` | `@color/color_table_row_background_selected` | `--color-table-row-background-selected` |
| `color.table-row.divider` | `{color.border.subtle}` | `colorTableRowDivider` | `@color/color_table_row_divider` | `--color-table-row-divider` |

## color · tabs

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.tabs.container.divider` | `{color.border.subtle}` | `colorTabsContainerDivider` | `@color/color_tabs_container_divider` | `--color-tabs-container-divider` |
| `color.tabs.focus.inner` | `{color.focus.ring.inner}` | `colorTabsFocusInner` | `@color/color_tabs_focus_inner` | `--color-tabs-focus-inner` |
| `color.tabs.focus.outer` | `{color.focus.ring.outer}` | `colorTabsFocusOuter` | `@color/color_tabs_focus_outer` | `--color-tabs-focus-outer` |
| `color.tabs.item.background.hover` | `{color.state.on-surface.hover}` | `colorTabsItemBackgroundHover` | `@color/color_tabs_item_background_hover` | `--color-tabs-item-background-hover` |
| `color.tabs.item.content.active` | `{color.text.brand}` | `colorTabsItemContentActive` | `@color/color_tabs_item_content_active` | `--color-tabs-item-content-active` |
| `color.tabs.item.content.default` | `{color.text.subtle}` | `colorTabsItemContentDefault` | `@color/color_tabs_item_content_default` | `--color-tabs-item-content-default` |
| `color.tabs.item.content.disabled` | `{color.text.disabled}` | `colorTabsItemContentDisabled` | `@color/color_tabs_item_content_disabled` | `--color-tabs-item-content-disabled` |
| `color.tabs.item.indicator` | `{color.border.brand}` | `colorTabsItemIndicator` | `@color/color_tabs_item_indicator` | `--color-tabs-item-indicator` |
| `color.tabs.item.indicator-disabled` | `{color.border.disabled}` | `colorTabsItemIndicatorDisabled` | `@color/color_tabs_item_indicator_disabled` | `--color-tabs-item-indicator-disabled` |

## color · text

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.text.brand` | `{color.brand.multibrand.primary.500}` | `colorTextBrand` | `@color/color_text_brand` | `--color-text-brand` |
| `color.text.default` | `{color.neutral.1000}` | `colorTextDefault` | `@color/color_text_default` | `--color-text-default` |
| `color.text.disabled` | `{color.neutral.400}` | `colorTextDisabled` | `@color/color_text_disabled` | `--color-text-disabled` |
| `color.text.inverse` | `{color.neutral.0}` | `colorTextInverse` | `@color/color_text_inverse` | `--color-text-inverse` |
| `color.text.placeholder` | `{color.neutral.500}` | `colorTextPlaceholder` | `@color/color_text_placeholder` | `--color-text-placeholder` |
| `color.text.subtle` | `{color.neutral.600}` | `colorTextSubtle` | `@color/color_text_subtle` | `--color-text-subtle` |
| `color.text.tertiary` | `{color.neutral.400}` | `colorTextTertiary` | `@color/color_text_tertiary` | `--color-text-tertiary` |

## color · toast

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.toast.background.error` | `{color.feedback.error.background}` | `colorToastBackgroundError` | `@color/color_toast_background_error` | `--color-toast-background-error` |
| `color.toast.background.info` | `{color.feedback.info.background}` | `colorToastBackgroundInfo` | `@color/color_toast_background_info` | `--color-toast-background-info` |
| `color.toast.background.neutral` | `{color.surface.subtle}` | `colorToastBackgroundNeutral` | `@color/color_toast_background_neutral` | `--color-toast-background-neutral` |
| `color.toast.background.success` | `{color.feedback.success.background}` | `colorToastBackgroundSuccess` | `@color/color_toast_background_success` | `--color-toast-background-success` |
| `color.toast.background.warning` | `{color.feedback.warning.background}` | `colorToastBackgroundWarning` | `@color/color_toast_background_warning` | `--color-toast-background-warning` |
| `color.toast.border.error` | `{color.feedback.error.border}` | `colorToastBorderError` | `@color/color_toast_border_error` | `--color-toast-border-error` |
| `color.toast.border.info` | `{color.feedback.info.border}` | `colorToastBorderInfo` | `@color/color_toast_border_info` | `--color-toast-border-info` |
| `color.toast.border.neutral` | `{color.border.default}` | `colorToastBorderNeutral` | `@color/color_toast_border_neutral` | `--color-toast-border-neutral` |
| `color.toast.border.success` | `{color.feedback.success.border}` | `colorToastBorderSuccess` | `@color/color_toast_border_success` | `--color-toast-border-success` |
| `color.toast.border.warning` | `{color.feedback.warning.border}` | `colorToastBorderWarning` | `@color/color_toast_border_warning` | `--color-toast-border-warning` |
| `color.toast.content.error` | `{color.feedback.error.content}` | `colorToastContentError` | `@color/color_toast_content_error` | `--color-toast-content-error` |
| `color.toast.content.info` | `{color.feedback.info.content}` | `colorToastContentInfo` | `@color/color_toast_content_info` | `--color-toast-content-info` |
| `color.toast.content.neutral` | `{color.text.subtle}` | `colorToastContentNeutral` | `@color/color_toast_content_neutral` | `--color-toast-content-neutral` |
| `color.toast.content.success` | `{color.feedback.success.content}` | `colorToastContentSuccess` | `@color/color_toast_content_success` | `--color-toast-content-success` |
| `color.toast.content.warning` | `{color.feedback.warning.content}` | `colorToastContentWarning` | `@color/color_toast_content_warning` | `--color-toast-content-warning` |

## color · tooltip

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.tooltip.background` | `{color.surface.inverse}` | `colorTooltipBackground` | `@color/color_tooltip_background` | `--color-tooltip-background` |
| `color.tooltip.content` | `{color.text.inverse}` | `colorTooltipContent` | `@color/color_tooltip_content` | `--color-tooltip-content` |

## component · accordion

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.accordion.gap` | `{spacing.2}` | `componentAccordionGap` | `@dimen/bds_component_accordion_gap` | `--component-accordion-gap` |

## component · alert

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.alert.min-height` | `{spacing.8}` | `componentAlertMinHeight` | `@dimen/bds_component_alert_min_height` | `--component-alert-min-height` |
| `component.alert.padding-block` | `{spacing.3}` | `componentAlertPaddingBlock` | `@dimen/bds_component_alert_padding_block` | `--component-alert-padding-block` |
| `component.alert.padding-inline` | `{spacing.4}` | `componentAlertPaddingInline` | `@dimen/bds_component_alert_padding_inline` | `--component-alert-padding-inline` |
| `component.alert.radius` | `{radius.md}` | `componentAlertRadius` | `@dimen/bds_component_alert_radius` | `--component-alert-radius` |
| `component.alert.stroke` | `{stroke.1}` | `componentAlertStroke` | `@dimen/bds_component_alert_stroke` | `--component-alert-stroke` |

## component · badge

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.badge.height` | `{size.16}` | `componentBadgeHeight` | `@dimen/bds_component_badge_height` | `--component-badge-height` |
| `component.badge.min-width` | `{size.16}` | `componentBadgeMinWidth` | `@dimen/bds_component_badge_min_width` | `--component-badge-min-width` |
| `component.badge.padding-inline` | `{spacing.1}` | `componentBadgePaddingInline` | `@dimen/bds_component_badge_padding_inline` | `--component-badge-padding-inline` |
| `component.badge.radius` | `{radius.full}` | `componentBadgeRadius` | `@dimen/bds_component_badge_radius` | `--component-badge-radius` |

## component · bottom-sheet

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.bottom-sheet.actions-gap` | `{spacing.2}` | `componentBottomSheetActionsGap` | `@dimen/bds_component_bottom_sheet_actions_gap` | `--component-bottom-sheet-actions-gap` |
| `component.bottom-sheet.gap` | `{spacing.4}` | `componentBottomSheetGap` | `@dimen/bds_component_bottom_sheet_gap` | `--component-bottom-sheet-gap` |
| `component.bottom-sheet.header-gap` | `{spacing.2}` | `componentBottomSheetHeaderGap` | `@dimen/bds_component_bottom_sheet_header_gap` | `--component-bottom-sheet-header-gap` |
| `component.bottom-sheet.min-height` | `160px` | `componentBottomSheetMinHeight` | `@dimen/bds_component_bottom_sheet_min_height` | `--component-bottom-sheet-min-height` |
| `component.bottom-sheet.padding` | `{spacing.4}` | `componentBottomSheetPadding` | `@dimen/bds_component_bottom_sheet_padding` | `--component-bottom-sheet-padding` |
| `component.bottom-sheet.radius` | `{component.radius.overlay}` | `componentBottomSheetRadius` | `@dimen/bds_component_bottom_sheet_radius` | `--component-bottom-sheet-radius` |

## component · breadcrumb

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.breadcrumb.gap` | `{spacing.1}` | `componentBreadcrumbGap` | `@dimen/bds_component_breadcrumb_gap` | `--component-breadcrumb-gap` |

## component · breadcrumb-item

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.breadcrumb-item.focus-stroke` | `{stroke.2}` | `componentBreadcrumbItemFocusStroke` | `@dimen/bds_component_breadcrumb_item_focus_stroke` | `--component-breadcrumb-item-focus-stroke` |
| `component.breadcrumb-item.min-height` | `{size.32}` | `componentBreadcrumbItemMinHeight` | `@dimen/bds_component_breadcrumb_item_min_height` | `--component-breadcrumb-item-min-height` |
| `component.breadcrumb-item.padding-inline` | `{spacing.1}` | `componentBreadcrumbItemPaddingInline` | `@dimen/bds_component_breadcrumb_item_padding_inline` | `--component-breadcrumb-item-padding-inline` |
| `component.breadcrumb-item.radius` | `{radius.sm}` | `componentBreadcrumbItemRadius` | `@dimen/bds_component_breadcrumb_item_radius` | `--component-breadcrumb-item-radius` |

## component · button

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.button.gap.lg` | `{spacing.2}` | `componentButtonGapLg` | `@dimen/bds_component_button_gap_lg` | `--component-button-gap-lg` |
| `component.button.gap.md` | `{spacing.2}` | `componentButtonGapMd` | `@dimen/bds_component_button_gap_md` | `--component-button-gap-md` |
| `component.button.gap.sm` | `{spacing.1}` | `componentButtonGapSm` | `@dimen/bds_component_button_gap_sm` | `--component-button-gap-sm` |
| `component.button.padding-inline.lg` | `{spacing.5}` | `componentButtonPaddingInlineLg` | `@dimen/bds_component_button_padding_inline_lg` | `--component-button-padding-inline-lg` |
| `component.button.padding-inline.md` | `{spacing.4}` | `componentButtonPaddingInlineMd` | `@dimen/bds_component_button_padding_inline_md` | `--component-button-padding-inline-md` |
| `component.button.padding-inline.sm` | `{spacing.3}` | `componentButtonPaddingInlineSm` | `@dimen/bds_component_button_padding_inline_sm` | `--component-button-padding-inline-sm` |

## component · card

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.card.gap` | `{spacing.3}` | `componentCardGap` | `@dimen/bds_component_card_gap` | `--component-card-gap` |
| `component.card.padding` | `{spacing.4}` | `componentCardPadding` | `@dimen/bds_component_card_padding` | `--component-card-padding` |
| `component.card.radius` | `{component.radius.surface}` | `componentCardRadius` | `@dimen/bds_component_card_radius` | `--component-card-radius` |
| `component.card.stroke` | `{stroke.1}` | `componentCardStroke` | `@dimen/bds_component_card_stroke` | `--component-card-stroke` |

## component · checkbox

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.checkbox.control.radius` | `{radius.sm}` | `componentCheckboxControlRadius` | `@dimen/bds_component_checkbox_control_radius` | `--component-checkbox-control-radius` |
| `component.checkbox.control.size.lg` | `{component.radio.control.size.lg}` | `componentCheckboxControlSizeLg` | `@dimen/bds_component_checkbox_control_size_lg` | `--component-checkbox-control-size-lg` |
| `component.checkbox.control.size.md` | `{component.radio.control.size.md}` | `componentCheckboxControlSizeMd` | `@dimen/bds_component_checkbox_control_size_md` | `--component-checkbox-control-size-md` |
| `component.checkbox.control.stroke` | `{stroke.2}` | `componentCheckboxControlStroke` | `@dimen/bds_component_checkbox_control_stroke` | `--component-checkbox-control-stroke` |
| `component.checkbox.focus.stroke` | `{stroke.2}` | `componentCheckboxFocusStroke` | `@dimen/bds_component_checkbox_focus_stroke` | `--component-checkbox-focus-stroke` |
| `component.checkbox.group.gap` | `{component.radio.group.gap}` | `componentCheckboxGroupGap` | `@dimen/bds_component_checkbox_group_gap` | `--component-checkbox-group-gap` |
| `component.checkbox.group.label-gap` | `{component.radio.group.label-gap}` | `componentCheckboxGroupLabelGap` | `@dimen/bds_component_checkbox_group_label_gap` | `--component-checkbox-group-label-gap` |
| `component.checkbox.item.gap` | `{component.radio.item.gap}` | `componentCheckboxItemGap` | `@dimen/bds_component_checkbox_item_gap` | `--component-checkbox-item-gap` |
| `component.checkbox.item.min-height.lg` | `{component.radio.item.min-height.lg}` | `componentCheckboxItemMinHeightLg` | `@dimen/bds_component_checkbox_item_min_height_lg` | `--component-checkbox-item-min-height-lg` |
| `component.checkbox.item.min-height.md` | `{component.radio.item.min-height.md}` | `componentCheckboxItemMinHeightMd` | `@dimen/bds_component_checkbox_item_min_height_md` | `--component-checkbox-item-min-height-md` |
| `component.checkbox.item.padding-block.lg` | `{component.radio.item.padding-block.lg}` | `componentCheckboxItemPaddingBlockLg` | `@dimen/bds_component_checkbox_item_padding_block_lg` | `--component-checkbox-item-padding-block-lg` |
| `component.checkbox.item.padding-block.md` | `{component.radio.item.padding-block.md}` | `componentCheckboxItemPaddingBlockMd` | `@dimen/bds_component_checkbox_item_padding_block_md` | `--component-checkbox-item-padding-block-md` |
| `component.checkbox.item.padding-inline` | `{component.radio.item.padding-inline}` | `componentCheckboxItemPaddingInline` | `@dimen/bds_component_checkbox_item_padding_inline` | `--component-checkbox-item-padding-inline` |

## component · control

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.control.size.lg` | `{size.48}` | `componentControlSizeLg` | `@dimen/bds_component_control_size_lg` | `--component-control-size-lg` |
| `component.control.size.md` | `{size.40}` | `componentControlSizeMd` | `@dimen/bds_component_control_size_md` | `--component-control-size-md` |
| `component.control.size.sm` | `{size.32}` | `componentControlSizeSm` | `@dimen/bds_component_control_size_sm` | `--component-control-size-sm` |

## component · data-table

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.data-table.radius` | `{component.radius.surface}` | `componentDataTableRadius` | `@dimen/bds_component_data_table_radius` | `--component-data-table-radius` |
| `component.data-table.stroke` | `{stroke.1}` | `componentDataTableStroke` | `@dimen/bds_component_data_table_stroke` | `--component-data-table-stroke` |

## component · dialog

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.dialog.actions-gap` | `{spacing.2}` | `componentDialogActionsGap` | `@dimen/bds_component_dialog_actions_gap` | `--component-dialog-actions-gap` |
| `component.dialog.gap` | `{spacing.4}` | `componentDialogGap` | `@dimen/bds_component_dialog_gap` | `--component-dialog-gap` |
| `component.dialog.header-gap` | `{spacing.2}` | `componentDialogHeaderGap` | `@dimen/bds_component_dialog_header_gap` | `--component-dialog-header-gap` |
| `component.dialog.max-width` | `600px` | `componentDialogMaxWidth` | `@dimen/bds_component_dialog_max_width` | `--component-dialog-max-width` |
| `component.dialog.min-width` | `320px` | `componentDialogMinWidth` | `@dimen/bds_component_dialog_min_width` | `--component-dialog-min-width` |
| `component.dialog.padding` | `{spacing.5}` | `componentDialogPadding` | `@dimen/bds_component_dialog_padding` | `--component-dialog-padding` |
| `component.dialog.radius` | `{component.radius.overlay}` | `componentDialogRadius` | `@dimen/bds_component_dialog_radius` | `--component-dialog-radius` |

## component · disclosure

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.disclosure.content-gap` | `{spacing.2}` | `componentDisclosureContentGap` | `@dimen/bds_component_disclosure_content_gap` | `--component-disclosure-content-gap` |
| `component.disclosure.focus-stroke` | `{stroke.2}` | `componentDisclosureFocusStroke` | `@dimen/bds_component_disclosure_focus_stroke` | `--component-disclosure-focus-stroke` |
| `component.disclosure.min-height` | `{component.control.size.lg}` | `componentDisclosureMinHeight` | `@dimen/bds_component_disclosure_min_height` | `--component-disclosure-min-height` |
| `component.disclosure.padding-block` | `{spacing.3}` | `componentDisclosurePaddingBlock` | `@dimen/bds_component_disclosure_padding_block` | `--component-disclosure-padding-block` |
| `component.disclosure.padding-inline` | `{spacing.4}` | `componentDisclosurePaddingInline` | `@dimen/bds_component_disclosure_padding_inline` | `--component-disclosure-padding-inline` |
| `component.disclosure.radius` | `{radius.md}` | `componentDisclosureRadius` | `@dimen/bds_component_disclosure_radius` | `--component-disclosure-radius` |

## component · drawer

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.drawer.actions-gap` | `{spacing.2}` | `componentDrawerActionsGap` | `@dimen/bds_component_drawer_actions_gap` | `--component-drawer-actions-gap` |
| `component.drawer.gap` | `{spacing.4}` | `componentDrawerGap` | `@dimen/bds_component_drawer_gap` | `--component-drawer-gap` |
| `component.drawer.header-gap` | `{spacing.2}` | `componentDrawerHeaderGap` | `@dimen/bds_component_drawer_header_gap` | `--component-drawer-header-gap` |
| `component.drawer.padding` | `{spacing.4}` | `componentDrawerPadding` | `@dimen/bds_component_drawer_padding` | `--component-drawer-padding` |
| `component.drawer.radius` | `{radius.none}` | `componentDrawerRadius` | `@dimen/bds_component_drawer_radius` | `--component-drawer-radius` |
| `component.drawer.width` | `380px` | `componentDrawerWidth` | `@dimen/bds_component_drawer_width` | `--component-drawer-width` |

## component · field

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.field.content-gap.lg` | `{spacing.2}` | `componentFieldContentGapLg` | `@dimen/bds_component_field_content_gap_lg` | `--component-field-content-gap-lg` |
| `component.field.content-gap.md` | `{spacing.2}` | `componentFieldContentGapMd` | `@dimen/bds_component_field_content_gap_md` | `--component-field-content-gap-md` |
| `component.field.height.lg` | `{component.control.size.lg}` | `componentFieldHeightLg` | `@dimen/bds_component_field_height_lg` | `--component-field-height-lg` |
| `component.field.height.md` | `{component.control.size.md}` | `componentFieldHeightMd` | `@dimen/bds_component_field_height_md` | `--component-field-height-md` |
| `component.field.padding-inline.lg` | `{spacing.4}` | `componentFieldPaddingInlineLg` | `@dimen/bds_component_field_padding_inline_lg` | `--component-field-padding-inline-lg` |
| `component.field.padding-inline.md` | `{spacing.3}` | `componentFieldPaddingInlineMd` | `@dimen/bds_component_field_padding_inline_md` | `--component-field-padding-inline-md` |
| `component.field.stack-gap` | `{spacing.1}` | `componentFieldStackGap` | `@dimen/bds_component_field_stack_gap` | `--component-field-stack-gap` |

## component · filter-chip

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.filter-chip.focus.stroke` | `{stroke.2}` | `componentFilterChipFocusStroke` | `@dimen/bds_component_filter_chip_focus_stroke` | `--component-filter-chip-focus-stroke` |
| `component.filter-chip.height.md` | `{component.control.size.md}` | `componentFilterChipHeightMd` | `@dimen/bds_component_filter_chip_height_md` | `--component-filter-chip-height-md` |
| `component.filter-chip.height.sm` | `{size.32}` | `componentFilterChipHeightSm` | `@dimen/bds_component_filter_chip_height_sm` | `--component-filter-chip-height-sm` |
| `component.filter-chip.padding-inline.md` | `{spacing.4}` | `componentFilterChipPaddingInlineMd` | `@dimen/bds_component_filter_chip_padding_inline_md` | `--component-filter-chip-padding-inline-md` |
| `component.filter-chip.padding-inline.sm` | `{spacing.3}` | `componentFilterChipPaddingInlineSm` | `@dimen/bds_component_filter_chip_padding_inline_sm` | `--component-filter-chip-padding-inline-sm` |
| `component.filter-chip.radius` | `{radius.full}` | `componentFilterChipRadius` | `@dimen/bds_component_filter_chip_radius` | `--component-filter-chip-radius` |
| `component.filter-chip.stroke` | `{stroke.1}` | `componentFilterChipStroke` | `@dimen/bds_component_filter_chip_stroke` | `--component-filter-chip-stroke` |

## component · icon

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.icon.size.16` | `{size.16}` | `componentIconSize16` | `@dimen/bds_component_icon_size_16` | `--component-icon-size-16` |
| `component.icon.size.20` | `{size.20}` | `componentIconSize20` | `@dimen/bds_component_icon_size_20` | `--component-icon-size-20` |
| `component.icon.size.24` | `{size.24}` | `componentIconSize24` | `@dimen/bds_component_icon_size_24` | `--component-icon-size-24` |
| `component.icon.size.32` | `{size.32}` | `componentIconSize32` | `@dimen/bds_component_icon_size_32` | `--component-icon-size-32` |

## component · loader

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.loader.size.lg` | `{size.24}` | `componentLoaderSizeLg` | `@dimen/bds_component_loader_size_lg` | `--component-loader-size-lg` |
| `component.loader.size.md` | `{size.20}` | `componentLoaderSizeMd` | `@dimen/bds_component_loader_size_md` | `--component-loader-size-md` |
| `component.loader.size.sm` | `{size.16}` | `componentLoaderSizeSm` | `@dimen/bds_component_loader_size_sm` | `--component-loader-size-sm` |
| `component.loader.stroke-width.lg` | `{stroke.2}` | `componentLoaderStrokeWidthLg` | `@dimen/bds_component_loader_stroke_width_lg` | `--component-loader-stroke-width-lg` |
| `component.loader.stroke-width.md` | `1.75px` | `componentLoaderStrokeWidthMd` | `@dimen/bds_component_loader_stroke_width_md` | `--component-loader-stroke-width-md` |
| `component.loader.stroke-width.sm` | `1.5px` | `componentLoaderStrokeWidthSm` | `@dimen/bds_component_loader_stroke_width_sm` | `--component-loader-stroke-width-sm` |

## component · menu

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.menu.max-width` | `320px` | `componentMenuMaxWidth` | `@dimen/bds_component_menu_max_width` | `--component-menu-max-width` |
| `component.menu.min-width` | `160px` | `componentMenuMinWidth` | `@dimen/bds_component_menu_min_width` | `--component-menu-min-width` |
| `component.menu.padding` | `{spacing.2}` | `componentMenuPadding` | `@dimen/bds_component_menu_padding` | `--component-menu-padding` |
| `component.menu.radius` | `{radius.lg}` | `componentMenuRadius` | `@dimen/bds_component_menu_radius` | `--component-menu-radius` |
| `component.menu.stroke` | `{stroke.1}` | `componentMenuStroke` | `@dimen/bds_component_menu_stroke` | `--component-menu-stroke` |

## component · menu-item

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.menu-item.content-gap` | `{spacing.1}` | `componentMenuItemContentGap` | `@dimen/bds_component_menu_item_content_gap` | `--component-menu-item-content-gap` |
| `component.menu-item.divider-stroke` | `{stroke.1}` | `componentMenuItemDividerStroke` | `@dimen/bds_component_menu_item_divider_stroke` | `--component-menu-item-divider-stroke` |
| `component.menu-item.focus-stroke` | `{stroke.2}` | `componentMenuItemFocusStroke` | `@dimen/bds_component_menu_item_focus_stroke` | `--component-menu-item-focus-stroke` |
| `component.menu-item.gap` | `{spacing.3}` | `componentMenuItemGap` | `@dimen/bds_component_menu_item_gap` | `--component-menu-item-gap` |
| `component.menu-item.min-height` | `{component.control.size.lg}` | `componentMenuItemMinHeight` | `@dimen/bds_component_menu_item_min_height` | `--component-menu-item-min-height` |
| `component.menu-item.padding-block` | `{spacing.2}` | `componentMenuItemPaddingBlock` | `@dimen/bds_component_menu_item_padding_block` | `--component-menu-item-padding-block` |
| `component.menu-item.padding-inline` | `{spacing.3}` | `componentMenuItemPaddingInline` | `@dimen/bds_component_menu_item_padding_inline` | `--component-menu-item-padding-inline` |
| `component.menu-item.radius` | `{radius.md}` | `componentMenuItemRadius` | `@dimen/bds_component_menu_item_radius` | `--component-menu-item-radius` |

## component · navigation

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.navigation.gap` | `{spacing.2}` | `componentNavigationGap` | `@dimen/bds_component_navigation_gap` | `--component-navigation-gap` |

## component · navigation-group

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.navigation-group.gap` | `{spacing.1}` | `componentNavigationGroupGap` | `@dimen/bds_component_navigation_group_gap` | `--component-navigation-group-gap` |
| `component.navigation-group.label-gap` | `{spacing.2}` | `componentNavigationGroupLabelGap` | `@dimen/bds_component_navigation_group_label_gap` | `--component-navigation-group-label-gap` |

## component · navigation-item

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.navigation-item.focus-stroke` | `{stroke.2}` | `componentNavigationItemFocusStroke` | `@dimen/bds_component_navigation_item_focus_stroke` | `--component-navigation-item-focus-stroke` |
| `component.navigation-item.gap` | `{spacing.2}` | `componentNavigationItemGap` | `@dimen/bds_component_navigation_item_gap` | `--component-navigation-item-gap` |
| `component.navigation-item.min-height` | `{component.control.size.lg}` | `componentNavigationItemMinHeight` | `@dimen/bds_component_navigation_item_min_height` | `--component-navigation-item-min-height` |
| `component.navigation-item.padding-inline` | `{spacing.3}` | `componentNavigationItemPaddingInline` | `@dimen/bds_component_navigation_item_padding_inline` | `--component-navigation-item-padding-inline` |
| `component.navigation-item.radius` | `{radius.md}` | `componentNavigationItemRadius` | `@dimen/bds_component_navigation_item_radius` | `--component-navigation-item-radius` |

## component · pagination

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.pagination.gap` | `{spacing.2}` | `componentPaginationGap` | `@dimen/bds_component_pagination_gap` | `--component-pagination-gap` |

## component · pagination-control

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.pagination-control.focus-stroke` | `{stroke.2}` | `componentPaginationControlFocusStroke` | `@dimen/bds_component_pagination_control_focus_stroke` | `--component-pagination-control-focus-stroke` |
| `component.pagination-control.gap` | `{spacing.1}` | `componentPaginationControlGap` | `@dimen/bds_component_pagination_control_gap` | `--component-pagination-control-gap` |
| `component.pagination-control.min-height` | `{component.control.size.md}` | `componentPaginationControlMinHeight` | `@dimen/bds_component_pagination_control_min_height` | `--component-pagination-control-min-height` |
| `component.pagination-control.padding-inline` | `{spacing.2}` | `componentPaginationControlPaddingInline` | `@dimen/bds_component_pagination_control_padding_inline` | `--component-pagination-control-padding-inline` |
| `component.pagination-control.radius` | `{radius.md}` | `componentPaginationControlRadius` | `@dimen/bds_component_pagination_control_radius` | `--component-pagination-control-radius` |

## component · pagination-page

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.pagination-page.focus-stroke` | `{stroke.2}` | `componentPaginationPageFocusStroke` | `@dimen/bds_component_pagination_page_focus_stroke` | `--component-pagination-page-focus-stroke` |
| `component.pagination-page.radius` | `{radius.md}` | `componentPaginationPageRadius` | `@dimen/bds_component_pagination_page_radius` | `--component-pagination-page-radius` |
| `component.pagination-page.size` | `{component.control.size.md}` | `componentPaginationPageSize` | `@dimen/bds_component_pagination_page_size` | `--component-pagination-page-size` |

## component · popover

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.popover.gap` | `{spacing.2}` | `componentPopoverGap` | `@dimen/bds_component_popover_gap` | `--component-popover-gap` |
| `component.popover.max-width` | `320px` | `componentPopoverMaxWidth` | `@dimen/bds_component_popover_max_width` | `--component-popover-max-width` |
| `component.popover.padding` | `{spacing.4}` | `componentPopoverPadding` | `@dimen/bds_component_popover_padding` | `--component-popover-padding` |
| `component.popover.radius` | `{radius.lg}` | `componentPopoverRadius` | `@dimen/bds_component_popover_radius` | `--component-popover-radius` |
| `component.popover.stroke` | `{stroke.1}` | `componentPopoverStroke` | `@dimen/bds_component_popover_stroke` | `--component-popover-stroke` |

## component · product-card

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.product-card.content-gap` | `{spacing.1}` | `componentProductCardContentGap` | `@dimen/bds_component_product_card_content_gap` | `--component-product-card-content-gap` |
| `component.product-card.focus-stroke` | `{stroke.2}` | `componentProductCardFocusStroke` | `@dimen/bds_component_product_card_focus_stroke` | `--component-product-card-focus-stroke` |
| `component.product-card.gap` | `{spacing.2}` | `componentProductCardGap` | `@dimen/bds_component_product_card_gap` | `--component-product-card-gap` |
| `component.product-card.media-radius` | `{radius.md}` | `componentProductCardMediaRadius` | `@dimen/bds_component_product_card_media_radius` | `--component-product-card-media-radius` |
| `component.product-card.padding` | `{spacing.3}` | `componentProductCardPadding` | `@dimen/bds_component_product_card_padding` | `--component-product-card-padding` |
| `component.product-card.radius` | `{component.radius.surface}` | `componentProductCardRadius` | `@dimen/bds_component_product_card_radius` | `--component-product-card-radius` |

## component · progress-bar

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.progress-bar.height` | `{spacing.2}` | `componentProgressBarHeight` | `@dimen/bds_component_progress_bar_height` | `--component-progress-bar-height` |
| `component.progress-bar.radius` | `{radius.full}` | `componentProgressBarRadius` | `@dimen/bds_component_progress_bar_radius` | `--component-progress-bar-radius` |

## component · radio

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.radio.control.dot.lg` | `{size.12}` | `componentRadioControlDotLg` | `@dimen/bds_component_radio_control_dot_lg` | `--component-radio-control-dot-lg` |
| `component.radio.control.dot.md` | `{size.10}` | `componentRadioControlDotMd` | `@dimen/bds_component_radio_control_dot_md` | `--component-radio-control-dot-md` |
| `component.radio.control.size.lg` | `{component.icon.size.24}` | `componentRadioControlSizeLg` | `@dimen/bds_component_radio_control_size_lg` | `--component-radio-control-size-lg` |
| `component.radio.control.size.md` | `{component.icon.size.20}` | `componentRadioControlSizeMd` | `@dimen/bds_component_radio_control_size_md` | `--component-radio-control-size-md` |
| `component.radio.control.stroke` | `{stroke.2}` | `componentRadioControlStroke` | `@dimen/bds_component_radio_control_stroke` | `--component-radio-control-stroke` |
| `component.radio.focus.stroke` | `{stroke.2}` | `componentRadioFocusStroke` | `@dimen/bds_component_radio_focus_stroke` | `--component-radio-focus-stroke` |
| `component.radio.group.gap` | `{spacing.1}` | `componentRadioGroupGap` | `@dimen/bds_component_radio_group_gap` | `--component-radio-group-gap` |
| `component.radio.group.label-gap` | `{spacing.2}` | `componentRadioGroupLabelGap` | `@dimen/bds_component_radio_group_label_gap` | `--component-radio-group-label-gap` |
| `component.radio.item.gap` | `{spacing.2}` | `componentRadioItemGap` | `@dimen/bds_component_radio_item_gap` | `--component-radio-item-gap` |
| `component.radio.item.min-height.lg` | `{component.control.size.lg}` | `componentRadioItemMinHeightLg` | `@dimen/bds_component_radio_item_min_height_lg` | `--component-radio-item-min-height-lg` |
| `component.radio.item.min-height.md` | `{component.control.size.md}` | `componentRadioItemMinHeightMd` | `@dimen/bds_component_radio_item_min_height_md` | `--component-radio-item-min-height-md` |
| `component.radio.item.padding-block.lg` | `{size.12}` | `componentRadioItemPaddingBlockLg` | `@dimen/bds_component_radio_item_padding_block_lg` | `--component-radio-item-padding-block-lg` |
| `component.radio.item.padding-block.md` | `{size.10}` | `componentRadioItemPaddingBlockMd` | `@dimen/bds_component_radio_item_padding_block_md` | `--component-radio-item-padding-block-md` |
| `component.radio.item.padding-inline` | `{spacing.2}` | `componentRadioItemPaddingInline` | `@dimen/bds_component_radio_item_padding_inline` | `--component-radio-item-padding-inline` |

## component · radius

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.radius.control` | `{radius.md}` | `componentRadiusControl` | `@dimen/bds_component_radius_control` | `--component-radius-control` |
| `component.radius.overlay` | `{radius.xl}` | `componentRadiusOverlay` | `@dimen/bds_component_radius_overlay` | `--component-radius-overlay` |
| `component.radius.round` | `{radius.full}` | `componentRadiusRound` | `@dimen/bds_component_radius_round` | `--component-radius-round` |
| `component.radius.surface` | `{radius.lg}` | `componentRadiusSurface` | `@dimen/bds_component_radius_surface` | `--component-radius-surface` |

## component · segmented

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.segmented.container.gap` | `{spacing.1}` | `componentSegmentedContainerGap` | `@dimen/bds_component_segmented_container_gap` | `--component-segmented-container-gap` |
| `component.segmented.container.padding` | `{spacing.1}` | `componentSegmentedContainerPadding` | `@dimen/bds_component_segmented_container_padding` | `--component-segmented-container-padding` |
| `component.segmented.container.radius` | `{radius.lg}` | `componentSegmentedContainerRadius` | `@dimen/bds_component_segmented_container_radius` | `--component-segmented-container-radius` |
| `component.segmented.focus.stroke` | `{stroke.2}` | `componentSegmentedFocusStroke` | `@dimen/bds_component_segmented_focus_stroke` | `--component-segmented-focus-stroke` |
| `component.segmented.item.height.lg` | `{component.control.size.lg}` | `componentSegmentedItemHeightLg` | `@dimen/bds_component_segmented_item_height_lg` | `--component-segmented-item-height-lg` |
| `component.segmented.item.height.md` | `{component.control.size.md}` | `componentSegmentedItemHeightMd` | `@dimen/bds_component_segmented_item_height_md` | `--component-segmented-item-height-md` |
| `component.segmented.item.padding-inline.lg` | `{spacing.4}` | `componentSegmentedItemPaddingInlineLg` | `@dimen/bds_component_segmented_item_padding_inline_lg` | `--component-segmented-item-padding-inline-lg` |
| `component.segmented.item.padding-inline.md` | `{spacing.3}` | `componentSegmentedItemPaddingInlineMd` | `@dimen/bds_component_segmented_item_padding_inline_md` | `--component-segmented-item-padding-inline-md` |
| `component.segmented.item.radius` | `{radius.md}` | `componentSegmentedItemRadius` | `@dimen/bds_component_segmented_item_radius` | `--component-segmented-item-radius` |

## component · select-menu

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.select-menu.gap` | `{spacing.1}` | `componentSelectMenuGap` | `@dimen/bds_component_select_menu_gap` | `--component-select-menu-gap` |
| `component.select-menu.padding` | `{spacing.1}` | `componentSelectMenuPadding` | `@dimen/bds_component_select_menu_padding` | `--component-select-menu-padding` |
| `component.select-menu.radius` | `{component.radius.overlay}` | `componentSelectMenuRadius` | `@dimen/bds_component_select_menu_radius` | `--component-select-menu-radius` |

## component · select-option

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.select-option.gap` | `{spacing.2}` | `componentSelectOptionGap` | `@dimen/bds_component_select_option_gap` | `--component-select-option-gap` |
| `component.select-option.height.lg` | `{component.control.size.lg}` | `componentSelectOptionHeightLg` | `@dimen/bds_component_select_option_height_lg` | `--component-select-option-height-lg` |
| `component.select-option.height.md` | `{component.control.size.md}` | `componentSelectOptionHeightMd` | `@dimen/bds_component_select_option_height_md` | `--component-select-option-height-md` |
| `component.select-option.padding-inline.lg` | `{spacing.4}` | `componentSelectOptionPaddingInlineLg` | `@dimen/bds_component_select_option_padding_inline_lg` | `--component-select-option-padding-inline-lg` |
| `component.select-option.padding-inline.md` | `{spacing.3}` | `componentSelectOptionPaddingInlineMd` | `@dimen/bds_component_select_option_padding_inline_md` | `--component-select-option-padding-inline-md` |

## component · skeleton

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.skeleton.radius.block` | `{radius.md}` | `componentSkeletonRadiusBlock` | `@dimen/bds_component_skeleton_radius_block` | `--component-skeleton-radius-block` |
| `component.skeleton.radius.circle` | `{radius.full}` | `componentSkeletonRadiusCircle` | `@dimen/bds_component_skeleton_radius_circle` | `--component-skeleton-radius-circle` |

## component · state-message

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.state-message.actions-gap` | `{spacing.2}` | `componentStateMessageActionsGap` | `@dimen/bds_component_state_message_actions_gap` | `--component-state-message-actions-gap` |
| `component.state-message.content-gap` | `{spacing.2}` | `componentStateMessageContentGap` | `@dimen/bds_component_state_message_content_gap` | `--component-state-message-content-gap` |
| `component.state-message.max-width` | `480px` | `componentStateMessageMaxWidth` | `@dimen/bds_component_state_message_max_width` | `--component-state-message-max-width` |
| `component.state-message.visual-gap` | `{spacing.4}` | `componentStateMessageVisualGap` | `@dimen/bds_component_state_message_visual_gap` | `--component-state-message-visual-gap` |

## component · status-tag

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.status-tag.height.md` | `{size.24}` | `componentStatusTagHeightMd` | `@dimen/bds_component_status_tag_height_md` | `--component-status-tag-height-md` |
| `component.status-tag.height.sm` | `{size.20}` | `componentStatusTagHeightSm` | `@dimen/bds_component_status_tag_height_sm` | `--component-status-tag-height-sm` |
| `component.status-tag.padding-inline` | `{spacing.2}` | `componentStatusTagPaddingInline` | `@dimen/bds_component_status_tag_padding_inline` | `--component-status-tag-padding-inline` |
| `component.status-tag.radius` | `{radius.full}` | `componentStatusTagRadius` | `@dimen/bds_component_status_tag_radius` | `--component-status-tag-radius` |

## component · step-item

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.step-item.connector-thickness` | `{stroke.2}` | `componentStepItemConnectorThickness` | `@dimen/bds_component_step_item_connector_thickness` | `--component-step-item-connector-thickness` |
| `component.step-item.content-gap` | `{spacing.2}` | `componentStepItemContentGap` | `@dimen/bds_component_step_item_content_gap` | `--component-step-item-content-gap` |
| `component.step-item.marker-gap` | `{spacing.2}` | `componentStepItemMarkerGap` | `@dimen/bds_component_step_item_marker_gap` | `--component-step-item-marker-gap` |
| `component.step-item.marker-stroke` | `{stroke.1}` | `componentStepItemMarkerStroke` | `@dimen/bds_component_step_item_marker_stroke` | `--component-step-item-marker-stroke` |
| `component.step-item.marker.radius` | `{radius.full}` | `componentStepItemMarkerRadius` | `@dimen/bds_component_step_item_marker_radius` | `--component-step-item-marker-radius` |
| `component.step-item.marker.size` | `{size.24}` | `componentStepItemMarkerSize` | `@dimen/bds_component_step_item_marker_size` | `--component-step-item-marker-size` |

## component · stepper

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.stepper.gap` | `0px` | `componentStepperGap` | `@dimen/bds_component_stepper_gap` | `--component-stepper-gap` |

## component · switch

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.switch.focus.stroke` | `{stroke.2}` | `componentSwitchFocusStroke` | `@dimen/bds_component_switch_focus_stroke` | `--component-switch-focus-stroke` |
| `component.switch.item.gap` | `{spacing.3}` | `componentSwitchItemGap` | `@dimen/bds_component_switch_item_gap` | `--component-switch-item-gap` |
| `component.switch.item.min-height.lg` | `{component.control.size.lg}` | `componentSwitchItemMinHeightLg` | `@dimen/bds_component_switch_item_min_height_lg` | `--component-switch-item-min-height-lg` |
| `component.switch.item.min-height.md` | `{component.control.size.md}` | `componentSwitchItemMinHeightMd` | `@dimen/bds_component_switch_item_min_height_md` | `--component-switch-item-min-height-md` |
| `component.switch.item.stack-gap` | `{spacing.1}` | `componentSwitchItemStackGap` | `@dimen/bds_component_switch_item_stack_gap` | `--component-switch-item-stack-gap` |
| `component.switch.thumb.radius` | `{component.radius.round}` | `componentSwitchThumbRadius` | `@dimen/bds_component_switch_thumb_radius` | `--component-switch-thumb-radius` |
| `component.switch.thumb.size.lg` | `{size.20}` | `componentSwitchThumbSizeLg` | `@dimen/bds_component_switch_thumb_size_lg` | `--component-switch-thumb-size-lg` |
| `component.switch.thumb.size.md` | `{size.16}` | `componentSwitchThumbSizeMd` | `@dimen/bds_component_switch_thumb_size_md` | `--component-switch-thumb-size-md` |
| `component.switch.track.height.lg` | `{size.28}` | `componentSwitchTrackHeightLg` | `@dimen/bds_component_switch_track_height_lg` | `--component-switch-track-height-lg` |
| `component.switch.track.height.md` | `{size.24}` | `componentSwitchTrackHeightMd` | `@dimen/bds_component_switch_track_height_md` | `--component-switch-track-height-md` |
| `component.switch.track.inset` | `{spacing.1}` | `componentSwitchTrackInset` | `@dimen/bds_component_switch_track_inset` | `--component-switch-track-inset` |
| `component.switch.track.radius` | `{component.radius.round}` | `componentSwitchTrackRadius` | `@dimen/bds_component_switch_track_radius` | `--component-switch-track-radius` |
| `component.switch.track.width.lg` | `{component.control.size.lg}` | `componentSwitchTrackWidthLg` | `@dimen/bds_component_switch_track_width_lg` | `--component-switch-track-width-lg` |
| `component.switch.track.width.md` | `{component.control.size.md}` | `componentSwitchTrackWidthMd` | `@dimen/bds_component_switch_track_width_md` | `--component-switch-track-width-md` |

## component · table-cell

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.table-cell.padding-block` | `{spacing.2}` | `componentTableCellPaddingBlock` | `@dimen/bds_component_table_cell_padding_block` | `--component-table-cell-padding-block` |
| `component.table-cell.padding-inline` | `{spacing.3}` | `componentTableCellPaddingInline` | `@dimen/bds_component_table_cell_padding_inline` | `--component-table-cell-padding-inline` |

## component · table-row

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.table-row.divider-stroke` | `{stroke.1}` | `componentTableRowDividerStroke` | `@dimen/bds_component_table_row_divider_stroke` | `--component-table-row-divider-stroke` |
| `component.table-row.min-height` | `{component.control.size.md}` | `componentTableRowMinHeight` | `@dimen/bds_component_table_row_min_height` | `--component-table-row-min-height` |

## component · tabs

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.tabs.container.divider-thickness` | `{stroke.1}` | `componentTabsContainerDividerThickness` | `@dimen/bds_component_tabs_container_divider_thickness` | `--component-tabs-container-divider-thickness` |
| `component.tabs.focus.stroke` | `{stroke.2}` | `componentTabsFocusStroke` | `@dimen/bds_component_tabs_focus_stroke` | `--component-tabs-focus-stroke` |
| `component.tabs.item.height.lg` | `{component.control.size.lg}` | `componentTabsItemHeightLg` | `@dimen/bds_component_tabs_item_height_lg` | `--component-tabs-item-height-lg` |
| `component.tabs.item.height.md` | `{component.control.size.md}` | `componentTabsItemHeightMd` | `@dimen/bds_component_tabs_item_height_md` | `--component-tabs-item-height-md` |
| `component.tabs.item.indicator-thickness` | `{stroke.2}` | `componentTabsItemIndicatorThickness` | `@dimen/bds_component_tabs_item_indicator_thickness` | `--component-tabs-item-indicator-thickness` |
| `component.tabs.item.padding-inline` | `{spacing.4}` | `componentTabsItemPaddingInline` | `@dimen/bds_component_tabs_item_padding_inline` | `--component-tabs-item-padding-inline` |

## component · textarea

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.textarea.min-height.lg` | `{size.128}` | `componentTextareaMinHeightLg` | `@dimen/bds_component_textarea_min_height_lg` | `--component-textarea-min-height-lg` |
| `component.textarea.min-height.md` | `{size.96}` | `componentTextareaMinHeightMd` | `@dimen/bds_component_textarea_min_height_md` | `--component-textarea-min-height-md` |

## component · toast

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.toast.max-width` | `320px` | `componentToastMaxWidth` | `@dimen/bds_component_toast_max_width` | `--component-toast-max-width` |
| `component.toast.min-height` | `{component.control.size.lg}` | `componentToastMinHeight` | `@dimen/bds_component_toast_min_height` | `--component-toast-min-height` |
| `component.toast.padding-block` | `{spacing.3}` | `componentToastPaddingBlock` | `@dimen/bds_component_toast_padding_block` | `--component-toast-padding-block` |
| `component.toast.padding-inline` | `{spacing.4}` | `componentToastPaddingInline` | `@dimen/bds_component_toast_padding_inline` | `--component-toast-padding-inline` |
| `component.toast.radius` | `{radius.md}` | `componentToastRadius` | `@dimen/bds_component_toast_radius` | `--component-toast-radius` |
| `component.toast.stroke` | `{stroke.1}` | `componentToastStroke` | `@dimen/bds_component_toast_stroke` | `--component-toast-stroke` |

## component · tooltip

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `component.tooltip.max-width` | `240px` | `componentTooltipMaxWidth` | `@dimen/bds_component_tooltip_max_width` | `--component-tooltip-max-width` |
| `component.tooltip.min-height` | `{size.32}` | `componentTooltipMinHeight` | `@dimen/bds_component_tooltip_min_height` | `--component-tooltip-min-height` |
| `component.tooltip.padding-block` | `{spacing.2}` | `componentTooltipPaddingBlock` | `@dimen/bds_component_tooltip_padding_block` | `--component-tooltip-padding-block` |
| `component.tooltip.padding-inline` | `{spacing.2}` | `componentTooltipPaddingInline` | `@dimen/bds_component_tooltip_padding_inline` | `--component-tooltip-padding-inline` |
| `component.tooltip.radius` | `{radius.md}` | `componentTooltipRadius` | `@dimen/bds_component_tooltip_radius` | `--component-tooltip-radius` |

## font · family

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `font.family.accent` | `Montserrat` | — | `@string/bds_font_family_accent` | `--font-family-accent` |
| `font.family.base` | `Montserrat` | — | `@string/bds_font_family_base` | `--font-family-base` |
| `font.family.body` | `Montserrat` | — | `@string/bds_font_family_body` | `--font-family-body` |
| `font.family.display` | `Montserrat` | — | `@string/bds_font_family_display` | `--font-family-display` |

## font · line-height

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `font.line-height.050` | `12px` | `fontLineHeight050` | `@dimen/bds_font_line_height_050` | `--font-line-height-050` |
| `font.line-height.100` | `16px` | `fontLineHeight100` | `@dimen/bds_font_line_height_100` | `--font-line-height-100` |
| `font.line-height.1000` | `68px` | `fontLineHeight1000` | `@dimen/bds_font_line_height_1000` | `--font-line-height-1000` |
| `font.line-height.1100` | `80px` | `fontLineHeight1100` | `@dimen/bds_font_line_height_1100` | `--font-line-height-1100` |
| `font.line-height.200` | `20px` | `fontLineHeight200` | `@dimen/bds_font_line_height_200` | `--font-line-height-200` |
| `font.line-height.300` | `24px` | `fontLineHeight300` | `@dimen/bds_font_line_height_300` | `--font-line-height-300` |
| `font.line-height.400` | `26px` | `fontLineHeight400` | `@dimen/bds_font_line_height_400` | `--font-line-height-400` |
| `font.line-height.500` | `28px` | `fontLineHeight500` | `@dimen/bds_font_line_height_500` | `--font-line-height-500` |
| `font.line-height.600` | `32px` | `fontLineHeight600` | `@dimen/bds_font_line_height_600` | `--font-line-height-600` |
| `font.line-height.700` | `38px` | `fontLineHeight700` | `@dimen/bds_font_line_height_700` | `--font-line-height-700` |
| `font.line-height.800` | `44px` | `fontLineHeight800` | `@dimen/bds_font_line_height_800` | `--font-line-height-800` |
| `font.line-height.900` | `56px` | `fontLineHeight900` | `@dimen/bds_font_line_height_900` | `--font-line-height-900` |

## font · size

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `font.size.050` | `10px` | `fontSize050` | `@dimen/bds_font_size_050` | `--font-size-050` |
| `font.size.100` | `12px` | `fontSize100` | `@dimen/bds_font_size_100` | `--font-size-100` |
| `font.size.1000` | `60px` | `fontSize1000` | `@dimen/bds_font_size_1000` | `--font-size-1000` |
| `font.size.1100` | `72px` | `fontSize1100` | `@dimen/bds_font_size_1100` | `--font-size-1100` |
| `font.size.200` | `14px` | `fontSize200` | `@dimen/bds_font_size_200` | `--font-size-200` |
| `font.size.300` | `16px` | `fontSize300` | `@dimen/bds_font_size_300` | `--font-size-300` |
| `font.size.400` | `18px` | `fontSize400` | `@dimen/bds_font_size_400` | `--font-size-400` |
| `font.size.500` | `20px` | `fontSize500` | `@dimen/bds_font_size_500` | `--font-size-500` |
| `font.size.600` | `24px` | `fontSize600` | `@dimen/bds_font_size_600` | `--font-size-600` |
| `font.size.700` | `30px` | `fontSize700` | `@dimen/bds_font_size_700` | `--font-size-700` |
| `font.size.800` | `36px` | `fontSize800` | `@dimen/bds_font_size_800` | `--font-size-800` |
| `font.size.900` | `48px` | `fontSize900` | `@dimen/bds_font_size_900` | `--font-size-900` |

## font · weight

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `font.weight.bold` | `700` | `fontWeightBold` | `@integer/bds_font_weight_bold` | `--font-weight-bold` |
| `font.weight.medium` | `500` | `fontWeightMedium` | `@integer/bds_font_weight_medium` | `--font-weight-medium` |
| `font.weight.regular` | `400` | `fontWeightRegular` | `@integer/bds_font_weight_regular` | `--font-weight-regular` |
| `font.weight.semibold` | `600` | `fontWeightSemibold` | `@integer/bds_font_weight_semibold` | `--font-weight-semibold` |

## icon · size

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `icon.size.16` | `{component.icon.size.16}` | `iconSize16` | `@dimen/bds_icon_size_16` | `--icon-size-16` |
| `icon.size.20` | `{component.icon.size.20}` | `iconSize20` | `@dimen/bds_icon_size_20` | `--icon-size-20` |
| `icon.size.24` | `{component.icon.size.24}` | `iconSize24` | `@dimen/bds_icon_size_24` | `--icon-size-24` |
| `icon.size.32` | `{component.icon.size.32}` | `iconSize32` | `@dimen/bds_icon_size_32` | `--icon-size-32` |

## icon · stroke

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `icon.stroke.16` | `1.5px` | `iconStroke16` | `@dimen/bds_icon_stroke_16` | `--icon-stroke-16` |
| `icon.stroke.20` | `1.75px` | `iconStroke20` | `@dimen/bds_icon_stroke_20` | `--icon-stroke-20` |
| `icon.stroke.24` | `2px` | `iconStroke24` | `@dimen/bds_icon_stroke_24` | `--icon-stroke-24` |
| `icon.stroke.32` | `2px` | `iconStroke32` | `@dimen/bds_icon_stroke_32` | `--icon-stroke-32` |

## layout · breakpoint

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `layout.breakpoint.wide.min` | `1024px` | `layoutBreakpointWideMin` | `@dimen/bds_layout_breakpoint_wide_min` | `--layout-breakpoint-wide-min` |

## layout · compact

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `layout.compact.content.max-width` | `{layout.container.content.max}` | `layoutCompactContentMaxWidth` | `@dimen/bds_layout_compact_content_max_width` | `--layout-compact-content-max-width` |
| `layout.compact.grid.columns` | `4` | `layoutCompactGridColumns` | `@integer/bds_layout_compact_grid_columns` | `--layout-compact-grid-columns` |
| `layout.compact.grid.gutter` | `{spacing.4}` | `layoutCompactGridGutter` | `@dimen/bds_layout_compact_grid_gutter` | `--layout-compact-grid-gutter` |
| `layout.compact.page.padding-inline` | `{spacing.4}` | `layoutCompactPagePaddingInline` | `@dimen/bds_layout_compact_page_padding_inline` | `--layout-compact-page-padding-inline` |

## layout · container

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `layout.container.content.max` | `1280px` | `layoutContainerContentMax` | `@dimen/bds_layout_container_content_max` | `--layout-container-content-max` |

## layout · viewport

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `layout.viewport.min-supported` | `320px` | `layoutViewportMinSupported` | `@dimen/bds_layout_viewport_min_supported` | `--layout-viewport-min-supported` |
| `layout.viewport.reference.compact` | `390px` | `layoutViewportReferenceCompact` | `@dimen/bds_layout_viewport_reference_compact` | `--layout-viewport-reference-compact` |
| `layout.viewport.reference.wide` | `1440px` | `layoutViewportReferenceWide` | `@dimen/bds_layout_viewport_reference_wide` | `--layout-viewport-reference-wide` |

## layout · wide

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `layout.wide.content.max-width` | `{layout.container.content.max}` | `layoutWideContentMaxWidth` | `@dimen/bds_layout_wide_content_max_width` | `--layout-wide-content-max-width` |
| `layout.wide.grid.columns` | `12` | `layoutWideGridColumns` | `@integer/bds_layout_wide_grid_columns` | `--layout-wide-grid-columns` |
| `layout.wide.grid.gutter` | `{spacing.5}` | `layoutWideGridGutter` | `@dimen/bds_layout_wide_grid_gutter` | `--layout-wide-grid-gutter` |
| `layout.wide.page.padding-inline` | `{spacing.9}` | `layoutWidePagePaddingInline` | `@dimen/bds_layout_wide_page_padding_inline` | `--layout-wide-page-padding-inline` |

## motion · duration

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `motion.duration.contextual` | `{motion.duration.moderate}` | `motionDurationContextual` | `@integer/bds_motion_duration_contextual` | `--motion-duration-contextual` |
| `motion.duration.expand` | `{motion.duration.moderate}` | `motionDurationExpand` | `@integer/bds_motion_duration_expand` | `--motion-duration-expand` |
| `motion.duration.fast` | `120ms` | `motionDurationFast` | `@integer/bds_motion_duration_fast` | `--motion-duration-fast` |
| `motion.duration.feedback` | `{motion.duration.fast}` | `motionDurationFeedback` | `@integer/bds_motion_duration_feedback` | `--motion-duration-feedback` |
| `motion.duration.moderate` | `200ms` | `motionDurationModerate` | `@integer/bds_motion_duration_moderate` | `--motion-duration-moderate` |
| `motion.duration.overlay` | `{motion.duration.slow}` | `motionDurationOverlay` | `@integer/bds_motion_duration_overlay` | `--motion-duration-overlay` |
| `motion.duration.slow` | `320ms` | `motionDurationSlow` | `@integer/bds_motion_duration_slow` | `--motion-duration-slow` |

## motion · easing

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `motion.easing.enter` | `cubic-bezier(0, 0, 0, 1)` | — | `@string/bds_motion_easing_enter` | `--motion-easing-enter` |
| `motion.easing.exit` | `cubic-bezier(0.4, 0, 1, 1)` | — | `@string/bds_motion_easing_exit` | `--motion-easing-exit` |
| `motion.easing.standard` | `cubic-bezier(0.2, 0, 0, 1)` | — | `@string/bds_motion_easing_standard` | `--motion-easing-standard` |

## radius

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `radius.full` | `9999px` | `radiusFull` | `@dimen/bds_radius_full` | `--radius-full` |
| `radius.lg` | `12px` | `radiusLg` | `@dimen/bds_radius_lg` | `--radius-lg` |
| `radius.md` | `8px` | `radiusMd` | `@dimen/bds_radius_md` | `--radius-md` |
| `radius.none` | `0px` | `radiusNone` | `@dimen/bds_radius_none` | `--radius-none` |
| `radius.sm` | `4px` | `radiusSm` | `@dimen/bds_radius_sm` | `--radius-sm` |
| `radius.xl` | `16px` | `radiusXl` | `@dimen/bds_radius_xl` | `--radius-xl` |

## size

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `size.10` | `10px` | `size10` | `@dimen/bds_size_10` | `--size-10` |
| `size.12` | `12px` | `size12` | `@dimen/bds_size_12` | `--size-12` |
| `size.128` | `128px` | `size128` | `@dimen/bds_size_128` | `--size-128` |
| `size.16` | `16px` | `size16` | `@dimen/bds_size_16` | `--size-16` |
| `size.20` | `20px` | `size20` | `@dimen/bds_size_20` | `--size-20` |
| `size.24` | `24px` | `size24` | `@dimen/bds_size_24` | `--size-24` |
| `size.28` | `28px` | `size28` | `@dimen/bds_size_28` | `--size-28` |
| `size.32` | `32px` | `size32` | `@dimen/bds_size_32` | `--size-32` |
| `size.40` | `40px` | `size40` | `@dimen/bds_size_40` | `--size-40` |
| `size.48` | `48px` | `size48` | `@dimen/bds_size_48` | `--size-48` |
| `size.96` | `96px` | `size96` | `@dimen/bds_size_96` | `--size-96` |

## spacing

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `spacing.1` | `4px` | `spacing1` | `@dimen/bds_spacing_1` | `--spacing-1` |
| `spacing.2` | `8px` | `spacing2` | `@dimen/bds_spacing_2` | `--spacing-2` |
| `spacing.3` | `12px` | `spacing3` | `@dimen/bds_spacing_3` | `--spacing-3` |
| `spacing.4` | `16px` | `spacing4` | `@dimen/bds_spacing_4` | `--spacing-4` |
| `spacing.5` | `24px` | `spacing5` | `@dimen/bds_spacing_5` | `--spacing-5` |
| `spacing.6` | `32px` | `spacing6` | `@dimen/bds_spacing_6` | `--spacing-6` |
| `spacing.7` | `40px` | `spacing7` | `@dimen/bds_spacing_7` | `--spacing-7` |
| `spacing.8` | `48px` | `spacing8` | `@dimen/bds_spacing_8` | `--spacing-8` |
| `spacing.9` | `64px` | `spacing9` | `@dimen/bds_spacing_9` | `--spacing-9` |

## stroke

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `stroke.1` | `1px` | `stroke1` | `@dimen/bds_stroke_1` | `--stroke-1` |
| `stroke.2` | `2px` | `stroke2` | `@dimen/bds_stroke_2` | `--stroke-2` |

## z-index

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `z-index.content` | `{z-index.level.0}` | `zIndexContent` | `@integer/bds_z_index_content` | `--z-index-content` |
| `z-index.contextual` | `{z-index.level.300}` | `zIndexContextual` | `@integer/bds_z_index_contextual` | `--z-index-contextual` |
| `z-index.modal` | `{z-index.level.400}` | `zIndexModal` | `@integer/bds_z_index_modal` | `--z-index-modal` |
| `z-index.navigation` | `{z-index.level.200}` | `zIndexNavigation` | `@integer/bds_z_index_navigation` | `--z-index-navigation` |
| `z-index.notification` | `{z-index.level.500}` | `zIndexNotification` | `@integer/bds_z_index_notification` | `--z-index-notification` |
| `z-index.sticky` | `{z-index.level.100}` | `zIndexSticky` | `@integer/bds_z_index_sticky` | `--z-index-sticky` |

## z-index · level

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `z-index.level.0` | `0` | `zIndexLevel0` | `@integer/bds_z_index_level_0` | `--z-index-level-0` |
| `z-index.level.100` | `100` | `zIndexLevel100` | `@integer/bds_z_index_level_100` | `--z-index-level-100` |
| `z-index.level.200` | `200` | `zIndexLevel200` | `@integer/bds_z_index_level_200` | `--z-index-level-200` |
| `z-index.level.300` | `300` | `zIndexLevel300` | `@integer/bds_z_index_level_300` | `--z-index-level-300` |
| `z-index.level.400` | `400` | `zIndexLevel400` | `@integer/bds_z_index_level_400` | `--z-index-level-400` |
| `z-index.level.500` | `500` | `zIndexLevel500` | `@integer/bds_z_index_level_500` | `--z-index-level-500` |

---

Generated by `pipeline/sd.config.mjs` (`markdown/design-doc`). See `docs/releasing-android.md` for how a change here reaches an application.
