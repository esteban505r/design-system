// The core guarantee of the DESIGN.md → tokens/ pipeline: regenerating tokens/
// from DESIGN.md must reproduce the committed token files byte-for-byte. If this
// fails, an edit to the spec format, type inference, or writer drifted the
// outputs that every platform build depends on.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';
import { buildTokenTreeFromSpec, extractFrontmatter } from '../spec-collection-to-tokens.mjs';
import { writeTokensFromTree } from '../token-writer.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Relative, forward-slashed, sorted list of every .json file under `dir`. */
function listTokenFiles(dir) {
  return fs
    .readdirSync(dir, { recursive: true })
    .map(String)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.split(path.sep).join('/'))
    .sort();
}

/** Build the tokens/ tree the same way `pnpm run parse` does, into `outDir`. */
function regenerateTokens(outDir) {
  const designMd = fs.readFileSync(path.join(root, 'DESIGN.md'), 'utf-8');
  const frontmatter = extractFrontmatter(designMd);
  assert.ok(frontmatter, 'DESIGN.md must contain YAML frontmatter');
  const { tree } = buildTokenTreeFromSpec(YAML.parse(frontmatter));

  const originalLog = console.log;
  console.log = () => {}; // silence writer progress output
  try {
    writeTokensFromTree(tree, outDir);
  } finally {
    console.log = originalLog;
  }
}

test('DESIGN.md regenerates tokens/ byte-for-byte', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'spec-tokens-'));
  try {
    regenerateTokens(tmp);

    const committedDir = path.join(root, 'tokens');
    const committed = listTokenFiles(committedDir);
    const generated = listTokenFiles(tmp);

    assert.ok(committed.length > 0, 'committed tokens/ is non-empty');
    assert.deepStrictEqual(generated, committed, 'identical set of token files');

    for (const rel of committed) {
      const expected = fs.readFileSync(path.join(committedDir, rel), 'utf-8');
      const actual = fs.readFileSync(path.join(tmp, rel), 'utf-8');
      assert.strictEqual(actual, expected, `byte-identical: tokens/${rel}`);
    }
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
