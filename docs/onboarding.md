# Ghid de Onboarding — Algoritmi Noi

Acest ghid descrie pașii minimi pentru adăugarea unui algoritm nou în platformă.

---

## Structura unui algoritm

Fiecare algoritm are **patru artefacte**:

| Artefact | Locație | Obligatoriu |
|---|---|---|
| Implementare TypeScript | `lib/algorithms/<categorie>/<slug>.ts` | ✅ |
| Documentație Markdown | `lib/algorithms/<categorie>/<slug>.md` | ✅ |
| Intrare în `generated-registry.ts` | `lib/algorithms/generated-registry.ts` | ✅ |
| Mapare sursă | `slug-mapping.json` | ✅ |

---

## Pași minimi

### 1. Alege slug-ul și categoria

- Format slug: `<categorie>_<numeAlgoritm>` (ex: `sortare_shellSort`)
- Categorii existente: `sortare`, `cautare`, `grafuri`, `programare-dinamica`, `matematica`, `backtracking`, `cifru`, `diverse`, `manipulare-biti`, `structuri-de-date`

### 2. Creează fișierul TypeScript

```
lib/algorithms/<categorie>/<numeAlgoritm>.ts
```

Dacă algoritmul va fi complet instrumentat (vizualizare pas-cu-pas), exportă o funcție care returnează `AlgorithmResult`:

```typescript
import { AlgorithmResult } from "../types";

export function myAlgorithm(input: { array: number[] }): AlgorithmResult {
  const trace = [];
  // ... logica + trace.push({ type: "compare", ... })
  return { trace, result: { sorted: input.array } };
}
```

### 3. Creează documentația Markdown

```
lib/algorithms/<categorie>/<numeAlgoritm>.md
```

Template minimal:

```markdown
# Numele Algoritmului

## Ce este?
Scurtă descriere originală (nu copie directă din Wikipedia).

## Intuiție
Explicație analogă — de ce funcționează.

## Pași
1. Pasul 1
2. Pasul 2

## Complexitate
- **Timp:** O(...)
- **Spațiu:** O(...)

## Cazuri limită
- Array vid
- Array deja sortat

## Referințe
- [Wikipedia — Algorithm Name](https://en.wikipedia.org/wiki/...)
```

### 4. Adaugă în `generated-registry.ts`

```typescript
{
  "slug": "sortare_shellSort",
  "name": "Shell Sort",
  "category": "Sortare",
  "complexity": "T: O(N log² N), S: O(1)",
  "description": "Generalizare a insertion sort care sortează elementele la distanțe mari înainte de a le sorta adiacent."
},
```

### 5. Adaugă în `slug-mapping.json`

```json
"sortare_shellSort": "TypeScript-master/sorts/shell_sort.ts"
```

### 6. Regenerează registry-ul canonic

```bash
npm run generate:registry
npm run validate:registry
```

### 7. (Opțional) Instrumentare completă

Dacă vrei vizualizare pas-cu-pas:

1. Exportă funcția din `lib/algorithms/<categorie>/<numeAlgoritm>.ts`
2. Adaug-o în `algorithms` map din `lib/algorithms/index.ts`:

```typescript
import { shellSort } from "./sortare/shellSort";

export const algorithms = {
  // ... celelalte
  sortare_shellSort: shellSort,
};
```

3. Actualizează `status` la `"instrumented"` în `scripts/generate-registry.mjs` (în setul `INSTRUMENTED`).

---

## Checklist obligatoriu

- [ ] `lib/algorithms/<categorie>/<slug>.ts` creat
- [ ] `lib/algorithms/<categorie>/<slug>.md` creat (cu toate secțiunile)
- [ ] Intrare în `generated-registry.ts` adăugată
- [ ] Intrare în `slug-mapping.json` adăugată
- [ ] `npm run generate:registry` rulat cu succes
- [ ] `npm run validate:registry` rulat fără erori
- [ ] `npm run build` trece fără erori

---

## Tipuri de vizualizare (`visualizerType`)

| Tip | Când se aplică | Visualizer component |
|---|---|---|
| `sorting` | Algoritmi de sortare (array) | `SortingVisualizer` — bare animate |
| `search` | Algoritmi de căutare (array + target) | `SearchVisualizer` — pointeri lo/hi/mid |
| `graph` | BFS, DFS, Dijkstra | `GraphVisualizer` — SVG noduri + muchii |
| `dp` | Programare dinamică (tabel) | `DPVisualizer` — tabel cu celule |
| `none` | Altele | Fallback text |

Tipul se derivă automat din prefix-ul slug-ului în `scripts/generate-registry.mjs`.

---

## Structura unui `TraceEvent`

Fiecare pas al algoritmului emite un eveniment:

```typescript
// Comparare două elemente
{ type: "compare", indices: [i, j], array: [...], note: "Compar...", vars: { i, j } }

// Interschimb
{ type: "swap", indices: [i, j], array: [...], note: "Interschimb..." }

// Setare valoare
{ type: "set", index: i, value: v, array: [...] }

// Vizitare nod (graf)
{ type: "visit_node", node: "A", vars: { visited: ["A", "B"], queue: ["C"] } }

// Actualizare distanță (Dijkstra)
{ type: "update_distance", node: "B", distance: 3, vars: { distances: { A: 0, B: 3 } } }

// Marcare găsit/negăsit (căutare)
{ type: "mark_found", index: 4, found: true, array: [...] }

// Celulă DP
{ type: "dp_cell", row: 2, col: 3, value: 5, table: [[...], [...]] }

// Finalizare
{ type: "done", note: "Sortat!", vars: { comparisons: 15 } }
```
