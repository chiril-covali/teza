import { AlgorithmResult, TraceEvent } from "../types";

export function fibonacciSearchInstrumented(input: {
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

  // Find the smallest Fibonacci number >= n
  let fibM2 = 0; // (m-2)'th Fibonacci
  let fibM1 = 1; // (m-1)'th Fibonacci
  let fibM = fibM2 + fibM1; // m'th Fibonacci

  while (fibM < n) {
    fibM2 = fibM1;
    fibM1 = fibM;
    fibM = fibM2 + fibM1;
  }

  trace.push({
    type: "compare",
    indices: [0, 0],
    values: [arr[0], target],
    array: [...arr],
    note: `Cel mai mic număr Fibonacci ≥ ${n} este ${fibM}. Numerele Fibonacci utilizate: fibM2=${fibM2}, fibM1=${fibM1}, fibM=${fibM}. Offset inițial: -1.`,
    vars: { fibM, fibM1, fibM2, n, target, offset: -1 },
  });

  let offset = -1;
  let foundIndex = -1;

  while (fibM > 1) {
    // i is the valid location in arr closest to offset + fibM2
    const i = Math.min(offset + fibM2, n - 1);

    trace.push({
      type: "compare",
      indices: [i, i],
      values: [arr[i], target],
      array: [...arr],
      note: `Verificăm arr[${i}] = ${arr[i]} cu ${target}. Poziție calculată: offset(${offset}) + fibM2(${fibM2}) = ${i}. Fibonacci curent: fibM=${fibM}, fibM1=${fibM1}, fibM2=${fibM2}.`,
      vars: { i, offset, fibM, fibM1, fibM2, target },
    });

    if (arr[i] < target) {
      // Eliminate the front two-thirds; move Fibonacci numbers one step down
      fibM = fibM1;
      fibM1 = fibM2;
      fibM2 = fibM - fibM1;
      offset = i;
      trace.push({
        type: "compare",
        indices: [i, i],
        values: [arr[i], target],
        array: [...arr],
        note: `arr[${i}] = ${arr[i]} < ${target}. Eliminăm prima treime. Offset devine ${offset}. Noi Fibonacci: fibM=${fibM}, fibM1=${fibM1}, fibM2=${fibM2}.`,
        vars: { i, offset, fibM, fibM1, fibM2, target },
      });
    } else if (arr[i] > target) {
      // Eliminate the back third; move Fibonacci numbers two steps down
      fibM = fibM2;
      fibM1 = fibM1 - fibM2;
      fibM2 = fibM - fibM1;
      trace.push({
        type: "compare",
        indices: [i, i],
        values: [arr[i], target],
        array: [...arr],
        note: `arr[${i}] = ${arr[i]} > ${target}. Eliminăm ultima treime. Offset rămâne ${offset}. Noi Fibonacci: fibM=${fibM}, fibM1=${fibM1}, fibM2=${fibM2}.`,
        vars: { i, offset, fibM, fibM1, fibM2, target },
      });
    } else {
      // Found
      foundIndex = i;
      trace.push({
        type: "mark_found",
        index: i,
        found: true,
        array: [...arr],
        note: `Elementul ${target} a fost găsit pe poziția ${i}.`,
        vars: { i, offset, fibM, fibM1, fibM2, target },
      });
      break;
    }
  }

  // Check last element (fibM1 == 1 means one element left)
  const lastCandidateIdx = offset + 1;
  if (foundIndex === -1 && fibM1 && lastCandidateIdx < n && arr[lastCandidateIdx] === target) {
    foundIndex = lastCandidateIdx;
    trace.push({
      type: "mark_found",
      index: foundIndex,
      found: true,
      array: [...arr],
      note: `Verificăm ultimul element rămas: arr[${foundIndex}] = ${arr[foundIndex]} = ${target}. Element găsit!`,
      vars: { offset, fibM1, target },
    });
  }

  if (foundIndex === -1) {
    trace.push({
      type: "mark_found",
      index: -1,
      found: false,
      array: [...arr],
      note: `Elementul ${target} nu a fost găsit în tablou.`,
      vars: { target },
    });
  }

  trace.push({
    type: "done",
    result: { found: foundIndex !== -1, index: foundIndex },
    array: [...arr],
    note:
      foundIndex !== -1
        ? `Căutare Fibonacci finalizată. Elementul ${target} se află pe poziția ${foundIndex}.`
        : `Căutare Fibonacci finalizată. Elementul ${target} nu există în tablou.`,
    vars: { target, foundIndex },
  });

  return {
    trace,
    result: { found: foundIndex !== -1, index: foundIndex },
  };
}

export default fibonacciSearchInstrumented;
