<!-- custom-doc -->

# 🚀 **Conversie Binară**

## 📝 **Descriere**

**Conversia Binară** este procesul de transformare a unui număr din baza 10 (decimal) în baza 2 (binar). Algoritmul se bazează pe împărțirea repetată a numărului la 2 și colectarea resturilor (care vor fi întotdeauna 0 sau 1) în ordine inversă.

## 🖼️ **Reprezentare Vizuală**

![Binary Conversion](/docs-images/matematica/binary_convert.svg)
<!-- external-visual -->
![Resursă vizuală externă (matematica)](https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg)


```text
13 / 2 = 6 rest 1  ↑
 6 / 2 = 3 rest 0  | (Citire inversă)
 3 / 2 = 1 rest 1  |
 1 / 2 = 0 rest 1  |
Rezultat: 1101₂
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Fundamental:** Permite comunicarea între logica umană (baza 10) și hardware-ul digital (baza 2). | ⚠️ **Lungime:** Numerele binare sunt mult mai lungi și mai greu de citit pentru oameni. |
| 📊 **Simplitate:** Algoritmul de împărțire succesivă este extrem de robust și ușor de implementat. | 📉 **Cost:** Necesită memorie suplimentară pentru a stoca resturile înainte de inversare. |

## 🔢 **Analiză Matematică și Complexitate**

Fiecare pas reduce numărul la jumătate, deci numărul de pași este logaritmic.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(\log_2 n)$ |
| **Spațiu (Space)** | $O(\log_2 n)$ |

## 💡 **Aplicații Practice**

- **Electronică Digitală:** Reprezentarea datelor în circuite integrate și memorii.
- **Networking:** Calcularea adreselor IP și a măștilor de rețea.
- **Programare Low-level:** Manipularea flag-urilor și a permisiunilor de fișiere (chmod).
