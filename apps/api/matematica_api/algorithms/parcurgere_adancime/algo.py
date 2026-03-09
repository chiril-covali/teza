"""
Parcurgerea în adâncime (DFS - Depth First Search)
Explorează graful mergând cât mai adânc posibil pe fiecare ramură.
"""

from typing import Any, Dict, List
from collections import defaultdict


def run(nodes: List[str], edges: List[Dict[str, str]], start: str) -> Dict[str, Any]:
    """
    Parcurge graful în adâncime începând din nodul start.
    
    Args:
        nodes: Lista de noduri
        edges: Lista de muchii (obiecte cu from și to)
        start: Nodul de pornire
        
    Returns:
        Dict cu trace (pași de execuție) și result (ordinea de vizitare)
    """
    trace = []
    
    # Construim lista de adiacență
    graph = defaultdict(list)
    for edge in edges:
        u, v = edge["from"], edge["to"]
        graph[u].append(v)
        graph[v].append(u)  # Graf neorientat
    
    visited = set()
    order = []
    stack = []
    
    trace.append({
        "type": "start",
        "nodes": {node: {"visited": False, "type": "default"} for node in nodes},
        "edges": edges,
        "message": f"Începem DFS din nodul {start}. Folosim un stack pentru backtracking.",
        "vars": {"start": start, "total_nodes": len(nodes)}
    })
    
    def dfs_iterative(node: str):
        """DFS iterativ folosind stack explicit"""
        stack.append(node)
        
        trace.append({
            "type": "push_stack",
            "nodes": {n: {"visited": n in visited, "type": "current" if n == node else "default"} for n in nodes},
            "edges": edges,
            "message": f"Adăugăm {node} în stack. Stack: {stack}",
            "vars": {"stack": stack.copy(), "node": node}
        })
        
        while stack:
            current = stack.pop()
            
            trace.append({
                "type": "pop_stack",
                "nodes": {n: {"visited": n in visited, "type": "current" if n == current else "default"} for n in nodes},
                "edges": edges,
                "message": f"Extragem {current} din stack. Stack: {stack}",
                "vars": {"stack": stack.copy(), "current": current}
            })
            
            if current in visited:
                trace.append({
                    "type": "already_visited",
                    "nodes": {n: {"visited": n in visited, "type": "default"} for n in nodes},
                    "edges": edges,
                    "message": f"Nodul {current} a fost deja vizitat. Sărim peste el.",
                    "vars": {"current": current}
                })
                continue
            
            # Marcăm ca vizitat
            visited.add(current)
            order.append(current)
            
            trace.append({
                "type": "visit",
                "nodes": {n: {"visited": n in visited, "type": "active" if n == current else "default"} for n in nodes},
                "edges": edges,
                "message": f"Vizităm nodul {current}. Ordinea: {' → '.join(order)}",
                "vars": {"current": current, "order": order.copy(), "visited_count": len(visited)}
            })
            
            # Adăugăm vecinii nevizitați în stack (în ordine inversă pentru a păstra ordinea logică)
            neighbors = [n for n in graph[current] if n not in visited]
            if neighbors:
                trace.append({
                    "type": "explore_neighbors",
                    "nodes": {n: {"visited": n in visited, "type": "neighbor" if n in neighbors else "default"} for n in nodes},
                    "edges": edges,
                    "message": f"Explorăm vecinii lui {current}: {neighbors}. Îi adăugăm în stack.",
                    "vars": {"current": current, "neighbors": neighbors}
                })
                
                # Inversăm pentru a păstra ordinea alfabetică în parcurgere
                for neighbor in reversed(neighbors):
                    stack.append(neighbor)
                    
                trace.append({
                    "type": "update_stack",
                    "nodes": {n: {"visited": n in visited, "type": "default"} for n in nodes},
                    "edges": edges,
                    "message": f"Stack actualizat: {stack}",
                    "vars": {"stack": stack.copy()}
                })
            else:
                trace.append({
                    "type": "no_neighbors",
                    "nodes": {n: {"visited": n in visited, "type": "default"} for n in nodes},
                    "edges": edges,
                    "message": f"Nodul {current} nu are vecini nevizitați. Backtracking...",
                    "vars": {"current": current}
                })
    
    # Pornim DFS
    dfs_iterative(start)
    
    # Verificăm noduri neaccesibile
    unvisited = [n for n in nodes if n not in visited]
    if unvisited:
        trace.append({
            "type": "disconnected",
            "nodes": {n: {"visited": n in visited, "type": "default"} for n in nodes},
            "edges": edges,
            "message": f"Graf deconectat! Noduri neaccesibile din {start}: {unvisited}",
            "vars": {"unvisited": unvisited}
        })
    
    trace.append({
        "type": "done",
        "nodes": {n: {"visited": n in visited, "type": "default"} for n in nodes},
        "edges": edges,
        "message": f"DFS complet! Ordinea de vizitare: {' → '.join(order)}",
        "vars": {"order": order, "total_visited": len(visited)}
    })
    
    return {
        "trace": trace,
        "result": {"order": order, "visited": list(visited)}
    }
