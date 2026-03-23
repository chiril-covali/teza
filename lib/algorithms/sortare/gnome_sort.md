<!-- custom-doc -->

# 🚀 **Sortarea Gnomului (Gnome Sort)**

## 📝 **Descriere**

**Gnome Sort** (numit și Stupid Sort) este un algoritm de sortare similar cu Insertion Sort, dar implementat folosind o singură buclă. Algoritmul a fost propus de Hamid Sarbazi-Azad în 2000. Numele provine de la modul în care un gnom de grădină ar sorta o linie de ghivece: compară ghiveciul curent cu cel anterior, dacă sunt în ordine corectă merge înainte, altfel le schimbă și merge un pas înapoi.

## 🖼️ **Reprezentare Vizuală**

![Gnome Sort Animation](https://upload.wikimedia.org/wikipedia/commons/3/37/Sorting_gnomesort_anim.gif)

```text
[5, 3, 2, 4] (Gnomul e la index 1)
3 < 5? DA -> Interschimbă: [3, 5, 2, 4]. Mergi înapoi (index 0).
[3, 5, 2, 4] (La index 0 nu poți merge înapoi. Mergi înainte la 1).
5 > 2? DA -> Interschimbă: [3, 2, 5, 4]. Mergi înapoi (index 0).
3 > 2? DA -> Interschimbă: [2, 3, 5, 4].
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Simplitate Extremă:** Necesită o singură variabilă de control și o singură buclă. | ⚠️ **Lentoare:** Foarte ineficient pe seturi mari de date ($O(n^2)$). |
| 📊 **In-place & Stabil:** Nu consumă memorie și păstrează ordinea elementelor egale. | 📉 **Performanță:** De obicei mai lent decât Insertion Sort în practică. |

## 🔢 **Analiză Matematică și Complexitate**

Algoritmul face multe "mișcări înapoi", ceea ce îl penalizează pe date neordonate.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Worst Case)** | $O(n^2)$ |
| **Timp (Best Case)** | $O(n)$ (Dacă lista e sortată) |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Educație:** Demonstrarea modului în care o logică recursivă/iterativă simplă poate sorta datele.
- **Sisteme Minimaliste:** Unde codul trebuie să fie cât mai scurt posibil (code golfing).
