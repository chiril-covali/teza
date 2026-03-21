import fs from "node:fs";
import path from "node:path";

const registryPath = path.resolve("lib/algorithms/generated-registry.ts");
const tsMasterRoot = path.resolve("TypeScript-master");

if (!fs.existsSync(registryPath)) {
  throw new Error("Missing lib/algorithms/generated-registry.ts");
}

if (!fs.existsSync(tsMasterRoot)) {
  throw new Error("Missing TypeScript-master folder");
}

const registryRaw = fs.readFileSync(registryPath, "utf8");
const assignIndex = registryRaw.indexOf("= [");
const endIndex = registryRaw.lastIndexOf("];\n");

if (assignIndex === -1 || endIndex === -1) {
  throw new Error("Could not parse allAlgorithmsMeta assignment");
}

const jsonArrayText = registryRaw.slice(assignIndex + 2, endIndex + 1);
const algorithms = JSON.parse(jsonArrayText);

const prefixToTsDir = {
  "backtracking": "backtracking",
  "cautare": "search",
  "cifru": "ciphers",
  "diverse": "other",
  "grafuri": "graph",
  "manipulare-biti": "bit_manipulation",
  "matematica": "maths",
  "programare-dinamica": "dynamic_programming",
  "sortare": "sorts",
  "structuri-de-date": "data_structures",
};

function camelToSnake(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/-/g, "_")
    .toLowerCase();
}

function listTsFiles(baseDir) {
  const files = [];

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "test") continue;
        walk(fullPath);
        continue;
      }
      if (entry.isFile() && entry.name.endsWith(".ts") && !entry.name.endsWith(".test.ts")) {
        files.push(fullPath);
      }
    }
  }

  walk(baseDir);
  return files;
}

const sourceIndex = {};

for (const [prefix, tsDir] of Object.entries(prefixToTsDir)) {
  const base = path.join(tsMasterRoot, tsDir);
  if (!fs.existsSync(base)) continue;

  const map = new Map();
  for (const filePath of listTsFiles(base)) {
    const relative = path.relative(base, filePath).replace(/\\/g, "/");
    const id = relative.replace(/\.ts$/, "").replace(/\//g, "_");
    map.set(id, fs.readFileSync(filePath, "utf8"));
  }
  sourceIndex[prefix] = map;
}

let updated = 0;
let unresolved = 0;
const unresolvedSlugs = [];

for (const item of algorithms) {
  const prefix = Object.keys(prefixToTsDir).find((p) => item.slug.startsWith(`${p}_`));
  if (!prefix || !sourceIndex[prefix]) {
    unresolved++;
    unresolvedSlugs.push(item.slug);
    continue;
  }

  const rest = item.slug.slice(prefix.length + 1);
  const candidates = [
    rest,
    camelToSnake(rest),
    rest.replace(/-/g, "_"),
    camelToSnake(rest.replace(/-/g, "_")),
  ];

  let source = null;
  for (const key of candidates) {
    if (sourceIndex[prefix].has(key)) {
      source = sourceIndex[prefix].get(key);
      break;
    }
  }

  if (source) {
    item.source = source;
    updated++;
  } else {
    unresolved++;
    unresolvedSlugs.push(item.slug);
  }
}

const output =
  'import { AlgorithmMeta } from "./types";\n\n' +
  "export const allAlgorithmsMeta: AlgorithmMeta[] = " +
  JSON.stringify(algorithms, null, 2) +
  ";\n";

fs.writeFileSync(registryPath, output, "utf8");

console.log(`Updated source from TypeScript-master for ${updated} algorithms.`);
console.log(`Unresolved algorithms: ${unresolved}.`);
if (unresolvedSlugs.length) {
  console.log(unresolvedSlugs.join("\n"));
}
