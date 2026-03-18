import { NextRequest, NextResponse } from "next/server";
import { githubModelsChat } from "@/lib/github-models";
import { TraceEvent, runAlgorithm } from "@/lib/algorithms";

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
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const eventTypeDescriptions: Record<string, string> = {
      compare: "A detectat o comparație",
      swap: "A efectuat un swap/schimb",
      set: "A setat o valoare",
      visit_node: "A vizitat un nod",
      queue: "A utilizat coada",
      update_distance: "A actualizat o distanță",
      done: "Algoritmul a terminat",
    };

    const eventDesc = eventTypeDescriptions[event.type] || "O operație";

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
      // Fallback explanation if GitHub Models fails
      const fallback = `${eventDesc}: ${event.note || "Operație în curs"}`;
      return NextResponse.json({ answer: fallback });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
