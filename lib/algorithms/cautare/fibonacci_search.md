# Căutare Fibonacci

Slug: cautare_fibonacci_search
Categorie: Căutare

## Introducere

Căutarea Fibonacci este un algoritm de căutare pentru tablouri sortate care utilizează numerele din șirul lui Fibonacci pentru a împărți tabloul în secțiuni, în loc să folosească împărțirea la 2 ca în căutarea binară. A fost propusă de Kiefer în 1953 și studiată extensiv de Fibonacci Search Committee în deceniile următoare ca alternativă eficientă la căutarea binară pe anumite arhitecturi hardware.

Șirul lui Fibonacci este: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ... unde fiecare număr este suma celor două precedente. Raportul dintre termeni consecutivi converge la numărul de aur φ ≈ 1.618, ceea ce înseamnă că împărțirea tabloului nu este perfect la jumătate, ci în proporție de aproximativ 38%/62%.

Avantajul principal al acestui algoritm este că **elimină operațiile de împărțire și înmulțire** (înlocuindu-le cu adunări și scăderi), ceea ce îl face mai rapid pe procesoare mai vechi sau specializate unde aceste operații sunt costisitoare. Pe arhitecturi moderne, diferența este neglijabilă, dar algoritmul rămâne un exemplu elegant de utilizare a proprietăților matematice ale șirului Fibonacci.

## Descriere

Algoritmul găsește cel mai mic număr Fibonacci mai mare sau egal cu `n` (dimensiunea tabloului), apoi folosește doi indici consecutivi din șirul Fibonacci pentru a împărți spațiul de căutare. La fiecare pas, unul din cei doi indici Fibonacci este scăzut, restrângând intervalul.

**Pașii algoritmului:**

1. Găsește cel mai mic număr Fibonacci `Fm ≥ n`. Reține și `Fm-1`, `Fm-2`.
2. Setează `offset = -1` (limita stângă a intervalului exclusă).
3. Cât timp `Fm > 1`:
   a. Calculează `i = min(offset + Fm-2, n-1)`.
   b. Dacă `tablou[i] < țintă`: `offset = i`, mută cu un pas Fibonacci la dreapta (`Fm = Fm-1`, `Fm-1 = Fm-2`, `Fm-2 = Fm - Fm-1`).
   c. Dacă `tablou[i] > țintă`: mută cu doi pași Fibonacci la stânga (`Fm = Fm-2`, `Fm-1 = Fm-1 - Fm-2`, `Fm-2 = Fm - Fm-1`).
   d. Dacă `tablou[i] == țintă`: returnează `i`.
4. Dacă `Fm-1 == 1` și `tablou[offset+1] == țintă`, returnează `offset+1`.
5. Returnează `-1`.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(1) | O(1) |
| Mediu | O(log n) | O(1) |
| Cel mai rău | O(log n) | O(1) |

**Explicație:** Deoarece numerele Fibonacci cresc aproximativ cu factorul φ ≈ 1.618, numărul de pași necesari pentru a reduce intervalul la 1 element este O(log_φ n) = O(log n / log φ) ≈ O(1.44 · log₂ n). Aceasta este un pic mai lent decât căutarea binară în termeni de număr de comparații, dar avantajul este eliminarea împărțirii. Spațiul este O(1).

## Pseudocod

```
CĂUTARE_FIBONACCI(tablou, n, țintă):
    // Găsește cel mai mic număr Fibonacci ≥ n
    fib2 ← 0  // Fm-2
    fib1 ← 1  // Fm-1
    fib  ← 1  // Fm

    CÂT TIMP fib < n:
        fib2 ← fib1
        fib1 ← fib
        fib  ← fib1 + fib2

    offset ← -1

    CÂT TIMP fib > 1:
        i ← min(offset + fib2, n - 1)

        DACĂ tablou[i] < țintă:
            fib  ← fib1
            fib1 ← fib2
            fib2 ← fib - fib1
            offset ← i
        ALTFEL DACĂ tablou[i] > țintă:
            fib  ← fib2
            fib1 ← fib1 - fib2
            fib2 ← fib - fib1
        ALTFEL:
            RETURNEAZĂ i

    DACĂ fib1 = 1 ȘI tablou[offset + 1] = țintă:
        RETURNEAZĂ offset + 1

    RETURNEAZĂ -1
```

## Exemple

**Exemplu concret:** Fie tabloul `[10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100]` (n=11) și ținta `85`.

**Pregătire — găsire Fibonacci ≥ 11:**
- Șir: 1, 1, 2, 3, 5, 8, 13 → `Fm=13`, `Fm-1=8`, `Fm-2=5`

**Iterații:**
- `i = min(-1+5, 10) = 4` → `tablou[4]=45 < 85` → `offset=4`, Fibonacci: `Fm=8, Fm-1=5, Fm-2=3`
- `i = min(4+3, 10) = 7` → `tablou[7]=82 < 85` → `offset=7`, Fibonacci: `Fm=5, Fm-1=3, Fm-2=2`
- `i = min(7+2, 10) = 9` → `tablou[9]=90 > 85` → Fibonacci: `Fm=2, Fm-1=1, Fm-2=1`
- `i = min(7+1, 10) = 8` → `tablou[8]=85 == 85` → **găsit la indexul 8!**

## Aplicații

- **Procesoare fără unitate hardware de împărțire:** Sisteme embedded sau microprocesoare specializate unde împărțirea este mult mai lentă decât adunarea/scăderea.
- **Algoritmi de calcul numeric:** Metoda secțiunii de aur (Golden Section Search) pentru optimizare unimodală folosește un principiu similar.
- **Teorie algoritmică:** Studiat ca exemplu de algoritm care exploatează proprietăți matematice speciale pentru optimizare.
- **Căutare în tablouri sortate de dimensiuni medii:** Performanță comparabilă cu căutarea binară în practică.
- **Educație:** Demonstrarea modului în care structuri matematice (șirul Fibonacci) pot fi aplicate în algoritmi de căutare.

## Resurse

- [Wikipedia - Fibonacci Search Technique](https://en.wikipedia.org/wiki/Fibonacci_search_technique)
- [GeeksForGeeks - Fibonacci Search](https://www.geeksforgeeks.org/fibonacci-search/)
- [Knuth, D.E. - The Art of Computer Programming, Vol. 3](https://www-cs-faculty.stanford.edu/~knuth/taocp.html)
