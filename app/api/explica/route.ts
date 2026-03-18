import { NextRequest, NextResponse } from "next/server";
import { githubModelsChat } from "@/lib/github-models";
import { TraceEvent } from "@/lib/algorithms";

interface ExplainRequest {
	slug: string;
	stepIndex: number;
	event: TraceEvent;
	context: Record<string, any>;
}

export async function POST(request: NextRequest) {
	try {
		const body: ExplainRequest = await request.json();
		const { slug, stepIndex, event, context } = body;

		if (!slug || !event) {
			return NextResponse.json(
				{ error: "Lipsesc câmpuri obligatorii" },
				{ status: 400 }
			);
		}

		const eventTypeDescriptions: Record<string, string> = {
			compare: "Comparație",
			swap: "Interschimbare",
			set: "Atribuire",
			visit_node: "Vizitare nod",
			queue: "Operație cu coada",
			update_distance: "Actualizare distanță",
			done: "Finalizare",
		};

		const eventDesc = eventTypeDescriptions[event.type] || "Operație";

		const prompt = `
Tu ești un profesor de algoritmi amabil care explică pas cu pas în limba română.
  
Utilizatorul rulează algoritmul: ${slug}
Pe pasul ${stepIndex}:

Event: ${event.type}
${event.note ? `Notă: ${event.note}` : ""}
${event.vars ? `Variabile: ${JSON.stringify(event.vars)}` : ""}

Contextul execuției:
${JSON.stringify(context, null, 2)}

Explică pe scurt (1-2 propoziții) ce se întâmplă exact, de ce este important și cum afectează rezultatul final.
Răspunde în limba română.
`;

		const messages = [{ role: "user", content: prompt }];

		try {
			const explanation = await githubModelsChat(messages);
			return NextResponse.json({ answer: explanation });
		} catch (error) {
			let fallback = `${eventDesc}: ${event.note || "În curs de procesare..."}`;
			if (event.type === "done") {
				fallback = "Algoritmul s-a finalizat cu succes.";
			}
			return NextResponse.json({ answer: fallback });
		}
	} catch (error) {
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : "Eroare necunoscută" },
			{ status: 500 }
		);
	}
}
