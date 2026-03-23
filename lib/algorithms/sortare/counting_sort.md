<!-- custom-doc -->

# 🚀 **Sortare prin Numărare**

## 📝 **Descriere**

**Counting Sort** este un algoritm de sortare non-comparativ care sortează elementele unui set de date prin numărarea frecvenței fiecărei valori unice. Acesta utilizează aceste frecvențe pentru a calcula poziția fiecărui element în lista finală sortată. Este extrem de eficient atunci când intervalul de valori posibile ($k$) este mic în comparație cu numărul de elemente ($n$).

## 🖼️ **Reprezentare Vizuală**

![Counting Sort Animation](/docs-images/sortare/counting_sort.svg)
<!-- external-visual -->
![Resursă vizuală externă (sortare)](https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80)


```text
Input: [4, 2, 2, 8, 3, 3, 1]
1. Numără frecvențele: {1:1, 2:2, 3:2, 4:1, 8:1}
2. Calculează poziții cumulative.
3. Plasează elementele: [1, 2, 2, 3, 3, 4, 8]
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Viteză Liniară:** Mai rapid decât algoritmii de comparare dacă $k$ este mic. | ⚠️ **Memorie:** Consumă spațiu suplimentar $O(k)$ pentru vectorul de frecvență. |
| 📊 **Stabilitate:** Păstrează ordinea elementelor cu chei egale. | 📉 **Limitare:** Funcționează eficient doar pentru numere întregi sau date discrete. |

## 🔢 **Analiză Matematică și Complexitate**

Complexitatea depinde atât de numărul de elemente ($n$), cât și de plaja de valori ($k$).

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (All Cases)** | $O(n + k)$ |
| **Spațiu (Space)** | $O(k)$ |

## 💡 **Aplicații Practice**

- **Subrutină pentru Radix Sort:** Counting Sort este motorul principal din spatele Radix Sort.
- **Procesarea voturilor:** Când numărul de opțiuni (candidați) este mic.
- **Bioinformatică:** Sortarea frecvențelor nucleotidelor în secvențe ADN.
