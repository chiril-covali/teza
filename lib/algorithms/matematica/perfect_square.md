<!-- custom-doc -->

# 🚀 **Pătrat Perfect (Perfect Square)**

## 📝 **Descriere**

Un **Pătrat Perfect** este un număr întreg care poate fi exprimat ca pătratul unui alt număr întreg. Matematic, un număr $n$ este pătrat perfect dacă există un întreg $k$ astfel încât $n = k^2$. Aceste numere sunt fundamentale în geometrie (reprezentând aria unui pătrat cu latura întreagă) și în teoria numerelor.

## 🖼️ **Reprezentare Vizuală**

![Perfect Square](https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Square_number_4.svg/200px-Square_number_4.svg.png)

```text
Exemplu: 16 (4x4)
● ● ● ●
● ● ● ●
● ● ● ●
● ● ● ●

Șirul pătratelor perfecte:
0² = 0, 1² = 1, 2² = 4, 3² = 9, 4² = 16, 5² = 25...
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| ✅ **Simplitate:** Formula de verificare este directă și ușor de înțeles. | ⚠️ **Precizie:** Verificarea prin rădăcină pătrată poate avea erori de virgulă mobilă pentru numere foarte mari. |
| ✅ **Eficiență:** Algoritmii de verificare sunt extrem de rapizi, operând în timp constant sau logaritmic. | ❌ **Limitare:** Proprietatea se aplică strict numerelor întregi non-negative. |

## 🔢 **Analiză Matematică și Complexitate**

Verificarea se face de obicei calculând $\lfloor \sqrt{n} \rfloor$ și verificând dacă pătratul său este egal cu $n$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(1)$ (folosind funcții native de sistem) |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Geometrie:** Calcularea ariilor și verificarea proprietăților figurilor geometrice.
- **Criptografie:** Utilizat în anumiți algoritmi de factorizare și protocoale de securitate.
- **Grafică pe Calculator:** Optimizarea randării prin verificarea distanțelor euclidiene pătratice.
- **Jocuri de Logică:** Rezolvarea puzzle-urilor matematice și a problemelor de tip "grid".
