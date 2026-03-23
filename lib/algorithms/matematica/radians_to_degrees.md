<!-- custom-doc -->
# Radians To Degrees

Conversia radianilor în grade este un proces matematic esențial în domeniul trigonometriei, care permite transformarea unui unghi exprimat în radiani într-un unghi echivalent exprimat în grade. Această conversie este utilă în diverse aplicații, inclusiv în programare, grafică computerizată și inginerie.

## Reprezentare Vizuală

Pentru a înțelege mai bine procesul de conversie, putem utiliza următoarea formulă:

```
Grade = Radiani * (180 / π)
```

### Exemplu Pas cu Pas

Să considerăm un exemplu în care dorim să convertim 1 radian în grade:

1. Aplicăm formula:
   - Grade = 1 * (180 / π)
2. Calculăm valoarea:
   - Grade ≈ 1 * 57.2958 ≈ 57.30 grade

```
+-----------+-----------------+
| Radiani   | Grade           |
+-----------+-----------------+
| 0         | 0               |
| π/6       | 30              |
| π/4       | 45              |
| π/3       | 60              |
| π/2       | 90              |
| π         | 180             |
| 2π        | 360             |
+-----------+-----------------+
```

## Matematică / Logică

Formula de conversie între radiani și grade este derivată din definiția unghiurilor în cercul trigonometric. Un cerc complet are o măsură de $2\pi$ radiani, care corespunde la 360 de grade. Astfel, raportul dintre grade și radiani este:

$$
\frac{360 \text{ grade}}{2\pi \text{ radiani}} = \frac{180}{\pi}
$$

## Tabel de Complextitate

| Caz          | Complexitate Timp | Complexitate Spațiu |
|--------------|-------------------|---------------------|
| Cel mai bun  | O(1)              | O(1)                |
| Mediu        | O(1)              | O(1)                |
| Cel mai rău  | O(1)              | O(1)                |

## Avantaje și Dezavantaje

### Avantaje
- Simplifică calculele trigonometrice.
- Ușor de implementat în coduri de programare.
- Utilizare frecventă în grafică și simulări.

### Dezavantaje
- Poate provoca confuzii pentru cei care nu sunt familiarizați cu unitățile de măsură.
- Necesită o conversie suplimentară în anumite aplicații, ceea ce poate introduce erori.

## Aplicații Practice

Conversia radianilor în grade este utilizată în diverse domenii, inclusiv:
- Programarea grafică, unde unghiurile sunt adesea exprimate în grade.
- Simulările fizice, unde este necesară o precizie în calculul unghiurilor.
- Navigația, unde unghiurile de direcție sunt frecvent exprimate în grade.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*