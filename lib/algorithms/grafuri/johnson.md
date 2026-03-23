<!-- custom-doc -->
# 🚀 **Algoritmul lui Johnson**

## 📝 **Descriere**
**Algoritmul lui Johnson** este un algoritm pentru găsirea celor mai scurte drumuri între **toate perechile de noduri** dintr-un graf ponderat rar. Acesta este remarcabil deoarece permite muchii cu **costuri negative**, dar nu cicluri negative. Algoritmul folosește o tehnică numită **re-ponderare** (folosind Bellman-Ford) pentru a elimina costurile negative, permițând apoi rularea algoritmului Dijkstra de $V$ ori.

## 🖼️ **Reprezentare Vizuală**
![Johnson's Algorithm](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Johnsons_algorithm_example.svg/400px-Johnsons_algorithm_example.svg.png)

**Diagramă ASCII (Etape):**
```text
1. Adaugă nod S legat de toate restul cu cost 0.
2. Rulează Bellman-Ford din S pentru a găsi h(v).
3. Re-ponderează muchiile: w'(u,v) = w(u,v) + h(u) - h(v).
4. Acum toate w' sunt >= 0.
5. Rulează Dijkstra de V ori.
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Eficient pe grafuri rare:** Mult mai rapid decât Floyd-Warshall pentru grafuri cu puține muchii. | ⚠️ **Complexitate logică:** Mult mai greu de implementat și depanat. |
| 📊 **Suportă costuri negative:** Depășește limitarea de bază a lui Dijkstra. | 📉 **Overhead:** Etapa de re-ponderare adaugă o latență inițială. |

## 🔢 **Analiză Matematică și Complexitate**
Dacă folosim un Binary Heap pentru Dijkstra.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(V^2 \log V + VE)$ |
| **Spațiu (Space)** | $O(V + E)$ |

## 💡 **Aplicații Practice**
- **Sisteme de Rutare:** Calcularea hărților de rute în rețele unde unele segmente au "bonusuri" (costuri negative).
- **Planificare Producție:** Optimizarea fluxului de lucru între mai multe stații de asamblare.
- **Analiza Rețelelor Electrice:** Simularea fluxurilor de energie cu pierderi/câștiguri.
