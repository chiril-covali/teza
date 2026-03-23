<!-- custom-doc -->

# 🚀 **Cel mai mic multiplu comun**

## 📝 **Descriere**

**Cel mai mic multiplu comun** (CMMMC) a două numere întregi $a$ și $b$ este cel mai mic număr natural care este divizibil cu ambele numere. Calculul acestuia se bazează adesea pe relația sa directă cu CMMDC, oferind o metodă rapidă și precisă fără a fi necesară listarea multiplilor.

## 🖼️ **Reprezentare Vizuală**

![LCM Visualization](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Symmetrical_5-set_Venn_diagram_LCM_2_3_4_5_7.svg/500px-Symmetrical_5-set_Venn_diagram_LCM_2_3_4_5_7.svg.png)

```text
Multipli 4: 4, 8, 12, 16, 20...
Multipli 6: 6, 12, 18, 24...
Cel mai mic comun: 12
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Calcul Rapid:** Prin formula $cmmmc(a, b) = \frac{|a \cdot b|}{cmmdc(a, b)}$. | ⚠️ **Overflow:** Produsul $a \cdot b$ poate depăși limitele numerice înainte de împărțire. |
| 📊 **Eficiență:** Se bazează pe algoritmul lui Euclid (foarte rapid). | 📉 **Atenție:** Necesită calcularea prealabilă a CMMDC. |

## 🔢 **Analiză Matematică și Complexitate**

Relația fundamentală: $cmmmc(a, b) \times cmmdc(a, b) = |a \cdot b|$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(\log(\min(a, b)))$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Aritmetică:** Găsirea numitorului comun pentru adunarea sau scăderea fracțiilor.
- **Planificare:** Calcularea momentului în care două evenimente periodice se vor sincroniza.
- **Inginerie:** Determinarea numărului de dinți pentru roți dințate care trebuie să se potrivească perfect.
