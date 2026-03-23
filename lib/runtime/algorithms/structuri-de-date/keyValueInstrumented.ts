import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

function parseValue(raw: string): any {
  const trimmed = raw.trim();
  if (trimmed.length === 0) return "";
  const numeric = Number(trimmed);
  return Number.isNaN(numeric) ? trimmed : numeric;
}

function parseOps(script: string | undefined): Array<{ op: string; key: string; value?: any }> {
  const lines = String(script || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return lines.map((line) => {
    const [rawOp, rawKey, rawValue] = line.split(/\s+/);
    return {
      op: String(rawOp || "").toLowerCase(),
      key: String(rawKey || ""),
      value: rawValue !== undefined ? parseValue(rawValue) : undefined,
    };
  });
}

export function mapInstrumented(input: { operations?: string }): AlgorithmResult {
  const operations = parseOps(input?.operations || "set a 1\nset b 2\nget a\ndelete b");
  const map = new Map<string, any>();
  const trace: TraceEvent[] = [];

  trace.push({ type: "set", index: 0, value: 0, array: [], note: "Inițializare Map gol.", vars: { map: {}, operation: "init" } });

  operations.forEach(({ op, key, value }) => {
    if (op === "set") {
      map.set(key, value);
      trace.push({
        type: "set",
        index: map.size,
        value: map.size,
        array: [],
        note: `SET ${key}=${String(value)}`,
        vars: { map: Object.fromEntries(map.entries()), operation: "set", key, value, entries: Array.from(map.entries()) },
      });
      return;
    }

    if (op === "delete") {
      const existed = map.delete(key);
      trace.push({
        type: "set",
        index: map.size,
        value: map.size,
        array: [],
        note: existed ? `DELETE ${key}` : `DELETE ${key} (cheie inexistentă)`,
        vars: { map: Object.fromEntries(map.entries()), operation: "delete", key, entries: Array.from(map.entries()) },
      });
      return;
    }

    if (op === "get") {
      const found = map.get(key);
      trace.push({
        type: "compare",
        index: map.size,
        value: map.size,
        array: [],
        note: found === undefined ? `GET ${key}: negăsit` : `GET ${key}: ${String(found)}`,
        vars: { map: Object.fromEntries(map.entries()), operation: "get", key, found, entries: Array.from(map.entries()) },
      } as any);
      return;
    }
  });

  trace.push({ type: "done", index: map.size, value: map.size, array: [], note: "Map finalizat.", vars: { map: Object.fromEntries(map.entries()), operation: "complete", entries: Array.from(map.entries()) } } as any);

  return { trace, result: { map: Object.fromEntries(map.entries()) } };
}

export function setInstrumented(input: { operations?: string }): AlgorithmResult {
  const operations = parseOps(input?.operations || "add 1\nadd 2\nhas 1\ndelete 2");
  const set = new Set<any>();
  const trace: TraceEvent[] = [];

  trace.push({ type: "set", index: 0, value: 0, array: [], note: "Inițializare Set gol.", vars: { values: [], operation: "init" } });

  operations.forEach(({ op, key }) => {
    const value = parseValue(key);

    if (op === "add") {
      set.add(value);
      trace.push({ type: "set", index: set.size, value: set.size, array: [], note: `ADD ${String(value)}`, vars: { values: Array.from(set.values()), operation: "add", value } });
      return;
    }

    if (op === "delete") {
      const existed = set.delete(value);
      trace.push({ type: "set", index: set.size, value: set.size, array: [], note: existed ? `DELETE ${String(value)}` : `DELETE ${String(value)} (inexistent)`, vars: { values: Array.from(set.values()), operation: "delete", value } });
      return;
    }

    if (op === "has") {
      const found = set.has(value);
      trace.push({ type: "compare", index: set.size, value: set.size, array: [], note: found ? `HAS ${String(value)}: DA` : `HAS ${String(value)}: NU`, vars: { values: Array.from(set.values()), operation: "has", value, found } } as any);
      return;
    }
  });

  trace.push({ type: "done", index: set.size, value: set.size, array: [], note: "Set finalizat.", vars: { values: Array.from(set.values()), operation: "complete" } } as any);

  return { trace, result: { values: Array.from(set.values()) } };
}
