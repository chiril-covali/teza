import fs from "node:fs";
import path from "node:path";

const registryPath = path.resolve("lib/algorithms/generated-registry.ts");
const raw = fs.readFileSync(registryPath, "utf8");

const assignIndex = raw.indexOf("= [");
const endIndex = raw.lastIndexOf("];\n");
if (assignIndex === -1 || endIndex === -1) {
  throw new Error("Nu am putut parsa generated-registry.ts");
}

const jsonArrayText = raw.slice(assignIndex + 2, endIndex + 1);
const list = JSON.parse(jsonArrayText);

const tokenRo = {
  all: "toate",
  combinations: "combinațiile",
  of: "de",
  size: "dimensiune",
  k: "K",
  generate: "generare",
  parentheses: "paranteze",
  add: "adunare",
  binary: "binară",
  is: "verificare",
  power: "putere",
  xor: "XOR",
  cipher: "cifru",
  disjoint: "mulțimi disjuncte",
  set: "set",
  heap: "heap",
  doubly: "dublu",
  linked: "înlănțuită",
  list: "listă",
  singly: "simplă",
  hash: "hash",
  map: "hartă",
  queue: "coadă",
  circular: "circulară",
  stack: "stivă",
  tree: "arbore",
  binarysearchtree: "arbore de căutare binar",
  trie: "trie",
  coin: "monede",
  change: "rest minim",
  knapsack: "rucsac",
  lcs: "subsecvența comună maximă",
  interpolation: "interpolare",
  jump: "salturi",
  sentinel: "santinelă",
  search: "căutare",
  sort: "sortare",
  graph: "graf",
  quickselect: "quick select",
};

const stopwords = new Set(["de", "și", "în", "din", "la", "cu", "pe", "lui"]);

function titleCaseRo(text) {
  return text
    .split(" ")
    .filter(Boolean)
    .map((w, i) => {
      if (i > 0 && stopwords.has(w.toLowerCase())) return w.toLowerCase();
      if (/^[A-Z0-9\-]+$/.test(w)) return w;
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitCamel(value) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean);
}

function buildRoNameFromSlug(slug) {
  const parts = slug
    .split("_")
    .slice(1)
    .flatMap((part) => splitCamel(part));

  const translated = parts.map((part) => tokenRo[part.toLowerCase()] ?? part.toLowerCase());
  const joined = translated.join(" ").replace(/\s+/g, " ").trim();
  return titleCaseRo(joined || slug.replace(/^alg_/, "").replace(/_/g, " "));
}

function normalizeComplexity(value) {
  const v = (value || "").trim();
  if (!v || /N\/A/i.test(v)) return "";
  return v;
}

function normalizeName(name, slug, shouldRewrite) {
  const current = (name || "").trim();
  if (shouldRewrite || /\b(Search|Sort)\b/i.test(current)) {
    return buildRoNameFromSlug(slug);
  }
  return current || buildRoNameFromSlug(slug);
}

function normalizeDescription(item, shouldRewrite) {
  const desc = (item.description || "").trim();
  if (
    !desc ||
    shouldRewrite ||
    desc.includes("Implementare TypeScript") ||
    desc.includes("implementare TypeScript")
  ) {
    return `${item.name} este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică.`;
  }
  return desc;
}

let rewritten = 0;
for (const item of list) {
  const hadTsPhrase =
    (item.description || "").includes("Implementare TypeScript") ||
    (item.description || "").includes("implementare TypeScript");

  item.complexity = normalizeComplexity(item.complexity);
  item.name = normalizeName(item.name || "", item.slug, hadTsPhrase);
  item.description = normalizeDescription(item, hadTsPhrase);
  if (hadTsPhrase) rewritten++;
}

const output =
  'import { AlgorithmMeta } from "./types";\n\n' +
  "export const allAlgorithmsMeta: AlgorithmMeta[] = " +
  JSON.stringify(list, null, 2) +
  ";\n";

fs.writeFileSync(registryPath, output, "utf8");
console.log(`Descrieri rescrise: ${rewritten}`);
