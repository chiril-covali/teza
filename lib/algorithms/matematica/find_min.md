<!-- custom-doc -->
# Find Min

Find Min este un algoritm utilizat pentru a determina valoarea minimă dintr-o colecție de date, cum ar fi un array sau o listă. Acesta parcurge fiecare element al colecției și compară valorile pentru a identifica cea mai mică valoare.

## Reprezentare Vizuală

Considerăm un array de numere: `[5, 3, 8, 1, 4]`. Algoritmul Find Min va parcurge acest array pas cu pas:

```
Pas 1: 5 (min = 5)
Pas 2: 3 (min = 3)
Pas 3: 8 (min = 3)
Pas 4: 1 (min = 1)
Pas 5: 4 (min = 1)

Valoarea minimă este 1.
```

## Matematică / Logică

Algoritmul Find Min poate fi descris prin următoarea logică:

1. Inițializăm o variabilă `min` cu prima valoare a array-ului.
2. Parcurgem fiecare element al array-ului:
   - Dacă un element este mai mic decât `min`, actualizăm `min`.
3. La final, `min` va conține valoarea minimă.

Complexitatea temporală a acestui algoritm este $O(n)$, unde $n$ este numărul de elemente din array.

## Tabel de Complextitate

| Caz          | Timp (Time Complexity) | Spațiu (Space Complexity) |
|--------------|------------------------|----------------------------|
| Cel mai bun  | $O(1)$                 | $O(1)$                     |
| Mediu       | $O(n)$                 | $O(1)$                     |
| Cel mai rău | $O(n)$                 | $O(1)$                     |

## Avantaje și Dezavantaje

**Avantaje:**
- Simplu de implementat.
- Eficient pentru colecții mici și medii.
- Nu necesită memorie suplimentară semnificativă.

**Dezavantaje:**
- Poate deveni ineficient pentru colecții foarte mari.
- Necesită parcurgerea întregii colecții, ceea ce poate duce la un timp de execuție mai lung.

## Aplicații Practice

Algoritmul Find Min este utilizat în diverse aplicații, cum ar fi:
- Găsirea celui mai mic preț dintr-o listă de produse.
- Determinarea celei mai mici valori dintr-un set de date statistice.
- Optimizarea resurselor în algoritmi de căutare și sortare.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*