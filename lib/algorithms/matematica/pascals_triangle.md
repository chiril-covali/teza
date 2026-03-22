# Triunghiul lui Pascal

Slug: matematica_pascals_triangle
Categorie: Matematică

## Introducere

Triunghiul lui Pascal este o structură matematică triunghiulară în care fiecare element este suma celor două elemente de deasupra sa. Poartă numele matematicianului francez Blaise Pascal, care l-a studiat sistematic în lucrarea „Traité du triangle arithmétique" (1653), deși era cunoscut în China (Yang Hui, sec. XIII) și Persia (Omar Khayyam, sec. XI) cu secole înainte.

Rândul n al triunghiului conține coeficienții binomiali C(n,0), C(n,1), ..., C(n,n), care apar în expansiunea (a+b)ⁿ. Triunghiul ascunde o multitudine de pattern-uri matematice: numerele Fibonacci pe diagonale, triunghiul lui Sierpinski modulo 2, și sumele puterilor lui 2 pe fiecare rând.

## Descriere

**Definiție:** T[i][j] = T[i-1][j-1] + T[i-1][j], cu T[i][0] = T[i][i] = 1.

**Pașii algoritmului:**
1. Inițializează un triunghi cu n+1 rânduri.
2. Fiecare rând i începe și se termină cu 1.
3. Elementele interioare: T[i][j] = T[i-1][j-1] + T[i-1][j].
4. Returnează triunghiul.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| General | O(n²) | O(n²) |

**Explicație:** Se calculează n²/2 elemente, fiecare în O(1).

## Pseudocod

```
funcție triunghi(n):
    T ← matrice n×n de zerouri
    pentru i de la 0 până la n-1:
        T[i][0] ← 1
        T[i][i] ← 1
        pentru j de la 1 până la i-1:
            T[i][j] ← T[i-1][j-1] + T[i-1][j]
    returnează T
```

## Exemple

```
Rândul 0:      1
Rândul 1:     1 1
Rândul 2:    1 2 1
Rândul 3:   1 3 3 1
Rândul 4:  1 4 6 4 1
Rândul 5: 1 5 10 10 5 1
```

**(a+b)⁴ = 1a⁴ + 4a³b + 6a²b² + 4ab³ + 1b⁴**

Suma rândului n = 2ⁿ: rândul 4 → 1+4+6+4+1 = 16 = 2⁴.

## Aplicații

- **Coeficienți binomiali** – expansiunea (a+b)ⁿ în algebră.
- **Probabilitate** – distribuția binomială folosește C(n,k) din triunghi.
- **Numerele Fibonacci** – suma diagonalelor oblice dă șirul Fibonacci.
- **Fractali** – triunghiul modulo 2 generează triunghiul Sierpinski.
- **Combinatorică** – numărarea căilor într-o rețea de tip grilă.

## Observații din implementare

- Folosește cel puțin o buclă for în implementare.
- Implementarea folosește funcții arrow/funcții compacte.

## Resurse

- [Wikipedia – Triunghiul lui Pascal](https://ro.wikipedia.org/wiki/Triunghiul_lui_Pascal)
- [GeeksForGeeks – Pascal's Triangle](https://www.geeksforgeeks.org/pascal-triangle/)
