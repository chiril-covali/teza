# Algoritmul lui Tarjan (Componente Tare Conexe)

Slug: grafuri_tarjan
Categorie: Grafuri

## Introducere

Algoritmul lui Tarjan este un algoritm elegant și eficient pentru găsirea tuturor **Componentelor Tare Conexe** (Strongly Connected Components — SCC) ale unui graf orientat, într-o **singură parcurgere DFS**. Spre deosebire de algoritmul lui Kosaraju (care necesită două DFS-uri), Tarjan identifică toate componentele într-o singură trecere, oferind o perspectivă mai adâncă asupra structurii grafului.

Algoritmul a fost publicat de **Robert Endre Tarjan** în 1972, în articolul „Depth-First Search and Linear Graph Algorithms", în SIAM Journal on Computing. Robert Tarjan este unul dintre cei mai influenți algoritmicieni ai secolului XX, cu contribuții fundamentale în structuri de date (heap Fibonacci, splay trees) și teoria grafurilor. A primit Premiul Turing în 1986.

Algoritmul lui Tarjan folosește proprietăți ale arborelui DFS și introduce conceptele de **număr de descoperire** (discovery time) și **valoare low-link**: pentru fiecare nod, `low[v]` reprezintă cel mai mic număr de descoperire accesibil din subarborele DFS al lui `v`. Un nod este **rădăcina unei SCC** dacă `low[v] = disc[v]` — adică nu există nicio muchie de întoarcere spre un nod mai vechi. Tarjan poate fi extins și pentru detectarea **punților** și **punctelor de articulație**.

## Descriere

Algoritmul menține o **stivă** a nodurilor active în DFS și pentru fiecare nod calculează `disc[v]` (ordinea de vizitare) și `low[v]` (cel mai mic `disc` accesibil din subarborele lui `v`). Când condiția `low[v] = disc[v]` este satisfăcută, nodul `v` este rădăcina unei SCC, iar toate nodurile de pe stivă până la `v` (inclusiv) formează acea componentă.

**Pașii algoritmului:**

1. Inițializează `disc` și `low` cu -1 (nevizitat), contor global `timer = 0`, stivă goală.
2. Pentru fiecare nod nevizitat: apelează `DFS_Tarjan(nod)`.
3. **DFS_Tarjan(u):**
   a. Setează `disc[u] = low[u] = timer++`.
   b. Adaugă `u` pe stivă și marchează `pe_stivă[u] = true`.
   c. Pentru fiecare vecin `v` al lui `u`:
      - Dacă `v` nu este vizitat: apelează recursiv `DFS_Tarjan(v)`, apoi `low[u] = min(low[u], low[v])`.
      - Dacă `v` este pe stivă: `low[u] = min(low[u], disc[v])`.
   d. Dacă `low[u] = disc[u]` (u este rădăcina unei SCC):
      - Extrage noduri din stivă până la `u` (inclusiv) → acestea formează o SCC.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| General | O(V + E) | O(V) |

**Explicație:** Algoritmul efectuează o singură parcurgere DFS, vizitând fiecare nod și fiecare muchie exact o dată → O(V + E). Spațiul O(V) este pentru stivă, array-urile `disc`, `low`, `pe_stivă`. Este mai eficient în practică față de Kosaraju datorită unei singure parcurgeri și unui factor constant mai mic.

## Pseudocod

```
Tarjan(graf):
  n ← numărul de noduri
  disc ← array de n elemente, inițializat cu -1
  low ← array de n elemente, inițializat cu -1
  pe_stivă ← array de n booleane, false
  stivă ← stivă goală
  timer ← 0
  componente ← []

  DFS_Tarjan(u):
    disc[u] ← low[u] ← timer++
    adaugă u în stivă
    pe_stivă[u] ← true

    pentru fiecare v în vecini[u]:
      dacă disc[v] = -1:           // v nevizitat
        DFS_Tarjan(v)
        low[u] ← min(low[u], low[v])
      altfel dacă pe_stivă[v]:    // v este pe stivă (muchie înapoi)
        low[u] ← min(low[u], disc[v])

    // Verifică dacă u este rădăcina unei SCC
    dacă low[u] = disc[u]:
      scc ← []
      cât timp vârful stivei ≠ u:
        w ← extrage din vârf
        pe_stivă[w] ← false
        adaugă w la scc
      w ← extrage din vârf (= u)
      pe_stivă[u] ← false
      adaugă u la scc
      adaugă scc la componente

  pentru fiecare nod u de la 0 la n-1:
    dacă disc[u] = -1:
      DFS_Tarjan(u)

  returnează componente
```

## Exemple

Considerăm graful orientat:

```
  0 ──→ 1 ──→ 3
  ↑     |
  |     ↓
  2 ←── 2
  └──→ 0
```

Graful cu muchii: 0→1, 1→2, 2→0, 1→3.

**Execuție Tarjan (start de la 0):**

| Nod | disc | low | Acțiune |
|-----|------|-----|---------|
| 0 | 0 | 0 | Adaugă 0 pe stivă. Stivă: [0] |
| 1 | 1 | 1 | Adaugă 1 pe stivă. Stivă: [0,1] |
| 2 | 2 | 2 | Adaugă 2 pe stivă. Stivă: [0,1,2] |
| — | — | — | Muchia 2→0: low[2]=min(2,disc[0])=min(2,0)=0 |
| — | — | — | Întoarcere la 1: low[1]=min(1,low[2])=min(1,0)=0 |
| 3 | 3 | 3 | Adaugă 3 pe stivă. Stivă: [0,1,2,3] |
| — | — | — | low[3]=disc[3]=3 → SCC rădăcină! Extrage 3 → **SCC={3}** |
| — | — | — | Întoarcere la 0: low[0]=min(0,low[1])=min(0,0)=0 |
| — | — | — | low[0]=disc[0]=0 → SCC rădăcină! Extrage 2,1,0 → **SCC={2,1,0}** |

**Componente tare conexe: {0,1,2}, {3}**

## Aplicații

- **Analiza programelor:** Detectarea buclelor și dependențelor mutual recursive.
- **Compilatoare:** Calculul ordinii de compilare pentru module cu dependențe circulare.
- **Verificarea formală:** Identificarea ciclurilor în sisteme de tranziție — model checking cu LTL/CTL.
- **Analiza web:** Gruparea paginilor web mutual referențiate (web graph clustering).
- **Rețele sociale:** Identificarea comunităților strâns interconectate.
- **Detectarea punților și punctelor de articulație:** Tarjan poate fi extins să găsească muchiile/nodurile critice din graf.
- **Jocuri 2-SAT:** Algoritmul de rezolvare a problemei 2-SAT se bazează direct pe SCC cu Tarjan.
- **Sisteme de control:** Detectarea ciclurilor și feedbackului în sisteme de control automat.

## Resurse

- [Wikipedia — Tarjan's strongly connected components algorithm](https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm)
- [GeeksForGeeks — Tarjan's Algorithm for Strongly Connected Components](https://www.geeksforgeeks.org/tarjan-algorithm-find-strongly-connected-components/)
- [Visualgo — Strongly Connected Components](https://visualgo.net/en/dfsbfs)
- [CP-Algorithms — Strongly Connected Components — Tarjan's Algorithm](https://cp-algorithms.com/graph/strongly-connected-components.html)
