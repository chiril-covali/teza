import { AlgorithmResult, TraceEvent } from "../types";

export function countingSortInstrumented(input: { array: number[] }): AlgorithmResult {
  const arr = [...input.array];
  const trace: TraceEvent[] = [];
  const n = arr.length;

  if (n === 0) {
    trace.push({ type: "done", result: { sorted: [] }, array: [], note: "Array-ul este gol.", vars: { n } });
    return { trace, result: { sorted: [] } };
  }

  let min = arr[0];
  let max = arr[0];
  for (let i = 1; i < n; i++) {
    trace.push({
      type: "compare",
      indices: [i, 0],
      values: [arr[i], min],
      array: [...arr],
      note: `Caut minimul și maximul: compar arr[${i}]=${arr[i]} cu minimul curent=${min} și maximul curent=${max}`,
      vars: { i, min, max },
    });
    if (arr[i] < min) min = arr[i];
    if (arr[i] > max) max = arr[i];
  }

  const range = max - min + 1;
  const count = new Array(range).fill(0);

  trace.push({
    type: "compare",
    array: [...arr],
    note: `Minimul este ${min}, maximul este ${max}. Creez array-ul de numărare cu ${range} poziții (indici de la ${min} la ${max}).`,
    vars: { min, max, range },
  });

  for (let i = 0; i < n; i++) {
    count[arr[i] - min]++;
    trace.push({
      type: "compare",
      indices: [i, arr[i] - min],
      values: [arr[i], count[arr[i] - min]],
      array: [...arr],
      note: `Număr apariția valorii ${arr[i]}: count[${arr[i] - min}] = ${count[arr[i] - min]}`,
      vars: { i, value: arr[i], countIndex: arr[i] - min, countValue: count[arr[i] - min] },
    });
  }

  const sorted: number[] = [];
  for (let i = 0; i < range; i++) {
    const value = i + min;
    for (let j = 0; j < count[i]; j++) {
      const pos = sorted.length;
      sorted.push(value);
      const display = [...arr.slice(0, pos), ...sorted.slice(pos), ...new Array(n - sorted.length).fill(0)];
      trace.push({
        type: "set",
        index: pos,
        value,
        array: [...sorted, ...new Array(n - sorted.length).fill(0)],
        note: `Plasez valoarea ${value} pe poziția ${pos} în array-ul sortat (count[${i}]=${count[i]}, apariția ${j + 1}/${count[i]})`,
        vars: { value, pos, countIndex: i, occurrence: j + 1, total: count[i] },
      });
      void display;
    }
  }

  trace.push({
    type: "done",
    result: { sorted },
    array: [...sorted],
    note: "Sortarea prin numărare s-a finalizat. Array-ul este acum sortat.",
    vars: { n, min, max },
  });

  return { trace, result: { sorted } };
}
