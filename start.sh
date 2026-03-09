#!/bin/bash

# Script pentru pornirea aplicației Matematica Vizuală Asistată

echo "🚀 Pornire aplicație Matematica Vizuală Asistată..."
echo ""

# Culori pentru output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Calea către Python din venv
PYTHON_PATH="/Users/covali/Documents/Universitate/Teza/.venv311/bin/python"

# Verifică dacă Python-ul din venv există
if [ ! -f "$PYTHON_PATH" ]; then
    echo "❌ Eroare: Python-ul din venv nu a fost găsit la $PYTHON_PATH"
    exit 1
fi

# Schimbă directorul la apps/api
cd "$(dirname "$0")/apps/api" || exit 1

echo -e "${BLUE}📦 Pornire API (FastAPI)...${NC}"
$PYTHON_PATH -m uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
API_PID=$!

# Așteaptă ca API-ul să pornească
sleep 3

# Testează dacă API-ul rulează
if curl -s http://localhost:8000/api/algorithms > /dev/null; then
    echo -e "${GREEN}✅ API pornit cu succes pe http://localhost:8000${NC}"
else
    echo "❌ API-ul nu a pornit corect"
    kill $API_PID
    exit 1
fi

# Schimbă directorul la apps/web
cd ../web || exit 1

echo -e "${BLUE}🌐 Pornire Next.js...${NC}"
npm run dev &
WEB_PID=$!

# Așteaptă ca Next.js să pornească
sleep 5

echo ""
echo -e "${GREEN}✨ Aplicația rulează!${NC}"
echo ""
echo -e "Frontend: ${BLUE}http://localhost:3000${NC} (sau următorul port liber)"
echo -e "API:      ${BLUE}http://localhost:8000${NC}"
echo ""
echo "Pentru a opri aplicația, apasă Ctrl+C"
echo ""

# Așteaptă terminarea
wait
