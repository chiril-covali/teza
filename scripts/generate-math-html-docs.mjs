import fs from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";
import katex from "katex";

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, "lib", "algorithms");

marked.setOptions({
  gfm: true,
  breaks: false,
});

function cleanMarkdown(markdown) {
  return markdown
    .replace(/<!--\s*custom-doc\s*-->\n?/gi, "")
    .trim();
}

function stripEmojiFromHeadingLines(markdown) {
  return markdown.replace(
    /^(\s*#{1,6}\s+)(?:[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}\uFE0F\u200D\s]+)+/gmu,
    "$1"
  );
}

function renderMathInText(text) {
  const renderKatex = (math, displayMode) => {
    const rendered = katex.renderToString(String(math).trim(), {
      displayMode,
      throwOnError: false,
      strict: "ignore",
    });

    // Important: remove line breaks so Markdown tables are not split by SVG path data.
    return rendered.replace(/\s*\n\s*/g, " ").replace(/\s{2,}/g, " ").trim();
  };

  const blockRendered = text.replace(/\$\$([\s\S]+?)\$\$/g, (_match, expr) => {
    const math = String(expr).trim();
    if (!math) return "";
    return renderKatex(math, true);
  });

  return blockRendered.replace(/(^|[^\\])\$(?!\$)([^\n$]+?)\$(?!\$)/g, (_match, prefix, expr) => {
    const math = String(expr).trim();
    if (!math) return _match;
    return `${prefix}${renderKatex(math, false)}`;
  });
}

function renderMathOutsideCodeFences(markdown) {
  const parts = markdown.split(/(```[\s\S]*?```)/g);
  return parts
    .map((part) => {
      if (part.startsWith("```")) return part;
      return renderMathInText(part);
    })
    .join("");
}

function addSvgIconsToHeadings(html) {
  const icons = {
    descriere: `<span class="md-doc-heading-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="5" fill="#0ea5e9"/><path d="M8 8h8M8 12h8M8 16h6" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg></span>`,
    vizual: `<span class="md-doc-heading-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="5" fill="#22c55e"/><circle cx="12" cy="12" r="4" stroke="white" stroke-width="1.8"/><path d="M5.5 12s2.5-4 6.5-4 6.5 4 6.5 4-2.5 4-6.5 4-6.5-4-6.5-4Z" stroke="white" stroke-width="1.4"/></svg></span>`,
    avantaje: `<span class="md-doc-heading-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="5" fill="#f59e0b"/><path d="M7 9h10M7 12h6M7 15h8" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg></span>`,
    analiza: `<span class="md-doc-heading-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="5" fill="#7c3aed"/><path d="M7 15l3-3 2 2 5-5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 18h10" stroke="white" stroke-width="1.4" stroke-linecap="round"/></svg></span>`,
    aplicatii: `<span class="md-doc-heading-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="5" fill="#ef4444"/><path d="M12 7v10M7 12h10" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg></span>`,
    default: `<span class="md-doc-heading-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="5" fill="#2563eb"/><path d="M7.5 12h9M12 7.5v9" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg></span>`,
  };

  const pickIcon = (label) => {
    const normalized = label
      .replace(/<[^>]*>/g, "")
      .toLowerCase();

    if (normalized.includes("descriere")) return icons.descriere;
    if (normalized.includes("reprezentare") || normalized.includes("vizual")) return icons.vizual;
    if (normalized.includes("avantaje") || normalized.includes("dezavantaje")) return icons.avantaje;
    if (normalized.includes("analiz")) return icons.analiza;
    if (normalized.includes("aplica")) return icons.aplicatii;
    return icons.default;
  };

  return html.replace(/<h([1-4])>([\s\S]*?)<\/h\1>/g, (_m, lvl, inner) => {
    const cleaned = String(inner)
      .replace(/^(?:[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}\uFE0F\u200D\s]+)+/u, "")
      .trim();
    return `<h${lvl}>${pickIcon(cleaned)}<span>${cleaned}</span></h${lvl}>`;
  });
}

