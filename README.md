# Algoritmi

Vizualizator educațional de algoritmi (MVP) într-un monorepo:
- **apps/web**: UI Next.js (App Router, TypeScript, Tailwind) cu vizualizări listă/graf, explicații pe pași și chat "Întreabă tutorul".
- **apps/api**: FastAPI care rulează doar algoritmii whitelistați și emite evenimentele de urmă (trace).

## Funcționalități
- Cinci algoritmi: sortarea cu bule, sortarea rapidă, căutare binară, parcurgere în lățime (BFS), algoritmul lui Dijkstra.
- Scheamă comună `TraceEvent` pentru web și API.
- Explicații deterministe pe pași din `/api/explain_step` (fără LLM).
- Chat `/api/chat` care folosește GitHub Models doar la cerere; răspuns de fallback când lipsesc credențialele.
- Model whitelist: rulează doar folderele prezente în `apps/api/matematica_api/algorithms`.

## Setup
### API (FastAPI)
1. `cd apps/api`
2. `python -m venv .venv && source .venv/bin/activate`
3. `pip install -r requirements.txt`
4. Rulează: `uvicorn main:app --reload --port 8000`

### Web (Next.js)
1. `cd apps/web`
2. `npm install`
3. Rulează: `npm run dev` (implicit http://localhost:3000) sau, din rădăcina repo-ului, `npm run dev` (delegat către workspace-ul web).

## Environment
Copy `.env.example` to `.env` in the repo root (or export vars) and set:
- `GITHUB_TOKEN` – GitHub Models token
- `GITHUB_MODELS_MODEL` – e.g. `gpt-4.1-mini`
- `GITHUB_MODELS_ENDPOINT` – implicit `https://models.github.ai/inference/chat/completions`

The same `GITHUB_TOKEN` is also used to query GitHub REST `/rate_limit` so the UI can show your remaining free-tier calls. Keep the token server-side; the frontend never exposes it.

If chat credentials are absent, `/api/chat` returns a friendly message and the UI shows that text.

## API surface
- `GET /api/algorithms` → list metadata from the registry
- `POST /api/run` → run selected algorithm; returns `trace`, `result`, and `meta.steps`
- `POST /api/explain_step` → deterministic text for a given trace event
- `POST /api/chat` → uses GitHub Models with meta + docs + current step context

## Notes
- CORS is open for local development (allowing http://localhost:3000).
- Algorithms live under `apps/api/matematica_api/algorithms/<slug>/` with `meta.json`, `docs.md`, and `algo.py`.
- Frontend reads `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:8000`).
