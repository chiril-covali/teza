<!-- custom-doc -->

# 🚀 **Sortarea prin Metoda Bulelor (Bubble Sort)**

## 📝 **Descriere**

**Bubble Sort** este un algoritm de sortare simplu care funcționează prin parcurgerea repetată a listei, comparând elementele adiacente și inversându-le dacă sunt în ordinea greșită. Numele provine din faptul că elementele mai mari "plutesc" treptat spre sfârșitul listei, asemenea bulelor de aer într-un lichid.

## 🖼️ **Reprezentare Vizuală**

![Bubble Sort Animation](https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif)

```text
[5, 1, 4, 2, 8]  (5 > 1, Interschimbă)
[1, 5, 4, 2, 8]  (5 > 4, Interschimbă)
[1, 4, 5, 2, 8]  (5 > 2, Interschimbă)
[1, 4, 2, 5, 8]  (5 < 8, Nu interschimbă)
--> [1, 4, 2, 5, 8] (5 s-a mutat la locul său!)
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Stabilitate:** Nu schimbă ordinea relativă a elementelor cu valori egale. | ⚠️ **Ineficiență:** Este unul dintre cei mai lenți algoritmi de sortare pentru seturi mari. |
| 📊 **Simplitate:** Ușor de implementat și bun pentru scopuri educaționale. | 📉 **Complexitate:** Timpul de execuție crește pătratic cu numărul de elemente. |

## 🔢 **Analiză Matematică și Complexitate**

În cel mai rău caz, algoritmul efectuează aproximativ $\frac{n(n-1)}{2}$ comparații.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Worst Case)** | $O(n^2)$ |
| **Timp (Best Case)** | $O(n)$ (dacă lista este deja sortată) |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Sisteme cu memorie limitată:** Când spațiul suplimentar este critic și setul de date este mic.
- **Scopuri educaționale:** Ideal pentru a învăța conceptul de algoritm de sortare.
