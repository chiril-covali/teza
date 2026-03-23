import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

function parseValue(raw: string): any {
  const trimmed = raw.trim();
  if (trimmed.length === 0) return "";
  const numeric = Number(trimmed);
  return Number.isNaN(numeric) ? trimmed : numeric;
}

function parseOps(script: string | undefined): Array<{ op: string; args: any[] }> {
  const lines = String(script || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return lines.map((line) => {
    const [rawOp, ...rest] = line.split(/\s+/);
    return { op: rawOp.toLowerCase(), args: rest.map(parseValue) };
  });
}

export function queueInstrumented(input: { initial?: any[]; operations?: string; elements?: any[] }): AlgorithmResult {
  const initial = Array.isArray(input?.initial)
    ? input.initial
    : Array.isArray(input?.elements)
    ? input.elements
    : [4, 8, 12];
  const operations = parseOps(input?.operations || "enqueue 20\nenqueue 24\npeek\ndequeue\nenqueue 30");
  const trace: TraceEvent[] = [];
  const queue: any[] = [...initial];

  trace.push({
    type: "set",
    index: 0,
    value: queue.length,
    array: queue.filter((v) => typeof v === "number") as number[],
    note: `Inițializare coadă cu ${queue.length} elemente.`,
    vars: { queue: [...queue], operation: "init", front: queue[0] ?? null, rear: queue.length ? queue[queue.length - 1] : null },
  });

  operations.forEach(({ op, args }) => {
    if (op === "enqueue") {
      const value = args[0];
      queue.push(value);
      trace.push({
        type: "set",
        index: queue.length - 1,
        value: typeof value === "number" ? value : queue.length,
        array: queue.filter((v) => typeof v === "number") as number[],
        note: `ENQUEUE ${String(value)}: adăugat la coadă.`,
        vars: {
          queue: [...queue],
          operation: "enqueue",
          element: value,
          front: queue[0] ?? null,
          rear: queue[queue.length - 1] ?? null,
          highlightIndices: [queue.length - 1],
        },
      });
      return;
    }

    if (op === "dequeue") {
      const removed = queue.length ? queue.shift() : null;
      trace.push({
        type: "set",
        index: 0,
        value: queue.length,
        array: queue.filter((v) => typeof v === "number") as number[],
        note: removed === null ? "DEQUEUE ignorat: coada este goală." : `DEQUEUE: extras ${String(removed)} din față.`,
        vars: {
          queue: [...queue],
          operation: "dequeue",
          removed,
          front: queue[0] ?? null,
          rear: queue.length ? queue[queue.length - 1] : null,
          highlightIndices: queue.length ? [0] : [],
        },
      });
      return;
    }

    if (op === "peek") {
      const front = queue.length ? queue[0] : null;
      trace.push({
        type: "compare",
        index: 0,
        value: queue.length,
        array: queue.filter((v) => typeof v === "number") as number[],
        note: front === null ? "PEEK: coada este goală." : `PEEK: primul element este ${String(front)}.`,
        vars: {
          queue: [...queue],
          operation: "peek",
          front,
          rear: queue.length ? queue[queue.length - 1] : null,
          highlightIndices: queue.length ? [0] : [],
        },
      } as any);
      return;
    }

    trace.push({
      type: "compare",
      index: 0,
      value: queue.length,
      array: queue.filter((v) => typeof v === "number") as number[],
      note: `Operație necunoscută: ${op}`,
      vars: {
        queue: [...queue],
        operation: "invalid",
        inputOp: op,
      },
    } as any);
  });

  trace.push({
    type: "done",
    array: queue.filter((v) => typeof v === "number") as number[],
    note: `Coada finală: ${queue.length ? queue.join(", ") : "goală"}.`,
    vars: {
      queue: [...queue],
      operation: "complete",
      size: queue.length,
      front: queue[0] ?? null,
      rear: queue.length ? queue[queue.length - 1] : null,
    },
  });

  return {
    trace,
    result: {
      queue: [...queue],
      size: queue.length,
      front: queue[0],
    },
  };
}
