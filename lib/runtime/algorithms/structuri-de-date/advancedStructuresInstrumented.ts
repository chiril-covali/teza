import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

function parseLines(script: string | undefined): string[] {
  return String(script || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export function trieInstrumented(input: { words?: string[]; operations?: string }): AlgorithmResult {
  const words = Array.isArray(input?.words) ? input.words.map(String) : ["apple", "app", "apt"];
  const ops = parseLines(input?.operations || "insert apple\ninsert app\nsearch app\nsearch cat");
  const inserted = new Set<string>(words);
  const trace: TraceEvent[] = [];

  trace.push({ type: "set", index: 0, value: words.length, array: [], note: `Inițializare Trie cu ${words.length} cuvinte.`, vars: { words: Array.from(inserted), operation: "init" } });

  ops.forEach((line) => {
    const [op, tokenRaw] = line.split(/\s+/);
    const token = String(tokenRaw || "");

    if (op === "insert") {
      inserted.add(token);
      trace.push({ type: "set", index: inserted.size, value: inserted.size, array: [], note: `INSERT ${token}`, vars: { words: Array.from(inserted), operation: "insert", token } });
      return;
    }

    if (op === "search") {
      const found = inserted.has(token);
      trace.push({ type: "compare", index: inserted.size, value: inserted.size, array: [], note: found ? `SEARCH ${token}: găsit` : `SEARCH ${token}: negăsit`, vars: { words: Array.from(inserted), operation: "search", token, found } } as any);
      return;
    }
  });

  trace.push({ type: "done", index: inserted.size, value: inserted.size, array: [], note: "Trie finalizat.", vars: { words: Array.from(inserted), operation: "complete" } } as any);
  return { trace, result: { words: Array.from(inserted) } };
}

export function disjointSetInstrumented(input: { n?: number; operations?: string }): AlgorithmResult {
  const n = Math.max(2, Number(input?.n ?? 6));
  const ops = parseLines(input?.operations || "union 0 1\nunion 1 2\nfind 2\nfind 5");
  const parent = Array.from({ length: n }, (_, i) => i);
  const trace: TraceEvent[] = [];

  const find = (x: number): number => {
    while (parent[x] !== x) x = parent[x];
    return x;
  };

  trace.push({ type: "set", index: 0, value: n, array: [...parent], note: `Inițializare ${n} mulțimi disjuncte.`, vars: { parent: [...parent], operation: "init" } });

  ops.forEach((line) => {
    const [op, aRaw, bRaw] = line.split(/\s+/);
    const a = Math.max(0, Math.min(n - 1, Number(aRaw ?? 0)));
    const b = Math.max(0, Math.min(n - 1, Number(bRaw ?? 0)));

    if (op === "union") {
      const ra = find(a);
      const rb = find(b);
      if (ra !== rb) parent[rb] = ra;
      trace.push({
        type: "set",
        index: a,
        value: b,
        array: [...parent],
        note: `UNION ${a}, ${b}: rădăcini ${ra} și ${rb}${ra === rb ? " (deja unite)" : ""}`,
        vars: { parent: [...parent], operation: "union", a, b, rootA: ra, rootB: rb },
      });
      return;
    }

    if (op === "find") {
      const root = find(a);
      trace.push({
        type: "compare",
        index: a,
        value: root,
        array: [...parent],
        note: `FIND ${a}: rădăcina este ${root}`,
        vars: { parent: [...parent], operation: "find", a, root, highlightIndices: [a, root] },
      } as any);
    }
  });

  trace.push({ type: "done", index: 0, value: 0, array: [...parent], note: "Disjoint Set finalizat.", vars: { parent: [...parent], operation: "complete" } } as any);
  return { trace, result: { parent } };
}
