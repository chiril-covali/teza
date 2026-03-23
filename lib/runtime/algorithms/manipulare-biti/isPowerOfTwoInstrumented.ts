import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

export function isPowerOfTwoInstrumented(input: { n: number }): AlgorithmResult {
  const n = Math.floor(input.n ?? 8);
  const trace: TraceEvent[] = [];

  trace.push({
    type: "set", index: 0, value: n, array: [],
    note: `Verificăm dacă ${n} (${n > 0 ? n.toString(2) : "—"}) este putere a lui 2.`,
    vars: { n, binary: n > 0 ? n.toString(2) : "negativ" },
  });

  if (n <= 0) {
    trace.push({
      type: "done", array: [],
      note: `${n} ≤ 0 → Nu este putere a lui 2.`,
      vars: { n, result: false },
    });
    return { trace, result: { isPowerOfTwo: false } };
  }

  const nMinus1 = n - 1;
  const andResult = n & nMinus1;
  trace.push({
    type: "set", index: 0, value: n, array: [],
    note: `n & (n-1) = ${n.toString(2)} & ${nMinus1.toString(2)} = ${andResult.toString(2)} (=${andResult})`,
    vars: { n, "n-1": nMinus1, "n&(n-1)": andResult, result: andResult === 0 },
  });

  const isPow2 = andResult === 0;
  trace.push({
    type: "done", array: [],
    note: isPow2
      ? `${n} ESTE putere a lui 2 (${n.toString(2)} are exact un singur bit setat).`
      : `${n} NU este putere a lui 2 (${n.toString(2)} are mai mulți biți setați).`,
    vars: { n, result: isPow2 },
  });

  return { trace, result: { isPowerOfTwo: isPow2 } };
}
