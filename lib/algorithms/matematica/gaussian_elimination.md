<!-- custom-doc -->
# 🧠 Eliminarea Gaussiană (Gaussian Elimination)

## 📝 Descriere
**Eliminarea Gaussiană** este un algoritm fundamental în algebra liniară utilizat pentru rezolvarea sistemelor de ecuații liniare, găsirea inversei unei matrice și calcularea determinantului. Procesul constă în aplicarea unei serii de operații elementare pe rândurile matricei augmentate pentru a o aduce la o **formă treaptă (row echelon form)**.

---

## 🖼️ Reprezentare Vizuală

![Eliminarea Gaussiană](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Gaussian_elimination_steps.svg/400px-Gaussian_elimination_steps.svg.png)
*Sursă: Wikipedia - Vizualizarea transformării unei matrice.*

### Exemplu de sistem:
Să considerăm sistemul de ecuații:
$$
\begin{cases} 
2x + 3y + z = 1 \\ 
4x + y + 2z = 2 \\ 
3x + 2y + 3z = 3 
\end{cases}
$$

---

## ⚖️ Avantaje și Dezavantaje

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 Poate rezolva orice sistem de ecuații liniare compatibil. | ⚠️ Sensibil la erorile de rotunjire (necesită „pivoting”). |
| 📊 Metodă sistematică și ușor de implementat programatic. | 🐢 Complexitate ridicată pentru matrice foarte mari ($O(n^3)$). |
| 🛠️ Esențial pentru calculul inversei și determinantului. | 📉 Ineficient pentru matrice rare (sparse matrices). |

---

## 🔢 Analiză Matematică și Complexitate

Algoritmul folosește operații de tip: $R_i \leftarrow R_i - \frac{a_{ij}}{a_{jj}} R_j$

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(n^3)$ |
| **Spațiu (Space)** | $O(n^2)$ |

---

## 💡 Aplicații Practice
- **Inginerie:** Analiza structurilor și a circuitelor electrice.
- **Economie:** Modelarea echilibrului sistemelor economice complexe.
- **Informatică:** Algoritmi de optimizare, învățare automată și grafică pe calculator.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*
