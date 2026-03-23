<!-- custom-doc -->

# 🚀 **Secvența Juggler**

## 📝 **Descriere**

**Secvența Juggler** este o secvență de numere întregi care începe cu un număr pozitiv $n$. Fiecare termen următor este definit prin ridicarea la putere a termenului curent: la $1/2$ (rădăcină pătrată) dacă numărul este par, sau la $3/2$ dacă numărul este impar, urmat de rotunjirea la cel mai apropiat întreg inferior (floor). Se presupune că toate secvențele ajung în cele din urmă la valoarea 1.

## 🖼️ **Reprezentare Vizuală**

![Juggler Sequence Graph](/docs-images/matematica/juggler_sequence.svg)
<!-- external-visual -->
![Resursă vizuală externă (matematica)](https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg)


```text
3 este impar: floor(3^1.5) = floor(5.19) = 5
5 este impar: floor(5^1.5) = floor(11.18) = 11
11 este impar: floor(11^1.5) = floor(36.48) = 36
36 este par: floor(36^0.5) = 6
6 este par: floor(6^0.5) = 2
2 este par: floor(2^0.5) = 1
Rezultat: 3, 5, 11, 36, 6, 2, 1
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Explorare:** Oferă un comportament fascinant și impredictibil al numerelor. | ⚠️ **Creștere Explozivă:** Termenii pot deveni extrem de mari înainte de a scădea la 1. |
| 📊 **Teoretic:** Interesant pentru studiul sistemelor dinamice discrete. | 📉 **Overflow:** Necesită tipuri de date care suportă numere foarte mari (BigInt). |

## 🔢 **Analiză Matematică și Complexitate**

Regula:
$$a_{n+1} = \begin{cases} \lfloor a_n^{1/2} \rfloor & \text{dacă } a_n \text{ este par} \\ \lfloor a_n^{3/2} \rfloor & \text{dacă } a_n \text{ este impar} \end{cases}$$

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | Necunoscută (conjectură: se termină mereu) |
| **Spațiu (Space)** | $O(k)$ (unde $k$ este lungimea secvenței) |

## 💡 **Aplicații Practice**

- **Educație:** Demonstrarea comportamentului iterativ complex.
- **Teoria Numerelor:** Studiul conjecturilor matematice similare cu problema Collatz.
- **Testare:** Verificarea robusteții algoritmilor la creșteri bruște de valori.
