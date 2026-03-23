<!-- custom-doc -->

# 🚀 **Problema Restului**

## 📝 **Descriere**

**Coin Change** este o problemă clasică de optimizare care întreabă: "Care este numărul minim de monede necesare pentru a forma o sumă dată $S$, folosind un set de monede cu valori diferite?". Problema este rezolvată eficient prin **Programare Dinamică**, evitând recalcularea sub-problemelor prin stocarea rezultatelor parțiale.

## 🖼️ **Reprezentare Vizuală**

![Coin Change Diagram](/docs-images/programare-dinamica/coin_change.svg)
<!-- external-visual -->
![Resursă vizuală externă (programare-dinamica)](https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80)


```text
Suma (S): 5, Monede: [1, 2, 5]
dp[0] = 0
dp[1] = dp[1-1] + 1 = 1
dp[2] = min(dp[2-1], dp[2-2]) + 1 = 1 (folosind moneda de 2)
dp[3] = dp[3-2] + 1 = 2
...
dp[5] = 1 (moneda de 5)
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Optimalitate:** Garantează găsirea soluției minime absolute. | ⚠️ **Memorie:** Necesită un tablou de dimensiune $S+1$ pentru a stoca rezultatele. |
| 📊 **Eficiență:** Mult mai rapid decât o abordare recursivă simplă. | 📉 **Cost:** Dacă suma $S$ este imensă, consumul de memorie poate deveni o problemă. |

## 🔢 **Analiză Matematică și Complexitate**

Relația de recurență: $dp[i] = \min(dp[i], dp[i - monedă] + 1)$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(S \cdot n)$ (unde $n$ este nr. de monede) |
| **Spațiu (Space)** | $O(S)$ |

## 💡 **Aplicații Practice**

- **Sisteme de Plată:** automate de cafea sau bancomate care eliberează restul optim.
- **Logistica:** Împachetarea optimă a obiectelor în containere.
- **Teoria Numerelor:** Studiul partițiilor numerice.
