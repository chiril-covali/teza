<!-- custom-doc -->
# 🚀 **Heap (Grămadă)**

## 📝 **Descriere**
Un **Heap** (sau Grămadă) este o structură de date ierarhică de tip arbore binar complet care respectă proprietatea de heap: într-un **Max-Heap**, valoarea fiecărui nod este mai mare sau egală cu valorile copiilor săi (rădăcina este maximul), iar într-un **Min-Heap**, valoarea fiecărui nod este mai mică sau egală cu valorile copiilor săi (rădăcina este minimul).

## 🖼️ **Reprezentare Vizuală**
![Min Heap](https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Max-Heap.svg/300px-Max-Heap.svg.png)

**Diagramă ASCII (Max-Heap):**
```text
          [100]
         /     \
      [19]     [36]
      /  \     /  \
    [17] [3] [25] [1]
(Toți copiii sunt mai mici decât părinții)
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Acces Rapid la Extrem:** Găsește elementul minim/maxim instantaneu $O(1)$. | ⚠️ **Căutare Lentă:** Găsirea unui element oarecare necesită $O(n)$. |
| 📊 **Eficiență Memorie:** Poate fi implementat compact folosind un singur vector. | 📉 **Fără Sortare Completă:** Doar rădăcina este garantat sortată față de restul. |

## 🔢 **Analiză Matematică și Complexitate**
Într-un vector $A$, pentru nodul de la indexul $i$:
- Părinte: $(i-1)/2$
- Copil Stâng: $2i + 1$
- Copil Drept: $2i + 2$

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Găsire Min/Max** | $O(1)$ |
| **Inserare/Ștergere** | $O(\log n)$ |
| **Spațiu (Space)** | $O(n)$ |

## 💡 **Aplicații Practice**
- **Coadă de Priorități:** Gestionarea proceselor în funcție de importanță.
- **Heap Sort:** Un algoritm de sortare in-place eficient.
- **Dijkstra & Prim:** Găsirea rapidă a celei mai apropiate muchii/nod.
