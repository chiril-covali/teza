# Selecție Rapidă (QuickSelect)

## Introducere

QuickSelect este un algoritm de selecție eficient care găsește al k-lea cel mai mic element dintr-un tablou nesortat, fără a sorta întregul tablou. A fost inventat de Tony Hoare în 1961 — același om care a inventat Quick Sort — și este publicat în aceeași lucrare. QuickSelect folosește aceeași operație de partiționare ca Quick Sort, dar în loc să recurse pe ambele subprobleme, recurse doar pe subproblema care conține al k-lea element căutat.

Algoritmul este fundamental în statistică computațională: găsirea medianei, a percentilelor sau a oricărui element de ordine dintr-un set de date. Mediana poate fi găsită în O(n) timp mediu cu QuickSelect, față de O(n log n) care ar fi necesare dacă sortam întregul tablou mai întâi.

Varianta deterministă numită „Median of Medians" (sau BFPRT, după autorii Blum, Floyd, Pratt, Rivest, Tarjan, 1973) garantează O(n) în cel mai rău caz prin alegerea inteligentă a pivotului, dar cu o constantă mai mare, deci mai rar folosită în practică față de QuickSelect cu pivot aleatoriu.

## Descriere

QuickSelect alege un pivot, partiționează tabloul (elementele mai mici la stânga, mai mari la dreapta, pivotul la poziția sa finală), și verifică unde se află al k-lea element. Dacă pivotul se află exact la poziția k, algoritmul se termină. Altfel, recurse doar pe subproblema stângă sau dreaptă, în funcție de unde se află k.

**Pașii algoritmului:**

1. Dacă tabloul are un singur element, returnează-l (cazul de bază).
2. Alege un pivot (aleatoriu sau ultimul/primul element).
3. Partiționează tabloul: elementele < pivot la stânga, elementele > pivot la dreapta.
4. Fie `pivot_index` poziția finală a pivotului.
5. Dacă `pivot_index == k`, returnează `A[pivot_index]` — acesta este al k-lea cel mai mic element.
6. Dacă `k < pivot_index`, aplică QuickSelect recursiv pe subproblema stângă `[stânga, pivot_index-1]`.
7. Dacă `k > pivot_index`, aplică QuickSelect recursiv pe subproblema dreaptă `[pivot_index+1, dreapta]` cu `k` ajustat.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(n) | O(1) |
| Mediu | O(n) | O(log n) |
| Cel mai rău | O(n²) | O(n) |

**Explicație:** În cazul mediu, la fiecare pas se reduce dimensiunea problemei cu aproximativ jumătate: n + n/2 + n/4 + ... = 2n = O(n). Cazul cel mai rău apare când pivotul este întotdeauna cel mai mic sau cel mai mare element, reducând tabloul cu un singur element la fiecare pas: n + (n-1) + ... + 1 = O(n²). Cu pivot aleatoriu, probabilitatea cazului prost este extrem de mică. Spațiul O(log n) provine din stiva de recursivitate în cazul mediu.

## Pseudocod

```
functie quickSelect(A, stanga, dreapta, k):
    daca stanga == dreapta:
        returneaza A[stanga]

    pivot_index = partitioneaza(A, stanga, dreapta)

    daca k == pivot_index:
        returneaza A[pivot_index]
    altfel daca k < pivot_index:
        returneaza quickSelect(A, stanga, pivot_index - 1, k)
    altfel:
        returneaza quickSelect(A, pivot_index + 1, dreapta, k)

functie partitioneaza(A, stanga, dreapta):
    pivot = A[dreapta]
    i = stanga - 1
    pentru j de la stanga la dreapta-1:
        daca A[j] <= pivot:
            i++
            interschimba A[i] cu A[j]
    interschimba A[i+1] cu A[dreapta]
    returneaza i + 1
```

## Exemple

**Tablou:** `[7, 10, 4, 3, 20, 15]`, k=3 (al 3-lea cel mai mic element)

**Partiționare cu pivot=15 (ultimul):**
- Elementele ≤ 15: 7, 10, 4, 3, 15; elementele > 15: 20
- `[7, 10, 4, 3, 15, 20]` → pivot_index=4
- k=2 (0-indexat) < pivot_index=4 → recurse pe `[7, 10, 4, 3]`

**Partiționare pe `[7, 10, 4, 3]` cu pivot=3:**
- Elementele ≤ 3: 3; elementele > 3: 7, 10, 4
- `[3, 10, 4, 7]` → pivot_index=0 (relativ la subproblema)
- k=2 > pivot_index=0 → recurse pe `[10, 4, 7]`, k=1 (ajustat)

**Partiționare pe `[10, 4, 7]` cu pivot=7:**
- `[4, 7, 10]` → pivot_index=1 (relativ)
- k=1 == pivot_index=1 → **returnează 7**

**Rezultat:** Al 3-lea cel mai mic element este **7** (tabloul sortat: [3, 4, 7, 10, 15, 20])

## Aplicații

- **Calculul medianei:** Găsirea medianei unui set de date în O(n) mediu, față de O(n log n) prin sortare.
- **Statistici de ordine:** Percentile, quartile, decile în statistică și analiza datelor.
- **Algoritmi de geometrie computațională:** Găsirea mediatorului optim sau a planului de separare.
- **Procesarea fluxurilor de date:** Găsirea elementului de rang k dintr-un flux de date mare.
- **Machine learning:** Algoritmi k-nearest neighbors pot folosi QuickSelect pentru selecția rapidă.
- **Jocuri video:** Selecția rapidă a celor mai bune k scoruri dintr-un clasament.

## Resurse

- [Wikipedia – Quickselect](https://en.wikipedia.org/wiki/Quickselect)
- [GeeksForGeeks – QuickSelect Algorithm](https://www.geeksforgeeks.org/quickselect-algorithm/)
- [Wikipedia – Median of Medians (variantă deterministă)](https://en.wikipedia.org/wiki/Median_of_medians)
- [Articolul lui Tony Hoare (1961)](https://dl.acm.org/doi/10.1145/366622.366647)
