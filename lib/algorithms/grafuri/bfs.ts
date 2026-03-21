import { AlgorithmResult, TraceEvent } from "../types";

export function bfs(input: {
  nodes: string[];
  edges: Array<{ from: string; to: string }>;
  start: string;
}): AlgorithmResult {
  const { nodes, edges, start } = input;
  const adjacency: Record<string, string[]> = {};

  nodes.forEach((node) => {
    adjacency[node] = [];
  });

  edges.forEach((edge) => {
    if (adjacency[edge.from]) {
      adjacency[edge.from].push(edge.to);
    }
  });

  const trace: TraceEvent[] = [];
  const visited = new Set<string>();
  const order: string[] = [];

  if (start && adjacency[start]) {
    const queue = [start];
    visited.add(start);

    trace.push({
      type: "queue",
      action: "enqueue",
      node: start,
      note: `Pornim BFS de la nodul sursă „${start}". Îl adăugăm în coadă și îl marcăm ca vizitat.`,
      vars: { queue: [...queue], visited: Array.from(visited) },
    });

    while (queue.length > 0) {
      const node = queue.shift()!;

      trace.push({
        type: "queue",
        action: "dequeue",
        node,
        note: "scot din coadă pentru procesare",
        vars: { queue: [...queue], visited: Array.from(visited) },
      });

      trace.push({
        type: "visit_node",
        node,
        note: "vizitez nodul curent",
        vars: { order: [...order, node] },
      });

      order.push(node);

      for (const neighbor of adjacency[node] || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);

          trace.push({
            type: "queue",
            action: "enqueue",
            node: neighbor,
            note: "adaug vecinul nevizitat",
            vars: { queue: [...queue], visited: Array.from(visited) },
          });
        }
      }
    }
  }

  trace.push({
    type: "done",
    result: { order },
    vars: { visited: Array.from(visited) },
  });

  return { trace, result: { order } };
}
