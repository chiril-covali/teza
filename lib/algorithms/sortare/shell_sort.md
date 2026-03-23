<!-- custom-doc -->

# 🚀 **Sortare Shell**

## 📝 **Descriere**

**Shell Sort** este un algoritm de sortare care optimizează sortarea prin inserție prin compararea elementelor aflate la o anumită distanță (gap). Algoritmul reduce progresiv această distanță până la 1, moment în care devine o sortare prin inserție clasică, beneficiind de faptul că setul de date este deja parțial sortat.

## 🖼️ **Reprezentare Vizuală**

![Shell Sort Animation](/docs-images/sortare/shell_sort.svg)
<!-- external-visual -->
![Resursă vizuală externă (sortare)](https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg)


```text
Gap=3
[5, 2, 9, 1, 5, 6]
Compară și interschimbă:
(5, 1) -> [1, 2, 9, 5, 5, 6]
(9, 6) -> [1, 2, 6, 5, 5, 9]
Gap=1
[1, 2, 6, 5, 5, 9] -> Sortare finală prin inserție
--> [1, 2, 5, 5, 6, 9]
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Eficiență:** Mult mai rapid decât sortarea prin inserție simplă pentru seturi mari. | ⚠️ **Secvență Gap:** Performanța depinde critic de alegerea secvenței de intervale. |
| 📊 **In-place:** Nu necesită memorie suplimentară semnificativă ($O(1)$). | 📉 **Instabilitate:** Nu păstrează ordinea relativă a elementelor egale. |

## 🔢 **Analiză Matematică și Complexitate**

Complexitatea depinde de secvența de gaps utilizată (ex: Shell, Knuth, Hibbard).

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Worst Case)** | $O(n^2)$ (în general $O(n^{1.5})$) |
| **Timp (Best Case)** | $O(n \log n)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Biblioteci standard vechi:** Unde resursele erau extrem de limitate.
- **Sisteme embedded:** Când un algoritm recursiv (ca Quick Sort) ar putea cauza stack overflow.
- **Sortarea listelor medii:** Când simplitatea codului este mai importantă decât viteza absolută.
