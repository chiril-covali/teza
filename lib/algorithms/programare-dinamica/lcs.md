<!-- custom-doc -->

# 🚀 **Cel mai lung subșir comun (Longest Common Subsequence - LCS)**

## 📝 **Descriere**

Algoritmul **LCS** găsește lungimea celui mai lung subșir care apare în două secvențe date în aceeași ordine relativă, dar nu neapărat pe poziții consecutive. Este o problemă fundamentală rezolvată prin **Programare Dinamică**, utilizată pentru a măsura similaritatea între două șiruri.

## 🖼️ **Reprezentare Vizuală**

![LCS Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Longest_common_subsequence.svg/400px-Longest_common_subsequence.svg.png)

```text
      Ø  A  C  B  D
   Ø [0, 0, 0, 0, 0]
   A [0, 1, 1, 1, 1]
   B [0, 1, 1, 2, 2]
   C [0, 1, 2, 2, 2]
   D [0, 1, 2, 2, 3]
LCS("ABCD", "ACBD") = 3 (Ex: "ABD")
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Precizie:** Oferă o măsură exactă a gradului de suprapunere între două secvențe. | ⚠️ **Memorie:** Necesită o matrice $O(m \cdot n)$, care poate fi mare pentru texte lungi. |
| 📊 **Flexibilitate:** Subșirul nu trebuie să fie format din caractere adiacente. | 📉 **Timp:** Complexitate pătratică, ineficientă pentru volume masive de date (ex: genom complet). |

## 🔢 **Analiză Matematică și Complexitate**

Relația de recurență:
$$LCS(i, j) = \begin{cases} 1 + LCS(i-1, j-1) & \text{daca } S1[i] == S2[j] \\ \max(LCS(i-1, j), LCS(i, j-1)) & \text{daca } S1[i] \neq S2[j] \end{cases}$$

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(m \cdot n)$ |
| **Spațiu (Space)** | $O(m \cdot n)$ |

## 💡 **Aplicații Practice**

- **Bioinformatică:** Compararea secvențelor de ADN sau proteine pentru a găsi trăsături comune.
- **Controlul Versiunilor:** Algoritmul din spatele comenzii `diff` (Unix) și a sistemului `git`.
- **Detectarea Plagiatului:** Verificarea similarității între două documente text.
