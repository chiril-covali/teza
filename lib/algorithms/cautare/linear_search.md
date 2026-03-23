<!-- custom-doc -->
# 🚀 **Căutare Liniară (Linear Search)**

## 📝 **Descriere**
**Căutarea Liniară** (sau Căutarea Secvențială) este cel mai simplu algoritm de căutare. Acesta parcurge fiecare element dintr-un tablou, unul câte unul, comparându-l cu valoarea căutată până când este găsită o potrivire sau până când se ajunge la sfârșitul listei.

## 🖼️ **Reprezentare Vizuală**
![Linear Search Animation](https://upload.wikimedia.org/wikipedia/commons/b/be/Linear_Search_Algorithm.gif)

**Diagramă ASCII:**
```text
Target: 15
Index: [0] [1] [2] [3] [4]
Val:   [10, 20, 15, 40, 50]
Pas 1: 10 != 15 (Continuă)
Pas 2: 20 != 15 (Continuă)
Pas 3: 15 == 15 (GĂSIT la Index 2!)
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Universalitate:** Funcționează pe orice tip de listă, **indiferent dacă este sortată sau nu**. | ⚠️ **Ineficiență:** Este foarte lent pentru seturi mari de date (crește liniar). |
| 📊 **Simplitate:** Ușor de înțeles și de implementat în doar câteva linii de cod. | 📉 **Costisitor:** În cel mai rău caz, trebuie să verifice absolut toate elementele. |

## 🔢 **Analiză Matematică și Complexitate**
Dacă $n$ este numărul de elemente, numărul de comparații în cel mai rău caz este exact $n$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Worst Case)** | $O(n)$ |
| **Timp (Best Case)** | $O(1)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**
- **Liste mici:** Când numărul de elemente este foarte mic, overhead-ul altor algoritmi mai complecși (cum ar fi sortarea prealabilă pentru căutare binară) nu se justifică.
- **Date nesortate:** Căutarea într-o listă care se schimbă constant și nu poate fi menținută sortată eficient.
