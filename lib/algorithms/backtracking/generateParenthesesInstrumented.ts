import { AlgorithmResult, TraceEvent } from "../types";

export function generateParenthesesInstrumented(input: { n: number }): AlgorithmResult {
  const n = Math.max(1, Math.min(Math.floor(input.n ?? 3), 5));
  const trace: TraceEvent[] = [];
  const results: string[] = [];

  trace.push({
    type: "set", index: 0, value: n, array: [],
    note: `Generăm toate combinațiile valide de ${n} perechi de paranteze.`,
    vars: { n, total: 0 },
  });

  function backtrack(current: string, open: number, close: number): void {
    if (current.length === 2 * n) {
      results.push(current);
      trace.push({
        type: "mark_found", index: results.length - 1, found: true,
        note: `Combinație validă: "${current}"`,
        vars: { combinatie: current, numar: results.length },
      });
      return;
    }
    if (open < n) {
      trace.push({
        type: "set", index: open, value: open, array: [],
        note: `Adăugăm '(' → "${current}(" (deschise: ${open + 1}, închise: ${close})`,
        vars: { sir_curent: current + "(", deschise: open + 1, inchise: close },
      });
      backtrack(current + "(", open + 1, close);
    }
    if (close < open) {
      trace.push({
        type: "set", index: close, value: close, array: [],
        note: `Adăugăm ')' → "${current})" (deschise: ${open}, închise: ${close + 1})`,
        vars: { sir_curent: current + ")", deschise: open, inchise: close + 1 },
      });
      backtrack(current + ")", open, close + 1);
    }
  }

  backtrack("", 0, 0);

  trace.push({
    type: "done", array: [],
    note: `Total ${results.length} combinații valide pentru n=${n}.`,
    vars: { total: results.length, exemple: results.slice(0, 3).join(", ") },
  });

  return { trace, result: { combinations: results } };
}
