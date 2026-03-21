import { NextRequest, NextResponse } from "next/server";
import { TraceEvent } from "@/lib/algorithms";

interface ExplainRequest {
	slug: string;
	stepIndex: number;
	event: TraceEvent;
	context: Record<string, any>;
}

const eventTypeLabels: Record<string, string> = {
	compare: "Comparație",
	swap: "Interschimbare",
	set: "Atribuire valoare",
	visit_node: "Vizitare nod",
	queue: "Operație coadă/stivă",
	update_distance: "Actualizare distanță",
	mark_found: "Marcare rezultat",
	dp_cell: "Calculul celulei DP",
	done: "Finalizare",
};

function buildExplanation(event: TraceEvent, stepIndex: number): string {
	if (event.note) {
		return event.note;
	}

	const label = eventTypeLabels[event.type] || "Operație";
	const ev = event as any;

	switch (event.type) {
		case "compare": {
			const [i, j] = ev.indices ?? [];
			const [vi, vj] = ev.values ?? [];
			if (i !== undefined && vi !== undefined)
				return `${label} (pasul ${stepIndex + 1}): se compară valoarea ${vi} (poziția ${i}) cu ${vj} (poziția ${j}).`;
			return `${label} (pasul ${stepIndex + 1}).`;
		}
		case "swap": {
			const [i, j] = ev.indices ?? [];
			const arr = ev.array ?? [];
			return `${label} (pasul ${stepIndex + 1}): elementele de pe pozițiile ${i} și ${j} se interschimbă → [${arr[i]}, ${arr[j]}].`;
		}
		case "set": {
			return `${label} (pasul ${stepIndex + 1}): valoarea ${ev.value} este plasată pe poziția ${ev.index}.`;
		}
		case "visit_node": {
			return `${label} (pasul ${stepIndex + 1}): nodul „${ev.node}" este vizitat și procesat.`;
		}
		case "queue": {
			const action = ev.action === "enqueue" ? "adăugat în coadă" : "scos din coadă";
			return `${label} (pasul ${stepIndex + 1}): nodul „${ev.node}" este ${action}.`;
		}
		case "update_distance": {
			const d = ev.distance === Infinity ? "∞" : ev.distance;
			return `${label} (pasul ${stepIndex + 1}): distanța minimă către nodul „${ev.node}" devine ${d}.`;
		}
		case "mark_found": {
			return ev.found
				? `Elementul a fost găsit pe poziția ${ev.index}.`
				: `Elementul nu a fost găsit în tablou.`;
		}
		case "dp_cell": {
			return `${label} (pasul ${stepIndex + 1}): dp[${ev.row}][${ev.col}] = ${ev.value}.`;
		}
		case "done": {
			if (ev.result) {
				const keys = Object.keys(ev.result);
				if (keys.length > 0) {
					const summary = keys.map((k) => `${k}: ${JSON.stringify(ev.result[k])}`).join(", ");
					return `Algoritmul s-a finalizat. Rezultat: ${summary}`;
				}
			}
			return "Algoritmul s-a finalizat cu succes.";
		}
		default:
			return `${label} (pasul ${stepIndex + 1}).`;
	}
}

export async function POST(request: NextRequest) {
	try {
		const body: ExplainRequest = await request.json();
		const { slug, stepIndex, event } = body;

		if (!slug || !event) {
			return NextResponse.json(
				{ error: "Lipsesc câmpuri obligatorii" },
				{ status: 400 }
			);
		}

		const answer = buildExplanation(event, stepIndex);
		return NextResponse.json({ answer });
	} catch (error) {
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : "Eroare necunoscută" },
			{ status: 500 }
		);
	}
}
