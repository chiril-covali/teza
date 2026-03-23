<!-- custom-doc -->
# 🚀 **Algoritmul Edmonds-Karp (Flux Maxim)**

## 📝 **Descriere**
**Edmonds-Karp** este o implementare specifică a metodei **Ford-Fulkerson** pentru calcularea fluxului maxim într-o rețea de transport. Diferența cheie este că Edmonds-Karp utilizează **BFS** (Breadth-First Search) pentru a găsi drumurile de ameliorare, garantând astfel o complexitate polinomială și evitarea problemelor cu muchii de capacitate foarte mare.

## 🖼️ **Reprezentare Vizuală**
![Flow Network](https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Max_flow.svg/400px-Max_flow.svg.png)

**Diagramă ASCII (Drum Ameliorare):**
```text
Sursa (S) --- (5/10) ---> (A) --- (5/5) ---> (T) Sina
   \                       ^
    \--- (2/2) ---> (B) ---/

Flux curent: 5. 
BFS caută drumul S->A->T cu capacitate reziduală.
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Garanție:** Termină întotdeauna execuția, chiar și pe numere reale. | ⚠️ **Complexitate:** Mai lent decât algoritmul lui Dinic pentru grafuri foarte mari. |
| 📊 **Simplitate:** Ușor de înțeles deoarece se bazează pe BFS. | 📉 **Memorie:** Necesită stocarea matricei de capacitate reziduală. |

## 🔢 **Analiză Matematică și Complexitate**
Algoritmul se oprește conform teoremei **Max-Flow Min-Cut**.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(V \cdot E^2)$ |
| **Spațiu (Space)** | $O(V + E)$ |

## 💡 **Aplicații Practice**
- **Logistica Petrolului:** Maximizarea cantității de combustibil prin conducte.
- **Telecomunicații:** Direcționarea pachetelor de date pentru a evita congestia.
- **Programarea Turelor:** Alocarea optimă a angajaților pe intervale orare (via matching bipartit).
