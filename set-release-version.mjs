#!/usr/bin/env node
// ============================================================
// set-release-version.mjs
// ============================================================
// Writes a semver into release source files before publish/sync.
//
// Usage:
//   node set-release-version.mjs --version 1.0.10
//   node set-release-version.mjs --version 1.0.10 --md path/to.md --figma figma/tokens.json
// ============================================================

import fs from 'fs';
import path from 'path';

const SEMVER_RE = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$/;

/** @param {string} version */
function assertSemver(version) {
  if (!SEMVER_RE.test(version)) {
    console.error(`❌ Invalid semver: "${version}" (expected e.g. 1.2.3 or 2.0.0-rc.1)`);
    process.exit(1);
  }
}

/**
 * @param {string} filePath
 * @param {string} version
 */
function setMarkdownVersion(filePath, version) {
  const resolved = path.resolve(filePath);
  if (!fs.existsSync(resolved)) {
    console.warn(`⚠️  Skip markdown (not found): ${filePath}`);
    return;
  }
  const content = fs.readFileSync(resolved, 'utf-8');
  if (!/\*\*Version:\*\*/.test(content)) {
    console.error(`❌ Missing **Version:** line in ${filePath}`);
    process.exit(1);
  }
  const next = content.replace(/\*\*Version:\*\*\s*.+/, `**Version:** ${version}`);
  fs.writeFileSync(resolved, next);
  console.log(`📝 ${path.relative(process.cwd(), resolved)} → **Version:** ${version}`);
}

/**
 * @param {string} filePath
 * @param {string} version
 */
function setFigmaMetadataVersion(filePath, version) {
  const resolved = path.resolve(filePath);
  if (!fs.existsSync(resolved)) {
    console.warn(`⚠️  Skip figma JSON (not found): ${filePath}`);
    return;
  }
  const data = JSON.parse(fs.readFileSync(resolved, 'utf-8'));
  if (!data.$metadata || typeof data.$metadata !== 'object') {
    data.$metadata = {};
  }
  data.$metadata.version = version;
  fs.writeFileSync(resolved, JSON.stringify(data, null, 2) + '\n');
  console.log(`📝 ${path.relative(process.cwd(), resolved)} → $metadata.version ${version}`);
}

const args = process.argv.slice(2);
const versionFlag = args.indexOf('--version');
const mdFlag = args.indexOf('--md');
const figmaFlag = args.indexOf('--figma');

const version =
  versionFlag >= 0 ? args[versionFlag + 1] : process.env.RELEASE_VERSION;
const mdFile =
  mdFlag >= 0 ? args[mdFlag + 1] : 'design-system-foundations.md';
const figmaFile = figmaFlag >= 0 ? args[figmaFlag + 1] : 'figma/tokens.json';

if (!version) {
  console.error('Usage: node set-release-version.mjs --version <semver>');
  process.exit(1);
}

assertSemver(version.trim());
const normalized = version.trim();

setMarkdownVersion(mdFile, normalized);
setFigmaMetadataVersion(figmaFile, normalized);
console.log('');
