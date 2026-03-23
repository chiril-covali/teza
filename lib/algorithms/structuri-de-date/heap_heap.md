<!-- custom-doc -->

# 🚀 **Heap (Grămadă)**

## 📝 **Descriere**

Un **Heap** (sau Grămadă) este o structură de date ierarhică de tip arbore binar complet care respectă proprietatea de heap. Într-un **Max-Heap**, valoarea fiecărui nod este mai mare sau egală cu valorile copiilor săi (rădăcina fiind maximul). Într-un **Min-Heap**, valoarea fiecărui nod este mai mică sau egală cu valorile copiilor săi (rădăcina fiind minimul). Este implementată eficient folosind un vector.

## 🖼️ **Reprezentare Vizuală**

![Max Heap Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Max-Heap.svg/300px-Max-Heap.svg.png)

```text
Arbore (Max-Heap):             Vector (Reprezentare):
          [100]                Index: 0  1  2  3  4  5  6
         /     \               Val: [100, 19, 36, 17, 3, 25, 1]
      [19]     [36]
      /  \     /  \            Relații:
    [17] [3] [25] [1]          Părinte(i) = (i-1)/2
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Acces Rapid la Extrem:** Găsește elementul minim/maxim instantaneu în $O(1)$. | ⚠️ **Căutare Lentă:** Găsirea unui element oarecare necesită parcurgerea întregii structuri $O(n)$. |
| 📊 **Eficiență Memorie:** Nu necesită pointeri, fiind implementat compact într-un vector. | 📉 **Lipsa Sortării:** Doar rădăcina este garantat sortată față de restul elementelor. |

## 🔢 **Analiză Matematică și Complexitate**

Pentru un nod situat la indexul $i$ într-un vector, copiii săi se află la $2i+1$ și $2i+2$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Găsire Min/Max** | $O(1)$ |
| **Inserare (Push)** | $O(\log n)$ |
| **Ștergere (Pop)** | $O(\log n)$ |
| **Spațiu (Space)** | $O(n)$ |

## 💡 **Aplicații Practice**

- **Coadă de Priorități:** Gestionarea proceselor în sistemele de operare (scheduler).
- **Heap Sort:** Un algoritm de sortare eficient și in-place.
- **Algoritmi de Grafuri:** Optimizarea algoritmilor Dijkstra și Prim.
- **Sisteme Real-time:** Selectarea rapidă a evenimentelor cu prioritate maximă.
