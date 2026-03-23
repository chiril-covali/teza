<!-- custom-doc -->
# Gnome Sortare

Gnome Sortare este un algoritm de sortare simplu, similar cu algoritmul de sortare prin inserție, dar cu o abordare diferită în ceea ce privește mișcarea elementelor. Acest algoritm funcționează prin compararea perechilor de elemente adiacente și prin schimbarea lor de poziție dacă sunt în ordine greșită, având o logică similară cu cea a unui gnom care își aranjează florile.

## Reprezentare Vizuală

Considerăm un exemplu cu un vector de numere: `[5, 3, 2, 4, 1]`.

1. Pasul inițial:
```
Index:  0  1  2  3  4
Vector: 5  3  2  4  1
```
2. Comparăm 5 și 3:
```
Index:  0  1  2  3  4
Vector: 3  5  2  4  1
```
3. Comparăm 5 și 2:
```
Index:  0  1  2  3  4
Vector: 3  2  5  4  1
```
4. Comparăm 5 și 4:
```
Index:  0  1  2  3  4
Vector: 3  2  4  5  1
```
5. Comparăm 5 și 1:
```
Index:  0  1  2  3  4
Vector: 3  2  4  1  5
```
6. Revenim la 4 și 1:
```
Index:  0  1  2  3  4
Vector: 3  2  1  4  5
```
7. Continuăm procesul până când vectorul devine sortat:
```
Index:  0  1  2  3  4
Vector: 1  2  3  4  5
```

## Matematică / Logică

Gnome Sortare utilizează o abordare de tip "backtracking" pentru a sorta elementele. Complexitatea temporală a acestui algoritm este în general $O(n^2)$ în cel mai rău caz, similar cu Bubble Sort și Insertion Sort. Algoritmul poate fi descris prin următoarea logică:

1. Compară elementul curent cu următorul.
2. Dacă elementul curent este mai mare, schimbă-le.
3. Mergi la elementul anterior dacă ai făcut un schimb, altfel, continuă cu următorul element.

## Tabel de Complextitate

| Caz                | Complexitate Timp | Complexitate Spațiu |
|--------------------|-------------------|---------------------|
| Cel mai bun caz    | $O(n)$            | $O(1)$              |
| Caz mediu          | $O(n^2)$          | $O(1)$              |
| Cel mai rău caz    | $O(n^2)$          | $O(1)$              |

## Avantaje și Dezavantaje

**Avantaje:**
- Simplu de implementat și de înțeles.
- Nu necesită memorie suplimentară semnificativă (spațiu constant).

**Dezavantaje:**
- Ineficient pentru liste mari de date.
- Complexitate temporală mare în cel mai rău caz.

## Aplicații Practice

Gnome Sortare este rar utilizat în aplicații practice din cauza eficienței sale reduse, dar poate fi folosit în scopuri educaționale pentru a ilustra conceptele de bază ale algoritmilor de sortare. De asemenea, poate fi utilizat în situații în care lista de date este mică și unde implementarea rapidă este mai importantă decât eficiența.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*