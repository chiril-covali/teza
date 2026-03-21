import { AlgorithmResult, TraceEvent } from "../types";

export function primInstrumented(input: {
  nodes: string[];
  edges: Array<{ from: string; to: string; weight: number }>;
  start: string;
}): AlgorithmResult {
  const { nodes, edges, start } = input;
  const trace: TraceEvent[] = [];

  if (nodes.length === 0) {
    trace.push({ type: "done", result: { mstWeight: 0, mstEdges: [] } });
    return { trace, result: { mstWeight: 0, mstEdges: [] } };
  }

  // Build adjacency list (undirected)
  const adjacency: Record<string, Array<{ node: string; weight: number }>> = {};
  nodes.forEach((node) => { adjacency[node] = []; });
  edges.forEach(({ from, to, weight }) => {
    if (adjacency[from]) adjacency[from].push({ node: to, weight });
    if (adjacency[to]) adjacency[to].push({ node: from, weight });
  });

  const inMST = new Set<string>();
  const key: Record<string, number> = {};
  const parent: Record<string, string | null> = {};

  nodes.forEach((node) => {
    key[node] = Infinity;
    parent[node] = null;
  });
  key[start] = 0;

  trace.push({
    type: "update_distance",
    node: start,
    distance: 0,
    note: `Inițializez: cheia nodului sursă „${start}" = 0, restul = ∞`,
    vars: { key: { ...key }, inMST: [] },
  });

  const mstEdges: Array<{ from: string; to: string; weight: number }> = [];
  let mstWeight = 0;

  for (let step = 0; step < nodes.length; step++) {
    // Pick minimum key node not in MST
    let u: string | null = null;
    let minKey = Infinity;
    for (const node of nodes) {
      if (!inMST.has(node) && key[node] < minKey) {
        minKey = key[node];
        u = node;
      }
    }

    if (u === null) break;

    inMST.add(u);

    trace.push({
      type: "visit_node",
      node: u,
      note: `Adaug nodul „${u}" în APM (cheie minimă = ${key[u]})`,
      vars: { inMST: Array.from(inMST), key: { ...key }, mstWeight },
    });

    if (parent[u] !== null) {
      const edgeWeight = key[u];
      mstEdges.push({ from: parent[u]!, to: u, weight: edgeWeight });
      mstWeight += edgeWeight;
    }

    for (const { node: v, weight } of adjacency[u] || []) {
      if (!inMST.has(v) && weight < key[v]) {
        parent[v] = u;
        key[v] = weight;

        trace.push({
          type: "update_distance",
          node: v,
          distance: weight,
          note: `Actualizez cheia lui „${v}" = ${weight} (prin „${u}")`,
          vars: { from: u, to: v, weight, key: { ...key } },
        });
      }
    }
  }

  trace.push({
    type: "done",
    result: { mstWeight, mstEdges },
    note: `APM finalizat. Cost total: ${mstWeight}`,
    vars: { mstEdges, mstWeight },
  });

  return { trace, result: { mstWeight, mstEdges } };
}
