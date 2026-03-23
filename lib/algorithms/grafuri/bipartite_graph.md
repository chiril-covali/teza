<!-- custom-doc -->

# 🚀 **Graf Bipartit (Bipartite Graph)**

## 📝 **Descriere**

Un **Graf Bipartit** este un graf ale cărui noduri pot fi împărțite în două mulțimi disjuncte $U$ și $V$, astfel încât fiecare muchie să conecteze un nod din $U$ cu unul din $V$. Cu alte cuvinte, nu există muchii între noduri din aceeași mulțime. Algoritmul verifică această proprietate încercând să coloreze graful cu două culori astfel încât niciun nod adiacent să nu aibă aceeași culoare.

## 🖼️ **Reprezentare Vizuală**

![Bipartite Graph](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Simple-bipartite-graph.svg/300px-Simple-bipartite-graph.svg.png)

```text
      (A:Albastru)
      /        \
 (B:Rosu)    (C:Rosu)
      \        /
      (D:Albastru)
✅ Valid (Bipartit)
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Detecție Rapidă:** Poate fi verificat folosind o simplă parcurgere BFS sau DFS. | ⚠️ **Sensibilitate:** Orice ciclu de lungime impară face graful non-bipartit. |
| 📊 **Modelare:** Ideal pentru a reprezenta relații între două tipuri de entități (ex: Studenți și Cursuri). | 📉 **Restricție:** Se aplică doar grafurilor neorientate în forma sa standard. |

## 🔢 **Analiză Matematică și Complexitate**

Un graf este bipartit dacă și numai dacă nu conține niciun **ciclu de lungime impară**.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(V + E)$ |
| **Spațiu (Space)** | $O(V)$ |

## 💡 **Aplicații Practice**

- **Probleme de Cuplaj (Matching):** Alocarea joburilor către angajați sau a organelor către pacienți.
- **Sisteme de Recomandare:** Legătura dintre Utilizatori și Produse (User-Item Matrix).
- **Teoria Jocurilor:** Analiza jocurilor cu doi jucători și strategii opuse.
