<!-- custom-doc -->

# 🚀 **Numere Hexagonale**

## 📝 **Descriere**

Un **Număr Hexagonal** este un număr figurativ care poate fi reprezentat sub forma unui hexagon regulat. Acestea fac parte dintr-o clasă mai largă de numere poligonale. Secvența crește mai rapid decât numerele triunghiulare sau pătratice, reprezentând puncte care pot fi aranjate pentru a forma hexagoane concentrice.

## 🖼️ **Reprezentare Vizuală**

![Hexagonal Numbers](/docs-images/matematica/series_hexagonal_numbers.svg)
<!-- external-visual -->
![Resursă vizuală externă (matematica)](https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg)


```text
n=1:  ●  (1)

n=2:  ● ●  (6)
     ●   ●
      ● ●

n=3:  ● ● ● (15)
     ●     ●
    ●   ●   ●
     ●     ●
      ● ● ●
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| ✅ **Eficiență:** Formula de calcul este o simplă expresie polinomială de gradul 2, calculabilă instant. | ⚠️ **Vizualizare:** Devine extrem de dificil de reprezentat manual pentru valori mari ale lui $n$. |
| ✅ **Proprietăți Teoretice:** Orice număr hexagonal este și un număr triunghiular. | ❌ **Utilizare Nișată:** Mai puțin întâlnit în algoritmi comerciali comparativ cu numerele prime. |

## 🔢 **Analiză Matematică și Complexitate**

Al $n$-lea număr hexagonal $H_n$ este definit de formula: $H_n = n(2n - 1)$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(1)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Teoria Numerelor:** Demonstrarea Teoremei numerelor poligonale a lui Fermat.
- **Geometrie Combinatorială:** Aranjamente de obiecte în rețele hexagonale (ex: fagurii de miere).
- **Cristalografie:** Modelarea structurilor atomice care urmează simetrii hexagonale.
- **Design de Jocuri:** Generarea de hărți bazate pe tile-uri hexagonale (hex-grids).
