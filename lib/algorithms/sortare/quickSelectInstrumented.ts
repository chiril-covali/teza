import { AlgorithmResult, TraceEvent } from "../types";

export function quickSelectInstrumented(input: { array: number[]; k: number }): AlgorithmResult {
  const arr = [...input.array];
  const trace: TraceEvent[] = [];
  const n = arr.length;
  const k = input.k; // 1-based: find k-th smallest

  if (k < 1 || k > n) {
    trace.push({
      type: "done",
      result: { kthSmallest: null },
      array: [...arr],
      note: `k=${k} este în afara intervalului valid [1, ${n}].`,
      vars: { k, n },
    });
    return { trace, result: { kthSmallest: null } };
  }

  trace.push({
    type: "compare",
    array: [...arr],
    note: `Caut al ${k}-lea cel mai mic element din array-ul cu ${n} elemente.`,
    vars: { k, n },
  });

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    trace.push({
      type: "compare",
      indices: [high, high],
      values: [pivot, pivot],
      array: [...arr],
      note: `Aleg pivotul arr[${high}]=${pivot} pentru partiționarea subarray-ului [${low}..${high}]`,
      vars: { low, high, pivot },
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      trace.push({
        type: "compare",
        indices: [j, high],
        values: [arr[j], pivot],
        array: [...arr],
        note: `Compar arr[${j}]=${arr[j]} cu pivotul ${pivot}: ${arr[j] <= pivot ? `${arr[j]} ≤ ${pivot}, mut în partea stângă` : `${arr[j]} > ${pivot}, rămâne în dreapta`}`,
        vars: { i, j, low, high, pivot },
      });

      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          const vi = arr[i];
          const vj = arr[j];
          [arr[i], arr[j]] = [arr[j], arr[i]];
          trace.push({
            type: "swap",
            indices: [i, j],
            array: [...arr],
            note: `Interschimb arr[${i}]=${vi} cu arr[${j}]=${vj} pentru a plasa ${vj} în zona elementelor mici`,
            vars: { i, j, low, high, pivot },
          });
        }
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    trace.push({
      type: "swap",
      indices: [i + 1, high],
      array: [...arr],
      note: `Plasez pivotul ${arr[i + 1]} pe poziția sa finală ${i + 1}. Elementele din [${low}..${i}] ≤ ${arr[i + 1]} ≤ elementele din [${i + 2}..${high}]`,
      vars: { pivotIndex: i + 1, pivot: arr[i + 1], low, high },
    });

    return i + 1;
  }

  function quickSelect(low: number, high: number, targetIndex: number): number {
    if (low === high) {
      trace.push({
        type: "compare",
        indices: [low, low],
        values: [arr[low], arr[low]],
        array: [...arr],
        note: `Subarray cu un singur element: arr[${low}]=${arr[low]} este al ${k}-lea cel mai mic element.`,
        vars: { low, high, targetIndex, found: arr[low] },
      });
      return arr[low];
    }

    const pivotIndex = partition(low, high);

    trace.push({
      type: "compare",
      indices: [pivotIndex, pivotIndex],
      values: [arr[pivotIndex], targetIndex],
      array: [...arr],
      note: `Pivotul ${arr[pivotIndex]} s-a așezat pe poziția ${pivotIndex}. Caut elementul de rang ${targetIndex}. ${
        pivotIndex === targetIndex
          ? `Am găsit! Pivotul este al ${k}-lea cel mai mic element.`
          : pivotIndex < targetIndex
          ? `Elementul dorit se află în dreapta (${pivotIndex + 1}..${high}).`
          : `Elementul dorit se află în stânga (${low}..${pivotIndex - 1}).`
      }`,
      vars: { pivotIndex, targetIndex, low, high, pivotValue: arr[pivotIndex] },
    });

    if (pivotIndex === targetIndex) {
      return arr[pivotIndex];
    } else if (pivotIndex < targetIndex) {
      return quickSelect(pivotIndex + 1, high, targetIndex);
    } else {
      return quickSelect(low, pivotIndex - 1, targetIndex);
    }
  }

  const targetIndex = k - 1; // convert to 0-based index
  const kthSmallest = quickSelect(0, n - 1, targetIndex);

  trace.push({
    type: "done",
    result: { kthSmallest },
    array: [...arr],
    note: `Al ${k}-lea cel mai mic element este ${kthSmallest}.`,
    vars: { k, kthSmallest, n },
  });

  return { trace, result: { kthSmallest } };
}
