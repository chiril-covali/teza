# Algoritmul lui Johnson (Cele Mai Scurte Drumuri între Toate Perechile)

Slug: grafuri_johnson
Categorie: Grafuri

## Introducere

Algoritmul lui Johnson rezolvă problema **celui mai scurt drum între toate perechile de noduri** (All-Pairs Shortest Path — APSP) dintr-un graf ponderat orientat, putând gestiona și **ponderi negative** (dar nu cicluri negative). Ideea cheie este **reponderarea** (reweighting): transformarea ponderilor negative în ponderi nenegative, astfel încât să poată fi aplicat algoritmul Dijkstra pentru fiecare nod.

Algoritmul a fost propus de **Donald B. Johnson** în 1977, în articolul „Efficient algorithms for shortest paths in sparse networks". Contribuția sa fundamentală este combinarea ingenioasă a algoritmului Bellman-Ford (o singură dată, pentru calculul funcției de reponderare) cu algoritmul Dijkstra (rulat de V ori, câte o dată per sursă).

Johnson este superior lui Floyd-Warshall pentru **grafuri rare** (E ≪ V²): complexitatea O(V² log V + VE) vs. O(V³). Pentru grafuri dense (E ≈ V²), Floyd-Warshall poate fi preferat datorită constantelor mai mici. Algoritmul este utilizat în compilatoare, analiza dependențelor și sistemele de planificare cu constrângeri.

## Descriere

Algoritmul funcționează în trei etape principale:

**Etapa 1 — Reponderare:** Se adaugă un nod virtual `q` conectat cu muchii de cost 0 la toate nodurile existente. Se rulează Bellman-Ford din `q` pentru a calcula funcția de potențial `h[v]` = distanța minimă de la `q` la fiecare nod `v`.

**Etapa 2 — Transformarea ponderilor:** Fiecare muchie `(u,v,w)` primește noua pondere `w' = w + h[u] - h[v]`. Se poate demonstra că `w' ≥ 0` întotdeauna (dacă nu există cicluri negative), deci Dijkstra poate fi aplicat.

**Etapa 3 — Dijkstra repetat:** Se rulează Dijkstra din fiecare nod `u` pe graful repponderat, obținând distanțele `d'[u][v]`. Distanțele originale se recuperează: `d[u][v] = d'[u][v] - h[u] + h[v]`.

**Pașii algoritmului:**

1. Adaugă nodul virtual `q` și muchii `(q, v, 0)` pentru fiecare nod `v`.
2. Rulează Bellman-Ford din `q` → obține `h[v]` pentru fiecare nod.
3. Dacă Bellman-Ford detectează ciclu negativ → returnează null.
4. Calculează noile ponderi: `w'(u,v) = w(u,v) + h[u] - h[v]`.
5. Pentru fiecare nod `u` (de la 1 la V): rulează Dijkstra din `u` pe graful cu ponderi `w'`.
6. Calculează distanțele originale: `dist[u][v] = dist_Dijkstra[u][v] - h[u] + h[v]`.
7. Returnează matricea `dist`.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| General (heap binar) | O(V² log V + V·E) | O(V²) |
| Grafuri rare (E ≈ V) | O(V² log V) | O(V²) |
| Grafuri dense (E ≈ V²) | O(V³ log V) | O(V²) |

**Explicație:** Bellman-Ford inițial → O(V·E). Dijkstra rulat de V ori cu heap binar → O(V·(V+E)·log V). Spațiul O(V²) pentru matricea de distanțe rezultat. Pentru grafuri rare, Johnson este semnificativ mai rapid decât Floyd-Warshall O(V³).

## Pseudocod

```
Johnson(graf):
  n ← numărul de noduri

  // Etapa 1: Adaugă nod virtual q
  graf_extins ← graf + nod virtual q
  pentru fiecare nod v în graf:
    adaugă muchia (q, v, 0) în graf_extins

  // Etapa 2: Bellman-Ford din q
  h ← BellmanFord(graf_extins, q)
  dacă h = null: returnează null  // ciclu negativ

  // Etapa 3: Reponderare
  pentru fiecare muchie (u, v, w) în graf:
    w_nou(u, v) ← w + h[u] - h[v]  // garantat ≥ 0

  // Etapa 4: Dijkstra din fiecare nod
  dist ← matrice n×n
  pentru fiecare nod u de la 0 la n-1:
    dist_reponderat ← Dijkstra(graf_repponderat, u)
    pentru fiecare nod v de la 0 la n-1:
      dist[u][v] ← dist_reponderat[v] - h[u] + h[v]

  returnează dist
```

## Exemple

Considerăm graful orientat cu 4 noduri:

```
  1 --(-1)--→ 2
  ↑           |
 (4)         (2)
  |           ↓
  4 ←--(5)-- 3
```

Muchii: 1→2(-1), 2→3(2), 3→4(5), 4→1(4).

**Etapa 1:** Adăugăm nodul q cu muchii q→1(0), q→2(0), q→3(0), q→4(0).

**Etapa 2 — Bellman-Ford din q:**
- h[1]=0, h[2]=-1, h[3]=1, h[4]=6.

**Etapa 3 — Reponderare:**
- 1→2: w' = -1 + h[1] - h[2] = -1 + 0 - (-1) = 0
- 2→3: w' = 2 + (-1) - 1 = 0
- 3→4: w' = 5 + 1 - 6 = 0
- 4→1: w' = 4 + 6 - 0 = 10

Toate ponderile sunt nenegative → Dijkstra poate fi aplicat.

**Etapa 4:** Se rulează Dijkstra din fiecare nod pe graful repponderat, apoi se recuperează distanțele originale.

**Matrice distanțe finale:**
```
     1    2    3    4
1  [ 0,  -1,   1,   6 ]
2  [ 6,   0,   2,   7 ]
3  [ 9,   8,   0,   5 ]
4  [ 4,   3,   5,   0 ]
```

## Aplicații

- **Analiza rețelelor complexe:** Calculul tuturor distanțelor minime în rețele cu costuri variabile (inclusiv negative).
- **Compilatoare:** Analiza dependențelor cu constrângeri de diferență (Difference Constraint Systems).
- **Planificarea proiectelor:** Rețele CPM/PERT cu constrângeri temporale de tipul „B trebuie să înceapă cel mai devreme cu X unități după A".
- **Arbitraj valutar:** Detectarea oportunităților de arbitraj (cicluri negative în grafuri de rate de schimb).
- **Rețele de transport:** Optimizarea traseelor cu beneficii și costuri mixte.
- **Bioinformatică:** Calculul tuturor distanțelor evolutive între specii.

## Resurse

- [Wikipedia — Johnson's algorithm](https://en.wikipedia.org/wiki/Johnson%27s_algorithm)
- [GeeksForGeeks — Johnson's Algorithm for All-Pairs Shortest Path](https://www.geeksforgeeks.org/johnsons-algorithm/)
- [CP-Algorithms — All-Pairs Shortest Paths](https://cp-algorithms.com/graph/all-pair-shortest-path-floyd-warshall.html)
- [MIT OpenCourseWare — Advanced Graph Algorithms](https://ocw.mit.edu/courses/6-854j-advanced-algorithms-fall-2008/)
