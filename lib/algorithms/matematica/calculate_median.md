<!-- custom-doc -->
# 🚀 **Mediana (Median)**

## 📝 **Descriere**
**Mediana** este valoarea care separă jumătatea superioară a unui set de date de jumătatea inferioară. Spre deosebire de medie, mediana nu este influențată de valorile extreme (outliers), fiind o măsură mai robustă a centrului setului de date. Pentru a o calcula, datele trebuie mai întâi sortate.

## 🖼️ **Reprezentare Vizuală**
![Median Visualization](https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Comparison_mean_median_mode.svg/400px-Comparison_mean_median_mode.svg.png)

**Diagramă ASCII (Exemplu):**
```text
Date nesortate: [7, 1, 3, 9, 2]
Date sortate  : [1, 2, 3, 7, 9]
                       ^
Mediana este valoarea din mijloc: 3
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Robustitate:** Nu este afectată de valori aberante (ex: un salariu de 1 milion într-o grupă de 1000 lei). | ⚠️ **Cost Calcul:** Necesită sortarea prealabilă a datelor, ceea ce este mai costisitor decât o simplă sumă. |
| 📊 **Reprezentativitate:** Reflectă mai bine realitatea în distribuții asimetrice. | 📉 **Eficiență:** Ineficientă pe fluxuri de date (streaming) fără algoritmi speciali. |

## 🔢 **Analiză Matematică și Complexitate**
Dacă $n$ este impar, mediana este elementul de pe poziția $(n+1)/2$.
Dacă $n$ este par, mediana este media celor două valori centrale.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Sortare inclusă)** | $O(n \log n)$ |
| **Timp (QuickSelect)** | $O(n)$ |
| **Spațiu (Space)** | $O(1)$ sau $O(n)$ (în funcție de sortare) |

## 💡 **Aplicații Practice**
- **Economie:** Calcularea venitului median (mai relevant decât venitul mediu).
- **Imobiliare:** Determinarea prețului median al caselor într-o zonă.
- **Prelucrarea Imaginilor:** Filtrul median pentru eliminarea zgomotului de tip "sare și piper".
