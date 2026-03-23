<!-- custom-doc -->

# 🚀 **Algoritmul lui Prim**

## 📝 **Descriere**

**Algoritmul lui Prim** este un algoritm greedy utilizat pentru a găsi **Arborele Parțial de Cost Minim** (Minimum Spanning Tree - MST) al unui graf neorientat și ponderat. Spre deosebire de Kruskal, care crește MST-ul prin muchii, Prim îl crește pornind de la un nod sursă, adăugând la fiecare pas cea mai ieftină muchie care conectează un nod din MST cu unul din afara lui.

## 🖼️ **Reprezentare Vizuală**

![Prim Animation](/docs-images/grafuri/prim.svg)
<!-- external-visual -->
![Resursă vizuală externă (grafuri)](https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80)


```text
(A) --2-- (B)
 | \       |
 1  3      4
 |   \     |
(C) --5-- (D)

1. Start A. Muchii: (A,C):1, (A,B):2, (A,D):3
2. Alege (A,C) (cost 1). MST: {A, C}
3. Din {A,C}, alege (A,B) (cost 2). MST: {A, C, B}
4. Din {A,C,B}, alege (A,D) (cost 3). MST: {A, C, B, D}

```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Eficient pe grafuri dense:** Mai rapid decât Kruskal când numărul de muchii este foarte mare. | ⚠️ **Cerință:** Graful trebuie să fie conex (toate nodurile să poată fi atinse). |
| 📊 **Localitate:** Lucrează mereu cu nodurile adiacente MST-ului curent. | 📉 **Memorie:** Necesită o coadă de priorități pentru gestionarea muchiilor. |

## 🔢 **Analiză Matematică și Complexitate**

Complexitatea depinde de structura de date utilizată pentru coada de priorități.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (cu Min-Heap)** | $O(E \log V)$ |
| **Timp (cu Fibonacci Heap)** | $O(E + V \log V)$ |
| **Spațiu (Space)** | $O(V)$ |

## 💡 **Aplicații Practice**

- **Rețele Electrice:** Minimizarea cantității de cablu pentru a conecta toate casele dintr-un cartier.
- **Sisteme de Irigare:** Conectarea punctelor de consum folosind conducte cât mai scurte.
- **Computer Graphics:** Generarea de rețele de legătură în modele 3D.
- **Planificare Urbană:** Optimizarea infrastructurii pentru reducerea costurilor de construcție.
