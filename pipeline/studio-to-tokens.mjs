#!/usr/bin/env node

// tokens.json (Tokens Studio single-file sync) → the DTCG folder tree.
//
//   node pipeline/studio-to-tokens.mjs          # read tokens.json, write folders
//   node pipeline/studio-to-tokens.mjs --emit   # rebuild tokens.json from folders
//
// --emit is the bootstrap and the legacy escape hatch. Day to day, Token Studio
// pushes tokens.json and this script expands it. It does not rewrite tokens.json
// on the way out, so a plugin push is not immediately overwritten.

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { REPO_ROOT, loadAllBrands } from './brands.mjs';
import {
  STUDIO_FILE,
  applyStudioDocument,
  buildStudioDocument,
  writeStudioDocument,
} from './studio-document.mjs';

const emit = process.argv.includes('--emit');

if (emit) {
  const file = writeStudioDocument(buildStudioDocument());
  console.log(`✅ Wrote ${path.relative(REPO_ROOT, file)}`);
  process.exit(0);
}

if (!fs.existsSync(STUDIO_FILE)) {
  console.error(
    `\n❌ Missing ${path.relative(REPO_ROOT, STUDIO_FILE)}\n` +
      '   Token Studio syncs this one file (storage type: file, path: tokens.json).\n' +
      '   Rebuild it from the folder tree with: node pipeline/studio-to-tokens.mjs --emit\n',
  );
  process.exit(1);
}

let doc;
try {
  doc = JSON.parse(fs.readFileSync(STUDIO_FILE, 'utf-8'));
} catch (err) {
  console.error(`\n❌ ${STUDIO_FILE} is not valid JSON\n${err instanceof Error ? err.message : err}\n`);
  process.exit(1);
}

try {
  const { filesWritten, sets } = applyStudioDocument(doc);
  console.log(`\n✅ ${filesWritten} token file(s) expanded from ${sets.join(', ')}`);
} catch (err) {
  console.error(`\n❌ ${err instanceof Error ? err.message : err}\n`);
  process.exit(1);
}

// Keep the flat per-brand Figma export aligned with the expanded tree.
// tokens-to-figma preserves $metadata.version on --to-ssot so this is a no-op
// when values have not changed.
for (const brand of loadAllBrands()) {
  execFileSync('node', ['pipeline/tokens-to-figma.mjs', '--brand', brand.id, '--to-ssot'], {
    cwd: REPO_ROOT,
    stdio: 'inherit',
  });
}
