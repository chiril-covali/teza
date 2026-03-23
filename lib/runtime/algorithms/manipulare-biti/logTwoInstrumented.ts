import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

export function logTwoInstrumented(input: { n: number }): AlgorithmResult {
  let n = Math.max(1, Math.floor(input.n ?? 16));
  const original = n;
  const trace: TraceEvent[] = [];

  trace.push({
    type: "set", index: 0, value: n, array: [],
    note: `Calculăm log₂(${original}) prin deplasări pe biți.`,
    vars: { n, result: 0, binary: n.toString(2) },
  });

  let result = 0;
  while (n >> 1) {
    n >>= 1;
    result++;
    trace.push({
      type: "set", index: result, value: result, array: [],
      note: `Deplasăm la dreapta: n = ${n} (${n.toString(2)}), result = ${result}`,
      vars: { n, result, binary: n.toString(2) },
    });
  }

  trace.push({
    type: "done", array: [],
    note: `log₂(${original}) ≈ ${result}`,
    vars: { input: original, result },
  });

  return { trace, result: { log2: result } };
}
