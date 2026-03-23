import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

export function primeFactorizationInstrumented(input: { n: number }): AlgorithmResult {
  let n = Math.max(2, Math.abs(Math.floor(input.n ?? 84)));
  const original = n;
  const trace: TraceEvent[] = [];
  const factors: number[] = [];

  trace.push({
    type: "set", index: 0, value: n, array: [],
    note: `Descompunem ${n} în factori primi.`,
    vars: { n },
  });

  for (let i = 2; i * i <= n; i++) {
    while (n % i === 0) {
      factors.push(i);
      trace.push({
        type: "set", index: factors.length - 1, value: i, array: [...factors],
        note: `${n} este divizibil cu ${i} → factor ${i}, rămâne ${n / i}`,
        vars: { divizor: i, n_curent: n, n_nou: n / i, factori: factors.join(" × ") },
      });
      n = Math.floor(n / i);
    }
  }

  if (n > 1) {
    factors.push(n);
    trace.push({
      type: "set", index: factors.length - 1, value: n, array: [...factors],
      note: `${n} este prim → factor ${n}`,
      vars: { factor_prim: n, factori: factors.join(" × ") },
    });
  }

  trace.push({
    type: "done", array: [...factors],
    note: `${original} = ${factors.join(" × ")}`,
    vars: { n: original, factori: factors.join(" × ") },
  });

  return { trace, result: { factors } };
}
