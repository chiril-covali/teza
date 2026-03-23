<!-- custom-doc -->
# 🚀 **Amestecarea unui Tablou (Fisher-Yates Shuffle)**

## 📝 **Descriere**
**Algoritmul Fisher-Yates** (sau Knuth Shuffle) este metoda optimă pentru a genera o permutare aleatorie a unui tablou finit. Spre deosebire de metodele naive, acesta garantează că fiecare permutare posibilă are o probabilitate egală de a apărea, rezultând o amestecare perfect uniformă.

## 🖼️ **Reprezentare Vizuală**
![Shuffle Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Fisher-Yates_shuffle.svg/400px-Fisher-Yates_shuffle.svg.png)

**Diagramă ASCII (Proces):**
```text
[1, 2, 3, 4, 5]
1. Alege i=4, rand(0..4)=2. Swap(4, 2): [1, 2, 5, 4, 3]
2. Alege i=3, rand(0..3)=0. Swap(3, 0): [4, 2, 5, 1, 3]
3. Repetă până la i=1.
Rezultat: Tablou complet amestecat.
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Corectitudine:** Produce o amestecare imparțială (unbiased). | ⚠️ **Sursă de hazard:** Depinde de calitatea generatorului de numere aleatorii (PRNG). |
| 📊 **Eficiență:** Se realizează "in-place", fără a folosi memorie suplimentară. | 📉 **Implementare:** Varianta naivă a algoritmului este adesea implementată greșit ($O(n^2)$). |

## 🔢 **Analiză Matematică și Complexitate**
Algoritmul parcurge tabloul o singură dată de la sfârșit la început.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(n)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**
- **Jocuri de Noroc:** Amestecarea pachetelor de cărți în cazinouri online.
- **Muzică:** Funcția "Shuffle" din playerele audio (Spotify, Apple Music).
- **Testare:** Generarea de date de test în ordine aleatorie pentru a evita bias-ul în experimente.
