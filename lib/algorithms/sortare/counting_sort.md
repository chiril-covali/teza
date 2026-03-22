# Sortare prin Numărare (Counting Sort)

## Introducere

Sortarea prin numărare (Counting Sort) este un algoritm de sortare non-comparativ care funcționează prin numărarea aparițiilor fiecărui element distinct și utilizarea acestor numărători pentru a determina pozițiile elementelor în tabloul sortat. Spre deosebire de algoritmii bazați pe comparații (care au limita inferioară teoretică Ω(n log n)), Counting Sort poate atinge complexitatea liniară O(n+k), unde k este intervalul valorilor de intrare.

Algoritmul a fost descris de Harold H. Seward în 1954. Funcționează corect doar pentru date întregi (sau care pot fi mapate la întregi) dintr-un interval cunoscut și relativ mic. Dacă k este mult mai mare decât n, algoritmul devine ineficient în privința spațiului și timpului.

Counting Sort este un algoritm stabil: elementele cu valori egale apar în tabloul sortat în aceeași ordine relativă ca în tabloul original. Această stabilitate este esențială când Counting Sort este folosit ca subrutină în Radix Sort, care procesează cifrele de la cea mai puțin semnificativă la cea mai semnificativă.

## Descriere

Algoritmul creează un tablou auxiliar de numărare de dimensiune k (unde k = valoarea_maximă - valoarea_minimă + 1). Numără aparițiile fiecărei valori, transformă numărătorile în indici de poziție (prin sume prefixale), apoi plasează fiecare element la poziția sa corectă în tabloul de ieșire.

**Pașii algoritmului:**

1. Găsește valoarea minimă și maximă din tabloul de intrare.
2. Creează un tablou de numărare `count` de dimensiune (max - min + 1), inițializat cu zerouri.
3. Parcurge tabloul de intrare și incrementează `count[A[i] - min]` pentru fiecare element.
4. Transformă `count` în sume prefixale: `count[i] += count[i-1]` pentru fiecare i.
5. Parcurge tabloul de intrare de la dreapta la stânga (pentru stabilitate): plasează `A[i]` la poziția `count[A[i] - min] - 1` în tabloul de ieșire și decrementează contorul.
6. Copiază tabloul de ieșire înapoi în tabloul original.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(n + k) | O(k) |
| Mediu | O(n + k) | O(k) |
| Cel mai rău | O(n + k) | O(k) |

**Explicație:** Algoritmul face exact 3 parcurgeri liniare: una pentru găsirea min/max (O(n)), una pentru numărare (O(n)), și una pentru plasarea elementelor (O(n)). Inițializarea tabloului de numărare costă O(k). Total: O(n + k). Dacă k = O(n), complexitatea devine O(n) — liniară pură. Spațiul auxiliar este O(k) pentru tabloul de numărare și O(n) pentru tabloul de ieșire.

## Pseudocod

```
functie countingSort(A, n):
    min_val = minim(A)
    max_val = maxim(A)
    k = max_val - min_val + 1

    count = tablou de k zerouri
    output = tablou de n elemente

    // Numara aparitiile
    pentru i de la 0 la n-1:
        count[A[i] - min_val]++

    // Calculeaza sumele prefixale
    pentru i de la 1 la k-1:
        count[i] += count[i-1]

    // Plaseaza elementele (de la dreapta pentru stabilitate)
    pentru i de la n-1 la 0:
        output[count[A[i] - min_val] - 1] = A[i]
        count[A[i] - min_val]--

    copiaza output in A
    returneaza A
```

## Exemple

**Tablou inițial:** `[4, 2, 2, 8, 3, 3, 1]`

**Pasul 1:** min=1, max=8, k=8

**Pasul 2 – Numărare:**
```
Valoare:  1  2  3  4  5  6  7  8
Count:    1  2  2  1  0  0  0  1
```

**Pasul 3 – Sume prefixale:**
```
Valoare:  1  2  3  4  5  6  7  8
Count:    1  3  5  6  6  6  6  7
```
(count[i] = câte elemente sunt ≤ valoarea i+min_val)

**Pasul 4 – Plasare (de la dreapta):**
- A[6]=1 → output[count[0]-1] = output[0] = 1; count[0]=0
- A[5]=3 → output[count[2]-1] = output[4] = 3; count[2]=4
- A[4]=3 → output[count[2]-1] = output[3] = 3; count[2]=3
- A[3]=8 → output[count[7]-1] = output[6] = 8; count[7]=6
- A[2]=2 → output[count[1]-1] = output[2] = 2; count[1]=2
- A[1]=2 → output[count[1]-1] = output[1] = 2; count[1]=1
- A[0]=4 → output[count[3]-1] = output[5] = 4; count[3]=5

**Tablou final sortat:** `[1, 2, 2, 3, 3, 4, 8]`

## Aplicații

- **Sortarea cifrelor în Radix Sort:** Counting Sort este folosit ca subrutină stabilă pentru fiecare cifră.
- **Distribuția notelor:** Sortarea rapidă a notelor dintr-un interval known (0–100).
- **Procesarea pixelilor:** Sortarea valorilor de intensitate ale pixelilor (0–255) în procesarea imaginilor.
- **Statistici pe date discrete:** Calculul frecvențelor și distribuțiilor în statistică.
- **Probleme competitive:** Frecvent folosit în algoritmica competitivă când intervalul valorilor este mic.
- **Sortarea caracterelor:** Sortarea șirurilor de caractere cu alfabet mic (lowercase ASCII).

## Resurse

- [Wikipedia – Counting Sort](https://en.wikipedia.org/wiki/Counting_sort)
- [GeeksForGeeks – Counting Sort](https://www.geeksforgeeks.org/counting-sort/)
- [Visualgo – Sorting](https://visualgo.net/en/sorting)
- [GeeksForGeeks – Radix Sort (folosește Counting Sort)](https://www.geeksforgeeks.org/radix-sort/)
