import { AlgorithmResult, TraceEvent } from "../types";

export function heapSortInstrumented(input: { array: number[] }): AlgorithmResult {
  const arr = [...input.array];
  const trace: TraceEvent[] = [];
  const n = arr.length;

  function heapify(size: number, root: number) {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size) {
      trace.push({
        type: "compare",
        indices: [largest, left],
        values: [arr[largest], arr[left]],
        array: [...arr],
        note: `Heapify: compar nodul rădăcină [${largest}]=${arr[largest]} cu fiul stâng [${left}]=${arr[left]} (heap size=${size})`,
        vars: { root, largest, left, right, heapSize: size },
      });
      if (arr[left] > arr[largest]) largest = left;
    }

    if (right < size) {
      trace.push({
        type: "compare",
        indices: [largest, right],
        values: [arr[largest], arr[right]],
        array: [...arr],
        note: `Heapify: compar cel mai mare până acum [${largest}]=${arr[largest]} cu fiul drept [${right}]=${arr[right]} (heap size=${size})`,
        vars: { root, largest, left, right, heapSize: size },
      });
      if (arr[right] > arr[largest]) largest = right;
    }

    if (largest !== root) {
      const rootVal = arr[root];
      const largestVal = arr[largest];
      [arr[root], arr[largest]] = [arr[largest], arr[root]];
      trace.push({
        type: "swap",
        indices: [root, largest],
        array: [...arr],
        note: `Heapify: interschimb nodul [${root}]=${rootVal} cu cel mai mare fiu [${largest}]=${largestVal}, continui heapify de la [${largest}]`,
        vars: { root, largest, heapSize: size },
      });
      heapify(size, largest);
    }
  }

  // Build max-heap
  trace.push({
    type: "compare",
    array: [...arr],
    note: `Construiesc max-heap pornind de la ultimul nod non-frunză: poziția ${Math.floor(n / 2) - 1}`,
    vars: { n, startNode: Math.floor(n / 2) - 1 },
  });

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  trace.push({
    type: "compare",
    array: [...arr],
    note: `Max-heap-ul a fost construit. Elementul maxim ${arr[0]} se află în rădăcină (poziția 0). Încep extragerea elementelor.`,
    vars: { maxElement: arr[0] },
  });

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    trace.push({
      type: "swap",
      indices: [0, i],
      array: [...arr],
      note: `Extrag maximul ${arr[i]} din rădăcină și îl plasez pe poziția finală ${i}. Refac heap-ul pentru primele ${i} elemente.`,
      vars: { extractedValue: arr[i], heapSize: i },
    });
    heapify(i, 0);
  }

  trace.push({
    type: "done",
    result: { sorted: arr },
    array: [...arr],
    note: "Sortarea prin heap s-a finalizat. Array-ul este acum sortat.",
    vars: { n },
  });

  return { trace, result: { sorted: arr } };
}
