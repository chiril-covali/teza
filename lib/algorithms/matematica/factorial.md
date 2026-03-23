<!-- custom-doc -->
# 🚀 **Factorial (n!)**

## 📝 **Descriere**
**Factorialul** unui număr întreg nenegativ $n$, notat cu $n!$, este produsul tuturor numerelor întregi pozitive mai mici sau egale cu $n$. Acesta este un concept fundamental în combinatorică și analiză matematică, utilizat pentru a calcula numărul de permutări ale unui set de elemente.

## 🖼️ **Reprezentare Vizuală**
![Factorial Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Factorial_recursion_diagram.svg/300px-Factorial_recursion_diagram.svg.png)

**Diagramă ASCII (Recursivitate):**
```text
5! = 5 * 4!
         4 * 3!
             3 * 2!
                 2 * 1!
                     1
Rezultat: 5 * 4 * 3 * 2 * 1 = 120
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Esențial:** Fundamental pentru calculul probabilităților și permutărilor. | ⚠️ **Creștere Rapidă:** Valoarea factorialului crește exploziv (ex: 20! depășește limita de 64 biți). |
| 📊 **Implementare:** Foarte ușor de scris atât recursiv, cât și iterativ. | 📉 **Overflow:** Necesită tipuri de date speciale (BigInt) pentru numere mari. |

## 🔢 **Analiză Matematică și Complexitate**
Definiția recursivă: $n! = n \times (n-1)!$, unde $0! = 1$.
Aproximarea lui Stirling: $n! \approx \sqrt{2\pi n} \left(\frac{n}{e}\right)^n$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(n)$ |
| **Spațiu (Iterativ)** | $O(1)$ |
| **Spațiu (Recursiv)** | $O(n)$ (datorită stivei) |

## 💡 **Aplicații Practice**
- **Statistică:** Calcularea numărului de moduri în care putem aranja elementele.
- **Serii Taylor:** Utilizat în calculul funcțiilor trigonometrice (sin, cos).
- **Algoritmi de căutare:** Evaluarea numărului de stări posibile în jocuri (ex: șah).
