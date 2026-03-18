import { AlgorithmResult, TraceEvent } from "../types";

export function mergeSort(input: { array: number[] }): AlgorithmResult {
  const arr = [...input.array];
  const trace: TraceEvent[] = [];

  function merge(low: number, mid: number, high: number) {
    const left = arr.slice(low, mid + 1);
    const right = arr.slice(mid + 1, high + 1);
    let i = 0, j = 0, k = low;

    while (i < left.length && j < right.length) {
      trace.push({
        type: "compare",
        indices: [low + i, mid + 1 + j],
        values: [left[i], right[j]],
        array: [...arr],
        note: `Comparăm elementele ${left[i]} și ${right[j]} din cele două sub-liste.`,
        vars: { low, mid, high, i, j }
      });

      if (left[i] <= right[j]) {
        arr[k] = left[i];
        trace.push({
          type: "set",
          index: k,
          value: left[i],
          array: [...arr],
          note: `Elementul ${left[i]} este mai mic sau egal, îl punem înapoi în listă la poziția ${k}.`,
          vars: { k, value: left[i] }
        });
        i++;
      } else {
        arr[k] = right[j];
        trace.push({
          type: "set",
          index: k,
          value: right[j],
          array: [...arr],
          note: `Elementul ${right[j]} este mai mic, îl punem înapoi în listă la poziția ${k}.`,
          vars: { k, value: right[j] }
        });
        j++;
      }
      k++;
    }

    while (i < left.length) {
      arr[k] = left[i];
      trace.push({
        type: "set",
        index: k,
        value: left[i],
        array: [...arr],
        note: `Adăugăm elementul rămas ${left[i]} din sub-lista stângă.`,
        vars: { k }
      });
      i++;
      k++;
    }

    while (j < right.length) {
      arr[k] = right[j];
      trace.push({
        type: "set",
        index: k,
        value: right[j],
        array: [...arr],
        note: `Adăugăm elementul rămas ${right[j]} din sub-lista dreaptă.`,
        vars: { k }
      });
      j++;
      k++;
    }
  }

  function sort(low: number, high: number) {
    if (low < high) {
      const mid = Math.floor((low + high) / 2);
      sort(low, mid);
      sort(mid + 1, high);
      merge(low, mid, high);
    }
  }

  sort(0, arr.length - 1);

  trace.push({
    type: "done",
    result: { sorted: arr },
    array: [...arr],
    note: "Algoritmul Merge Sort s-a finalizat.",
    vars: { n: arr.length }
  });

  return { trace, result: { sorted: arr } };
}
