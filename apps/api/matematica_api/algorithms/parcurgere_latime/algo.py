from collections import deque
from typing import Any, Dict, List, Set


def run(input: Dict[str, Any]) -> Dict[str, Any]:
    nodes: List[str] = list(input.get("nodes", []))
    edges: List[Dict[str, Any]] = list(input.get("edges", []))
    start: str = input.get("start", "")

    adjacency: Dict[str, List[str]] = {node: [] for node in nodes}
    for edge in edges:
        src = edge.get("from")
        dst = edge.get("to")
        if src in adjacency and dst:
            adjacency[src].append(dst)

    trace: List[Dict[str, Any]] = []
    visited: Set[str] = set()
    order: List[str] = []

    if start and start in adjacency:
        queue = deque([start])
        visited.add(start)
        trace.append({"type": "queue", "action": "enqueue", "node": start})

        while queue:
            node = queue.popleft()
            trace.append({"type": "queue", "action": "dequeue", "node": node})
            trace.append({"type": "visit_node", "node": node})
            order.append(node)
            for neighbor in adjacency.get(node, []):
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
                    trace.append({"type": "queue", "action": "enqueue", "node": neighbor})

    trace.append({"type": "done", "result": {"order": order}})
    return {"trace": trace, "result": {"order": order}}
