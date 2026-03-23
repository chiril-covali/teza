import fs from "node:fs";
import path from "node:path";
import { config } from "dotenv";

config(); // Load .env file

const root = process.cwd();
const docsIndexPath = path.join(root, "lib/algorithms/docs-index.json");
const maxRetries = Number(process.env.RICH_DOCS_MAX_RETRIES || 8);
const requestDelayMs = Number(process.env.RICH_DOCS_BETWEEN_REQUESTS_MS || 12000);
const baseBackoffMs = Number(process.env.RICH_DOCS_BACKOFF_BASE_MS || 12000);
const maxBackoffMs = Number(process.env.RICH_DOCS_BACKOFF_MAX_MS || 120000);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function computeBackoffMs(attempt, retryAfterSeconds) {
  if (Number.isFinite(retryAfterSeconds) && retryAfterSeconds > 0) {
    return Math.min(retryAfterSeconds * 1000, maxBackoffMs);
  }

  const exponential = Math.min(baseBackoffMs * 2 ** Math.max(attempt - 1, 0), maxBackoffMs);
  const jitterFactor = 0.75 + Math.random() * 0.5; // 75%-125% jitter
  return Math.round(exponential * jitterFactor);
}

function parseRetryAfterSeconds(headers) {
  const raw =
    headers?.get?.("retry-after") ??
    headers?.get?.("x-ratelimit-reset-after") ??
    headers?.get?.("x-ms-retry-after-ms");

  if (!raw) {
    return null;
  }

  const numeric = Number(raw);
  if (Number.isFinite(numeric)) {
    if (raw.toString().includes("ms")) {
      return Math.max(1, Math.ceil(numeric / 1000));
    }
    return Math.max(1, Math.ceil(numeric));
  }

  const dateMs = Date.parse(raw);
  if (Number.isFinite(dateMs)) {
    const seconds = Math.ceil((dateMs - Date.now()) / 1000);
    return seconds > 0 ? seconds : null;
  }

  return null;
}

function looksLikeRateLimitError(error) {
  const status = error?.status;
  const message = String(error?.message || "").toLowerCase();
  return status === 429 || message.includes("429") || message.includes("rate limit");
}

function hasRequiredSections(content) {
  const required = [
    "<!-- custom-doc -->",
    "## 📝 **Descriere**",
    "## 🖼️ **Reprezentare Vizuală**",
    "## ⚖️ **Avantaje și Dezavantaje**",
    "## 🔢 **Analiză Matematică și Complexitate**",
    "## 💡 **Aplicații Practice**",
  ];
  return required.every((token) => content.includes(token));
}

