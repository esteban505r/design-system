// Shared: DESIGN.md frontmatter → nested tokens/ tree (DTCG).
// Pure helpers (no I/O) so spec-to-tokens.mjs and the test suite share one
// implementation. Mirror of figma-collection-to-tokens.mjs for the spec front end.

import { SPEC_TO_CATEGORY, specValueToDtcg } from './token-name-map.mjs';
import { setTokenAtPath } from './token-writer.mjs';

/** Frontmatter keys that are metadata, not token groups. */
export const RESERVED_KEYS = new Set(['version', 'name', 'description']);

/**
 * Extract the YAML frontmatter block between the leading `---` fences.
 * @param {string} text  Full DESIGN.md contents.
 * @returns {string | null}  The YAML source, or null if no frontmatter is present.
 */
export function extractFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/);
  return match ? match[1] : null;
}

/**
 * Descend a frontmatter group to its primitive leaves, invoking `cb` with the
 * full internal token path and the raw value.
 * @param {unknown} node
 * @param {string[]} prefix
 * @param {(path: string[], value: unknown) => void} cb
 */
export function walkLeaves(node, prefix, cb) {
  if (node === null || node === undefined) return;
  if (typeof node !== 'object' || Array.isArray(node)) {
    cb(prefix, node);
    return;
  }
  for (const [key, value] of Object.entries(node)) {
    walkLeaves(value, [...prefix, key], cb);
  }
}

/**
 * Build the nested DTCG token tree from parsed DESIGN.md frontmatter.
 * @param {Record<string, unknown>} data  Parsed frontmatter object.
 * @returns {{ tree: Record<string, unknown>, mapped: number }}
 */
export function buildTokenTreeFromSpec(data) {
  /** @type {Record<string, unknown>} */
  const tree = {};
  let mapped = 0;

  for (const [specKey, group] of Object.entries(data || {})) {
    if (RESERVED_KEYS.has(specKey)) continue;
    const category = SPEC_TO_CATEGORY[specKey] || specKey;
    walkLeaves(group, [category], (tokenPath, value) => {
      setTokenAtPath(tree, tokenPath, specValueToDtcg(tokenPath, value));
      mapped++;
    });
  }

  return { tree, mapped };
}
