import { AlgorithmResult, TraceEvent } from "../types";

export function bellmanFordInstrumented(input: {
  nodes: string[];
  edges: Array<{ from: string; to: string; weight: number }>;
  start: string;
}): AlgorithmResult {
  const { nodes, edges, start } = input;
  const trace: TraceEvent[] = [];

  if (nodes.length === 0) {
    trace.push({ type: "done", result: { distances: {}, hasNegativeCycle: false } });
    return { trace, result: { distances: {}, hasNegativeCycle: false } };
  }

  const distances: Record<string, number> = {};
  nodes.forEach((node) => {
    distances[node] = node === start ? 0 : Infinity;
  });

  trace.push({
    type: "update_distance",
    node: start,
    distance: 0,
    note: `Inițializez distanțele: sursă „${start}" = 0, restul = ∞`,
    vars: { distances: { ...distances } },
  });

  const V = nodes.length;

  for (let i = 0; i < V - 1; i++) {
    let relaxed = false;

    for (const edge of edges) {
      const { from, to, weight } = edge;

      if (distances[from] === Infinity) continue;

      trace.push({
        type: "visit_node",
        node: from,
        note: `Iterația ${i + 1}: relaxez muchia ${from} → ${to} (cost ${weight})`,
        vars: { iteratie: i + 1, muchie: `${from}→${to}`, cost: weight, distances: { ...distances } },
      });

      const newDist = distances[from] + weight;
      if (newDist < distances[to]) {
        distances[to] = newDist;
        relaxed = true;

        trace.push({
          type: "update_distance",
          node: to,
          distance: newDist,
          note: `Drum mai scurt găsit: dist[${to}] = ${newDist} (prin ${from})`,
          vars: { from, to, weight, newDist, distances: { ...distances } },
        });
      }
    }

    if (!relaxed) {
      trace.push({
        type: "visit_node",
        node: start,
        note: `Nicio relaxare în iterația ${i + 1} — algoritmul converge timpuriu`,
        vars: { iteratie: i + 1, distances: { ...distances } },
      });
      break;
    }
  }

  let hasNegativeCycle = false;
  for (const edge of edges) {
    const { from, to, weight } = edge;
    if (distances[from] !== Infinity && distances[from] + weight < distances[to]) {
      hasNegativeCycle = true;
      break;
    }
  }

  if (hasNegativeCycle) {
    trace.push({
      type: "done",
      result: { distances, hasNegativeCycle: true },
      note: "Ciclu de cost negativ detectat! Distanțele nu sunt valide.",
      vars: { distances: { ...distances }, hasNegativeCycle: true },
    });
  } else {
    trace.push({
      type: "done",
      result: { distances, hasNegativeCycle: false },
      note: "Algoritmul Bellman-Ford s-a terminat. Niciun ciclu negativ.",
      vars: { distances: { ...distances }, hasNegativeCycle: false },
    });
  }

  return { trace, result: { distances, hasNegativeCycle } };
}