function replaceEmojiWithSvgOutsidePre(html) {
  const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}\uFE0F\u200D]+/gu;
  const inlineSvg = `<span class="md-doc-inline-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" fill="#dbeafe"/><path d="M5 8h6M8 5v6" stroke="#2563eb" stroke-width="1.5" stroke-linecap="round"/></svg></span>`;
  const chunks = html.split(/(<pre[\s\S]*?<\/pre>)/g);
  return chunks
    .map((chunk) => {
      if (chunk.startsWith("<pre")) return chunk;
      return chunk.replace(emojiRegex, inlineSvg);
    })
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtmlPage({ bodyHtml }) {
  return `<section class="md-doc-shell">
  <article class="md-doc-content">
${bodyHtml}
  </article>
</section>

<style>
  .md-doc-shell {
    --ink: #0f172a;
    --muted: #334155;
    --line: #dbeafe;
    --soft: #eff6ff;
    --accent: #2563eb;
    --accent-2: #0ea5e9;
    color: var(--ink);
    font-family: "IBM Plex Sans", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  }

  .md-doc-content {
    border: 1px solid #e2e8f0;
    border-radius: 1.1rem;
    background: #ffffff;
    padding: 1.2rem 1.3rem;
    box-shadow: 0 20px 42px -36px rgba(15, 23, 42, 0.55);
    line-height: 1.75;
    color: var(--muted);
    overflow-x: auto;
    background-image:
      radial-gradient(circle at 12% 4%, rgba(56, 189, 248, 0.08) 0, transparent 32%),
      radial-gradient(circle at 92% 0%, rgba(37, 99, 235, 0.08) 0, transparent 28%);
  }

  .md-doc-content > :first-child { margin-top: 0; }
  .md-doc-content > :last-child { margin-bottom: 0; }

  .md-doc-content h1,
  .md-doc-content h2,
  .md-doc-content h3,
  .md-doc-content h4 {
    color: #0f172a;
    line-height: 1.3;
    margin: 1.25rem 0 0.65rem;
    font-weight: 800;
    letter-spacing: -0.01em;
    display: flex;
    align-items: center;
    gap: 0.55rem;
  }

  .md-doc-content h1 { font-size: 1.6rem; }
  .md-doc-content h2 { font-size: 1.3rem; border-top: 1px solid #e2e8f0; padding-top: 0.95rem; }
  .md-doc-content h3 { font-size: 1.1rem; }

  .md-doc-heading-icon {
    width: 1.1em;
    height: 1.1em;
    display: inline-flex;
    flex: 0 0 auto;
  }

  .md-doc-heading-icon svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  .md-doc-inline-icon {
    width: 1em;
    height: 1em;
    display: inline-flex;
    vertical-align: -0.12em;
    margin-right: 0.18em;
  }

  .md-doc-inline-icon svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  .md-doc-content p { margin: 0.8rem 0; }
  .md-doc-content ul, .md-doc-content ol { margin: 0.65rem 0 0.9rem; padding-left: 1.2rem; }
  .md-doc-content li { margin: 0.35rem 0; }

  .md-doc-content blockquote {
    margin: 0.9rem 0;
    border-left: 4px solid #93c5fd;
    background: #eff6ff;
    padding: 0.75rem 0.9rem;
    border-radius: 0.55rem;
    color: #1e3a8a;
  }

  .md-doc-content code {
    background: #eef2ff;
    border: 1px solid #dbeafe;
    color: #1e3a8a;
    padding: 0.14rem 0.38rem;
    border-radius: 0.4rem;
    font-size: 0.88em;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  }

  .md-doc-content pre {
    margin: 0.95rem 0;
    background: #0f172a;
    color: #e2e8f0;
    padding: 0.95rem 1rem;
    border-radius: 0.8rem;
    overflow: auto;
    border: 1px solid #1e293b;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04);
  }

  .md-doc-content pre code {
    border: 0;
    background: transparent;
    color: inherit;
    padding: 0;
  }

  .md-doc-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
    border-radius: 0.8rem;
    overflow: hidden;
    border: 1px solid #dbeafe;
  }

  .md-doc-content th,
  .md-doc-content td {
    border: 1px solid #e2e8f0;
    padding: 0.62rem 0.7rem;
    vertical-align: top;
    text-align: left;
  }

  .md-doc-content th {
    background: #eff6ff;
    color: #1e3a8a;
    font-weight: 700;
  }

  .md-doc-content img {
    width: 100%;
    max-height: 420px;
    object-fit: cover;
    border-radius: 0.9rem;
    border: 1px solid #dbeafe;
    margin: 0.8rem 0 0.95rem;
    box-shadow: 0 14px 28px -24px rgba(14, 165, 233, 0.75);
  }

  .md-doc-content hr {
    border: 0;
    border-top: 1px solid #e2e8f0;
    margin: 1rem 0;
  }

  .md-doc-content .katex-display {
    overflow-x: auto;
    padding-bottom: 0.25rem;
  }

  @media (max-width: 768px) {
    .md-doc-content {
      padding: 1rem;
      border-radius: 0.9rem;
    }

    .md-doc-content table {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
    }

    .md-doc-content img {
      max-height: 280px;
    }
  }
</style>
`;
}

async function collectMarkdownFiles(dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectMarkdownFiles(fullPath)));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

async function generate() {
  const markdownFiles = await collectMarkdownFiles(DOCS_DIR);
  let generated = 0;

  for (const mdPath of markdownFiles) {
    const raw = await fs.readFile(mdPath, "utf8");
    const cleaned = cleanMarkdown(raw);
    const noEmojiHeadings = stripEmojiFromHeadingLines(cleaned);
    const withMath = renderMathOutsideCodeFences(noEmojiHeadings);
    let bodyHtml = marked.parse(withMath);
    bodyHtml = addSvgIconsToHeadings(bodyHtml);
    bodyHtml = replaceEmojiWithSvgOutsidePre(bodyHtml);

    const html = buildHtmlPage({ bodyHtml });
    const htmlPath = mdPath.replace(/\.md$/i, ".html");

    await fs.writeFile(htmlPath, html, "utf8");
    generated += 1;
  }

  console.log(`Algorithm markdown files found: ${markdownFiles.length}`);
  console.log(`HTML files generated/updated: ${generated}`);
}

generate();
