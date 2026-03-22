# Sortare Shell (Shell Sort)

## Introducere

Sortarea Shell (Shell Sort) este un algoritm de sortare generalizat, bazat pe sortarea prin inserție, care permite interschimbarea elementelor aflate la distanță mare. A fost inventat de Donald Shell în 1959 și a reprezentat primul algoritm de sortare cu performanță sub-pătratică O(n²), deschizând calea pentru algoritmi mai eficienți.

Ideea fundamentală a algoritmului este de a elimina dezavantajul principal al sortării prin inserție: aceasta mută un element la destinație câte o poziție pe rând. Shell Sort rezolvă această problemă comparând și interschimbând inițial elemente aflate la distanță mare (un „gap" sau interval), reducând treptat gap-ul până la 1. Când gap-ul devine 1, algoritmul este identic cu sortarea prin inserție, dar tabloul este deja „aproape sortat", deci operația se execută rapid.

Complexitatea Shell Sort depinde puternic de secvența de gap-uri aleasă. Donald Shell a propus inițial gap-urile n/2, n/4, ..., 1, care dau O(n²) în cel mai rău caz. Secvența lui Hibbard (1, 3, 7, 15, ..., 2^k - 1) dă O(n^(3/2)), iar secvența lui Sedgewick (1, 5, 19, 41, ...) și secvența lui Pratt dau O(n log² n). Secvența optimă rămâne un subiect deschis de cercetare.

## Descriere

Algoritmul funcționează prin sortarea prin inserție aplicată nu elementelor consecutive, ci elementelor separate de un anumit gap. Se începe cu un gap mare și se reduce progresiv la 1. La fiecare gap, se aplică o varianta de insertion sort care compară și mută elemente la distanța gap.

**Pașii algoritmului:**

1. Alege secvența de gap-uri (de exemplu: n/2, n/4, ..., 1).
2. Pentru gap-ul curent, aplică sortarea prin inserție modificată:
   - Parcurge tabloul de la indexul `gap` la `n-1`.
   - Salvează elementul curent ca „cheie".
   - Deplasează înapoi elementele mai mari decât cheia cu pasul `gap`.
   - Inserează cheia la poziția corectă.
3. Înjumătățește gap-ul și repetă pasul 2.
4. Când gap-ul devine 0, algoritmul s-a terminat.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(n log n) | O(1) |
| Mediu | O(n log^2 n) | O(1) |
| Cel mai rău | O(n²) sau O(n log² n) | O(1) |

**Explicație:** Complexitatea depinde de secvența de gap-uri. Cu secvența originală a lui Shell (n/2, n/4, ...), cazul cel mai rău este O(n²). Cu secvența lui Hibbard sau Sedgewick, cel mai rău caz este O(n^(3/2)) sau O(n log² n). Cazul cel mai bun este O(n log n) (tablou aproape sortat). Spațiul este întotdeauna O(1) — sortarea este in-place.

## Pseudocod

```
functie shellSort(A, n):
    gap = n / 2
    cat timp gap > 0:
        pentru i de la gap la n-1:
            cheie = A[i]
            j = i
            cat timp j >= gap si A[j - gap] > cheie:
                A[j] = A[j - gap]
                j = j - gap
            A[j] = cheie
        gap = gap / 2
    returneaza A
```

## Exemple

**Tablou inițial:** `[23, 29, 15, 19, 31, 7, 9, 5, 2]` (n=9)

**Gap = 4** (n/2 = 4):
Compară perechi la distanța 4: (23,31), (29,7), (15,9), (19,5), (31,2)
- `[23, 7, 9, 5, 2, 29, 15, 19, 31]`

**Gap = 2** (4/2 = 2):
Insertion sort cu pas 2 pe coloanele: (23,9,2,15,31) și (7,5,29,19)
- `[2, 5, 9, 7, 15, 19, 23, 29, 31]`

**Gap = 1** (2/2 = 1):
Insertion sort clasic — tabloul este aproape sortat, deci puțin de lucru:
- `[2, 5, 7, 9, 15, 19, 23, 29, 31]`

**Tablou final sortat:** `[2, 5, 7, 9, 15, 19, 23, 29, 31]`

## Aplicații

- **Sisteme embedded și microcontrolere:** Performanță bună în practică cu implementare simplă și spațiu O(1).
- **Sortare cu date parțial ordonate:** Avantajos față de insertion sort datorită pasului mai mare inițial.
- **Sortare în biblioteci standard:** uClibc (biblioteca C pentru sisteme embedded) folosește Shell Sort.
- **Algoritmi de compresie:** Unele implementări bzip2 folosesc variante de Shell Sort.
- **Didactic:** Ilustrează evoluția de la insertion sort la algoritmi mai eficienți.

## Resurse

- [Wikipedia – Shellsort](https://en.wikipedia.org/wiki/Shellsort)
- [GeeksForGeeks – Shell Sort](https://www.geeksforgeeks.org/shellsort/)
- [Visualgo – Sorting](https://visualgo.net/en/sorting)
- [Donald Shell – articolul original (1959)](https://dl.acm.org/doi/10.1145/368370.368387)
