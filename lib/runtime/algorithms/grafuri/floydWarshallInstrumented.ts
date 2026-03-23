import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

const INF = Infinity;

export function floydWarshallInstrumented(input: {
  nodes: string[];
  edges: Array<{ from: string; to: string; weight: number }>;
}): AlgorithmResult {
  const { nodes, edges } = input;
  const trace: TraceEvent[] = [];

  if (nodes.length === 0) {
    trace.push({ type: "done", result: { distances: {} } });
    return { trace, result: { distances: {} } };
  }

  const n = nodes.length;
  const idx: Record<string, number> = {};
  nodes.forEach((node, i) => { idx[node] = i; });

  // Initialize distance matrix
  const dist: number[][] = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (__, j) => (i === j ? 0 : INF))
  );

  edges.forEach(({ from, to, weight }) => {
    if (idx[from] !== undefined && idx[to] !== undefined) {
      dist[idx[from]][idx[to]] = weight;
    }
  });

  trace.push({
    type: "visit_node",
    node: nodes[0],
    note: `Inițializez matricea distanțelor pentru ${n} noduri`,
    vars: { distanta: dist.map((row) => [...row]) },
  });

  for (let k = 0; k < n; k++) {
    const kNode = nodes[k];

    trace.push({
      type: "visit_node",
      node: kNode,
      note: `Nod intermediar k = „${kNode}" (iterația ${k + 1}/${n})`,
      vars: { intermediar: kNode },
    });

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] === INF || dist[k][j] === INF) continue;

        const newDist = dist[i][k] + dist[k][j];
        if (newDist < dist[i][j]) {
          dist[i][j] = newDist;

          trace.push({
            type: "update_distance",
            node: nodes[j],
            distance: newDist,
            note: `dist[${nodes[i]}][${nodes[j]}] = ${newDist} (prin ${kNode})`,
            vars: {
              de_la: nodes[i],
              la: nodes[j],
              intermediar: kNode,
              noua_distanta: newDist,
            },
          });
        }
      }
    }
  }

  // Build result as nested Record
  const distances: Record<string, Record<string, number>> = {};
  nodes.forEach((from, i) => {
    distances[from] = {};
    nodes.forEach((to, j) => {
      distances[from][to] = dist[i][j];
    });
  });

  trace.push({
    type: "done",
    result: { distances },
    note: "Floyd-Warshall finalizat. Toate drumurile cele mai scurte au fost calculate.",
    vars: { distances },
  });

  return { trace, result: { distances } };
}
