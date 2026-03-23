<!-- custom-doc -->

# 🚀 **Algoritmul Bellman-Ford (Bellman-Ford Algorithm)**

## 📝 **Descriere**

**Algoritmul Bellman-Ford** este utilizat pentru a găsi cele mai scurte drumuri de la un nod sursă către toate celelalte noduri dintr-un graf ponderat. Spre deosebire de Dijkstra, acesta poate gestiona muchii cu **costuri negative** și este capabil să detecteze **ciclurile negative** în graf.

## 🖼️ **Reprezentare Vizuală**

![Bellman-Ford Animation](https://upload.wikimedia.org/wikipedia/commons/2/2e/Bellman-Ford_algorithm_example.gif)

```text
(A) --(-1)--> (B)
 | \           |
 4  3          2
 |   \         |
(C) --(5)---> (D)

Pas 1: dist[A]=0, restul inf
Pas 2: Relaxare muchii (A,B), (A,C), (A,D)
Pas 3: Repetă de V-1 ori
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Costuri Negative:** Singurul algoritm standard de drum minim care le acceptă. | ⚠️ **Lent:** Mult mai lent decât Dijkstra ($O(V \cdot E)$). |
| 📊 **Detectare Cicluri:** Identifică erorile de logică în rețele (cicluri negative). | 📉 **Eficiență:** Nu este recomandat pentru grafuri foarte mari fără costuri negative. |

## 🔢 **Analiză Matematică și Complexitate**

Algoritmul se bazează pe relaxarea tuturor celor $E$ muchii de $V-1$ ori.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(V \cdot E)$ |
| **Spațiu (Space)** | $O(V)$ |

## 💡 **Aplicații Practice**

- **Sisteme Bancare:** Identificarea oportunităților de arbitraj valutar (cicluri negative).
- **Protocoale de Rutare:** Utilizat în RIP (Routing Information Protocol).
- **Planificare Transport:** Găsirea rutelor când există reduceri sau penalizări (costuri negative).
