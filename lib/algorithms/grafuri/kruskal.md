<!-- custom-doc -->
# 🚀 **Algoritmul lui Kruskal**

## 📝 **Descriere**
**Algoritmul lui Kruskal** este un algoritm greedy utilizat pentru a găsi **Arborele Parțial de Cost Minim** (Minimum Spanning Tree - MST) al unui graf neorientat și ponderat. Scopul este să conecteze toate nodurile grafului folosind un set de muchii cu costul total minim, fără a forma cicluri.

## 🖼️ **Reprezentare Vizuală**
![Kruskal Animation](https://upload.wikimedia.org/wikipedia/commons/b/bb/KruskalDemo.gif)

**Diagramă ASCII (Pași):**
```text
(A) --4-- (B)
 | \       |
 1  3      2
 |   \     |
(C) --5-- (D)

1. Sortează muchiile: (A,C):1, (B,D):2, (A,D):3, (A,B):4, (C,D):5
2. Alege (A,C) - OK
3. Alege (B,D) - OK
4. Alege (A,D) - OK (MST Gata!)
Cost Total: 1+2+3 = 6
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Eficiență pe grafuri rare:** Foarte rapid când numărul de muchii este mic în raport cu nodurile. | ⚠️ **Sortare:** Necesită sortarea tuturor muchiilor la început, ceea ce poate fi costisitor. |
| 📊 **Simplitate:** Logica este intuitivă (alege mereu cea mai ieftină muchie). | 📉 **Gestiune:** Necesită structuri de date suplimentare (ca Union-Find) pentru detecția ciclurilor. |

## 🔢 **Analiză Matematică și Complexitate**
Dacă $V$ este numărul de noduri și $E$ numărul de muchii.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(E \log E)$ sau $O(E \log V)$ |
| **Spațiu (Space)** | $O(V + E)$ |

## 💡 **Aplicații Practice**
- **Rețele de Telecomunicații:** Proiectarea rețelelor de fibră optică pentru a conecta orașe cu cost minim.
- **Circuit Design:** Conectarea componentelor pe un circuit imprimat folosind cea mai mică cantitate de material.
- **Cluster Analysis:** În învățarea automată pentru gruparea datelor similare.
