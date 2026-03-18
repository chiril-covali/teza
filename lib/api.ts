import { AlgorithmMeta, TraceEvent } from "@/lib/algorithms";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";

async function request<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }

  return res.json();
}

export const api = {
  listAlgorithms: () => request<AlgorithmMeta[]>("/algoritmi"),

  run: (slug: string, input: Record<string, unknown>) =>
    request<{ trace: TraceEvent[]; result: Record<string, any> }>("/ruleaza", {
      method: "POST",
      body: JSON.stringify({ slug, input }),
    }),

  explain: (
    slug: string,
    stepIndex: number,
    event: TraceEvent,
    context: Record<string, unknown>
  ) =>
    request<{ answer: string }>("/explica", {
      method: "POST",
      body: JSON.stringify({ slug, stepIndex, event, context }),
    }),

  chat: (
    slug: string,
    question: string,
    context?: {
      input?: Record<string, unknown>;
      currentStepIndex?: number;
      currentEvent?: TraceEvent;
    }
  ) =>
    request<{ answer: string }>("/discutie", {
      method: "POST",
      body: JSON.stringify({ slug, question, context }),
    }),
};
