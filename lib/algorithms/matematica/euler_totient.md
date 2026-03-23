<!-- custom-doc -->
# Funcția Totient a lui Euler ($\phi$)

**Funcția Totient a lui Euler**, notată cu $\phi(n)$ (sau uneori *funcția indicator*), este o funcție aritmetică extrem de importantă în teoria numerelor. Aceasta numără câte numere întregi pozitive mai mici sau egale cu $n$ sunt **prime între ele** cu $n$ (adică cel mai mare divizor comun al lor este 1).

---

## 🖼️ Reprezentare Vizuală

Deoarece nu putem afișa grafice dinamice aici, iată o reprezentare a valorilor $\phi(n)$ pentru primele numere:

![Graficul funcției Euler Totient](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Euler_Totient_Function.svg/500px-Euler_Totient_Function.svg.png)
*Sursa: Wikipedia - Valorile funcției $\phi(n)$ pentru $n \leq 100$*

### Exemplu pentru $n = 10$:
Numerele mai mici sau egale cu 10 sunt: $\{1, 2, 3, 4, 5, 6, 7, 8, 9, 10\}$.
Căutăm numerele care nu au divizori comuni cu 10 (în afară de 1):
- **1**: $cmmdc(1, 10) = 1$ ✅
- 2: $cmmdc(2, 10) = 2$ ❌
- **3**: $cmmdc(3, 10) = 1$ ✅
- 4: $cmmdc(4, 10) = 2$ ❌
- 5: $cmmdc(5, 10) = 5$ ❌
- 6: $cmmdc(6, 10) = 2$ ❌
- **7**: $cmmdc(7, 10) = 1$ ✅
- 8: $cmmdc(8, 10) = 2$ ❌
- **9**: $cmmdc(9, 10) = 1$ ✅
- 10: $cmmdc(10, 10) = 10$ ❌

Rezultă numerele $\{1, 3, 7, 9\}$. Deci, **$\phi(10) = 4$**.

---

## 🔢 Formula Matematică

Calculul $\phi(n)$ se bazează pe descompunerea în factori primi a lui $n$. Dacă $n = p_1^{a_1} \cdot p_2^{a_2} \cdot \dots \cdot p_k^{a_k}$, atunci:

$$ \phi(n) = n \left( 1 - \frac{1}{p_1} \right) \left( 1 - \frac{1}{p_2} \right) \dots \left( 1 - \frac{1}{p_k} \right) $$

### Proprietăți cheie:
1. Dacă $p$ este un număr **prim**, atunci $\phi(p) = p - 1$.
2. Dacă $p$ este prim, atunci $\phi(p^k) = p^k - p^{k-1}$.
3. Funcția este **multiplicativă**: $\phi(m \cdot n) = \phi(m) \cdot \phi(n)$ dacă $cmmdc(m, n) = 1$.

---

## 📊 Tabel de valori

| $n$ | Prime între ele cu $n$ | $\phi(n)$ |
| :--- | :--- | :--- |
| 1 | {1} | 1 |
| 2 | {1} | 1 |
| 3 | {1, 2} | 2 |
| 4 | {1, 3} | 2 |
| 5 | {1, 2, 3, 4} | 4 |
| 6 | {1, 5} | 2 |
| 10 | {1, 3, 7, 9} | 4 |

---

## 🚀 Aplicații practice

Cea mai cunoscută utilizare a funcției Euler Totient este în **criptografia modernă**, mai exact în algoritmul **RSA**. Securitatea acestui algoritm se bazează pe dificultatea de a calcula $\phi(n)$ fără a cunoaște factorii primi ai lui $n$ (care este un număr foarte mare, produsul a două numere prime).

---

## ⏱️ Complexitate
Algoritmul de calcul implementat are o complexitate de **$O(\sqrt{n})$**, deoarece parcurge numerele până la rădăcina pătrată a lui $n$ pentru a găsi toți factorii primi.

---
*Acest document este generat pentru proiectul Teza și oferă informații fundamentale despre matematica discretă.*
