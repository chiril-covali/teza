<!-- custom-doc -->

# 🚀 **Numărul de Cifre**

## 📝 **Descriere**

**Numărul de cifre** al unui număr întreg reprezintă cantitatea de simboluri numerice necesare pentru a-l exprima într-o anumită bază (cel mai frecvent baza 10). Această proprietate este fundamentală în informatică pentru alocarea spațiului de stocare, formatarea datelor și analiza complexității algoritmilor.

## 🖼️ **Reprezentare Vizuală**

![Digits Count](/docs-images/matematica/number_of_digits.svg)
<!-- external-visual -->
![Resursă vizuală externă (matematica)](https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg)


```text
Număr: 12345
  1 - mii
  2 - sute
  3 - zeci
  4 - unități
  ...
Total: 5 cifre
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Eficiență:** Se poate calcula în timp constant $O(1)$ folosind logaritmi. | ⚠️ **Tipuri de Date:** Necesită atenție la numerele negative (semnul `-` nu e cifră). |
| 📊 **Validare:** Util pentru verificarea rapidă a lungimii datelor (ex: PIN-uri, ID-uri). | 📉 **Bază:** Rezultatul depinde de baza numerică aleasă (binar, decimal, hex). |

## 🔢 **Analiză Matematică și Complexitate**

Formula logaritmică pentru baza 10:
$d(n) = \lfloor \log_{10}(|n|) \rfloor + 1$ (pentru $n \neq 0$)

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(1)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Validarea datelor:** Verificarea dacă un număr de telefon sau un cont bancar are lungimea corectă.
- **Formatare:** Alinierea numerelor în tabele prin adăugarea de zerouri la stânga (padding).
- **Analiza Algoritmilor:** Determinarea numărului de pași în algoritmi de tip "digit-by-digit" (ex: Radix Sort).
