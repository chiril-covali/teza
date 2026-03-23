<!-- custom-doc -->
# Degrees To Radians

Conversia dintre grade și radiani este un proces esențial în matematică și în special în trigonometrie. Un grad este o unitate de măsură a unghiurilor, iar radianul este o altă unitate utilizată frecvent în calculele matematice, în special în analiza funcțiilor trigonometrice.

## Reprezentare Vizuală

Pentru a înțelege mai bine conversia, putem folosi următoarea diagramă ASCII:

```
       +-------------------+
       |                   |
       |        180°      |
       |                   |
       |                   |
       |                   |
       +-------------------+
               |
               |  (π rad)
               |
       +-------------------+
       |                   |
       |        90°       |
       |                   |
       |                   |
       |                   |
       +-------------------+
               |
               |  (π/2 rad)
               |
```

### Exemplu Pas cu Pas

Pentru a converti 90° în radiani:

1. Formula de conversie este:
   $$ \text{radiani} = \text{grade} \times \frac{\pi}{180} $$
2. Aplicăm formula:
   $$ 90° \times \frac{\pi}{180} = \frac{\pi}{2} \text{ radiani} $$

## Matematică / Logică

Formula generală pentru conversia din grade în radiani este:
$$ R = D \times \frac{\pi}{180} $$
unde:
- $R$ reprezintă unghiul în radiani,
- $D$ reprezintă unghiul în grade,
- $\pi$ este o constantă matematică (aproximativ 3.14159).

## Tabel de Complextitate

| Caz               | Complexitate Timp | Complexitate Spațiu |
|-------------------|-------------------|---------------------|
| Cel mai bun       | O(1)              | O(1)                |
| Mediu             | O(1)              | O(1)                |
| Cel mai rău      | O(1)              | O(1)                |

## Avantaje și Dezavantaje

### Avantaje:
- Conversia este rapidă și eficientă.
- Permite utilizarea funcțiilor trigonometrice standard în programare.
- Este esențială în aplicații de inginerie și fizică.

### Dezavantaje:
- Necesită cunoașterea formulei de conversie.
- Poate duce la confuzii între unități dacă nu este utilizată corect.

## Aplicații Practice

Conversia din grade în radiani este utilizată în diverse domenii, cum ar fi:
- Programarea grafică, unde unghiurile sunt adesea exprimate în radiani.
- Simulări fizice, unde mișcarea circulară este analizată.
- Calculatoare științifice și software de inginerie care necesită funcții trigonometrice.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*