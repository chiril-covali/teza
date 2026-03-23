<!-- custom-doc -->

# 🚀 **Sortarea prin Interclasare (Merge Sort)**

## 📝 **Descriere**

**Merge Sort** este un algoritm de sortare stabil și eficient, bazat pe strategia **Divide et Impera**. Acesta funcționează prin divizarea repetată a tabloului în jumătăți până când se obțin elemente individuale, care sunt apoi "interclasate" (combinate) în ordine sortată pentru a reconstrui tabloul final.

## 🖼️ **Reprezentare Vizuală**

![Merge Sort Animation](https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif)

```text
[38, 27, 43, 3]
[38, 27] [43, 3]  (Divide)
[38] [27] [43] [3] (Divide)
[27, 38] [3, 43]  (Interclasează)
[3, 27, 38, 43]   (Rezultat final!)
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Garantat $O(n \log n)$:** Performanță consistentă, indiferent de cât de dezordonate sunt datele. | ⚠️ **Memorie:** Necesită spațiu suplimentar $O(n)$ pentru tablouri auxiliare de interclasare. |
| 📊 **Stabilitate:** Păstrează ordinea relativă a elementelor egale (esențial pentru baze de date). | 📉 **Cost:** Mai lent decât QuickSort pentru seturi mici de date din cauza copierii memoriei. |

## 🔢 **Analiză Matematică și Complexitate**

Împărțirea se face în $\log n$ pași, iar fiecare nivel de interclasare necesită $n$ operații.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (All Cases)** | $O(n \log n)$ |
| **Spațiu (Space)** | $O(n)$ |

## 💡 **Aplicații Practice**

- **Sortarea Listelor Înlănțuite:** Cel mai eficient algoritm pentru structuri de tip listă.
- **External Sorting:** Sortarea fișierelor imense care nu încap în memoria RAM (HDD/SSD).
- **Comenzi E-commerce:** Sortarea produselor după preț/relevanță unde ordinea inițială contează (stabilitate).
