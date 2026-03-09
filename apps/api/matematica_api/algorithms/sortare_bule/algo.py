from typing import Any, Dict, List


def run(input: Dict[str, Any]) -> Dict[str, Any]:
    arr: List[float] = list(input.get("array", []))
    trace: List[Dict[str, Any]] = []
    n = len(arr)

    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            trace.append(
                {
                    "type": "compare",
                    "indices": [j, j + 1],
                    "values": [arr[j], arr[j + 1]],
                    "note": "compar elementele adiacente",
                    "vars": {"i": i, "j": j, "n": n},
                }
            )
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
                trace.append(
                    {
                        "type": "swap",
                        "indices": [j, j + 1],
                        "array": arr.copy(),
                        "note": "interschimb pentru a plasa elementul mai mic în stânga",
                        "vars": {"i": i, "j": j, "swapped": swapped},
                    }
                )
        if not swapped:
            break

    trace.append({"type": "done", "result": {"sorted": arr}, "vars": {"n": n}})
    return {"trace": trace, "result": {"sorted": arr}}
