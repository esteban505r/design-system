# FFVV Design System — Token Reference

> ## 🤖 Automatically generated — do not edit
>
> This file is written by `pipeline/sd.config.mjs` (the `markdown/design-doc`
> format) from **`brands/ffvv/figma/tokens.json`**, the single source of truth. Any edit you
> make here is overwritten the next time it regenerates.
>
> **To change a value:** change the token in Figma, export to
> `brands/ffvv/figma/tokens.json`, then run `pnpm run sync`.

### When this file regenerates

| When | What triggers it |
|---|---|
| `pnpm run sync` (or `sync:figma`) | Manually, after editing `brands/ffvv/figma/tokens.json` |
| `pnpm run build` | Style Dictionary rebuild — the `docs` platform runs with every other platform |
| **Sync tokens from Figma JSON** workflow | A push touching `brands/ffvv/figma/tokens.json`, or manual dispatch |
| **Publish Android library** / **Publish web** | Both re-run `sync:figma` from a clean checkout before publishing |
| **CI**, on every PR to `main` or `belcorp` | Re-runs `sync:figma` and **fails the build if this file differs** from what was committed |

That last row is what keeps it honest: a stale `DESIGN.md` blocks the PR, so what you read here always matches the artifact the apps compile against.

**Version:** 4.0.0  
**Tokens:** 126  
**By type:** color 83 · dimension 30 · duration 5 · number 5 · cubicBezier 3

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

