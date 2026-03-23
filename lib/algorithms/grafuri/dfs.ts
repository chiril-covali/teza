/**
 * Parcurgere DFS intr-un graf reprezentat ca lista de adiacenta.
 */
export const dfs = (graph: Record<string, string[]>, start: string): string[] => {
  const visited = new Set<string>();
  const order: string[] = [];
  const stack: string[] = [start];

  while (stack.length > 0) {
    const node = stack.pop() as string;
    if (visited.has(node)) {
      continue;
    }

    visited.add(node);
    order.push(node);

    const neighbors = graph[node] || [];
    for (let i = neighbors.length - 1; i >= 0; i -= 1) {
      const next = neighbors[i];
      if (!visited.has(next)) {
        stack.push(next);
      }
    }
  }

  return order;
};
