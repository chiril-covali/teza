# Sortare prin Interschimb (Swap Sort / Exchange Sort)

## Introducere

Sortarea prin interschimb (Swap Sort sau Exchange Sort) este un algoritm simplu de sortare bazat pe comparații, care compară fiecare element cu toate elementele ulterioare și le interschimbă dacă se află în ordine greșită. Deși conceptual similar cu sortarea prin bule (Bubble Sort), diferența fundamentală constă în structura comparațiilor: Bubble Sort compară perechi adiacente, în timp ce Exchange Sort compară fiecare element cu toate elementele rămase din tablou.

Algoritmul este unul dintre cei mai timpurii și mai intuitivi algoritmi de sortare, fără un inventator specific documentat — derivă natural din gândul „ia primul element și asigură-te că este cel mai mic din tot tabloul". Este varianta cea mai directă și naivă a sortării prin comparație directă.

În ciuda simplității sale, Swap Sort este ineficient pentru seturi mari de date (O(n²) în toate cazurile) și nu este stabil (ordinea relativă a elementelor egale nu este garantată). Este prezentat în cursuri introductive de informatică alături de Bubble Sort și Selection Sort ca exemplu de algoritm simplu dar lent.

## Descriere

Algoritmul parcurge tabloul cu două bucle imbricate. Bucla exterioară selectează fiecare element pe rând (de la stânga la dreapta). Bucla interioară compară elementul selectat cu fiecare element următor. Dacă elementul selectat este mai mare decât un element ulterior, se efectuează o interschimbare imediată. La finalul iterației buclei exterioare, elementul de la poziția curentă este cel mai mic din restul tabloului nesortata.

**Pașii algoritmului:**

1. Parcurge tabloul cu un index `i` de la 0 la n-2 (bucla exterioară).
2. Pentru fiecare `i`, parcurge restul tabloului cu un index `j` de la `i+1` la `n-1` (bucla interioară).
3. Compară `A[i]` cu `A[j]`.
4. Dacă `A[i] > A[j]`, interschimbă `A[i]` cu `A[j]` imediat.
5. Continuă bucla interioară cu noul `A[i]` (după interschimbare).
6. La finalul buclei interioare, `A[i]` conține cel mai mic element din `A[i..n-1]`.
7. Avansează bucla exterioară și repetă.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(n²) | O(1) |
| Mediu | O(n²) | O(1) |
| Cel mai rău | O(n²) | O(1) |

**Explicație:** Indiferent de datele de intrare, algoritmul execută întotdeauna exact n(n-1)/2 comparații — bucla exterioară rulează n-1 ori, iar bucla interioară rulează n-1-i ori pentru fiecare i. Suma: (n-1) + (n-2) + ... + 1 = n(n-1)/2 = O(n²). Numărul de interschimbări variază: în cel mai bun caz 0 (tablou deja sortat), în cel mai rău caz O(n²) (tablou sortat descrescător). Spațiul este O(1) — sortarea este in-place. Spre deosebire de Selection Sort (care face maxim n-1 interschimbări), Swap Sort poate face mult mai multe.

## Pseudocod

```
functie swapSort(A, n):
    pentru i de la 0 la n-2:
        pentru j de la i+1 la n-1:
            daca A[i] > A[j]:
                interschimba A[i] cu A[j]
    returneaza A
```

## Exemple

**Tablou inițial:** `[4, 3, 1, 2]`

**Iterația i=0 (A[0]=4):**
- j=1: A[0]=4 > A[1]=3 → interschimbă → `[3, 4, 1, 2]`
- j=2: A[0]=3 > A[2]=1 → interschimbă → `[1, 4, 3, 2]`
- j=3: A[0]=1 < A[3]=2 → nu interschimbă
- **Rezultat:** `[1, 4, 3, 2]` ← A[0]=1 este cel mai mic

**Iterația i=1 (A[1]=4):**
- j=2: A[1]=4 > A[2]=3 → interschimbă → `[1, 3, 4, 2]`
- j=3: A[1]=3 > A[3]=2 → interschimbă → `[1, 2, 4, 3]`
- **Rezultat:** `[1, 2, 4, 3]` ← A[1]=2 este al doilea cel mai mic

**Iterația i=2 (A[2]=4):**
- j=3: A[2]=4 > A[3]=3 → interschimbă → `[1, 2, 3, 4]`
- **Rezultat:** `[1, 2, 3, 4]` ← A[2]=3 este al treilea cel mai mic

**Tablou final sortat:** `[1, 2, 3, 4]`

**Comparație cu Selection Sort pe același exemplu:**
- Selection Sort: găsește minimul `1` la indexul 2, face O interschimbare (A[0] ↔ A[2])
- Swap Sort: face 3 interschimbări în iterația i=0 pentru a obține același rezultat
- Selection Sort este mai eficient la interschimbări, dar ambii sunt O(n²) la comparații

## Aplicații

- **Scop educațional:** Ilustrează diferența dintre abordări similare (față de Selection Sort și Bubble Sort).
- **Implementări simple:** Când se dorește cel mai simplu posibil cod de sortare, fără optimizări.
- **Sisteme cu memorie localizată:** Accesul la A[i] repetat în bucla interioară poate beneficia de cache.
- **Prototipare:** Verificarea rapidă a corectitudinii datelor în seturi mici.

## Resurse

- [Wikipedia – Sorting Algorithm (Exchange Sort)](https://en.wikipedia.org/wiki/Sorting_algorithm#Exchange_sort)
- [GeeksForGeeks – Exchange Sort](https://www.geeksforgeeks.org/exchange-sort/)
- [Wikipedia – Bubble Sort (comparație)](https://en.wikipedia.org/wiki/Bubble_sort)
- [GeeksForGeeks – Comparison of Sorting Algorithms](https://www.geeksforgeeks.org/time-complexities-of-all-sorting-algorithms/)
