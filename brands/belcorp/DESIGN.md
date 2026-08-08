# Belcorp Design System — Token Reference

> ## 🤖 Automatically generated — do not edit
>
> This file is written by `pipeline/sd.config.mjs` (the `markdown/design-doc`
> format) from **`brands/belcorp/figma/tokens.json`**, the single source of truth. Any edit you
> make here is overwritten the next time it regenerates.
>
> **To change a value:** change the token in Figma, export to
> `brands/belcorp/figma/tokens.json`, then run `pnpm run sync`.

### When this file regenerates

| When | What triggers it |
|---|---|
| `pnpm run sync` (or `sync:figma`) | Manually, after editing `brands/belcorp/figma/tokens.json` |
| `pnpm run build` | Style Dictionary rebuild — the `docs` platform runs with every other platform |
| **Sync tokens from Figma JSON** workflow | A push touching `brands/belcorp/figma/tokens.json`, or manual dispatch |
| **Publish Android library** / **Publish web** | Both re-run `sync:figma` from a clean checkout before publishing |
| **CI**, on every PR to `main` or `belcorp` | Re-runs `sync:figma` and **fails the build if this file differs** from what was committed |

That last row is what keeps it honest: a stale `DESIGN.md` blocks the PR, so what you read here always matches the artifact the apps compile against.

**Version:** 3.0.0  
**Tokens:** 317  
**By type:** color 240 · dimension 42 · fontSize 12 · shadow 5 · duration 5 · number 5 · fontWeight 4 · cubicBezier 3 · fontFamily 1

## How to reference a token

Every token below is listed with the exact identifier to type on each platform.

| Platform | Import | Example |
|---|---|---|
| Compose | `com.estebanruano.designtokens.DesignTokens` | `DesignTokens.colorPrimary500` |
| Android XML | AAR resources | `@color/color_primary_500` |
| iOS (Swift) | `DesignTokens` | `DesignTokens.colorPrimary500` |
| Flutter | `design_tokens.dart` | `DesignTokens.colorPrimary500` |
| Web (CSS) | `tokens.css` | `var(--color-primary-500)` |
| Web (JS) | `tokens.js` | `ColorPrimary500` |

## Contents

