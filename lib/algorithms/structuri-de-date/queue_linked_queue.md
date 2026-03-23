<!-- custom-doc -->

# 🚀 **Coadă bazată pe Listă Înlănțuită (Linked Queue)**

## 📝 **Descriere**

**Coadă bazată pe Listă Înlănțuită** (Linked Queue) este o implementare dinamică a cozii care utilizează noduri înlănțuite în loc de un vector fix. Aceasta permite cozii să crească și să scadă în dimensiune în mod natural, fără a irosi memorie și fără a necesita operații costisitoare de redimensionare. Elementele sunt adăugate la "Rear" și eliminate de la "Front".

## 🖼️ **Reprezentare Vizuală**

![Linked Queue Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Queue-linked-list.svg/400px-Queue-linked-list.svg.png)

```text
      Front -> [D1 | *] -> [D2 | *] -> [D3 | NULL] <- Rear
                Nod 1       Nod 2       Nod 3
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Dimensiune Dinamică:** Nu necesită declararea unei mărimi maxime la inițializare. | ⚠️ **Overhead Memorie:** Fiecare element consumă spațiu suplimentar pentru pointer. |
| 📊 **Operații Rapide:** Atât adăugarea cât și eliminarea sunt garantate $O(1)$. | 📉 **Localitate Memorie:** Nodurile pot fi dispersate în memorie, afectând performanța cache-ului. |

## 🔢 **Analiză Matematică și Complexitate**

Implementarea folosește doi pointeri externi: `front` (pentru eliminare) și `rear` (pentru adăugare).

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Enqueue (Adăugare)** | $O(1)$ |
| **Dequeue (Eliminare)** | $O(1)$ |
| **IsEmpty** | $O(1)$ |
| **Spațiu (Space)** | $O(n)$ |

## 💡 **Aplicații Practice**

- **Algoritmi de Căutare:** Implementarea BFS (Breadth-First Search) în grafuri și arbori.
- **Sisteme de Mesagerie:** Gestionarea cozilor de așteptare în aplicații asincrone.
- **Sisteme de Operare:** Gestionarea cozilor de procese (Ready Queue).
- **Simulări:** Modelarea cozilor de așteptare din lumea reală (bănci, supermarket-uri).
