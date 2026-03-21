import { NextResponse } from "next/server";
import { allAlgorithmsList } from "@/lib/algorithms";

export async function GET() {
	return NextResponse.json(allAlgorithmsList);
}
