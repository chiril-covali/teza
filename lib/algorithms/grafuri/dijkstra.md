<!-- custom-doc -->

# 🚀 **Algoritmul Dijkstra**

## 📝 **Descriere**

**Algoritmul Dijkstra** este unul dintre cei mai celebri algoritmi de grafuri, utilizat pentru a găsi cel mai scurt drum de la un nod sursă către toate celelalte noduri dintr-un graf ponderat cu **costuri non-negative**. Funcționează pe principiul "greedy", alegând mereu nodul cel mai apropiat care nu a fost încă procesat.

## 🖼️ **Reprezentare Vizuală**

![Dijkstra Animation](/docs-images/grafuri/dijkstra.svg)
<!-- external-visual -->
![Resursă vizuală externă (grafuri)](https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80)


```text
   (A)---1---(B)
    | \       |
    4  2      5
    |   \     |
   (C)---3---(D)

Pas 1: dist[A]=0, restul inf. Vizităm A.
Pas 2: Update vecini A: dist[B]=1, dist[D]=2, dist[C]=4.
Pas 3: Alegem cel mai mic (B). Update vecini B...
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Optimalitate:** Garantează găsirea drumului minim dacă toate ponderile sunt pozitive. | ⚠️ **Ponderi Negative:** Eșuează sau produce rezultate greșite dacă există muchii negative. |
| 📊 **Performanță:** Foarte eficient când este implementat cu un Min-Heap (Priority Queue). | 📉 **Complexitate:** Mai complex de implementat corect față de BFS. |

## 🔢 **Analiză Matematică și Complexitate**

Eficiența algoritmului depinde critic de structura de date folosită pentru a extrage minimul.

| Tip Implementare | Complexitate Timp |
| :--- | :--- |
| **Cu Tablou (Array)** | $O(V^2)$ |
| **Cu Binary Heap** | $O(E \log V)$ |
| **Spațiu (Space)** | $O(V)$ |

## 💡 **Aplicații Practice**

- **Sisteme de Navigație:** Calcularea rutelor optime în Google Maps sau Waze.
- **Protocoale de Rețea:** Utilizat în OSPF pentru a direcționa traficul de date.
- **Robotica:** Planificarea traiectoriei unui robot pentru a evita obstacolele cu cost minim.
- **Jocuri Video:** Algoritmi de pathfinding pentru AI (inteligența artificială a personajelor).
