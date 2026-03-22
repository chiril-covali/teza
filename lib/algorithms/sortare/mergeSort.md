# Sortare prin Interclasare (Merge Sort)

## Introducere

Sortarea prin interclasare (Merge Sort) este un algoritm clasic de sortare bazat pe paradigma „divide și cucerește", inventat de John von Neumann în 1945. Este unul dintre primii algoritmi de sortare eficienți demonstrați formal și rămâne un algoritm fundamental atât în teorie, cât și în practică.

Algoritmul divide recursiv tabloul în jumătăți, sortează fiecare jumătate independent, apoi interclasează (merge) cele două jumătăți sortate pentru a obține rezultatul final. Complexitatea sa garantată de O(n log n) în toate cazurile — inclusiv cazul cel mai rău — îl face superior algoritmilor O(n²) și mai previzibil decât Quick Sort.

Un avantaj major al Merge Sort este că este un algoritm stabil: elementele cu valori egale își păstrează ordinea relativă din tabloul original. Această proprietate este esențială în aplicații care necesită sortare multiplă (de exemplu, sortarea după mai multe criterii). De asemenea, Merge Sort este excelent pentru sortarea listelor înlănțuite și pentru sortarea externă (când datele nu încap în memorie RAM).

## Descriere

Algoritmul funcționează în două faze principale: faza de divizare și faza de interclasare. În faza de divizare, tabloul este împărțit recursiv în jumătăți până când fiecare subproblema are un singur element (care este prin definiție sortat). În faza de interclasare, perechile de subprobleme sortate sunt combinate în ordine pentru a produce subprobleme mai mari sortate.

**Pașii algoritmului:**

1. Dacă tabloul are 0 sau 1 element, acesta este deja sortat (cazul de bază).
2. Găsește mijlocul tabloului: `mid = (stânga + dreapta) / 2`.
3. Aplică recursiv Merge Sort pe jumătatea stângă `[stânga, mid]`.
4. Aplică recursiv Merge Sort pe jumătatea dreaptă `[mid+1, dreapta]`.
5. Interclasează cele două jumătăți sortate într-un tablou auxiliar.
6. Copiază rezultatul interclasării înapoi în tabloul original.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(n log n) | O(n) |
| Mediu | O(n log n) | O(n) |
| Cel mai rău | O(n log n) | O(n) |

**Explicație:** Algoritmul divide întotdeauna tabloul în jumătăți, rezultând log n niveluri de recursivitate. La fiecare nivel, operația de interclasare procesează toate cele n elemente, deci costul pe nivel este O(n). Totalul este O(n log n) indiferent de datele de intrare. Dezavantajul față de Quick Sort este necesitatea unui tablou auxiliar de dimensiune O(n) pentru operația de interclasare.

## Pseudocod

```
functie mergeSort(A, stanga, dreapta):
    daca stanga >= dreapta:
        returneaza
    mid = (stanga + dreapta) / 2
    mergeSort(A, stanga, mid)
    mergeSort(A, mid+1, dreapta)
    interclaseaza(A, stanga, mid, dreapta)

functie interclaseaza(A, stanga, mid, dreapta):
    stanga_part = A[stanga..mid]
    dreapta_part = A[mid+1..dreapta]
    i = 0, j = 0, k = stanga
    cat timp i < len(stanga_part) si j < len(dreapta_part):
        daca stanga_part[i] <= dreapta_part[j]:
            A[k] = stanga_part[i]; i++
        altfel:
            A[k] = dreapta_part[j]; j++
        k++
    copiaza elementele ramase din stanga_part sau dreapta_part in A
```

## Exemple

**Tablou inițial:** `[38, 27, 43, 3, 9, 82, 10]`

**Faza de divizare:**
```
[38, 27, 43, 3, 9, 82, 10]
       /              \
[38, 27, 43]      [3, 9, 82, 10]
   /     \           /        \
[38]  [27, 43]   [3, 9]    [82, 10]
       /   \      /   \      /   \
     [27] [43]  [3]  [9]  [82] [10]
```

**Faza de interclasare:**
```
[27] + [43] → [27, 43]
[38] + [27, 43] → [27, 38, 43]
[3] + [9] → [3, 9]
[82] + [10] → [10, 82]
[3, 9] + [10, 82] → [3, 9, 10, 82]
[27, 38, 43] + [3, 9, 10, 82] → [3, 9, 10, 27, 38, 43, 82]
```

**Tablou final sortat:** `[3, 9, 10, 27, 38, 43, 82]`

## Aplicații

- **Sortare externă:** Ideal când datele sunt prea mari pentru memorie RAM (se sortează blocuri pe disc și se interclasează).
- **Sortarea listelor înlănțuite:** Nu necesită acces aleatoriu la memorie, spre deosebire de Quick Sort.
- **Algoritmi stabili:** Oriunde ordinea relativă a elementelor egale trebuie păstrată (sortare multicriterială).
- **Timsort:** Algoritmul din Python și Java standard library combină Merge Sort cu Insertion Sort.
- **Procesare paralelă:** Se poate paraleliza eficient — fiecare jumătate poate fi sortată independent pe procesoare diferite.
- **Inversiunile dintr-un tablou:** Merge Sort poate fi modificat să numere inversiunile în O(n log n).

## Resurse

- [Wikipedia – Merge Sort](https://en.wikipedia.org/wiki/Merge_sort)
- [GeeksForGeeks – Merge Sort](https://www.geeksforgeeks.org/merge-sort/)
- [Visualgo – Sorting](https://visualgo.net/en/sorting)
- [Khan Academy – Merge Sort](https://www.khanacademy.org/computing/computer-science/algorithms/merge-sort/a/divide-and-conquer-algorithms)
