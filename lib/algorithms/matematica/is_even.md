<!-- custom-doc -->

# 🚀 **Verificare Paritate**

## 📝 **Descriere**

**Verificarea Parității** este procesul de a determina dacă un număr întreg este **par** sau **impar**. Un număr este par dacă este divizibil cu 2 (restul împărțirii este 0). Aceasta este una dintre cele mai elementare și frecvente operații în programare.

## 🖼️ **Reprezentare Vizuală**

![Even Odd Numbers](/docs-images/matematica/is_even.svg)
<!-- external-visual -->
![Resursă vizuală externă (matematica)](https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg)


```text
Număr: 8 -> 8 / 2 = 4 (Rest 0) -> PAR ✅
Număr: 7 -> 7 / 2 = 3 (Rest 1) -> IMPAR ❌

Binar:
8: 1000 (Ultimul bit este 0) -> PAR
7: 0111 (Ultimul bit este 1) -> IMPAR
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Viteză:** Execuție instantanee la nivel de procesor. | ⚠️ **Limitare:** Se aplică exclusiv numerelor întregi. |
| 📊 **Simplitate:** Cod minim și ușor de citit. | 📉 **Specificitate:** Nu oferă informații despre alți factori. |

## 🔢 **Analiză Matematică și Complexitate**

Proprietate: $n \text{ este par } \iff n \equiv 0 \pmod 2$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(1)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **UI/UX:** Colorarea rândurilor alternante într-un tabel (zebra striping).
- **Algoritmi:** Împărțirea sarcinilor în algoritmi de tip "Divide and Conquer".
- **Hardware:** Verificarea biților de paritate pentru detectarea erorilor de transmisie.
