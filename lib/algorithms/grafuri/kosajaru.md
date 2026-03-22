# Algoritmul lui Kosaraju (Componente Tare Conexe)

Slug: grafuri_kosajaru
Categorie: Grafuri

## Introducere

Algoritmul lui Kosaraju găsește toate **Componentele Tare Conexe** (Strongly Connected Components — SCC) ale unui graf orientat. O componentă tare conexă este un subgraf maximal în care există o cale orientată între oricare două noduri — adică pentru orice pereche de noduri `u` și `v` din componentă, există atât o cale de la `u` la `v`, cât și o cale de la `v` la `u`.

Algoritmul a fost conceput de **S. Rao Kosaraju** în 1978 și prezentat ca o prelegere, fără a fi publicat formal la acea vreme. A fost redescoperit independent de **Micha Sharir** în 1981, care l-a publicat. Algoritmul este elegant în simplitatea sa: necesită exact două parcurgeri DFS — una pe graful original și una pe **graful transpus** (cu toate muchiile inversate).

Identificarea componentelor tare conexe este esențială în analiza grafurilor orientate: permite reducerea unui graf general la un **DAG al componentelor** (graf aciclic orientat), simplificând semnificativ problemele de drum, planificare și analiză structurală. Graful condensat (DAG-ul componentelor) este întotdeauna un graf aciclic orientat.

## Descriere

Algoritmul lui Kosaraju se bazează pe o proprietate elegantă: o componentă tare conexă în graful original este tot o componentă tare conexă în graful transpus. Procesând nodurile în ordinea inversă a timpilor de finalizare DFS garantează că fiecare DFS din a doua etapă vizitează exact o componentă.

**Pașii algoritmului:**

1. **Prima parcurgere DFS** pe graful original:
   - Efectuează DFS pe graful original.
   - La finalizarea fiecărui nod (ieșire din DFS), adaugă nodul pe o **stivă de finalizare**.
2. **Construiește graful transpus** `GT` (inversează direcția tuturor muchiilor).
3. **A doua parcurgere DFS** pe graful transpus:
   - Câtă vreme stiva nu este goală, extrage nodul din vârf.
   - Dacă nodul nu a fost vizitat: pornește un DFS din el pe `GT`.
   - Toți nodurile vizitate în acest DFS formează **o componentă tare conexă**.
4. Returnează lista componentelor tare conexe.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| General | O(V + E) | O(V + E) |

**Explicație:** Algoritmul efectuează două parcurgeri DFS complete (fiecare O(V + E)) și construiește graful transpus (O(V + E)) → total O(V + E). Spațiul necesar este O(V + E) pentru graful transpus și stiva de finalizare O(V).

## Pseudocod

```
Kosaraju(graf):
  n ← numărul de noduri
  vizitat ← array de n booleane, false
  stivă_finalizare ← stivă goală

  // Etapa 1: DFS pe graful original, umple stiva
  DFS_Etapa1(graf, nod, vizitat, stivă):
    vizitat[nod] ← true
    pentru fiecare vecin în graf[nod]:
      dacă nu vizitat[vecin]:
        DFS_Etapa1(graf, vecin, vizitat, stivă)
    adaugă nod în stivă  // la finalizare

  pentru fiecare nod de la 0 la n-1:
    dacă nu vizitat[nod]:
      DFS_Etapa1(graf, nod, vizitat, stivă_finalizare)

  // Etapa 2: Construiește graful transpus
  graf_transpus ← graf cu toate muchiile inversate

  // Etapa 3: DFS pe graful transpus în ordinea stivei
  vizitat ← array de n booleane, false
  componente ← []

  DFS_Etapa3(graf_T, nod, vizitat, componentă_curentă):
    vizitat[nod] ← true
    adaugă nod la componentă_curentă
    pentru fiecare vecin în graf_T[nod]:
      dacă nu vizitat[vecin]:
        DFS_Etapa3(graf_T, vecin, vizitat, componentă_curentă)

  cât timp stivă_finalizare nu este goală:
    nod ← extrage din vârful stivei
    dacă nu vizitat[nod]:
      componentă_curentă ← []
      DFS_Etapa3(graf_transpus, nod, vizitat, componentă_curentă)
      adaugă componentă_curentă la componente

  returnează componente
```

## Exemple

Considerăm graful orientat:

```
  1 ──→ 2 ──→ 3
  ↑     |     |
  |     ↓     ↓
  └──── 4 ←── 5 ──→ 6
```

Muchii: 1→2, 2→3, 2→4, 3→5, 4→1, 5→4, 5→6.

**Etapa 1 — DFS pe graful original (start de la 1):**

Ordinea de finalizare (de la primul la ultimul): 6, 1, 4, 5, 3, 2 (depinde de ordine explorare).

Un exemplu de ordine finalizare: stiva = [6, ..., 1, 2, ...].

Stivă de finalizare (de sus în jos): [1, 2, 3, 5, 4, 6] (exemplu).

**Etapa 2 — Graf transpus:**
Muchii inversate: 2→1, 3→2, 4→2, 5→3, 1→4, 4→5, 6→5.

**Etapa 3 — DFS pe graful transpus:**

- Extragem 1 din stivă → DFS din 1 în GT: vizitează {1, 4, 5, 3, 2} → **SCC1 = {1, 2, 3, 4, 5}**
- Extragem 6 din stivă → DFS din 6 în GT: vizitează {6} → **SCC2 = {6}**

**Componente tare conexe: {1,2,3,4,5}, {6}**

## Aplicații

- **Analiza programelor:** Detectarea buclelor și dependențelor ciclice în grafurile de apeluri (call graphs).
- **Compilatoare:** Optimizarea compilării prin identificarea modulelor mutual recursive.
- **Analiza rețelelor sociale:** Identificarea grupurilor de utilizatori mutual conectați.
- **Verificarea modelelor (Model Checking):** Identificarea ciclurilor în automate de stări finite.
- **Sisteme de baze de date:** Detectarea dependențelor circulare în constrângeri.
- **Analiza web:** Identificarea grupurilor de pagini mutual referențiate.
- **Jocuri:** Identificarea stărilor mutual accesibile în grafuri de stări.

## Resurse

- [Wikipedia — Kosaraju's algorithm](https://en.wikipedia.org/wiki/Kosaraju%27s_algorithm)
- [GeeksForGeeks — Kosaraju's Algorithm for Strongly Connected Components](https://www.geeksforgeeks.org/strongly-connected-components/)
- [Visualgo — Strongly Connected Components](https://visualgo.net/en/dfsbfs)
- [CP-Algorithms — Strongly Connected Components — Kosaraju's Algorithm](https://cp-algorithms.com/graph/strongly-connected-components.html)
