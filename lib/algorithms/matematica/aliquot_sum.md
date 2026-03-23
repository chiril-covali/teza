<!-- custom-doc -->

# 🚀 **Suma Divizorilor Proprii (Aliquot Sum)**

## 📝 **Descriere**

**Aliquot Sum** a unui număr întreg pozitiv $n$ este suma tuturor divizorilor proprii ai lui $n$, adică toți divizorii săi în afară de numărul însuși. Această valoare este centrală în clasificarea numerelor în: **perfecte** (sumă egală cu $n$), **abundente** (sumă mai mare decât $n$) sau **deficitare** (sumă mai mică decât $n$).

## 🖼️ **Reprezentare Vizuală**

![Divisors Concept](https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Divisors_of_12.svg/300px-Divisors_of_12.svg.png)

```text
Număr: 12
Divizori: 1, 2, 3, 4, 6, 12
Divizori proprii: 1, 2, 3, 4, 6
Calcul: 1 + 2 + 3 + 4 + 6 = 16
Rezultat: Aliquot Sum(12) = 16 (Număr abundent)
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Clasificare:** Permite identificarea rapidă a tipului de număr (perfect, abundent etc.). | ⚠️ **Eficientă:** Găsirea divizorilor poate fi lentă pentru numere foarte mari. |
| 📊 **Teoretic:** Baza multor probleme în teoria numerelor (ex: numere prietene). | 📉 **Cost Calcul:** Necesită parcurgerea numerelor până la $\sqrt{n}$. |

## 🔢 **Analiză Matematică și Complexitate**

Dacă suma divizorilor este $s(n)$, atunci Aliquot Sum $= \sigma_1(n) - n$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(\sqrt{n})$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Teoria Numerelor:** Studiul secvențelor de tip Aliquot și a numerelor sociabile.
- **Educație:** Probleme de algoritmica pentru înțelegerea divizibilității.
- **Criptografie:** Proprietățile divizorilor sunt uneori folosite în analiza vulnerabilităților.
