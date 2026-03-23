<!-- custom-doc -->

# 🚀 **Funcția Signum**

## 📝 **Descriere**

Funcția **Signum** (sau funcția semn) este o funcție matematică care extrage semnul unui număr real. Aceasta returnează valoarea -1 pentru numere negative, 1 pentru numere pozitive și 0 pentru valoarea zero. Este un instrument esențial în analiza matematică și programare pentru a simplifica condițiile logice și a normaliza direcțiile.

## 🖼️ **Reprezentare Vizuală**

![Signum Function](/docs-images/matematica/signum.svg)
<!-- external-visual -->
![Resursă vizuală externă (matematica)](https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg)


```text
Definiție:
sgn(x) = { -1, dacă x < 0
          {  0, dacă x = 0
          {  1, dacă x > 0

Exemple:
sgn(-15) = -1
sgn(0)   =  0
sgn(42)  =  1
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| ✅ **Simplificare Cod:** Înlocuiește multiple blocuri `if-else` cu o singură operație matematică. | ⚠️ **Discontinuitate:** Funcția nu este continuă în punctul x=0, ceea ce poate pune probleme în anumite calcule numerice fine. |
| ✅ **Performanță:** Implementările la nivel de bit (bit-twiddling) sunt extrem de rapide pe CPU modern. | ❌ **Pierdere de Date:** Se pierde magnitudinea numărului, păstrându-se doar direcția acestuia. |

## 🔢 **Analiză Matematică și Complexitate**

Funcția poate fi definită și ca $\text{sgn}(x) = \frac{x}{|x|}$ pentru $x \neq 0$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(1)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Inteligență Artificială:** Utilizată ca funcție de activare simplă în anumite tipuri de neuroni.
- **Fizică și Motoare de Jocuri:** Determinarea direcției forțelor sau a vectorilor de deplasare.
- **Procesarea Semnalelor:** Identificarea polarității unui curent sau a unei unde sonore.
- **Sisteme de Control:** Utilizată în controlerele de tip "bang-bang" pentru a comuta între stări.
