<!-- custom-doc -->
# 🚀 **Factorizarea în Numere Prime**

## 📝 **Descriere**
**Factorizarea în numere prime** este procesul de descompunere a unui număr întreg compus în produs de numere prime. Conform **Teoremei Fundamentale a Aritmeticii**, fiecare număr întreg mai mare decât 1 are o descompunere unică în factori primi (făcând abstracție de ordinea factorilor).

## 🖼️ **Reprezentare Vizuală**
![Factorization Tree](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Factor_tree_of_48.svg/300px-Factor_tree_of_48.svg.png)

**Diagramă ASCII (Exemplu pentru 120):**
```text
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
| 🚀 **Unicitate:** Oferă o "amprentă" matematică unică pentru fiecare număr. | ⚠️ **Complexitate:** Calcularea factorilor pentru numere gigantice este extrem de grea. |
| 📊 **Utilitate:** Esențială pentru calculul CMMDC, CMMMC și simplificarea fracțiilor. | 📉 **Timp:** Algoritmii simpli (trial division) sunt lenți pentru numere mari. |

## 🔢 **Analiză Matematică și Complexitate**
Algoritmul de diviziune trială parcurge numerele până la $\sqrt{n}$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Trial Division)** | $O(\sqrt{n})$ |
| **Spațiu (Space)** | $O(\log n)$ (pentru stocarea factorilor) |

## 💡 **Aplicații Practice**
- **Criptografie:** Securitatea RSA se bazează pe dificultatea factorizării numerelor imense.
- **Teoria Numerelor:** Demonstrarea multor teoreme legate de divizibilitate.
- **Securitate Cibernetică:** Generarea cheilor publice și private.
