import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

export function isSortedArrayInstrumented(input: { array: number[] }): AlgorithmResult {
  const arr = Array.isArray(input?.array) ? [...input.array] : [];
  const trace: TraceEvent[] = [];

  if (arr.length <= 1) {
    trace.push({
      type: "done",
      array: [...arr],
      note: "Array-ul are cel mult un element, deci este deja sortat.",
      vars: { sorted: true, n: arr.length },
    });
    return { trace, result: { sorted: true } };
  }

  for (let i = 0; i < arr.length - 1; i += 1) {
    trace.push({
      type: "compare",
      indices: [i, i + 1],
      values: [arr[i], arr[i + 1]],
      array: [...arr],
      note: `Compar arr[${i}] = ${arr[i]} cu arr[${i + 1}] = ${arr[i + 1]}`,
      vars: { i, left: arr[i], right: arr[i + 1] },
    });

    if (arr[i] >= arr[i + 1]) {
      trace.push({
        type: "done",
        array: [...arr],
        note: `Am găsit inversare la pozițiile ${i} și ${i + 1}; array-ul NU este sortat crescător.`,
        vars: { sorted: false, failIndex: i },
        result: { sorted: false },
      });
      return { trace, result: { sorted: false } };
    }
  }

  trace.push({
    type: "done",
    array: [...arr],
    note: "Toate perechile vecine respectă ordinea crescătoare. Array-ul este sortat.",
    vars: { sorted: true, n: arr.length },
    result: { sorted: true },
  });

  return { trace, result: { sorted: true } };
}
