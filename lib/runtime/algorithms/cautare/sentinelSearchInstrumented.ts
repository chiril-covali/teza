import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

export function sentinelSearchInstrumented(input: {
  array: number[];
  target: number;
}): AlgorithmResult {
  const arr = input.array;
  const target = input.target;
  const trace: TraceEvent[] = [];
  const n = arr.length;

  // Work on a copy so we can add the sentinel without mutating input
  const workArr = [...arr];
  const lastElement = workArr[n - 1];

  // Place sentinel at the end
  workArr[n - 1] = target;

  trace.push({
    type: "set",
    index: n - 1,
    value: target,
    array: [...workArr],
    note: `Plasăm santinela (${target}) pe ultima poziție (${n - 1}). Valoarea originală ${lastElement} va fi verificată separat. Santinela elimină verificarea limitelor în buclă.`,
    vars: { sentinelIndex: n - 1, originalLast: lastElement, target },
  });

  // Linear search without bounds check (sentinel guarantees termination)
  let i = 0;
  while (workArr[i] !== target) {
    trace.push({
      type: "compare",
      indices: [i, i],
      values: [workArr[i], target],
      array: [...workArr],
      note: `arr[${i}] = ${workArr[i]} ≠ ${target}. Continuăm fără verificarea limitelor (santinela garantează oprirea).`,
      vars: { current: i, target },
    });
    i++;
  }

  // Restore original last element
  workArr[n - 1] = lastElement;

  trace.push({
    type: "set",
    index: n - 1,
    value: lastElement,
    array: [...workArr],
    note: `Restaurăm elementul original ${lastElement} pe poziția ${n - 1} (eliminăm santinela).`,
    vars: { sentinelIndex: n - 1, restoredValue: lastElement, stoppedAt: i, target },
  });

  // Verify: was the stop caused by a real match or the sentinel?
  let foundIndex = -1;

  if (i < n - 1) {
    // Stopped before the sentinel position — real match
    foundIndex = i;
    trace.push({
      type: "compare",
      indices: [i, i],
      values: [arr[i], target],
      array: [...workArr],
      note: `Bucla s-a oprit la poziția ${i} (înaintea santinelei). Verificăm: arr[${i}] = ${arr[i]} = ${target}. Potrivire reală!`,
      vars: { current: i, target },
    });
    trace.push({
      type: "mark_found",
      index: i,
      found: true,
      array: [...workArr],
      note: `Elementul ${target} a fost găsit pe poziția ${i}.`,
      vars: { current: i, target },
    });
  } else {
    // Stopped at sentinel — check if original last element matches
    trace.push({
      type: "compare",
      indices: [n - 1, n - 1],
      values: [lastElement, target],
      array: [...workArr],
      note: `Bucla s-a oprit la santinelă (poziția ${n - 1}). Verificăm elementul original: arr[${n - 1}] = ${lastElement} cu ${target}.`,
      vars: { current: n - 1, target, originalLast: lastElement },
    });

    if (lastElement === target) {
      foundIndex = n - 1;
      trace.push({
        type: "mark_found",
        index: n - 1,
        found: true,
        array: [...workArr],
        note: `Elementul original de pe ultima poziție (${lastElement}) este egal cu ${target}. Element găsit pe poziția ${n - 1}!`,
        vars: { current: n - 1, target },
      });
    } else {
      trace.push({
        type: "mark_found",
        index: -1,
        found: false,
        array: [...workArr],
        note: `Bucla s-a oprit doar din cauza santinelei. Elementul ${target} nu există în tablou.`,
        vars: { target },
      });
    }
  }

  trace.push({
    type: "done",
    result: { found: foundIndex !== -1, index: foundIndex },
    array: [...workArr],
    note:
      foundIndex !== -1
        ? `Căutare cu santinelă finalizată. Elementul ${target} se află pe poziția ${foundIndex}.`
        : `Căutare cu santinelă finalizată. Elementul ${target} nu există în tablou.`,
    vars: { target, foundIndex },
  });

  return {
    trace,
    result: { found: foundIndex !== -1, index: foundIndex },
  };
}

export default sentinelSearchInstrumented;
