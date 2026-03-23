<!-- custom-doc -->

# 🚀 **Cel mai mare divizor comun (Greatest Common Factor)**

## 📝 **Descriere**

**Cel mai mare divizor comun** (CMMDC) a două sau mai multe numere întregi este cel mai mare număr natural care divide exact toate numerele date. Cel mai eficient mod de a-l calcula este **Algoritmul lui Euclid**, bazat pe observația că CMMDC-ul a două numere nu se schimbă dacă numărul mai mare este înlocuit cu restul împărțirii sale la cel mai mic.

## 🖼️ **Reprezentare Vizuală**

![Euclidean Algorithm](https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Euclid_algorithm_252_105.svg/300px-Euclid_algorithm_252_105.svg.png)

```text
48 / 18 = 2 rest 12
18 / 12 = 1 rest 6
12 / 6  = 2 rest 0
CMMDC este ultimul rest nenul: 6
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Eficiență:** Algoritmul lui Euclid este extrem de rapid, chiar și pentru numere gigantice. | ⚠️ **Limitare:** Se aplică doar numerelor întregi. |
| 📊 **Simplitate:** Logica este recursivă și foarte ușor de codat. | 📉 **Implementare:** Necesită atenție la tratarea cazului cu zero. |

## 🔢 **Analiză Matematică și Complexitate**

Proprietate: $cmmdc(a, b) = cmmdc(b, a \pmod b)$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(\log(\min(a, b)))$ |
| **Spațiu (Space)** | $O(1)$ (Iterativ) |

## 💡 **Aplicații Practice**

- **Criptografie:** Componentă esențială în algoritmul RSA (verificarea numerelor prime între ele).
- **Fracții:** Reducerea fracțiilor la forma ireductibilă.
- **Design Grafic:** Calcularea aspectului imaginii (aspect ratio) și a rezoluțiilor.
