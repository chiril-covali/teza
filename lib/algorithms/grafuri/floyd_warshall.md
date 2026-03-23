<!-- custom-doc -->

# 🚀 **Algoritmul Floyd-Warshall (Floyd-Warshall Algorithm)**

## 📝 **Descriere**

**Floyd-Warshall** este un algoritm de programare dinamică utilizat pentru a găsi cele mai scurte drumuri între **toate perechile de noduri** dintr-un graf ponderat. Spre deosebire de Dijkstra, acesta calculează o matrice de distanțe pentru întregul graf dintr-o singură execuție.

## 🖼️ **Reprezentare Vizuală**

![Floyd-Warshall Animation](https://upload.wikimedia.org/wikipedia/commons/2/2e/Floyd-Warshall_algorithm_example.gif)

```text
      A  B  C
   A [0  3  inf]
   B [inf 0 2]
   C [4  inf 0]

După K=A,B,C: Matricea conține distanțele minime finale.
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Toate Perechile:** Găsește dintr-odată distanțele între oricare două noduri. | ⚠️ **Lent:** Complexitate cubică, ineficient pentru grafuri foarte mari. |
| 📊 **Simplitate:** Cod extrem de scurt (3 bucle "for" suprapuse). | 📉 **Memorie:** Necesită o matrice $V^2$, consumând mult spațiu. |

## 🔢 **Analiză Matematică și Complexitate**

Relația de recurență: $dist[i][j] = \min(dist[i][j], dist[i][k] + dist[k][j])$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(V^3)$ |
| **Spațiu (Space)** | $O(V^2)$ |

## 💡 **Aplicații Practice**

- **Rețele de Transport:** Calcularea tuturor rutelor între toate orașele dintr-o țară.
- **Sisteme de Navigație:** În baze de date de rute precalculate.
- **Analiza Transmisiilor:** Determinarea conectivității maxime în rețele sociale.
- **Identificarea Închiderii Tranzitive:** Calcularea accesibilității între noduri.
