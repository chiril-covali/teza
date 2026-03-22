# Valoarea Absolută

Slug: matematica_absolute_value
Categorie: Matematică

## Introducere

Valoarea absolută (sau modulul) unui număr real x, notată |x|, reprezintă distanța de la x la originea axei numerelor reale, fără a ține cont de semn. Este una dintre operațiile matematice elementare, fundamentală în analiză, geometrie și informatică.

Conceptul a fost formalizat de Karl Weierstrass în 1841 cu notația |x|. Valoarea absolută satisface proprietăți esențiale: |x| ≥ 0, |x| = 0 ↔ x = 0, |x × y| = |x| × |y|, |x + y| ≤ |x| + |y| (inegalitatea triunghiului).

## Descriere

**Definiție:**
- |x| = x, dacă x ≥ 0
- |x| = -x, dacă x < 0

**Pașii algoritmului:**
1. Dacă x ≥ 0, returnează x.
2. Altfel, returnează -x.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| General | O(1) | O(1) |

**Explicație:** O singură comparație și o eventuală negare — operație în timp constant.

## Pseudocod

```
funcție valoareAbsolută(x):
    dacă x >= 0:
        returnează x
    returnează -x
```

## Exemple

| x | |x| |
|---|-----|
| 7 | 7 |
| -5 | 5 |
| 0 | 0 |
| -3.14 | 3.14 |
| 100 | 100 |

**Distanța dintre două puncte:** |a - b|

|3 - 8| = |-5| = 5; distanța de la 3 la 8 pe axa reală este 5.

**Eroarea de aproximare:** dacă valoarea exactă este 3.14159 și aproximarea este 3.14, eroarea = |3.14159 - 3.14| = 0.00159.

## Aplicații

- **Distanțe euclidiene** – componenta unui vector în calcule geometrice.
- **Metrici de eroare** – MAE (Mean Absolute Error) în machine learning: (1/n) Σ |yᵢ - ŷᵢ|.
- **Normalizare** – norma L1 a unui vector: ||v||₁ = Σ |vᵢ|.
- **Programare** – comparații de toleranță: |a - b| < ε pentru egalitate în virgulă mobilă.
- **Algebră liniară** – determinantul și norma matricelor.
- **Teoria semnalelor** – valoarea de vârf și RMS ale semnalelor periodice.

## Observații din implementare

- Implementarea folosește funcții arrow/funcții compacte.

## Resurse

- [Wikipedia – Valoare absolută](https://ro.wikipedia.org/wiki/Valoare_absolut%C4%83)
- [GeeksForGeeks – Absolute Value](https://www.geeksforgeeks.org/program-to-find-absolute-value-of-a-number/)
