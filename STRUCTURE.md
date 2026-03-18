# 📚 Matematica Vizuală Asistată - Structura Proiectului

## 🎯 Overview

Proiect educațional cu **2 versiuni** separate:

```
Teza/
├── old-version/          ❌ IGNORE - Python + Original Next.js (local only)
│   ├── api/              - FastAPI backend
│   ├── web/              - Original Next.js frontend
│   └── ...
│
├── vercel-version/       ✅ PUSH - JavaScript 100% pe Vercel
│   ├── app/              - Next.js App Router
│   ├── lib/              - Algoritmi + API client
│   ├── package.json
│   └── README.md
│
├── packages/shared/      - Shared utilities
├── README.md             - Overview (original)
└── ...
```

---

## 📦 Versiune 1: OLD-VERSION (Python)

**Status**: Local development only (not pushed to GitHub)

- Backend: FastAPI (`old-version/api/`)
- Frontend: Next.js (`old-version/web/`)
- Bază de date: Metadata în JSON
- AI: GitHub Models API

### 🚀 Rulare local:
```bash
./start.sh
./stop.sh
```

### ✅ Pros:
- Structură originală, complex setup
- Backend separat, mai granular
- bun pentru local testing

### ❌ Cons:
- Greu de deployed pe Vercel
- 2 procese separate (API + web)
- Dependență de Python

---

## ⚡ Versiune 2: VERCEL-VERSION (JavaScript 100%)

**Status**: ✅ Production-ready pe Vercel

- Framework: **Next.js 14** (App Router)
- Backend: **API Routes** (serverless)
- Toți algoritmii: **TypeScript**
- AI: GitHub Models (direct din frontend)
- Deploy: **1-click Vercel**

### 🚀 Rulare local:
```bash
cd vercel-version/
npm install
npm run dev
# http://localhost:3000
```

### 🔧 Build produție:
```bash
cd vercel-version/
npm run build
npm start
```

### ✅ Pros:
- 100% JavaScript - u single language
- Serverless - auto-scaling
- 1-click deploy Vercel
- 0 config needed

### ✨ Features:
- 8 Algoritmi
- AI Tutor (GitHub Models)
- Interactive vizualizare
- Chat contextual
- Responsive design

---

## 📝 Git Workflow

### Push vers. JavaScript (VERCEL)
```bash
git add vercel-version/
git commit -m "Update vercel version"
git push origin main
```

### OLD-VERSION (IGNORED)
```bash
# Doar local changes, nu e tracked
cd old-version/
./start.sh
```

---

## 🎯 Deployment

### Vercel (RECOMANDĂ)
```bash
cd vercel-version/
npm run build
```

See [vercel-version/DEPLOYMENT.md](vercel-version/DEPLOYMENT.md)

### Old-Version (Local)
```bash
cd old-version/
./start.sh
```

---

## 🔑 Variabile de Mediu

### vercel-version/.env.local
```
GITHUB_TOKEN=ghp_xxxxx
GITHUB_MODELS_MODEL=gpt-4o
GITHUB_MODELS_ENDPOINT=https://models.github.ai/inference/chat/completions
```

### old-version/.env
```
GITHUB_TOKEN=ghp_xxxxx
GITHUB_MODELS_MODEL=gpt-4o
```

---

## 📊 Comparație

| | old-version | vercel-version |
|---|---|---|
| Language | Python + TS/JS | **100% JS/TS** |
| Deployment | Manual | **Vercel 1-click** |
| Backend | FastAPI | **Next.js Routes** |
| Database | JSON files | **Serverless** |
| Scalability | Manual | **Auto-scale** |
| Cost | Higher | **Free tier** |
| Push to Git | ❌ Ignored | ✅ Tracked |

---

## 📂 Foldere

### old-version/
- `api/` → FastAPI server
- `web/` → Original Next.js
- `start.sh` → Startup script
- `stop.sh` → Shutdown script

### vercel-version/
- `app/` → Next.js App Router
- `lib/` → Algoritmi + utils
- `package.json` → Dependencies
- `DEPLOYMENT.md` → Deploy guide

---

## 🚀 Recomandări

✅ **Pentru produție pe Vercel**: Folosește `vercel-version/`
- Simplu, rapid, scalabil
- GitHub Models AI integrated
- 0 server management

❌ **Pentru development local**: `old-version/`
- Setup complex cu Python
- Bun for debugging
- Nu merge pe Vercel direct

---

## ❓ FAQ

**Q**: Pot puscha old-version pe GitHub?
**A**: Nu, e ignored de `.gitignore`. Poți doar push vercel-version.

**Q**: Cum deployez pe Vercel?
**A**: See `vercel-version/DEPLOYMENT.md`

**Q**: Care versiune e mai bună?
**A**: `vercel-version` pentru produție, `old-version` pentru local dev.

---

**Last updated**: March 18, 2026
