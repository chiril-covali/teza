<!-- custom-doc -->

# 🚀 **Mulțimi Disjuncte (Union-Find)**

## 📝 **Descriere**

Structura de date **Mulțimi Disjuncte** (Disjoint Set Union - DSU), cunoscută și sub numele de **Union-Find**, gestionează o colecție de elemente divizate în mai multe submulțimi care nu se suprapun. Oferă două operații principale extrem de eficiente: **Find** (determină căreia mulțime îi aparține un element) și **Union** (unește două mulțimi într-una singură). Este o structură esențială pentru algoritmi care lucrează cu componente conexe și partiționări.

## 🖼️ **Reprezentare Vizuală**

![Union Find Diagram](/docs-images/structuri-de-date/disjoint_set_disjoint_set.svg)
<!-- external-visual -->
![Resursă vizuală externă (structuri-de-date)](https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg)


```text
(Set 1)      (Set 2)          Operația Union(3, 5):
   1            4             Conectează rădăcina lui 5
  / \          /              la rădăcina lui 1 (sau 3).
 2   3        5               
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Performanță Aproape Constantă:** Cu optimizările Path Compression și Union by Rank. | ⚠️ **Specializare:** Utilă doar pentru probleme de tip "partiționare" sau "conectivitate". |
| 📊 **Simplitate Memorie:** Poate fi implementată eficient folosind un singur vector de "părinți". | 📉 **Dificultate la Ștergere:** Eliminarea unui element dintr-o mulțime nu este suportată nativ. |

## 🔢 **Analiză Matematică și Complexitate**

Complexitatea per operație implică funcția inversă a lui Ackermann, $\alpha(n)$, care crește extrem de lent (practic $\alpha(n) \leq 5$ pentru orice valoare rezonabilă a lui $n$).

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Find/Union)** | $O(\alpha(n))$ |
| **Spațiu (Space)** | $O(n)$ |

## 💡 **Aplicații Practice**

- **Algoritmul lui Kruskal:** Verificarea dacă adăugarea unei muchii într-un graf formează un ciclu.
- **Networking:** Determinarea componentelor conexe într-o rețea de calculatoare.
- **Prelucrarea Imaginilor:** Algoritmi de segmentare și etichetare a regiunilor (Connected Component Labeling).
- **Labyrinth/Maze:** Generarea și rezolvarea labirinturilor.
