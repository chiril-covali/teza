CODE = """
def dfs(graph, start):
    visited = set()
    order = []
    stack = [start]
    
    while stack:
        node = stack.pop()  # Extragem ultimul nod adăugat
        
        if node in visited:
            continue
        
        # Vizităm nodul
        visited.add(node)
        order.append(node)
        
        # Adăugăm vecinii nevizitați în stack
        for neighbor in reversed(graph[node]):
            if neighbor not in visited:
                stack.append(neighbor)
    
    return order

# Versiune recursivă
def dfs_recursive(graph, node, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(node)
    print(node, end=' ')
    
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited)
"""
