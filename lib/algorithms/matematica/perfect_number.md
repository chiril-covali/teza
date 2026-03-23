<!-- custom-doc -->
# 🚀 **Număr Perfect (Perfect Number)**

## 📝 **Descriere**
Un **Număr Perfect** este un număr întreg pozitiv care este egal cu suma divizorilor săi proprii (excluzând numărul însuși). Cel mai mic număr perfect este 6, deoarece divizorii săi proprii sunt 1, 2 și 3, iar $1 + 2 + 3 = 6$. Următorul este 28 ($1 + 2 + 4 + 7 + 14 = 28$).

## 🖼️ **Reprezentare Vizuală**
![Perfect Number 6](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Perfect_number_6.svg/200px-Perfect_number_6.svg.png)

**Diagramă ASCII (Exemplu: n=6):**
```text
Număr: 6
Divizori: 1, 2, 3, 6
Suma proprii: 1 + 2 + 3 = 6
Rezultat: 6 == 6 ✅ (Este Perfect)
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Proprietate Estetică:** Un concept rar și elegant în matematică. | ⚠️ **Raritate:** Numerele perfecte sunt extrem de rare și greu de găsit pe măsură ce $n$ crește. |
| 📊 **Legătură cu primele Mersenne:** Există o formulă directă pentru numerele perfecte pare. | 📉 **Cost Calcul:** Verificarea numerelor mari necesită algoritmi foarte avansați. |

## 🔢 **Analiză Matematică și Complexitate**
Conform teoremei Euclid-Euler, orice număr perfect par are forma:
$2^{p-1}(2^p - 1)$, unde $2^p - 1$ este un număr prim Mersenne.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Verificare brută)** | $O(\sqrt{n})$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**
- **Istoria Matematicii:** Studiate încă din antichitate de pitagoreici pentru proprietățile lor "mistice".
- **Teoria Numerelor:** Legătura profundă cu numerele prime și structura puterilor lui 2.
- **Interviuri:** Testarea optimizării algoritmilor de găsire a divizorilor.
