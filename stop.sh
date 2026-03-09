#!/bin/bash

# Script pentru oprirea aplicației Matematica Vizuală Asistată

echo "🛑 Oprire aplicație..."

# Oprește procesele pe porturile 8000 și 3000/3001
lsof -ti:8000 | xargs kill -9 2>/dev/null && echo "✅ API oprit (port 8000)"
lsof -ti:3000 | xargs kill -9 2>/dev/null && echo "✅ Next.js oprit (port 3000)"
lsof -ti:3001 | xargs kill -9 2>/dev/null && echo "✅ Next.js oprit (port 3001)"

echo "✨ Toate procesele au fost oprite"
