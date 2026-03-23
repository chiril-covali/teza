import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

export function gnomeSortInstrumented(input: { array: number[] }): AlgorithmResult {
  const arr = [...input.array];
  const trace: TraceEvent[] = [];
  const n = arr.length;
  let i = 1;

  while (i < n) {
    trace.push({
      type: "compare",
      indices: [i - 1, i],
      values: [arr[i - 1], arr[i]],
      array: [...arr],
      note: `Compar elementele de pe pozițiile ${i - 1} (${arr[i - 1]}) și ${i} (${arr[i]})`,
      vars: { i },
    });

    if (arr[i - 1] <= arr[i]) {
      trace.push({
        type: "compare",
        indices: [i - 1, i],
        values: [arr[i - 1], arr[i]],
        array: [...arr],
        note: `${arr[i - 1]} ≤ ${arr[i]}: ordinea este corectă, avansez înainte (i=${i} → ${i + 1})`,
        vars: { i, direction: "forward" },
      });
      i++;
    } else {
      [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
      trace.push({
        type: "swap",
        indices: [i - 1, i],
        array: [...arr],
        note: `${arr[i]} > ${arr[i - 1]}: interschimb pozițiile ${i - 1} și ${i}, mă întorc înapoi (i=${i} → ${i - 1})`,
        vars: { i, direction: "backward" },
      });
      i = Math.max(1, i - 1);
    }
  }

  trace.push({
    type: "done",
    result: { sorted: arr },
    array: [...arr],
    note: "Sortarea gnome s-a finalizat. Array-ul este acum sortat.",
    vars: { n },
  });

  return { trace, result: { sorted: arr } };
}
