<!-- custom-doc -->
# 🚀 **Valoare Absolută (Absolute Value)**

## 📝 **Descriere**
**Valoarea Absolută** (sau modulul) unui număr real $x$, notată $|x|$, este distanța non-negativă dintre acel număr și originea (zero) pe axa numerelor. Altfel spus, valoarea absolută elimină semnul negativ al unui număr, lăsând magnitudinea acestuia intactă.

## 🖼️ **Reprezentare Vizuală**
![Absolute Value Function](https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Absolute_value.svg/300px-Absolute_value.svg.png)

**Diagramă ASCII (Axa numerelor):**
```text
 <---(-3)---(-2)---(-1)---(0)---(1)---(2)---(3)--->
        |__________________|__________________|
             distanța 3         distanța 3
 Rezultat: |-3| = 3 și |3| = 3
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Simplitate:** Necesită o singură verificare condițională (dacă $x < 0$). | ⚠️ **Derivabilitate:** Funcția $|x|$ nu este derivabilă în punctul $x=0$. |
| 📊 **Indispensabil:** Esențial pentru calcule de distanțe, erori și magnitudini. | 📉 **Implementare:** Poate fi problematic cu numere foarte mici (floating point precision). |

## 🔢 **Analiză Matematică și Complexitate**
Definiția pe ramuri:
$$|x| = \begin{cases} x & \text{dacă } x \geq 0 \\ -x & \text{dacă } x < 0 \end{cases}$$

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(1)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**
- **Geometrie:** Calcularea distanței dintre două puncte în spațiu.
- **Statistică:** Calcularea abaterii medii absolute (Mean Absolute Deviation).
- **Finanțe:** Determinarea profitului sau pierderii brute, ignorând direcția tranzacției.
