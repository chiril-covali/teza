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

function insertValue(tree: number[], value: number) {
  tree.push(value);
}

export function bstInstrumented(input: { initial?: number[]; operations?: string; elements?: number[] }): AlgorithmResult {
  const initial = Array.isArray(input?.initial)
    ? input.initial.map((v) => Number(v)).filter((v) => Number.isFinite(v))
    : Array.isArray(input?.elements)
    ? input.elements.map((v) => Number(v)).filter((v) => Number.isFinite(v))
    : [50, 30, 70, 20, 40, 60, 80];
  const operations = parseOps(input?.operations || "insert 65\ninsert 10\nfind 40\nfind 99\ninsert 75");
  const trace: TraceEvent[] = [];
  const nodes: number[] = [...initial];

  trace.push({
    type: "set",
    index: 0,
    value: nodes.length,
    array: [...nodes],
    note: `Inițializare BST cu ${nodes.length} noduri.`,
    vars: {
      nodes: [...nodes],
      operation: "init",
      inOrder: [...nodes].sort((a, b) => a - b),
    },
  });

  operations.forEach(({ op, value }) => {
    if (op === "insert") {
      insertValue(nodes, value);
      const inOrder = [...nodes].sort((a, b) => a - b);
      trace.push({
        type: "set",
        index: nodes.length - 1,
        value,
        array: [...nodes],
        note: `INSERT ${value}: valoare inserată în BST.`,
        vars: {
          nodes: [...nodes],
          operation: "insert",
          value,
          highlightValue: value,
          inOrder,
        },
      });
      return;
    }

    if (op === "find") {
      const found = nodes.includes(value);
      trace.push({
        type: "compare",
        index: Math.max(0, nodes.indexOf(value)),
        value,
        array: [...nodes],
        note: found ? `FIND ${value}: găsit în arbore.` : `FIND ${value}: nu există în arbore.`,
        vars: {
          nodes: [...nodes],
          operation: "find",
          value,
          found,
          highlightValue: value,
          inOrder: [...nodes].sort((a, b) => a - b),
        },
      } as any);
      return;
    }

    trace.push({
      type: "compare",
      index: 0,
      value,
      array: [...nodes],
      note: `Operație necunoscută: ${op}`,
      vars: {
        nodes: [...nodes],
        operation: "invalid",
        inputOp: op,
      },
    } as any);
  });

  // Simulate an in-order traversal final state
  const sorted = [...nodes].sort((a, b) => a - b);
  trace.push({
    type: "done",
    array: sorted,
    note: `Arbore construit cu ${nodes.length} noduri. Traversare in-order: ${sorted.join(" → ")}`,
    vars: {
      nodes: [...nodes],
      sorted,
      operation: "complete",
      size: nodes.length,
    },
  });

  return {
    trace,
    result: {
      nodes: [...nodes],
      inOrder: sorted,
      size: nodes.length,
    },
  };
}
