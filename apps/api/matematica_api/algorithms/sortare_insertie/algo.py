"""
Sortarea prin inserție - Insertion Sort
Construiește incremental o secvență sortată inserând fiecare element la poziția corectă.
"""

from typing import Any, Dict


def run(array: list[int]) -> Dict[str, Any]:
    """
    Sortează array-ul folosind algoritmul de sortare prin inserție.
    
    Args:
        array: Lista de numere de sortat
        
    Returns:
        Dict cu trace (pași de execuție) și result (array sortat)
    """
    trace = []
    arr = array.copy()
    n = len(arr)
    
    # Pasul inițial
    trace.append({
        "type": "start",
        "array": arr.copy(),
        "message": f"Începem sortarea prin inserție. Array-ul are {n} elemente.",
        "vars": {"n": n}
    })
    
    # Iterăm prin fiecare element începând de la al doilea
    for i in range(1, n):
        key = arr[i]
        trace.append({
            "type": "select_key",
            "array": arr.copy(),
            "highlighted": [i],
            "message": f"Selectăm elementul pe poziția {i}: {key}",
            "vars": {"i": i, "key": key}
        })
        
        j = i - 1
        
        # Mutăm elementele mai mari decât key cu o poziție la dreapta
        moved_count = 0
        while j >= 0 and arr[j] > key:
            trace.append({
                "type": "compare",
                "array": arr.copy(),
                "highlighted": [j, j + 1],
                "message": f"Comparăm: {arr[j]} > {key}? Da, mutăm {arr[j]} la dreapta",
                "vars": {"j": j, "arr[j]": arr[j], "key": key}
            })
            
            arr[j + 1] = arr[j]
            moved_count += 1
            j -= 1
            
            trace.append({
                "type": "shift",
                "array": arr.copy(),
                "highlighted": [j + 2] if j + 2 < n else [],
                "message": f"Element mutat la poziția {j + 2}",
                "vars": {"j": j}
            })
        
        # Inserăm key la poziția corectă
        arr[j + 1] = key
        trace.append({
            "type": "insert",
            "array": arr.copy(),
            "highlighted": [j + 1],
            "message": f"Inserăm {key} la poziția {j + 1}. Secvență sortată până la poziția {i}.",
            "vars": {"key": key, "position": j + 1, "moved": moved_count}
        })
    
    # Pasul final
    trace.append({
        "type": "done",
        "array": arr.copy(),
        "message": f"Sortare completă! Array-ul este acum sortat crescător.",
        "vars": {"sorted_array": arr}
    })
    
    return {
        "trace": trace,
        "result": {"sorted": arr}
    }
