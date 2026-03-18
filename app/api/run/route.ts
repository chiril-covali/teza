import { NextRequest, NextResponse } from "next/server";
import { runAlgorithm } from "@/lib/algorithms";

export async function POST(request: NextRequest) {
  try {
    const { slug, input } = await request.json();

    if (!slug || !input) {
      return NextResponse.json(
        { error: "Missing slug or input" },
        { status: 400 }
      );
    }

    const result = runAlgorithm(slug, input);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
