<!-- custom-doc -->
# 🚀 **Rădăcina Pătrată (Metoda lui Newton)**

## 📝 **Descriere**
Calcularea **Rădăcinii Pătrate** este o problemă fundamentală rezolvată adesea prin **Metoda lui Newton-Raphson**. Acesta este un algoritm iterativ care găsește aproximări din ce în ce mai bune ale rădăcinii unui număr real non-negativ $S$. Algoritmul pornește de la o estimare inițială și converge extrem de rapid către valoarea reală.

## 🖼️ **Reprezentare Vizuală**
![Newton Method](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/NewtonIteration_Ani.gif/300px-NewtonIteration_Ani.gif)

**Diagramă ASCII (Iterație pentru sqrt(25), start=10):**
```text
1. x = 10
2. x = (10 + 25/10) / 2 = 6.25
3. x = (6.25 + 25/6.25) / 2 = 5.125
4. x = (5.125 + 25/5.125) / 2 = 5.0015
5. x = 5.0 (Convergență!)
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Convergență Quadratică:** Numărul de cifre corecte se dublează aproximativ la fiecare iterație. | ⚠️ **Estimare Inițială:** Necesită o valoare de start rezonabilă pentru a fi eficient. |
| 📊 **Precizie Ajustabilă:** Te poți opri exact când ai atins eroarea maximă admisă (epsilon). | 📉 **Cost:** Implică operații de împărțire, care sunt mai costisitoare decât adunările. |

## 🔢 **Analiză Matematică și Complexitate**
Formula de recurență: $x_{n+1} = \frac{1}{2} \left( x_n + \frac{S}{x_n} \right)$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(\log(\text{precizie}))$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**
- **Calculatoare Științifice:** Implementarea funcțiilor de tip `sqrt()`.
- **Grafică 3D:** Calcularea distanțelor euclidiene și a vectorilor normali.
- **Inginerie:** Rezolvarea ecuațiilor neliniare complexe.
