import { NextRequest, NextResponse } from "next/server";
import { readFile, readdir } from "fs/promises";
import { join, extname } from "path";
import { existsSync } from "fs";

// Hardcoded mapping for algorithms where auto-detection might fail
const slugToFilePath: Record<string, string> = {
  "backtracking_generateparentheses": "TypeScript-master/backtracking/generateparentheses.ts",
  "backtracking_all_combinations_of_size_k": "TypeScript-master/backtracking/all_combinations_of_size_k.ts",
  "cifru_xor_cipher": "TypeScript-master/ciphers/xor_cipher.ts",
  "cautare_binarySearch": "TypeScript-master/search/binary_search.ts",
};

// Helper to find file by fuzzy matching
async function findFileInCategory(folder: string, hint: string): Promise<string | null> {
  try {
    const fullPath = join(process.cwd(), `TypeScript-master/${folder}`);
    const files = await readdir(fullPath);
    
    const hint_lower = hint.toLowerCase();
    
    // First try exact match
    for (const file of files) {
      if (file.toLowerCase() === hint_lower) {
        return file;
      }
    }
    
    // Try partial match
    for (const file of files) {
      if (file.toLowerCase().includes(hint_lower)) {
        return file;
      }
    }
    
    // Try reverse - hint includes file
    for (const file of files) {
      const fileName = file.replace(extname(file), "").toLowerCase();
      if (hint_lower.includes(fileName)) {
        return file;
      }
    }
  } catch (error) {
    console.error(`Error searching folder ${folder}:`, error);
  }
  
  return null;
}

async function resolveSourceFile(slug: string): Promise<{ path: string; filePath: string } | null> {
  // Try hardcoded mapping first
  if (slugToFilePath[slug]) {
    const path = slugToFilePath[slug];
    if (existsSync(join(process.cwd(), path))) {
      return { path, filePath: path };
    }
  }
  
  // Parse slug: "category_name" format
  const parts = slug.split("_");
  if (parts.length < 2) {
    return null;
  }
  
  const category = parts[0];
  const nameHint = parts.slice(1).join("_");
  
  // Map categories to folders
  const categoryToFolder: Record<string, string> = {
    backtracking: "backtracking",
    bitmanipulation: "bit_manipulation",
    "manipulare-biti": "bit_manipulation",
    cifru: "ciphers",
    cautare: "search",
    diverse: "other",
    grafuri: "graph",
    matematica: "maths",
    sortare: "sorts",
    "dynamic-programming": "dynamic_programming",
    "structuri-date": "data_structures",
  };
  
  const folder = categoryToFolder[category];
  if (!folder) {
    return null;
  }
  
  // Try to find file
  const fileName = await findFileInCategory(folder, nameHint);
  if (fileName) {
    const path = `TypeScript-master/${folder}/${fileName}`;
    return { path, filePath: path };
  }
  
  return null;
}

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Missing slug parameter" },
        { status: 400 }
      );
    }

    const result = await resolveSourceFile(slug);

    if (!result) {
      return NextResponse.json(
        { error: `Source not found for algorithm: ${slug}` },
        { status: 404 }
      );
    }

    // Read the file from the project root
    const fullPath = join(process.cwd(), result.path);
    const source = await readFile(fullPath, "utf-8");

    return NextResponse.json({
      slug,
      filePath: result.filePath,
      source,
    });
  } catch (error: any) {
    console.error("Error reading source:", error);
    return NextResponse.json(
      { error: "Failed to read source file", details: error.message },
      { status: 500 }
    );
  }
}
