import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

export function bubbleSort(input: { array: number[] }): AlgorithmResult {
  const arr = [...input.array];
  const trace: TraceEvent[] = [];
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      trace.push({
        type: "compare",
        indices: [j, j + 1],
        values: [arr[j], arr[j + 1]],
        array: [...arr],
        note: `Compar elementele de pe pozițiile ${j} (${arr[j]}) și ${j + 1} (${arr[j+1]})`,
        vars: { i, j, n },
      });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        trace.push({
          type: "swap",
          indices: [j, j + 1],
          array: [...arr],
          note: `Interschimb ${arr[j+1]} cu ${arr[j]} deoarece ${arr[j+1]} > ${arr[j]}`,
          vars: { i, j, swapped },
        });
      }
    }
    if (!swapped) break;
  }

  trace.push({
    type: "done",
    result: { sorted: arr },
    array: [...arr],
    note: "Algoritmul de sortare prin metoda bulelor s-a finalizat.",
    vars: { n },
  });
  return { trace, result: { sorted: arr } };
}
