<!-- custom-doc -->
# 🚀 **Quick Sort (Sortarea Rapidă)**

## 📝 **Descriere**
**Quick Sort** este unul dintre cei mai utilizați algoritmi de sortare, bazat pe strategia **Divide et Impera**. Acesta funcționează prin alegerea unui element numit **pivot** și partiționarea tabloului în două sub-tablouri: elementele mai mici decât pivotul și elementele mai mari decât pivotul. Procesul este apoi aplicat recursiv sub-tablourilor.

## 🖼️ **Reprezentare Vizuală**
![Quick Sort Animation](https://upload.wikimedia.org/wikipedia/commons/6/6a/Sorting_quicksort_anim.gif)

**Diagramă ASCII (Partiționare):**
```text
Pivot: 30
[10, 80, 30, 90, 40, 50, 70]
   \   /
  [10, 30, 80, 90, 40, 50, 70] (30 e la locul său)
 [Sub-St]  30  [Sub-Dr]
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Viteză:** Extrem de rapid în practică (cazul mediu). | ⚠️ **Instabilitate:** Nu păstrează ordinea relativă a elementelor egale. |
| 📊 **Memorie:** Sortare "in-place", necesită foarte puțin spațiu suplimentar. | 📉 **Worst Case:** Poate fi foarte lent ($O(n^2)$) dacă pivotul este ales prost. |

## 🔢 **Analiză Matematică și Complexitate**
Performanța depinde de alegerea pivotului (ideal ar fi mediana).

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Average Case)** | $O(n \log n)$ |
| **Timp (Worst Case)** | $O(n^2)$ |
| **Spațiu (Space)** | $O(\log n)$ (datorită recursivității) |

## 💡 **Aplicații Practice**
- **Biblioteci standard:** Este baza pentru funcția `sort()` din multe limbaje de programare.
- **Sisteme de fișiere:** Sortarea listelor de fișiere mari.
- **Baze de date:** Indexarea rapidă a datelor.
