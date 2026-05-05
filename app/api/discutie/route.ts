import { NextRequest, NextResponse } from "next/server";
import { githubModelsChatWithUsage } from "@/lib/github-models";
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

const usageByDay = new Map<string, number>();
const dailyTokenLimit = Number(process.env.AI_DAILY_TOKEN_LIMIT || 200000);

function getUtcDayKey(): string {
	return new Date().toISOString().slice(0, 10);
}

function updateDailyUsage(tokens: number): { date: string; todayUsed: number; todayRemaining: number } {
	const date = getUtcDayKey();
	const current = usageByDay.get(date) || 0;
	const next = current + Math.max(0, tokens);
	usageByDay.set(date, next);
	return {
		date,
		todayUsed: next,
		todayRemaining: Math.max(0, dailyTokenLimit - next),
	};
}

function getCurrentDailyUsage(): { date: string; todayUsed: number; todayRemaining: number } {
	const date = getUtcDayKey();
	const todayUsed = usageByDay.get(date) || 0;
	return {
		date,
		todayUsed,
		todayRemaining: Math.max(0, dailyTokenLimit - todayUsed),
	};
}

function truncateText(value: string, maxLength = 420): string {
	if (!value) return "";
	if (value.length <= maxLength) return value;
	return `${value.slice(0, maxLength)}...`;
}

function summarizeValue(value: unknown): unknown {
	if (Array.isArray(value)) {
		if (value.length > 8) {
			return [...value.slice(0, 8), `...(+${value.length - 8})`];
		}
		return value;
	}

	if (value && typeof value === "object") {
		const entries = Object.entries(value as Record<string, unknown>);
		const compact = entries.slice(0, 8).reduce<Record<string, unknown>>((acc, [k, v]) => {
			acc[k] = summarizeValue(v);
			return acc;
		}, {});

		if (entries.length > 8) {
			compact._truncated = `+${entries.length - 8} câmpuri`;
		}

		return compact;
	}

	if (typeof value === "string") {
		return truncateText(value, 220);
	}

	return value;
}

function summarizeEvent(event?: TraceEvent): Record<string, unknown> | null {
	if (!event) return null;
	const anyEvent = event as any;
	const vars = (event.vars ?? {}) as Record<string, unknown>;
	const selectedVars = Object.entries(vars).slice(0, 8).reduce<Record<string, unknown>>((acc, [key, value]) => {
		acc[key] = summarizeValue(value);
		return acc;
	}, {});

	return {
		type: event.type,
		note: truncateText(event.note ?? "", 180),
		arrayPreview: Array.isArray(anyEvent.array)
			? summarizeValue(anyEvent.array)
			: undefined,
		vars: selectedVars,
		result: summarizeValue(anyEvent.result),
	};
}

