<!-- custom-doc -->

# 🚀 **Selecție Rapidă (Quick Select)**

## 📝 **Descriere**

**Quick Select** este un algoritm eficient utilizat pentru a găsi al k-lea cel mai mic element dintr-un tablou nesortat. Este o variantă a algoritmului Quick Sort, dar în loc să sorteze întregul tablou, se concentrează pe a explora doar sub-tabloul care conține elementul căutat, ceea ce îl face extrem de rapid în medie.

## 🖼️ **Reprezentare Vizuală**

![Quick Select Animation](https://upload.wikimedia.org/wikipedia/commons/0/04/Quickselect_Animation.gif)

```text
K=3 (Găsește al 3-lea cel mai mic element)
Tablou: [3, 6, 2, 7, 5, 1, 4]
1. Alegem Pivot = 4
2. Partitionare: [3, 2, 1] [4] [6, 7, 5]
3. Index pivot = 3. Deoarece 3 == K, elementul 4 este rezultatul!
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Eficiență:** Foarte rapid pentru găsirea unui singur element (medie $O(n)$). | ⚠️ **Worst Case:** Poate ajunge la $O(n^2)$ dacă pivotul este ales prost. |
| 📊 **In-place:** Nu necesită memorie suplimentară semnificativă. | 📉 **Instabilitate:** Nu păstrează ordinea relativă a elementelor egale. |

## 🔢 **Analiză Matematică și Complexitate**

Algoritmul elimină o parte din date la fiecare pas, similar cu căutarea binară, dar cu un efort de partitionare liniar.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Worst Case)** | $O(n^2)$ |
| **Timp (Average Case)** | $O(n)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Statistici descriptive:** Găsirea medianei sau a percentilelor într-un set de date masiv.
- **Baze de date:** Selecția rapidă a elementelor de top dintr-o listă nesortată.
- **Procesarea semnalelor:** Filtrarea valorilor aberante dintr-un flux de date.
