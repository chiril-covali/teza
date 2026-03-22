# Coeficientul Binomial

Slug: matematica_binomial_coefficient
Categorie: Matematică

## Introducere

Coeficientul binomial C(n, k), citit „n alege k", reprezintă numărul de moduri de a alege k elemente dintr-o mulțime de n elemente, fără a ține cont de ordine. Este notat C(n,k) sau ⁿCₖ sau „n sub k" (binomial).

Apare în teoria probabilităților, statistică, algebră combinatorică și în expansiunea binomului lui Newton: (a+b)ⁿ = Σ C(n,k) × aⁿ⁻ᵏ × bᵏ. Valorile C(n,k) formează rândurile triunghiului lui Pascal.

## Descriere

**Definiție:** C(n, k) = n! / (k! × (n-k)!)

**Proprietăți:**
- C(n, 0) = C(n, n) = 1
- C(n, k) = C(n, n-k)
- C(n, k) = C(n-1, k-1) + C(n-1, k) (recurența Pascal)

**Pașii algoritmului (DP iterativ):**
1. Inițializează dp[0] = 1.
2. Pentru i de la 1 la n, actualizează dp de la k în jos: dp[j] += dp[j-1].
3. Returnează dp[k].

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Programare dinamică | O(n×k) | O(k) |
| Formula directă | O(k) | O(1) |

**Explicație:** Calculul direct al formulei poate provoca overflow pentru n mare; DP evită calculul factorialilor mari.

## Pseudocod

```
funcție binomial(n, k):
    dacă k > n: returnează 0
    dacă k = 0 sau k = n: returnează 1
    k ← min(k, n-k)  // optimizare simetrie
    rezultat ← 1
    pentru i de la 0 la k-1:
        rezultat ← rezultat × (n - i) / (i + 1)
    returnează rezultat
```

## Exemple

**C(5, 2):** 5! / (2! × 3!) = 120 / (2 × 6) = **10**

Cele 10 perechi din {1,2,3,4,5}: {1,2},{1,3},{1,4},{1,5},{2,3},{2,4},{2,5},{3,4},{3,5},{4,5}.

**C(10, 3):** 10×9×8 / (3×2×1) = 720/6 = **120**

**(a+b)³:** C(3,0)a³ + C(3,1)a²b + C(3,2)ab² + C(3,3)b³ = a³ + 3a²b + 3ab² + b³

## Aplicații

- **Probabilitate** – distribuția binomială P(X=k) = C(n,k) × pᵏ × (1-p)ⁿ⁻ᵏ.
- **Combinatorică** – numărarea subseturilor, combinărilor.
- **Teoria grafurilor** – numărarea subgrafurilor complete.
- **Algoritmi** – în analiza algoritmilor randomizați.

## Observații din implementare

- Implementarea folosește funcții arrow/funcții compacte.

## Resurse

- [Wikipedia – Coeficient binomial](https://ro.wikipedia.org/wiki/Coeficient_binomial)
- [GeeksForGeeks – Binomial Coefficient](https://www.geeksforgeeks.org/binomial-coefficient-dp-9/)
