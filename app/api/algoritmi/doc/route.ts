import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import docsIndex from "@/lib/algorithms/docs-index.json";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug")?.trim();
  if (!slug) {
    return NextResponse.json({ error: "Parametrul slug este obligatoriu." }, { status: 400 });
  }

  const doc = docsIndex.find((d) => d.slug === slug);
  if (!doc) {
    return NextResponse.json({ error: "Documentația nu a fost găsită." }, { status: 404 });
  }

  const normalizedPath = doc.markdownPath.replace(/^\/+/, "");
  const prefix = "lib/algorithms/";
  if (!normalizedPath.startsWith(prefix) || !normalizedPath.endsWith(".md")) {
    return NextResponse.json({ error: "Calea documentației este invalidă." }, { status: 500 });
  }

  const markdownRelativePath = normalizedPath.slice(prefix.length);
  const absolutePath = path.join(process.cwd(), "lib", "algorithms", markdownRelativePath);

  let markdown = "";
  try {
    markdown = await fs.readFile(absolutePath, "utf8");
  } catch {
    return NextResponse.json({ error: "Fișierul markdown nu a fost găsit." }, { status: 404 });
  }

  return NextResponse.json({
    slug: doc.slug,
    markdown,
    markdownPath: doc.markdownPath,
  });
}
