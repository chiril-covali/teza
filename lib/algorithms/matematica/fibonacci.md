<!-- custom-doc -->

# 🚀 **Șirul lui Fibonacci (Fibonacci Sequence)**

## 📝 **Descriere**

**Șirul lui Fibonacci** este o secvență de numere în care fiecare termen (începând cu al treilea) este suma celor doi termeni precedenți. Șirul începe de regulă cu $0$ și $1$: $0, 1, 1, 2, 3, 5, 8, 13, 21, \dots$. Acest șir apare surprinzător de des în natură, de la dispunerea frunzelor pe o ramură până la forma galaxiilor.

## 🖼️ **Reprezentare Vizuală**

![Fibonacci Spiral](https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Fibonacci_spiral_34.svg/400px-Fibonacci_spiral_34.svg.png)

```text
           F(4)
          /    \
       F(3)    F(2)
      /   \    /   \
    F(2) F(1) F(1) F(0)
    /  \
  F(1) F(0)
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Natură:** Model matematic excelent pentru creșterea biologică. | ⚠️ **Ineficiență Recursivă:** Implementarea recursivă simplă este extrem de lentă ($O(2^n)$). |
| 📊 **Proporția de Aur:** Raportul termenilor tinde către $\phi \approx 1.618$. | 📉 **Creștere Exponențială:** Termenii devin foarte mari rapid, riscând depășirea limitelor numerice. |

## 🔢 **Analiză Matematică și Complexitate**

Formula recursivă: $F_n = F_{n-1} + F_{n-2}$, cu $F_0=0, F_1=1$.
Formula lui Binet: $F_n = \frac{\phi^n - (1-\phi)^n}{\sqrt{5}}$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Iterativ/DP)** | $O(n)$ |
| **Timp (Recursiv)** | $O(2^n)$ |
| **Timp (Matrice)** | $O(\log n)$ |
| **Spațiu (Iterativ)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Sisteme de căutare:** Fibonacci Search.
- **Finanțe:** Analiza tehnică a piețelor financiare (nivelele de retragere Fibonacci).
- **Proiectare:** Compoziții bazate pe secțiunea de aur în artă și arhitectură.
