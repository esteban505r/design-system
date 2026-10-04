# Cyzone Design System — Token Reference

> ## 🤖 Automatically generated — do not edit
>
> This file is written by `pipeline/sd.config.mjs` (the `markdown/design-doc`
> format) from **`brands/cyzone/figma/tokens.json`**, the single source of truth. Any edit you
> make here is overwritten the next time it regenerates.
>
> **To change a value:** change the token in Figma, export to
> `brands/cyzone/figma/tokens.json`, then run `pnpm run sync`.

### When this file regenerates

| When | What triggers it |
|---|---|
| `pnpm run sync` (or `sync:figma`) | Manually, after editing `brands/cyzone/figma/tokens.json` |
| `pnpm run build` | Style Dictionary rebuild — the `docs` platform runs with every other platform |
| **Sync tokens from Figma JSON** workflow | A push touching `brands/cyzone/figma/tokens.json`, or manual dispatch |
| **Publish Android library** / **Publish web** | Both re-run `sync:figma` from a clean checkout before publishing |
| **CI**, on every PR to `main` or `belcorp` | Re-runs `sync:figma` and **fails the build if this file differs** from what was committed |

That last row is what keeps it honest: a stale `DESIGN.md` blocks the PR, so what you read here always matches the artifact the apps compile against.

**Version:** 4.0.0  
**Tokens:** 119  
**By type:** color 44 · dimension 42 · fontSize 12 · duration 5 · number 5 · fontWeight 4 · shadow 3 · cubicBezier 3 · fontFamily 1

## How to reference a token

Every token below is listed with the exact identifier to type on each platform.

| Platform | Import | Example |
|---|---|---|
| Compose | `com.estebanruano.designtokens.DesignTokens` | `DesignTokens.colorPrimary500` |
| Android XML | AAR resources | `@color/color_primary_500`, `@dimen/bds_spacing_4` |
| iOS (Swift) | `DesignTokens` | `DesignTokens.colorPrimary500` |
| Flutter | `design_tokens.dart` | `DesignTokens.colorPrimary500` |
| Web (CSS) | `tokens.css` | `var(--color-primary-500)` |
| Web (JS) | `tokens.js` | `ColorPrimary500` |

> **Android XML naming.** Every non-colour resource — `@dimen`, `@integer`, `@string` — is prefixed `bds_`. Names like `spacing_4` or `radius_md` are generic enough that an application module could define its own, and when an app and a library declare the same resource name AGP silently resolves to the app's value. Colours are **not** prefixed: `color_*` is already distinctive and is referenced throughout the consuming apps. The exact identifier for each token is in the **Android XML** column below — copy it from there.

## Contents

