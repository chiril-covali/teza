# Algoritmul Dijkstra

Slug: grafuri_dijkstra
Categorie: Grafuri

## Introducere

Algoritmul Dijkstra este unul dintre cei mai celebri algoritmi din informatică, rezolvând problema **celui mai scurt drum de la o sursă unică** (Single-Source Shortest Path — SSSP) într-un graf ponderat cu ponderi nenegative. Dat un nod sursă, algoritmul calculează distanța minimă de la sursă la toate celelalte noduri accesibile din graf.

Algoritmul a fost conceput de informaticianul olandez **Edsger Wybe Dijkstra** în 1956 și publicat în 1959 în articolul „A note on two problems in connexion with graphs". Dijkstra a povestit că a inventat algoritmul în aproximativ 20 de minute, stând la o cafenea din Amsterdam. Inițial era destinat demonstrării capabilităților calculatorului ARMAC al Universității din Amsterdam.

Dijkstra folosește o abordare **greedy**: la fiecare pas, selectează nodul nevizitat cu distanța minimă curentă și relaxează toate muchiile adiacente. Această strategie funcționează corect doar pentru ponderi nenegative — ponderile negative invalidează proprietatea greedy. Pentru grafuri cu ponderi negative se folosește algoritmul Bellman-Ford.

## Descriere

Algoritmul menține un set de noduri pentru care distanța minimă a fost deja determinată definitiv și o **coadă de priorități** (min-heap) pentru a selecta eficient nodul cu distanța minimă curentă.

Conceptul cheie este **relaxarea muchiei**: dacă distanța la vecinul `v` prin nodul curent `u` este mai mică decât distanța estimată curentă a lui `v`, actualizăm distanța lui `v`.

**Pașii algoritmului:**

1. Inițializează distanța sursă la 0 și toate celelalte distanțe la infinit.
2. Adaugă toate nodurile în coada de priorități (ordonată după distanță).
3. Câtă vreme coada nu este goală:
   a. Extrage nodul `u` cu distanța minimă din coadă.
   b. Marchează `u` ca vizitat definitiv.
   c. Pentru fiecare vecin `v` al lui `u` cu muchie de cost `w`:
      - Calculează `dist_noua = distanță[u] + w`.
      - Dacă `dist_noua < distanță[v]`, actualizează `distanță[v] ← dist_noua`.
      - Actualizează coada de priorități pentru `v`.
4. Returnează vectorul distanțelor.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cu coadă de priorități (heap binar) | O((V + E) log V) | O(V) |
| Cu heap Fibonacci | O(E + V log V) | O(V) |
| Implementare naivă (fără heap) | O(V²) | O(V) |

**Explicație:** Cu un heap binar, fiecare operație de extragere a minimului costă O(log V) și se efectuează de V ori. Fiecare relaxare de muchie poate necesita o operație de actualizare în heap — O(log V) — și se efectuează de E ori. Implementarea naivă cu array liniar este preferabilă pentru grafuri dense (E ≈ V²), iar heap-ul Fibonacci este optim asimptotic pentru grafuri rare.

## Pseudocod

```
Dijkstra(graf, sursă):
  n ← numărul de noduri
  distanță ← array de dimensiune n, inițializat cu ∞
  anterior ← array de dimensiune n, inițializat cu null
  vizitat ← mulțime goală

  distanță[sursă] ← 0
  coadă_priorități ← {(0, sursă)}

  cât timp coadă_priorități nu este goală:
    (dist_curentă, u) ← extrage minimul din coadă_priorități

    dacă u este în vizitat: continuă
    adaugă u în vizitat

    pentru fiecare (v, w) în vecini[u]:
      dacă dist_curentă + w < distanță[v]:
        distanță[v] ← dist_curentă + w
        anterior[v] ← u
        adaugă (distanță[v], v) în coadă_priorități

  returnează distanță, anterior

ReconstruieCale(anterior, destinație):
  cale ← []
  nod ← destinație
  cât timp nod ≠ null:
    adaugă nod la începutul cale
    nod ← anterior[nod]
  returnează cale
```

## Exemple

Considerăm graful orientat ponderat:

```
       2       3
  1 ------→ 2 ------→ 4
  |         |         ↑
  |4        |1        |
  ↓         ↓         |
  3 ------→ 4    2    |
       1
```

Muchii: 1→2 (2), 1→3 (4), 2→3 (1), 2→4 (3), 3→4 (5). Sursă: 1.

**Execuție pas cu pas:**

| Pas | Nod extras | dist[1] | dist[2] | dist[3] | dist[4] | Coadă |
|-----|-----------|---------|---------|---------|---------|-------|
| Init | — | 0 | ∞ | ∞ | ∞ | {(0,1)} |
| 1 | 1 | 0 | 2 | 4 | ∞ | {(2,2),(4,3)} |
| 2 | 2 | 0 | 2 | 3 | 5 | {(3,3),(5,4)} |
| 3 | 3 | 0 | 2 | 3 | 5 | {(5,4)} |
| 4 | 4 | 0 | 2 | 3 | 5 | {} |

**Distanțe finale:** d(1)=0, d(2)=2, d(3)=3, d(4)=5.

**Cele mai scurte căi din 1:**
- Calea 1→2: cost 2
- Calea 1→2→3: cost 2+1=3
- Calea 1→2→4: cost 2+3=5
- Calea 1→2→3→4 ar costa 2+1+5=8 — mai lungă decât 1→2→4 (cost 5) ✓

## Aplicații

- **Sisteme GPS și navigație:** Calcularea celei mai scurte/rapide rute în rețele stradale (Google Maps, Waze).
- **Protocoale de rutare în rețele:** OSPF (Open Shortest Path First) și IS-IS folosesc Dijkstra pentru rute optime.
- **Jocuri video:** Pathfinding pentru personaje (NPC) pe hărți cu costuri variabile.
- **Rețele de transport:** Optimizarea rutelor de zbor, tren, autobuz.
- **Bioinformatică:** Analiza rețelelor de proteine și metabolice.
- **Telecomunicații:** Optimizarea rețelelor de telefonie și internet.
- **Roboti autonomi:** Planificarea traiectoriei pe hărți de costuri (costmaps).

## Resurse

- [Wikipedia — Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
- [GeeksForGeeks — Dijkstra's Shortest Path Algorithm](https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/)
- [Visualgo — Single-Source Shortest Paths](https://visualgo.net/en/sssp)
- [CP-Algorithms — Dijkstra Algorithm](https://cp-algorithms.com/graph/dijkstra.html)
