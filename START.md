# 🚀 Start Commands - Matematica Vizuală Asistată

## Quick Start (Recomandat)

### Folosind script-urile automate:

```bash
# Pornește aplicația (API + Frontend)
./start.sh

# Oprește aplicația
./stop.sh
```

---

## Manual Start (Alternativă)

### Terminal 1 - Backend (FastAPI):
```bash
cd /Users/covali/Documents/Universitate/Teza/apps/api
/Users/covali/Documents/Universitate/Teza/.venv311/bin/python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Terminal 2 - Frontend (Next.js):
```bash
cd /Users/covali/Documents/Universitate/Teza/apps/web
npm run dev
```

---

## URLs

- **Frontend**: http://localhost:3000 (sau portul afișat în terminal)
- **API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

---

## ⚠️ Important despre Python

Comanda `python` este aliased la Python-ul de sistem pe acest Mac. Pentru a folosi venv-ul corect, trebuie să folosești calea completă:

```bash
/Users/covali/Documents/Universitate/Teza/.venv311/bin/python
```

**NU** funcționează:
```bash
python -m uvicorn main:app  # ❌ Folosește Python-ul de sistem
```

**Funcționează**:
```bash
/Users/covali/Documents/Universitate/Teza/.venv311/bin/python -m uvicorn main:app  # ✅ Folosește venv-ul
```

---

## Troubleshooting

### Port deja ocupat

Dacă primești eroarea "Address already in use":

```bash
# Găsește și oprește procesul pe port 8000
lsof -ti:8000 | xargs kill -9

# Sau pentru Next.js (port 3000)
lsof -ti:3000 | xargs kill -9

# Sau folosește script-ul de stop
./stop.sh
```

### Module not found

Dacă primești "No module named uvicorn" sau similar:

```bash
# Instalează dependențele în venv
cd apps/api
/Users/covali/Documents/Universitate/Teza/.venv311/bin/python -m pip install -r requirements.txt
```

---

## 📦 Build pentru producție

### Frontend:
```bash
cd apps/web
npm run build
npm start
```

### Backend:
```bash
cd apps/api
/Users/covali/Documents/Universitate/Teza/.venv311/bin/python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## 🎯 Features disponibile

- ✅ 8 algoritmi (sortare, căutare, grafuri)
- ✅ Vizualizări pas cu pas (array + graph)
- ✅ AI Tutor cu întrebări sugerate
- ✅ Quiz-uri educaționale (3 întrebări per algoritm)
- ✅ Mobile-first UI cu tabs
- ✅ Tema albă educational
- ✅ Code viewer pentru fiecare algoritm
- ✅ Chat history persistent în sesiune

---

**Made with ❤️ for students learning algorithms**
