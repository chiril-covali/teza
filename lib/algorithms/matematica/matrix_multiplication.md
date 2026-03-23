<!-- custom-doc -->
# 🚀 **Înmulțirea Matricelor (Matrix Multiplication)**

## 📝 **Descriere**
**Înmulțirea Matricelor** este o operație binară care produce o matrice dintr-o pereche de matrice. Pentru ca produsul $C = A \times B$ să fie definit, numărul de coloane ale primei matrice $A$ trebuie să fie egal cu numărul de rânduri ale celei de-a doua matrice $B$. Fiecare element $c_{ij}$ al matricei rezultat este obținut prin produsul scalar al rândului $i$ din $A$ cu coloana $j$ din $B$.

## 🖼️ **Reprezentare Vizuală**
![Matrix Multiplication](https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Matrix_multiplication_diagram.svg/400px-Matrix_multiplication_diagram.svg.png)

**Diagramă ASCII (Proces):**
```text
A (2x3) x B (3x2) = C (2x2)

[ a11 a12 a13 ]   [ b11 b12 ]   [ c11 c12 ]
[ a21 a22 a23 ] x [ b21 b22 ] = [ c21 c22 ]
                  [ b31 b32 ]

c11 = (a11*b11) + (a12*b21) + (a13*b31)
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Esențial:** Baza pentru aproape toate calculele în grafica 3D și AI. | ⚠️ **Complexitate:** Algoritmul standard este lent pentru matrice foarte mari ($O(n^3)$). |
| 📊 **Paralelizare:** Operația poate fi ușor împărțită pentru a rula pe mai multe nuclee sau GPU. | 📉 **Memorie:** Rezultatul necesită un spațiu nou de stocare de dimensiune $m \times p$. |

## 🔢 **Analiză Matematică și Complexitate**
Dacă $A$ este $m \times n$ și $B$ este $n \times p$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Standard)** | $O(m \cdot n \cdot p)$ |
| **Timp (Strassen)** | $O(n^{2.807})$ |
| **Spațiu (Space)** | $O(m \cdot p)$ |

## 💡 **Aplicații Practice**
- **Inteligență Artificială:** Antrenarea rețelelor neuronale (Deep Learning).
- **Grafică pe Calculator:** Transformări geometrice (rotații, scalări, proiecții).
- **Criptografie:** Implementarea unor algoritmi de criptare bazați pe matrice.
