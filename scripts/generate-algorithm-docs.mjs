import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const registryPath = path.join(root, "lib/algorithms/generated-registry.ts");
const algorithmsRoot = path.join(root, "lib/algorithms");
const docsIndexPath = path.join(root, "lib/algorithms/docs-index.json");

const raw = fs.readFileSync(registryPath, "utf8");
const assignIndex = raw.indexOf("= [");
const endIndex = raw.lastIndexOf("];\n");
if (assignIndex === -1 || endIndex === -1) {
  throw new Error("Nu am putut parsa generated-registry.ts");
}
const jsonArrayText = raw.slice(assignIndex + 2, endIndex + 1);
const registry = JSON.parse(jsonArrayText);

const ignoredFiles = new Set([
  "generated-registry.ts",
  "index.ts",
  "types.ts",
]);

function walk(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith(".ts")) continue;
    if (ignoredFiles.has(entry.name)) continue;
    if (entry.name.endsWith(".test.ts")) continue;
    out.push(full);
  }
  return out;
}

function normalizeKey(v) {
  return v
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

function readDocBlock(source) {
  const m = source.match(/\/\*\*([\s\S]*?)\*\//);
  return m ? m[1] : "";
}

function cleanDocLines(doc) {
  return doc
    .split("\n")
    .map((line) => line.replace(/^\s*\*\s?/, "").trim())
    .filter(Boolean);
}

function pickDescription(source, fallbackName) {
  const doc = readDocBlock(source);
  const lines = cleanDocLines(doc);

  const descTag = lines.find((l) => l.toLowerCase().startsWith("@description"));
  if (descTag) {
    return descTag.replace(/^@description\s*/i, "").trim();
  }

  const summaryTag = lines.find((l) => l.toLowerCase().startsWith("@summary"));
  if (summaryTag) {
    return summaryTag.replace(/^@summary\s*/i, "").trim();
  }

  const plain = lines
    .filter((l) => !l.startsWith("@"))
    .filter((l) => !/^https?:/i.test(l));

  if (plain.length) {
    return plain.slice(0, 2).join(" ").replace(/\s+/g, " ").trim();
  }

  return `${fallbackName} este documentat în codul sursă și poate fi studiat pas cu pas.`;
}

function algorithmNotesFromCode(source) {
  const notes = [];
  if (/while\s*\(/.test(source)) notes.push("Folosește cel puțin o buclă while în implementare.");
  if (/for\s*\(/.test(source)) notes.push("Folosește cel puțin o buclă for în implementare.");
  if (/return\s+.*=>|=>/.test(source)) notes.push("Implementarea folosește funcții arrow/funcții compacte.");
  if (/stack/i.test(source)) notes.push("Codul include logică bazată pe stivă.");
  if (/queue/i.test(source)) notes.push("Codul include logică bazată pe coadă.");
  if (/recurs/i.test(source) || /\bfunction\s+\w+\([^)]*\)\s*\{[\s\S]*?\b\1\(/.test(source)) {
    notes.push("Implementarea include recursivitate sau apeluri repetitive structurale.");
  }
  return notes.slice(0, 3);
}

const tsFiles = walk(algorithmsRoot);

const byNormalizedBase = new Map();
for (const filePath of tsFiles) {
  const base = path.basename(filePath, ".ts");
  const key = normalizeKey(base);
  if (!byNormalizedBase.has(key)) byNormalizedBase.set(key, []);
  byNormalizedBase.get(key).push(filePath);
}

function pickTsFileForSlug(slug) {
  const rest = slug.split("_").slice(1).join("_");
  const exactCandidates = [
    rest,
    rest.replace(/_/g, ""),
    rest.replace(/[-_]/g, ""),
  ].map(normalizeKey);

  for (const k of exactCandidates) {
    const found = byNormalizedBase.get(k);
    if (found && found.length > 0) return found[0];
  }

  const fallback = tsFiles.find((f) => normalizeKey(path.basename(f, ".ts")) === normalizeKey(rest));
  if (fallback) return fallback;

  return null;
}

function fallbackMdPathFromSlug(slug) {
  const [prefix, ...rest] = slug.split("_");
  const folder = path.join(algorithmsRoot, prefix);
  const fileBase = rest.join("_") || slug;
  fs.mkdirSync(folder, { recursive: true });
  return path.join(folder, `${fileBase}.md`);
}

const docsIndex = [];
let written = 0;
let unresolved = 0;

for (const item of registry) {
  const tsPath = pickTsFileForSlug(item.slug);
  const source = tsPath ? fs.readFileSync(tsPath, "utf8") : (item.source || "");
  if (!tsPath) unresolved++;
  const description = pickDescription(source, item.name);
  const notes = algorithmNotesFromCode(source);

  const mdPath = tsPath ? tsPath.replace(/\.ts$/, ".md") : fallbackMdPathFromSlug(item.slug);
  const relMdPath = path.relative(root, mdPath).replace(/\\/g, "/");

  const md = [
    `# ${item.name}`,
    "",
    `Slug: ${item.slug}`,
    `Categorie: ${item.category}`,
    "",
    "## Descriere",
    description,
    "",
    "## Observații din implementare",
    ...(notes.length ? notes.map((n) => `- ${n}`) : ["- Consultă codul sursă pentru pașii de execuție și detaliile complete."]),
    "",
  ].join("\n");

  fs.writeFileSync(mdPath, md, "utf8");
  written++;

  docsIndex.push({
    slug: item.slug,
    name: item.name,
    category: item.category,
    markdownPath: relMdPath,
  });
}

fs.writeFileSync(docsIndexPath, JSON.stringify(docsIndex, null, 2) + "\n", "utf8");

console.log(`Markdown generat pentru: ${written}`);
console.log(`Fără mapare .ts: ${unresolved}`);
console.log(`Index scris în: ${path.relative(root, docsIndexPath)}`);
