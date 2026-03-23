<!-- custom-doc -->
# Quick Select

Quick Select este un algoritm eficient utilizat pentru a găsi k-ul cel mai mic element dintr-un array nesortat. Este o variantă a algoritmului Quick Sort, dar în loc să sorteze întregul array, se concentrează pe a găsi un singur element, ceea ce îl face mai rapid în anumite scenarii.

## Reprezentare Vizuală

Considerăm array-ul următor: `[3, 6, 2, 7, 5, 1, 4]` și dorim să găsim al 3-lea cel mai mic element (k=3).

1. Alegem un pivot, de exemplu, `4`.
2. Reorganizăm array-ul în funcție de pivot:

```
Initial:      [3, 6, 2, 7, 5, 1, 4]
După pivot:   [3, 2, 1, 4, 5, 7, 6]
```

3. Comparăm poziția pivotului cu k:

```
Index Pivot:  3 (elementul 4)
K:            3
```

Deoarece indexul pivotului este exact k, am găsit elementul dorit: `4`.

## Matematică / Logică

Algoritmul Quick Select funcționează pe baza divizării array-ului în sub-array-uri, similar cu Quick Sort. Complexitatea sa temporală este dată de:

- Cazul mediu: $O(n)$
- Cazul cel mai rău: $O(n^2)$ (când pivotul ales este întotdeauna cel mai mic sau cel mai mare element)

## Tabel de Complextitate

| Caz                | Complexitate Timp | Complexitate Spațiu |
|--------------------|-------------------|---------------------|
| Cel mai bun        | $O(n)$            | $O(1)$              |
| Caz mediu          | $O(n)$            | $O(1)$              |
| Cel mai rău       | $O(n^2)$          | $O(1)$              |

## Avantaje și Dezavantaje

**Avantaje:**
- Eficient pentru găsirea unui singur element.
- Spațiu de memorie constant $O(1)$.
- Funcționează bine pe array-uri mari.

**Dezavantaje:**
- Cazul cel mai rău poate fi ineficient ($O(n^2)$).
- Necesită o alegere bună a pivotului pentru a menține eficiența.

## Aplicații Practice

- Găsirea mediei, medianei sau altor statistici descriptive într-un set de date.
- Algoritmi de selecție în baze de date și aplicații de procesare a datelor.
- Probleme de optimizare în care se caută un element specific dintr-un set nesortat.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*