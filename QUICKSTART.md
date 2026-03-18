# 🚀 QUICK START - Structura Simplificată

## 📂 Structura

```
Teza/
├── vercel-version/     ✅ PUSH TO GIT - Versiunea JavaScript
├── old-version/        ❌ LOCAL ONLY - Versiunea Python (ignored)
└── ...
```

---

## 🎯 PENTRU PRODUCȚIE (Vercel)

### 1. Rulare local
```bash
cd vercel-version/
npm install
npm run dev
```

### 2. Setup variabile (`.env.local`)
```
GITHUB_TOKEN=ghp_xxxxx
GITHUB_MODELS_MODEL=gpt-4o
```

### 3. Build + test
```bash
npm run build
npm start
```

### 4. Push pe GitHub
```bash
git add vercel-version/
git commit -m "Update vercel version: ..."
git push origin main
```

### 5. Deploy pe Vercel
- Merge pe main
- Vercel auto-builds din main branch
- Urează URL public

**Status**: ✅ Live pe Vercel!

---

## 🔧 PENTRU DEVELOPMENT LOAL (Python - Optional)

### 1. Rulare
```bash
cd old-version/
./start.sh
```

### 2. Oprire
```bash
cd old-version/
./stop.sh
```

### 3. Notă
- ❌ Ignored de git (local only)
- ❌ Nu se pushează
- ✅ Bun pentru debugging

---

## 📋 Workflow Git

### ✅ PUSH vercel-version ALWAYS
```bash
git add vercel-version/          # ✅ OK
git commit -m "..."
git push origin main
```

### ❌ DON'T PUSH old-version
```bash
git add old-version/             # ❌ NEVER!
# E ignored de .gitignore
```

---

## 🔑 Environment Variables

### vercel-version/.env.local (dev)
```
GITHUB_TOKEN=ghp_xxxxx
GITHUB_MODELS_MODEL=gpt-4o
```

### Vercel (production)
Settings → Environment Variables:
```
GITHUB_TOKEN=ghp_xxxxx
GITHUB_MODELS_MODEL=gpt-4o
GITHUB_MODELS_ENDPOINT=https://models.github.ai/inference/chat/completions
```

---

## 📚 Full Documentation

- [STRUCTURE.md](./STRUCTURE.md) - Detalii structură
- [vercel-version/README.md](./vercel-version/README.md) - Versiune JS
- [vercel-version/DEPLOYMENT.md](./vercel-version/DEPLOYMENT.md) - Deploy
- [old-version/README.md](./old-version/README.md) - Versiune Python

---

## ✨ Key Points

| | vercel-version | old-version |
|---|---|---|
| Git | ✅ Tracked | ❌ Ignored |
| Push | ✅ Always push | ❌ Never push |
| Deploy | ✅ Auto Vercel | ❌ Manual |
| Production | ✅ Use this | ❌ Local only |

---

## 🎯 TL;DR

1. **Lucrez pe**: `vercel-version/`
2. **Push**: `vercel-version/` numai
3. **Ignor**: `old-version/` (local testing)
4. **Deploy**: Auto pe Vercel cand push main

✅ **DONE!**

---

Last updated: March 18, 2026
