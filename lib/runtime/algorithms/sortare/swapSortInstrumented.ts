import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

export function swapSortInstrumented(input: { array: number[] }): AlgorithmResult {
  const arr = Array.isArray(input?.array) ? [...input.array] : [];
  const trace: TraceEvent[] = [];
  const n = arr.length;

  if (n === 0) {
    return {
      trace: [
        {
          type: "done",
          array: [],
          note: "Array-ul este gol; nu există pași de sortare.",
          vars: { n: 0 },
        },
      ],
      result: { sorted: [] },
    };
  }

  for (let i = 0; i < n - 1; i += 1) {
    for (let j = i + 1; j < n; j += 1) {
      trace.push({
        type: "compare",
        indices: [i, j],
        values: [arr[i], arr[j]],
        array: [...arr],
        note: `Compar arr[${i}] = ${arr[i]} cu arr[${j}] = ${arr[j]}`,
        vars: { i, j, left: arr[i], right: arr[j], n },
      });

      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        trace.push({
          type: "swap",
          indices: [i, j],
          array: [...arr],
          note: `Swap: ${arr[j]} > ${arr[i]} înainte de schimb; interschimb pozițiile ${i} și ${j}.`,
          vars: { i, j, n },
        });
      }
    }
  }

  trace.push({
    type: "done",
    array: [...arr],
    result: { sorted: arr },
    note: "Sortarea prin interschimbare s-a finalizat.",
    vars: { n },
  });

  return { trace, result: { sorted: arr } };
}
