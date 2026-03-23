<!-- custom-doc -->

# 🚀 **An Bisect**

## 📝 **Descriere**

Un **an bisect** este un an calendaristic care conține o zi suplimentară (29 februarie) adăugată pentru a menține anul calendaristic sincronizat cu anul astronomic. Deoarece pământul orbitează soarele în aproximativ 365.2422 zile, simpla adăugare a unei zile la fiecare 4 ani nu este suficient de precisă, necesitând reguli suplimentare pentru secole.

## 🖼️ **Reprezentare Vizuală**

![Earth Orbit](/docs-images/matematica/is_leap_year.svg)
<!-- external-visual -->
![Resursă vizuală externă (matematica)](https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg)


```text
Anul X
  |-- Divizibil cu 400? --> DA (Bisect ✅)
  |-- Divizibil cu 100? --> DA (NU e bisect ❌)
  |-- Divizibil cu 4?   --> DA (Bisect ✅)
  |-- Altfel            --> NU e bisect ❌
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Sincronizare:** Previne decalarea anotimpurilor pe termen lung. | ⚠️ **Complexitate Software:** Sursă frecventă de bug-uri în sisteme care nu tratează data de 29 feb corect. |
| 📊 **Simplitate Algoritmică:** Necesită doar câteva operații modulo. | 📉 **Excepții:** Regulile s-au schimbat istoric (trecerea de la Iulian la Gregorian). |

## 🔢 **Analiză Matematică și Complexitate**

Condiția logică standard:
`(an % 400 == 0) || (an % 4 == 0 && an % 100 != 0)`

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(1)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Sisteme de Gestiune:** Calcularea corectă a dobânzilor bancare sau a termenelor limită.
- **Astronomie:** Sincronizarea observațiilor stelare cu timpul terestru.
- **Dezvoltare Software:** Implementarea bibliotecilor de manipulare a datelor (ex: `moment.js`, `date-fns`).
