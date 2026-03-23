<!-- custom-doc -->

# 🚀 **Parcurgere în Adâncime (Depth-First Search)**

## 📝 **Descriere**

**DFS** este un algoritm de parcurgere a unui graf sau arbore care explorează cât mai mult posibil pe o singură ramură înainte de a se întoarce (backtrack). Acesta utilizează o **stivă** (LIFO) sau recursivitatea pentru a ține evidența nodurilor vizitate.

## 🖼️ **Reprezentare Vizuală**

![DFS Animation](https://upload.wikimedia.org/wikipedia/commons/7/7f/Depth-First-Search.gif)

```text
      (1)
     /   \
   (2)    (5)
   / \
 (3) (4)

Ordinea: 1 -> 2 -> 3 -> 4 -> 5
(Merge până la frunză înainte de ramura 5)
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Memorie Eficientă:** Necesită mult mai puțin spațiu decât BFS în grafuri adânci. | ⚠️ **Fără Drum Minim:** Nu garantează găsirea celui mai scurt drum. |
| 📊 **Topological Sort:** Ideal pentru a detecta cicluri și a face sortare topologică. | 📉 **Bucle Infinite:** În grafuri cu cicluri, necesită monitorizarea nodurilor vizitate. |

## 🔢 **Analiză Matematică și Complexitate**

Dacă $V$ este numărul de noduri și $E$ numărul de muchii.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(V + E)$ |
| **Spațiu (Space)** | $O(V)$ (datorită stivei recursive) |

## 💡 **Aplicații Practice**

- **Sisteme de Recomandare:** Analiza conexiunilor profunde între utilizatori.
- **Soluționarea Puzzle-urilor:** Rezolvarea labirinturilor (merge pe o cale până la capăt).
- **Detecția Ciclurilor:** Verificarea dacă o rețea de dependențe are erori circulare.
