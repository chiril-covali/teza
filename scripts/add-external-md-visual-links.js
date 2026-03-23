const fs = require("fs");
const path = require("path");

const root = process.cwd();
const docsRoot = path.join(root, "lib", "algorithms");

const EXTERNAL_BY_CATEGORY = {
  "sortare": [
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
  ],
  "cautare": [
    "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg",
    "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80",
  ],
  "grafuri": [
    "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
  ],
  "matematica": [
    "https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg",
    "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg",
  ],
  "programare-dinamica": [
    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
    "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
  ],
  "structuri-de-date": [
    "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg",
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
  ],
  "manipulare-biti": [
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
  ],
  "backtracking": [
    "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
    "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80",
  ],
  "cifru": [
    "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
  ],
  "diverse": [
    "https://cdn.pixabay.com/photo/2015/05/31/10/55/man-791049_1280.jpg",
    "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
  ],
};

function listMdFiles(dir) {
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop();
    const entries = fs.readdirSync(cur, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(cur, ent.name);
      if (ent.isDirectory()) stack.push(full);
      else if (ent.isFile() && ent.name.toLowerCase().endsWith(".md")) out.push(full);
    }
  }
  return out;
}

function pickExternal(category, seed) {
  const list = EXTERNAL_BY_CATEGORY[category] || EXTERNAL_BY_CATEGORY.diverse;
  return list[seed % list.length];
}

function main() {
  const files = listMdFiles(docsRoot);
  let updated = 0;

  for (const file of files) {
    const rel = path.relative(docsRoot, file).replace(/\\/g, "/");
    const category = rel.split("/")[0] || "diverse";

    let content = fs.readFileSync(file, "utf8");

    if (content.includes("<!-- external-visual -->")) continue;

    const imageRegex = /!\[[^\]]*\]\(([^)]+)\)/;
    const match = content.match(imageRegex);
    if (!match) continue;

    const external = pickExternal(category, rel.length);
    const insert = `\n<!-- external-visual -->\n![Resursă vizuală externă (${category})](${external})\n`;

    content = content.replace(imageRegex, (m) => `${m}${insert}`);
    fs.writeFileSync(file, content, "utf8");
    updated += 1;
  }

  console.log(`MD files scanned: ${files.length}`);
  console.log(`MD files updated with external visuals: ${updated}`);
}

main();
