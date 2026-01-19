import importlib
from typing import Any, Dict, Tuple

from fastapi import HTTPException

from .registry import AlgorithmRegistry


def run_algorithm(slug: str, payload: Dict[str, Any], registry: AlgorithmRegistry) -> Tuple[list, dict]:
    meta = registry.get_meta(slug)
    if not meta:
        raise HTTPException(status_code=404, detail="Algorithm not found")

    module_path = registry.algorithm_module_path(slug)
    if not module_path:
        raise HTTPException(status_code=500, detail="Algorithm module missing")

    try:
        module = importlib.import_module(module_path)
    except ModuleNotFoundError as exc:
        raise HTTPException(status_code=500, detail="Algorithm module missing") from exc

    if not hasattr(module, "run"):
        raise HTTPException(status_code=500, detail="Algorithm run() function not found")

    result = module.run(payload)
    if not isinstance(result, dict):
        raise HTTPException(status_code=500, detail="Algorithm run() must return a dict")

    trace = result.get("trace", [])
    output = result.get("result", {})
    return trace, output
