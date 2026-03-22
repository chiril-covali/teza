# Verificarea Grafului Bipartit

Slug: grafuri_bipartite_graph
Categorie: Grafuri

## Introducere

Un **graf bipartit** este un graf ale cărui noduri pot fi împărțite în **două mulțimi disjuncte** (să le numim A și B), astfel încât fiecare muchie a grafului conectează un nod din A cu un nod din B — nicio muchie nu conectează două noduri din aceeași mulțime. Această proprietate fundamentală apare natural în numeroase contexte practice.

Conceptul de bipartitate provine din matematica combinatorialistă și teoria grafurilor clasice. **Teorema lui König** (1916) stabilește că în grafurile bipartite, dimensiunea maximă a unui cuplaj (matching) este egală cu dimensiunea minimă a unei acoperiri cu vârfuri — un rezultat elegant fără corespondent direct în grafurile generale. **Teorema lui König-Egerváry** extinde aceasta la grafuri ponderate.

Verificarea bipartității se realizează eficient prin **2-colorarea grafului** cu BFS sau DFS: se atribuie culorile 0 și 1 alternativ nodurilor, pornind de la orice nod. Dacă la un moment dat un vecin are aceeași culoare cu nodul curent, graful nu este bipartit. Echivalent, **un graf este bipartit dacă și numai dacă nu conține niciun ciclu de lungime impară**.

## Descriere

Algoritmul de verificare a bipartității utilizează **BFS cu 2-colorare**: se atribuie fiecărui nod o culoare (0 sau 1) și se verifică că nicio muchie nu conectează două noduri de aceeași culoare.

Dacă graful nu este conex, algoritmul trebuie pornit din câte un nod nevizitat al fiecărei componente conexe.

**Pașii algoritmului:**

1. Inițializează un array de culori cu -1 (nevizitat) pentru toate nodurile.
2. Pentru fiecare nod nevizitat (pentru grafuri neconexe):
   a. Atribuie culoarea 0 nodului curent.
   b. Adaugă nodul în coadă (BFS).
   c. Câtă vreme coada nu este goală:
      - Extrage nodul curent `u`.
      - Pentru fiecare vecin `v` al lui `u`:
        - Dacă `v` nu are culoare: atribuie culoarea opusă lui `u` și adaugă în coadă.
        - Dacă `v` are aceeași culoare ca `u`: **graful nu este bipartit → returnează false**.
3. Dacă toate verificările trec: **returnează true** (graful este bipartit).

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| General | O(V + E) | O(V) |

**Explicație:** Algoritmul efectuează o parcurgere BFS/DFS completă a grafului, vizitând fiecare nod (V) și fiecare muchie (E) exact o dată → O(V + E). Spațiul necesar este O(V) pentru coada BFS și array-ul de culori.

## Pseudocod

```
EsteBipartit(graf):
  n ← numărul de noduri
  culoare ← array de n elemente, inițializat cu -1

  pentru fiecare nod start de la 0 la n-1:
    dacă culoare[start] = -1:
      culoare[start] ← 0
      coadă ← [start]

      cât timp coada nu este goală:
        u ← extrage din coadă
        pentru fiecare v în vecini[u]:
          dacă culoare[v] = -1:
            culoare[v] ← 1 - culoare[u]  // culoare opusă
            adaugă v în coadă
          altfel dacă culoare[v] = culoare[u]:
            returnează false  // conflict de culoare

  returnează true

ObținePartiție(graf, culoare):
  mulțimea_A ← [nod pentru nod în V dacă culoare[nod] = 0]
  mulțimea_B ← [nod pentru nod în V dacă culoare[nod] = 1]
  returnează mulțimea_A, mulțimea_B
```

## Exemple

**Exemplu 1 — Graf bipartit:**

```
  1 --- 2
  |     |
  3 --- 4
```

Muchii: 1-2, 1-3, 2-4, 3-4.

**Execuție BFS cu colorare (start = 1):**

| Pas | Nod | Culoare atribuită | Vecini procesați | Stare |
|-----|-----|-------------------|-----------------|-------|
| 1 | 1 | 0 (roșu) | 2, 3 | OK |
| 2 | 2 | 1 (albastru) | 1(0≠1✓), 4 | OK |
| 3 | 3 | 1 (albastru) | 1(0≠1✓), 4 | OK |
| 4 | 4 | 0 (roșu) | 2(1≠0✓), 3(1≠0✓) | OK |

**Rezultat:** Bipartit ✓ — A={1,4}, B={2,3}.

**Exemplu 2 — Graf non-bipartit (ciclu impar):**

```
  1 --- 2
   \   /
    \ /
     3
```

Muchii: 1-2, 2-3, 1-3 (triunghi — ciclu de lungime 3).

**Execuție BFS (start = 1):**
- culoare[1]=0, culoare[2]=1, culoare[3]=1 (din 1)
- Procesăm 2: vecinul 3 are culoare[3]=1=culoare[2] → **CONFLICT!**

**Rezultat:** Non-bipartit ✗ (ciclu impar de lungime 3).

## Aplicații

- **Problema de cuplaj (Matching):** Algoritmi de cuplaj maxim (Hopcroft-Karp) necesită grafuri bipartite — angajatori și angajați, studenți și burse.
- **Colorarea hărților:** Verificarea dacă o hartă poate fi colorată cu 2 culori.
- **Programarea examenelor:** Verificarea conflictelor — studenți vs. examene.
- **Rețele de recomandare:** Utilizatori vs. produse/filme în sisteme collaborative filtering.
- **Chimie:** Moleculele alternante (alternate hydrocarbons) formează grafuri bipartite.
- **Teorema celor 4 culori:** Reduceri și demonstrații în teoria colorărilor.
- **Verificarea conflictelor în baze de date:** Detectarea dependențelor circulare impare.

## Resurse

- [Wikipedia — Bipartite graph](https://en.wikipedia.org/wiki/Bipartite_graph)
- [GeeksForGeeks — Bipartite Graph](https://www.geeksforgeeks.org/bipartite-graph/)
- [Visualgo — Graph Traversal](https://visualgo.net/en/dfsbfs)
- [CP-Algorithms — Bipartite Graph Check](https://cp-algorithms.com/graph/bipartite-check.html)
