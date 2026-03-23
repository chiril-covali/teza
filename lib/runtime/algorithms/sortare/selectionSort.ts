import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

export function selectionSort(input: { array: number[] }): AlgorithmResult {
  const arr = [...input.array];
  const trace: TraceEvent[] = [];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    trace.push({
      type: "compare",
      indices: [i, i],
      values: [arr[i], arr[i]],
      array: [...arr],
      note: `Căutăm cel mai mic element din restul tabloului pentru a-l pune pe poziția ${i}.`,
      vars: { i, minIdx },
    });

    for (let j = i + 1; j < n; j++) {
      trace.push({
        type: "compare",
        indices: [minIdx, j],
        values: [arr[minIdx], arr[j]],
        array: [...arr],
        note: `Comparăm elementul curent ${arr[j]} cu minimul găsit până acum (${arr[minIdx]}).`,
        vars: { j, i },
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      trace.push({
        type: "swap",
        indices: [i, minIdx],
        array: [...arr],
        note: `Interschimbăm ${arr[minIdx]} cu ${arr[i]} pentru a plasa minimul la locul său corect.`,
        vars: { i, minIdx },
      });
    }
  }

  trace.push({
    type: "done",
    result: { sorted: arr },
    array: [...arr],
    note: "Algoritmul de sortare prin selecție s-a finalizat.",
    vars: { n },
  });
  return { trace, result: { sorted: arr } };
}
