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

export function linkedListInstrumented(input: { initial?: any[]; operations?: string; elements?: any[] }): AlgorithmResult {
  const initial = Array.isArray(input?.initial)
    ? input.initial
    : Array.isArray(input?.elements)
    ? input.elements
    : [10, 20, 30];
  const operations = parseOps(input?.operations || "append 40\nprepend 5\ninsert 2 15\nfind 30\nremove 1");
  const trace: TraceEvent[] = [];
  const nodes: any[] = [...initial];

  trace.push({
    type: "set",
    index: 0,
    value: nodes.length,
    array: nodes.filter((v) => typeof v === "number") as number[],
    note: `Inițializare listă cu ${nodes.length} noduri.`,
    vars: { nodes: [...nodes], operation: "init", size: nodes.length },
  });

  operations.forEach(({ op, args }) => {
    if (op === "append") {
      const value = args[0];
      nodes.push(value);
      trace.push({
        type: "set",
        index: nodes.length - 1,
        value: typeof value === "number" ? value : nodes.length,
        array: nodes.filter((v) => typeof v === "number") as number[],
        note: `APPEND ${String(value)}: nod adăugat la final.`,
        vars: { nodes: [...nodes], operation: "append", value, highlightIndices: [nodes.length - 1], size: nodes.length },
      });
      return;
    }

    if (op === "prepend") {
      const value = args[0];
      nodes.unshift(value);
      trace.push({
        type: "set",
        index: 0,
        value: typeof value === "number" ? value : nodes.length,
        array: nodes.filter((v) => typeof v === "number") as number[],
        note: `PREPEND ${String(value)}: nod adăugat la început.`,
        vars: { nodes: [...nodes], operation: "prepend", value, highlightIndices: [0], size: nodes.length },
      });
      return;
    }

    if (op === "insert") {
      const at = Math.max(0, Math.min(nodes.length, Number(args[0] ?? nodes.length)));
      const value = args[1];
      nodes.splice(at, 0, value);
      trace.push({
        type: "set",
        index: at,
        value: typeof value === "number" ? value : nodes.length,
        array: nodes.filter((v) => typeof v === "number") as number[],
        note: `INSERT ${String(value)} la index ${at}.`,
        vars: { nodes: [...nodes], operation: "insert", value, at, highlightIndices: [at], size: nodes.length },
      });
      return;
    }

    if (op === "remove") {
      const at = Math.max(0, Math.min(nodes.length - 1, Number(args[0] ?? 0)));
      const removed = nodes.length ? nodes.splice(at, 1)[0] : null;
      trace.push({
        type: "set",
        index: Math.max(0, at - 1),
        value: nodes.length,
        array: nodes.filter((v) => typeof v === "number") as number[],
        note: removed === null ? "REMOVE ignorat: lista este goală." : `REMOVE index ${at}: eliminat ${String(removed)}.`,
        vars: { nodes: [...nodes], operation: "remove", at, removed, highlightIndices: nodes.length ? [Math.max(0, at - 1)] : [], size: nodes.length },
      });
      return;
    }

    if (op === "find") {
      const target = args[0];
      const foundIndex = nodes.findIndex((v) => String(v) === String(target));
      trace.push({
        type: "compare",
        index: Math.max(0, foundIndex),
        value: foundIndex,
        array: nodes.filter((v) => typeof v === "number") as number[],
        note: foundIndex >= 0 ? `FIND ${String(target)}: găsit la index ${foundIndex}.` : `FIND ${String(target)}: negăsit.`,
        vars: { nodes: [...nodes], operation: "find", target, foundIndex, highlightIndices: foundIndex >= 0 ? [foundIndex] : [], size: nodes.length },
      } as any);
      return;
    }

    trace.push({
      type: "compare",
      index: 0,
      value: 0,
      array: nodes.filter((v) => typeof v === "number") as number[],
      note: `Operație necunoscută: ${op}`,
      vars: {
        nodes: [...nodes],
        operation: "invalid",
        inputOp: op,
      },
    } as any);
  });

  trace.push({
    type: "done",
    array: nodes.filter((v) => typeof v === "number") as number[],
    note: `Lista finală conține ${nodes.length} noduri: ${nodes.join(" → ")} → NULL`,
    vars: {
      nodes: [...nodes],
      operation: "complete",
      size: nodes.length,
    },
  });

  return {
    trace,
    result: {
      nodes: [...nodes],
      size: nodes.length,
    },
  };
}
