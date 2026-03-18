import { NextResponse } from "next/server";
import { allAlgorithms } from "@/lib/algorithms";

export async function GET() {
	return NextResponse.json(allAlgorithms);
}
