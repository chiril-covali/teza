<!-- custom-doc -->

# 🚀 **Congruența lui Zeller (Zeller's Congruence)**

## 📝 **Descriere**

**Congruența lui Zeller** este un algoritm matematic dezvoltat de Christian Zeller pentru a calcula ziua săptămânii pentru orice dată din calendarul Julian sau Gregorian. Algoritmul este extrem de eficient, bazându-se pe o singură formulă aritmetică ce utilizează operații de bază și aritmetică modulară.

## 🖼️ **Reprezentare Vizuală**

![Zeller's Congruence Formula](https://upload.wikimedia.org/wikipedia/commons/e/e1/Zeller%27s_Congruence.png)

```text
Exemplu: 4 Iulie 2023
q = 4 (ziua)
m = 5 (Iulie, deoarece Ian/Feb sunt 13/14 din anul anterior)
K = 23 (anul in secol)
J = 20 (secolul)

Formula: h = (q + [13(m+1)/5] + K + [K/4] + [J/4] - 2J) mod 7
Rezultat: h = 3 (Marți)
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Viteză:** Calcul instantaneu cu complexitate $O(1)$. | ⚠️ **Complexitate logică:** Necesită tratarea specială a lunilor Ianuarie și Februarie. |
| 📊 **Universalitate:** Funcționează pentru orice dată istorică (după adoptarea calendarului). | 📉 **Erori de implementare:** Modulo pentru numere negative poate varia între limbajele de programare. |

## 🔢 **Analiză Matematică și Complexitate**

Algoritmul execută un număr fix de operații aritmetice indiferent de mărimea datei.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (All Cases)** | $O(1)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Sisteme de operare:** Calcularea zilei săptămânii pentru ceasul sistemului.
- **Aplicații de tip Calendar:** Generarea automată a lunilor și anilor.
- **Analiză istorică:** Determinarea zilelor în care au avut loc evenimente importante.
