# Matematica Vizuală Asistată 🎓

O platformă educațională interactivă de tip "Duolingo pentru algoritmi" cu vizualizări pas-cu-pas, AI tutor, și quiz-uri.

## 🎯 Features

### Algoritmi (8 total)
**Sortare (5):**
- ✅ Bubble Sort (Sortarea cu bule)
- ✅ Quick Sort (Sortarea rapidă)  
- ✅ Insertion Sort (Sortarea prin inserție)
- ✅ Selection Sort (Sortarea prin selecție)

**Căutare (1):**
- ✅ Binary Search (Căutare binară)

**Grafuri (3):**
- ✅ Dijkstra (Shortest path cu costuri)
- ✅ BFS (Parcurgere în lățime)
- ✅ DFS (Parcurgere în adâncime)

### 🎨 UI Features
- 📱 **Mobile-first design** cu tabs (Vizualizare | Input | Chat | Quiz)
- 🎨 **Tema albă educational** optimizată pentru studiu
- 📊 **Vizualizări interactive**: Array (bare colorate) + Graph (noduri/muchii)
- ▶️ **Playback controls**: Play/Pause, Step-by-step, Speed control
- 📝 **Code viewer** pentru fiecare algoritm
- 📚 **Documentație completă** (complexitate, use cases, comparații)

### 🤖 AI Tutor
- 💬 **Chat contextual** cu GitHub Models AI
- 💡 **3 întrebări sugerate** (generale, complexitate, pas curent)
- 📜 **Chat history** persistent în sesiune
- 🔄 **Clear conversation** button

### 🎯 Quiz-uri educaționale
- 📝 **3 întrebări per algoritm** (ușor/mediu/greu)
- ✅ **Răspunsuri cu explicații** detaliate  
- 🏆 **Sistem de scoruri** cu feedback motivațional
- 🔄 **Restart** pentru a încerca din nou

## 🚀 Quick Start

### Folosind script-urile automate:
```bash
# Pornește aplicația (API + Frontend)
./start.sh

# Oprește aplicația
./stop.sh
```

### Manual (Terminal separate):

**Terminal 1 - API (FastAPI):**
```bash
cd apps/api
/Users/covali/Documents/Universitate/Teza/.venv311/bin/python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend (Next.js):**
```bash
cd apps/web
npm run dev
```

**URLs:**
- Frontend: http://localhost:3000
- API: http://localhost:8000
- API Docs: http://localhost:8000/docs

📖 Pentru detalii complete vezi [START.md](./START.md)

## 📦 Tech Stack

### Frontend
- **Next.js 15** (App Router, React 19)
- **TypeScript** pentru type safety
- **Tailwind CSS** pentru styling
- **Primer Octicons** pentru iconițe

### Backend  
- **FastAPI** (Python 3.11)
- **Uvicorn** ASGI server
- **GitHub Models AI** pentru chat
- **Pydantic** pentru validare

## 🏗️ Arhitectură

```
apps/
├── api/                           # FastAPI backend
│   ├── main.py                   # API endpoints
│   ├── requirements.txt          # Python dependencies
│   └── matematica_api/
│       ├── algorithms/           # Algoritmi (8 total)
│       │   ├── sortare_bule/
│       │   ├── sortare_rapida/
│       │   ├── sortare_insertie/  ← NOU
│       │   ├── selection_sort/     ← NOU
│       │   ├── cautare_binara/
│       │   ├── dijkstra/
│       │   ├── parcurgere_latime/
│       │   └── parcurgere_adancime/ ← NOU
│       ├── models/               # Pydantic models
│       └── services/             # Business logic
│
└── web/                          # Next.js frontend
    ├── app/                      # Pages (App Router)
    │   ├── page.tsx             # Homepage
    │   ├── layout.tsx           # Root layout
    │   └── algorithms/
    │       ├── page.tsx         # Catalog
    │       └── [slug]/
    │           └── page.tsx     # Player
    ├── components/              # React components
    │   ├── array-visualizer.tsx
    │   ├── graph-visualizer.tsx
    │   ├── suggested-questions.tsx
    │   └── algorithm-quiz.tsx    ← NOU
    └── lib/                     # Utilities
```

## 🔧 Setup detaliat

### 1. Clonare și instalare

```bash
# Clonare repo
git clone https://github.com/chiril-covali/teza.git
cd teza
```

### 2. Backend (Python 3.11)
```bash
# Creare venv
python3.11 -m venv .venv311
source .venv311/bin/activate

