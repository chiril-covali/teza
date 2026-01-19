# Dijkstra's Algorithm

Finds shortest paths from a single source in graphs with non-negative edge weights using a priority queue.

**Steps**
1. Initialize all distances to infinity except the start node (0).
2. Pop the node with the smallest tentative distance.
3. Relax its outgoing edges; if a shorter path is found, update the neighbor's distance and push it.
4. Continue until the queue is empty.

**Pseudocode**
```
dist[start] <- 0; others <- inf
pq <- [(0, start)]
while pq not empty:
  d, u <- pop_min(pq)
  if d > dist[u]: continue
  for (u, v, w) in edges:
    if dist[u] + w < dist[v]:
      dist[v] <- dist[u] + w
      push(pq, (dist[v], v))
```

**Notes**
- Requires non-negative weights.
- Complexity O((V+E) log V) with a binary heap.
