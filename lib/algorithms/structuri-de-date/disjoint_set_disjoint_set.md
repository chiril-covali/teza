<!-- custom-doc -->
# 🚀 **Mulțimi Disjuncte (Union-Find / Disjoint Set)**

## 📝 **Descriere**
Structura de date **Mulțimi Disjuncte** (Disjoint Set Union - DSU) gestionează o colecție de elemente divizate în mai multe submulțimi care nu se suprapun. Oferă două operații principale extrem de eficiente: **Find** (determină căreia mulțime îi aparține un element) și **Union** (unește două mulțimi într-una singură). Este esențială pentru algoritmi care lucrează cu componente conexe.

## 🖼️ **Reprezentare Vizuală**
![Union Find Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Dsu_disjoint_set_union.svg/400px-Dsu_disjoint_set_union.svg.png)

**Diagramă ASCII (Arbori):**
```text
(Set 1)      (Set 2)
   1            4
  / \          /
 2   3        5

Union(3, 5) -> Leagă rădăcina lui 5 de rădăcina lui 3 (sau invers).
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Performanță Aproape Constantă:** Cu optimizările Path Compression și Union by Rank. | ⚠️ **Specializare:** Utilă doar pentru probleme de tip "partitionare" sau "conectivitate". |
| 📊 **Simplitate Memorie:** Poate fi implementată folosind un singur vector de "părinți". | 📉 **Fără Ștergere:** Eliminarea unui element dintr-o mulțime este dificilă în varianta standard. |

## 🔢 **Analiză Matematică și Complexitate**
Complexitatea per operație implică funcția inversă a lui Ackermann, $\alpha(n)$, care crește extrem de lent (practic $\leq 5$).

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Find/Union)** | $O(\alpha(n))$ |
| **Spațiu (Space)** | $O(n)$ |

## 💡 **Aplicații Practice**
- **Algoritmul lui Kruskal:** Verificarea dacă adăugarea unei muchii formează un ciclu.
- **Networking:** Determinarea componentelor conexe într-o rețea de calculatoare.
- **Prelucrarea Imaginilor:** Algoritmi de segmentare și etichetare a regiunilor.
