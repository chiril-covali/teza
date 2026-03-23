<!-- custom-doc -->

# 🚀 **Verificare Număr Square-Free**

## 📝 **Descriere**
Un număr întreg $n$ se numește **Square-Free** (fără pătrate) dacă nu este divizibil cu niciun pătrat perfect mai mare decât 1 (adică $k^2 \nmid n$ pentru orice $k > 1$). Altfel spus, în descompunerea sa în **factori primi**, fiecare exponent este egal cu 1.

## 🖼️ **Reprezentare Vizuală**
![Square-Free Numbers](/docs-images/matematica/is_square_free.svg)
<!-- external-visual -->
![Resursă vizuală externă (matematica)](https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg)


```text
30 = 2 × 3 × 5  (Toți exponenții sunt 1)  ==> Square-Free
12 = 2² × 3     (Exponentul lui 2 este 2) ==> NU este Square-Free
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Structură Simplă:** Oferă o bază clară pentru funcția Möbius. | ⚠️ **Complexitate:** Verificarea necesită factorizare, care este grea pentru numere mari. |
| 📊 **Teoretic:** Esențial în distribuția numerelor prime și teoria funcțiilor. | 📉 **Eficiență:** Algoritmii naivi pot fi lenți fără pre-calcularea numerelor prime. |

## 🔢 **Analiză Matematică și Complexitate**
Dacă $n = p_1^{e_1} p_2^{e_2} \dots p_k^{e_k}$, atunci $n$ este square-free $\iff e_i = 1$ pentru toți $i$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Trial Division)** | $O(\sqrt{n})$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**
- **Funcția Möbius:** Utilizată în inversarea Möbius și în teoria numerelor avansată.
- **Teoria Probabilităților:** Probabilitatea ca un număr ales la întâmplare să fie square-free este $6/\pi^2 \approx 0.6079$.
- **Criptografie:** Studiul proprietăților numerelor mari pentru securitate.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*
