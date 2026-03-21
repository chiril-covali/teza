import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
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

  if (!entry || !entry.sourcePath) {
    return NextResponse.json(
      { error: `Sursa nu a fost găsită pentru algoritmul: ${slug}` },
      { status: 404 }
    );
  }

  const fullPath = join(process.cwd(), entry.sourcePath);

  let source: string;
  try {
    source = await readFile(fullPath, "utf-8");
  } catch {
    return NextResponse.json(
      { error: "Fișierul sursă nu a putut fi citit." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    slug,
    filePath: entry.sourcePath,
    source,
  });
}
