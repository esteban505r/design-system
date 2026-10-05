// Write nested token trees to tokens/**/*.json (shared by figma-to-tokens and md-to-tokens).

import fs from 'fs';
import path from 'path';

export const fileMap = {
  color: {
    split: true,
    subCategories: {
      primary: 'color/primary.json',
      secondary: 'color/secondary.json',
      neutral: 'color/neutral.json',
      status: 'color/status.json',
      brand: 'color/brand.json',
      text: 'color/text.json',
      bg: 'color/bg.json',
      border: 'color/border.json',
      interactive: 'color/interactive.json',
      // Belcorp app palette — core ramps at the exact values shipping in the
      // Android app. Kept separate from the idealised primary/neutral ramps
      // above so the two are never confused during migration.
      purple: 'color/purple.json',
      gray: 'color/gray.json',
      pink: 'color/pink.json',
      red: 'color/red.json',
      blue: 'color/blue.json',
      green: 'color/green.json',
      cyan: 'color/cyan.json',
      orange: 'color/orange.json',
      yellow: 'color/yellow.json',
      burgundy: 'color/burgundy.json',
      brown: 'color/brown.json',
      // Feature one-offs and alpha variants — fenced off from the core ramps.
      app: 'color/app.json',
      _default: 'color/other.json',
    },
  },
  font: {
    split: true,
    subCategories: {
      family: 'typography/family.json',
      weight: 'typography/weight.json',
      size: 'typography/size.json',
      'line-height': 'typography/line-height.json',
      _default: 'typography/other.json',
    },
  },
  spacing: { split: false, file: 'spacing/spacing.json' },
  radius: { split: false, file: 'radius/radius.json' },
  stroke: { split: false, file: 'stroke/stroke.json' },
  shadow: { split: false, file: 'shadow/shadow.json' },
  motion: {
    split: true,
    subCategories: {
      easing: 'motion/easing.json',
      duration: 'motion/duration.json',
      _default: 'motion/other.json',
    },
  },
  'z-index': { split: false, file: 'z-index/z-index.json' },
  elevation: { split: false, file: 'elevation/elevation.json' },
  duration: { split: false, file: 'motion/duration.json' },
  easing: { split: false, file: 'motion/easing.json' },
  opacity: { split: false, file: 'opacity/opacity.json' },
};

export const OBSOLETE_TOKEN_FILES = [
  'color/surface.json',
  'color/semantic.json',
  'motion/motion.json',
  'shadow/elevation.json',
  'opacity/opacity.json',
  'typography/scale.json',
];

/**
 * @param {Record<string, unknown>} merged  top-level categories, e.g. { color: {...}, font: {...} }
 * @param {string} outputDir
 */
export function writeTokensFromTree(merged, outputDir = 'tokens') {
  let filesWritten = 0;
  const writtenPaths = new Set();

  for (const [category, data] of Object.entries(merged)) {
    const mapping = fileMap[category];

    if (!mapping) {
      const filePath = path.join(outputDir, `${category}/${category}.json`);
      writeTokenFile(filePath, { [category]: data }, writtenPaths);
      filesWritten++;
      continue;
    }

    if (mapping.split) {
      /** @type {Record<string, unknown>} */
      const defaultGroup = {};
      const defaultFile = mapping.subCategories._default;
      for (const [subKey, subData] of Object.entries(
        /** @type {Record<string, unknown>} */ (data),
      )) {
        const subFile = mapping.subCategories[subKey] || defaultFile;
        if (subFile && subFile === defaultFile && !mapping.subCategories[subKey]) {
          defaultGroup[subKey] = subData;
          continue;
        }
        if (subFile) {
          const filePath = path.join(outputDir, subFile);
          const wrapper = { [category]: { [subKey]: subData } };
          writeTokenFile(filePath, wrapper, writtenPaths);
          filesWritten++;
        }
      }
      if (defaultFile && Object.keys(defaultGroup).length > 0) {
        const filePath = path.join(outputDir, defaultFile);
        writeTokenFile(filePath, { [category]: defaultGroup }, writtenPaths);
        filesWritten++;
      }
    } else {
      const filePath = path.join(outputDir, mapping.file);
      writeTokenFile(filePath, { [category]: data }, writtenPaths);
      filesWritten++;
    }
  }

  pruneObsoleteTokenFiles(outputDir, writtenPaths);
  return { filesWritten, writtenPaths };
}

/**
 * Delete token JSON that this write did not produce, so a replaced source
 * (for example dropping app-only colours) does not leave the old files behind
 * for Style Dictionary to keep emitting.
 *
 * @param {string} outputDir
 * @param {Set<string>} writtenPaths absolute paths
 */
export function pruneUnwrittenTokenFiles(outputDir, writtenPaths) {
  const root = path.resolve(outputDir);
  if (!fs.existsSync(root)) return;
  /** @param {string} dir */
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        if (fs.readdirSync(full).length === 0) fs.rmdirSync(full);
      } else if (entry.name.endsWith('.json') && !writtenPaths.has(full)) {
        fs.unlinkSync(full);
      }
    }
  };
  walk(root);
}

/**
 * @param {string} filePath
 * @param {Record<string, unknown>} data
 * @param {Set<string>} writtenPaths
 */
function writeTokenFile(filePath, data, writtenPaths) {
  const fullPath = path.resolve(filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2) + '\n');
  writtenPaths.add(fullPath);
  console.log(`  ✔ ${path.relative(process.cwd(), fullPath)}`);
}

/**
 * @param {string} outputDir
 * @param {Set<string>} writtenPaths
 */
function pruneObsoleteTokenFiles(outputDir, writtenPaths) {
  const removed = [];
  for (const rel of OBSOLETE_TOKEN_FILES) {
    const fullPath = path.resolve(outputDir, rel);
    if (fs.existsSync(fullPath) && !writtenPaths.has(fullPath)) {
      fs.unlinkSync(fullPath);
      removed.push(path.relative(process.cwd(), fullPath));
    }
  }
  if (removed.length > 0) {
    console.log('\n🗑️  Removed obsolete token file(s):');
    for (const rel of removed) {
      console.log(`  ✖ ${rel}`);
    }
  }
}

/**
 * @param {Record<string, unknown>} tree
 * @param {string[]} pathParts
 * @param {Record<string, unknown>} leaf  DTCG token
 */
export function setTokenAtPath(tree, pathParts, leaf) {
  let node = tree;
  for (let i = 0; i < pathParts.length - 1; i++) {
    const key = pathParts[i];
    if (!node[key] || typeof node[key] !== 'object') {
      node[key] = {};
    }
    node = /** @type {Record<string, unknown>} */ (node[key]);
  }
  node[pathParts[pathParts.length - 1]] = leaf;
}