- [color · app](#color--app) — 118
- [color · bg](#color--bg) — 11
- [color · blue](#color--blue) — 5
- [color · border](#color--border) — 4
- [color · brand](#color--brand) — 4
- [color · brown](#color--brown) — 1
- [color · burgundy](#color--burgundy) — 1
- [color · cyan](#color--cyan) — 1
- [color · gray](#color--gray) — 10
- [color · green](#color--green) — 2
- [color · interactive](#color--interactive) — 6
- [color · neutral](#color--neutral) — 12
- [color · orange](#color--orange) — 1
- [color · pink](#color--pink) — 6
- [color · primary](#color--primary) — 10
- [color · purple](#color--purple) — 9
- [color · red](#color--red) — 5
- [color · secondary](#color--secondary) — 10
- [color · status](#color--status) — 12
- [color · text](#color--text) — 10
- [color · yellow](#color--yellow) — 2
- [elevation](#elevation) — 5
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

## color · app

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.app.black.alpha-40` | `#00000066` | `colorAppBlackAlpha40` | `@color/color_app_black_alpha_40` | `--color-app-black-alpha-40` |
| `color.app.blue.50-light` | `#FFF6F1` | `colorAppBlue50Light` | `@color/color_app_blue_50_light` | `--color-app-blue-50-light` |
| `color.app.blue.alpha-50` | `#C23F2F80` | `colorAppBlueAlpha50` | `@color/color_app_blue_alpha_50` | `--color-app-blue-alpha-50` |
| `color.app.border-subtle` | `#00000011` | `colorAppBorderSubtle` | `@color/color_app_border_subtle` | `--color-app-border-subtle` |
| `color.app.brand-tint-05` | `#BE5B060D` | `colorAppBrandTint05` | `@color/color_app_brand_tint_05` | `--color-app-brand-tint-05` |
| `color.app.camino-ambar` | `#59A354` | `colorAppCaminoAmbar` | `@color/color_app_camino_ambar` | `--color-app-camino-ambar` |
| `color.app.camino-ambar-deep` | `#18712C` | `colorAppCaminoAmbarDeep` | `@color/color_app_camino_ambar_deep` | `--color-app-camino-ambar-deep` |
| `color.app.camino-brillante` | `#605852` | `colorAppCaminoBrillante` | `@color/color_app_camino_brillante` | `--color-app-camino-brillante` |
| `color.app.camino-brillante-deep` | `#27201C` | `colorAppCaminoBrillanteDeep` | `@color/color_app_camino_brillante_deep` | `--color-app-camino-brillante-deep` |
| `color.app.camino-club-card-bg` | `#FFFCFA` | `colorAppCaminoClubCardBg` | `@color/color_app_camino_club_card_bg` | `--color-app-camino-club-card-bg` |
| `color.app.camino-club-card-gold` | `#00AB93` | `colorAppCaminoClubCardGold` | `@color/color_app_camino_club_card_gold` | `--color-app-camino-club-card-gold` |
| `color.app.camino-club-card-highlight` | `#CAFAFF` | `colorAppCaminoClubCardHighlight` | `@color/color_app_camino_club_card_highlight` | `--color-app-camino-club-card-highlight` |
| `color.app.camino-consultora` | `#AB551B` | `colorAppCaminoConsultora` | `@color/color_app_camino_consultora` | `--color-app-camino-consultora` |
| `color.app.camino-consultora-deep` | `#5E2900` | `colorAppCaminoConsultoraDeep` | `@color/color_app_camino_consultora_deep` | `--color-app-camino-consultora-deep` |
| `color.app.camino-coral` | `#00CCB4` | `colorAppCaminoCoral` | `@color/color_app_camino_coral` | `--color-app-camino-coral` |
| `color.app.camino-coral-deep` | `#007667` | `colorAppCaminoCoralDeep` | `@color/color_app_camino_coral_deep` | `--color-app-camino-coral-deep` |
| `color.app.camino-cristal` | `#B791C4` | `colorAppCaminoCristal` | `@color/color_app_camino_cristal` | `--color-app-camino-cristal` |
| `color.app.camino-cristal-light` | `#D9C8F5` | `colorAppCaminoCristalLight` | `@color/color_app_camino_cristal_light` | `--color-app-camino-cristal-light` |
| `color.app.camino-diamante` | `#AF666B` | `colorAppCaminoDiamante` | `@color/color_app_camino_diamante` | `--color-app-camino-diamante` |
| `color.app.camino-diamante-light` | `#CA8A8F` | `colorAppCaminoDiamanteLight` | `@color/color_app_camino_diamante_light` | `--color-app-camino-diamante-light` |
| `color.app.camino-first-level` | `#00883C` | `colorAppCaminoFirstLevel` | `@color/color_app_camino_first_level` | `--color-app-camino-first-level` |
| `color.app.camino-gran-brillante` | `#00B2A7` | `colorAppCaminoGranBrillante` | `@color/color_app_camino_gran_brillante` | `--color-app-camino-gran-brillante` |
| `color.app.camino-gran-brillante-light` | `#00DDE7` | `colorAppCaminoGranBrillanteLight` | `@color/color_app_camino_gran_brillante_light` | `--color-app-camino-gran-brillante-light` |
| `color.app.camino-jade` | `#98ACE3` | `colorAppCaminoJade` | `@color/color_app_camino_jade` | `--color-app-camino-jade` |
| `color.app.camino-perla-deep` | `#454908` | `colorAppCaminoPerlaDeep` | `@color/color_app_camino_perla_deep` | `--color-app-camino-perla-deep` |
| `color.app.camino-rubi` | `#4E8C29` | `colorAppCaminoRubi` | `@color/color_app_camino_rubi` | `--color-app-camino-rubi` |
| `color.app.camino-rubi-light` | `#88A55D` | `colorAppCaminoRubiLight` | `@color/color_app_camino_rubi_light` | `--color-app-camino-rubi-light` |
| `color.app.camino-topacio` | `#AD6475` | `colorAppCaminoTopacio` | `@color/color_app_camino_topacio` | `--color-app-camino-topacio` |
| `color.app.camino-topacio-deep` | `#6C3D46` | `colorAppCaminoTopacioDeep` | `@color/color_app_camino_topacio_deep` | `--color-app-camino-topacio-deep` |
| `color.app.campaign-purple` | `#D65B0D` | `colorAppCampaignPurple` | `@color/color_app_campaign_purple` | `--color-app-campaign-purple` |
| `color.app.check-campaign-purple` | `#D1651F` | `colorAppCheckCampaignPurple` | `@color/color_app_check_campaign_purple` | `--color-app-check-campaign-purple` |
| `color.app.divider-dotted` | `#9B918C` | `colorAppDividerDotted` | `@color/color_app_divider_dotted` | `--color-app-divider-dotted` |
| `color.app.divider-onboarding` | `#251E19` | `colorAppDividerOnboarding` | `@color/color_app_divider_onboarding` | `--color-app-divider-onboarding` |
| `color.app.divider-solid-dark` | `#180F08` | `colorAppDividerSolidDark` | `@color/color_app_divider_solid_dark` | `--color-app-divider-solid-dark` |
| `color.app.dream-survey-bg` | `#FFE1D6` | `colorAppDreamSurveyBg` | `@color/color_app_dream_survey_bg` | `--color-app-dream-survey-bg` |
| `color.app.earnings-pink-bg` | `#FEF2EC` | `colorAppEarningsPinkBg` | `@color/color_app_earnings_pink_bg` | `--color-app-earnings-pink-bg` |
| `color.app.ecatalogue-blue` | `#C23F2F` | `colorAppEcatalogueBlue` | `@color/color_app_ecatalogue_blue` | `--color-app-ecatalogue-blue` |
| `color.app.event-tag-gold` | `#00ABA1` | `colorAppEventTagGold` | `@color/color_app_event_tag_gold` | `--color-app-event-tag-gold` |
| `color.app.gana-plus-indigo` | `#A84300` | `colorAppGanaPlusIndigo` | `@color/color_app_gana_plus_indigo` | `--color-app-gana-plus-indigo` |
| `color.app.gana-plus-purple` | `#BA6100` | `colorAppGanaPlusPurple` | `@color/color_app_gana_plus_purple` | `--color-app-gana-plus-purple` |
| `color.app.gray.300-light` | `#CDC2BC` | `colorAppGray300Light` | `@color/color_app_gray_300_light` | `--color-app-gray-300-light` |
| `color.app.gray.50-warm` | `#FFF4EE` | `colorAppGray50Warm` | `@color/color_app_gray_50_warm` | `--color-app-gray-50-warm` |
| `color.app.gray.600-warm` | `#7E746F` | `colorAppGray600Warm` | `@color/color_app_gray_600_warm` | `--color-app-gray-600-warm` |
| `color.app.green.alpha-20` | `#98ACE333` | `colorAppGreenAlpha20` | `@color/color_app_green_alpha_20` | `--color-app-green-alpha-20` |
| `color.app.header-purple-deep` | `#833600` | `colorAppHeaderPurpleDeep` | `@color/color_app_header_purple_deep` | `--color-app-header-purple-deep` |
| `color.app.header-purple-light` | `#FFE8DF` | `colorAppHeaderPurpleLight` | `@color/color_app_header_purple_light` | `--color-app-header-purple-light` |
| `color.app.header-text-dark` | `#27201B` | `colorAppHeaderTextDark` | `@color/color_app_header_text_dark` | `--color-app-header-text-dark` |
| `color.app.highlight-arrow` | `#E6B6F1` | `colorAppHighlightArrow` | `@color/color_app_highlight_arrow` | `--color-app-highlight-arrow` |
| `color.app.icon-burgundy` | `#75712A` | `colorAppIconBurgundy` | `@color/color_app_icon_burgundy` | `--color-app-icon-burgundy` |
| `color.app.learning-path-bg` | `#FFDECF` | `colorAppLearningPathBg` | `@color/color_app_learning_path_bg` | `--color-app-learning-path-bg` |
| `color.app.learning-path-dark` | `#642B00` | `colorAppLearningPathDark` | `@color/color_app_learning_path_dark` | `--color-app-learning-path-dark` |
| `color.app.learning-path-lilac` | `#FFC8AC` | `colorAppLearningPathLilac` | `@color/color_app_learning_path_lilac` | `--color-app-learning-path-lilac` |
| `color.app.learning-path-pink` | `#FBE1C0` | `colorAppLearningPathPink` | `@color/color_app_learning_path_pink` | `--color-app-learning-path-pink` |
| `color.app.learning-path-purple` | `#AE4F00` | `colorAppLearningPathPurple` | `@color/color_app_learning_path_purple` | `--color-app-learning-path-purple` |
| `color.app.modifier-indigo` | `#F36006` | `colorAppModifierIndigo` | `@color/color_app_modifier_indigo` | `--color-app-modifier-indigo` |
| `color.app.modifier-lilac` | `#FFCDB8` | `colorAppModifierLilac` | `@color/color_app_modifier_lilac` | `--color-app-modifier-lilac` |
| `color.app.offer-of-the-day-gold` | `#00CBCB` | `colorAppOfferOfTheDayGold` | `@color/color_app_offer_of_the_day_gold` | `--color-app-offer-of-the-day-gold` |
| `color.app.payment-blue` | `#CD6870` | `colorAppPaymentBlue` | `@color/color_app_payment_blue` | `--color-app-payment-blue` |
| `color.app.pdp-bg` | `#FEF3ED` | `colorAppPdpBg` | `@color/color_app_pdp_bg` | `--color-app-pdp-bg` |
| `color.app.period-purple` | `#A16300` | `colorAppPeriodPurple` | `@color/color_app_period_purple` | `--color-app-period-purple` |
| `color.app.pink.50-dark` | `#F7EEDC` | `colorAppPink50Dark` | `@color/color_app_pink_50_dark` | `--color-app-pink-50-dark` |
| `color.app.points-amber` | `#00D5BB` | `colorAppPointsAmber` | `@color/color_app_points_amber` | `--color-app-points-amber` |
| `color.app.points-orange` | `#00BD71` | `colorAppPointsOrange` | `@color/color_app_points_orange` | `--color-app-points-orange` |
| `color.app.points-teal` | `#C2BAFF` | `colorAppPointsTeal` | `@color/color_app_points_teal` | `--color-app-points-teal` |
| `color.app.purple-deep-action` | `#A44700` | `colorAppPurpleDeepAction` | `@color/color_app_purple_deep_action` | `--color-app-purple-deep-action` |
| `color.app.purple.100-message` | `#FEE7D7` | `colorAppPurple100Message` | `@color/color_app_purple_100_message` | `--color-app-purple-100-message` |
| `color.app.purple.100-quiz` | `#FFE9DF` | `colorAppPurple100Quiz` | `@color/color_app_purple_100_quiz` | `--color-app-purple-100-quiz` |
| `color.app.purple.200-alpha-15` | `#FAA98226` | `colorAppPurple200Alpha15` | `@color/color_app_purple_200_alpha_15` | `--color-app-purple-200-alpha-15` |
| `color.app.purple.200-gradient` | `#FCC6B1` | `colorAppPurple200Gradient` | `@color/color_app_purple_200_gradient` | `--color-app-purple-200-gradient` |
| `color.app.purple.200-light` | `#FFCCB3` | `colorAppPurple200Light` | `@color/color_app_purple_200_light` | `--color-app-purple-200-light` |
| `color.app.purple.200-mid` | `#FFCEB8` | `colorAppPurple200Mid` | `@color/color_app_purple_200_mid` | `--color-app-purple-200-mid` |
| `color.app.purple.300-end` | `#F07900` | `colorAppPurple300End` | `@color/color_app_purple_300_end` | `--color-app-purple-300-end` |
| `color.app.purple.300-scrim` | `#FAA982` | `colorAppPurple300Scrim` | `@color/color_app_purple_300_scrim` | `--color-app-purple-300-scrim` |
| `color.app.purple.400-light` | `#DB8B5B` | `colorAppPurple400Light` | `@color/color_app_purple_400_light` | `--color-app-purple-400-light` |
| `color.app.purple.50-bottom` | `#FFEFE8` | `colorAppPurple50Bottom` | `@color/color_app_purple_50_bottom` | `--color-app-purple-50-bottom` |
| `color.app.purple.50-tip` | `#FFF2EA` | `colorAppPurple50Tip` | `@color/color_app_purple_50_tip` | `--color-app-purple-50-tip` |
| `color.app.purple.500-action` | `#C4642A` | `colorAppPurple500Action` | `@color/color_app_purple_500_action` | `--color-app-purple-500-action` |
| `color.app.purple.500-animation` | `#A76600` | `colorAppPurple500Animation` | `@color/color_app_purple_500_animation` | `--color-app-purple-500-animation` |
| `color.app.purple.500-light` | `#D0773D` | `colorAppPurple500Light` | `@color/color_app_purple_500_light` | `--color-app-purple-500-light` |
| `color.app.purple.600-consultora` | `#BE6100` | `colorAppPurple600Consultora` | `@color/color_app_purple_600_consultora` | `--color-app-purple-600-consultora` |
| `color.app.purple.600-gana` | `#965E00` | `colorAppPurple600Gana` | `@color/color_app_purple_600_gana` | `--color-app-purple-600-gana` |
| `color.app.purple.600-light` | `#C66722` | `colorAppPurple600Light` | `@color/color_app_purple_600_light` | `--color-app-purple-600-light` |
| `color.app.purple.600-mid` | `#AC592B` | `colorAppPurple600Mid` | `@color/color_app_purple_600_mid` | `--color-app-purple-600-mid` |
| `color.app.purple.700-alpha-50` | `#BE5B0680` | `colorAppPurple700Alpha50` | `@color/color_app_purple_700_alpha_50` | `--color-app-purple-700-alpha-50` |
| `color.app.purple.700-light` | `#B35400` | `colorAppPurple700Light` | `@color/color_app_purple_700_light` | `--color-app-purple-700-light` |
| `color.app.purple.800-alpha-20` | `#A34A0033` | `colorAppPurple800Alpha20` | `@color/color_app_purple_800_alpha_20` | `--color-app-purple-800-alpha-20` |
| `color.app.purple.800-animation` | `#754E00` | `colorAppPurple800Animation` | `@color/color_app_purple_800_animation` | `--color-app-purple-800-animation` |
| `color.app.purple.900-brillante` | `#7A3B04` | `colorAppPurple900Brillante` | `@color/color_app_purple_900_brillante` | `--color-app-purple-900-brillante` |
| `color.app.purple.900-dark` | `#5B4133` | `colorAppPurple900Dark` | `@color/color_app_purple_900_dark` | `--color-app-purple-900-dark` |
| `color.app.quiz-answer-correct` | `#00B2F0` | `colorAppQuizAnswerCorrect` | `@color/color_app_quiz_answer_correct` | `--color-app-quiz-answer-correct` |
| `color.app.quiz-feedback-bg` | `#E0D4FF` | `colorAppQuizFeedbackBg` | `@color/color_app_quiz_feedback_bg` | `--color-app-quiz-feedback-bg` |
| `color.app.quiz-feedback-green` | `#08A66E` | `colorAppQuizFeedbackGreen` | `@color/color_app_quiz_feedback_green` | `--color-app-quiz-feedback-green` |
| `color.app.quiz-message-text` | `#4B423E` | `colorAppQuizMessageText` | `@color/color_app_quiz_message_text` | `--color-app-quiz-message-text` |
| `color.app.quiz-progress-completed` | `#EB9A6F` | `colorAppQuizProgressCompleted` | `@color/color_app_quiz_progress_completed` | `--color-app-quiz-progress-completed` |
| `color.app.quiz-progress-track` | `#E9DED8` | `colorAppQuizProgressTrack` | `@color/color_app_quiz_progress_track` | `--color-app-quiz-progress-track` |
| `color.app.red.alpha-50` | `#00984080` | `colorAppRedAlpha50` | `@color/color_app_red_alpha_50` | `--color-app-red-alpha-50` |
| `color.app.referrals-bg` | `#FEF3ED` | `colorAppReferralsBg` | `@color/color_app_referrals_bg` | `--color-app-referrals-bg` |
| `color.app.refresh-green` | `#6EB7FF` | `colorAppRefreshGreen` | `@color/color_app_refresh_green` | `--color-app-refresh-green` |
| `color.app.scrim-30` | `#0000004D` | `colorAppScrim30` | `@color/color_app_scrim_30` | `--color-app-scrim-30` |
| `color.app.scrim-50` | `#00000080` | `colorAppScrim50` | `@color/color_app_scrim_50` | `--color-app-scrim-50` |
| `color.app.shadow-15` | `#00000026` | `colorAppShadow15` | `@color/color_app_shadow_15` | `--color-app-shadow-15` |
| `color.app.shimmer-highlight` | `#E9DED8` | `colorAppShimmerHighlight` | `@color/color_app_shimmer_highlight` | `--color-app-shimmer-highlight` |
| `color.app.star-animated-lilac` | `#FC8A3A` | `colorAppStarAnimatedLilac` | `@color/color_app_star_animated_lilac` | `--color-app-star-animated-lilac` |
| `color.app.star-animated-magenta` | `#A79700` | `colorAppStarAnimatedMagenta` | `@color/color_app_star_animated_magenta` | `--color-app-star-animated-magenta` |
| `color.app.star-animated-violet` | `#C87400` | `colorAppStarAnimatedViolet` | `@color/color_app_star_animated_violet` | `--color-app-star-animated-violet` |
| `color.app.stars-proximity-pink` | `#F7B954` | `colorAppStarsProximityPink` | `@color/color_app_stars_proximity_pink` | `--color-app-stars-proximity-pink` |
| `color.app.stat-text-gray` | `#685F5A` | `colorAppStatTextGray` | `@color/color_app_stat_text_gray` | `--color-app-stat-text-gray` |
| `color.app.tab-fallback-accent` | `#C15200` | `colorAppTabFallbackAccent` | `@color/color_app_tab_fallback_accent` | `--color-app-tab-fallback-accent` |
| `color.app.tab-unselected` | `#FFDBCB` | `colorAppTabUnselected` | `@color/color_app_tab_unselected` | `--color-app-tab-unselected` |
| `color.app.tooltip-purple` | `#D75600` | `colorAppTooltipPurple` | `@color/color_app_tooltip_purple` | `--color-app-tooltip-purple` |
| `color.app.tracker-bg` | `#FFFDFB` | `colorAppTrackerBg` | `@color/color_app_tracker_bg` | `--color-app-tracker-bg` |
| `color.app.unbeatable-dark` | `#854214` | `colorAppUnbeatableDark` | `@color/color_app_unbeatable_dark` | `--color-app-unbeatable-dark` |
| `color.app.unbeatable-purple` | `#BE5A00` | `colorAppUnbeatablePurple` | `@color/color_app_unbeatable_purple` | `--color-app-unbeatable-purple` |
| `color.app.video-control-icon` | `#ECE1DB` | `colorAppVideoControlIcon` | `@color/color_app_video_control_icon` | `--color-app-video-control-icon` |
| `color.app.video-controls-bg` | `#462D25` | `colorAppVideoControlsBg` | `@color/color_app_video_controls_bg` | `--color-app-video-controls-bg` |
| `color.app.white-alpha-20` | `#FFFFFF33` | `colorAppWhiteAlpha20` | `@color/color_app_white_alpha_20` | `--color-app-white-alpha-20` |
| `color.app.white.alpha-75` | `#FFFFFFBF` | `colorAppWhiteAlpha75` | `@color/color_app_white_alpha_75` | `--color-app-white-alpha-75` |
| `color.app.yellow.alpha-50` | `#00ABA180` | `colorAppYellowAlpha50` | `@color/color_app_yellow_alpha_50` | `--color-app-yellow-alpha-50` |

## color · bg

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.bg.brand` | `#BE5B06` | `colorBgBrand` | `@color/color_bg_brand` | `--color-bg-brand` |
| `color.bg.brand-subtle` | `#FEE4D6` | `colorBgBrandSubtle` | `@color/color_bg_brand_subtle` | `--color-bg-brand-subtle` |
| `color.bg.disabled` | `#FDF2EC` | `colorBgDisabled` | `@color/color_bg_disabled` | `--color-bg-disabled` |
| `color.bg.error` | `#FEE2E2` | `colorBgError` | `@color/color_bg_error` | `--color-bg-error` |
| `color.bg.info` | `#DBEAFE` | `colorBgInfo` | `@color/color_bg_info` | `--color-bg-info` |
| `color.bg.overlay` | `#0F050099` | `colorBgOverlay` | `@color/color_bg_overlay` | `--color-bg-overlay` |
| `color.bg.page` | `#FFFFFF` | `colorBgPage` | `@color/color_bg_page` | `--color-bg-page` |
| `color.bg.subtle` | `#FFF9F5` | `colorBgSubtle` | `@color/color_bg_subtle` | `--color-bg-subtle` |
| `color.bg.success` | `#BBF7D0` | `colorBgSuccess` | `@color/color_bg_success` | `--color-bg-success` |
| `color.bg.surface` | `#FFFFFF` | `colorBgSurface` | `@color/color_bg_surface` | `--color-bg-surface` |
| `color.bg.warning` | `#FEF3C7` | `colorBgWarning` | `@color/color_bg_warning` | `--color-bg-warning` |

## color · blue

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.blue.100` | `#FDE5EE` | `colorBlue100` | `@color/color_blue_100` | `--color-blue-100` |
| `color.blue.300` | `#F1BAC4` | `colorBlue300` | `@color/color_blue_300` | `--color-blue-300` |
| `color.blue.50` | `#FFF6F0` | `colorBlue50` | `@color/color_blue_50` | `--color-blue-50` |
| `color.blue.600` | `#CB82A5` | `colorBlue600` | `@color/color_blue_600` | `--color-blue-600` |
| `color.blue.700` | `#CD676E` | `colorBlue700` | `@color/color_blue_700` | `--color-blue-700` |

## color · border

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.border.brand` | `#BE5B06` | `colorBorderBrand` | `@color/color_border_brand` | `--color-border-brand` |
| `color.border.default` | `#F0E5DF` | `colorBorderDefault` | `@color/color_border_default` | `--color-border-default` |
| `color.border.disabled` | `#F0E5DF` | `colorBorderDisabled` | `@color/color_border_disabled` | `--color-border-disabled` |
| `color.border.strong` | `#DDD3CD` | `colorBorderStrong` | `@color/color_border_strong` | `--color-border-strong` |

## color · brand

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.brand.belcorp` | `#BE5B06` | `colorBrandBelcorp` | `@color/color_brand_belcorp` | `--color-brand-belcorp` |
| `color.brand.cyzone` | `#A90061` | `colorBrandCyzone` | `@color/color_brand_cyzone` | `--color-brand-cyzone` |
| `color.brand.esika` | `#E1251B` | `colorBrandEsika` | `@color/color_brand_esika` | `--color-brand-esika` |
| `color.brand.lbel` | `#2E1A47` | `colorBrandLbel` | `@color/color_brand_lbel` | `--color-brand-lbel` |

## color · brown

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.brown.600` | `#457972` | `colorBrown600` | `@color/color_brown_600` | `--color-brown-600` |

## color · burgundy

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.burgundy.800` | `#473B00` | `colorBurgundy800` | `@color/color_burgundy_800` | `--color-burgundy-800` |

## color · cyan

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.cyan.500` | `#D092C5` | `colorCyan500` | `@color/color_cyan_500` | `--color-cyan-500` |

## color · gray

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.gray.100` | `#F8EDE7` | `colorGray100` | `@color/color_gray_100` | `--color-gray-100` |
| `color.gray.200` | `#E2D7D1` | `colorGray200` | `@color/color_gray_200` | `--color-gray-200` |
| `color.gray.300` | `#D5CAC4` | `colorGray300` | `@color/color_gray_300` | `--color-gray-300` |
| `color.gray.400` | `#C6BBB5` | `colorGray400` | `@color/color_gray_400` | `--color-gray-400` |
| `color.gray.50` | `#FBF0EA` | `colorGray50` | `@color/color_gray_50` | `--color-gray-50` |
| `color.gray.500` | `#988F89` | `colorGray500` | `@color/color_gray_500` | `--color-gray-500` |
| `color.gray.600` | `#786E69` | `colorGray600` | `@color/color_gray_600` | `--color-gray-600` |
| `color.gray.700` | `#5A524D` | `colorGray700` | `@color/color_gray_700` | `--color-gray-700` |
| `color.gray.800` | `#413934` | `colorGray800` | `@color/color_gray_800` | `--color-gray-800` |
| `color.gray.850` | `#3B332E` | `colorGray850` | `@color/color_gray_850` | `--color-gray-850` |

## color · green

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.green.50` | `#F9EEE8` | `colorGreen50` | `@color/color_green_50` | `--color-green-50` |
| `color.green.700` | `#2587CF` | `colorGreen700` | `@color/color_green_700` | `--color-green-700` |

## color · interactive

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.interactive.focus-ring` | `#CD6516` | `colorInteractiveFocusRing` | `@color/color_interactive_focus_ring` | `--color-interactive-focus-ring` |
| `color.interactive.primary.active` | `#7F3900` | `colorInteractivePrimaryActive` | `@color/color_interactive_primary_active` | `--color-interactive-primary-active` |
| `color.interactive.primary.default` | `#BE5B06` | `colorInteractivePrimaryDefault` | `@color/color_interactive_primary_default` | `--color-interactive-primary-default` |
| `color.interactive.primary.disabled` | `#F0E5DF` | `colorInteractivePrimaryDisabled` | `@color/color_interactive_primary_disabled` | `--color-interactive-primary-disabled` |
| `color.interactive.primary.hover` | `#A34A00` | `colorInteractivePrimaryHover` | `@color/color_interactive_primary_hover` | `--color-interactive-primary-hover` |
| `color.interactive.primary.text` | `#FFFFFF` | `colorInteractivePrimaryText` | `@color/color_interactive_primary_text` | `--color-interactive-primary-text` |

## color · neutral

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.neutral.0` | `#FFFFFF` | `colorNeutral0` | `@color/color_neutral_0` | `--color-neutral-0` |
| `color.neutral.100` | `#FDF2EC` | `colorNeutral100` | `@color/color_neutral_100` | `--color-neutral-100` |
| `color.neutral.1000` | `#000000` | `colorNeutral1000` | `@color/color_neutral_1000` | `--color-neutral-1000` |
| `color.neutral.200` | `#F0E5DF` | `colorNeutral200` | `@color/color_neutral_200` | `--color-neutral-200` |
| `color.neutral.300` | `#DDD3CD` | `colorNeutral300` | `@color/color_neutral_300` | `--color-neutral-300` |
| `color.neutral.400` | `#BBA9A9` | `colorNeutral400` | `@color/color_neutral_400` | `--color-neutral-400` |
| `color.neutral.50` | `#FFF9F5` | `colorNeutral50` | `@color/color_neutral_50` | `--color-neutral-50` |
| `color.neutral.500` | `#917C7C` | `colorNeutral500` | `@color/color_neutral_500` | `--color-neutral-500` |
| `color.neutral.600` | `#776163` | `colorNeutral600` | `@color/color_neutral_600` | `--color-neutral-600` |
| `color.neutral.700` | `#674E4F` | `colorNeutral700` | `@color/color_neutral_700` | `--color-neutral-700` |
| `color.neutral.800` | `#4E3839` | `colorNeutral800` | `@color/color_neutral_800` | `--color-neutral-800` |
| `color.neutral.900` | `#0F0500` | `colorNeutral900` | `@color/color_neutral_900` | `--color-neutral-900` |

## color · orange

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.orange.500` | `#00D8C1` | `colorOrange500` | `@color/color_orange_500` | `--color-orange-500` |

## color · pink

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.pink.100` | `#FFD6A1` | `colorPink100` | `@color/color_pink_100` | `--color-pink-100` |
| `color.pink.200` | `#F8D9AF` | `colorPink200` | `@color/color_pink_200` | `--color-pink-200` |
| `color.pink.400` | `#C29E00` | `colorPink400` | `@color/color_pink_400` | `--color-pink-400` |
| `color.pink.50` | `#FFF2E7` | `colorPink50` | `@color/color_pink_50` | `--color-pink-50` |
| `color.pink.500` | `#D08500` | `colorPink500` | `@color/color_pink_500` | `--color-pink-500` |
| `color.pink.700` | `#6B7E00` | `colorPink700` | `@color/color_pink_700` | `--color-pink-700` |

## color · primary

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.primary.00` | `#FFF1EA` | `colorPrimary00` | `@color/color_primary_00` | `--color-primary-00` |
| `color.primary.100` | `#FBC7AC` | `colorPrimary100` | `@color/color_primary_100` | `--color-primary-100` |
| `color.primary.200` | `#EE9C6B` | `colorPrimary200` | `@color/color_primary_200` | `--color-primary-200` |
| `color.primary.300` | `#DB7833` | `colorPrimary300` | `@color/color_primary_300` | `--color-primary-300` |
| `color.primary.400` | `#CD6516` | `colorPrimary400` | `@color/color_primary_400` | `--color-primary-400` |
| `color.primary.50` | `#FEE4D6` | `colorPrimary50` | `@color/color_primary_50` | `--color-primary-50` |
| `color.primary.500` | `#BE5B06` | `colorPrimary500` | `@color/color_primary_500` | `--color-primary-500` |
| `color.primary.600` | `#A34A00` | `colorPrimary600` | `@color/color_primary_600` | `--color-primary-600` |
| `color.primary.700` | `#7F3900` | `colorPrimary700` | `@color/color_primary_700` | `--color-primary-700` |
| `color.primary.800` | `#5F2A00` | `colorPrimary800` | `@color/color_primary_800` | `--color-primary-800` |

## color · purple

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.purple.100` | `#FFEAE2` | `colorPurple100` | `@color/color_purple_100` | `--color-purple-100` |
| `color.purple.200` | `#FFD4BF` | `colorPurple200` | `@color/color_purple_200` | `--color-purple-200` |
| `color.purple.300` | `#F3C2AA` | `colorPurple300` | `@color/color_purple_300` | `--color-purple-300` |
| `color.purple.400` | `#D16100` | `colorPurple400` | `@color/color_purple_400` | `--color-purple-400` |
| `color.purple.50` | `#F6ECE6` | `colorPurple50` | `@color/color_purple_50` | `--color-purple-50` |
| `color.purple.500` | `#B05600` | `colorPurple500` | `@color/color_purple_500` | `--color-purple-500` |
| `color.purple.600` | `#915100` | `colorPurple600` | `@color/color_purple_600` | `--color-purple-600` |
| `color.purple.900` | `#5E2A00` | `colorPurple900` | `@color/color_purple_900` | `--color-purple-900` |
| `color.purple.950` | `#5E2900` | `colorPurple950` | `@color/color_purple_950` | `--color-purple-950` |

## color · red

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.red.100` | `#E8EFE0` | `colorRed100` | `@color/color_red_100` | `--color-red-100` |
| `color.red.400` | `#58B236` | `colorRed400` | `@color/color_red_400` | `--color-red-400` |
| `color.red.50` | `#D9EBD3` | `colorRed50` | `@color/color_red_50` | `--color-red-50` |
| `color.red.600` | `#008C41` | `colorRed600` | `@color/color_red_600` | `--color-red-600` |
| `color.red.700` | `#00822F` | `colorRed700` | `@color/color_red_700` | `--color-red-700` |

## color · secondary

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.secondary.00` | `#FFFCFB` | `colorSecondary00` | `@color/color_secondary_00` | `--color-secondary-00` |
| `color.secondary.100` | `#B1FCFF` | `colorSecondary100` | `@color/color_secondary_100` | `--color-secondary-100` |
| `color.secondary.200` | `#5AFCFF` | `colorSecondary200` | `@color/color_secondary_200` | `--color-secondary-200` |
| `color.secondary.300` | `#00F6F7` | `colorSecondary300` | `@color/color_secondary_300` | `--color-secondary-300` |
| `color.secondary.400` | `#00EEEB` | `colorSecondary400` | `@color/color_secondary_400` | `--color-secondary-400` |
| `color.secondary.50` | `#E6FDFF` | `colorSecondary50` | `@color/color_secondary_50` | `--color-secondary-50` |
| `color.secondary.500` | `#00E7D9` | `colorSecondary500` | `@color/color_secondary_500` | `--color-secondary-500` |
| `color.secondary.600` | `#00E0D1` | `colorSecondary600` | `@color/color_secondary_600` | `--color-secondary-600` |
| `color.secondary.700` | `#00CAB7` | `colorSecondary700` | `@color/color_secondary_700` | `--color-secondary-700` |
| `color.secondary.800` | `#00B5A6` | `colorSecondary800` | `@color/color_secondary_800` | `--color-secondary-800` |

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
| `color.status.success-dark` | `#15803D` | `colorStatusSuccessDark` | `@color/color_status_success_dark` | `--color-status-success-dark` |
| `color.status.success-light` | `#BBF7D0` | `colorStatusSuccessLight` | `@color/color_status_success_light` | `--color-status-success-light` |
| `color.status.warning` | `#FFB90A` | `colorStatusWarning` | `@color/color_status_warning` | `--color-status-warning` |
| `color.status.warning-dark` | `#BD750F` | `colorStatusWarningDark` | `@color/color_status_warning_dark` | `--color-status-warning-dark` |
| `color.status.warning-light` | `#FEF3C7` | `colorStatusWarningLight` | `@color/color_status_warning_light` | `--color-status-warning-light` |

## color · text

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.text.brand` | `#BE5B06` | `colorTextBrand` | `@color/color_text_brand` | `--color-text-brand` |
| `color.text.disabled` | `#DDD3CD` | `colorTextDisabled` | `@color/color_text_disabled` | `--color-text-disabled` |
| `color.text.error` | `#B91C1C` | `colorTextError` | `@color/color_text_error` | `--color-text-error` |
| `color.text.info` | `#1245D4` | `colorTextInfo` | `@color/color_text_info` | `--color-text-info` |
| `color.text.inverse` | `#FFFFFF` | `colorTextInverse` | `@color/color_text_inverse` | `--color-text-inverse` |
| `color.text.primary` | `#0F0500` | `colorTextPrimary` | `@color/color_text_primary` | `--color-text-primary` |
| `color.text.secondary` | `#776163` | `colorTextSecondary` | `@color/color_text_secondary` | `--color-text-secondary` |
| `color.text.success` | `#15803D` | `colorTextSuccess` | `@color/color_text_success` | `--color-text-success` |
| `color.text.tertiary` | `#BBA9A9` | `colorTextTertiary` | `@color/color_text_tertiary` | `--color-text-tertiary` |
| `color.text.warning` | `#BD750F` | `colorTextWarning` | `@color/color_text_warning` | `--color-text-warning` |

## color · yellow

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `color.yellow.50` | `#EAFEFE` | `colorYellow50` | `@color/color_yellow_50` | `--color-yellow-50` |
| `color.yellow.500` | `#00EEE8` | `colorYellow500` | `@color/color_yellow_500` | `--color-yellow-500` |

## elevation

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `elevation.1` | `0px 1px 2px rgba(0, 0, 0, 0.05)` | — | `@string/elevation_1` | `--elevation-1` |
| `elevation.2` | `0px 2px 8px rgba(0, 0, 0, 0.08)` | — | `@string/elevation_2` | `--elevation-2` |
| `elevation.3` | `0px 4px 16px rgba(0, 0, 0, 0.10)` | — | `@string/elevation_3` | `--elevation-3` |
| `elevation.4` | `0px 8px 32px rgba(0, 0, 0, 0.12)` | — | `@string/elevation_4` | `--elevation-4` |
| `elevation.5` | `0px 16px 48px rgba(0, 0, 0, 0.16)` | — | `@string/elevation_5` | `--elevation-5` |

## font · family

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `font.family.primary` | `Montserrat` | — | `@string/font_family_primary` | `--font-family-primary` |

## font · line-height

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `font.line-height.body-lg` | `24px` | `fontLineHeightBodyLg` | `@dimen/font_line_height_body_lg` | `--font-line-height-body-lg` |
| `font.line-height.body-md` | `21px` | `fontLineHeightBodyMd` | `@dimen/font_line_height_body_md` | `--font-line-height-body-md` |
| `font.line-height.body-sm` | `18px` | `fontLineHeightBodySm` | `@dimen/font_line_height_body_sm` | `--font-line-height-body-sm` |
| `font.line-height.button` | `14px` | `fontLineHeightButton` | `@dimen/font_line_height_button` | `--font-line-height-button` |
| `font.line-height.display` | `72px` | `fontLineHeightDisplay` | `@dimen/font_line_height_display` | `--font-line-height-display` |
| `font.line-height.h1` | `40px` | `fontLineHeightH1` | `@dimen/font_line_height_h1` | `--font-line-height-h1` |
| `font.line-height.h2` | `32px` | `fontLineHeightH2` | `@dimen/font_line_height_h2` | `--font-line-height-h2` |
| `font.line-height.h3` | `24px` | `fontLineHeightH3` | `@dimen/font_line_height_h3` | `--font-line-height-h3` |
| `font.line-height.h4` | `20px` | `fontLineHeightH4` | `@dimen/font_line_height_h4` | `--font-line-height-h4` |
| `font.line-height.h5` | `16px` | `fontLineHeightH5` | `@dimen/font_line_height_h5` | `--font-line-height-h5` |
| `font.line-height.label` | `21px` | `fontLineHeightLabel` | `@dimen/font_line_height_label` | `--font-line-height-label` |
| `font.line-height.overline` | `12px` | `fontLineHeightOverline` | `@dimen/font_line_height_overline` | `--font-line-height-overline` |

## font · size

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `font.size.body-lg` | `16px` | `fontSizeBodyLg` | `@dimen/font_size_body_lg` | `--font-size-body-lg` |
| `font.size.body-md` | `14px` | `fontSizeBodyMd` | `@dimen/font_size_body_md` | `--font-size-body-md` |
| `font.size.body-sm` | `12px` | `fontSizeBodySm` | `@dimen/font_size_body_sm` | `--font-size-body-sm` |
| `font.size.button` | `14px` | `fontSizeButton` | `@dimen/font_size_button` | `--font-size-button` |
| `font.size.display` | `72px` | `fontSizeDisplay` | `@dimen/font_size_display` | `--font-size-display` |
| `font.size.h1` | `40px` | `fontSizeH1` | `@dimen/font_size_h1` | `--font-size-h1` |
| `font.size.h2` | `32px` | `fontSizeH2` | `@dimen/font_size_h2` | `--font-size-h2` |
| `font.size.h3` | `24px` | `fontSizeH3` | `@dimen/font_size_h3` | `--font-size-h3` |
| `font.size.h4` | `20px` | `fontSizeH4` | `@dimen/font_size_h4` | `--font-size-h4` |
| `font.size.h5` | `16px` | `fontSizeH5` | `@dimen/font_size_h5` | `--font-size-h5` |
| `font.size.label` | `14px` | `fontSizeLabel` | `@dimen/font_size_label` | `--font-size-label` |
| `font.size.overline` | `12px` | `fontSizeOverline` | `@dimen/font_size_overline` | `--font-size-overline` |

## font · weight

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `font.weight.bold` | `700` | `fontWeightBold` | `@integer/font_weight_bold` | `--font-weight-bold` |
| `font.weight.medium` | `500` | `fontWeightMedium` | `@integer/font_weight_medium` | `--font-weight-medium` |
| `font.weight.regular` | `400` | `fontWeightRegular` | `@integer/font_weight_regular` | `--font-weight-regular` |
| `font.weight.semibold` | `600` | `fontWeightSemibold` | `@integer/font_weight_semibold` | `--font-weight-semibold` |

## motion · duration

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `motion.duration.fast` | `100ms` | `motionDurationFast` | `@integer/motion_duration_fast` | `--motion-duration-fast` |
| `motion.duration.instant` | `0ms` | `motionDurationInstant` | `@integer/motion_duration_instant` | `--motion-duration-instant` |
| `motion.duration.normal` | `200ms` | `motionDurationNormal` | `@integer/motion_duration_normal` | `--motion-duration-normal` |
| `motion.duration.slow` | `300ms` | `motionDurationSlow` | `@integer/motion_duration_slow` | `--motion-duration-slow` |
| `motion.duration.slower` | `500ms` | `motionDurationSlower` | `@integer/motion_duration_slower` | `--motion-duration-slower` |

## motion · easing

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `motion.easing.default` | `cubic-bezier(0.4, 0, 0.2, 1)` | — | `@string/motion_easing_default` | `--motion-easing-default` |
| `motion.easing.in` | `cubic-bezier(0.4, 0, 1, 1)` | — | `@string/motion_easing_in` | `--motion-easing-in` |
| `motion.easing.out` | `cubic-bezier(0, 0, 0.2, 1)` | — | `@string/motion_easing_out` | `--motion-easing-out` |

## radius

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `radius.2xl` | `24px` | `radius2xl` | `@dimen/radius_2xl` | `--radius-2xl` |
| `radius.badge` | `9999px` | `radiusBadge` | `@dimen/radius_badge` | `--radius-badge` |
| `radius.button` | `8px` | `radiusButton` | `@dimen/radius_button` | `--radius-button` |
| `radius.card` | `12px` | `radiusCard` | `@dimen/radius_card` | `--radius-card` |
| `radius.full` | `9999px` | `radiusFull` | `@dimen/radius_full` | `--radius-full` |
| `radius.input` | `8px` | `radiusInput` | `@dimen/radius_input` | `--radius-input` |
| `radius.lg` | `12px` | `radiusLg` | `@dimen/radius_lg` | `--radius-lg` |
| `radius.md` | `8px` | `radiusMd` | `@dimen/radius_md` | `--radius-md` |
| `radius.modal` | `16px` | `radiusModal` | `@dimen/radius_modal` | `--radius-modal` |
| `radius.none` | `0px` | `radiusNone` | `@dimen/radius_none` | `--radius-none` |
| `radius.sm` | `4px` | `radiusSm` | `@dimen/radius_sm` | `--radius-sm` |
| `radius.xl` | `16px` | `radiusXl` | `@dimen/radius_xl` | `--radius-xl` |
| `radius.xs` | `2px` | `radiusXs` | `@dimen/radius_xs` | `--radius-xs` |

## spacing

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `spacing.1` | `2px` | `spacing1` | `@dimen/spacing_1` | `--spacing-1` |
| `spacing.10` | `48px` | `spacing10` | `@dimen/spacing_10` | `--spacing-10` |
| `spacing.11` | `56px` | `spacing11` | `@dimen/spacing_11` | `--spacing-11` |
| `spacing.12` | `64px` | `spacing12` | `@dimen/spacing_12` | `--spacing-12` |
| `spacing.13` | `96px` | `spacing13` | `@dimen/spacing_13` | `--spacing-13` |
| `spacing.14` | `128px` | `spacing14` | `@dimen/spacing_14` | `--spacing-14` |
| `spacing.2` | `4px` | `spacing2` | `@dimen/spacing_2` | `--spacing-2` |
| `spacing.3` | `8px` | `spacing3` | `@dimen/spacing_3` | `--spacing-3` |
| `spacing.4` | `12px` | `spacing4` | `@dimen/spacing_4` | `--spacing-4` |
| `spacing.5` | `16px` | `spacing5` | `@dimen/spacing_5` | `--spacing-5` |
| `spacing.6` | `20px` | `spacing6` | `@dimen/spacing_6` | `--spacing-6` |
| `spacing.7` | `24px` | `spacing7` | `@dimen/spacing_7` | `--spacing-7` |
| `spacing.8` | `32px` | `spacing8` | `@dimen/spacing_8` | `--spacing-8` |
| `spacing.9` | `40px` | `spacing9` | `@dimen/spacing_9` | `--spacing-9` |

## stroke

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `stroke.lg` | `4px` | `strokeLg` | `@dimen/stroke_lg` | `--stroke-lg` |
| `stroke.md` | `2px` | `strokeMd` | `@dimen/stroke_md` | `--stroke-md` |
| `stroke.sm` | `1px` | `strokeSm` | `@dimen/stroke_sm` | `--stroke-sm` |

## z-index

| Token | Value | Compose / iOS / Flutter | Android XML | CSS |
|---|---|---|---|---|
| `z-index.base` | `0` | `zIndexBase` | `@integer/z_index_base` | `--z-index-base` |
| `z-index.modal` | `200` | `zIndexModal` | `@integer/z_index_modal` | `--z-index-modal` |
| `z-index.overlay` | `100` | `zIndexOverlay` | `@integer/z_index_overlay` | `--z-index-overlay` |
| `z-index.raised` | `10` | `zIndexRaised` | `@integer/z_index_raised` | `--z-index-raised` |
| `z-index.toast` | `300` | `zIndexToast` | `@integer/z_index_toast` | `--z-index-toast` |

---

Generated by `pipeline/sd.config.mjs` (`markdown/design-doc`). See `docs/releasing-android.md` for how a change here reaches an application.
