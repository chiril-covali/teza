from typing import Annotated, List, Literal, Optional, Tuple, Union

from pydantic import BaseModel, Field


class CompareEvent(BaseModel):
    type: Literal["compare"]
    indices: Tuple[int, int]
    values: Optional[Tuple[float, float]] = None
    note: Optional[str] = None


class SwapEvent(BaseModel):
    type: Literal["swap"]
    indices: Tuple[int, int]
    array: List[float]
    note: Optional[str] = None


class SetEvent(BaseModel):
    type: Literal["set"]
    index: int
    value: float
    array: List[float]
    note: Optional[str] = None


class VisitNodeEvent(BaseModel):
    type: Literal["visit_node"]
    node: str
    note: Optional[str] = None


class QueueEvent(BaseModel):
    type: Literal["queue"]
    action: Literal["enqueue", "dequeue"]
    node: str
    note: Optional[str] = None


class UpdateDistanceEvent(BaseModel):
    type: Literal["update_distance"]
    node: str
    distance: float
    note: Optional[str] = None


class DoneEvent(BaseModel):
    type: Literal["done"]
    result: Optional[dict] = None
    note: Optional[str] = None


TraceEvent = Annotated[
    Union[
        CompareEvent,
        SwapEvent,
        SetEvent,
        VisitNodeEvent,
        QueueEvent,
        UpdateDistanceEvent,
        DoneEvent,
    ],
    Field(discriminator="type"),
]
