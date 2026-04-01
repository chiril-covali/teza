import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join, normalize, sep } from "path";
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

  const sourcePath = String(entry.sourcePath).replace(/\\/g, "/");
  if (!sourcePath.startsWith("lib/")) {
    return NextResponse.json(
      { error: "Calea sursei este invalidă." },
      { status: 400 }
    );
  }

  // Scope file reads to /lib to avoid tracing the entire project in Turbopack.
  const libRoot = join(process.cwd(), "lib");
  const relativePath = sourcePath.slice("lib/".length);
  const fullPath = normalize(join(libRoot, relativePath));
  const libRootWithSep = libRoot.endsWith(sep) ? libRoot : `${libRoot}${sep}`;

  if (!fullPath.startsWith(libRootWithSep)) {
    return NextResponse.json(
      { error: "Acces la cale nepermis." },
      { status: 400 }
    );
  }

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
