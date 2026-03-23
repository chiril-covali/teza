<!-- custom-doc -->
# 🚀 **Căutare Exponențială (Exponential Search)**

## 📝 **Descriere**
**Căutarea Exponențială** este un algoritm de căutare eficient pentru liste **sortate** de dimensiuni foarte mari sau infinite. Algoritmul funcționează în două etape: 1) Găsește un interval în care ar putea exista elementul prin dublarea succesivă a indicelui ($1, 2, 4, 8, \dots$); 2) Efectuează o căutare binară în interiorul intervalului găsit.

## 🖼️ **Reprezentare Vizuală**
![Exponential Search Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Exponential_Search_Algorithm.png/400px-Exponential_Search_Algorithm.png)

**Diagramă ASCII (Găsire Interval):**
```text
Target: 100
[1, 2, 5, 10, 20, 50, 100, 200, 500, ...]
Pas 1: i=1 (Val: 2) < 100
Pas 2: i=2 (Val: 5) < 100
Pas 3: i=4 (Val: 20) < 100
Pas 4: i=8 (Val: 500) > 100
--> Caută binar între index 4 și 8.
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Eficiență pe liste infinite:** Poate găsi elemente fără a cunoaște lungimea totală a listei. | ⚠️ **Precondiție:** Tabloul **trebuie să fie sortat** în prealabil. |
| 📊 **Rapiditate pentru elemente de la început:** Mai rapid decât căutarea binară dacă elementul este aproape de start. | 📉 **Cost:** Necesită $O(\log i)$ pași pentru a găsi intervalul (unde $i$ este poziția elementului). |

## 🔢 **Analiză Matematică și Complexitate**
Complexitatea depinde de poziția elementului $i$ în tablou.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(\log i)$ |
| **Spațiu (Space)** | $O(1)$ (sau $O(\log i)$ recursiv) |

## 💡 **Aplicații Practice**
- **Căutare în baze de date imense:** Unde lungimea totală nu este cunoscută sau este greu de calculat.
- **Sisteme de streaming:** Găsirea unui punct într-un flux continuu de date sortate cronologic.
- **Unbounded Arrays:** Liste care cresc dinamic în timp ce algoritmul rulează.
