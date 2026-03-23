<!-- custom-doc -->

# 🚀 **Sortarea prin Arbori (Tree Sort)**

## 📝 **Descriere**

**Tree Sort** este un algoritm de sortare bazat pe structura de date de arbore binar de căutare (Binary Search Tree - BST). Algoritmul funcționează prin inserarea succesivă a elementelor într-un BST, urmată de o parcurgere în in-ordine (stânga, rădăcină, dreapta) pentru a extrage elementele în ordine sortată.

## 🖼️ **Reprezentare Vizuală**

![Tree Sort Animation](https://upload.wikimedia.org/wikipedia/commons/0/0c/Binary_search_tree_insertion_animation.gif)

```text
Intrare: [5, 3, 8, 1, 4]
Pas 1: Inserare 5 (Rădăcină) -> (5)
Pas 2: Inserare 3 (3 < 5) -> (5) / (3)
Pas 3: Inserare 8 (8 > 5) -> (5) / (3) \ (8)
...
Parcurgere In-order: 1 -> 3 -> 4 -> 5 -> 8
--> Rezultat sortat!
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Dynamic:** Permite inserarea și sortarea elementelor în timp real. | ⚠️ **Dezechilibrare:** Poate deveni $O(n^2)$ dacă arborele nu este echilibrat. |
| 📊 **Stabilitate:** Dacă este implementat corect, păstrează ordinea relativă. | 📉 **Memorie:** Necesită mult spațiu suplimentar pentru nodurile arborelui ($O(n)$). |

## 🔢 **Analiză Matematică și Complexitate**

Eficiența depinde direct de înălțimea arborelui $h$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Worst Case)** | $O(n^2)$ (Arbore degenerat în listă) |
| **Timp (Average Case)** | $O(n \log n)$ |
| **Spațiu (Space)** | $O(n)$ |

## 💡 **Aplicații Practice**

- **Baze de date:** Unde datele trebuie menținute sortate pentru căutări rapide ulterioare.
- **Sisteme de fișiere:** Organizarea ierarhică a fișierelor și directoarelor.
- **Algoritmi de căutare:** Ca preprocesare pentru a facilita căutarea binară pe date dinamice.
