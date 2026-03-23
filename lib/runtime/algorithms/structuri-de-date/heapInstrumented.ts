import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

function parseValue(raw: string): number {
  const value = Number(raw.trim());
  return Number.isNaN(value) ? 0 : value;
}

function parseOps(script: string | undefined): Array<{ op: string; value: number }> {
  const lines = String(script || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return lines.map((line) => {
    const [rawOp, rawValue] = line.split(/\s+/);
    return { op: String(rawOp || "").toLowerCase(), value: parseValue(String(rawValue || "0")) };
  });
}

function siftUp(heap: number[], idx: number) {
  let i = idx;
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    if (heap[parent] >= heap[i]) break;
    const tmp = heap[parent];
    heap[parent] = heap[i];
    heap[i] = tmp;
    i = parent;
  }
}

export function heapInstrumented(input: { initial?: number[]; operations?: string; elements?: number[] }): AlgorithmResult {
  const initial = Array.isArray(input?.initial)
    ? input.initial.map((v) => Number(v)).filter((v) => Number.isFinite(v))
    : Array.isArray(input?.elements)
    ? input.elements.map((v) => Number(v)).filter((v) => Number.isFinite(v))
    : [20, 15, 10];
  const operations = parseOps(input?.operations || "insert 30\ninsert 18\ninsert 40");

  const heap = [...initial];
  for (let i = 0; i < heap.length; i += 1) siftUp(heap, i);

  const trace: TraceEvent[] = [];
  trace.push({
    type: "set",
    index: 0,
    value: heap.length,
    array: [...heap],
    note: `Inițializare Max-Heap cu ${heap.length} elemente.`,
    vars: { heap: [...heap], elements: [...heap], operation: "init" },
  });

  operations.forEach(({ op, value }) => {
    if (op === "insert") {
      heap.push(value);
      siftUp(heap, heap.length - 1);
      trace.push({
        type: "set",
        index: heap.length - 1,
        value,
        array: [...heap],
        note: `INSERT ${value}: heap reechilibrat (Max-Heap).`,
        vars: {
          heap: [...heap],
          elements: [...heap],
          operation: "insert",
          value,
          highlightValue: value,
          root: heap[0] ?? null,
        },
      });
      return;
    }

    trace.push({
      type: "compare",
      index: 0,
      value,
      array: [...heap],
      note: `Operație necunoscută: ${op}`,
      vars: { heap: [...heap], elements: [...heap], operation: "invalid", inputOp: op },
    } as any);
  });

  trace.push({
    type: "done",
    array: [...heap],
    note: `Heap final: [${heap.join(", ")}].`,
    vars: { heap: [...heap], elements: [...heap], operation: "complete", root: heap[0] ?? null },
  });

  return { trace, result: { heap: [...heap], root: heap[0] ?? null } };
}
