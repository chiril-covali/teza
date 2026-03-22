# Factorialul unui număr

Slug: matematica_factorial
Categorie: Matematică

## Introducere

Factorialul este una dintre operațiile fundamentale ale matematicii combinatoriale. Factorialul unui număr natural n, notat n!, reprezintă produsul tuturor numerelor naturale pozitive de la 1 până la n. Prin convenție, 0! = 1.

Conceptul a fost formalizat de matematicianul francez Christian Kramp în 1808, care a introdus și notația cu semnul exclamării. Cu toate acestea, ideea de bază era folosită cu mult înainte în lucrările lui Johann Bernoulli și ale altor matematicieni din secolul al XVII-lea în studiul permutărilor și combinărilor.

Factorialul apare în mod esențial în combinatorică (numărul de aranjamente posibile ale n obiecte), în calculul coeficienților binomiali, în seria Taylor și Maclaurin pentru funcții precum eˣ și sin(x), și în distribuțiile de probabilitate precum distribuția Poisson.

## Descriere

Factorialul unui număr natural n este definit astfel:

- 0! = 1 (prin convenție)
- n! = n × (n-1) × (n-2) × ... × 2 × 1, pentru n ≥ 1
- Echivalent recursiv: n! = n × (n-1)!

Există două abordări principale de implementare:

1. **Recursivă** – funcția se apelează pe sine cu n-1, până la cazul de bază 0! = 1. Elegantă, dar consumă spațiu O(n) pe stivă.
2. **Iterativă** – un ciclu care înmulțește succesiv valorile de la 1 la n. Eficientă din punct de vedere al memoriei: O(1) spațiu.

**Pașii algoritmului iterativ:**
1. Dacă n = 0 sau n = 1, returnează 1.
2. Inițializează rezultat = 1.
3. Parcurge i de la 2 până la n: înmulțește rezultat cu i.
4. Returnează rezultat.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Iterativ | O(n) | O(1) |
| Recursiv | O(n) | O(n) — stivă de apeluri |

**Explicație:** Ambele variante efectuează n-1 înmulțiri, deci complexitatea temporală este O(n). Diferența apare la spațiu: varianta recursivă menține n cadre pe stiva de apeluri, în timp ce varianta iterativă folosește o singură variabilă acumulatoare.

## Pseudocod

```
funcție factorial(n):
    dacă n = 0 sau n = 1:
        returnează 1

    rezultat ← 1
    pentru i de la 2 până la n:
        rezultat ← rezultat × i

    returnează rezultat

// Varianta recursivă:
funcție factorialRecursiv(n):
    dacă n = 0:
        returnează 1
    returnează n × factorialRecursiv(n - 1)
```

## Exemple

**Exemplul 1:** Calculul lui 5!

5! = 5 × 4 × 3 × 2 × 1 = **120**

| Pas | i | rezultat |
|-----|---|----------|
| Start | — | 1 |
| 1 | 2 | 2 |
| 2 | 3 | 6 |
| 3 | 4 | 24 |
| 4 | 5 | 120 |

**Exemplul 2:** Valori comune ale factorialului

| n | n! |
|---|----|
| 0 | 1 |
| 1 | 1 |
| 2 | 2 |
| 3 | 6 |
| 4 | 24 |
| 5 | 120 |
| 6 | 720 |
| 10 | 3.628.800 |
| 20 | 2.432.902.008.176.640.000 |

**Exemplul 3:** Câte moduri poți aranja 4 cărți?

P(4) = 4! = 24 aranjamente posibile.

## Aplicații

- **Combinatorică** – numărul de permutări ale n elemente este n!; numărul de combinații C(n,k) = n! / (k! × (n-k)!).
- **Serii Taylor** – eˣ = 1 + x/1! + x²/2! + x³/3! + ...; sin(x) = x - x³/3! + x⁵/5! - ...
- **Probabilitate** – calculul probabilităților în distribuțiile discrete (Poisson, binomială).
- **Algoritmi de căutare** – calculul numărului total de stări posibile în probleme de tip backtracking.
- **Criptografie** – în scheme bazate pe probleme combinatoriale dificile.
- **Teoria grupurilor** – numărul de permutări ale unei mulțimi de n elemente formează grupul simetric Sₙ de ordin n!.

## Observații din implementare

- Implementarea folosește funcții arrow/funcții compacte.

## Resurse

- [Wikipedia – Factorial](https://ro.wikipedia.org/wiki/Factorial)
- [GeeksForGeeks – Factorial of a Number](https://www.geeksforgeeks.org/factorial-of-a-number/)
- [Khan Academy – Factorial și combinatorică](https://www.khanacademy.org/math/precalculus/x9e81a4f98389efdf:prob-comb/x9e81a4f98389efdf:factorial-counting-principle/a/factorial-review)
