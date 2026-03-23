import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

export function insertionSort(input: { array: number[] }): AlgorithmResult {
  const arr = [...input.array];
  const trace: TraceEvent[] = [];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    trace.push({
      type: "compare",
      indices: [i, i],
      values: [key, key],
      array: [...arr],
      note: `Selectez elementul ${key} de pe poziția ${i} pentru a-l insera în partea sortată.`,
      vars: { i, key },
    });

    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      trace.push({
        type: "compare",
        indices: [j, j + 1],
        values: [arr[j], key],
        array: [...arr],
        note: `Deoarece ${arr[j]} > ${key}, mutăm ${arr[j]} la dreapta.`,
        vars: { j, i },
      });

      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;
    trace.push({
      type: "set",
      index: j + 1,
      value: key,
      array: [...arr],
      note: `Am găsit poziția corectă. Inserăm ${key} la indexul ${j + 1}.`,
      vars: { i, key },
    });
  }

  trace.push({
    type: "done",
    result: { sorted: arr },
    array: [...arr],
    note: "Algoritmul de sortare prin inserție s-a finalizat.",
    vars: { n },
  });
  return { trace, result: { sorted: arr } };
}
