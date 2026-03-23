<!-- custom-doc -->
# Pronic Number

Un număr pronic este un număr care poate fi exprimat ca produsul a două numere consecutive. În termeni matematici, un număr pronic poate fi definit ca $n(n + 1)$, unde $n$ este un număr întreg. De exemplu, numerele pronic sunt 0, 2, 6, 12, 20, 30, etc.

## Reprezentare Vizuală

Iată o reprezentare vizuală a primelor numere pronic:

```
n = 0:  0 * (0 + 1) = 0
n = 1:  1 * (1 + 1) = 2
n = 2:  2 * (2 + 1) = 6
n = 3:  3 * (3 + 1) = 12
n = 4:  4 * (4 + 1) = 20
n = 5:  5 * (5 + 1) = 30
```

## Matematică / Logică

Numerele pronic pot fi descrise prin formula:

$$
P(n) = n(n + 1)
$$

unde $P(n)$ reprezintă numărul pronic corespunzător lui $n$. De exemplu, pentru $n = 3$:

$$
P(3) = 3(3 + 1) = 3 \cdot 4 = 12
$$

## Tabel de Complextitate

| Caz               | Complexitate Timp | Complexitate Spațiu |
|-------------------|-------------------|---------------------|
| Cel mai bun       | $O(1)$            | $O(1)$              |
| Caz mediu         | $O(1)$            | $O(1)$              |
| Cel mai rău      | $O(1)$            | $O(1)$              |

## Avantaje și Dezavantaje

### Avantaje
- Ușor de calculat și de implementat.
- Se pot genera rapid folosind o simplă formulă matematică.
- Util în diverse aplicații matematice și computaționale.

### Dezavantaje
- Numai numerele întregi pot fi considerate pronic.
- Nu toate numerele au o reprezentare pronic (de exemplu, numerele prime).

## Aplicații Practice

Numerele pronic sunt utilizate în diverse domenii, inclusiv:
- Teoria numerelor, pentru studii de clasificare a numerelor.
- Algoritmi de optimizare, unde se pot utiliza pentru a determina limitele de resurse.
- Probleme de combinatorică, în care se analizează aranjamentele și combinațiile de obiecte.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*