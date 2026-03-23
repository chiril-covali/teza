<!-- custom-doc -->

# 🚀 **Găsire Divizorilor**

## 📝 **Descriere**

Acest algoritm găsește toți divizorii unui număr întreg pozitiv $n$. Un divizor este orice număr $d$ pentru care $n \pmod d = 0$. Eficiența algoritmului provine din observația că divizorii apar întotdeauna în perechi: dacă $d$ îl divide pe $n$, atunci și $n/d$ îl divide pe $n$. Prin urmare, este suficient să căutăm până la $\sqrt{n}$.

## 🖼️ **Reprezentare Vizuală**

![Divisors Chart](/docs-images/matematica/factors.svg)
<!-- external-visual -->
![Resursă vizuală externă (matematica)](https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg)


```text
Căutare până la sqrt(36) = 6:
1 | 36 (Pereche: 1, 36)
2 | 18 (Pereche: 2, 18)
3 | 12 (Pereche: 3, 12)
4 | 9  (Pereche: 4, 9)
6 | 6  (Pereche: 6 - singur)
Rezultat: {1, 2, 3, 4, 6, 9, 12, 18, 36}
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Optimizare:** Reducerea căutării la $\sqrt{n}$ scade drastic timpul de calcul pentru numere mari. | ⚠️ **Sortare:** Divizorii nu sunt găsiți în ordine crescătoare și necesită o sortare finală. |
| 📊 **Simplitate:** Ușor de înțeles și de implementat fără structuri complexe. | 📉 **Memorie:** Stocarea tuturor divizorilor poate ocupa spațiu considerabil. |

## 🔢 **Analiză Matematică și Complexitate**

Numărul de divizori este notat de funcția $\tau(n)$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(\sqrt{n})$ |
| **Spațiu (Space)** | $O(\tau(n))$ |

## 💡 **Aplicații Practice**

- **Teoria Numerelor:** Determinarea tipului de număr (perfect, abundent, deficient).
- **Criptografie:** Componentă în analiza numerelor compuse și a factorizării.
- **Grids & Layouts:** Calcularea modurilor în care elementele pot fi dispuse într-o matrice.
