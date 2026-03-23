<!-- custom-doc -->

# 🚀 **Găsire Minimului**

## 📝 **Descriere**

Algoritmul pentru **Găsirea Minimului** este unul dintre cei mai simpli și intuitivi algoritmi de căutare a unui extrem. Acesta parcurge o listă de elemente și păstrează valoarea cea mai mică întâlnită până la acel punct, finalizând cu cel mai mic element din întregul set de date.

## 🖼️ **Reprezentare Vizuală**

![Find Min Visual](/docs-images/matematica/find_min.svg)
<!-- external-visual -->
![Resursă vizuală externă (matematica)](https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg)


```text
Array: [5, 3, 8, 1, 4]
Pas 1: min=5 (primul element)
Pas 2: 3 < 5? Da -> min=3
Pas 3: 8 < 3? Nu -> min=3
Pas 4: 1 < 3? Da -> min=1
Pas 5: 4 < 1? Nu -> min=1
Rezultat final: 1
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Simplitate:** Ușor de înțeles și de implementat de către orice programator. | ⚠️ **Ineficiență:** Trebuie să viziteze fiecare element cel puțin o dată. |
| 📊 **Universalitate:** Se aplică oricărei colecții de date comparabile (numere, șiruri). | 📉 **Scalabilitate:** Timpul de execuție crește liniar cu dimensiunea listei. |

## 🔢 **Analiză Matematică și Complexitate**

Algoritmul execută exact $n-1$ comparări pentru o listă de $n$ elemente.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(n)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **E-commerce:** Sortarea produselor după cel mai mic preț dintr-o pagină.
- **Statistică:** Identificarea valorii minime într-un set de date pentru a calcula plaja (range).
- **Control Industrial:** Detectarea celei mai mici presiuni sau temperaturi dintr-o rețea de senzori.
