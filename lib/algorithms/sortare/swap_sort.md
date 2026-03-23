<!-- custom-doc -->

# 🚀 **Sortarea prin Interschimbare (Swap Sort)**

## 📝 **Descriere**

**Swap Sort** (adesea asociat cu Bubble Sort) este un algoritm de sortare intuitiv care funcționează prin compararea repetată a perechilor de elemente adiacente și interschimbarea lor dacă nu sunt în ordinea corectă. Procesul continuă până când o întreagă trecere prin tablou nu mai necesită nicio schimbare.

## 🖼️ **Reprezentare Vizuală**

![Swap Sort Animation](https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif)

```text
Iterație: [5, 3, 8, 4, 2]
1. (5, 3) -> [3, 5, 8, 4, 2] (Swap!)
2. (5, 8) -> [3, 5, 8, 4, 2]
3. (8, 4) -> [3, 5, 4, 8, 2] (Swap!)
4. (8, 2) -> [3, 5, 4, 2, 8] (Swap!)
Rezultat trecere: [3, 5, 4, 2, 8]
... Final: [2, 3, 4, 5, 8]
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Simplitate:** Cel mai ușor algoritm de înțeles și implementat. | ⚠️ **Ineficiență:** Foarte lent pentru volume mari de date ($O(n^2)$). |
| 📊 **In-place:** Nu necesită memorie auxiliară. | 📉 **Cost swap:** Efectuează multe operații de scriere în memorie. |

## 🔢 **Analiză Matematică și Complexitate**

Algoritmul parcurge tabloul de mai multe ori, micșorând spațiul de căutare cu câte un element la fiecare iterație completă.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Worst Case)** | $O(n^2)$ |
| **Timp (Best Case)** | $O(n)$ (dacă este deja sortat) |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Educație:** Primul algoritm predat studenților pentru a înțelege conceptul de sortare.
- **Sisteme extrem de simple:** Unde resursele de procesare sunt minime și datele sunt foarte puține.
- **Detectarea sortării:** Folosit ca o verificare rapidă dacă un tablou este deja sortat.
