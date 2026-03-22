# Algoritmul lui Kruskal (Arbore Parțial Minim)

Slug: grafuri_kruskal
Categorie: Grafuri

## Introducere

Algoritmul lui Kruskal este un algoritm **greedy** pentru construirea **Arborelui Parțial Minim** (Minimum Spanning Tree — MST) al unui graf conex, ponderat și neorientat. Spre deosebire de algoritmul lui Prim, care extinde un singur arbore, Kruskal lucrează global cu toate muchiile grafului, construind MST-ul prin adăugarea succesivă a celor mai ieftine muchii care nu creează cicluri.

Algoritmul a fost publicat de **Joseph Bernard Kruskal Jr.** în 1956 în articolul „On the shortest spanning subtree of a graph and the traveling salesman problem", în Proceedings of the American Mathematical Society. A contribuit semnificativ la teoria grafurilor și la algoritmii de optimizare combinatorică.

Kruskal este deosebit de eficient pentru **grafuri rare** (puține muchii relativ la numărul de noduri), unde sortarea muchiilor și operațiile Union-Find domină complexitatea. Algoritmul utilizează structura de date **Union-Find** (Disjoint Set Union — DSU) pentru detectarea eficientă a ciclurilor, care este în sine o realizare algoritmică remarcabilă cu operații aproape în timp constant.

## Descriere

Algoritmul sortează toate muchiile grafului după cost și le procesează în ordine crescătoare. O muchie este adăugată la MST dacă și numai dacă nu creează un ciclu — adică dacă cele două capete ale muchiei aparțin unor componente diferite. Structura Union-Find gestionează eficient apartenența la componente.

**Pașii algoritmului:**

1. Sortează toate muchiile grafului în ordine crescătoare după pondere.
2. Inițializează structura Union-Find cu V componente separate (fiecare nod este propria sa componentă).
3. Inițializează MST-ul ca mulțime vidă.
4. Pentru fiecare muchie `(u, v, w)` în ordinea sortată:
   a. Dacă `u` și `v` aparțin unor componente diferite (Find(u) ≠ Find(v)):
      - Adaugă muchia `(u, v, w)` la MST.
      - Unește componentele lui `u` și `v` (Union(u, v)).
      - Dacă MST are V-1 muchii: **stop** (MST complet).
5. Returnează muchiile MST și costul total.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| General | O(E log E) | O(V + E) |
| Echivalent (deoarece E ≤ V²) | O(E log V) | O(V + E) |
| Cu radix sort (ponderi întregi mici) | O(E · α(V)) | O(V + E) |

**Explicație:** Pasul dominant este sortarea muchiilor → O(E log E). Operațiile Union-Find cu compresie de cale și unire după rang sunt aproape în timp constant — O(α(V)) per operație, unde α este funcția inversă Ackermann, practic ≤ 5 pentru orice input practic. Spațiul O(V + E) acoperă structura Union-Find și lista de muchii.

## Pseudocod

```
Kruskal(graf):
  muchii ← toate muchiile grafului ca triplete (u, v, w)
  sortează muchii crescător după w

  // Inițializare Union-Find
  parent ← array [0..n-1] unde parent[i] = i
  rank ← array [0..n-1] inițializat cu 0

  Find(x):
    dacă parent[x] ≠ x:
      parent[x] ← Find(parent[x])  // compresie de cale
    returnează parent[x]

  Union(x, y):
    rx ← Find(x), ry ← Find(y)
    dacă rx = ry: returnează false  // același arbore
    dacă rank[rx] < rank[ry]: schimbă rx și ry
    parent[ry] ← rx
    dacă rank[rx] = rank[ry]: rank[rx]++
    returnează true

  MST ← []
  cost_total ← 0

  pentru fiecare (u, v, w) în muchii sortate:
    dacă Union(u, v):
      adaugă (u, v, w) la MST
      cost_total ← cost_total + w
      dacă |MST| = n-1: break

  returnează MST, cost_total
```

## Exemple

Considerăm graful neorientat ponderat cu 5 noduri:

```
  1 ---(3)--- 2 ---(5)--- 3
  |           |           |
 (6)         (7)         (4)
  |           |           |
  4 ---(8)--- 5 ---(2)--- 3
              |
              (9)
              |
              5
```

Muchii sortate: (4,5,2) < (1,2,3) < (2,3,4) < (1,3,6) < (2,4,7) < (3,5,4) < (1,4,6) < (2,5,7) < (4,5,8).

**Execuție:**

| Pas | Muchia | Ciclu? | Acțiune | MST |
|-----|--------|--------|---------|-----|
| 1 | (4,5,2) | Nu | Adaugă | {4-5} |
| 2 | (1,2,3) | Nu | Adaugă | {4-5, 1-2} |
| 3 | (2,3,4) | Nu | Adaugă | {4-5, 1-2, 2-3} |
| 4 | (1,3,6) | **Da** (1,2,3 conectați) | Ignoră | neschimbat |
| 5 | (2,4,7) | Nu | Adaugă | {4-5, 1-2, 2-3, 2-4} |

**MST complet** (4 muchii pentru 5 noduri): {4-5(2), 1-2(3), 2-3(4), 2-4(7)}, **cost total = 16**.

## Aplicații

- **Proiectarea rețelelor:** Cabluri electrice, conducte de apă, fibră optică — conectarea minimă a nodurilor.
- **Clustering:** Eliminarea celei mai costisitoare muchii din MST pentru a separa în k clustere.
- **Analiza rețelelor sociale:** Găsirea structurii minime de conexiuni dintr-o rețea.
- **Aproximarea TSP:** MST oferă o aproximare cu factor 2 pentru Traveling Salesman Problem.
- **Generarea labirinturilor:** Kruskal poate genera labirinturi perfecte (cu soluție unică).
- **Bioinformatică:** Construirea arborilor filogenetici din date de distanță genetică.
- **Rețele de comunicații:** Determinarea topologiei minime de cost pentru o rețea LAN/WAN.

## Resurse

- [Wikipedia — Kruskal's algorithm](https://en.wikipedia.org/wiki/Kruskal%27s_algorithm)
- [GeeksForGeeks — Kruskal's Minimum Spanning Tree Algorithm](https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/)
- [Visualgo — Minimum Spanning Tree](https://visualgo.net/en/mst)
- [CP-Algorithms — Minimum Spanning Tree — Kruskal's Algorithm](https://cp-algorithms.com/graph/mst_kruskal.html)
