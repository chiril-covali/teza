<!-- custom-doc -->

# 🚀 **Sortare prin Selecție**

## 📝 **Descriere**

**Sortarea prin Selecție** este un algoritm de sortare intuitiv care funcționează prin divizarea tabloului într-o parte sortată și una nesortată. La fiecare iterație, algoritmul găsește cel mai mic element din partea nesortată și îl interschimbă cu primul element din acea secțiune, mărind astfel partea sortată cu un element.

## 🖼️ **Reprezentare Vizuală**

![Selection Sort Animation](/docs-images/sortare/selectionSort.svg)
<!-- external-visual -->
![Resursă vizuală externă (sortare)](https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80)


```text
S: [Sortat]  N: [Nesortat]
S: []        N: [64, 25, 12, 22, 11] (Găsește min: 11)
S: [11]      N: [25, 12, 22, 64]     (Găsește min: 12)
S: [11, 12]  N: [25, 22, 64]         (Găsește min: 22)
S: [11, 12, 22] N: [25, 64]          (Găsește min: 25)
--> [11, 12, 22, 25, 64]
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Număr minim de interschimbări:** Bun pentru sisteme unde scrierea în memorie este costisitoare. | ⚠️ **Ineficiență:** Timp de execuție pătratic ($O(n^2)$), chiar și pentru liste sortate. |
| 📊 **Simplitate:** Foarte ușor de înțeles și utilizat pe seturi mici de date. | 📉 **Nu este adaptiv:** Nu profită de o listă care este deja parțial sortată. |

## 🔢 **Analiză Matematică și Complexitate**

Algoritmul face întotdeauna același număr de comparații: $\frac{n(n-1)}{2}$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Worst Case)** | $O(n^2)$ |
| **Timp (Best Case)** | $O(n^2)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Sisteme Embedded:** Unde scrierea în memoria Flash (EEPROM) este mult mai lentă decât citirea.
- **Seturi de date mici:** Unde complexitatea algoritmilor mai avansați nu este necesară.
- **Învățământ:** Un pas esențial în înțelegerea conceptelor de bază din algoritmică.
