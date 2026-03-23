<!-- custom-doc -->
# 🚀 **Generare Paranteze (Generate Parentheses)**

## 📝 **Descriere**
Această problemă clasică de **Backtracking** solicită generarea tuturor combinațiilor de $n$ perechi de paranteze corect formate. O secvență este corect formată dacă fiecare paranteză deschisă are o paranteză închisă corespunzătoare și, în orice punct al parcurgerii de la stânga la dreapta, numărul parantezelor închise nu depășește numărul celor deschise.

## 🖼️ **Reprezentare Vizuală**
![Parentheses Tree](https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Catalan_number_binary_tree_3.svg/200px-Catalan_number_binary_tree_3.svg.png)

**Diagramă ASCII (Arbore de decizie pentru n=2):**
```text
          (
         / \
      ((     ()
       \     /
      (()   ()(
        \     \
       (())  ()()
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Exhaustivitate:** Găsește absolut toate soluțiile valide. | ⚠️ **Explozie Combinatorială:** Numărul de soluții crește foarte rapid conform numerelor lui Catalan. |
| 📊 **Eficiență Backtracking:** Elimină ramurile invalide imediat (pruning). | 📉 **Recursivitate:** Poate consuma multă memorie din stivă pentru $n$ mare. |

## 🔢 **Analiză Matematică și Complexitate**
Numărul de combinații valide pentru $n$ perechi este dat de al $n$-lea **Număr al lui Catalan**: $C_n = \frac{1}{n+1}\binom{2n}{n}$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(\frac{4^n}{n\sqrt{n}})$ |
| **Spațiu (Space)** | $O(n)$ (adâncimea stivei) |

## 💡 **Aplicații Practice**
- **Compilatoare:** Validarea structurii blocurilor de cod în limbaje de programare.
- **Procesarea XML/HTML:** Asigurarea închiderii corecte a tag-urilor.
- **Lingvistică Computațională:** Analiza structurilor sintactice.
