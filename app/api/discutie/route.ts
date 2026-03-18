import { NextRequest, NextResponse } from "next/server";
import { githubModelsChat } from "@/lib/github-models";
import { TraceEvent } from "@/lib/algorithms";

interface ChatRequest {
	slug: string;
	question: string;
	context?: {
		input?: Record<string, any>;
		currentStepIndex?: number;
		currentEvent?: TraceEvent;
	};
}

export async function POST(request: NextRequest) {
	try {
		const body: ChatRequest = await request.json();
		const { slug, question, context } = body;

		if (!slug || !question) {
			return NextResponse.json(
				{ error: "Lipsesc câmpurile slug sau întrebare" },
				{ status: 400 }
			);
		}

		const prompt = `
Tu ești un profesor de algoritmi în limba română care ajută studenții să înțeleagă algoritmii.

Utilizatorul învață algoritmul: ${slug}
Marea întrebare: "${question}"

${context?.input ? `Input-ul actual: ${JSON.stringify(context.input)}` : ""}
${context?.currentStepIndex !== undefined ? `Suntem la pasul: ${context.currentStepIndex}` : ""}
${context?.currentEvent ? `Event curent: ${JSON.stringify(context.currentEvent)}` : ""}

Răspunde în limba română, pe scurt (2-3 propoziții), cu exemple practice dacă e util.
Explică conceptul în mod ușor de înțeles pentru studenții care cis sunt în curs.
`;

		const messages = [{ role: "user", content: prompt }];

		try {
			const answer = await githubModelsChat(messages);
			return NextResponse.json({ answer });
		} catch (error) {
			console.error("GitHub Models error:", error);
			return NextResponse.json(
				{
					answer:
						"Nu am putut accesa AI-ul în acest moment. Încearcă din nou mai târziu.",
				},
				{ status: 200 }
			);
		}
	} catch (error) {
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : "Eroare necunoscută" },
			{ status: 500 }
		);
	}
}
