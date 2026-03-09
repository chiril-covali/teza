"""
Sortarea prin selecție - Selection Sort
Găsește repetat elementul minim și îl plasează la început.
"""

from typing import Any, Dict


def run(array: list[int]) -> Dict[str, Any]:
    """
    Sortează array-ul folosind algoritmul de sortare prin selecție.
    
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
        "message": f"Începem sortarea prin selecție. Array-ul are {n} elemente.",
        "vars": {"n": n}
    })
    
    # Iterăm prin fiecare poziție
    for i in range(n - 1):
        # Găsim minimul din partea nesortată
        min_idx = i
        
        trace.append({
            "type": "select_position",
            "array": arr.copy(),
            "highlighted": [i],
            "message": f"Căutăm minimul pentru poziția {i}. Presupunem că minimul este {arr[i]}.",
            "vars": {"i": i, "min_idx": min_idx, "current_min": arr[min_idx]}
        })
        
        # Căutăm minimul în restul array-ului
        for j in range(i + 1, n):
            trace.append({
                "type": "compare",
                "array": arr.copy(),
                "highlighted": [min_idx, j],
                "message": f"Comparăm {arr[j]} cu minimul curent {arr[min_idx]}",
                "vars": {"j": j, "arr[j]": arr[j], "min_idx": min_idx, "arr[min_idx]": arr[min_idx]}
            })
            
            if arr[j] < arr[min_idx]:
                min_idx = j
                trace.append({
                    "type": "new_min",
                    "array": arr.copy(),
                    "highlighted": [min_idx],
                    "message": f"Găsit un minim nou: {arr[min_idx]} pe poziția {min_idx}",
                    "vars": {"min_idx": min_idx, "new_min": arr[min_idx]}
                })
        
        # Swap dacă am găsit un minim diferit
        if min_idx != i:
            trace.append({
                "type": "swap_prepare",
                "array": arr.copy(),
                "highlighted": [i, min_idx],
                "message": f"Schimbăm {arr[i]} (poziția {i}) cu {arr[min_idx]} (poziția {min_idx})",
                "vars": {"i": i, "min_idx": min_idx}
            })
            
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
            
            trace.append({
                "type": "swap_done",
                "array": arr.copy(),
                "highlighted": [i],
                "message": f"Swap efectuat. Minimul {arr[i]} este acum pe poziția {i}. Primele {i+1} elemente sunt sortate.",
                "vars": {"sorted_count": i + 1}
            })
        else:
            trace.append({
                "type": "no_swap",
                "array": arr.copy(),
                "highlighted": [i],
                "message": f"Elementul {arr[i]} este deja la poziția corectă. Primele {i+1} elemente sunt sortate.",
                "vars": {"sorted_count": i + 1}
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
