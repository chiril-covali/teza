<!-- custom-doc -->

# 🚀 **Bogo Sort (Bogo Sort)**

## 📝 **Descriere**

**Bogo Sort** (cunoscut și sub numele de permutation sort, stupid sort sau slowsort) este un algoritm de sortare extrem de ineficient, bazat pe paradigma "trial and error". Algoritmul verifică dacă lista este sortată; dacă nu, amestecă elementele aleatoriu și repetă procesul până când, prin pur noroc, lista devine sortată.

## 🖼️ **Reprezentare Vizuală**

![Bogo Sort Animation](https://upload.wikimedia.org/wikipedia/commons/2/2b/Bogo_sort_animation.gif)

```text
[3, 1, 2] -> Verifică: Nu e sortat.
[1, 3, 2] -> Amestecă: Nu e sortat.
[3, 2, 1] -> Amestecă: Nu e sortat.
[1, 2, 3] -> Amestecă: SORTAT! 🎉
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Simplitate:** Cel mai simplu concept de sortare imaginabil. | ⚠️ **Ineficiență extremă:** Timp de execuție mediu de $O(n \cdot n!)$. |
| 📊 **Educațional:** Folosit pentru a demonstra ce înseamnă un algoritm prost. | 📉 **Impredictibilitate:** Nu există nicio garanție că se va termina vreodată. |

## 🔢 **Analiză Matematică și Complexitate**

Probabilitatea ca o permutare aleatorie să fie cea corectă este $1/n!$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Worst Case)** | $O(\infty)$ (Teoretic infinit) |
| **Timp (Average Case)** | $O(n \cdot n!)$ |
| **Timp (Best Case)** | $O(n)$ (Dacă lista e deja sortată) |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Educație:** Exemplul clasic de "așa NU" în designul algoritmilor.
- **Testing:** Generarea de permutări aleatorii pentru testarea stabilității altor sisteme.
