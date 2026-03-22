# Parcurgere în Lățime (BFS)

Slug: grafuri_bfs
Categorie: Grafuri

## Introducere

Parcurgerea în Lățime (BFS — Breadth-First Search) este un algoritm fundamental de traversare a grafurilor care explorează sistematic toate nodurile unui graf, nivel cu nivel, pornind de la un nod sursă. Spre deosebire de parcurgerea în adâncime, BFS vizitează mai întâi toți vecinii unui nod înainte de a avansa mai departe în graf.

Algoritmul a fost descris pentru prima dată de Konrad Zuse în teza sa de doctorat din 1945, în contextul limbajului de programare Plankalkül. A fost redescoperit și formalizat de Edward F. Moore în 1959, în cadrul cercetărilor privind găsirea celei mai scurte căi în labirinturi. C.Y. Lee a aplicat independent același principiu în 1961 pentru rutarea conexiunilor pe plăci de circuit imprimat.

BFS rezolvă mai multe probleme esențiale: găsește cea mai scurtă cale (în număr de muchii) între două noduri într-un graf neponderat, verifică dacă un graf este conex, determină distanța minimă de la o sursă la toate celelalte noduri și este utilizat ca bază pentru algoritmi mai complecși precum Edmonds-Karp pentru fluxul maxim.

## Descriere

BFS utilizează o **coadă** (structură FIFO — First In, First Out) pentru a ține evidența nodurilor ce urmează să fie explorate. Algoritmul marchează fiecare nod vizitat pentru a evita procesarea duplicată, garantând că fiecare nod este procesat o singură dată.

Ideea centrală este simplă: se pornește de la nodul sursă, se adaugă toți vecinii săi nevizitați în coadă, apoi se procesează fiecare element din coadă la rândul său, adăugând la rândul lor vecinii nevizitați. Procesul continuă până când coada este goală, moment în care toate nodurile accesibile din sursă au fost vizitate.

**Pașii algoritmului:**

1. Inițializează o coadă și adaugă nodul sursă în ea.
2. Marchează nodul sursă ca vizitat.
3. Câtă vreme coada nu este goală:
   a. Extrage primul nod din coadă (nodul curent).
   b. Procesează nodul curent (de ex., afișează valoarea sa).
   c. Pentru fiecare vecin nevizitat al nodului curent:
      - Marchează vecinul ca vizitat.
      - Adaugă vecinul la sfârșitul cozii.
4. Algoritmul se termină când coada devine goală.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| General | O(V + E) | O(V) |

**Explicație:** Fiecare nod (V) este adăugat și extras din coadă exact o dată — O(V). Fiecare muchie (E) este examinată exact o dată (sau de două ori pentru grafuri neorientate) — O(E). Complexitatea spațială este O(V) deoarece în cel mai rău caz coada poate conține toate nodurile grafului simultan (de ex., un graf stea cu toate nodurile la același nivel).

## Pseudocod

```
BFS(graf, sursă):
  coadă ← coadă goală
  vizitat ← mulțime goală
  distanță ← dicționar (toate valorile = infinit)

  adaugă sursă în coadă
  marchează sursă ca vizitat
  distanță[sursă] ← 0

  cât timp coada nu este goală:
    nod_curent ← extrage primul element din coadă
    pentru fiecare vecin în lista_de_adiacență[nod_curent]:
      dacă vecin nu este în vizitat:
        marchează vecin ca vizitat
        distanță[vecin] ← distanță[nod_curent] + 1
        adaugă vecin în coadă

  returnează distanță
```

## Exemple

Considerăm graful neorientat următor:

```
    1
   / \
  2   3
 / \   \
4   5   6
```

Muchii: 1-2, 1-3, 2-4, 2-5, 3-6. Sursă: nodul 1.

**Execuție pas cu pas:**

| Pas | Nod curent | Coadă după pas | Vizitate |
|-----|-----------|----------------|----------|
| Start | — | [1] | {1} |
| 1 | 1 | [2, 3] | {1, 2, 3} |
| 2 | 2 | [3, 4, 5] | {1, 2, 3, 4, 5} |
| 3 | 3 | [4, 5, 6] | {1, 2, 3, 4, 5, 6} |
| 4 | 4 | [5, 6] | {1, 2, 3, 4, 5, 6} |
| 5 | 5 | [6] | {1, 2, 3, 4, 5, 6} |
| 6 | 6 | [] | {1, 2, 3, 4, 5, 6} |

**Distanțe calculate:** d(1)=0, d(2)=1, d(3)=1, d(4)=2, d(5)=2, d(6)=2.

Ordinea de vizitare: **1 → 2 → 3 → 4 → 5 → 6** (nivel cu nivel).

## Aplicații

- **Cel mai scurt drum în grafuri neponderate:** BFS garantează găsirea căii cu număr minim de muchii între sursă și destinație.
- **Rețele sociale:** Determinarea gradului de separare între utilizatori (ex: „6 grade de separare").
- **Navigare GPS și hărți:** Găsirea celui mai scurt drum în rețele stradale cu costuri egale.
- **Crawlere web:** Indexarea paginilor web pornind de la o pagină sursă, nivel cu nivel.
- **Verificarea conexității:** Determinarea dacă toate nodurile unui graf sunt accesibile din sursă.
- **Rezolvarea puzzle-urilor:** Jocul 15 (Fifteen Puzzle), labirinturi — găsirea soluției optime.
- **Protocoale de rețea:** Algoritmul Spanning Tree din rețelele Ethernet folosește BFS.
- **Detectarea componentelor conexe:** Identificarea tuturor componentelor unui graf neorientat.

## Resurse

- [Wikipedia — Breadth-first search](https://en.wikipedia.org/wiki/Breadth-first_search)
- [GeeksForGeeks — BFS for a Graph](https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/)
- [Visualgo — BFS/DFS Visualization](https://visualgo.net/en/dfsbfs)
- [CP-Algorithms — BFS](https://cp-algorithms.com/graph/breadth-first-search.html)
