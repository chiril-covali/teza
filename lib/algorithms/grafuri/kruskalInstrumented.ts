import { AlgorithmResult, TraceEvent } from "../types";

export function kruskalInstrumented(input: {
  nodes: string[];
  edges: Array<{ from: string; to: string; weight: number }>;
}): AlgorithmResult {
  const { nodes, edges } = input;
  const trace: TraceEvent[] = [];

  if (nodes.length === 0) {
    trace.push({ type: "done", result: { mstWeight: 0, mstEdges: [] } });
    return { trace, result: { mstWeight: 0, mstEdges: [] } };
  }

  // Union-Find
  const parent: Record<string, string> = {};
  const rank: Record<string, number> = {};
  nodes.forEach((node) => {
    parent[node] = node;
    rank[node] = 0;
  });

  function find(x: string): string {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  function union(x: string, y: string): boolean {
    const px = find(x);
    const py = find(y);
    if (px === py) return false;
    if (rank[px] < rank[py]) parent[px] = py;
    else if (rank[px] > rank[py]) parent[py] = px;
    else { parent[py] = px; rank[px]++; }
    return true;
  }

  const sortedEdges = [...edges].sort((a, b) => a.weight - b.weight);

  trace.push({
    type: "visit_node",
    node: nodes[0],
    note: `Sortez ${sortedEdges.length} muchii după cost. Inițializez Union-Find pentru ${nodes.length} noduri.`,
    vars: { muchiiSortate: sortedEdges.map((e) => `${e.from}→${e.to}(${e.weight})`), mstEdges: [], mstWeight: 0 },
  });

  const mstEdges: Array<{ from: string; to: string; weight: number }> = [];
  let mstWeight = 0;

  for (const edge of sortedEdges) {
    const { from, to, weight } = edge;

    trace.push({
      type: "visit_node",
      node: from,
      note: `Examinăm muchia ${from} → ${to} (cost ${weight})`,
      vars: { muchieActuala: `${from}→${to}`, cost: weight, mstEdges: [...mstEdges], mstWeight },
    });

    if (union(from, to)) {
      mstEdges.push({ from, to, weight });
      mstWeight += weight;

      trace.push({
        type: "visit_node",
        node: to,
        note: `Muchia ${from} → ${to} adăugată în APM (nu formează ciclu)`,
        vars: { muchieAdaugata: `${from}→${to}`, cost: weight, mstEdges: [...mstEdges], mstWeight },
      });
    } else {
      trace.push({
        type: "visit_node",
        node: to,
        note: `Muchia ${from} → ${to} respinsă — ar forma un ciclu`,
        vars: { muchieRespinsa: `${from}→${to}`, mstEdges: [...mstEdges], mstWeight },
      });
    }

    if (mstEdges.length === nodes.length - 1) break;
  }

  trace.push({
    type: "done",
    result: { mstWeight, mstEdges },
    note: `Algoritmul Kruskal s-a terminat. Cost APM: ${mstWeight}`,
    vars: { mstEdges, mstWeight },
  });

  return { trace, result: { mstWeight, mstEdges } };
}
