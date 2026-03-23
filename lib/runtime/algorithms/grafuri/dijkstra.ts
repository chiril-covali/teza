import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

export function dijkstra(input: {
  nodes: string[];
  edges: Array<{ from: string; to: string; weight: number }>;
  start: string;
}): AlgorithmResult {
  const { nodes, edges, start } = input;
  const graph: Record<string, Array<[string, number]>> = {};

  nodes.forEach((node) => {
    graph[node] = [];
  });

  edges.forEach((edge) => {
    if (graph[edge.from]) {
      graph[edge.from].push([edge.to, edge.weight || 1]);
    }
  });

  const distances: Record<string, number> = {};
  nodes.forEach((node) => {
    distances[node] = Infinity;
  });

  if (!distances.hasOwnProperty(start)) {
    return {
      trace: [{ type: "done", result: { distances } }],
      result: { distances },
    };
  }

  distances[start] = 0;
  const trace: TraceEvent[] = [
    {
      type: "update_distance",
      node: start,
      distance: 0,
      note: "inițializez distanța pentru sursă",
      vars: { distances: { ...distances } },
    },
  ];

  const heap: Array<[number, string]> = [[0, start]];

  trace.push({
    type: "queue",
    action: "enqueue",
    node: start,
    note: "adaug sursa în coadă",
    vars: { heap: heap.map((h) => h[1]) },
  });

  while (heap.length > 0) {
    heap.sort((a, b) => a[0] - b[0]);
    const [currentDistance, node] = heap.shift()!;

    trace.push({
      type: "queue",
      action: "dequeue",
      node,
      note: "extrag nodul cu distanța minimă",
      vars: { current_distance: currentDistance },
    });

    if (currentDistance > distances[node]) continue;

    trace.push({
      type: "visit_node",
      node,
      note: "marchez nodul ca procesat",
      vars: { distances: { ...distances } },
    });

    for (const [neighbor, weight] of graph[node] || []) {
      const newDistance = currentDistance + weight;
      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;

        trace.push({
          type: "update_distance",
          node: neighbor,
          distance: newDistance,
          note: "găsesc drum mai scurt",
          vars: {
            from: node,
            neighbor,
            weight,
            distances: { ...distances },
          },
        });

        heap.push([newDistance, neighbor]);

        trace.push({
          type: "queue",
          action: "enqueue",
          node: neighbor,
          note: "actualizez coada cu noua distanță",
          vars: { heap: heap.map((h) => h[1]) },
        });
      }
    }
  }

  trace.push({
    type: "done",
    result: { distances },
    vars: { nodes },
  });

  return { trace, result: { distances } };
}
