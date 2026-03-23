<!-- custom-doc -->

# 🚀 **Algoritmul Edmonds-Karp**

## 📝 **Descriere**

**Edmonds-Karp** este o implementare specifică a metodei **Ford-Fulkerson** pentru calcularea fluxului maxim într-o rețea de transport. Diferența cheie este că Edmonds-Karp utilizează **BFS** (Breadth-First Search) pentru a găsi drumurile de ameliorare, garantând astfel o complexitate polinomială și evitarea problemelor cu muchii de capacitate foarte mare.

## 🖼️ **Reprezentare Vizuală**

![Edmonds-Karp Animation](/docs-images/grafuri/edmonds_karp.svg)
<!-- external-visual -->
![Resursă vizuală externă (grafuri)](https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80)


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
| 🚀 **Robust:** Garantează terminarea execuției chiar și pe capacități reale. | ⚠️ **Lent:** Mai lent decât algoritmul lui Dinic pentru grafuri foarte mari. |
| 📊 **Simplitate:** Ușor de înțeles deoarece se bazează pe BFS standard. | 📉 **Eficiență:** Ineficient pentru grafuri extrem de mari cu fluxuri complexe. |

## 🔢 **Analiză Matematică și Complexitate**

Algoritmul se oprește conform teoremei **Max-Flow Min-Cut**.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(V \cdot E^2)$ |
| **Spațiu (Space)** | $O(V + E)$ |

## 💡 **Aplicații Practice**

- **Logistica Petrolului:** Maximizarea cantității de combustibil prin conducte.
- **Telecomunicații:** Direcționarea pachetelor de date pentru a evita congestia.
- **Programarea Turelor:** Alocarea optimă a angajaților pe intervale orare.
- **Probleme de Tăiere Minimă:** Identificarea punctelor critice de eșec într-o rețea.
