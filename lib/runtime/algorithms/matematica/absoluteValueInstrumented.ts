import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

export function absoluteValueInstrumented(input: { n: number }): AlgorithmResult {
  const n = input.n ?? -7;
  const trace: TraceEvent[] = [];
  trace.push({
    type: "set", index: 0, value: n, array: [],
    note: `Verificăm dacă ${n} < 0`,
    vars: { n, conditie: n < 0 ? "n < 0 → negăm" : "n ≥ 0 → rămâne" },
  });
  const result = n < 0 ? -n : n;
  trace.push({
    type: "done", array: [],
    note: `|${n}| = ${result}`,
    vars: { n, rezultat: result },
  });
  return { trace, result: { absoluteValue: result } };
}
