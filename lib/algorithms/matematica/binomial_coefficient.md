<!-- custom-doc -->
# 🚀 **Coeficient Binomial (n luate câte k)**

## 📝 **Descriere**
**Coeficientul Binomial**, notat $\binom{n}{k}$, reprezintă numărul de moduri în care putem alege un subset de $k$ elemente dintr-un set de $n$ elemente distincte, fără a conta ordinea. Este un concept central în combinatorică și apare în expansiunea binomială a lui $(x+y)^n$.

## 🖼️ **Reprezentare Vizuală**
![Pascal Triangle](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pascal%27s_triangle_5.svg/300px-Pascal%27s_triangle_5.svg.png)

**Diagramă ASCII (Triunghiul lui Pascal):**
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
| 🚀 **Esențial:** Baza multor calcule în statistică și probabilități. | ⚠️ **Overflow:** Valorile cresc extrem de rapid, depășind limitele BigInt. |
| 📊 **Proprietate de Simetrie:** $\binom{n}{k} = \binom{n}{n-k}$, simplificând calculul. | 📉 **Cost Calcul:** Formula cu factoriale este ineficientă pentru $n$ mare. |

## 🔢 **Analiză Matematică și Complexitate**
Formula de bază: $\binom{n}{k} = \frac{n!}{k!(n-k)!}$.
Proprietatea de recurență: $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Programare Dinamică)** | $O(n \cdot k)$ |
| **Timp (Optim)** | $O(k)$ |
| **Spațiu (Space)** | $O(k)$ |

## 💡 **Aplicații Practice**
- **Statistică:** Calcularea probabilităților în distribuția binomială.
- **Genetică:** Estimarea combinațiilor posibile de gene.
- **Calcul numeric:** Expansiunea funcțiilor în serii de puteri.