# Instalare dependențe
cd apps/api
pip install -r requirements.txt
```

### 3. Frontend (Node.js)
```bash
cd apps/web
npm install
```

### 4. Environment Variables

Creează `.env` în root cu:
```env
# GitHub Models AI (opțional - pentru chat)
GITHUB_TOKEN=ghp_...
GITHUB_MODELS_MODEL=gpt-4o-mini
GITHUB_MODELS_ENDPOINT=https://models.github.ai/inference/chat/completions

# Next.js
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Notă**: Chat-ul funcționează și fără token, returnând un mesaj informativ.

## 📡 API Endpoints

### Algoritmi
- `GET /api/algorithms` - Lista tuturor algoritmilor
- `POST /api/run` - Rulează algoritm cu input
- `GET /api/code` - Obține codul sursă

### AI & Chat
- `POST /api/chat` - Chat cu AI tutor (folosește GitHub Models)
- `POST /api/explain_step` - Explicații deterministe pentru pași

### Utilități
- `GET /api/rate_limit` - Verifică rate limit GitHub

## 🎮 Utilizare

### 1. Homepage
- Overview al platformei
- Link către catalog
- Features highlight

### 2. Catalog (`/algorithms`)
- Grid cu toți algoritmii (8)
- Search & filter
- Cards cu metadata (dificultate, complexitate)

### 3. Algorithm Player (`/algorithms/[slug]`)

**Desktop layout (3 coloane):**
- Input Panel (stânga)
- Visualization + Code (centru)
- AI Chat + Quiz (dreapta)

**Mobile layout (tabs):**
- Vizualizare - Animație pas-cu-pas
- Input - Parametri algoritm
- Chat - AI Tutor cu sugestii
- Quiz - 3 întrebări educaționale

**Playback controls:**
- ▶️ Play/Pause automată
- ⏮️ ⏭️ Step by step
- 🐢 🐇 🚀 Speed control (Lent/Normal/Rapid)
- 🔄 Reset

## 🧪 Testare

### Backend tests
```bash
cd apps/api
pytest
```

### Frontend build
```bash
cd apps/web
npm run build
npm run lint
```

### Test API manual
```bash
# Lista algoritmi
curl http://localhost:8000/api/algorithms

# Rulare Bubble Sort
curl -X POST http://localhost:8000/api/run \
  -H "Content-Type: application/json" \
  -d '{"slug":"sortare_bule","input":{"array":[5,1,4,2,8]}}'
```

## 🎓 Structura unui algoritm

Fiecare algoritm are următoarea structură:

```
algorithms/<slug>/
├── __init__.py
├── meta.json         # Metadate (nume, complexitate, schema input)
├── algo.py           # Implementare cu trace events
├── display_code.py   # Cod pentru afișare
└── docs.md          # Documentație markdown
```

**Exemplu `meta.json`:**
```json
{
  "slug": "sortare_bule",
  "name": "Sortarea cu bule",
  "category": "sortare",
  "difficulty": "ușor",
  "timeComplexity": {
    "best": "O(n)",
    "average": "O(n^2)",
    "worst": "O(n^2)"
  },
  "visualization": {
    "kind": "array"
  }
}
```

## 🐛 Troubleshooting

### "No module named uvicorn"
```bash
# Folosește calea completă către Python din venv
/Users/covali/Documents/Universitate/Teza/.venv311/bin/python -m uvicorn main:app --reload
```

### Port ocupat (8000/3000)
```bash
# Oprește procesele
lsof -ti:8000 | xargs kill -9  # API
lsof -ti:3000 | xargs kill -9  # Next.js

# Sau folosește script-ul
./stop.sh
```

### Build errors Next.js
```bash
cd apps/web
rm -rf .next node_modules
npm install
npm run build
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd apps/web
vercel --prod
```

### Backend (Render/Railway)
```bash
# Dockerfile în apps/api/
docker build -t matematica-api .
docker run -p 8000:8000 matematica-api
```

## 📚 Algoritmi planificați pentru viitor

- Merge Sort
- Heap Sort  
- Counting Sort
- A* pathfinding
- Kruskal's MST
- Prim's MST
- Topological Sort
- Binary Search Tree operations

## 🤝 Contributing

Contribuțiile sunt binevenite! Pentru a adăuga un nou algoritm:

1. Creează folder în `apps/api/matematica_api/algorithms/<slug>/`
2. Adaugă `meta.json`, `algo.py`, `docs.md`, `display_code.py`
3. Implementează funcția `run()` care returnează trace events
4. Testează cu `curl` sau prin UI
5. Adaugă quiz-uri în `apps/web/components/algorithm-quiz.tsx`

## 📄 License

MIT License - Vezi [LICENSE](./LICENSE)

## 👨‍💻 Autor

**Chiril Covali**  
Proiect de teză - Universitatea Tehnică a Moldovei

---

**Made with ❤️ for students learning algorithms** 🎓✨
