# Sortare prin Arbore Binar de Căutare (Tree Sort)

## Introducere

Sortarea prin arbore binar de căutare (Tree Sort) este un algoritm de sortare care utilizează structura de date a arborelui binar de căutare (Binary Search Tree — BST) pentru a sorta un tablou. Algoritmul inserează toate elementele tabloului într-un BST, apoi le extrage în ordine prin parcurgerea în-ordine (in-order traversal, stânga-rădăcină-dreapta), care produce elementele în ordine crescătoare.

Tree Sort a fost conceput ca o aplicare directă a proprietăților BST-ului și nu are un inventator specific — apare natural din teoria arborilor binari de căutare, studiată extensiv în anii 1960. Este un algoritm stabil dacă duplicatele sunt inserate cu grijă (de exemplu, prin adăugarea duplicatelor în subproblema dreaptă cu ≤ în loc de <).

Performanța algoritmului depinde critic de echilibrul arborelui. Pentru un arbore echilibrat (AVL, Roșu-Negru), complexitatea este garantată O(n log n). Pentru un BST neechilibrat, în cazul cel mai rău (tablou deja sortat), arborele degenereaza într-o listă înlănțuită și complexitatea devine O(n²). Variantele cu arbori autoechilibrați (AVL Tree Sort) garantează O(n log n) în toate cazurile.

## Descriere

Algoritmul funcționează în două faze: faza de inserție și faza de traversare. În faza de inserție, fiecare element al tabloului este inserat în BST conform regulii standard (elemente mai mici în subproblema stângă, mai mari în dreapta). În faza de traversare, arborele este parcurs în-ordine, iar elementele sunt colectate în ordine sortată.

**Pașii algoritmului:**

1. Creează un BST gol.
2. Parcurge tabloul și inserează fiecare element în BST:
   - Dacă BST-ul este gol, elementul devine rădăcina.
   - Altfel, compară cu rădăcina: dacă e mai mic, inserează în subproblema stângă; dacă e mai mare sau egal, inserează în subproblema dreaptă.
3. Traversează BST-ul în-ordine (recursiv: stânga → rădăcină → dreapta).
4. Colectează elementele vizitate în ordinea traversării — acestea sunt sortate crescător.
5. Copiază elementele colectate înapoi în tabloul original.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(n log n) | O(n) |
| Mediu | O(n log n) | O(n) |
| Cel mai rău | O(n²) | O(n) |

**Explicație:** Inserția unui element într-un BST echilibrat costă O(log n), deci inserarea tuturor n elementelor costă O(n log n). Traversarea în-ordine costă O(n). Total pentru un arbore echilibrat: O(n log n). Cazul cel mai rău apare când tabloul este deja sortat (sau sortat descrescător) — arborele devine o listă înlănțuită cu înălțimea n, iar fiecare inserție costă O(n) → total O(n²). Spațiul O(n) este necesar pentru stocarea arborelui.

## Pseudocod

```
structura Nod:
    valoare
    stanga = null
    dreapta = null

functie inserare(radacina, valoare):
    daca radacina == null:
        returneaza Nod(valoare)
    daca valoare < radacina.valoare:
        radacina.stanga = inserare(radacina.stanga, valoare)
    altfel:
        radacina.dreapta = inserare(radacina.dreapta, valoare)
    returneaza radacina

functie inOrdine(nod, rezultat):
    daca nod == null: returneaza
    inOrdine(nod.stanga, rezultat)
    rezultat.adauga(nod.valoare)
    inOrdine(nod.dreapta, rezultat)

functie treeSort(A, n):
    radacina = null
    pentru i de la 0 la n-1:
        radacina = inserare(radacina, A[i])
    rezultat = lista_goala
    inOrdine(radacina, rezultat)
    copiaza rezultat in A
    returneaza A
```

## Exemple

**Tablou inițial:** `[5, 3, 7, 1, 4]`

**Faza de inserție:**
```
Inserare 5 → radacina:
        5

Inserare 3 (3 < 5 → stânga):
        5
       /
      3

Inserare 7 (7 > 5 → dreapta):
        5
       / \
      3   7

Inserare 1 (1 < 5 → stânga; 1 < 3 → stânga):
        5
       / \
      3   7
     /
    1

Inserare 4 (4 < 5 → stânga; 4 > 3 → dreapta):
        5
       / \
      3   7
     / \
    1   4
```

**Faza de traversare în-ordine:**
- Vizitează 1 (cel mai din stânga)
- Vizitează 3
- Vizitează 4
- Vizitează 5 (rădăcina)
- Vizitează 7

**Tablou final sortat:** `[1, 3, 4, 5, 7]`

## Aplicații

- **Baze de date:** Arborii B (variante ale BST) sunt fundamentali în indexarea bazelor de date.
- **Sistemele de fișiere:** Structuri de directoare și indexare folosesc arbori echilibrați.
- **Sortare dinamică:** Când elementele sunt inserate și extrase interactiv (nu toate deodată).
- **Implementarea map/set:** În C++ STL, `std::map` și `std::set` folosesc arbori roșu-negru.
- **Autocompletare:** Arborii de prefixe (Trie) derivă din principiile BST și sunt folosiți în motoarele de căutare.
- **Interval queries:** Segement Trees și Fenwick Trees sunt variante specializate.

## Resurse

- [Wikipedia – Tree Sort](https://en.wikipedia.org/wiki/Tree_sort)
- [GeeksForGeeks – Tree Sort](https://www.geeksforgeeks.org/tree-sort/)
- [Wikipedia – Binary Search Tree](https://en.wikipedia.org/wiki/Binary_search_tree)
- [Visualgo – BST](https://visualgo.net/en/bst)