async function githubModelsChat(messages) {
  const apiToken = process.env.GITHUB_TOKEN;
  const apiModel = process.env.GITHUB_MODELS_MODEL || "gpt-4o-mini";
  const apiEndpoint =
    process.env.GITHUB_MODELS_ENDPOINT ||
    "https://models.github.ai/inference/chat/completions";

  if (!apiToken) {
    throw new Error("GITHUB_TOKEN missing from .env");
  }

  const isAzure = apiEndpoint.includes("azure.com");
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (isAzure) {
    headers["api-key"] = apiToken;
  } else {
    headers["Authorization"] = `Bearer ${apiToken}`;
    headers["Accept"] = "application/vnd.github+json";
    headers["X-GitHub-Api-Version"] = "2022-11-28";
  }

  const payload = {
    model: apiModel,
    messages,
    temperature: 0.3,
  };

  const response = await fetch(apiEndpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    const error = new Error(`API error (${response.status}): ${text}`);
    error.status = response.status;
    error.retryAfterSeconds = parseRetryAfterSeconds(response.headers);
    throw error;
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

const promptTemplate = (name, category) => `
Generează un fișier Markdown de calitate excepțională în limba română pentru: "${name}" (Categoria: ${category}).

Cerințe STRICTE de formatare:
1. Marker Obligatoriu: Începe prima linie a fișierului EXACT cu: <!-- custom-doc -->
2. Titlu Principal: Folosește un emoji relevant, de exemplu: # 🚀 ${name}
3. Secțiuni cu EMOJI (Titluri cu BOLD):
  - ## 📝 **Descriere**
  - ## 🖼️ **Reprezentare Vizuală** (Titlu cu Bold, include un link de imagine extern relevant de pe Wikipedia/Wikimedia și o diagramă ASCII creativă)
  - ## ⚖️ **Avantaje și Dezavantaje** (TREBUIE să fie un TABEL Markdown cu coloanele "Avantaj" și "Dezavantaj")
  - ## 🔢 **Analiză Matematică și Complexitate** (Include un tabel pentru Time/Space Complexity și formule KaTeX folosind $$ pentru blocuri)
  - ## 💡 **Aplicații Practice**
4. FĂRĂ NOTĂ DE SUBSOL: Nu adăuga nicio mențiune despre "proiectul Teza" sau biblioteca de algoritmi la final.
5. Stil Vizual: Folosește **bold** pentru termenii cheie, tabele curate și o structură profesională.
6. Matematică: Folosește $$ ... $$ pentru ecuații pe rând nou și $ ... $ pentru cele în text. Pentru sisteme de ecuații folosește \begin{cases}.

Generează acum conținutul pur, fără alte comentarii de introducere.
`;

async function main() {
  const indexRaw = fs.readFileSync(docsIndexPath, "utf8");
  const registry = JSON.parse(indexRaw);

  console.log(`Găsiți ${registry.length} algoritmi în catalog.`);
  let processed = 0;
  let skipped = 0;
  let failed = 0;

  for (const item of registry) {
    const mdPath = path.join(root, item.markdownPath);
    
    let cleanName = item.name;
    const parts = cleanName.split(' ');
    if (parts.length >= 2 && parts[0].toLowerCase() === parts[parts.length - 1].toLowerCase()) {
        cleanName = parts.slice(0, -1).join(' ');
    }
    const words = cleanName.split(' ');
    if (words.length === 2 && words[0].toLowerCase() === words[1].toLowerCase()) {
        cleanName = words[0];
    }

    if (fs.existsSync(mdPath)) {
        const existing = fs.readFileSync(mdPath, "utf8");
        // Check for the NEW section title format with emoji and bold to decide if we skip
        if (existing.includes("## ⚖️ **Avantaje și Dezavantaje**") && !existing.includes("proiectului Teza")) {
            console.log(`[SKIP] ${item.name} - deja are formatul nou.`);
            skipped++;
            continue;
        }
    }

    console.log(`[GENERATE] Generăm documentație bogată pentru: ${cleanName} (${item.category})...`);
    
    try {
      let retries = maxRetries;
      let attempt = 0;
      let success = false;
      let finalContent = "";
      
      while (retries > 0 && !success) {
        attempt++;
        try {
          const response = await githubModelsChat([
            { role: "system", content: "You are a highly skilled computer science professor speaking in Romanian." },
            { role: "user", content: promptTemplate(cleanName, item.category) }
          ]);
          finalContent = response.trim();

          // Safety check to remove trailing/leading markdown formatting artifacts from LLMs
          if (finalContent.startsWith("```markdown")) {
            finalContent = finalContent.substring(11).trim();
          }
          if (finalContent.startsWith("```md")) {
            finalContent = finalContent.substring(6).trim();
          }
          if (finalContent.endsWith("```")) {
            finalContent = finalContent.substring(0, finalContent.length - 3).trim();
          }

          // Ensure the marker is always the first line.
          if (!finalContent.startsWith("<!-- custom-doc -->")) {
            finalContent = "<!-- custom-doc -->\n" + finalContent;
          }

          if (!hasRequiredSections(finalContent)) {
            throw new Error("Generated content is missing one or more required sections.");
          }

          success = true;
        } catch (err) {
          retries--;
          if (looksLikeRateLimitError(err)) {
            const waitMs = computeBackoffMs(attempt, err.retryAfterSeconds);
            console.log(
              `    [RATE LIMIT] Așteptăm ${Math.ceil(waitMs / 1000)} secunde... (Încercări rămase: ${retries})`
            );
            if (retries > 0) {
              await sleep(waitMs);
            }
          } else if (retries > 0) {
            console.log(
              `    [RETRY] Eroare temporară: ${err.message}. Reîncercăm în ${Math.ceil(baseBackoffMs / 1000)} secunde... (Încercări rămase: ${retries})`
            );
            await sleep(baseBackoffMs);
          } else {
            throw err;
          }
        }
      }
      
      if (!success) {
        throw new Error("Rate limit exceeded after multiple retries.");
      }

      fs.writeFileSync(mdPath, finalContent, "utf8");
      processed++;
      
      // Wait a bit to avoid hitting rate limits too quickly
      await sleep(requestDelayMs);
      
    } catch (err) {
      console.error(`[ERROR] Eroare la generarea pentru ${item.name}:`, err.message);
      failed++;
    }
  }

  console.log("\n==================================");
  console.log("Generare completă!");
  console.log(`Procesați (noi): ${processed}`);
  console.log(`Săriți (deja custom): ${skipped}`);
  console.log(`Eșuați (erori): ${failed}`);
  console.log("==================================");
}

main().catch(console.error);
