import { AlgorithmMeta, RunResponse } from "./algorithm-meta";
import { TraceEvent } from "./trace";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  listAlgorithms: () => request<AlgorithmMeta[]>("/api/algorithms"),
  run: (slug: string, input: Record<string, unknown>) =>
    request<RunResponse>("/api/run", {
      method: "POST",
      body: JSON.stringify({ slug, input }),
    }),
  explainStep: (slug: string, stepIndex: number, event: TraceEvent, context: Record<string, unknown>) =>
    request<{ answer: string }>("/api/explain_step", {
      method: "POST",
      body: JSON.stringify({ slug, stepIndex, event, context, input: context.input || {} }),
    }),
  chat: (
    slug: string,
    question: string,
    context: { input: Record<string, unknown>; currentStepIndex?: number; currentEvent?: TraceEvent }
  ) =>
    request<{ answer: string }>("/api/chat", {
      method: "POST",
      body: JSON.stringify({ slug, question, context }),
    }),
  rateLimit: () => request<{ limit?: number; remaining?: number; reset?: number; resetISO?: string; note?: string; error?: string }>("/api/rate_limit"),
};
