<!-- custom-doc -->

# 🚀 **Număr Armstrong**

## 📝 **Descriere**

Un **Număr Armstrong** (sau număr narcisist) este un număr care este egal cu suma propriilor sale cifre ridicate la puterea numărului de cifre. De exemplu, 153 este un număr Armstrong pentru că are 3 cifre și $1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153$.

## 🖼️ **Reprezentare Vizuală**

![Armstrong Number](/docs-images/matematica/armstrong_number.svg)
<!-- external-visual -->
![Resursă vizuală externă (matematica)](https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg)


```text
Cifre: 1, 5, 3 (Total: 3 cifre)
Calcul: (1^3) + (5^3) + (3^3)
        1 + 125 + 27 = 153
Rezultat: 153 == 153 ✅ (Este Armstrong)
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Proprietate Interesantă:** Concept matematic atractiv pentru exerciții de logică. | ⚠️ **Utilitate Limitată:** Nu are multe aplicații practice în ingineria software reală. |
| 📊 **Implementare:** Bun pentru exersarea manipulării cifrelor și a buclelor. | 📉 **Cost Calcul:** Ridicarea la putere poate fi costisitoare pentru numere cu mii de cifre. |

## 🔢 **Analiză Matematică și Complexitate**

Dacă $n$ este numărul și $d$ numărul său de cifre.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(\log_{10} n)$ (proporțional cu nr. de cifre) |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Educație:** Problemă clasică de început în învățarea programării.
- **Teoria Numerelor:** Explorarea numerelor cu baze și proprietăți speciale.
- **Interviuri:** Testarea abilității de a extrage cifre dintr-un număr fără a folosi șiruri de caractere.
