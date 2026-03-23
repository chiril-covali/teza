/**
 * Parcurgere BFS intr-un graf reprezentat ca lista de adiacenta.
 */
export const bfs = (graph: Record<string, string[]>, start: string): string[] => {
  const visited = new Set<string>();
  const order: string[] = [];
  const queue: string[] = [start];

  while (queue.length > 0) {
    const node = queue.shift() as string;
    if (visited.has(node)) {
      continue;
    }

    visited.add(node);
    order.push(node);

    const neighbors = graph[node] || [];
    for (const next of neighbors) {
      if (!visited.has(next)) {
        queue.push(next);
      }
    }
  }

  return order;
};
