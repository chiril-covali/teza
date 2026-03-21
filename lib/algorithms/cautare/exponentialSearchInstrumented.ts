import { AlgorithmResult, TraceEvent } from "../types";

export function exponentialSearchInstrumented(input: {
  array: number[];
  target: number;
}): AlgorithmResult {
  const arr = input.array;
  const target = input.target;
  const trace: TraceEvent[] = [];
  const n = arr.length;

  if (n === 0) {
    trace.push({
      type: "done",
      result: { found: false, index: -1 },
      array: [...arr],
      note: `Tabloul este gol. Căutarea nu poate fi efectuată.`,
      vars: { target },
    });
    return { trace, result: { found: false, index: -1 } };
  }

  // Check first element
  trace.push({
    type: "compare",
    indices: [0, 0],
    values: [arr[0], target],
    array: [...arr],
    note: `Verificăm primul element (${arr[0]}) cu valoarea căutată (${target}).`,
    vars: { current: 0, target },
  });

  if (arr[0] === target) {
    trace.push({
      type: "mark_found",
      index: 0,
      found: true,
      array: [...arr],
      note: `Elementul ${target} a fost găsit chiar pe prima poziție (0).`,
      vars: { current: 0, target },
    });
    trace.push({
      type: "done",
      result: { found: true, index: 0 },
      array: [...arr],
      note: `Căutare finalizată. Elementul ${target} se află pe poziția 0.`,
      vars: { target, foundIndex: 0 },
    });
    return { trace, result: { found: true, index: 0 } };
  }

  // Phase 1: Find the range by doubling i
  let i = 1;
  while (i < n && arr[i] <= target) {
    trace.push({
      type: "compare",
      indices: [i, i],
      values: [arr[i], target],
      array: [...arr],
      note: `Faza 1 – extindere interval: verificăm arr[${i}] = ${arr[i]} ≤ ${target}. Dublăm i de la ${i} la ${i * 2}.`,
      vars: { i, target },
    });
    i *= 2;
  }

  // After loop, i may be out of bounds or arr[i] > target
  trace.push({
    type: "compare",
    indices: [Math.min(i, n - 1), Math.min(i, n - 1)],
    values: [arr[Math.min(i, n - 1)], target],
    array: [...arr],
    note: `Faza 1 finalizată. Intervalul de căutare binară este [${Math.floor(i / 2)}, ${Math.min(i, n - 1)}].`,
    vars: { i, rangeStart: Math.floor(i / 2), rangeEnd: Math.min(i, n - 1), target },
  });

  // Phase 2: Binary search in [i/2, min(i, n-1)]
  let lo = Math.floor(i / 2);
  let hi = Math.min(i, n - 1);
  let foundIndex = -1;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    trace.push({
      type: "compare",
      indices: [mid, mid],
      values: [arr[mid], target],
      array: [...arr],
      note: `Faza 2 – căutare binară: comparăm arr[${mid}] = ${arr[mid]} cu ${target}. Interval curent: [${lo}, ${hi}].`,
      vars: { lo, hi, mid, target },
    });

    if (arr[mid] === target) {
      foundIndex = mid;
      trace.push({
        type: "mark_found",
        index: mid,
        found: true,
        array: [...arr],
        note: `Elementul ${target} a fost găsit pe poziția ${mid}.`,
        vars: { lo, hi, mid, target },
      });
      break;
    } else if (arr[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  if (foundIndex === -1) {
    trace.push({
      type: "mark_found",
      index: -1,
      found: false,
      array: [...arr],
      note: `Elementul ${target} nu a fost găsit în intervalul de căutare.`,
      vars: { target },
    });
  }

  trace.push({
    type: "done",
    result: { found: foundIndex !== -1, index: foundIndex },
    array: [...arr],
    note:
      foundIndex !== -1
        ? `Căutare exponențială finalizată. Elementul ${target} se află pe poziția ${foundIndex}.`
        : `Căutare exponențială finalizată. Elementul ${target} nu există în tablou.`,
    vars: { target, foundIndex },
  });

  return {
    trace,
    result: { found: foundIndex !== -1, index: foundIndex },
  };
}

export default exponentialSearchInstrumented;
