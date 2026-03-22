import { AlgorithmResult, TraceEvent } from "../types";

export function shellSortInstrumented(input: { array: number[] }): AlgorithmResult {
  const arr = [...input.array];
  const trace: TraceEvent[] = [];
  const n = arr.length;

  let gap = Math.floor(n / 2);

  while (gap > 0) {
    trace.push({
      type: "compare",
      array: [...arr],
      note: `Noua valoare a pasului (gap): ${gap}. Aplic insertion sort cu distanța ${gap} între elemente.`,
      vars: { gap, n },
    });

    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;

      trace.push({
        type: "compare",
        indices: [i, i - gap],
        values: [arr[i], arr[i - gap]],
        array: [...arr],
        note: `Gap=${gap}: preiau arr[${i}]=${temp} și îl compar cu elementul de la distanță gap: arr[${i - gap}]=${arr[i - gap]}`,
        vars: { i, gap, temp, j },
      });

      while (j >= gap && arr[j - gap] > temp) {
        trace.push({
          type: "compare",
          indices: [j - gap, j],
          values: [arr[j - gap], temp],
          array: [...arr],
          note: `Gap=${gap}: arr[${j - gap}]=${arr[j - gap]} > ${temp}, deplasez elementul spre dreapta`,
          vars: { j, gap, temp, comparing: arr[j - gap] },
        });

        arr[j] = arr[j - gap];
        trace.push({
          type: "set",
          index: j,
          value: arr[j],
          array: [...arr],
          note: `Gap=${gap}: copiez arr[${j - gap}]=${arr[j]} pe poziția ${j}`,
          vars: { j, gap, temp, movedValue: arr[j] },
        });

        j -= gap;
      }

      if (arr[j] !== temp) {
        arr[j] = temp;
        trace.push({
          type: "set",
          index: j,
          value: temp,
          array: [...arr],
          note: `Gap=${gap}: plasez valoarea ${temp} pe poziția corectă ${j}`,
          vars: { j, gap, temp },
        });
      }
    }

    gap = Math.floor(gap / 2);
  }

  trace.push({
    type: "done",
    result: { sorted: arr },
    array: [...arr],
    note: "Sortarea Shell s-a finalizat. Array-ul este acum sortat.",
    vars: { n },
  });

  return { trace, result: { sorted: arr } };
}
