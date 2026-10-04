// The vocabulary contract, enforced.
//
// core/vocabulary.mjs declares which semantic roles an application may bind to.
// A role only earns that status when *every* brand supplies a value, so these
// tests check the declaration against what the brands actually ship.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { REQUIRED, PROPOSED, missingRequired } from '../core/vocabulary.mjs';
import { brandTokensDir, loadAllBrands } from '../pipeline/brands.mjs';

/** Families that carry meaning rather than palette position. */
const SEMANTIC_FAMILIES = ['text', 'bg', 'border', 'interactive', 'status'];

/**
 * Every semantic role a brand supplies, as full token paths.
 * @param {import('../pipeline/brands.mjs').Brand} brand
 * @param {string} mode
 */
function suppliedRoles(brand, mode) {
  const dir = path.join(brandTokensDir(brand, mode), 'color');
  /** @type {Set<string>} */ const roles = new Set();
  if (!fs.existsSync(dir)) return roles;

  const walk = (node, trail) => {
    if (node && typeof node === 'object' && '$value' in node) {
      roles.add(`color.${trail.join('.')}`);
      return;
    }
    for (const [k, v] of Object.entries(node ?? {})) walk(v, [...trail, k]);
  };

  for (const file of fs.readdirSync(dir)) {
    const colour = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf-8')).color ?? {};
    for (const [family, node] of Object.entries(colour)) {
      if (SEMANTIC_FAMILIES.includes(family)) walk(node, [family]);
    }
  }
  return roles;
}

const brands = loadAllBrands();

test('at least one brand is defined', () => {
  assert.ok(brands.length > 0);
});

for (const brand of brands) {
  for (const mode of brand.modes) {
    test(`[${brand.id}/${mode}] supplies every REQUIRED semantic role`, () => {
      const missing = missingRequired(suppliedRoles(brand, mode));
      assert.deepEqual(
        missing,
        [],
        `brands/${brand.id}/tokens/${mode}/ is missing roles the contract promises. ` +
          `Either author them, or — if the role genuinely does not apply to this brand — ` +
          `remove it from REQUIRED in core/vocabulary.mjs and accept that no app can bind to it.`,
      );
    });
  }
}

// The ratchet. REQUIRED must be exactly the intersection across brands: no more
// (or it promises something a brand cannot deliver), and no less (or the
// contract is understating what is already safe to bind to).
test('REQUIRED is exactly the set of roles every brand supplies', () => {
  const perBrand = brands.map((b) => suppliedRoles(b, 'light'));
  const everywhere = [...perBrand[0]]
    .filter((role) => perBrand.every((set) => set.has(role)))
    .sort();

  const declared = [...REQUIRED].sort();
  const shouldPromote = everywhere.filter((r) => !declared.includes(r));

  assert.deepEqual(
    shouldPromote,
    [],
    'every brand now supplies these — promote them into REQUIRED in core/vocabulary.mjs',
  );
  assert.deepEqual(
    declared.filter((r) => !everywhere.includes(r)),
    [],
    'REQUIRED promises roles not every brand supplies',
  );
});

test('PROPOSED roles are genuinely not yet universal', () => {
  // A proposed role that every brand already supplies should have been
  // promoted; leaving it here understates the contract.
  const perBrand = brands.map((b) => suppliedRoles(b, 'light'));
  const universal = PROPOSED.filter((role) => perBrand.every((set) => set.has(role)));
  assert.deepEqual(universal, [], 'these are supplied by every brand — move them to REQUIRED');
});

test('REQUIRED and PROPOSED do not overlap', () => {
  const overlap = PROPOSED.filter((r) => REQUIRED.includes(r));
  assert.deepEqual(overlap, [], 'a role cannot be both required and proposed');
});
