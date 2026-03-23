<!-- custom-doc -->
# 🚀 **Algoritmul lui Tarjan**

## 📝 **Descriere**
**Algoritmul lui Tarjan** este utilizat pentru a găsi **Componentele Tare Conexe** (Strongly Connected Components - SCC) dintr-un graf orientat. O componentă este tare conexă dacă există un drum între oricare două noduri din acea componentă. Algoritmul parcurge graful o singură dată (DFS) și folosește o stivă pentru a identifica ciclurile și structura de conectivitate.

## 🖼️ **Reprezentare Vizuală**
![Tarjan Animation](https://upload.wikimedia.org/wikipedia/commons/6/60/Tarjan%27s_Algorithm_Animation.gif)

**Diagramă ASCII (SCC):**
```text
 (A) ---> (B)      SCC 1: {A, B, C}
  ^       /        SCC 2: {D}
   \     v         
    (C) ---> (D)

Nodurile A, B, C formează un ciclu închis.
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Performanță liniară:** Găsește toate componentele dintr-o singură parcurgere. | ⚠️ **Complexitate logică:** Mai greu de înțeles și implementat decât algoritmul lui Kosaraju. |
| 📊 **O singură trecere:** Nu necesită inversarea grafului (spre deosebire de Kosaraju). | 📉 **Recursivitate:** Poate cauza probleme de memorie pe grafuri cu adâncime foarte mare. |

## 🔢 **Analiză Matematică și Complexitate**
Algoritmul atribuie fiecărui nod un index de ordine și un "low-link" value.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(V + E)$ |
| **Spațiu (Space)** | $O(V)$ |

## 💡 **Aplicații Practice**
- **Analiza Web:** Identificarea grupurilor de pagini care se leagă între ele circular.
- **Optimizarea Compilatoarelor:** Detectarea dependențelor circulare între module.
- **Rețele Sociale:** Găsirea comunităților strâns unite de utilizatori.
