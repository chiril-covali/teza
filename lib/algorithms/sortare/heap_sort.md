<!-- custom-doc -->

# 🚀 **Sortarea prin Heap (Heap Sort)**

## 📝 **Descriere**

**Heap Sort** este un algoritm de sortare bazat pe comparare care utilizează o structură de date de tip **Binary Heap** (morman binar). Algoritmul poate fi privit ca o optimizare a sortării prin selecție, unde folosim un heap pentru a găsi rapid elementul maxim (sau minim) în loc de o căutare liniară.

## 🖼️ **Reprezentare Vizuală**

![Heap Sort Animation](https://upload.wikimedia.org/wikipedia/commons/1/1b/Sorting_heapsort_anim.gif)

```text
1. Construiește un Max-Heap din date.
   [4, 10, 3, 5, 1] -> [10, 5, 3, 4, 1]
2. Extrage rădăcina (10) și pune-o la final.
3. Re-heapify restul listei.
4. Repetă până când heap-ul este gol.
Rezultat: [1, 3, 4, 5, 10]
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Performanță Garantată:** $O(n \log n)$ chiar și în cel mai rău caz. | ⚠️ **Instabilitate:** Nu păstrează ordinea relativă a elementelor egale. |
| 📊 **Memorie Eficientă:** Sortare in-place, nu necesită spațiu suplimentar. | 📉 **Lentoare relativă:** De obicei mai lent decât QuickSort pe date medii. |

## 🔢 **Analiză Matematică și Complexitate**

Construirea heap-ului durează $O(n)$, iar cele $n$ extracții durează $O(\log n)$ fiecare.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (All Cases)** | $O(n \log n)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Sisteme de securitate:** Unde timpul de răspuns garantat este critic (pentru a evita atacurile de tip timing).
- **Embedded Systems:** Datorită consumului minim și predictibil de memorie.
- **Priority Queues:** Heap-ul este structura de bază pentru cozi de priorități.
