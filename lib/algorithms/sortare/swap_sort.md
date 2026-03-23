<!-- custom-doc -->
# Swap Sortare

Swap Sortare este un algoritm de sortare simplu care funcționează prin compararea perechilor de elemente și schimbarea lor de loc dacă sunt în ordine greșită. Acest algoritm continuă să parcurgă lista de elemente până când nu mai sunt necesare swap-uri, indicând astfel că lista este sortată.

## Reprezentare Vizuală

Considerăm un exemplu cu un vector de numere: `[5, 3, 8, 4, 2]`.

1. Comparăm 5 și 3. Deoarece 5 > 3, le schimbăm locurile.
   ```
   [3, 5, 8, 4, 2]
   ```

2. Comparăm 5 și 8. Nu schimbăm.
   ```
   [3, 5, 8, 4, 2]
   ```

3. Comparăm 8 și 4. Deoarece 8 > 4, le schimbăm locurile.
   ```
   [3, 5, 4, 8, 2]
   ```

4. Comparăm 8 și 2. Deoarece 8 > 2, le schimbăm locurile.
   ```
   [3, 5, 4, 2, 8]
   ```

5. Continuăm să parcurgem lista până când nu mai sunt necesare swap-uri. După mai multe iterații, obținem lista sortată:
   ```
   [2, 3, 4, 5, 8]
   ```

## Matematică / Logică

Algoritmul Swap Sortare poate fi descris prin următoarea logică:

- La fiecare iterație, se compară fiecare element cu următorul.
- Dacă elementul curent este mai mare decât următorul, se efectuează un swap.
- Acest proces se repetă până când nu mai sunt swap-uri necesare.

Complexitatea temporală a algoritmului este dată de formula:
$$
O(n^2)
$$
unde $n$ este numărul de elemente din lista de sortat.

## Tabel de Complextitate

| Caz               | Complexitate Timp | Complexitate Spațiu |
|-------------------|-------------------|---------------------|
| Cel mai bun       | $O(n)$            | $O(1)$              |
| Caz mediu         | $O(n^2)$          | $O(1)$              |
| Cel mai rău      | $O(n^2)$          | $O(1)$              |

## Avantaje și Dezavantaje

**Avantaje:**
- Simplu de implementat și înțeles.
- Nu necesită memorie suplimentară semnificativă (spațiu constant).

**Dezavantaje:**
- Ineficient pentru liste mari (complexitate $O(n^2)$).
- Nu este stabil, adică nu păstrează ordinea elementelor egale.

## Aplicații Practice

Swap Sortare este utilizat în aplicații simple unde eficiența nu este o problemă majoră, cum ar fi:
- Sortarea listelor mici de date.
- Educația și învățarea conceptelor de bază ale algoritmilor de sortare.
- Implementări rapide în prototipuri sau aplicații cu cerințe de performanță scăzute.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*