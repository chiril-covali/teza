import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

export function dfs(input: {
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
  const stack: string[] = [];

  if (start && adjacency[start]) {
    stack.push(start);

    trace.push({
      type: "queue",
      action: "enqueue",
      node: start,
      note: "adaug sursa în stack",
      vars: { stack: [...stack], visited: Array.from(visited) },
    });

    while (stack.length > 0) {
      const node = stack.pop()!;

      if (!visited.has(node)) {
        visited.add(node);
        order.push(node);

        trace.push({
          type: "visit_node",
          node,
          note: "vizitez nodul",
          vars: { stack: [...stack], visited: Array.from(visited), order: [...order] },
        });

        const neighbors = (adjacency[node] || [])
          .filter((n) => !visited.has(n))
          .reverse();

        for (const neighbor of neighbors) {
          stack.push(neighbor);
        }

        if (neighbors.length > 0) {
          trace.push({
            type: "queue",
            action: "enqueue",
            node: neighbors[0],
            note: "adaug vecinii în stack",
            vars: { stack: [...stack], neighbors },
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
