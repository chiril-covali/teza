<!-- custom-doc -->

# 🚀 **Algoritmul lui Johnson**

## 📝 **Descriere**

**Algoritmul lui Johnson** este utilizat pentru a găsi cele mai scurte drumuri între **toate perechile de noduri** dintr-un graf ponderat rar. Acesta permite muchii cu **costuri negative**, dar nu cicluri negative. Algoritmul folosește o tehnică numită **re-ponderare** pentru a elimina costurile negative, permițând apoi rularea eficientă a algoritmului Dijkstra de $V$ ori.

## 🖼️ **Reprezentare Vizuală**

![Johnson's Algorithm](/docs-images/grafuri/johnson.svg)
<!-- external-visual -->
![Resursă vizuală externă (grafuri)](https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg)


```text
1. Adaugă un nod fictiv S legat de toate celelalte cu cost 0.
2. Rulează Bellman-Ford din S pentru a calcula potențialele h(v).
3. Re-ponderează muchiile: w'(u,v) = w(u,v) + h(u) - h(v).
4. Acum toate ponderile w' sunt >= 0.
5. Rulează Dijkstra de V ori pentru toate nodurile.
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Eficient pe grafuri rare:** Mult mai rapid decât Floyd-Warshall pentru grafuri cu puține muchii. | ⚠️ **Complexitate logică:** Mult mai greu de implementat și depanat față de alți algoritmi. |
| 📊 **Costuri Negative:** Suportă muchii cu cost negativ fără a intra în bucle (dacă nu sunt cicluri). | 📉 **Overhead:** Etapa inițială de Bellman-Ford adaugă o latență fixă. |

## 🔢 **Analiză Matematică și Complexitate**

Complexitatea depinde de implementarea Dijkstra (Binary Heap).

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(V^2 \log V + VE)$ |
| **Spațiu (Space)** | $O(V + E)$ |

## 💡 **Aplicații Practice**

- **Sisteme de Rutare:** Calcularea hărților de rute în rețele complexe cu costuri variabile.
- **Planificare Producție:** Optimizarea fluxului de lucru în fabrici cu multiple stații.
- **Analiza Rețelelor Electrice:** Simularea fluxurilor de energie cu pierderi sau câștiguri pe segmente.
- **Telecomunicații:** Determinarea latenței minime între toate punctele de acces.
