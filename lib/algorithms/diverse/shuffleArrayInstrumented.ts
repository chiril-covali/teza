import { AlgorithmResult, TraceEvent } from "../types";

export function shuffleArrayInstrumented(input: { array: number[] }): AlgorithmResult {
  const arr = [...(input.array || [1, 2, 3, 4, 5])];
  const trace: TraceEvent[] = [];
  const n = arr.length;

  trace.push({
    type: "set",
    index: 0,
    value: arr[0],
    array: [...arr],
    note: `Amestecăm tabloul de ${n} elemente folosind algoritmul Fisher-Yates.`,
    vars: { n },
  });

  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
    trace.push({
      type: "swap",
      indices: [i, j],
      array: [...arr],
      note: `Interschimbăm elementele de pe pozițiile ${i} și ${j} (ales aleatoriu). arr[${i}]=${arr[i]}, arr[${j}]=${arr[j]}.`,
      vars: { i, j, "arr[i]": arr[i], "arr[j]": arr[j] },
    });
  }

  trace.push({ type: "done", array: [...arr], note: "Tabloul a fost amestecat complet.", vars: {} });
  return { trace, result: { shuffled: arr } };
}
