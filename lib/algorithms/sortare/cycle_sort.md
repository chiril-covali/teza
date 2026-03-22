# Sortare prin Cicluri (Cycle Sort)

## Introducere

Sortarea prin cicluri (Cycle Sort) este un algoritm de sortare in-place bazat pe comparații, teoretic optimal în privința numărului minim de scrieri în tabloul original. Spre deosebire de alți algoritmi de sortare, Cycle Sort minimizează numărul de operații de scriere (write), ceea ce îl face valoros în aplicații unde scrisul în memorie este costisitor (de exemplu, memorii flash, EEPROM).

Algoritmul a fost propus formal de W. D. Jones în 1990 și analizat teoretic de Vrinda Bhatt în 1995. Se bazează pe teoria descompunerii permutărilor în cicluri: orice permutare a unui tablou poate fi descompusă în cicluri disjuncte, iar fiecare ciclu poate fi „rotat" pentru a plasa elementele la pozițiile lor corecte.

Proprietatea remarcabilă a Cycle Sort: dacă există k elemente care nu se află la pozițiile lor finale, sunt necesare exact k scrieri pentru a le plasa corect (plus poate câte o scriere suplimentară per ciclu). Niciun alt algoritm de sortare in-place nu poate efectua mai puține scrieri.

## Descriere

Algoritmul parcurge tabloul și, pentru fiecare element, determină câte elemente sunt mai mici (aceasta este poziția corectă a elementului în tabloul sortat). Dacă elementul nu este la poziția sa corectă, participă la un ciclu de scrieri care plasează fiecare element din ciclu la locul său corect cu un număr minim de scrieri.

**Pașii algoritmului:**

1. Parcurge tabloul de la stânga la dreapta. Fiecare element va fi punctul de start al unui potențial ciclu.
2. Pentru elementul curent `item = A[start]`, numără câte elemente din restul tabloului sunt mai mici decât `item` — aceasta dă poziția corectă `pos` a lui `item`.
3. Dacă `pos == start`, elementul este deja la locul lui — continuă.
4. Gestionează duplicatele: dacă `A[pos] == item`, incrementează `pos` până găsești o poziție diferită.
5. Interschimbă `item` cu `A[pos]` — acum `item` conține fostul `A[pos]`.
6. Repetă pașii 2–5 cu noul `item` până când `pos == start` (ciclul s-a închis).
7. Treci la următorul element din tablou și repetă.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(n²) | O(1) |
| Mediu | O(n²) | O(1) |
| Cel mai rău | O(n²) | O(1) |

**Explicație:** Deși numărul de scrieri este optim (O(n)), algoritmul necesită numărarea elementelor mai mici pentru fiecare element, ceea ce implică O(n) comparații per element — total O(n²). Aceasta este aceeași complexitate temporală ca sortarea prin selecție. Avantajul Cycle Sort nu constă în viteza de comparații, ci în minimizarea operațiilor de scriere. Spațiul auxiliar este O(1).

## Pseudocod

```
functie cycleSort(A, n):
    scrieri = 0
    pentru start de la 0 la n-2:
        item = A[start]
        // Gaseste pozitia corecta pentru item
        pos = start
        pentru i de la start+1 la n-1:
            daca A[i] < item:
                pos++
        daca pos == start:
            continua   // Elementul e la locul lui
        // Gestioneaza duplicate
        cat timp item == A[pos]:
            pos++
        // Plaseaza item la pozitia corecta
        interschimba item cu A[pos]
        scrieri++
        // Roteste restul ciclului
        cat timp pos != start:
            pos = start
            pentru i de la start+1 la n-1:
                daca A[i] < item:
                    pos++
            cat timp item == A[pos]:
                pos++
            interschimba item cu A[pos]
            scrieri++
    returneaza scrieri
```

## Exemple

**Tablou inițial:** `[10, 5, 2, 3]`

Pozițiile corecte în tabloul sortat `[2, 3, 5, 10]`: 10→3, 5→2, 2→0, 3→1

**Ciclu pornind de la start=0 (item=10):**
- Numără elemente < 10: {5, 2, 3} → pos=3
- A[3]=3 ≠ 10 → swap(10, A[3]) → item=3, A=[10, 5, 2, 10] ← greșit! mai corect: A[3]=10

Pas cu pas corect:
- item=10, pos=3 → interschimbă cu A[3]=3 → item=3, `[3, 5, 2, 10]`, scrieri=1
- item=3, pos=1 (1 element mai mic: 2) → interschimbă cu A[1]=5 → item=5, `[3, 3, 2, 10]` ... 

**Exemplu simplificat:** `[3, 1, 2]`

Sortat: `[1, 2, 3]` → 3→2, 1→0, 2→1

- start=0, item=3: numără < 3 → {1,2} → pos=2; swap(3, A[2]=2) → item=2, `[2, 1, 3]`, scrieri=1
- item=2: numără < 2 → {1} → pos=1; swap(2, A[1]=1) → item=1, `[1, 2, 3]`, scrieri=2
- pos=0=start → ciclu încheiat
- start=1, item=2: A[1]=2 este deja la pos=1 → skip
- **Tablou final:** `[1, 2, 3]` — 2 scrieri (optim!)

## Aplicații

- **Memorii cu scrieri limitate:** EEPROM și memorii flash au un număr limitat de cicluri de scriere; Cycle Sort minimizează uzura.
- **Stocare pe suport optic:** CD-RW și DVD-RW beneficiază de numărul minim de scrieri.
- **Sisteme de fișiere log-structurate:** Minimizarea scrierilor prelungește viața suportului de stocare.
- **Algoritmi de sortare teoretici:** Studii despre limita inferioară a numărului de scrieri în sortare.
- **Colectare de date senzoriale:** Sisteme IoT cu memorie flash limitată.

## Resurse

- [Wikipedia – Cycle Sort](https://en.wikipedia.org/wiki/Cycle_sort)
- [GeeksForGeeks – Cycle Sort](https://www.geeksforgeeks.org/cycle-sort/)
- [W. D. Jones – articolul original (1990)](https://dl.acm.org/doi/10.1145/79247.79248)
