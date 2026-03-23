<!-- custom-doc -->

# 🚀 **Problema Rucsacului (0/1 Knapsack)**

## 📝 **Descriere**

**Problema Rucsacului (Knapsack Problem)** întreabă: "Dacă ai un rucsac cu o capacitate maximă $W$ și un set de obiecte, fiecare având o greutate și o valoare, care este valoarea maximă totală pe care o poți transporta?". În varianta **0/1**, un obiect poate fi fie luat complet, fie lăsat (nu poate fi tăiat). Se rezolvă optim prin **Programare Dinamică**.

## 🖼️ **Reprezentare Vizuală**

![Knapsack Diagram](/docs-images/programare-dinamica/knapsack.svg)
<!-- external-visual -->
![Resursă vizuală externă (programare-dinamica)](https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg)


```text
Greutate (W): 4
Obiecte: (val:3, greut:2), (val:4, greut:3)
      0  1  2  3  4 (Capacitate)
Obj 0 [0, 0, 0, 0, 0]
Obj 1 [0, 0, 3, 3, 3] (Greutate 2 incape de la col 2)
Obj 2 [0, 0, 3, 4, 4] (Greutate 3 incape la col 3, 4>3)
Rezultat Max: 4
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Optimalitate:** Garantează combinarea perfectă a obiectelor pentru profit maxim. | ⚠️ **NP-Hard:** Problema este complexă computațional în forma ei generală. |
| 📊 **Flexibilitate:** Modelul poate fi adaptat pentru diverse constrângeri (volum, cost, timp). | 📉 **Memorie:** Necesită o matrice $O(n \cdot W)$, ineficientă dacă $W$ este foarte mare. |

## 🔢 **Analiză Matematică și Complexitate**

Relația de recurență:
$$dp[i][w] = \max(dp[i-1][w], val_i + dp[i-1][w - greut_i])$$

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(n \cdot W)$ |
| **Spațiu (Space)** | $O(n \cdot W)$ |

## 💡 **Aplicații Practice**

- **Logistica Transporturilor:** Încărcarea optimă a containerelor pe nave sau avioane.
- **Finanțe:** Selecția portofoliului de investiții sub o constrângere de buget.
- **Sisteme de Securitate:** Alegerea senzorilor optimi pentru a acoperi o arie cu resurse limitate.
