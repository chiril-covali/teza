from typing import Any, Dict, List


def run(input: Dict[str, Any]) -> Dict[str, Any]:
    arr: List[float] = list(input.get("array", []))
    trace: List[Dict[str, Any]] = []
    n = len(arr)

    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            trace.append(
                {"type": "compare", "indices": [j, j + 1], "values": [arr[j], arr[j + 1]]}
            )
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
                trace.append({"type": "swap", "indices": [j, j + 1], "array": arr.copy()})
        if not swapped:
            break

    trace.append({"type": "done", "result": {"sorted": arr}})
    return {"trace": trace, "result": {"sorted": arr}}
