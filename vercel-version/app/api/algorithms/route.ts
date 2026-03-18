import { NextRequest, NextResponse } from "next/server";
import { algorithmsMeta } from "@/lib/algorithms";

export async function GET() {
  return NextResponse.json(algorithmsMeta);
}
