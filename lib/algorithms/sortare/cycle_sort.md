<!-- custom-doc -->

# 🚀 **Sortare prin Ciclu**

## 📝 **Descriere**

**Cycle Sort** este un algoritm de sortare *in-place* și instabil, care este optim din punct de vedere al numărului total de scrieri în memorie. Se bazează pe ideea că orice permutare poate fi descompusă în cicluri. Algoritmul identifică aceste cicluri și rotește elementele pentru a le plasa direct în poziția lor finală.

## 🖼️ **Reprezentare Vizuală**

![Cycle Sort Animation](/docs-images/sortare/cycle_sort.svg)
<!-- external-visual -->
![Resursă vizuală externă (sortare)](https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg)


```text
Input: [3, 1, 5, 2]
1. 3 ar trebui să fie la index 2. Interschimbă 3 cu 5.
2. Noul element (5) ar trebui să fie la index 3. Interschimbă cu 2.
3. Continuă până când ciclul se închide.
Rezultat: [1, 2, 3, 5]
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Minimizarea Scrierilor:** Fiecare element este scris fie zero, fie o singură dată în poziția sa finală. | ⚠️ **Ineficiență Timp:** Complexitate $O(n^2)$, mult mai lent decât QuickSort. |
| 📊 **In-place:** Necesită memorie suplimentară minimă $O(1)$. | 📉 **Instabilitate:** Nu păstrează ordinea relativă a elementelor egale. |

## 🔢 **Analiză Matematică și Complexitate**

Deși este optim pentru scrieri, numărul de comparații rămâne ridicat.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Worst Case)** | $O(n^2)$ |
| **Timp (Average Case)** | $O(n^2)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Memorie Flash (EEPROM):** Unde durata de viață este limitată de numărul de scrieri.
- **Sisteme Embedded:** Când scrierea datelor este mult mai costisitoare decât citirea sau compararea lor.
