#!/usr/bin/env node
/**
 * Regenerate lib/algorithms/algorithms-registry.json from:
 *  - lib/algorithms/generated-registry.ts  (meta: name, category, complexity, description)
 *  - lib/algorithms/docs-index.json         (markdownPath per slug)
 *
 * Source paths are resolved from lib/algorithms/<category>/*.ts files.
 * Run after editing any of the source files.
 */

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

// ---- Read sources ----
const registryRaw = fs.readFileSync(
  path.join(root, "lib/algorithms/generated-registry.ts"),
  "utf8"
);
const assignIndex = registryRaw.indexOf("= [");
const endIndex = registryRaw.lastIndexOf("];\n");
if (assignIndex === -1 || endIndex === -1) {
  throw new Error("Cannot parse generated-registry.ts");
}
const generated = JSON.parse(registryRaw.slice(assignIndex + 2, endIndex + 1));

const docsIndex = JSON.parse(
  fs.readFileSync(path.join(root, "lib/algorithms/docs-index.json"), "utf8")
);
const docsMap = Object.fromEntries(docsIndex.map((d) => [d.slug, d]));

// Slugs with fully instrumented step-by-step implementations
const INSTRUMENTED = new Set([
  "sortare_bubbleSort",
  "sortare_insertionSort",
  "sortare_selectionSort",
  "sortare_quickSort",
  "sortare_mergeSort",
  "cautare_binarySearch",
  "grafuri_bfs",
  "grafuri_dfs",
  "grafuri_dijkstra",
]);

/** Walk a directory and return all .ts file paths (relative to root) */
function walkTs(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { walkTs(full, out); continue; }
    if (entry.isFile() && entry.name.endsWith(".ts") && !entry.name.endsWith(".test.ts")) {
      out.push(full);
    }
  }
  return out;
}

/**
 * Find the .ts source file for a slug.
 * Slug format: "<category>_<rest>", files live in lib/algorithms/<category>/
 */
function findSourcePath(slug) {
  const firstUnderscore = slug.indexOf("_");
  if (firstUnderscore === -1) return "";
  const category = slug.slice(0, firstUnderscore);
  const rest = slug.slice(firstUnderscore + 1);
  const catDir = path.join(root, "lib/algorithms", category);
  if (!fs.existsSync(catDir)) return "";

  const tsFiles = walkTs(catDir);
  for (const f of tsFiles) {
    const rel = path.relative(catDir, f).replace(/\\/g, "/");
    const relNoExt = rel.replace(/\.ts$/, "").replace(/\//g, "_");
    if (relNoExt === rest) {
      return path.relative(root, f).replace(/\\/g, "/");
    }
  }
  // Fallback: basename match
  for (const f of tsFiles) {
    const base = path.basename(f, ".ts");
    if (base === rest || rest.endsWith(base)) {
      return path.relative(root, f).replace(/\\/g, "/");
    }
  }
  return "";
}

function getVisualizerType(slug) {
  const prefix = slug.split("_")[0];
  if (prefix === "sortare") return "sorting";
  if (prefix === "cautare") return "search";
  if (prefix === "grafuri") {
    const sl = slug.toLowerCase();
    if (sl.includes("bfs") || sl.includes("dfs") || sl.includes("dijkstra")) return "graph";
    return "none";
  }
  if (prefix === "programare-dinamica") return "dp";
  return "none";
}

function getStatus(slug, sourcePath) {
  if (INSTRUMENTED.has(slug)) return "instrumented";
  if (sourcePath) return "source-only";
  return "partial";
}

const result = generated.map((alg) => {
  const slug = alg.slug;
  const doc = docsMap[slug] || {};
  const sourcePath = findSourcePath(slug);
  return {
    slug,
    name: alg.name || "",
    category: alg.category || "",
    complexity: alg.complexity || "",
    description: alg.description || "",
    sourcePath,
    markdownPath: doc.markdownPath || "",
    visualizerType: getVisualizerType(slug),
    status: getStatus(slug, sourcePath),
  };
});

const outPath = path.join(root, "lib/algorithms/algorithms-registry.json");
fs.writeFileSync(outPath, JSON.stringify(result, null, 2), "utf8");
console.log(`✅  Generated ${result.length} entries → ${outPath}`);
