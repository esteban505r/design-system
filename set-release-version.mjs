#!/usr/bin/env node
// ============================================================
// set-release-version.mjs
// ============================================================
// Writes a semver into design-system-foundations.md and package.json
// before publish/sync. Does not modify figma/tokens.json $metadata.
//
// Usage:
//   node set-release-version.mjs --version 1.0.10
//   node set-release-version.mjs --version 1.0.10 --md path/to.md
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

/** @param {string} version */
function setPackageJsonVersion(version) {
  const pkgPath = path.resolve('package.json');
  if (!fs.existsSync(pkgPath)) {
    console.warn('⚠️  Skip package.json (not found)');
    return;
  }
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  pkg.version = version;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`📦 package.json → version ${version}`);
}

const args = process.argv.slice(2);
const versionFlag = args.indexOf('--version');
const mdFlag = args.indexOf('--md');

const version =
  versionFlag >= 0 ? args[versionFlag + 1] : process.env.RELEASE_VERSION;
const mdFile =
  mdFlag >= 0 ? args[mdFlag + 1] : 'design-system-foundations.md';

if (!version) {
  console.error('Usage: node set-release-version.mjs --version <semver>');
  process.exit(1);
}

assertSemver(version.trim());
const normalized = version.trim();

setMarkdownVersion(mdFile, normalized);
setPackageJsonVersion(normalized);
console.log('');
