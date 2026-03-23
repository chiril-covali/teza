/**
 * Dijkstra simplificat pentru grafuri cu ponderi pozitive.
 * Graful este: { A: [{ to: "B", weight: 3 }, ...] }
 */
export const dijkstra = (
  graph: Record<string, Array<{ to: string; weight: number }>>,
  start: string
): Record<string, number> => {
  const distances: Record<string, number> = {};
  const visited = new Set<string>();

  for (const node of Object.keys(graph)) {
    distances[node] = Number.POSITIVE_INFINITY;
  }
  distances[start] = 0;

  while (visited.size < Object.keys(graph).length) {
    let current: string | null = null;
    let best = Number.POSITIVE_INFINITY;

    for (const [node, distance] of Object.entries(distances)) {
      if (!visited.has(node) && distance < best) {
        best = distance;
        current = node;
      }
    }

    if (!current) {
      break;
    }

    visited.add(current);

    for (const edge of graph[current] || []) {
      const candidate = distances[current] + edge.weight;
      if (candidate < (distances[edge.to] ?? Number.POSITIVE_INFINITY)) {
        distances[edge.to] = candidate;
      }
    }
  }

  return distances;
};
