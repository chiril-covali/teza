<!-- custom-doc -->
# 🚀 **Stivă (Stack)**

## 📝 **Descriere**
**Stiva** (Stack) este o structură de date liniară bazată pe principiul **LIFO** (Last-In, First-Out), ceea ce înseamnă că ultimul element adăugat este primul care va fi eliminat. Poate fi vizualizată ca un teanc de cărți: poți adăuga o carte nouă doar deasupra și poți lua tot de deasupra.

## 🖼️ **Reprezentare Vizuală**
![Stack Representation](https://upload.wikimedia.org/wikipedia/commons/b/b4/Lifo_stack.png)

**Diagramă ASCII (Operații):**
```text
       [3]          Top
       ---
       [2]          Mid
       ---
       [1]          Base
       ---
Push(4) -> [4] deasupra [3]
Pop()   -> Elimina [4]
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Eficiență:** Adăugarea și eliminarea se fac instantaneu în timp constant. | ⚠️ **Acces Limitat:** Nu poți accesa elementele din mijloc fără a goli tot ce e deasupra. |
| 📊 **Simplitate:** Foarte ușor de implementat folosind vectori sau liste. | 📉 **Overflow:** Dacă are o dimensiune fixă, se poate umple rapid (Stack Overflow). |

## 🔢 **Analiză Matematică și Complexitate**
Operațiile de bază sunt **Push** (adăugare), **Pop** (eliminare) și **Peek** (vizualizare vârf).

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Push/Pop/Peek)** | $O(1)$ |
| **Timp (Search)** | $O(n)$ |
| **Spațiu (Space)** | $O(n)$ |

## 💡 **Aplicații Practice**
- **Sisteme de Operare:** Gestionarea apelurilor de funcții (Call Stack).
- **Undo / Redo:** În editoarele de text (stochează istoricul acțiunilor).
- **Compilatoare:** Evaluarea expresiilor matematice și verificarea parantezelor.
