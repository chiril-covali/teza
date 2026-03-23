<!-- custom-doc -->

# 🚀 **Sortarea prin Inserție (Insertion Sort)**

## 📝 **Descriere**

**Sortarea prin Inserție** este un algoritm simplu de sortare, care funcționează similar modului în care majoritatea oamenilor sortează cărțile de joc în mână. La fiecare pas, un element este extras din secțiunea nesortată și inserat la locul corect în secțiunea deja sortată a tabloului.

## 🖼️ **Reprezentare Vizuală**

![Insertion Sort Animation](https://upload.wikimedia.org/wikipedia/commons/0/05/Insertion-sort-example-300px.gif)

```text
S: [Sortat]  N: [Nesortat]
S: [5]       N: [2, 8, 1, 3]
S: [2, 5]    N: [8, 1, 3]   (2 s-a inserat in fata lui 5)
S: [2, 5, 8] N: [1, 3]      (8 ramane pe loc)
S: [1, 2, 5, 8] N: [3]      (1 s-a inserat la inceput)
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Online:** Poate sorta o listă pe măsură ce primește elemente noi. | ⚠️ **Ineficiență:** Timp de execuție pătratic ($O(n^2)$), nerecomandat pentru liste mari. |
| 📊 **Eficient pe liste aproape sortate:** Performanță aproape liniară în acest caz special. | 📉 **Operații:** Multe mutări de date (shift-uri) pentru a face loc noilor elemente. |

## 🔢 **Analiză Matematică și Complexitate**

În cel mai rău caz, numărul de comparații și inversări este maxim.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Worst Case)** | $O(n^2)$ |
| **Timp (Best Case)** | $O(n)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Sisteme Real-Time:** Pentru fluxuri de date mici care trebuie sortate continuu.
- **Hibrid Algorithms:** QuickSort sau MergeSort folosesc adesea InsertionSort pe intervale foarte mici (ex: < 10 elemente) pentru că este mai rapid pe segmente mici.
- **Seturi de date aproape sortate:** Baze de date care primesc mici actualizări incrementale.
