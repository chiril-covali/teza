from typing import Any, Dict, Optional

from pydantic import BaseModel

from .trace import TraceEvent


class ChatContext(BaseModel):
    input: Dict[str, Any]
    currentStepIndex: Optional[int] = None
    currentEvent: Optional[TraceEvent] = None


class ChatRequest(BaseModel):
    slug: str
    question: str
    context: ChatContext


class ChatResponse(BaseModel):
    answer: str
