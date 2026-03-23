<!-- custom-doc -->

# 🚀 **Căutarea Binară (Binary Search)**

## 📝 **Descriere**

**Căutarea Binară** este un algoritm extrem de eficient de tip **Divide et Impera** utilizat pentru a găsi poziția unui element într-un tablou **sortat**. În loc să verifice fiecare element, acesta înjumătățește intervalul de căutare la fiecare pas, comparând elementul căutat cu cel din mijloc.

## 🖼️ **Reprezentare Vizuală**

![Binary Search Animation](https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Binary_Search_Depiction.svg/400px-Binary_Search_Depiction.svg.png)

```text
Țintă: 70
[10, 20, 30, 40, 50, 60, 70, 80, 90]
  L          M               R  (50 < 70, mută L la M+1)
              L      M       R  (70 == 70, GĂSIT!)
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Viteză:** Mult mai rapid decât căutarea liniară pentru liste mari. | ⚠️ **Precondiție:** Tabloul **trebuie să fie sortat** în prealabil. |
| 📊 **Complexitate Mică:** Timpul de execuție crește foarte lent raportat la dimensiunea datelor. | 📉 **Cost Sortare:** Dacă datele se schimbă des, costul sortării poate anula avantajul vitezei. |

## 🔢 **Analiză Matematică și Complexitate**

Numărul maxim de comparații necesare este dat de logaritmul în baza 2 al numărului de elemente $n$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Worst Case)** | $O(\log n)$ |
| **Timp (Best Case)** | $O(1)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Baze de Date:** Căutarea rapidă după indecși.
- **Sisteme de fișiere:** Localizarea rapidă a unui fișier într-un director sortat alfabetic.
- **Biblioteci standard:** Utilizat în aproape toate limbajele de programare moderne.
