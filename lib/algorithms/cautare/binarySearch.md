# Căutare Binară

Slug: cautare_binarySearch
Categorie: Căutare

## Introducere

Căutarea binară este unul dintre cei mai fundamentali și eficienți algoritmi de căutare din informatică. Principiul său se bazează pe strategia „divide și cucerește": la fiecare pas, spațiul de căutare este înjumătățit, eliminând jumătatea în care elementul căutat nu poate exista. Această abordare îl face dramatic mai rapid decât căutarea liniară pentru seturi mari de date.

Algoritmul are rădăcini matematice vechi, dar formalizarea sa în contextul informaticii este atribuită lui John Mauchly, care l-a menționat în 1946. Prima implementare corectă fără erori pentru orice dimensiune de tablou a fost publicată de Derrick Henry Lehmer în 1962. De atunci, căutarea binară a devenit un element esențial în orice curs de algoritmi și structuri de date.

Condiția fundamentală pentru aplicarea căutării binare este că tabloul (sau lista) trebuie să fie **sortat**. Fără această condiție, algoritmul nu poate funcționa corect, deoarece decizia de a elimina jumătatea stângă sau dreaptă se bazează pe compararea cu elementul din mijloc și presupune că elementele sunt ordonate.

## Descriere

Căutarea binară operează pe un tablou sortat și menține doi indici: `stânga` (capătul stâng al intervalului curent) și `dreapta` (capătul drept). La fiecare iterație, se calculează mijlocul intervalului și se compară elementul din mijloc cu valoarea căutată. În funcție de rezultat, intervalul se înjumătățește.

**Pașii algoritmului:**

1. Inițializează `stânga = 0` și `dreapta = lungime - 1`.
2. Cât timp `stânga <= dreapta`:
   a. Calculează `mijloc = stânga + (dreapta - stânga) / 2` (evitând overflow-ul).
   b. Dacă `tablou[mijloc] == țintă`, returnează `mijloc`.
   c. Dacă `tablou[mijloc] < țintă`, setează `stânga = mijloc + 1` (caută în jumătatea dreaptă).
   d. Dacă `tablou[mijloc] > țintă`, setează `dreapta = mijloc - 1` (caută în jumătatea stângă).
3. Dacă bucla se termină fără să găsească elementul, returnează `-1` (element absent).

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(1) | O(1) |
| Mediu | O(log n) | O(1) |
| Cel mai rău | O(log n) | O(1) |

**Explicație:** La fiecare pas, spațiul de căutare se reduce la jumătate. Pornind de la `n` elemente, după `k` pași rămân `n / 2^k` elemente. Algoritmul se oprește când `n / 2^k = 1`, adică `k = log₂(n)`. Complexitatea spațială este O(1) deoarece se folosesc doar câteva variabile auxiliare (versiunea iterativă). Versiunea recursivă are O(log n) spațiu pe stivă.

## Pseudocod

```
CĂUTARE_BINARĂ(tablou, țintă):
    stânga ← 0
    dreapta ← lungime(tablou) - 1

    CÂT TIMP stânga ≤ dreapta:
        mijloc ← stânga + (dreapta - stânga) / 2

        DACĂ tablou[mijloc] = țintă:
            RETURNEAZĂ mijloc
        ALTFEL DACĂ tablou[mijloc] < țintă:
            stânga ← mijloc + 1
        ALTFEL:
            dreapta ← mijloc - 1

    RETURNEAZĂ -1
```

## Exemple

**Exemplu concret:** Fie tabloul sortat `[2, 5, 8, 12, 16, 23, 38, 45, 67, 91]` și ținta `23`.

- Pas 1: `stânga=0`, `dreapta=9`, `mijloc=4` → `tablou[4]=16 < 23` → `stânga=5`
- Pas 2: `stânga=5`, `dreapta=9`, `mijloc=7` → `tablou[7]=45 > 23` → `dreapta=6`
- Pas 3: `stânga=5`, `dreapta=6`, `mijloc=5` → `tablou[5]=23 == 23` → **găsit la indexul 5!**

Fără căutare binară (căutare liniară), ar fi necesare 6 comparații. Căutarea binară a găsit rezultatul în doar 3 pași.

**Exemplu element absent:** Căutăm `10` în același tablou.

- Pas 1: `mijloc=4` → `16 > 10` → `dreapta=3`
- Pas 2: `mijloc=1` → `5 < 10` → `stânga=2`
- Pas 3: `mijloc=2` → `8 < 10` → `stânga=3`
- Pas 4: `mijloc=3` → `12 > 10` → `dreapta=2`
- Acum `stânga(3) > dreapta(2)` → **returnează -1 (absent)**

## Aplicații

- **Dicționare și baze de date:** Căutarea rapidă a înregistrărilor sortate după cheie.
- **Sisteme de operare:** Găsirea paginilor în tabelele de pagini, căutarea în fișiere index.
- **Biblioteci standard:** `std::binary_search` în C++, `Arrays.binarySearch` în Java, `bisect` în Python.
- **Algoritmi derivați:** Căutarea primei/ultimei apariții a unui element, găsirea limitei inferioare/superioare (lower/upper bound).
- **Calculul rădăcinilor:** Metoda bisecției pentru rezolvarea ecuațiilor numerice.
- **Jocuri și puzzle-uri:** Ghicirea unui număr în intervalul [1, N] cu număr minim de întrebări.
- **Compresia datelor:** Căutarea în tabele de coduri Huffman sortate.

## Resurse

- [Wikipedia - Binary Search Algorithm](https://en.wikipedia.org/wiki/Binary_search_algorithm)
- [GeeksForGeeks - Binary Search](https://www.geeksforgeeks.org/binary-search/)
- [Visualgo - Binary Search Visualization](https://visualgo.net/en/bst)
- [Khan Academy - Binary Search](https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search)
