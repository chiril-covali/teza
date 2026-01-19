from typing import Any, Dict, List


def run(input: Dict[str, Any]) -> Dict[str, Any]:
    arr: List[float] = list(input.get("array", []))
    target = input.get("target")
    trace: List[Dict[str, Any]] = []

    lo, hi = 0, len(arr) - 1
    found_index = -1

    while lo <= hi:
        mid = (lo + hi) // 2
        trace.append({"type": "compare", "indices": [mid, mid], "values": [arr[mid], target]})
        if arr[mid] == target:
            found_index = mid
            break
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1

    trace.append({"type": "done", "result": {"index": found_index}})
    return {"trace": trace, "result": {"index": found_index}}
