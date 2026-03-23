<!-- custom-doc -->

# 🚀 **Suma Cifrelor**

## 📝 **Descriere**

**Suma cifrelor** unui număr întreg este calculată prin adunarea valorilor individuale ale tuturor cifrelor sale. De exemplu, pentru numărul $1234$, suma cifrelor este $1 + 2 + 3 + 4 = 10$. Acest proces este repetat uneori până când se obține o singură cifră (rezultând **rădăcina digitală**).

## 🖼️ **Reprezentare Vizuală**

![Digit Sum Concept](/docs-images/matematica/digit_sum.svg)
<!-- external-visual -->
![Resursă vizuală externă (matematica)](https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg)


```text
Număr: 456
Pas 1: 456 % 10 = 6. Sumă = 6. Număr = 45.
Pas 2: 45 % 10 = 5. Sumă = 11. Număr = 4.
Pas 3: 4 % 10 = 4. Sumă = 15. Număr = 0.
Rezultat final: 15
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Simplitate:** Algoritm de bază, ușor de implementat recursiv sau iterativ. | ⚠️ **Tipuri de date:** Trebuie tratate cu atenție numerele negative sau cele de tip BigInt. |
| 📊 **Utilitate:** Esențial pentru verificări rapide de divizibilitate (ex: cu 3 sau 9). | 📉 **Overflow:** Suma în sine nu depășește limitele, dar numărul inițial poate fi foarte lung. |

## 🔢 **Analiză Matematică și Complexitate**

Numărul de iterații este egal cu numărul de cifre al numărului, adică $\lfloor \log_{10}(n) + 1 \rfloor$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(\log_{10} n)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Criptografie:** Componentă în calculul sumelor de control (checksums).
- **Divizibilitate:** Un număr este divizibil cu 9 dacă și numai dacă suma cifrelor sale este divizibilă cu 9.
- **Teoria Numerelor:** Calcularea proprietăților numerelor Harshad sau a numerelor fericite.
