<!-- custom-doc -->

# 🚀 **Generare Paranteze**

## 📝 **Descriere**

Această problemă clasică de **Backtracking** solicită generarea tuturor combinațiilor de $n$ perechi de paranteze corect formate. O secvență este corect formată dacă fiecare paranteză deschisă are o paranteză închisă corespunzătoare și, în orice punct al parcurgerii de la stânga la dreapta, numărul parantezelor închise nu depășește numărul celor deschise.

## 🖼️ **Reprezentare Vizuală**

![Parentheses Tree](/docs-images/backtracking/generateparentheses.svg)
<!-- external-visual -->
![Resursă vizuală externă (backtracking)](https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80)


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
