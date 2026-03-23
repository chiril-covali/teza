<!-- custom-doc -->

# 🚀 **Eliminarea Gaussiană (Gaussian Elimination)**

## 📝 **Descriere**

**Eliminarea Gaussiană** este un algoritm fundamental în algebra liniară utilizat pentru rezolvarea sistemelor de ecuații liniare, găsirea inversei unei matrice și calcularea determinantului. Procesul constă în aplicarea unei serii de operații elementare pe rândurile matricei augmentate pentru a o aduce la o **formă treaptă (row echelon form)**.

## 🖼️ **Reprezentare Vizuală**

![Gaussian Elimination](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Gaussian_elimination_steps.svg/400px-Gaussian_elimination_steps.svg.png)

```text
Matrice Inițială:      Matrice Treaptă:
[ 2  1 -1 |  8 ]     [ 1 -2  1 | -4 ]
[ -3 -1  2 | -11] --> [ 0  1 -1 |  3 ]
[ -2  1  2 | -3 ]     [ 0  0  1 |  2 ]
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Universal:** Rezolvă orice sistem de ecuații liniare compatibil. | ⚠️ **Erori:** Sensibil la erorile de rotunjire (necesită pivoting). |
| 📊 **Metodic:** Oferă o procedură clară pentru calcularea inversei. | 📉 **Costisitor:** Complexitate ridicată pentru matrice foarte mari. |

## 🔢 **Analiză Matematică și Complexitate**

Algoritmul utilizează operații elementare de tip: $R_i \leftarrow R_i - \frac{a_{ij}}{a_{jj}} R_j$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(n^3)$ |
| **Spațiu (Space)** | $O(n^2)$ |

## 💡 **Aplicații Practice**

- **Inginerie:** Calcularea forțelor în structuri și a curenților în circuite.
- **Economie:** Modelarea echilibrului în sistemele de tip input-output.
- **Computer Graphics:** Transformări geometrice și proiecții 3D.
