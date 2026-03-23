const fs = require("fs");
const path = require("path");

const root = process.cwd();
const docsRoot = path.join(root, "lib", "algorithms");
const assetsRoot = path.join(root, "public", "docs-images");

const CATEGORY_THEME = {
  "sortare": { a: "#7f1d1d", b: "#fca5a5", accent: "#ef4444" },
  "cautare": { a: "#164e63", b: "#67e8f9", accent: "#06b6d4" },
  "grafuri": { a: "#312e81", b: "#a5b4fc", accent: "#6366f1" },
  "matematica": { a: "#365314", b: "#d9f99d", accent: "#84cc16" },
  "programare-dinamica": { a: "#065f46", b: "#86efac", accent: "#10b981" },
  "structuri-de-date": { a: "#334155", b: "#cbd5e1", accent: "#64748b" },
  "manipulare-biti": { a: "#4c1d95", b: "#c4b5fd", accent: "#8b5cf6" },
  "backtracking": { a: "#78350f", b: "#fcd34d", accent: "#f59e0b" },
  "cifru": { a: "#701a75", b: "#f5d0fe", accent: "#d946ef" },
  "diverse": { a: "#7c2d12", b: "#fed7aa", accent: "#f97316" },
};

function toTitleCaseFromSlug(slug) {
  return slug
    .replace(/[_-]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function listMdFiles(dir) {
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop();
    const entries = fs.readdirSync(cur, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(cur, ent.name);
      if (ent.isDirectory()) {
        stack.push(full);
      } else if (ent.isFile() && ent.name.toLowerCase().endsWith(".md")) {
        out.push(full);
      }
    }
  }
  return out;
}

function hasImageRef(content) {
  const mdImage = /!\[[^\]]*\]\(([^)]+)\)/m;
  const htmlImage = /<img[^>]*\ssrc=["'][^"']+["'][^>]*>/im;
  return mdImage.test(content) || htmlImage.test(content);
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function createSvg({ title, category, relMdPath }) {
  const theme = CATEGORY_THEME[category] || { a: "#0f172a", b: "#93c5fd", accent: "#3b82f6" };

  const safeTitle = xmlEscape(title);
  const safeCategory = xmlEscape(category.replace(/-/g, " "));
  const safePath = xmlEscape(relMdPath.replace(/\\/g, "/"));

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-label="${safeTitle}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${theme.a}"/>
      <stop offset="100%" stop-color="${theme.b}"/>
    </linearGradient>
    <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
      <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(255,255,255,0.11)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="675" fill="url(#bg)"/>
  <rect width="1200" height="675" fill="url(#grid)"/>

  <circle cx="1020" cy="120" r="120" fill="rgba(255,255,255,0.12)"/>
  <circle cx="180" cy="560" r="160" fill="rgba(255,255,255,0.09)"/>
  <rect x="70" y="70" width="1060" height="535" rx="28" fill="rgba(15,23,42,0.28)" stroke="rgba(255,255,255,0.22)"/>

  <text x="120" y="170" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="28" font-weight="700" fill="rgba(255,255,255,0.9)">Vizualizare algoritm</text>
  <text x="120" y="250" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="58" font-weight="800" fill="#ffffff">${safeTitle}</text>

  <rect x="120" y="300" width="360" height="46" rx="23" fill="rgba(255,255,255,0.16)"/>
  <circle cx="150" cy="323" r="10" fill="${theme.accent}"/>
  <text x="176" y="331" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="24" font-weight="700" fill="#f8fafc">Categorie: ${safeCategory}</text>

  <g transform="translate(760 220)">
    <rect x="0" y="0" width="280" height="220" rx="20" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.25)"/>
    <path d="M40 166 L100 102 L146 136 L228 64" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="40" cy="166" r="8" fill="#ffffff"/>
    <circle cx="100" cy="102" r="8" fill="#ffffff"/>
    <circle cx="146" cy="136" r="8" fill="#ffffff"/>
    <circle cx="228" cy="64" r="8" fill="#ffffff"/>
  </g>

  <text x="120" y="560" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(255,255,255,0.86)">Imagine locală stabilă pentru documentație, compatibilă cu previzualizarea din aplicație.</text>
  <text x="120" y="595" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(255,255,255,0.68)">${safePath}</text>
</svg>
`;
}

function replaceImageRefs(content, newUrl) {
  let out = content;

  out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (full, alt) => `![${alt}](${newUrl})`);
  out = out.replace(/(<img[^>]*\ssrc=["'])([^"']+)(["'][^>]*>)/gi, (_full, p1, _src, p3) => `${p1}${newUrl}${p3}`);

  return out;
}

function main() {
  if (!fs.existsSync(docsRoot)) {
    throw new Error(`Nu exista directorul: ${docsRoot}`);
  }

  ensureDir(assetsRoot);

  const mdFiles = listMdFiles(docsRoot);
  let touched = 0;
  let generated = 0;

  for (const mdFile of mdFiles) {
    const content = fs.readFileSync(mdFile, "utf8");
    if (!hasImageRef(content)) continue;

    const relToAlgorithms = path.relative(docsRoot, mdFile).replace(/\\/g, "/");
    const parts = relToAlgorithms.split("/");
    const category = parts[0] || "diverse";
    const baseName = path.basename(mdFile, ".md");
    const title = toTitleCaseFromSlug(baseName);

    const relSvg = relToAlgorithms.replace(/\.md$/i, ".svg");
    const absSvg = path.join(assetsRoot, relSvg);
    ensureDir(path.dirname(absSvg));

    const svg = createSvg({ title, category, relMdPath: relToAlgorithms });
    fs.writeFileSync(absSvg, svg, "utf8");
    generated += 1;

    const publicUrl = `/docs-images/${relSvg}`.replace(/\\/g, "/");
    const updated = replaceImageRefs(content, publicUrl);

    if (updated !== content) {
      fs.writeFileSync(mdFile, updated, "utf8");
      touched += 1;
    }
  }

  console.log(`MD files scanned: ${mdFiles.length}`);
  console.log(`MD files updated: ${touched}`);
  console.log(`SVG files generated: ${generated}`);
}

main();
