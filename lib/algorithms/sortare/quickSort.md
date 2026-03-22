# Sortare Rapidă (Quick Sort)

## Introducere

Sortarea rapidă (Quick Sort) este unul dintre cei mai eficienți și utilizați algoritmi de sortare din istoria informaticii. A fost dezvoltat de Tony Hoare în 1959, pe când era student la Universitatea din Moscova, și publicat formal în 1961. Algoritmul se bazează pe paradigma „divide și cucerește" (divide-and-conquer): alege un element pivot, împarte tabloul în două subprobleme și le rezolvă recursiv.

În practică, Quick Sort este adesea mai rapid decât alți algoritmi O(n log n), cum ar fi Merge Sort sau Heap Sort, datorită constantelor mici implicate și a comportamentului favorabil față de memoria cache. Din acest motiv, este algoritmul de sortare implicit în multe biblioteci standard, inclusiv în implementări ale limbajelor C, C++, și Java (pentru sortarea tablourilor primitive).

Performanța algoritmului depinde critic de alegerea pivotului. Alegerea proastă a pivotului (de exemplu, întotdeauna cel mai mic sau cel mai mare element) duce la cazul degenerat O(n²). Strategii moderne de alegere a pivotului, precum „median of three" sau pivotul aleatoriu, reduc probabilitatea cazului prost la aproape zero în practică.

## Descriere

Algoritmul selectează un element pivot din tablou și rearanjează elementele astfel încât toate elementele mai mici decât pivotul să fie în stânga lui, iar cele mai mari să fie în dreapta. Această operație se numește „partiționare". Apoi, algoritmul se aplică recursiv pe cele două subprobleme (stânga și dreapta pivotului).

**Pașii algoritmului:**

1. Dacă tabloul are 0 sau 1 element, acesta este deja sortat — oprește-te (cazul de bază).
2. Alege un element pivot (de obicei ultimul, primul, sau cel din mijloc).
3. Partiționează tabloul: rearanjează elementele astfel încât cele ≤ pivot să fie la stânga și cele > pivot la dreapta.
4. Pivotul ajunge la poziția sa finală corectă în tabloul sortat.
5. Aplică recursiv Quick Sort pe subproblema din stânga pivotului.
6. Aplică recursiv Quick Sort pe subproblema din dreapta pivotului.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(n log n) | O(log n) |
| Mediu | O(n log n) | O(log n) |
| Cel mai rău | O(n²) | O(n) |

**Explicație:** În cazul mediu și cel mai bun, pivotul împarte tabloul aproximativ în jumătate la fiecare pas, rezultând log n niveluri de recursivitate cu O(n) lucru pe fiecare nivel — total O(n log n). Cazul cel mai rău apare când pivotul este întotdeauna cel mai mic sau cel mai mare element (tablou deja sortat cu pivot naiv), creând n niveluri de recursivitate cu O(n) lucru pe fiecare — total O(n²). Spațiul O(log n) provine din stiva de recursivitate.

## Pseudocod

```
functie quickSort(A, stanga, dreapta):
    daca stanga < dreapta:
        pivot_index = partitioneaza(A, stanga, dreapta)
        quickSort(A, stanga, pivot_index - 1)
        quickSort(A, pivot_index + 1, dreapta)

functie partitioneaza(A, stanga, dreapta):
    pivot = A[dreapta]
    i = stanga - 1
    pentru j de la stanga la dreapta-1:
        daca A[j] <= pivot:
            i = i + 1
            interschimba A[i] cu A[j]
    interschimba A[i+1] cu A[dreapta]
    returneaza i + 1
```

## Exemple

**Tablou inițial:** `[10, 7, 8, 9, 1, 5]`

**Pasul 1:** Pivot = 5 (ultimul element)
- Partiționare: elementele ≤ 5 → stânga, elementele > 5 → dreapta
- `[1, 5, 8, 9, 10, 7]` → pivot 5 la index 1
- Subproblema stânga: `[1]` (deja sortat)
- Subproblema dreapta: `[8, 9, 10, 7]`

**Pasul 2:** Pivot = 7 din `[8, 9, 10, 7]`
- `[7, 9, 10, 8]` → pivot 7 la index 0 (din subproblema)
- Stânga: `[]` (gol)
- Dreapta: `[9, 10, 8]`

**Pasul 3:** Pivot = 8 din `[9, 10, 8]`
- `[8, 10, 9]` → pivot 8 la index 0
- Dreapta: `[10, 9]` → pivot 9, rezultat `[9, 10]`

**Tablou final sortat:** `[1, 5, 7, 8, 9, 10]`

## Aplicații

- **Biblioteci standard:** Baza algoritmului std::sort în C++, Arrays.sort în Java (pentru tipuri primitive).
- **Baze de date:** Folosit pentru sortarea înregistrărilor în sisteme de gestiune a bazelor de date.
- **Sisteme de operare:** Kernelul Linux folosește variante de quicksort pentru sortarea internă.
- **Procesare grafică:** Sortarea poligoanelor după adâncime (painter's algorithm).
- **Algoritmi de selecție:** Varianta QuickSelect (derivată din partiționare) găsește al k-lea element în O(n) mediu.
- **Sorting networks:** Principiul partiționării inspiră diverse rețele de sortare hardware.

## Resurse

- [Wikipedia – Quicksort](https://en.wikipedia.org/wiki/Quicksort)
- [GeeksForGeeks – QuickSort](https://www.geeksforgeeks.org/quick-sort/)
- [Visualgo – Sorting](https://visualgo.net/en/sorting)
- [Articolul original Tony Hoare (1962)](https://academic.oup.com/comjnl/article/5/1/10/395053)
