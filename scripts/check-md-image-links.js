const fs = require("fs");
const path = require("path");

const root = process.cwd();

function getMdFiles(dir) {
  const out = [];
  const stack = [dir];
  const ignore = new Set(["node_modules", ".git", ".next", "dist", "build"]);

  while (stack.length) {
    const cur = stack.pop();
    const entries = fs.readdirSync(cur, { withFileTypes: true });

    for (const ent of entries) {
      if (ent.name.startsWith(".") && ent.name !== ".github") continue;
      const full = path.join(cur, ent.name);

      if (ent.isDirectory()) {
        if (!ignore.has(ent.name)) stack.push(full);
      } else if (ent.isFile() && ent.name.toLowerCase().endsWith(".md")) {
        out.push(full);
      }
    }
  }

  return out;
}

function extractImageLinks(content) {
  const links = [];

  const imgMd = /!\[[^\]]*\]\(([^)\s]+(?:\s+"[^"]*")?)\)/g;
  let m;
  while ((m = imgMd.exec(content)) !== null) {
    let raw = m[1].trim();
    const titled = raw.match(/^(.+?)\s+".*"$/);
    if (titled) raw = titled[1].trim();
    links.push(raw.replace(/^<|>$/g, ""));
  }

  const imgHtml = /<img[^>]*\ssrc=["']([^"']+)["'][^>]*>/gi;
  while ((m = imgHtml.exec(content)) !== null) {
    links.push(m[1].trim());
  }

  const directUrl = /(https?:\/\/[^\s)]+\.(?:png|jpe?g|gif|webp|svg))(\?[^\s)]*)?/gi;
  while ((m = directUrl.exec(content)) !== null) {
    links.push((m[1] + (m[2] || "")).trim());
  }

  return [...new Set(links)];
}

async function checkRemote(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    let res;

    try {
      res = await fetch(url, { method: "HEAD", redirect: "follow", signal: controller.signal });
    } catch {
      res = await fetch(url, { method: "GET", redirect: "follow", signal: controller.signal });
    }

    const contentType = (res.headers.get("content-type") || "").toLowerCase();
    const statusOk = res.ok || (res.status >= 200 && res.status < 400);
    const imageLike = contentType.includes("image") || contentType.includes("octet-stream") || contentType === "";

    return {
      ok: statusOk && imageLike,
      status: res.status,
      contentType,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: err && err.name === "AbortError" ? "timeout" : String(err),
    };
  } finally {
    clearTimeout(timeout);
  }
}

function resolveLocal(file, link) {
  const clean = link.split("#")[0].split("?")[0];
  if (!clean) return null;
  if (clean.startsWith("/")) return path.join(root, "public", clean.slice(1));
  return path.resolve(path.dirname(file), clean);
}

function rel(p) {
  return path.relative(root, p).replace(/\\/g, "/");
}

(async () => {
  const mdFiles = getMdFiles(root);
  const refs = [];

  for (const file of mdFiles) {
    const content = fs.readFileSync(file, "utf8");
    const links = extractImageLinks(content);
    for (const link of links) {
      refs.push({ file, link });
    }
  }

  const remoteCache = new Map();
  const results = [];

  for (const ref of refs) {
    const { file, link } = ref;

    if (/^https?:\/\//i.test(link)) {
      if (!remoteCache.has(link)) {
        remoteCache.set(link, await checkRemote(link));
      }
      const base = remoteCache.get(link);
      results.push({ file, link, type: "remote", ...base });
      continue;
    }

    if (/^data:image\//i.test(link)) {
      results.push({ file, link, type: "data", ok: true, status: 0, contentType: "data:image" });
      continue;
    }

    const resolved = resolveLocal(file, link);
    const ok = !!resolved && fs.existsSync(resolved) && fs.statSync(resolved).isFile();
    results.push({ file, link, type: "local", ok, resolved });
  }

  const okLinks = results.filter((r) => r.ok);
  const badLinks = results.filter((r) => !r.ok);

  console.log(`TOTAL_MD_FILES=${mdFiles.length}`);
  console.log(`TOTAL_IMAGE_LINKS=${results.length}`);
  console.log(`WORKING=${okLinks.length}`);
  console.log(`BROKEN=${badLinks.length}`);
  console.log("");
  console.log("=== WORKING LINKS ===");

  for (const r of okLinks) {
    const where = rel(r.file);
    if (r.type === "remote") {
      console.log(`[OK][remote][${r.status}] ${r.link}  <-- ${where}`);
    } else if (r.type === "local") {
      console.log(`[OK][local] ${r.link} -> ${rel(r.resolved)}  <-- ${where}`);
    } else {
      console.log(`[OK][data] ${r.link.slice(0, 70)}...  <-- ${where}`);
    }
  }

  console.log("");
  console.log("=== BROKEN LINKS ===");

  for (const r of badLinks) {
    const where = rel(r.file);
    if (r.type === "remote") {
      console.log(`[BROKEN][remote][${r.status}] ${r.link} (${r.error || r.contentType || "invalid response"})  <-- ${where}`);
    } else {
      console.log(`[BROKEN][local] ${r.link} -> ${r.resolved ? rel(r.resolved) : "unresolved"}  <-- ${where}`);
    }
  }
})();
