# Matematica Vizuală - Deployment pe Vercel

## 📋 Checklist Deploy

### Pasul 1: Pregătire GitHub
- [ ] Push codul `js-version/` pe repo
- [ ] Asigură-te că `package.json` și `tsconfig.json` sunt conformi Next.js

### Pasul 2: Conectare Vercel
1. Du-te pe https://vercel.com
2. Conectează GitHub account
3. Selectează repository `teza`
4. Alege `js-version/` ca root

### Pasul 3: Setare Variabile
În Vercel Project Settings → Environment Variables:

```
GITHUB_TOKEN = ghp_xxxxxxxxxxxxx
GITHUB_MODELS_MODEL = gpt-4o
GITHUB_MODELS_ENDPOINT = https://models.github.ai/inference/chat/completions
```

### Pasul 4: Deploy
- Apasă "Deploy"
- Asteapta ~2-3 minute
- Vercel va da un domeniu public (ex: `myverzcel-app.vercel.app`)

## 🔑 Cum obții GITHUB_TOKEN?

1. Mergi la https://github.com/settings/tokens
2. "Generate new token (classic)"
3. Selectează:
   - `repo` (full control)
   - `read:org`
   - `user:email`
4. Copy token și pune în Vercel

## ✅ Testing

```bash
# Dev local (cu env vars din .env.local)
npm run dev

# Build production (ce va face Vercel)
npm run build
npm start
```

## 🚨 Troubleshooting

**404 Not Found untuk /api/run**
- Vercel trebuie să rebuild
- Check Function logs în Deployment → Functions

**GitHub Models error**
- Verifica GITHUB_TOKEN valid  
- Verifica GITHUB_MODELS_MODEL suportat
- Test manual: `curl -X POST https://models.github.ai/inference/chat/completions ...`

**TypeScript errors**
- `npm run build` local pentru a vedea errors
- Fix și push din nou

## 📊 Performance

- **First Paint**: <1s
- **API Response**: <2s (with GitHub Models)
- **Algorithm Trace**: <100ms

## 🎯 URL finală

```
https://your-project.vercel.app/
```

✅ **Gata! Situl e live și scalat automat!**