- [color · bg](#color--bg) — 6
- [color · border](#color--border) — 1
- [color · brand](#color--brand) — 2
- [color · interactive](#color--interactive) — 2
- [color · status](#color--status) — 3
- [color · text](#color--text) — 4
- [motion · duration](#motion--duration) — 5
- [motion · easing](#motion--easing) — 3
- [radius](#radius) — 13
- [spacing](#spacing) — 14
- [stroke](#stroke) — 3
- [x · ffvv](#x--ffvv) — 65
- [z-index](#z-index) — 5

## color · bg

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.bg.brand-subtle` | `#F6F6F6` | `colorBgBrandSubtle` | `@color/color_bg_brand_subtle` | `--color-bg-brand-subtle` |
| `color.bg.error` | `#FFC6C6` | `colorBgError` | `@color/color_bg_error` | `--color-bg-error` |
| `color.bg.overlay` | `#00000099` | `colorBgOverlay` | `@color/color_bg_overlay` | `--color-bg-overlay` |
| `color.bg.success` | `#D2ECE2` | `colorBgSuccess` | `@color/color_bg_success` | `--color-bg-success` |
| `color.bg.surface` | `#FFFFFF` | `colorBgSurface` | `@color/color_bg_surface` | `--color-bg-surface` |
| `color.bg.warning` | `#FFEBB8` | `colorBgWarning` | `@color/color_bg_warning` | `--color-bg-warning` |

## color · border

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.border.default` | `#C4C4C4` | `colorBorderDefault` | `@color/color_border_default` | `--color-border-default` |

## color · brand

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.brand.cyzone` | `#A90061` | `colorBrandCyzone` | `@color/color_brand_cyzone` | `--color-brand-cyzone` |
| `color.brand.esika` | `#E22419` | `colorBrandEsika` | `@color/color_brand_esika` | `--color-brand-esika` |

## color · interactive

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.interactive.primary.default` | `#7D4DBE` | `colorInteractivePrimaryDefault` | `@color/color_interactive_primary_default` | `--color-interactive-primary-default` |
| `color.interactive.primary.disabled` | `#D9D9D9` | `colorInteractivePrimaryDisabled` | `@color/color_interactive_primary_disabled` | `--color-interactive-primary-disabled` |

## color · status

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.status.error` | `#D40000` | `colorStatusError` | `@color/color_status_error` | `--color-status-error` |
| `color.status.success` | `#038356` | `colorStatusSuccess` | `@color/color_status_success` | `--color-status-success` |
| `color.status.warning` | `#FFB800` | `colorStatusWarning` | `@color/color_status_warning` | `--color-status-warning` |

## color · text

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.text.disabled` | `#949393` | `colorTextDisabled` | `@color/color_text_disabled` | `--color-text-disabled` |
| `color.text.primary` | `#212121` | `colorTextPrimary` | `@color/color_text_primary` | `--color-text-primary` |
| `color.text.secondary` | `#777676` | `colorTextSecondary` | `@color/color_text_secondary` | `--color-text-secondary` |
| `color.text.tertiary` | `#858181` | `colorTextTertiary` | `@color/color_text_tertiary` | `--color-text-tertiary` |

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

## x · ffvv

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `x.ffvv.action-primary-variant` | `#6B44B3` | `xFfvvActionPrimaryVariant` | `@color/x_ffvv_action_primary_variant` | `--x-ffvv-action-primary-variant` |
| `x.ffvv.action-primary-variant2` | `#4D2B86` | `xFfvvActionPrimaryVariant2` | `@color/x_ffvv_action_primary_variant2` | `--x-ffvv-action-primary-variant2` |
| `x.ffvv.action-secondary` | `#845ED1` | `xFfvvActionSecondary` | `@color/x_ffvv_action_secondary` | `--x-ffvv-action-secondary` |
| `x.ffvv.ambar-bg` | `#DA695B` | `xFfvvAmbarBg` | `@color/x_ffvv_ambar_bg` | `--x-ffvv-ambar-bg` |
| `x.ffvv.brigth-bg` | `#59595B` | `xFfvvBrigthBg` | `@color/x_ffvv_brigth_bg` | `--x-ffvv-brigth-bg` |
| `x.ffvv.bronce-bg` | `#FDEFEB` | `xFfvvBronceBg` | `@color/x_ffvv_bronce_bg` | `--x-ffvv-bronce-bg` |
| `x.ffvv.consultant-bg` | `#868895` | `xFfvvConsultantBg` | `@color/x_ffvv_consultant_bg` | `--x-ffvv-consultant-bg` |
| `x.ffvv.coral-bg` | `#E79C45` | `xFfvvCoralBg` | `@color/x_ffvv_coral_bg` | `--x-ffvv-coral-bg` |
| `x.ffvv.diamond-bg` | `#ABABDC` | `xFfvvDiamondBg` | `@color/x_ffvv_diamond_bg` | `--x-ffvv-diamond-bg` |
| `x.ffvv.fragances-cat` | `#FF98F5` | `xFfvvFragancesCat` | `@color/x_ffvv_fragances_cat` | `--x-ffvv-fragances-cat` |
| `x.ffvv.gold-bg` | `#F3D181` | `xFfvvGoldBg` | `@color/x_ffvv_gold_bg` | `--x-ffvv-gold-bg` |
| `x.ffvv.icon-chevron` | `#374151` | `xFfvvIconChevron` | `@color/x_ffvv_icon_chevron` | `--x-ffvv-icon-chevron` |
| `x.ffvv.inspira-bg` | `#08654D2D` | `xFfvvInspiraBg` | `@color/x_ffvv_inspira_bg` | `--x-ffvv-inspira-bg` |
| `x.ffvv.inspira-icon` | `#04B4DD` | `xFfvvInspiraIcon` | `@color/x_ffvv_inspira_icon` | `--x-ffvv-inspira-icon` |
| `x.ffvv.inspira-more-bg` | `#CDF5FE` | `xFfvvInspiraMoreBg` | `@color/x_ffvv_inspira_more_bg` | `--x-ffvv-inspira-more-bg` |
| `x.ffvv.make-up-cat` | `#AF96E3` | `xFfvvMakeUpCat` | `@color/x_ffvv_make_up_cat` | `--x-ffvv-make-up-cat` |
| `x.ffvv.marker-planned` | `#6436AB` | `xFfvvMarkerPlanned` | `@color/x_ffvv_marker_planned` | `--x-ffvv-marker-planned` |
| `x.ffvv.marker-planned2` | `#471F86` | `xFfvvMarkerPlanned2` | `@color/x_ffvv_marker_planned2` | `--x-ffvv-marker-planned2` |
| `x.ffvv.marker-planned3` | `#E0D1FF` | `xFfvvMarkerPlanned3` | `@color/x_ffvv_marker_planned3` | `--x-ffvv-marker-planned3` |
| `x.ffvv.marker-planned4` | `#921291` | `xFfvvMarkerPlanned4` | `@color/x_ffvv_marker_planned4` | `--x-ffvv-marker-planned4` |
| `x.ffvv.others` | `#69E1FC` | `xFfvvOthers` | `@color/x_ffvv_others` | `--x-ffvv-others` |
| `x.ffvv.overlay-light` | `#0000004D` | `xFfvvOverlayLight` | `@color/x_ffvv_overlay_light` | `--x-ffvv-overlay-light` |
| `x.ffvv.perla-bg` | `#9E4566` | `xFfvvPerlaBg` | `@color/x_ffvv_perla_bg` | `--x-ffvv-perla-bg` |
| `x.ffvv.platinum-bg` | `#BCBCBC` | `xFfvvPlatinumBg` | `@color/x_ffvv_platinum_bg` | `--x-ffvv-platinum-bg` |
| `x.ffvv.pre-bronce-bg` | `#FFE2CF` | `xFfvvPreBronceBg` | `@color/x_ffvv_pre_bronce_bg` | `--x-ffvv-pre-bronce-bg` |
| `x.ffvv.rdd-calendar` | `#CDBFEA` | `xFfvvRddCalendar` | `@color/x_ffvv_rdd_calendar` | `--x-ffvv-rdd-calendar` |
| `x.ffvv.sell-bg` | `#E9DDF8` | `xFfvvSellBg` | `@color/x_ffvv_sell_bg` | `--x-ffvv-sell-bg` |
| `x.ffvv.silver-bg` | `#E6ECEE` | `xFfvvSilverBg` | `@color/x_ffvv_silver_bg` | `--x-ffvv-silver-bg` |
| `x.ffvv.state-error-container-on` | `#BA1A1A` | `xFfvvStateErrorContainerOn` | `@color/x_ffvv_state_error_container_on` | `--x-ffvv-state-error-container-on` |
| `x.ffvv.state-error-container2` | `#E1386F` | `xFfvvStateErrorContainer2` | `@color/x_ffvv_state_error_container2` | `--x-ffvv-state-error-container2` |
| `x.ffvv.state-error-container3` | `#FBEAE9` | `xFfvvStateErrorContainer3` | `@color/x_ffvv_state_error_container3` | `--x-ffvv-state-error-container3` |
| `x.ffvv.state-error2` | `#FE454B` | `xFfvvStateError2` | `@color/x_ffvv_state_error2` | `--x-ffvv-state-error2` |
| `x.ffvv.state-error3` | `#E1251B` | `xFfvvStateError3` | `@color/x_ffvv_state_error3` | `--x-ffvv-state-error3` |
| `x.ffvv.state-success-container2` | `#E6F3EE` | `xFfvvStateSuccessContainer2` | `@color/x_ffvv_state_success_container2` | `--x-ffvv-state-success-container2` |
| `x.ffvv.state-success-container3` | `#E5F2EE` | `xFfvvStateSuccessContainer3` | `@color/x_ffvv_state_success_container3` | `--x-ffvv-state-success-container3` |
| `x.ffvv.state-success2` | `#047857` | `xFfvvStateSuccess2` | `@color/x_ffvv_state_success2` | `--x-ffvv-state-success2` |
| `x.ffvv.state-success3` | `#08A66E` | `xFfvvStateSuccess3` | `@color/x_ffvv_state_success3` | `--x-ffvv-state-success3` |
| `x.ffvv.state-warning-container2` | `#FFC83E` | `xFfvvStateWarningContainer2` | `@color/x_ffvv_state_warning_container2` | `--x-ffvv-state-warning-container2` |
| `x.ffvv.state-warning2` | `#E0A000` | `xFfvvStateWarning2` | `@color/x_ffvv_state_warning2` | `--x-ffvv-state-warning2` |
| `x.ffvv.surface-banner-monto-faltante` | `#F8CD64` | `xFfvvSurfaceBannerMontoFaltante` | `@color/x_ffvv_surface_banner_monto_faltante` | `--x-ffvv-surface-banner-monto-faltante` |
| `x.ffvv.surface-brand-bg-profile` | `#EFE9FF` | `xFfvvSurfaceBrandBgProfile` | `@color/x_ffvv_surface_brand_bg_profile` | `--x-ffvv-surface-brand-bg-profile` |
| `x.ffvv.surface-brand-checked` | `#EEEAF4` | `xFfvvSurfaceBrandChecked` | `@color/x_ffvv_surface_brand_checked` | `--x-ffvv-surface-brand-checked` |
| `x.ffvv.surface-brand-checked-new` | `#F0ECF5` | `xFfvvSurfaceBrandCheckedNew` | `@color/x_ffvv_surface_brand_checked_new` | `--x-ffvv-surface-brand-checked-new` |
| `x.ffvv.surface-first-kit` | `#E3F2FD` | `xFfvvSurfaceFirstKit` | `@color/x_ffvv_surface_first_kit` | `--x-ffvv-surface-first-kit` |
| `x.ffvv.surface-five` | `#F4F4F4` | `xFfvvSurfaceFive` | `@color/x_ffvv_surface_five` | `--x-ffvv-surface-five` |
| `x.ffvv.surface-four` | `#545353` | `xFfvvSurfaceFour` | `@color/x_ffvv_surface_four` | `--x-ffvv-surface-four` |
| `x.ffvv.surface-isa-end` | `#A577D2` | `xFfvvSurfaceIsaEnd` | `@color/x_ffvv_surface_isa_end` | `--x-ffvv-surface-isa-end` |
| `x.ffvv.surface-isa-mid` | `#8059A7` | `xFfvvSurfaceIsaMid` | `@color/x_ffvv_surface_isa_mid` | `--x-ffvv-surface-isa-mid` |
| `x.ffvv.surface-isa-start` | `#5D3886` | `xFfvvSurfaceIsaStart` | `@color/x_ffvv_surface_isa_start` | `--x-ffvv-surface-isa-start` |
| `x.ffvv.surface-level-deep` | `#2D0865` | `xFfvvSurfaceLevelDeep` | `@color/x_ffvv_surface_level_deep` | `--x-ffvv-surface-level-deep` |
| `x.ffvv.surface-second-kit` | `#FFEBEE` | `xFfvvSurfaceSecondKit` | `@color/x_ffvv_surface_second_kit` | `--x-ffvv-surface-second-kit` |
| `x.ffvv.surface-secondary` | `#E3E3E3` | `xFfvvSurfaceSecondary` | `@color/x_ffvv_surface_secondary` | `--x-ffvv-surface-secondary` |
| `x.ffvv.surface-selected` | `#DBCCFD` | `xFfvvSurfaceSelected` | `@color/x_ffvv_surface_selected` | `--x-ffvv-surface-selected` |
| `x.ffvv.surface-success-gradient-end` | `#513285` | `xFfvvSurfaceSuccessGradientEnd` | `@color/x_ffvv_surface_success_gradient_end` | `--x-ffvv-surface-success-gradient-end` |
| `x.ffvv.surface-success-gradient-start` | `#572890` | `xFfvvSurfaceSuccessGradientStart` | `@color/x_ffvv_surface_success_gradient_start` | `--x-ffvv-surface-success-gradient-start` |
| `x.ffvv.surface-third` | `#EFEFEF` | `xFfvvSurfaceThird` | `@color/x_ffvv_surface_third` | `--x-ffvv-surface-third` |
| `x.ffvv.surface-third-kit` | `#F5F5F5` | `xFfvvSurfaceThirdKit` | `@color/x_ffvv_surface_third_kit` | `--x-ffvv-surface-third-kit` |
| `x.ffvv.text-heading` | `#3B3A3A` | `xFfvvTextHeading` | `@color/x_ffvv_text_heading` | `--x-ffvv-text-heading` |
| `x.ffvv.text-inactive2` | `#CECECE` | `xFfvvTextInactive2` | `@color/x_ffvv_text_inactive2` | `--x-ffvv-text-inactive2` |
| `x.ffvv.text-inactive3` | `#E0E0E0` | `xFfvvTextInactive3` | `@color/x_ffvv_text_inactive3` | `--x-ffvv-text-inactive3` |
| `x.ffvv.text-inactive4` | `#48484A` | `xFfvvTextInactive4` | `@color/x_ffvv_text_inactive4` | `--x-ffvv-text-inactive4` |
| `x.ffvv.text-inactive5` | `#F1F1F0` | `xFfvvTextInactive5` | `@color/x_ffvv_text_inactive5` | `--x-ffvv-text-inactive5` |
| `x.ffvv.text-inactive6` | `#2C2C2C` | `xFfvvTextInactive6` | `@color/x_ffvv_text_inactive6` | `--x-ffvv-text-inactive6` |
| `x.ffvv.topacio-bg` | `#2F6D9C` | `xFfvvTopacioBg` | `@color/x_ffvv_topacio_bg` | `--x-ffvv-topacio-bg` |
| `x.ffvv.whats-app` | `#08C683` | `xFfvvWhatsApp` | `@color/x_ffvv_whats_app` | `--x-ffvv-whats-app` |

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
