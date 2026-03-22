import { AlgorithmResult, TraceEvent } from "../types";

export function allCombinationsInstrumented(input: { n: number; k: number }): AlgorithmResult {
  const n = Math.max(1, Math.min(Math.floor(input.n ?? 5), 8));
  const k = Math.max(1, Math.min(Math.floor(input.k ?? 2), n));
  const trace: TraceEvent[] = [];
  const results: number[][] = [];

  trace.push({
    type: "set", index: 0, value: n, array: [],
    note: `Generăm toate combinațiile de ${k} elemente din mulțimea {1, ..., ${n}}.`,
    vars: { n, k },
  });

  function backtrack(start: number, current: number[]): void {
    if (current.length === k) {
      results.push([...current]);
      trace.push({
        type: "mark_found", index: results.length - 1, found: true,
        note: `Combinație găsită: [${current.join(", ")}]`,
        vars: { combinatie: `[${current.join(", ")}]`, nr: results.length },
      });
      return;
    }
    for (let i = start; i <= n; i++) {
      current.push(i);
      trace.push({
        type: "set", index: current.length - 1, value: i, array: [...current],
        note: `Adăugăm ${i} la combinația curentă: [${current.join(", ")}]`,
        vars: { element: i, curent: `[${current.join(", ")}]`, pozitie: current.length },
      });
      backtrack(i + 1, current);
      current.pop();
    }
  }

  backtrack(1, []);

  trace.push({
    type: "done", array: [],
    note: `Total ${results.length} combinații de ${k} din ${n}.`,
    vars: { total: results.length, exemplu: results[0] ? `[${results[0].join(", ")}]` : "-" },
  });

  return { trace, result: { combinations: results } };
}