- [color · bg](#color--bg) — 11
- [color · border](#color--border) — 4
- [color · brand](#color--brand) — 1
- [color · interactive](#color--interactive) — 6
- [color · status](#color--status) — 12
- [color · text](#color--text) — 10
- [elevation](#elevation) — 3
- [font · family](#font--family) — 1
- [font · line-height](#font--line-height) — 12
- [font · size](#font--size) — 12
- [font · weight](#font--weight) — 4
- [motion · duration](#motion--duration) — 5
- [motion · easing](#motion--easing) — 3
- [radius](#radius) — 13
- [spacing](#spacing) — 14
- [stroke](#stroke) — 3
- [z-index](#z-index) — 5

## color · bg

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.bg.brand` | `#AF0061` | `colorBgBrand` | `@color/color_bg_brand` | `--color-bg-brand` |
| `color.bg.brand-subtle` | `#F5E0EC` | `colorBgBrandSubtle` | `@color/color_bg_brand_subtle` | `--color-bg-brand-subtle` |
| `color.bg.disabled` | `#F6F6F6` | `colorBgDisabled` | `@color/color_bg_disabled` | `--color-bg-disabled` |
| `color.bg.error` | `#FEE2E2` | `colorBgError` | `@color/color_bg_error` | `--color-bg-error` |
| `color.bg.info` | `#DBEAFE` | `colorBgInfo` | `@color/color_bg_info` | `--color-bg-info` |
| `color.bg.overlay` | `#00000066` | `colorBgOverlay` | `@color/color_bg_overlay` | `--color-bg-overlay` |
| `color.bg.page` | `#FFFFFF` | `colorBgPage` | `@color/color_bg_page` | `--color-bg-page` |
| `color.bg.subtle` | `#F6F6F6` | `colorBgSubtle` | `@color/color_bg_subtle` | `--color-bg-subtle` |
| `color.bg.success` | `#BBF7D0` | `colorBgSuccess` | `@color/color_bg_success` | `--color-bg-success` |
| `color.bg.surface` | `#FFFFFF` | `colorBgSurface` | `@color/color_bg_surface` | `--color-bg-surface` |
| `color.bg.warning` | `#FEF3C7` | `colorBgWarning` | `@color/color_bg_warning` | `--color-bg-warning` |

## color · border

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.border.brand` | `#AF0061` | `colorBorderBrand` | `@color/color_border_brand` | `--color-border-brand` |
| `color.border.default` | `#EFEFEF` | `colorBorderDefault` | `@color/color_border_default` | `--color-border-default` |
| `color.border.disabled` | `#EFEFEF` | `colorBorderDisabled` | `@color/color_border_disabled` | `--color-border-disabled` |
| `color.border.strong` | `#C4C4C4` | `colorBorderStrong` | `@color/color_border_strong` | `--color-border-strong` |

## color · brand

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.brand.cyzone` | `#AF0061` | `colorBrandCyzone` | `@color/color_brand_cyzone` | `--color-brand-cyzone` |

## color · interactive

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.interactive.focus-ring` | `#B71A71` | `colorInteractiveFocusRing` | `@color/color_interactive_focus_ring` | `--color-interactive-focus-ring` |
| `color.interactive.primary.active` | `#830049` | `colorInteractivePrimaryActive` | `@color/color_interactive_primary_active` | `--color-interactive-primary-active` |
| `color.interactive.primary.default` | `#AF0061` | `colorInteractivePrimaryDefault` | `@color/color_interactive_primary_default` | `--color-interactive-primary-default` |
| `color.interactive.primary.disabled` | `#EFEFEF` | `colorInteractivePrimaryDisabled` | `@color/color_interactive_primary_disabled` | `--color-interactive-primary-disabled` |
| `color.interactive.primary.hover` | `#9A0055` | `colorInteractivePrimaryHover` | `@color/color_interactive_primary_hover` | `--color-interactive-primary-hover` |
| `color.interactive.primary.text` | `#FFFFFF` | `colorInteractivePrimaryText` | `@color/color_interactive_primary_text` | `--color-interactive-primary-text` |

## color · status

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.status.error` | `#DC2626` | `colorStatusError` | `@color/color_status_error` | `--color-status-error` |
| `color.status.error-dark` | `#B91C1C` | `colorStatusErrorDark` | `@color/color_status_error_dark` | `--color-status-error-dark` |
| `color.status.error-light` | `#FEE2E2` | `colorStatusErrorLight` | `@color/color_status_error_light` | `--color-status-error-light` |
| `color.status.info` | `#2563EB` | `colorStatusInfo` | `@color/color_status_info` | `--color-status-info` |
| `color.status.info-dark` | `#1245D4` | `colorStatusInfoDark` | `@color/color_status_info_dark` | `--color-status-info-dark` |
| `color.status.info-light` | `#DBEAFE` | `colorStatusInfoLight` | `@color/color_status_info_light` | `--color-status-info-light` |
| `color.status.success` | `#16A34A` | `colorStatusSuccess` | `@color/color_status_success` | `--color-status-success` |
| `color.status.success-dark` | `#166534` | `colorStatusSuccessDark` | `@color/color_status_success_dark` | `--color-status-success-dark` |
| `color.status.success-light` | `#BBF7D0` | `colorStatusSuccessLight` | `@color/color_status_success_light` | `--color-status-success-light` |
| `color.status.warning` | `#FFB90A` | `colorStatusWarning` | `@color/color_status_warning` | `--color-status-warning` |
| `color.status.warning-dark` | `#92400E` | `colorStatusWarningDark` | `@color/color_status_warning_dark` | `--color-status-warning-dark` |
| `color.status.warning-light` | `#FEF3C7` | `colorStatusWarningLight` | `@color/color_status_warning_light` | `--color-status-warning-light` |

## color · text

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.text.brand` | `#AF0061` | `colorTextBrand` | `@color/color_text_brand` | `--color-text-brand` |
| `color.text.disabled` | `#949393` | `colorTextDisabled` | `@color/color_text_disabled` | `--color-text-disabled` |
| `color.text.error` | `#B91C1C` | `colorTextError` | `@color/color_text_error` | `--color-text-error` |
| `color.text.info` | `#1245D4` | `colorTextInfo` | `@color/color_text_info` | `--color-text-info` |
| `color.text.inverse` | `#FFFFFF` | `colorTextInverse` | `@color/color_text_inverse` | `--color-text-inverse` |
| `color.text.primary` | `#000000` | `colorTextPrimary` | `@color/color_text_primary` | `--color-text-primary` |
| `color.text.secondary` | `#545353` | `colorTextSecondary` | `@color/color_text_secondary` | `--color-text-secondary` |
| `color.text.success` | `#166534` | `colorTextSuccess` | `@color/color_text_success` | `--color-text-success` |
| `color.text.tertiary` | `#777676` | `colorTextTertiary` | `@color/color_text_tertiary` | `--color-text-tertiary` |
| `color.text.warning` | `#92400E` | `colorTextWarning` | `@color/color_text_warning` | `--color-text-warning` |

## elevation

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `elevation.1` | `0px 1px 3px 0px rgba(0, 0, 0, 0.12), 0px 1px 2px 0px rgba(0, 0, 0, 0.08)` | — | `@string/bds_elevation_1` | `--elevation-1` |
| `elevation.2` | `0px 4px 8px 0px rgba(0, 0, 0, 0.12), 0px 2px 4px 0px rgba(0, 0, 0, 0.08)` | — | `@string/bds_elevation_2` | `--elevation-2` |
| `elevation.3` | `0px 12px 24px 0px rgba(0, 0, 0, 0.14), 0px 4px 8px 0px rgba(0, 0, 0, 0.10)` | — | `@string/bds_elevation_3` | `--elevation-3` |

## font · family

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `font.family.primary` | `Red Hat Text` | — | `@string/bds_font_family_primary` | `--font-family-primary` |

## font · line-height

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `font.line-height.body-lg` | `26px` | `fontLineHeightBodyLg` | `@dimen/bds_font_line_height_body_lg` | `--font-line-height-body-lg` |
| `font.line-height.body-md` | `24px` | `fontLineHeightBodyMd` | `@dimen/bds_font_line_height_body_md` | `--font-line-height-body-md` |
| `font.line-height.body-sm` | `20px` | `fontLineHeightBodySm` | `@dimen/bds_font_line_height_body_sm` | `--font-line-height-body-sm` |
| `font.line-height.button` | `20px` | `fontLineHeightButton` | `@dimen/bds_font_line_height_button` | `--font-line-height-button` |
| `font.line-height.display` | `80px` | `fontLineHeightDisplay` | `@dimen/bds_font_line_height_display` | `--font-line-height-display` |
| `font.line-height.h1` | `44px` | `fontLineHeightH1` | `@dimen/bds_font_line_height_h1` | `--font-line-height-h1` |
| `font.line-height.h2` | `38px` | `fontLineHeightH2` | `@dimen/bds_font_line_height_h2` | `--font-line-height-h2` |
| `font.line-height.h3` | `32px` | `fontLineHeightH3` | `@dimen/bds_font_line_height_h3` | `--font-line-height-h3` |
| `font.line-height.h4` | `28px` | `fontLineHeightH4` | `@dimen/bds_font_line_height_h4` | `--font-line-height-h4` |
| `font.line-height.h5` | `24px` | `fontLineHeightH5` | `@dimen/bds_font_line_height_h5` | `--font-line-height-h5` |
| `font.line-height.label` | `20px` | `fontLineHeightLabel` | `@dimen/bds_font_line_height_label` | `--font-line-height-label` |
| `font.line-height.overline` | `16px` | `fontLineHeightOverline` | `@dimen/bds_font_line_height_overline` | `--font-line-height-overline` |

## font · size

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `font.size.body-lg` | `18px` | `fontSizeBodyLg` | `@dimen/bds_font_size_body_lg` | `--font-size-body-lg` |
| `font.size.body-md` | `16px` | `fontSizeBodyMd` | `@dimen/bds_font_size_body_md` | `--font-size-body-md` |
| `font.size.body-sm` | `14px` | `fontSizeBodySm` | `@dimen/bds_font_size_body_sm` | `--font-size-body-sm` |
| `font.size.button` | `14px` | `fontSizeButton` | `@dimen/bds_font_size_button` | `--font-size-button` |
| `font.size.display` | `72px` | `fontSizeDisplay` | `@dimen/bds_font_size_display` | `--font-size-display` |
| `font.size.h1` | `36px` | `fontSizeH1` | `@dimen/bds_font_size_h1` | `--font-size-h1` |
| `font.size.h2` | `30px` | `fontSizeH2` | `@dimen/bds_font_size_h2` | `--font-size-h2` |
| `font.size.h3` | `24px` | `fontSizeH3` | `@dimen/bds_font_size_h3` | `--font-size-h3` |
| `font.size.h4` | `20px` | `fontSizeH4` | `@dimen/bds_font_size_h4` | `--font-size-h4` |
| `font.size.h5` | `16px` | `fontSizeH5` | `@dimen/bds_font_size_h5` | `--font-size-h5` |
| `font.size.label` | `14px` | `fontSizeLabel` | `@dimen/bds_font_size_label` | `--font-size-label` |
| `font.size.overline` | `12px` | `fontSizeOverline` | `@dimen/bds_font_size_overline` | `--font-size-overline` |

## font · weight

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `font.weight.bold` | `700` | `fontWeightBold` | `@integer/bds_font_weight_bold` | `--font-weight-bold` |
| `font.weight.medium` | `500` | `fontWeightMedium` | `@integer/bds_font_weight_medium` | `--font-weight-medium` |
| `font.weight.regular` | `400` | `fontWeightRegular` | `@integer/bds_font_weight_regular` | `--font-weight-regular` |
| `font.weight.semibold` | `600` | `fontWeightSemibold` | `@integer/bds_font_weight_semibold` | `--font-weight-semibold` |

## motion · duration

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `motion.duration.fast` | `100ms` | `motionDurationFast` | `@integer/bds_motion_duration_fast` | `--motion-duration-fast` |
| `motion.duration.instant` | `0ms` | `motionDurationInstant` | `@integer/bds_motion_duration_instant` | `--motion-duration-instant` |
| `motion.duration.normal` | `200ms` | `motionDurationNormal` | `@integer/bds_motion_duration_normal` | `--motion-duration-normal` |
| `motion.duration.slow` | `300ms` | `motionDurationSlow` | `@integer/bds_motion_duration_slow` | `--motion-duration-slow` |
| `motion.duration.slower` | `500ms` | `motionDurationSlower` | `@integer/bds_motion_duration_slower` | `--motion-duration-slower` |

## motion · easing

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `motion.easing.default` | `cubic-bezier(0.4, 0, 0.2, 1)` | — | `@string/bds_motion_easing_default` | `--motion-easing-default` |
| `motion.easing.in` | `cubic-bezier(0.4, 0, 1, 1)` | — | `@string/bds_motion_easing_in` | `--motion-easing-in` |
| `motion.easing.out` | `cubic-bezier(0, 0, 0.2, 1)` | — | `@string/bds_motion_easing_out` | `--motion-easing-out` |

## radius

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `radius.2xl` | `24px` | `radius2xl` | `@dimen/bds_radius_2xl` | `--radius-2xl` |
| `radius.badge` | `9999px` | `radiusBadge` | `@dimen/bds_radius_badge` | `--radius-badge` |
| `radius.button` | `8px` | `radiusButton` | `@dimen/bds_radius_button` | `--radius-button` |
| `radius.card` | `12px` | `radiusCard` | `@dimen/bds_radius_card` | `--radius-card` |
| `radius.full` | `9999px` | `radiusFull` | `@dimen/bds_radius_full` | `--radius-full` |
| `radius.input` | `8px` | `radiusInput` | `@dimen/bds_radius_input` | `--radius-input` |
| `radius.lg` | `12px` | `radiusLg` | `@dimen/bds_radius_lg` | `--radius-lg` |
| `radius.md` | `8px` | `radiusMd` | `@dimen/bds_radius_md` | `--radius-md` |
| `radius.modal` | `16px` | `radiusModal` | `@dimen/bds_radius_modal` | `--radius-modal` |
| `radius.none` | `0px` | `radiusNone` | `@dimen/bds_radius_none` | `--radius-none` |
| `radius.sm` | `4px` | `radiusSm` | `@dimen/bds_radius_sm` | `--radius-sm` |
| `radius.xl` | `16px` | `radiusXl` | `@dimen/bds_radius_xl` | `--radius-xl` |
| `radius.xs` | `2px` | `radiusXs` | `@dimen/bds_radius_xs` | `--radius-xs` |

## spacing

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `spacing.1` | `2px` | `spacing1` | `@dimen/bds_spacing_1` | `--spacing-1` |
| `spacing.10` | `48px` | `spacing10` | `@dimen/bds_spacing_10` | `--spacing-10` |
| `spacing.11` | `56px` | `spacing11` | `@dimen/bds_spacing_11` | `--spacing-11` |
| `spacing.12` | `64px` | `spacing12` | `@dimen/bds_spacing_12` | `--spacing-12` |
| `spacing.13` | `96px` | `spacing13` | `@dimen/bds_spacing_13` | `--spacing-13` |
| `spacing.14` | `128px` | `spacing14` | `@dimen/bds_spacing_14` | `--spacing-14` |
| `spacing.2` | `4px` | `spacing2` | `@dimen/bds_spacing_2` | `--spacing-2` |
| `spacing.3` | `8px` | `spacing3` | `@dimen/bds_spacing_3` | `--spacing-3` |
| `spacing.4` | `12px` | `spacing4` | `@dimen/bds_spacing_4` | `--spacing-4` |
| `spacing.5` | `16px` | `spacing5` | `@dimen/bds_spacing_5` | `--spacing-5` |
| `spacing.6` | `20px` | `spacing6` | `@dimen/bds_spacing_6` | `--spacing-6` |
| `spacing.7` | `24px` | `spacing7` | `@dimen/bds_spacing_7` | `--spacing-7` |
| `spacing.8` | `32px` | `spacing8` | `@dimen/bds_spacing_8` | `--spacing-8` |
| `spacing.9` | `40px` | `spacing9` | `@dimen/bds_spacing_9` | `--spacing-9` |

## stroke

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `stroke.lg` | `4px` | `strokeLg` | `@dimen/bds_stroke_lg` | `--stroke-lg` |
| `stroke.md` | `2px` | `strokeMd` | `@dimen/bds_stroke_md` | `--stroke-md` |
| `stroke.sm` | `1px` | `strokeSm` | `@dimen/bds_stroke_sm` | `--stroke-sm` |

## z-index

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `z-index.base` | `0` | `zIndexBase` | `@integer/bds_z_index_base` | `--z-index-base` |
| `z-index.modal` | `200` | `zIndexModal` | `@integer/bds_z_index_modal` | `--z-index-modal` |
| `z-index.overlay` | `100` | `zIndexOverlay` | `@integer/bds_z_index_overlay` | `--z-index-overlay` |
| `z-index.raised` | `10` | `zIndexRaised` | `@integer/bds_z_index_raised` | `--z-index-raised` |
| `z-index.toast` | `300` | `zIndexToast` | `@integer/bds_z_index_toast` | `--z-index-toast` |

---

Generated by `pipeline/sd.config.mjs` (`markdown/design-doc`). See `docs/releasing-android.md` for how a change here reaches an application.
