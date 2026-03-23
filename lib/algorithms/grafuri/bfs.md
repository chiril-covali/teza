<!-- custom-doc -->

# 🚀 **Parcurgere în Lățime (Breadth-First Search)**

## 📝 **Descriere**

**BFS** este un algoritm de parcurgere a unui graf sau arbore care explorează mai întâi toți vecinii direcți ai nodului sursă, apoi toți vecinii acestora (nivel cu nivel). Algoritmul utilizează o **coadă** (FIFO) pentru a ține evidența nodurilor care urmează să fie vizitate.

## 🖼️ **Reprezentare Vizuală**

![BFS Animation](https://upload.wikimedia.org/wikipedia/commons/4/46/Animated_BFS.gif)

```text
      (1)         Nivel 0
     /   \
   (2)---(3)      Nivel 1
    |     |
   (4)---(5)      Nivel 2

Ordinea: 1 -> 2, 3 -> 4, 5
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Drum Minim:** Garantează cel mai scurt drum în grafuri cu muchii de cost egal. | ⚠️ **Memorie:** Consumă multă memorie în grafuri dense (trebuie să stocheze toate nodurile unui nivel). |
| 📊 **Optimalitate:** Ideal pentru a găsi distanța minimă între două noduri. | 📉 **Cost:** Mai lent decât DFS dacă soluția este adânc în arbore. |

## 🔢 **Analiză Matematică și Complexitate**

Dacă $V$ este numărul de noduri și $E$ numărul de muchii.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(V + E)$ |
| **Spațiu (Space)** | $O(V)$ |

## 💡 **Aplicații Practice**

- **Networking:** Găsirea celei mai scurte rute între două puncte într-o rețea de calculatoare.
- **Rețele Sociale:** Calcularea distanței dintre două persoane (ex: gradul de separare pe LinkedIn).
- **Web Crawlers:** Scanarea internetului pentru a indexa pagini pornind de la un set de link-uri.
