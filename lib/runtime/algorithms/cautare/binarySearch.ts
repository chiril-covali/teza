import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

export function binarySearch(input: {
  array: number[];
  target: number;
}): AlgorithmResult {
  const arr = input.array;
  const target = input.target;
  const trace: TraceEvent[] = [];

  let lo = 0,
    hi = arr.length - 1;
  let foundIndex = -1;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    trace.push({
      type: "compare",
      indices: [mid, mid],
      values: [arr[mid], target],
      array: [...arr],
      note: `Comparăm elementul de pe poziția de mijloc (${mid}), care este ${arr[mid]}, cu valoarea căutată (${target}).`,
      vars: { lo, hi, mid, target },
    });

    if (arr[mid] === target) {
      foundIndex = mid;
      trace.push({
        type: "done",
        result: { found: true, index: mid },
        array: [...arr],
        note: `Elementul ${target} a fost găsit pe poziția ${mid}.`,
        vars: { lo, hi, mid, target },
      });
      break;
    }

    if (arr[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  if (foundIndex === -1) {
    trace.push({
      type: "done",
      result: { found: false, index: -1 },
      array: [...arr],
      note: `Elementul ${target} nu a fost găsit în tablou.`,
      vars: { target },
    });
  }

  return {
    trace,
    result: { found: foundIndex !== -1, index: foundIndex },
  };
}
