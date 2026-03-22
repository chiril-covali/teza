# Descompunerea în Factori Primi

Slug: matematica_prime_factorization
Categorie: Matematică

## Introducere

Descompunerea în factori primi (sau factorizarea primară) este procesul de reprezentare a unui număr natural ca produs de numere prime. Teorema fundamentală a aritmeticii garantează că această descompunere este unică (ignorând ordinea factorilor) pentru orice număr întreg mai mare decât 1. De exemplu, 360 = 2³ × 3² × 5.

Această teoremă a fost demonstrată de Carl Friedrich Gauss în lucrarea sa „Disquisitiones Arithmeticae" din 1801, deși ideea era folosită implicit cu mult înainte. Unicitatea factorizării prime este fundamentul pe care se construiește întreaga aritmetică modulară și, prin extensie, criptografia modernă.

Dificultatea factorizării numerelor mari (problema factorizării întregi) stă la baza securității multor sisteme criptografice moderne, inclusiv RSA. Nu există niciun algoritm eficient cunoscut pentru factorizarea numerelor întregi mari cu calculatoare clasice, ceea ce face această problemă esențială pentru securitatea digitală.

## Descriere

Algoritmul standard de factorizare prin împărțire de probă (trial division) procedează sistematic: încearcă să împartă n la fiecare număr prim p începând cu 2, și dacă p divide n, extrage toți factorii p, apoi continuă cu n/p^k.

**Pașii algoritmului:**
1. Inițializează un dicționar de factori gol.
2. Pornind cu p = 2, cât timp p² ≤ n:
   a. Cât timp p divide n (n mod p = 0): crește exponentul lui p, împarte n la p.
   b. Incrementează p.
3. Dacă n > 1 după buclă, atunci n este el însuși un factor prim (cu exponent 1).
4. Returnează dicționarul de factori.

**Optimizare:** Este suficient să testăm divizori până la √n, deoarece dacă n are un factor prim p > √n, atunci n/p < √n, deci cel puțin un factor prim este ≤ √n (cu excepția cazului în care n însuși este prim).

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| General (trial division) | O(√n) | O(log n) |
| Cel mai defavorabil (n prim) | O(√n) | O(1) |

**Explicație:** Complexitatea temporală O(√n) provine din faptul că testăm divizori de la 2 până la √n. Spațiul O(log n) este necesar pentru stocarea factorilor: numărul maxim de factori primi distincți ai lui n este O(log n), deoarece produsul primelor k prime crește exponențial.

## Pseudocod

```
funcție factorizarePrimă(n):
    factori ← dicționar gol

    p ← 2
    cât timp p × p ≤ n:
        cât timp n mod p = 0:
            factori[p] ← factori[p] + 1
            n ← n / p
        p ← p + 1

    dacă n > 1:
        factori[n] ← factori[n] + 1

    returnează factori
```

## Exemple

**Exemplul 1:** Factorizarea lui 360

| Pas | p | n | Acțiune |
|-----|---|---|---------|
| 1 | 2 | 360 | 360/2=180, 180/2=90, 90/2=45 → 2³ |
| 2 | 3 | 45 | 45/3=15, 15/3=5 → 3² |
| 3 | 5 | 5 | p²=25 > 5, stop buclă |
| 4 | — | 5 | n=5 > 1 → 5¹ |

Rezultat: 360 = **2³ × 3² × 5¹** = 8 × 9 × 5

**Exemplul 2:** Factorizarea lui 84

84 ÷ 2 = 42 → 42 ÷ 2 = 21 → 21 ÷ 3 = 7 → 7 este prim

Rezultat: 84 = **2² × 3 × 7**

**Exemplul 3:** Factorizarea lui 97

97 este prim (nu se divide cu 2, 3, 5, 7 — și 11² = 121 > 97)

Rezultat: 97 = **97¹**

**Exemplul 4:** Calculul CMDC și CMMC prin factorizare

- 360 = 2³ × 3² × 5
- 84 = 2² × 3 × 7
- CMDC = 2² × 3 = 12 (minimul exponenților comuni)
- CMMC = 2³ × 3² × 5 × 7 = 2520 (maximul tuturor exponenților)

## Aplicații

- **Criptografie (RSA)** – securitatea RSA se bazează pe dificultatea de a factoriza produsul a două prime mari.
- **Calculul CMDC și CMMC** – prin compararea exponenților în descompunerile prime.
- **Reducerea fracțiilor** – identificarea factorilor comuni la numărător și numitor.
- **Teoria numerelor** – studiul proprietăților multiplicative ale funcțiilor aritmetice (φ, σ, μ).
- **Identificarea numerelor perfecte** – un număr par perfect are forma 2^(p-1) × (2^p - 1) unde 2^p - 1 este prim.
- **Compresia datelor** – codificarea unică a mulțimilor de factori.

## Observații din implementare

- Folosește cel puțin o buclă while în implementare.
- Folosește cel puțin o buclă for în implementare.
- Implementarea folosește funcții arrow/funcții compacte.

## Resurse

- [Wikipedia – Descompunere în factori primi](https://ro.wikipedia.org/wiki/Descompunere_%C3%AEn_factori_primi)
- [GeeksForGeeks – Prime Factorization](https://www.geeksforgeeks.org/prime-factorization-using-sieve-ol-log-n-time/)
- [Khan Academy – Prime factorization](https://www.khanacademy.org/math/pre-algebra/pre-algebra-factors-multiples/pre-algebra-prime-factorization-prealg/v/prime-factorization)
