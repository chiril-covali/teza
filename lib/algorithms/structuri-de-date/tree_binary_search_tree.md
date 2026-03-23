<!-- custom-doc -->
# 🚀 **Arbore Binar de Căutare (Binary Search Tree - BST)**

## 📝 **Descriere**
**Arborele Binar de Căutare** (BST) este o structură de date ierarhică în care fiecare nod are cel mult doi copii, numiți copilul stâng și copilul drept. Proprietatea fundamentală a unui BST este că pentru orice nod, toate elementele din subarborele stâng sunt mai mici, iar toate elementele din subarborele drept sunt mai mari decât valoarea nodului respectiv.

## 🖼️ **Reprezentare Vizuală**
![BST Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Binary_search_tree.svg/300px-Binary_search_tree.svg.png)

**Diagramă ASCII (Exemplu):**
```text
          (50)
         /    \
      (30)    (70)
      /  \    /  \
    (20) (40)(60) (80)

In-order traversal: 20, 30, 40, 50, 60, 70, 80
(Rezultă mereu o listă sortată!)
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Căutare Rapidă:** Timp mediu de $O(\log n)$, similar cu căutarea binară. | ⚠️ **Degenerare:** Dacă elementele sunt inserate sortat, arborele devine o listă ($O(n)$). |
| 📊 **Dinamism:** Inserarea și ștergerea sunt mai rapide decât într-un vector sortat. | 📉 **Echilibrare:** Necesită algoritmi suplimentari (ex: AVL, Red-Black) pentru a rămâne eficient. |

## 🔢 **Analiză Matematică și Complexitate**
Înălțimea arborelui $h$ determină performanța. Într-un arbore echilibrat, $h \approx \log n$.

| Tip Complexitate | Valoare Medie | Cel mai rău caz |
| :--- | :--- | :--- |
| **Căutare** | $O(\log n)$ | $O(n)$ |
| **Inserare** | $O(\log n)$ | $O(n)$ |
| **Spațiu** | $O(n)$ | $O(n)$ |

## 💡 **Aplicații Practice**
- **Indecși de Baze de Date:** Facilitarea căutării rapide a înregistrărilor.
- **Sisteme de Fișiere:** Organizarea ierarhică a directoarelor.
- **Seturi și Map-uri:** Implementarea structurilor de date de tip `std::set` sau `std::map` în C++.
