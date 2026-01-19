from typing import Any, Dict, List

from pydantic import BaseModel


class Complexity(BaseModel):
    best: str
    average: str
    worst: str


class Visualization(BaseModel):
    kind: str


class AlgorithmMeta(BaseModel):
    slug: str
    name: str
    category: str
    difficulty: str
    summary: str
    timeComplexity: Complexity
    spaceComplexity: str
    visualization: Visualization
    inputSchema: Dict[str, Any]
    defaultInput: Dict[str, Any]


class RunRequest(BaseModel):
    slug: str
    input: Dict[str, Any]


class RunResponse(BaseModel):
    trace: List[Any]
    result: Dict[str, Any]
    meta: Dict[str, Any]
