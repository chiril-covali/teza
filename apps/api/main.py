from typing import Any, Dict, List, Optional

from dotenv import load_dotenv
from pydantic import BaseModel, TypeAdapter

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from matematica_api.models.algorithm import AlgorithmMeta, RunRequest, RunResponse
from matematica_api.models.chat import ChatRequest, ChatResponse
from matematica_api.models.trace import TraceEvent
from matematica_api.services.github_models import GithubModelsClient
from matematica_api.services.github_rest import fetch_rate_limit
from matematica_api.services.registry import AlgorithmRegistry
from matematica_api.services.runner import run_algorithm

app = FastAPI(title="Matematica Vizuală Asistată API", version="0.1.0")

# Load .env so GITHUB_TOKEN/GITHUB_MODELS_* are available when running locally
load_dotenv()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

registry = AlgorithmRegistry()
llm_client = GithubModelsClient()


class ExplainRequest(RunRequest):
    stepIndex: int
    event: TraceEvent
    context: Dict[str, Any]


class ExplainResponse(ChatResponse):
    pass


def explain_event(event: TraceEvent) -> str:
    def vars_text(vars_map: Optional[Dict[str, Any]]) -> str:
        if not vars_map:
            return ""
        pairs = ", ".join(f"{k}={v}" for k, v in vars_map.items())
        return f" Variabile: {pairs}."

    if event.type == "compare":
        a, b = event.indices
        values = event.values or (None, None)
        return f"Compar indexurile {a} și {b} (valori {values[0]} și {values[1]})." + vars_text(event.vars)
    if event.type == "swap":
        a, b = event.indices
        return f"Interschimb pozițiile {a} și {b}; tabloul devine {event.array}." + vars_text(event.vars)
    if event.type == "set":
        return f"Setez indexul {event.index} la {event.value}; tabloul devine {event.array}." + vars_text(event.vars)
    if event.type == "visit_node":
        return f"Vizitez nodul {event.node}." + vars_text(event.vars)
    if event.type == "queue":
        return f"{event.action.capitalize()} nodul {event.node} în coadă." + vars_text(event.vars)
    if event.type == "update_distance":
        return f"Actualizez distanța pentru nodul {event.node} la {event.distance}." + vars_text(event.vars)
    if event.type == "done":
        return ("Algoritm încheiat." if not event.result else f"Algoritm încheiat cu rezultatul {event.result}.") + vars_text(event.vars)
    return "Pas în procesare."


class CodeResponse(BaseModel):
    code: str


@app.get("/api/algorithms", response_model=List[AlgorithmMeta])
async def list_algorithms() -> List[AlgorithmMeta]:
    return registry.list_algorithms()


@app.post("/api/run", response_model=RunResponse)
async def run(request: RunRequest) -> RunResponse:
    meta = registry.get_meta(request.slug)
    if not meta:
        raise HTTPException(status_code=404, detail="Unknown algorithm slug")

    trace_data, result = run_algorithm(request.slug, request.input, registry)
    trace_adapter = TypeAdapter(TraceEvent)
    trace: List[TraceEvent] = []
    for event in trace_data:
        try:
            trace.append(trace_adapter.validate_python(event))
        except Exception as exc:  # noqa: BLE001
            raise HTTPException(status_code=400, detail=f"Invalid trace event: {exc}") from exc

    return RunResponse(trace=trace, result=result, meta={"steps": len(trace)})


@app.post("/api/explain_step", response_model=ExplainResponse)
async def explain_step(request: ExplainRequest) -> ExplainResponse:
    meta = registry.get_meta(request.slug)
    if not meta:
        raise HTTPException(status_code=404, detail="Unknown algorithm slug")
    text = explain_event(request.event)
    return ExplainResponse(answer=text)


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    meta = registry.get_meta(request.slug)
    if not meta:
        raise HTTPException(status_code=404, detail="Unknown algorithm slug")

    docs = registry.get_docs(request.slug)
    context_lines = [
        f"Algoritm: {meta.name} ({meta.category}, dificultate {meta.difficulty})",
        f"Rezumat: {meta.summary}",
        f"Complexitate timp: best {meta.timeComplexity.best}, medie {meta.timeComplexity.average}, worst {meta.timeComplexity.worst}",
        f"Spațiu: {meta.spaceComplexity}",
    ]
    if docs:
        context_lines.append("Docs:\n" + docs)

    current_event_text = ""
    if request.context.currentEvent:
        current_event_text = f"Eveniment curent: {request.context.currentEvent}"

    user_message = "\n".join(
        [
            "Ești un asistent AI de algoritmi. Răspunde concis și nu inventa informații.",
            "Dacă lipsesc date, spune acest lucru și ce ar trebui furnizat.",
            "Context:",
            *context_lines,
            f"Input utilizator: {request.context.input}",
            f"Index pas curent: {request.context.currentStepIndex}",
            current_event_text,
            f"Întrebare: {request.question}",
        ]
    )

    messages = [
        {"role": "system", "content": "Ești un AI concis și precis pentru Matematica Vizuală Asistată."},
        {"role": "user", "content": user_message},
    ]

    answer, error = llm_client.chat(messages)
    if error:
        return ChatResponse(answer=error)

    return ChatResponse(answer=answer or "I could not generate a response.")


@app.get("/api/code", response_model=CodeResponse)
async def get_code(slug: str) -> CodeResponse:
    meta = registry.get_meta(slug)
    if not meta:
        raise HTTPException(status_code=404, detail="Unknown algorithm slug")
    code = registry.get_code(slug)
    if not code:
        raise HTTPException(status_code=404, detail="Source not found")
    return CodeResponse(code=code)


@app.get("/api/rate_limit")
async def rate_limit() -> Dict[str, Any]:
    data, error = fetch_rate_limit()
    if error:
        return {"error": error}
    return data or {"error": "No data"}
