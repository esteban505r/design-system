// The vocabulary contract: the semantic roles an application may rely on.
//
// This file declares *names*, never values. A role is in REQUIRED when every
// brand supplies a value for it — that, and only that, is what makes it safe
// for an app to bind to. Values live in brands/<id>/tokens/<mode>/.
//
// Why this exists: without it, "the design system supports N brands" is an
// unverifiable claim. A second app cannot know what it is getting, and no token
// can ever be removed because nobody can prove which brands still need it.
//
// ── The ratchet ────────────────────────────────────────────
// test/vocabulary.test.mjs asserts that REQUIRED is *exactly* the set of roles
// every brand supplies. That fails in both directions, deliberately:
//
//   • a brand loses a role   → the contract broke; fix the brand
//   • every brand gains one  → the contract can grow; promote it here
//
// So the floor can only rise, and it rises as soon as it truthfully can. Adding
// a name here without the values behind it does not strengthen the contract; it
// just breaks the build.
//
// ── Scope ──────────────────────────────────────────────────
// Colour only, for now. Typography, spacing and radius are not in the contract
// because FFVV supplies no type scale of its own and inherits geometry from
// core/, where it is shared by construction rather than by agreement.

/**
 * Roles every brand supplies today. An application may bind to these.
 *
 * @type {string[]}
 */
export const REQUIRED = [
  // Surfaces
  'color.bg.surface',
  'color.bg.brand-subtle',
  'color.bg.overlay',

  // Status backgrounds — the pale fill behind a message or badge
  'color.bg.error',
  'color.bg.success',
  'color.bg.warning',

  // Status foregrounds — the saturated colour of the state itself
  'color.status.error',
  'color.status.success',
  'color.status.warning',

  // Text
  'color.text.primary',
  'color.text.secondary',
  'color.text.tertiary',
  'color.text.disabled',

  // Borders
  'color.border.default',

  // The primary action
  'color.interactive.primary.default',
  'color.interactive.primary.disabled',
];

/**
 * Roles requested by consumers but not yet supplied by every brand, so not yet
 * bindable. Each is backed by evidence in docs/role-requests.md — these are not
 * speculative names. Moving one into REQUIRED means every brand has authored a
 * value for it.
 *
 * @type {string[]}
 */
export const PROPOSED = [
  // Surface hierarchy — FFVV needed SurfaceThird/Four/Five and consultoras
  // welcomeCardBackground because there was no name for "raised" or "recessed".
  'color.bg.elevated',
  'color.bg.sunken',

  // The non-primary action. FFVV needed three members to express it
  // (ActionSecondary + two ActionPrimaryVariant escapes), which is what a
  // missing role looks like from the inside. Mirrors interactive.primary.*.
  'color.interactive.secondary.default',
  'color.interactive.secondary.hover',
  'color.interactive.secondary.active',
  'color.interactive.secondary.disabled',
  'color.interactive.secondary.text',

  // Completes the border ramp downward; app-border-subtle is already sitting in
  // the escape hatch under an exactly duplicated name.
  'color.border.subtle',
  'color.border.error',

  // Contrast obligations. text.inverse currently conflates "on a dark surface"
  // with "on the brand colour" — the same value while the brand was purple,
  // no longer obviously so now that it is orange.
  'color.text.on-brand',
  'color.text.on-status',
];

/**
 * Which REQUIRED roles a brand is missing.
 *
 * @param {Iterable<string>} suppliedRoles  full token paths, e.g. "color.text.primary"
 * @returns {string[]}
 */
export function missingRequired(suppliedRoles) {
  const have = new Set(suppliedRoles);
  return REQUIRED.filter((role) => !have.has(role));
}
