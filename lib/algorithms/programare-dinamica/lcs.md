<!-- custom-doc -->

# 🚀 **Cel mai lung subșir comun (Longest Common Subsequence - LCS)**

## 📝 **Descriere**

Algoritmul **LCS** determină lungimea celui mai lung subșir care apare în două secvențe date în aceeași ordine relativă, dar nu neapărat pe poziții consecutive. Este o problemă fundamentală rezolvată prin **Programare Dinamică**, utilizată pentru a măsura gradul de similaritate între două șiruri de caractere sau secvențe de date.

## 🖼️ **Reprezentare Vizuală**

![LCS Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Longest_common_subsequence.svg/400px-Longest_common_subsequence.svg.png)

```text
Matricea de Programare Dinamică (Exemplu):
      Ø  A  C  B  D
   Ø [0, 0, 0, 0, 0]
   A [0, 1, 1, 1, 1]
   B [0, 1, 1, 2, 2]
   C [0, 1, 2, 2, 2]
   D [0, 1, 2, 2, 3]

LCS("ABCD", "ACBD") = 3 (Exemple: "ABD" sau "ACD")
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Precizie Maximă:** Oferă o măsură exactă a suprapunerii structurale. | ⚠️ **Consum Memorie:** Necesită o matrice $O(m \cdot n)$, problematică pentru șiruri foarte lungi. |
| 📊 **Flexibilitate:** Identifică elemente comune chiar dacă sunt separate de alte caractere. | 📉 **Performanță Timp:** Complexitate pătratică, lentă pentru volume masive de date. |
| 🛠️ **Standard Industrial:** Stă la baza multor unelte de comparare a fișierelor. | 🧩 **Complexitate:** Implementarea eficientă necesită înțelegerea programării dinamice. |

## 🔢 **Analiză Matematică și Complexitate**

Relația de recurență pentru calculul $LCS(i, j)$:
$$LCS(i, j) = \begin{cases} 1 + LCS(i-1, j-1) & \text{dacă } S1[i] == S2[j] \\ \max(LCS(i-1, j), LCS(i, j-1)) & \text{dacă } S1[i] \neq S2[j] \end{cases}$$

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(m \cdot n)$ |
| **Spațiu (Space)** | $O(m \cdot n)$ (poate fi optimizat la $O(\min(m, n))$ pentru lungime) |

## 💡 **Aplicații Practice**

- **Controlul Versiunilor:** Algoritmul central pentru comanda `diff` și gestionarea conflictelor în Git.
- **Bioinformatică:** Alinierea secvențelor de ADN și proteine pentru identificarea genelor comune.
- **Detectarea Plagiatului:** Compararea documentelor pentru a găsi pasaje copiate sau reformulate.
- **Recunoașterea Vorbirii:** Compararea semnalelor audio procesate cu modelele de referință.
