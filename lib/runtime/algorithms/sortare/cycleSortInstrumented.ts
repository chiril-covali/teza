import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

export function cycleSortInstrumented(input: { array: number[] }): AlgorithmResult {
  const arr = [...input.array];
  const trace: TraceEvent[] = [];
  const n = arr.length;
  let writes = 0;

  for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
    let item = arr[cycleStart];

    trace.push({
      type: "compare",
      indices: [cycleStart, cycleStart],
      values: [item, item],
      array: [...arr],
      note: `Încep un nou ciclu pornind de la poziția ${cycleStart}, cu elementul ${item}. Calculez poziția corectă a acestuia.`,
      vars: { cycleStart, item, writes },
    });

    let pos = cycleStart;
    for (let i = cycleStart + 1; i < n; i++) {
      trace.push({
        type: "compare",
        indices: [i, cycleStart],
        values: [arr[i], item],
        array: [...arr],
        note: `Compar arr[${i}]=${arr[i]} cu elementul curent ${item} pentru a determina poziția corectă`,
        vars: { i, cycleStart, item, pos },
      });
      if (arr[i] < item) pos++;
    }

    if (pos === cycleStart) {
      trace.push({
        type: "compare",
        array: [...arr],
        note: `Elementul ${item} se află deja pe poziția sa corectă (${cycleStart}). Trec la următorul ciclu.`,
        vars: { cycleStart, item, pos },
      });
      continue;
    }

    // Skip duplicates
    while (item === arr[pos]) pos++;

    const displaced = arr[pos];
    arr[pos] = item;
    item = displaced;
    writes++;

    trace.push({
      type: "set",
      index: pos,
      value: arr[pos],
      array: [...arr],
      note: `Plasez elementul ${arr[pos]} pe poziția sa corectă ${pos}. Elementul deplasat ${item} va fi repoziționat.`,
      vars: { cycleStart, placedValue: arr[pos], item, pos, writes },
    });

    while (pos !== cycleStart) {
      pos = cycleStart;
      for (let i = cycleStart + 1; i < n; i++) {
        trace.push({
          type: "compare",
          indices: [i, cycleStart],
          values: [arr[i], item],
          array: [...arr],
          note: `Continui ciclul: compar arr[${i}]=${arr[i]} cu elementul deplasat ${item}`,
          vars: { i, cycleStart, item, pos },
        });
        if (arr[i] < item) pos++;
      }

      while (item === arr[pos]) pos++;

      if (item !== arr[pos]) {
        const displaced2 = arr[pos];
        arr[pos] = item;
        item = displaced2;
        writes++;
        trace.push({
          type: "set",
          index: pos,
          value: arr[pos],
          array: [...arr],
          note: `Plasez elementul deplasat ${arr[pos]} pe poziția corectă ${pos}. Elementul ${item} va fi repoziționat în continuare.`,
          vars: { cycleStart, placedValue: arr[pos], item, pos, writes },
        });
      }
    }
  }

  trace.push({
    type: "done",
    result: { sorted: arr },
    array: [...arr],
    note: `Sortarea prin cicluri s-a finalizat cu ${writes} scrieri. Array-ul este acum sortat.`,
    vars: { n, writes },
  });

  return { trace, result: { sorted: arr } };
}
