import { AlgorithmResult, TraceEvent } from "../types";

export function jumpSearchInstrumented(input: {
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

  const step = Math.floor(Math.sqrt(n));
  let prev = 0;
  let foundIndex = -1;

  trace.push({
    type: "compare",
    indices: [0, 0],
    values: [arr[0], target],
    array: [...arr],
    note: `Pasul de salt este √${n} ≈ ${step}. Începem căutarea prin salturi în tabloul sortat.`,
    vars: { step, n, target },
  });

  // Phase 1: Jump to find the block
  let curr = Math.min(step, n) - 1;
  while (arr[curr] < target) {
    trace.push({
      type: "compare",
      indices: [curr, curr],
      values: [arr[curr], target],
      array: [...arr],
      note: `Faza 1 – salt: arr[${curr}] = ${arr[curr]} < ${target}. Sărim la blocul următor. Intervalul verificat: [${prev}, ${curr}].`,
      vars: { prev, curr, step, target },
    });

    prev = curr + 1;
    curr = Math.min(curr + step, n - 1);

    if (prev >= n) {
      trace.push({
        type: "mark_found",
        index: -1,
        found: false,
        array: [...arr],
        note: `Am depășit limita tabloului. Elementul ${target} nu există în tablou.`,
        vars: { prev, curr, target },
      });
      trace.push({
        type: "done",
        result: { found: false, index: -1 },
        array: [...arr],
        note: `Căutare prin salt finalizată. Elementul ${target} nu există în tablou.`,
        vars: { target, foundIndex: -1 },
      });
      return { trace, result: { found: false, index: -1 } };
    }
  }

  trace.push({
    type: "compare",
    indices: [curr, curr],
    values: [arr[curr], target],
    array: [...arr],
    note: `Faza 1 finalizată. arr[${curr}] = ${arr[curr]} ≥ ${target}. Căutare liniară în blocul [${prev}, ${curr}].`,
    vars: { prev, curr, target },
  });

  // Phase 2: Linear search within the block
  for (let i = prev; i <= curr; i++) {
    trace.push({
      type: "compare",
      indices: [i, i],
      values: [arr[i], target],
      array: [...arr],
      note: `Faza 2 – căutare liniară în bloc: verificăm arr[${i}] = ${arr[i]} cu ${target}.`,
      vars: { current: i, blockStart: prev, blockEnd: curr, target },
    });

    if (arr[i] === target) {
      foundIndex = i;
      trace.push({
        type: "mark_found",
        index: i,
        found: true,
        array: [...arr],
        note: `Elementul ${target} a fost găsit pe poziția ${i} în interiorul blocului.`,
        vars: { current: i, blockStart: prev, blockEnd: curr, target },
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
      note: `Elementul ${target} nu a fost găsit în blocul [${prev}, ${curr}].`,
      vars: { target },
    });
  }

  trace.push({
    type: "done",
    result: { found: foundIndex !== -1, index: foundIndex },
    array: [...arr],
    note:
      foundIndex !== -1
        ? `Căutare prin salt finalizată. Elementul ${target} se află pe poziția ${foundIndex}.`
        : `Căutare prin salt finalizată. Elementul ${target} nu există în tablou.`,
    vars: { target, foundIndex },
  });

  return {
    trace,
    result: { found: foundIndex !== -1, index: foundIndex },
  };
}

export default jumpSearchInstrumented;
