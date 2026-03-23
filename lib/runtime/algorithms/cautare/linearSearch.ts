import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

export function linearSearchInstrumented(input: {
  array: number[];
  target: number;
}): AlgorithmResult {
  const arr = input.array;
  const target = input.target;
  const trace: TraceEvent[] = [];

  let foundIndex = -1;

  for (let i = 0; i < arr.length; i++) {
    trace.push({
      type: "compare",
      indices: [i, i],
      values: [arr[i], target],
      array: [...arr],
      note: `Verificăm elementul de pe poziția ${i}, care este ${arr[i]}, cu valoarea căutată (${target}).`,
      vars: { current: i, target },
    });

    if (arr[i] === target) {
      foundIndex = i;
      trace.push({
        type: "mark_found",
        index: i,
        found: true,
        array: [...arr],
        note: `Elementul ${target} a fost găsit pe poziția ${i}.`,
        vars: { current: i, target },
      });
      break;
    }
  }

  if (foundIndex === -1) {
    trace.push({
      type: "mark_found",
      index: -1,
      found: false,
      array: [...arr],
      note: `Elementul ${target} nu a fost găsit în tablou după parcurgerea tuturor elementelor.`,
      vars: { target },
    });
  }

  trace.push({
    type: "done",
    result: { found: foundIndex !== -1, index: foundIndex },
    array: [...arr],
    note:
      foundIndex !== -1
        ? `Căutare finalizată. Elementul ${target} se află pe poziția ${foundIndex}.`
        : `Căutare finalizată. Elementul ${target} nu există în tablou.`,
    vars: { target, foundIndex },
  });

  return {
    trace,
    result: { found: foundIndex !== -1, index: foundIndex },
  };
}

export default linearSearchInstrumented;
