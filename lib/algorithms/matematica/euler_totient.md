<!-- custom-doc -->

# 🚀 **Funcția Totient a lui Euler**

## 📝 **Descriere**

**Funcția Totient a lui Euler**, notată cu $\phi(n)$, este o funcție aritmetică fundamentală în teoria numerelor care numără câte numere întregi pozitive mai mici sau egale cu $n$ sunt **prime între ele** cu $n$. Două numere sunt prime între ele dacă cel mai mare divizor comun al lor este 1 ($cmmdc(a, n) = 1$).

## 🖼️ **Reprezentare Vizuală**

![Euler Totient Function](/docs-images/matematica/euler_totient.svg)
<!-- external-visual -->
![Resursă vizuală externă (matematica)](https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg)


```text
Exemplu pentru n = 10:
Numerele <= 10: {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
CMMDC(x, 10) = 1 pentru: {1, 3, 7, 9}
Rezultat: phi(10) = 4
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Esențial:** Coloana vertebrală a criptografiei moderne (RSA). | ⚠️ **Calcul Costisitor:** Eficiența depinde de factorizarea în numere prime. |
| 📊 **Proprietăți:** Este o funcție multiplicativă extrem de utilă. | 📉 **Complexitate:** Fără factorizare cunoscută, calculul este lent. |

## 🔢 **Analiză Matematică și Complexitate**

Formula se bazează pe produsul lui Euler: $\phi(n) = n \prod_{p|n} (1 - \frac{1}{p})$, unde $p$ sunt factorii primi distincți ai lui $n$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(\sqrt{n})$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Criptografie:** Generarea cheilor în algoritmul RSA.
- **Teoria Grupurilor:** Determinarea ordinului elementelor în grupuri multiplicative.
- **Matematică Pură:** Teorema lui Euler ($a^{\phi(n)} \equiv 1 \pmod n$).
