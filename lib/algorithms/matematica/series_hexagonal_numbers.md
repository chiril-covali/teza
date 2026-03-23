<!-- custom-doc -->
# Series Hexagonal Numbers

Numerele hexagonale sunt o serie de numere figurative care pot fi reprezentate sub formă de hexagoane. Fiecare număr hexagonal poate fi calculat folosind formula generală:

$$ H_n = n(2n - 1) $$

unde $H_n$ reprezintă al $n$-lea număr hexagonal, iar $n$ este un număr natural.

## Reprezentare Vizuală

Numerele hexagonale pot fi reprezentate grafic prin aranjarea punctelor în formă de hexagon. Iată o reprezentare simplificată a primelor câteva numere hexagonale:

```
   1
  2 3 4
 5 6 7 8 9
10 11 12 13 14 15
```

### Exemplu pas cu pas

Calculul primelor cinci numere hexagonale:

- $H_1 = 1(2 \cdot 1 - 1) = 1$
- $H_2 = 2(2 \cdot 2 - 1) = 6$
- $H_3 = 3(2 \cdot 3 - 1) = 15$
- $H_4 = 4(2 \cdot 4 - 1) = 28$
- $H_5 = 5(2 \cdot 5 - 1) = 45$

Astfel, primele cinci numere hexagonale sunt: 1, 6, 15, 28, 45.

## Matematică / Logică

Numerele hexagonale sunt o extensie a numerelor triunghiulare. Formula generală pentru al $n$-lea număr hexagonal este derivată din suma primelor $n$ numere triunghiulare:

$$ H_n = \sum_{k=1}^{n} (2k - 1) $$

Aceasta poate fi demonstrată prin inducție matematică.

## Tabel de Complextitate

| Caz                | Timp (Time Complexity) | Spațiu (Space Complexity) |
|--------------------|------------------------|----------------------------|
| Cel mai bun (Best) | $O(1)$                 | $O(1)$                     |
| Mediu (Average)    | $O(1)$                 | $O(1)$                     |
| Cel mai rău (Worst)| $O(1)$                 | $O(1)$                     |

## Avantaje și Dezavantaje

### Avantaje
- Ușor de calculat folosind formula simplă.
- Reprezentare geometrică clară.
- Utilizare în diverse domenii matematice și științifice.

### Dezavantaje
- Nu sunt la fel de cunoscute ca alte serii de numere figurative.
- Aplicabilitate limitată în problemele practice comparativ cu alte structuri de date.

## Aplicații Practice

Numerele hexagonale au aplicații în teoria numerelor, combinatorică și geometrie. De asemenea, ele pot fi folosite în modelarea unor structuri naturale sau în algoritmi care implică aranjamente geometrice.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*