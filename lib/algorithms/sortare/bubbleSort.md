# Sortare prin Metoda Bulelor (Bubble Sort)

## Introducere

Sortarea prin metoda bulelor este unul dintre cei mai simpli algoritmi de sortare și reprezintă adesea primul algoritm de sortare predat în cursurile de informatică. Algoritmul funcționează prin compararea repetată a elementelor adiacente dintr-un tablou și interschimbarea lor dacă se află în ordinea greșită. Procesul se repetă până când tabloul este complet sortat.

Numele algoritmului provine din modul în care elementele mai mari „se ridică" treptat spre capătul tabloului, asemănător bulelor de aer care urcă la suprafața apei. Deși conceptul a existat în informatică de timpuriu, denumirea formală de „bubble sort" a fost popularizată de Donald Knuth în lucrarea sa monumentală „The Art of Computer Programming" (1968).

În ciuda simplității sale, sortarea prin metoda bulelor este ineficientă pentru seturi mari de date, cu o complexitate de timp O(n²) în cazul mediu și cel mai rău caz. Totuși, cu o mică optimizare (oprirea timpurie dacă nu s-a efectuat nicio interschimbare), algoritmul atinge O(n) pentru tablouri deja sortate, ceea ce îl face potrivit pentru verificarea dacă un tablou este sortat.

## Descriere

Algoritmul parcurge tabloul în mod repetat, comparând fiecare pereche de elemente adiacente. Dacă elementul din stânga este mai mare decât elementul din dreapta, acestea sunt interschimbate. La finalul fiecărei parcurgeri, cel mai mare element nesortată ajunge la poziția sa corectă (la „capătul" porțiunii nesortate). Procesul continuă pentru porțiunea rămasă nesortată.

O optimizare importantă constă în a opri algoritmul dacă o parcurgere completă nu produce nicio interschimbare — aceasta înseamnă că tabloul este deja sortat.

**Pașii algoritmului:**

1. Parcurge tabloul de la primul element până la ultimul element nesortata.
2. Compară elementul curent cu următorul.
3. Dacă elementul curent este mai mare decât următorul, interschimbă-le.
4. Continuă până la capătul porțiunii nesortate.
5. Repetă pașii 1–4 pentru porțiunea rămasă (cu un element mai puțin la capăt la fiecare iterație).
6. Dacă nicio interschimbare nu a avut loc într-o parcurgere, oprește algoritmul (tabloul este sortat).

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(n) | O(1) |
| Mediu | O(n²) | O(1) |
| Cel mai rău | O(n²) | O(1) |

**Explicație:** În cazul cel mai bun (tablou deja sortat, cu optimizare), algoritmul face o singură parcurgere fără interschimbări și se oprește — deci O(n). În cazul mediu și cel mai rău, sunt necesare n-1 parcurgeri cu până la n-1 comparații fiecare, rezultând O(n²). Spațiul auxiliar este O(1) deoarece interschimbările se fac în loc (in-place).

## Pseudocod

```
functie bubbleSort(A, n):
    pentru i de la 0 la n-2:
        sortat = adevarat
        pentru j de la 0 la n-2-i:
            daca A[j] > A[j+1]:
                interschimba A[j] cu A[j+1]
                sortat = fals
        daca sortat:
            opreste
    returneaza A
```

## Exemple

**Tablou inițial:** `[64, 34, 25, 12, 22, 11, 90]`

**Parcurgerea 1:**
- Compară 64 și 34 → interschimbă → `[34, 64, 25, 12, 22, 11, 90]`
- Compară 64 și 25 → interschimbă → `[34, 25, 64, 12, 22, 11, 90]`
- Compară 64 și 12 → interschimbă → `[34, 25, 12, 64, 22, 11, 90]`
- Compară 64 și 22 → interschimbă → `[34, 25, 12, 22, 64, 11, 90]`
- Compară 64 și 11 → interschimbă → `[34, 25, 12, 22, 11, 64, 90]`
- Compară 64 și 90 → nu interschimbă
- **Rezultat după parcurgerea 1:** `[34, 25, 12, 22, 11, 64, 90]` ← 90 este la loc

**Parcurgerea 2:**
- `[25, 12, 22, 11, 34, 64, 90]` ← 64 este la loc

**Parcurgerea 3:**
- `[12, 22, 11, 25, 34, 64, 90]` ← 34 este la loc

**Parcurgerea 4:**
- `[12, 11, 22, 25, 34, 64, 90]` ← 25 este la loc

**Parcurgerea 5:**
- `[11, 12, 22, 25, 34, 64, 90]` ← 22 este la loc

**Tablou final sortat:** `[11, 12, 22, 25, 34, 64, 90]`

## Aplicații

- **Scop educațional:** Cel mai des folosit pentru a introduce conceptele de bază ale sortării și algoritmilor.
- **Verificarea dacă un tablou este sortat:** Cu optimizarea de oprire timpurie, este eficient pentru această verificare.
- **Seturi de date mici:** Poate fi utilizat practic pentru tablouri cu mai puțin de 10-20 de elemente.
- **Sortare parțială:** Poate fi adaptat pentru a extrage primele k elemente cele mai mari dintr-un tablou.
- **Sisteme cu memorie limitată:** Datorită spațiului O(1), este util în medii cu resurse foarte restrânse.

## Resurse

- [Wikipedia – Bubble Sort](https://en.wikipedia.org/wiki/Bubble_sort)
- [GeeksForGeeks – Bubble Sort](https://www.geeksforgeeks.org/bubble-sort/)
- [Visualgo – Sorting](https://visualgo.net/en/sorting)
- [Khan Academy – Bubble Sort](https://www.khanacademy.org/computing/computer-science/algorithms/sorting-algorithms/a/bubble-sort)
