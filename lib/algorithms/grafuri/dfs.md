# Parcurgere în Adâncime (DFS)

Slug: grafuri_dfs
Categorie: Grafuri

## Introducere

Parcurgerea în Adâncime (DFS — Depth-First Search) este un algoritm clasic de traversare a grafurilor care explorează fiecare ramură cât mai adânc posibil înainte de a reveni înapoi (backtracking) și a explora alte ramuri. Algoritmul urmează o cale de la nodul sursă până ajunge la un nod fără vecini nevizitați, după care se întoarce la cel mai recent nod cu vecini nevizitați.

DFS a fost introdus formal de matematicianul francez Charles Pierre Trémaux în secolul al XIX-lea ca metodă de rezolvare a labirinturilor. În contextul informaticii, algoritmul a căpătat importanță odată cu dezvoltarea teoriei grafurilor și a algoritmilor pe grafuri în a doua jumătate a secolului XX. Robert Tarjan a contribuit semnificativ la înțelegerea și aplicarea DFS prin utilizarea sa în algoritmi pentru componente tare conexe și punți.

DFS este un algoritm versatil care stă la baza multor algoritmi avansați: sortare topologică, detectarea ciclurilor, identificarea componentelor tare conexe (Kosaraju, Tarjan), găsirea punților și punctelor de articulație, și rezolvarea problemelor de backtracking (N-Queens, Sudoku etc.).

## Descriere

DFS utilizează o **stivă** (structură LIFO — Last In, First Out), fie explicit (stivă de date), fie implicit (prin recursivitate, care folosește stiva de apeluri a sistemului). Algoritmul marchează nodurile vizitate pentru a evita ciclurile infinite.

Există două variante principale: **DFS recursiv** (mai elegant și mai ușor de implementat, dar poate cauza stack overflow pentru grafuri mari) și **DFS iterativ** (folosește o stivă explicită, mai robust pentru grafuri mari).

**Pașii algoritmului (varianta recursivă):**

1. Marchează nodul curent ca vizitat.
2. Procesează nodul curent (de ex., adaugă la lista de vizitate).
3. Pentru fiecare vecin al nodului curent:
   a. Dacă vecinul nu a fost vizitat, apelează recursiv DFS pentru vecin.
4. La întoarcere din recursivitate, înregistrează nodul în stiva de finalizare (util pentru sortare topologică).

**Pașii algoritmului (varianta iterativă):**

1. Inițializează o stivă și adaugă nodul sursă.
2. Câtă vreme stiva nu este goală:
   a. Extrage nodul din vârful stivei.
   b. Dacă nodul nu a fost vizitat, marchează-l și procesează-l.
   c. Adaugă toți vecinii nevizitați în stivă.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| General | O(V + E) | O(V) |

**Explicație:** Fiecare nod (V) este vizitat exact o dată — O(V). Fiecare muchie (E) este examinată cel mult de două ori (o dată din fiecare capăt, în grafuri neorientate) — O(E). Complexitatea spațială este O(V) pentru stiva recursivă sau stiva explicită, în cazul cel mai defavorabil (un graf liniar/lanț necesită adâncime de recursivitate egală cu V).

## Pseudocod

```
DFS_Recursiv(graf, nod, vizitat):
  marchează nod ca vizitat
  adaugă nod la rezultat

  pentru fiecare vecin în lista_de_adiacență[nod]:
    dacă vecin nu este în vizitat:
      DFS_Recursiv(graf, vecin, vizitat)

DFS_Principal(graf, sursă):
  vizitat ← mulțime goală
  rezultat ← listă goală
  DFS_Recursiv(graf, sursă, vizitat)
  returnează rezultat

DFS_Iterativ(graf, sursă):
  stivă ← stivă goală
  vizitat ← mulțime goală
  rezultat ← listă goală

  adaugă sursă în stivă

  cât timp stiva nu este goală:
    nod_curent ← extrage din vârful stivei
    dacă nod_curent nu este în vizitat:
      marchează nod_curent ca vizitat
      adaugă nod_curent la rezultat
      pentru fiecare vecin în lista_de_adiacență[nod_curent]:
        dacă vecin nu este în vizitat:
          adaugă vecin în stivă

  returnează rezultat
```

## Exemple

Considerăm graful neorientat următor:

```
  1
 / \
2   3
|   |
4   5
```

Muchii: 1-2, 1-3, 2-4, 3-5. Sursă: nodul 1.

**Execuție DFS recursiv (pas cu pas):**

| Pas | Acțiune | Stivă de apeluri | Vizitate | Rezultat |
|-----|---------|-----------------|----------|----------|
| 1 | Vizitează 1 | [1] | {1} | [1] |
| 2 | Vizitează 2 (vecin al lui 1) | [1, 2] | {1, 2} | [1, 2] |
| 3 | Vizitează 4 (vecin al lui 2) | [1, 2, 4] | {1, 2, 4} | [1, 2, 4] |
| 4 | 4 nu are vecini nevizitați → backtrack | [1, 2] | {1, 2, 4} | [1, 2, 4] |
| 5 | 2 nu are vecini nevizitați → backtrack | [1] | {1, 2, 4} | [1, 2, 4] |
| 6 | Vizitează 3 (vecin al lui 1) | [1, 3] | {1, 2, 3, 4} | [1, 2, 4, 3] |
| 7 | Vizitează 5 (vecin al lui 3) | [1, 3, 5] | {1, 2, 3, 4, 5} | [1, 2, 4, 3, 5] |
| 8 | Gata | [] | {1, 2, 3, 4, 5} | [1, 2, 4, 3, 5] |

Ordinea de vizitare: **1 → 2 → 4 → 3 → 5**.

## Aplicații

- **Sortare topologică:** Ordonarea nodurilor unui DAG (graf aciclic orientat) astfel încât fiecare muchie merge de la un nod cu rang mai mic la unul cu rang mai mare.
- **Detectarea ciclurilor:** Prezența unei muchii posterioare (back edge) în DFS indică existența unui ciclu.
- **Componente tare conexe:** Algoritmii Kosaraju și Tarjan se bazează pe DFS.
- **Rezolvarea labirinturilor:** DFS poate găsi o cale (nu neapărat cea mai scurtă) printr-un labirint.
- **Probleme de backtracking:** N-Queens, Sudoku, generarea permutărilor și combinărilor.
- **Analiza rețelelor:** Detectarea punților (muchii a căror eliminare deconectează graful) și a punctelor de articulație.
- **Compilatoare:** Analiza dependențelor, detectarea ciclurilor în grafurile de dependențe.
- **Jocuri:** Algoritmi de căutare în spații de stări (minimax, MCTS).

## Resurse

- [Wikipedia — Depth-first search](https://en.wikipedia.org/wiki/Depth-first_search)
- [GeeksForGeeks — DFS of a Graph](https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/)
- [Visualgo — BFS/DFS Visualization](https://visualgo.net/en/dfsbfs)
- [CP-Algorithms — DFS and its applications](https://cp-algorithms.com/graph/depth-first-search.html)
