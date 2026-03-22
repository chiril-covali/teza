import { AlgorithmResult, TraceEvent } from "../types";

export function interpolationSearchInstrumented(input: {
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

  let lo = 0;
  let hi = n - 1;
  let foundIndex = -1;

  while (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
    if (lo === hi) {
      trace.push({
        type: "compare",
        indices: [lo, lo],
        values: [arr[lo], target],
        array: [...arr],
        note: `Intervalul s-a restrâns la un singur element: arr[${lo}] = ${arr[lo]}. Comparăm cu ${target}.`,
        vars: { lo, hi, target },
      });

      if (arr[lo] === target) {
        foundIndex = lo;
        trace.push({
          type: "mark_found",
          index: lo,
          found: true,
          array: [...arr],
          note: `Elementul ${target} a fost găsit pe poziția ${lo}.`,
          vars: { lo, hi, target },
        });
      }
      break;
    }

    // Interpolation formula
    const rangeDiff = arr[hi] - arr[lo];
    const pos =
      lo + Math.floor(((target - arr[lo]) * (hi - lo)) / rangeDiff);

    trace.push({
      type: "compare",
      indices: [pos, pos],
      values: [arr[pos], target],
      array: [...arr],
      note: `Calculăm poziția estimată: pos = ${lo} + floor((${target} - ${arr[lo]}) × (${hi} - ${lo}) / (${arr[hi]} - ${arr[lo]})) = ${pos}. arr[${pos}] = ${arr[pos]}.`,
      vars: { lo, hi, pos, target },
    });

    if (arr[pos] === target) {
      foundIndex = pos;
      trace.push({
        type: "mark_found",
        index: pos,
        found: true,
        array: [...arr],
        note: `Elementul ${target} a fost găsit pe poziția estimată ${pos}.`,
        vars: { lo, hi, pos, target },
      });
      break;
    }

    if (arr[pos] < target) {
      trace.push({
        type: "compare",
        indices: [pos, pos],
        values: [arr[pos], target],
        array: [...arr],
        note: `arr[${pos}] = ${arr[pos]} < ${target}. Căutăm în jumătatea dreaptă. lo devine ${pos + 1}.`,
        vars: { lo: pos + 1, hi, pos, target },
      });
      lo = pos + 1;
    } else {
      trace.push({
        type: "compare",
        indices: [pos, pos],
        values: [arr[pos], target],
        array: [...arr],
        note: `arr[${pos}] = ${arr[pos]} > ${target}. Căutăm în jumătatea stângă. hi devine ${pos - 1}.`,
        vars: { lo, hi: pos - 1, pos, target },
      });
      hi = pos - 1;
    }
  }

  if (foundIndex === -1) {
    const outOfRange = lo > hi || target < arr[0] || target > arr[n - 1];
    trace.push({
      type: "mark_found",
      index: -1,
      found: false,
      array: [...arr],
      note: outOfRange
        ? `Elementul ${target} este în afara intervalului [${arr[0]}, ${arr[n - 1]}] sau nu există în tablou.`
        : `Elementul ${target} nu a fost găsit în tablou.`,
      vars: { lo, hi, target },
    });
  }

  trace.push({
    type: "done",
    result: { found: foundIndex !== -1, index: foundIndex },
    array: [...arr],
    note:
      foundIndex !== -1
        ? `Căutare prin interpolare finalizată. Elementul ${target} se află pe poziția ${foundIndex}.`
        : `Căutare prin interpolare finalizată. Elementul ${target} nu există în tablou.`,
    vars: { target, foundIndex },
  });

  return {
    trace,
    result: { found: foundIndex !== -1, index: foundIndex },
  };
}

export default interpolationSearchInstrumented;
