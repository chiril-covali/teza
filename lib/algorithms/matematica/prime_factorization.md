<!-- custom-doc -->

# 🚀 **Factorizarea în Numere Prime**

## 📝 **Descriere**

**Factorizarea în numere prime** este procesul de descompunere a unui număr întreg compus în produs de numere prime. Conform **Teoremei Fundamentale a Aritmeticii**, fiecare număr întreg mai mare decât 1 are o descompunere unică în factori primi (făcând abstracție de ordinea factorilor). Această "amprentă digitală" a numerelor este coloana vertebrală a multor sisteme de securitate moderne.

## 🖼️ **Reprezentare Vizuală**

![Factorization Tree](/docs-images/matematica/prime_factorization.svg)
<!-- external-visual -->
![Resursă vizuală externă (matematica)](https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg)


```text
Exemplu: 120
          120
         /   \
       (2)   60
            /  \
          (2)  30
              /  \
            (2)  15
                /  \
              (3)  (5)
Rezultat: 2 * 2 * 2 * 3 * 5 = 2³ * 3 * 5
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| ✅ **Unicitate:** Oferă o reprezentare matematică unică pentru orice număr întreg. | ⚠️ **Dificultate Computațională:** Factorizarea numerelor imense este o problemă nerezolvată eficient (NP). |
| ✅ **Utilitate:** Esențială pentru calculul CMMDC, CMMMC și simplificarea fracțiilor. | ❌ **Scalabilitate:** Algoritmii simpli devin inutilizabili pe măsură ce numărul de cifre crește. |

## 🔢 **Analiză Matematică și Complexitate**

Algoritmul standard de diviziune trială parcurge numerele până la $\sqrt{n}$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Trial Division)** | $O(\sqrt{n})$ |
| **Spațiu (Space)** | $O(\log n)$ (pentru stocarea factorilor) |

## 💡 **Aplicații Practice**

- **Criptografie:** Securitatea algoritmului RSA se bazează pe dificultatea factorizării numerelor gigantice.
- **Securitate Cibernetică:** Generarea și validarea cheilor publice în comunicațiile securizate.
- **Teoria Numerelor:** Demonstrarea teoremelor legate de divizibilitate și structura numerelor.
- **Inginerie:** Analiza armonică și prelucrarea semnalelor unde factorizarea frecvențelor este necesară.
