<!-- custom-doc -->

# 🚀 **Numere Urâte (Ugly Numbers)**

## 📝 **Descriere**

**Ugly Numbers** (numere urâte) sunt numere întregi pozitive ai căror singuri factori primi sunt 2, 3 sau 5. Prin convenție, 1 este considerat primul număr urât. Secvența este: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15... Aceste numere sunt fundamentale în studiul algoritmilor de programare dinamică și al numerelor "smooth".

## 🖼️ **Reprezentare Vizuală**

![Prime Factors](https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Primes_through_20.svg/300px-Primes_through_20.svg.png)

```text
Verificare:
12 = 2 * 2 * 3   => ✅ (Ugly)
14 = 2 * 7       => ❌ (7 nu este în {2, 3, 5})
30 = 2 * 3 * 5   => ✅ (Ugly)

Generare eficientă:
Se folosesc 3 pointeri pentru multiplii de 2, 3 și 5.
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| ✅ **Antrenament Algoritmic:** Problemă excelentă pentru înțelegerea tehnicii "multiple pointers" în DP. | ⚠️ **Ineficiență Brută:** Verificarea fiecărui număr pe rând este extrem de lentă pentru valori mari ale lui $n$. |
| ✅ **Structură Previzibilă:** Deși par împrăștiate, pot fi generate ordonat foarte eficient. | ❌ **Utilitate Specifică:** Conceptul este destul de abstract și limitat la factorii specificați (2, 3, 5). |

## 🔢 **Analiză Matematică și Complexitate**

Un număr este "ugly" dacă are forma $2^a \cdot 3^b \cdot 5^c$, unde $a, b, c \ge 0$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Găsire al n-lea (DP)** | $O(n)$ |
| **Verificare un număr** | $O(\log n)$ |
| **Spațiu (Space)** | $O(n)$ |

## 💡 **Aplicații Practice**

- **Teoria Numerelor:** Studiul numerelor Hamming (numere 5-smooth).
- **Interviuri Coding:** Problemă clasică de optimizare și programare dinamică la companii mari de tech.
- **Sisteme de Distribuție:** Algoritmi de scalare care folosesc factori de multiplicare mici.
- **Analiza Algoritmilor:** Exemplu pedagogic pentru complexitatea timp vs. spațiu.
