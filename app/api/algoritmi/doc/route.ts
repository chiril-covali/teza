import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import registry from "@/lib/algorithms/algorithms-registry.json";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug")?.trim();
  if (!slug) {
    return NextResponse.json(
      { error: "Parametrul slug este obligatoriu." },
      { status: 400 }
    );
  }

  const entry = (registry as any[]).find((r) => r.slug === slug);
  if (!entry || !entry.markdownPath) {
    return NextResponse.json(
      { error: "Documentația nu a fost găsită." },
      { status: 404 }
    );
  }

  const normalizedPath = entry.markdownPath.replace(/^\/+/, "");
  const prefix = "lib/algorithms/";
  if (!normalizedPath.startsWith(prefix) || !normalizedPath.endsWith(".md")) {
    return NextResponse.json(
      { error: "Calea documentației este invalidă." },
      { status: 500 }
    );
  }

  const markdownRelativePath = normalizedPath.slice(prefix.length);
  const absolutePath = path.join(
    process.cwd(),
    "lib",
    "algorithms",
    markdownRelativePath
  );

  let markdown = "";
  try {
    markdown = await fs.readFile(absolutePath, "utf8");
  } catch {
    return NextResponse.json(
      { error: "Fișierul markdown nu a fost găsit." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    slug: entry.slug,
    markdown,
    markdownPath: entry.markdownPath,
  });
}
