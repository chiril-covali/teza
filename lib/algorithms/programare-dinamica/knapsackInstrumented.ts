import { AlgorithmResult, TraceEvent } from "../types";

export function knapsackInstrumented(input: {
  capacity: number;
  weights: number[];
  values: number[];
}): AlgorithmResult {
  const { capacity, weights, values } = input;
  const trace: TraceEvent[] = [];
  const n = weights.length;

  if (n === 0 || capacity === 0) {
    trace.push({ type: "done", result: { maxValue: 0 }, note: "Niciun obiect sau capacitate zero." });
    return { trace, result: { maxValue: 0 } };
  }

  // dp[i][w] = max value using first i items with capacity w
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    Array(capacity + 1).fill(0)
  );

  trace.push({
    type: "dp_cell",
    row: 0,
    col: 0,
    value: 0,
    table: dp.map((row) => [...row]),
    note: `Inițializez tabelul DP (${n + 1} × ${capacity + 1}). Rând = obiect, coloană = capacitate.`,
    vars: { weights: weights, values: values, capacity: capacity },
  });

  for (let i = 1; i <= n; i++) {
    const w = weights[i - 1];
    const v = values[i - 1];

    for (let c = 0; c <= capacity; c++) {
      // Option 1: exclude item i
      dp[i][c] = dp[i - 1][c];

      // Option 2: include item i (if it fits)
      if (w <= c) {
        const withItem = dp[i - 1][c - w] + v;
        if (withItem > dp[i][c]) {
          dp[i][c] = withItem;
        }
      }

      trace.push({
        type: "dp_cell",
        row: i,
        col: c,
        value: dp[i][c],
        table: dp.map((row) => [...row]),
        note:
          w > c
            ? `Obiect ${i} (greutate ${w}) nu încape în capacitatea ${c} → dp[${i}][${c}] = ${dp[i][c]}`
            : `dp[${i}][${c}] = max(fără obiect ${i}: ${dp[i - 1][c]}, cu obiect ${i}: ${dp[i - 1][c - w] + v}) = ${dp[i][c]}`,
        vars: { obiect: i, greutate: w, valoare: v, capacitateDisponibila: c },
      });
    }
  }

  const maxValue = dp[n][capacity];

  trace.push({
    type: "done",
    result: { maxValue },
    note: `Valoarea maximă obținută: ${maxValue}`,
    vars: { maxValue },
  });

  return { trace, result: { maxValue } };
}
