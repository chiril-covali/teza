# Parcurgere în lățime (BFS)

BFS explorează graful pe niveluri, folosind o coadă pentru a vizita vecinii fiecărui nod.

**Steps**
1. Enqueue the start node, mark visited.
2. Dequeue a node, visit it, and enqueue unvisited neighbors.
3. Repeat until the queue is empty.

**Pseudocode**
```
queue <- [start]
visited <- {start}
while queue not empty:
  v <- dequeue(queue)
  for each neighbor of v:
    if neighbor not visited:
      visited.add(neighbor)
      enqueue(queue, neighbor)
```

**Use cases**
- Shortest path in unweighted graphs.
- Level-order traversal in trees.
