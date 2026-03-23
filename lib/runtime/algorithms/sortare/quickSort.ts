import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

export function quickSort(input: { array: number[] }): AlgorithmResult {
  const arr = [...input.array];
  const trace: TraceEvent[] = [];

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    let i = low;

    for (let j = low; j < high; j++) {
      trace.push({
        type: "compare",
        indices: [j, high],
        values: [arr[j], pivot],
        array: [...arr],
        note: `Comparăm elementul ${arr[j]} de pe poziția ${j} cu pivotul ${pivot}.`,
        vars: { low, high, pivot, i, j },
      });

      if (arr[j] <= pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        trace.push({
          type: "swap",
          indices: [i, j],
          array: [...arr],
          note: `Interschimbăm ${arr[i]} cu ${arr[j]} pentru a muta elementul mai mic înaintea pivotului.`,
          vars: { i, j, pivot },
        });
        i++;
      }
    }

    [arr[i], arr[high]] = [arr[high], arr[i]];
    trace.push({
      type: "swap",
      indices: [i, high],
      array: [...arr],
      note: `Plasăm pivotul (${pivot}) la poziția sa finală (${i}).`,
      vars: { pivot_index: i, pivot },
    });

    return i;
  }

  function quickSortHelper(low: number, high: number): void {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  }

  if (arr.length > 1) {
    quickSortHelper(0, arr.length - 1);
  }

  trace.push({
    type: "done",
    result: { sorted: arr },
    array: [...arr],
    note: "Algoritmul QuickSort s-a finalizat.",
    vars: { n: arr.length },
  });
  return { trace, result: { sorted: arr } };
}
