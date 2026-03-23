<!-- custom-doc -->

# 🚀 **Triunghiul lui Pascal (Pascal's Triangle)**

## 📝 **Descriere**

**Triunghiul lui Pascal** este o dispunere geometrică a coeficienților binomiali sub formă de triunghi. Fiecare număr din interiorul triunghiului este suma celor două numere aflate direct deasupra lui. Această structură matematică dezvăluie proprietăți fascinante în algebră, probabilități și combinatorică.

## 🖼️ **Reprezentare Vizuală**

![Pascal Triangle](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pascal%27s_triangle_5.svg/300px-Pascal%27s_triangle_5.svg.png)

```text
        1          (n=0)
       1 1         (n=1)
      1 2 1        (n=2)
     1 3 3 1       (n=3)
    1 4 6 4 1      (n=4)
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Vizualizare:** Oferă o metodă intuitivă de a vedea coeficienții expansiunii $(a+b)^n$. | ⚠️ **Memorie:** Stocarea întregului triunghi necesită spațiu $O(n^2)$. |
| 📊 **Eficiență:** Permite calcularea coeficienților binomiali fără a folosi factoriale (evitând overflow-ul timpuriu). | 📉 **Redundanță:** Multe valori sunt repetate datorită simetriei. |

## 🔢 **Analiză Matematică și Complexitate**

Elementul de pe rândul $n$ și coloana $k$ este egal cu $\binom{n}{k}$.
Relația de bază: $C(n, k) = C(n-1, k-1) + C(n-1, k)$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Generare)** | $O(n^2)$ |
| **Spațiu (Space)** | $O(n^2)$ |

## 💡 **Aplicații Practice**

- **Algebră:** Calcularea rapidă a puterilor binomului.
- **Probabilități:** Determinarea combinațiilor posibile în experimente de tip monedă (Heads/Tails).
- **Teoria Numerelor:** Identificarea șirurilor celebre (ex: numerele Fibonacci pot fi găsite pe diagonalele triunghiului).
