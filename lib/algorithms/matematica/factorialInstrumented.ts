import { AlgorithmResult, TraceEvent } from "../types";

export function factorialInstrumented(input: { n: number }): AlgorithmResult {
  const n = Math.max(0, Math.min(input.n ?? 5, 15));
  const trace: TraceEvent[] = [];

  let result = 1;
  const steps: number[] = [1];
  trace.push({ type: "set", index: 0, value: 1, array: [1], note: "Inițializăm rezultatul la 1 (0! = 1)", vars: { pas: 0, result: 1 } });

  for (let i = 1; i <= n; i++) {
    result *= i;
    steps.push(result);
    trace.push({
      type: "set",
      index: i,
      value: result,
      array: [...steps],
      note: `${i}! = ${i - 1}! × ${i} = ${result / i} × ${i} = ${result}`,
      vars: { i, result },
    });
  }

  trace.push({ type: "done", array: [...steps], note: `${n}! = ${result}`, vars: { result } });
  return { trace, result: { value: result } };
}
