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

export function stackInstrumented(input: { initial?: any[]; operations?: string; elements?: any[] }): AlgorithmResult {
  const initial = Array.isArray(input?.initial)
    ? input.initial
    : Array.isArray(input?.elements)
    ? input.elements
    : [3, 7, 11];
  const operations = parseOps(input?.operations || "push 5\npush 9\npeek\npop\npush 4");
  const trace: TraceEvent[] = [];
  const stack: any[] = [...initial];

  trace.push({
    type: "set",
    index: Math.max(0, stack.length - 1),
    value: stack.length,
    array: stack.filter((v) => typeof v === "number") as number[],
    note: `Inițializare stivă cu ${stack.length} elemente.`,
    vars: { stack: [...stack], operation: "init", top: stack.length ? stack[stack.length - 1] : null },
  });

  operations.forEach(({ op, args }) => {
    if (op === "push") {
      const value = args[0];
      stack.push(value);
      trace.push({
        type: "set",
        index: stack.length - 1,
        value: typeof value === "number" ? value : stack.length,
        array: stack.filter((v) => typeof v === "number") as number[],
        note: `PUSH ${String(value)}: adăugat în vârful stivei.`,
        vars: {
          stack: [...stack],
          operation: "push",
          element: value,
          top: value,
          highlightIndices: [stack.length - 1],
        },
      });
      return;
    }

    if (op === "pop") {
      const removed = stack.length ? stack.pop() : null;
      trace.push({
        type: "set",
        index: Math.max(0, stack.length - 1),
        value: stack.length,
        array: stack.filter((v) => typeof v === "number") as number[],
        note: removed === null ? "POP ignorat: stiva este goală." : `POP: scos ${String(removed)} din vârf.`,
        vars: {
          stack: [...stack],
          operation: "pop",
          removed,
          top: stack.length ? stack[stack.length - 1] : null,
          highlightIndices: stack.length ? [stack.length - 1] : [],
        },
      });
      return;
    }

    if (op === "peek") {
      const top = stack.length ? stack[stack.length - 1] : null;
      trace.push({
        type: "compare",
        index: Math.max(0, stack.length - 1),
        value: stack.length,
        array: stack.filter((v) => typeof v === "number") as number[],
        note: top === null ? "PEEK: stiva este goală." : `PEEK: vârful este ${String(top)}.`,
        vars: {
          stack: [...stack],
          operation: "peek",
          top,
          highlightIndices: stack.length ? [stack.length - 1] : [],
        },
      } as any);
      return;
    }

    trace.push({
      type: "compare",
      index: 0,
      value: 0,
      array: stack.filter((v) => typeof v === "number") as number[],
      note: `Operație necunoscută: ${op}`,
      vars: {
        stack: [...stack],
        operation: "invalid",
        inputOp: op,
      },
    } as any);
  });

  trace.push({
    type: "done",
    array: stack.filter((v) => typeof v === "number") as number[],
    note: `Stiva finală: ${stack.length ? stack.join(", ") : "goală"}.`,
    vars: {
      stack: [...stack],
      operation: "complete",
      size: stack.length,
      top: stack.length ? stack[stack.length - 1] : null,
    },
  });

  return {
    trace,
    result: {
      stack: [...stack],
      size: stack.length,
    },
  };
}