function detectQuestionMode(question: string): "direct" | "beginner" | "default" {
	const q = question.toLowerCase();
	if (/ca\s+la\s+(incepator|începător|ceainic|chainik)/i.test(q)) {
		return "beginner";
	}
	if (/\b(ce\s+face|la\s+ce\s+ajut|cum\s+functioneaza|cum\s+funcționează|de\s+ce|cum\s+pot\s+face\s+bani)\b/i.test(q)) {
		return "direct";
	}
	return "default";
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

		const safeQuestion = truncateText(question.trim(), 800);
		const summarizedInput = context?.input ? summarizeValue(context.input) : null;
		const summarizedEvent = summarizeEvent(context?.currentEvent);
		const mode = detectQuestionMode(safeQuestion);

		const systemPrompt = [
			"Ești un asistent didactic de algoritmi care răspunde în limba română.",
			"Răspunsul trebuie să fie clar, prietenos, concret și util pentru înțelegere practică.",
			"Folosește Markdown curat: **bold** pentru idei-cheie, *italic* pentru nuanțe.",
			"Păstrează paragrafe separate prin rânduri goale.",
			"Nu umple răspunsul cu introduceri lungi sau formulări generale.",
			"Structură recomandată: context scurt, explicație, exemplu mic, concluzie.",
			"Nu repeta inutil datele de intrare; menționează doar ce ajută răspunsul.",
			"Dacă întrebarea e ambiguă, oferă cea mai probabilă interpretare și spune pe scurt presupunerea.",
			mode === "direct"
				? "Mod direct: răspunde în maximum 4 puncte scurte și cel mult 120 de cuvinte, cu propoziții concrete."
				: "",
			mode === "beginner"
				? "Mod începător: explică foarte simplu, cu o analogie ușoară și un exemplu numeric mic."
				: "",
			/\bcum\s+pot\s+face\s+bani\b/i.test(safeQuestion)
				? "Dacă utilizatorul întreabă despre bani, oferă 3 opțiuni realiste, pași practici și evită promisiuni nerealiste."
				: "",
		].join("\n");

		const userPrompt = [
			`Algoritm curent: ${slug}`,
			`Întrebarea utilizatorului: ${safeQuestion}`,
			context?.currentStepIndex !== undefined ? `Pas curent în simulare: ${context.currentStepIndex}` : "",
			summarizedInput ? `Input curent (compact): ${JSON.stringify(summarizedInput)}` : "",
			summarizedEvent ? `Eveniment curent (compact): ${JSON.stringify(summarizedEvent)}` : "",
		].filter(Boolean).join("\n");

		const messages = [
			{ role: "system", content: systemPrompt },
			{ role: "user", content: userPrompt },
		];

		try {
			let result;
			try {
				result = await githubModelsChatWithUsage(messages, undefined, undefined, undefined, {
					temperature: 0.15,
					maxTokens: 550,
				});
			} catch (primaryError) {
				console.error("GitHub Models primary chat failed, retrying with compact prompt:", primaryError);
				const fallbackMessages = [
					{
						role: "system",
						content:
							"Ești un asistent didactic de algoritmi. Răspunde în română, clar și scurt, cu un exemplu simplu.",
					},
					{
						role: "user",
						content: `Algoritm curent: ${slug}\nÎntrebarea utilizatorului: ${safeQuestion}`,
					},
				];

				result = await githubModelsChatWithUsage(
					fallbackMessages,
					undefined,
					undefined,
					undefined,
					{ maxTokens: 280 }
				);
			}

			if (!result.content || !result.content.trim()) {
				const emptyRetry = await githubModelsChatWithUsage(
					[
						{
							role: "system",
							content:
								"Ești un asistent didactic. Răspunde în română în 2-4 propoziții clare, fără introduceri inutile.",
						},
						{
							role: "user",
							content: `Algoritm curent: ${slug}\nÎntrebarea utilizatorului: ${safeQuestion}`,
						},
					],
					undefined,
					undefined,
					undefined,
					{ maxTokens: 700 }
				);
				result = {
					content: emptyRetry.content || "Îți pot explica algoritmul pas cu pas dacă îmi dai un exemplu de input.",
					usage: emptyRetry.usage,
				};
			}

			const lastRequestTotalTokens = result.usage?.totalTokens || 0;
			const tokenQuota = updateDailyUsage(lastRequestTotalTokens);
			return NextResponse.json({
				answer: result.content,
				tokenQuota: {
					dailyLimit: dailyTokenLimit,
					date: tokenQuota.date,
					todayUsed: tokenQuota.todayUsed,
					todayRemaining: tokenQuota.todayRemaining,
					lastRequestTotalTokens,
				},
			});
		} catch (error) {
			console.error("GitHub Models error:", error);
			const tokenQuota = getCurrentDailyUsage();
			const errorText = error instanceof Error ? error.message : String(error);
			const isRateLimit = /\b429\b|too many requests|rate\s*limit/i.test(errorText);
			return NextResponse.json(
				{
					answer: isRateLimit
						? "Serviciul AI este temporar limitat (prea multe cereri). Încearcă din nou în câteva minute."
						: "Nu am putut accesa AI-ul în acest moment. Încearcă din nou mai târziu.",
					tokenQuota: {
						dailyLimit: dailyTokenLimit,
						date: tokenQuota.date,
						todayUsed: tokenQuota.todayUsed,
						todayRemaining: tokenQuota.todayRemaining,
						lastRequestTotalTokens: 0,
					},
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
