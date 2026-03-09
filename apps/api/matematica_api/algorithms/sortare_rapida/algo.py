from typing import Any, Dict, List, Tuple


def _partition(arr: List[float], low: int, high: int, trace: List[Dict[str, Any]]) -> int:
    pivot = arr[high]
    i = low
    for j in range(low, high):
        trace.append(
            {
                "type": "compare",
                "indices": [j, high],
                "values": [arr[j], pivot],
                "note": "compar cu pivotul curent",
                "vars": {"low": low, "high": high, "pivot": pivot, "i": i, "j": j},
            }
        )
        if arr[j] <= pivot:
            arr[i], arr[j] = arr[j], arr[i]
            trace.append(
                {
                    "type": "swap",
                    "indices": [i, j],
                    "array": arr.copy(),
                    "note": "mut elementul mai mic înaintea pivotului",
                    "vars": {"i": i, "j": j, "pivot": pivot},
                }
            )
            i += 1
    arr[i], arr[high] = arr[high], arr[i]
    trace.append(
        {
            "type": "swap",
            "indices": [i, high],
            "array": arr.copy(),
            "note": "așez pivotul la poziția finală",
            "vars": {"pivot_index": i, "pivot": pivot},
        }
    )
    return i


def _quick_sort_iterative(arr: List[float], trace: List[Dict[str, Any]]) -> None:
    stack: List[Tuple[int, int]] = [(0, len(arr) - 1)]
    while stack:
        low, high = stack.pop()
        if low >= high:
            continue
        pivot_index = _partition(arr, low, high, trace)
        if pivot_index - 1 > low:
            stack.append((low, pivot_index - 1))
        if pivot_index + 1 < high:
            stack.append((pivot_index + 1, high))


def run(input: Dict[str, Any]) -> Dict[str, Any]:
    arr: List[float] = list(input.get("array", []))
    trace: List[Dict[str, Any]] = []
    if arr:
        _quick_sort_iterative(arr, trace)
    trace.append({"type": "done", "result": {"sorted": arr}, "vars": {"n": len(arr)}})
    return {"trace": trace, "result": {"sorted": arr}}
