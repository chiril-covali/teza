import heapq
from typing import Any, Dict, List, Tuple


def run(input: Dict[str, Any]) -> Dict[str, Any]:
    nodes: List[str] = list(input.get("nodes", []))
    edges: List[Dict[str, Any]] = list(input.get("edges", []))
    start: str = input.get("start", "")

    graph: Dict[str, List[Tuple[str, float]]] = {node: [] for node in nodes}
    for edge in edges:
        src = edge.get("from")
        dst = edge.get("to")
        weight = float(edge.get("weight", 1))
        if src in graph and dst:
            graph[src].append((dst, weight))

    distances: Dict[str, float] = {node: float("inf") for node in nodes}
    if start not in distances:
        return {"trace": [{"type": "done", "result": {"distances": distances}}], "result": {"distances": distances}}

    distances[start] = 0.0
    trace: List[Dict[str, Any]] = [
        {"type": "update_distance", "node": start, "distance": 0.0, "note": "Init start distance"}
    ]

    heap: List[Tuple[float, str]] = [(0.0, start)]
    trace.append({"type": "queue", "action": "enqueue", "node": start})

    while heap:
        current_distance, node = heapq.heappop(heap)
        trace.append({"type": "queue", "action": "dequeue", "node": node})
        if current_distance > distances[node]:
            continue
        trace.append({"type": "visit_node", "node": node})

        for neighbor, weight in graph.get(node, []):
            new_distance = current_distance + weight
            if new_distance < distances.get(neighbor, float("inf")):
                distances[neighbor] = new_distance
                trace.append({"type": "update_distance", "node": neighbor, "distance": new_distance})
                heapq.heappush(heap, (new_distance, neighbor))
                trace.append({"type": "queue", "action": "enqueue", "node": neighbor})

    trace.append({"type": "done", "result": {"distances": distances}})
    return {"trace": trace, "result": {"distances": distances}}
