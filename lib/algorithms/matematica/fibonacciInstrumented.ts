import { AlgorithmResult, TraceEvent } from "../types";

export function fibonacciInstrumented(input: { n: number }): AlgorithmResult {
  const n = Math.max(0, Math.min(input.n ?? 10, 30));
  const trace: TraceEvent[] = [];

  if (n === 0) {
    trace.push({ type: "done", note: "F(0) = 0 prin definiție.", vars: { result: 0 } });
    return { trace, result: { value: 0, sequence: [0] } };
  }

  const fib = [0, 1];
  trace.push({ type: "set", index: 0, value: 0, array: [0], note: "Inițializăm: F(0) = 0", vars: { F0: 0 } });
  if (n >= 1) {
    trace.push({ type: "set", index: 1, value: 1, array: [0, 1], note: "Inițializăm: F(1) = 1", vars: { F1: 1 } });
  }

  for (let i = 2; i <= n; i++) {
    const next = fib[i - 1] + fib[i - 2];
    fib.push(next);
    trace.push({
      type: "set",
      index: i,
      value: next,
      array: [...fib],
      note: `F(${i}) = F(${i - 1}) + F(${i - 2}) = ${fib[i - 1]} + ${fib[i - 2]} = ${next}`,
      vars: { i, "F(i-1)": fib[i - 1], "F(i-2)": fib[i - 2], "F(i)": next },
    });
  }

  trace.push({ type: "done", array: [...fib], note: `Rezultat: F(${n}) = ${fib[n]}`, vars: { result: fib[n] } });
  return { trace, result: { value: fib[n], sequence: fib } };
}
