import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

function isSorted(arr: number[]) {
  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i - 1] > arr[i]) return false;
  }
  return true;
}

export function bogoSortInstrumented(input: { array: number[] }): AlgorithmResult {
  const arr = Array.isArray(input?.array) ? [...input.array] : [];
  const trace: TraceEvent[] = [];

  if (arr.length === 0) {
    return {
      trace: [
        {
          type: "done",
          array: [],
          note: "Array-ul este gol; nu există pași de executat.",
          vars: { attempts: 0 },
        },
      ],
      result: { sorted: [] },
    };
  }

  const maxAttempts = Math.min(120, Math.max(20, arr.length * 20));
  let attempts = 0;

  while (!isSorted(arr) && attempts < maxAttempts) {
    attempts += 1;

    for (let i = 1; i < arr.length; i += 1) {
      trace.push({
        type: "compare",
        indices: [i - 1, i],
        values: [arr[i - 1], arr[i]],
        array: [...arr],
        note: `Verific ordinea: arr[${i - 1}] = ${arr[i - 1]} și arr[${i}] = ${arr[i]}`,
        vars: { i, attempts, maxAttempts },
      });
      if (arr[i - 1] > arr[i]) break;
    }

    // Fisher-Yates shuffle with traceable swaps
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      if (i !== j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        trace.push({
          type: "swap",
          indices: [i, j],
          array: [...arr],
          note: `Amestec array-ul: swap între pozițiile ${i} și ${j}`,
          vars: { i, j, attempts, maxAttempts },
        });
      }
    }
  }

  if (!isSorted(arr)) {
    arr.sort((a, b) => a - b);
    trace.push({
      type: "set",
      index: 0,
      value: arr[0] ?? 0,
      array: [...arr],
      note: "Limita de încercări a fost atinsă; aplic ordonare finală pentru a evita blocarea vizualizării.",
      vars: { attempts, maxAttempts },
    });
  }

  trace.push({
    type: "done",
    array: [...arr],
    result: { sorted: arr },
    note: `Bogo sort finalizat după ${attempts} încercări.`,
    vars: { attempts, maxAttempts },
  });

  return { trace, result: { sorted: arr, attempts } };
}
