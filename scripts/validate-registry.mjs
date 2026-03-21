#!/usr/bin/env node
/**
 * Validate the canonical algorithms-registry.json:
 * - unique slugs
 * - every entry has sourcePath or explicitly missing
 * - every entry has markdownPath or explicitly missing
 * - visualizerType is one of the allowed values
 */

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const registryPath = path.join(root, "lib/algorithms/algorithms-registry.json");

if (!fs.existsSync(registryPath)) {
  console.error("❌  algorithms-registry.json not found. Run: npm run generate:registry");
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const VALID_VIZ = new Set(["sorting", "search", "graph", "dp", "none"]);
const VALID_STATUS = new Set(["instrumented", "source-only", "partial"]);

let errors = 0;
const slugsSeen = new Set();

for (const entry of registry) {
  const { slug, sourcePath, markdownPath, visualizerType, status } = entry;

  if (!slug) {
    console.error(`❌  Entry missing slug: ${JSON.stringify(entry)}`);
    errors++;
    continue;
  }

  if (slugsSeen.has(slug)) {
    console.error(`❌  Duplicate slug: ${slug}`);
    errors++;
  }
  slugsSeen.add(slug);

  if (!visualizerType || !VALID_VIZ.has(visualizerType)) {
    console.error(`❌  ${slug}: invalid visualizerType "${visualizerType}"`);
    errors++;
  }

  if (!status || !VALID_STATUS.has(status)) {
    console.error(`❌  ${slug}: invalid status "${status}"`);
    errors++;
  }

  if (!sourcePath) {
    console.warn(`⚠   ${slug}: missing sourcePath`);
  } else {
    const abs = path.join(root, sourcePath);
    if (!fs.existsSync(abs)) {
      console.error(`❌  ${slug}: sourcePath does not exist → ${sourcePath}`);
      errors++;
    }
  }

  if (!markdownPath) {
    console.warn(`⚠   ${slug}: missing markdownPath`);
  } else {
    const normalizedPath = markdownPath.replace(/^\/+/, "");
    const abs = path.join(root, normalizedPath);
    if (!fs.existsSync(abs)) {
      console.error(`❌  ${slug}: markdownPath does not exist → ${markdownPath}`);
      errors++;
    }
  }
}

if (errors > 0) {
  console.error(`\n❌  Validation failed with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log(`✅  Registry valid: ${registry.length} algorithms, 0 errors.`);
}
