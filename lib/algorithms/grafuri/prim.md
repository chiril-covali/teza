# Algoritmul lui Prim (Arbore Parțial Minim)

Slug: grafuri_prim
Categorie: Grafuri

## Introducere

Algoritmul lui Prim este un algoritm **greedy** pentru găsirea **Arborelui Parțial Minim** (Minimum Spanning Tree — MST) al unui graf conex, ponderat și neorientat. Un arbore parțial minim este un subgraf care include toate nodurile grafului, are structura unui arbore (conex și fără cicluri) și are suma totală a ponderilor muchiilor minimă posibilă.

Algoritmul a fost descoperit pentru prima dată de matematicianul ceh **Vojtěch Jarník** în 1930, publicat în cehă și rămânând relativ necunoscut. A fost redescoperit independent de **Robert C. Prim** în 1957 (publicat ca „Shortest Connection Networks and Some Generalizations") și ulterior de **Edsger Dijkstra** în 1959. De aceea, algoritmul mai este cunoscut ca **DJP Algorithm** (Dijkstra-Jarník-Prim).

Prim construiește MST-ul treptat, pornind de la un nod arbitrar și extinzând arborele la fiecare pas prin adăugarea muchiei minime care conectează un nod din arbore cu un nod din afara arborelui. Această strategie este similară cu Dijkstra, dar în loc să minimizeze distanța totală de la sursă, minimizează costul muchiei adăugate.

## Descriere

Algoritmul menține două mulțimi: nodurile deja incluse în MST și nodurile rămase. La fiecare pas, se alege **cea mai ieftină muchie** care traversează frontiera dintre cele două mulțimi. O **coadă de priorități** (min-heap) optimizează găsirea acestei muchii.

**Pașii algoritmului:**

1. Alege un nod de start arbitrar și adaugă-l în MST.
2. Inițializează coada de priorități cu toate muchiile adiacente nodului de start.
3. Câtă vreme MST nu conține toate nodurile:
   a. Extrage muchia de cost minim `(u, v, w)` din coadă (unde `u` este în MST, `v` nu).
   b. Dacă `v` este deja în MST: ignoră muchia (ar crea un ciclu).
   c. Adaugă `v` în MST și muchia `(u, v, w)` în rezultat.
   d. Adaugă toate muchiile adiacente lui `v` (spre noduri din afara MST) în coadă.
4. Returnează mulțimea de muchii a MST și costul total.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cu coadă de priorități (heap binar) | O(E log V) | O(V + E) |
| Cu heap Fibonacci | O(E + V log V) | O(V + E) |
| Implementare naivă | O(V²) | O(V) |

**Explicație:** Cu un heap binar, fiecare muchie este procesată o dată (adăugare și extragere din heap) → O(E log E) = O(E log V) (deoarece E ≤ V²). Implementarea naivă O(V²) este mai eficientă pentru grafuri dense. Heap-ul Fibonacci oferă complexitate optimă asimptotică. Spațiul O(V + E) acoperă heap-ul și lista de adiacență.

## Pseudocod

```
Prim(graf, start):
  n ← numărul de noduri
  în_MST ← mulțime goală
  cost_MST ← 0
  muchii_MST ← []
  cheie ← array de n elemente, inițializat cu ∞
  parent ← array de n elemente, inițializat cu -1

  cheie[start] ← 0
  coadă ← min-heap cu toate nodurile, prioritizat după cheie

  cât timp coadă nu este goală:
    u ← extrage nodul cu cheie minimă din coadă
    adaugă u în în_MST
    cost_MST ← cost_MST + cheie[u]
    dacă parent[u] ≠ -1:
      adaugă (parent[u], u, cheie[u]) la muchii_MST

    pentru fiecare (v, w) în vecini[u]:
      dacă v nu este în în_MST și w < cheie[v]:
        cheie[v] ← w
        parent[v] ← u
        actualizează prioritatea lui v în coadă

  returnează muchii_MST, cost_MST
```

## Exemple

Considerăm graful neorientat ponderat:

```
    1 ---(1)--- 2
    |           |
   (3)         (4)
    |           |
    3 ---(2)--- 4
         |
        (5)
         |
         (legat și de 2 prin (6))
```

Muchii: 1-2(1), 1-3(3), 2-4(4), 3-4(2). Start: nodul 1.

**Execuție pas cu pas:**

| Pas | Nod adăugat | Muchia adăugată | Cost | MST curent | Coadă priorități |
|-----|------------|-----------------|------|------------|-----------------|
| Init | 1 | — | 0 | {1} | {2:1, 3:3} |
| 1 | 2 | 1-2 (cost 1) | 1 | {1,2} | {3:3, 4:4} |
| 2 | 3 | 1-3 (cost 3) | 4 | {1,2,3} | {4: min(4,2)=2} |
| 3 | 4 | 3-4 (cost 2) | 6 | {1,2,3,4} | {} |

**MST final:** muchiile {1-2(1), 1-3(3), 3-4(2)}, **cost total = 6**.
Muchia 2-4(4) nu este inclusă deoarece 3-4(2) este mai ieftină și conectează același nod 4.

## Aplicații

- **Rețele de distribuție:** Construirea rețelelor minime de conducte de apă, gaze sau cabluri electrice.
- **Telecomunicații:** Proiectarea rețelelor de fibră optică cu cost minim.
- **Clustering:** Algoritmul MST clustering folosește Prim/Kruskal pentru segmentarea datelor.
- **Aproximarea problemei comis-voiajorului (TSP):** MST oferă o limită inferioară și o soluție aproximativă.
- **Rețele de transport:** Conectarea minimă a orașelor cu drumuri.
- **Jocuri de strategie:** Construirea rețelelor de aprovizionare optime.
- **Procesarea imaginilor:** Segmentarea imaginilor bazată pe grafuri (graph-based image segmentation).

## Resurse

- [Wikipedia — Prim's algorithm](https://en.wikipedia.org/wiki/Prim%27s_algorithm)
- [GeeksForGeeks — Prim's Minimum Spanning Tree](https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/)
- [Visualgo — Minimum Spanning Tree](https://visualgo.net/en/mst)
- [CP-Algorithms — Prim's Algorithm for MST](https://cp-algorithms.com/graph/mst_prim.html)
