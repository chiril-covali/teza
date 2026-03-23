<!-- custom-doc -->

# 🚀 **Media Aritmetică (Arithmetic Mean)**

## 📝 **Descriere**

**Media Aritmetică** este cea mai comună măsură a tendinței centrale a unui set de date. Aceasta se calculează prin adunarea tuturor valorilor din set și împărțirea sumei obținute la numărul total de elemente. Este reprezentarea "centrului de greutate" al datelor.

## 🖼️ **Reprezentare Vizuală**

![Mean Visualization](https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Visualisation_mode_median_mean.svg/400px-Visualisation_mode_median_mean.svg.png)

```text
Set date: [10, 20, 30, 40]
Suma: 10 + 20 + 30 + 40 = 100
Număr elemente: 4
Medie: 100 / 4 = 25
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Ușurință:** Foarte simplu de calculat și înțeles. | ⚠️ **Sensibilitate la valori aberante (Outliers):** O singură valoare extrem de mare/mică poate distorsiona media. |
| 📊 **Informație completă:** Include fiecare valoare din set în calculul final. | 📉 **Reprezentativitate:** Poate să nu reprezinte bine setul dacă datele sunt puternic asimetrice. |

## 🔢 **Analiză Matematică și Complexitate**

Formula: $\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i$

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(n)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Educație:** Calcularea mediei notelor elevilor.
- **Finanțe:** Determinarea prețului mediu al acțiunilor pe o perioadă de timp.
- **Senzori:** Filtrarea zgomotului prin calcularea mediei citirilor consecutive.
