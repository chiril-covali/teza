# Căutare prin Interpolare

Slug: cautare_interpolation_search
Categorie: Căutare

## Introducere

Căutarea prin interpolare este o îmbunătățire a căutării binare, concepută pentru tablouri sortate cu valori distribuite **uniform**. Ideea fundamentală este că, în loc să verifice întotdeauna elementul din mijlocul intervalului (ca în căutarea binară), algoritmul „ghicește" poziția probabilă a elementului căutat pe baza valorilor de la capetele intervalului.

Algoritmul a fost propus independent de mai mulți cercetători în anii 1950-1970, dar formalizarea sa matematică riguroasă și analiza complexității în cazul distribuțiilor uniforme sunt atribuite lui W.W. Peterson (1957) și W.A. Yao (1980). Analogia intuitivă este cu modul în care oamenii caută un cuvânt într-un dicționar: dacă cauți „Zebra", vei deschide dicționarul aproape de final, nu la mijloc.

Performanța excepțională O(log log n) pentru distribuții uniforme îl face teoretic superior căutării binare pentru seturi mari de date cu distribuție uniformă. Cu toate acestea, în cazul distribuțiilor neuniforme sau al elementelor clustered, performanța se poate degrada până la O(n), ceea ce îl face mai puțin robust decât căutarea binară clasică.

## Descriere

Algoritmul calculează poziția estimată a elementului căutat folosind formula de interpolare liniară. Dacă valorile sunt distribuite uniform în intervalul `[tablou[stânga], tablou[dreapta]]`, atunci poziția estimată a valorii `țintă` este proporțională cu distanța relativă față de capete.

**Pașii algoritmului:**

1. Inițializează `stânga = 0`, `dreapta = n - 1`.
2. Cât timp `stânga ≤ dreapta` și `țintă ≥ tablou[stânga]` și `țintă ≤ tablou[dreapta]`:
   a. Calculează poziția estimată:
      `pos = stânga + ((țintă - tablou[stânga]) * (dreapta - stânga)) / (tablou[dreapta] - tablou[stânga])`
   b. Dacă `tablou[pos] == țintă`, returnează `pos`.
   c. Dacă `tablou[pos] < țintă`, setează `stânga = pos + 1`.
   d. Dacă `tablou[pos] > țintă`, setează `dreapta = pos - 1`.
3. Verifică dacă `tablou[stânga] == țintă`, returnează `stânga` sau `-1`.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(1) | O(1) |
| Mediu (distribuție uniformă) | O(log log n) | O(1) |
| Cel mai rău | O(n) | O(1) |

**Explicație:** Pentru o distribuție uniformă, după fiecare pas dimensiunea problemei se reduce de la `n` la aproximativ `√n` (în loc de `n/2` la căutarea binară). Prin urmare, după `k` pași avem `n^(1/2^k)` elemente, iar algoritm se termină când `n^(1/2^k) = 1`, adică `k = log₂(log₂ n)`. Cazul cel mai rău O(n) apare când valorile sunt distribuite exponențial (toate elementele la un capăt) sau când există valori duplicate.

## Pseudocod

```
CĂUTARE_INTERPOLARE(tablou, n, țintă):
    stânga ← 0
    dreapta ← n - 1

    CÂT TIMP stânga ≤ dreapta
          ȘI țintă ≥ tablou[stânga]
          ȘI țintă ≤ tablou[dreapta]:

        // Formula de interpolare
        pos ← stânga + ((țintă - tablou[stânga]) * (dreapta - stânga))
                       / (tablou[dreapta] - tablou[stânga])

        DACĂ tablou[pos] = țintă:
            RETURNEAZĂ pos
        ALTFEL DACĂ tablou[pos] < țintă:
            stânga ← pos + 1
        ALTFEL:
            dreapta ← pos - 1

    DACĂ tablou[stânga] = țintă:
        RETURNEAZĂ stânga

    RETURNEAZĂ -1
```

## Exemple

**Exemplu cu distribuție uniformă:** Fie tabloul `[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]` (n=10) și ținta `70`.

**Pas 1:** `stânga=0, dreapta=9`
- `pos = 0 + (70 - 10) * (9 - 0) / (100 - 10) = 0 + 60 * 9 / 90 = 6`
- `tablou[6] = 70 == 70` → **găsit la indexul 6 în doar 1 pas!**

Cu căutarea binară, ar fi necesari: 
- Pas 1: `mijloc=4`, `50 < 70` → `stânga=5`
- Pas 2: `mijloc=7`, `80 > 70` → `dreapta=6`
- Pas 3: `mijloc=5`, `60 < 70` → `stânga=6`
- Pas 4: `mijloc=6`, `70 == 70` → găsit în 4 pași.

**Exemplu distribuție neuniformă (caz rău):** Tabloul `[1, 2, 3, 4, 5, 6, 7, 8, 9, 1000]` și ținta `7`. Formula de interpolare va genera estimări foarte slabe din cauza valorii 1000 la capăt.

## Aplicații

- **Baze de date cu distribuție uniformă:** Căutare rapidă în tabele cu chei numerice distribuite uniform (ex: date calendaristice, ID-uri secvențiale).
- **Tabele de rutare:** Căutarea în tabele de rutare IP unde adresele au distribuție aproximativ uniformă.
- **Sisteme de fișiere:** Căutarea în directoare mari cu distribuție uniformă a numelor.
- **Algoritmi de sortare externă:** Ca subroutine în algoritmii care combină sortarea cu căutarea.
- **Analiza datelor:** Căutarea de percentile în date statistice cu distribuție apropiată de uniformă.

## Resurse

- [Wikipedia - Interpolation Search](https://en.wikipedia.org/wiki/Interpolation_search)
- [GeeksForGeeks - Interpolation Search](https://www.geeksforgeeks.org/interpolation-search/)
- [Peterson, W.W. (1957) - Addressing for Random-Access Storage](https://ieeexplore.ieee.org/document/5219620)
