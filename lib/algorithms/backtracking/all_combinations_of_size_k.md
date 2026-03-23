<!-- custom-doc -->

# 🚀 **Toate Combinările de Dimensiune K**

## 📝 **Descriere**

Acest algoritm de **Backtracking** generează toate subseturile posibile de dimensiune fixă $k$ dintr-un set de $n$ numere (de la 1 la $n$). Ordinea elementelor în cadrul unui subset nu contează, ceea ce diferențiază combinările de permutări sau aranjamente.

## 🖼️ **Reprezentare Vizuală**

![Combinations Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Combination_locks.svg/200px-Combination_locks.svg.png)

```text
[1, 2, 3, 4]

1. Start 1 -> [1, 2], [1, 3], [1, 4]
2. Start 2 -> [2, 3], [2, 4]
3. Start 3 -> [3, 4]

Total: 6 combinări.
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Completitudine:** Garantează că nicio combinație nu este omisă. | ⚠️ **Complexitate:** Numărul de rezultate poate fi imens ($\binom{n}{k}$). |
| 📊 **Memorie:** Nu trebuie să stocheze tot arborele, doar calea curentă. | 📉 **Timp:** Execuția durează direct proporțional cu numărul de combinații generate. |

## 🔢 **Analiză Matematică și Complexitate**

Numărul total de subseturi este dat de coeficientul binomial: $\binom{n}{k} = \frac{n!}{k!(n-k)!}$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(k \cdot \binom{n}{k})$ |
| **Spațiu (Space)** | $O(k)$ (pentru stiva de recursivitate) |

## 💡 **Aplicații Practice**

- **Analiza Loteriilor:** Calcularea tuturor variantelor posibile la jocuri de noroc.
- **Statistică:** Selecția eșantioanelor dintr-o populație dată.
- **Algoritmi de Optimizare:** Testarea diferitelor combinații de parametri.
