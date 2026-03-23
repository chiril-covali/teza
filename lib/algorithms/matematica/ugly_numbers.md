<!-- custom-doc -->
# 🚀 **Ugly Numbers**

## 📝 **Descriere**
**Ugly Numbers** (numere urâte) sunt numere întregi pozitive ai căror singuri factori primi sunt 2, 3 sau 5. Prin convenție, 1 este inclus în această categorie. Secvența începe astfel: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15... Aceste numere sunt fundamentale în studiul algoritmilor de programare dinamică.

## 🖼️ **Reprezentare Vizuală**
![Prime Factors](https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Primes_through_20.svg/300px-Primes_through_20.svg.png)

**Diagramă ASCII (Verificare):**
```text
Număr: 12
12 / 2 = 6
 6 / 2 = 3
 3 / 3 = 1
Factori primi: {2, 3} ✅ (Este "Ugly")

Număr: 14
14 / 2 = 7
Factori primi: {2, 7} ❌ (7 nu este în {2, 3, 5})
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Structură Clară:** Definiția simplă permite implementări rapide de verificare. | ⚠️ **Eficientă:** Găsirea celui de-al n-lea număr urât prin verificare brută este foarte lentă. |
| 📊 **Programare Dinamică:** Problemă excelentă pentru a învăța tehnica "pointers" în DP. | 📉 **Limitare:** Conceptul este destul de abstract și limitat la factorii 2, 3, 5. |

## 🔢 **Analiză Matematică și Complexitate**
Un număr este "ugly" dacă are forma $2^a \cdot 3^b \cdot 5^c$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Găsire al n-lea (DP)** | $O(n)$ |
| **Verificare un număr** | $O(\log n)$ |
| **Spațiu (Space)** | $O(n)$ |

## 💡 **Aplicații Practice**
- **Algoritmică:** Studiul seriilor de numere și optimizarea sub-problemelor suprapuse.
- **Teoria Numerelor:** Analiza numerelor de tip Hamming (smooth numbers).
- **Interviuri Coding:** O problemă clasică pentru testarea abilităților de optimizare.
