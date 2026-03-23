<!-- custom-doc -->

# 🚀 **Conversie Grade în Radiani (Degrees to Radians)**

## 📝 **Descriere**
**Conversia din Grade în Radiani** este un proces matematic fundamental în **trigonometrie** și **geometrie**. Un **grad** este o unitate de măsură a unghiurilor bazată pe divizarea unui cerc în 360 de părți egale, în timp ce **radianul** este unitatea standard în SI, definită prin lungimea arcului de cerc egală cu raza acestuia. Această conversie este esențială pentru utilizarea funcțiilor matematice în majoritatea limbajelor de programare.

## 🖼️ **Reprezentare Vizuală**
![Degree-Radian Conversion](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Degree-Radian_Conversion.svg/400px-Degree-Radian_Conversion.svg.png)

```text
       +-------------------+
       |       180°        |  ==> π rad
       +-------------------+
               |
       +-------------------+
       |        90°        |  ==> π/2 rad
       +-------------------+
               |
       +-------------------+
       |        45°        |  ==> π/4 rad
       +-------------------+
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Standardizare:** Radianii sunt unitatea naturală pentru analiza matematică și calcul. | ⚠️ **Intuibilitate:** Gradele sunt adesea mai ușor de vizualizat pentru oameni. |
| 📊 **Performanță:** Algoritmul de conversie este extrem de rapid, implicând o singură înmulțire. | 📉 **Precizie:** Poate apărea o ușoară pierdere de precizie din cauza constantei $\pi$ (floating point). |

## 🔢 **Analiză Matematică și Complexitate**
Formula de conversie se bazează pe identitatea $180^\circ = \pi \text{ rad}$:
$$ \text{radiani} = \text{grade} \times \frac{\pi}{180} $$

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(1)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**
- **Grafică pe Calculator:** Rotirea obiectelor 2D/3D (majoritatea bibliotecilor folosesc radiani).
- **Fizică și Inginerie:** Calcularea vitezei unghiulare și a accelerației centripete.
- **Navigație:** Transformarea coordonatelor geografice în calcule matematice.
