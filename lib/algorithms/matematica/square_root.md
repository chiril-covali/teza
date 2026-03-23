<!-- custom-doc -->

# 🚀 **Rădăcină Pătrată**

## 📝 **Descriere**

Calcularea **Rădăcinii Pătrate** este o operație fundamentală care determină numărul $x$ care, înmulțit cu el însuși, produce numărul dat $S$ ($x^2 = S$). În informatică, cea mai utilizată metodă pentru aproximare este **Metoda lui Newton-Raphson**, un algoritm iterativ extrem de rapid care converge quadratic către soluția exactă.

## 🖼️ **Reprezentare Vizuală**

![Newton Method](/docs-images/matematica/square_root.svg)
<!-- external-visual -->
![Resursă vizuală externă (matematica)](https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg)


```text
Exemplu: √25 (Newton)
1. Estimare inițială: x = 10
2. Iterare 1: x = (10 + 25/10) / 2 = 6.25
3. Iterare 2: x = (6.25 + 25/6.25) / 2 = 5.125
4. Iterare 3: x = (5.125 + 25/5.125) / 2 = 5.0015
5. Rezultat: 5.0
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| ✅ **Convergență Rapidă:** Numărul de cifre corecte se dublează aproximativ la fiecare iterație. | ⚠️ **Operații Costisitoare:** Implică împărțiri, care sunt mai lente decât adunările sau înmulțirile pe CPU. |
| ✅ **Precizie Controlabilă:** Permite setarea unei toleranțe (epsilon) pentru a echilibra viteza și acuratețea. | ❌ **Numere Negative:** Nu este definită pentru numere negative în domeniul numerelor reale. |

## 🔢 **Analiză Matematică și Complexitate**

Formula iterativă: $x_{n+1} = \frac{1}{2} \left( x_n + \frac{S}{x_n} \right)$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(\log(\text{precizie}))$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Grafică 3D:** Calcularea distanțelor euclidiene și normalizarea vectorilor.
- **Calculatoare Științifice:** Implementarea funcțiilor standard din bibliotecile `math.h` sau `numpy`.
- **Inginerie:** Rezolvarea ecuațiilor cinematice și a problemelor de rezistență a materialelor.
- **Finanțe:** Calcularea deviației standard în analiza riscurilor.
