import { AlgorithmResult, TraceEvent } from "../types";

export function gcdInstrumented(input: { a: number; b: number }): AlgorithmResult {
  let a = Math.abs(Math.floor(input.a ?? 48));
  let b = Math.abs(Math.floor(input.b ?? 18));
  const trace: TraceEvent[] = [];

  trace.push({
    type: "set", index: 0, value: a, array: [],
    note: `Calculăm CMMDC(${a}, ${b}) prin algoritmul lui Euclid.`,
    vars: { a, b },
  });

  while (b !== 0) {
    const r = a % b;
    trace.push({
      type: "set", index: 0, value: a, array: [],
      note: `${a} % ${b} = ${r} → noul a=${b}, noul b=${r}`,
      vars: { a, b, rest: r },
    });
    a = b;
    b = r;
  }

  trace.push({
    type: "done", array: [],
    note: `CMMDC = ${a}`,
    vars: { cmmdc: a },
  });

  return { trace, result: { gcd: a } };
}
