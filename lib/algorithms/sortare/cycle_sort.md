<!-- custom-doc -->
# Cycle Sortare

Cycle Sortare este un algoritm de sortare in-place, care are ca scop organizarea unui set de date prin mutarea elementelor în pozițiile lor corecte, minimizând numărul de scrieri. Este un algoritm eficient pentru sortarea unui tablou, având o complexitate de timp de $O(n^2)$, dar se distinge prin faptul că efectuează un număr minim de scrieri, ceea ce îl face util în anumite aplicații.

## Reprezentare Vizuală

Considerăm un exemplu simplu de sortare a unui tablou: `[3, 1, 5, 2]`.

1. **Pasul 1**: Identificăm elementul curent (3) și determinăm poziția sa corectă (2).
2. **Pasul 2**: Mutăm elementele pentru a face loc pentru 3.

```
Index:   0   1   2   3
Array: [3] [1] [5] [2]
```
După mutarea elementului 3:
```
Index:   0   1   2   3
Array: [2] [1] [5] [3]
```
Continuăm procesul pentru fiecare element până când tabloul este complet sortat.

```
Index:   0   1   2   3
Array: [1] [2] [3] [5]
```

## Matematică / Logică

Algoritmul funcționează prin identificarea poziției corecte a fiecărui element și mutarea acestuia. Complexitatea sa de timp este dată de formula:

$$
T(n) = n + (n-1) + (n-2) + ... + 1 = \frac{n(n-1)}{2} = O(n^2)
$$

## Tabel de Complextitate

| Caz               | Complexitate Timp | Complexitate Spațiu |
|-------------------|-------------------|---------------------|
| Cel mai bun       | $O(n^2)$          | $O(1)$              |
| Caz mediu         | $O(n^2)$          | $O(1)$              |
| Cel mai rău       | $O(n^2)$          | $O(1)$              |

## Avantaje și Dezavantaje

**Avantaje:**
- Eficient în ceea ce privește numărul de scrieri.
- Algoritm in-place, nu necesită memorie suplimentară semnificativă.
- Stabil în anumite implementări.

**Dezavantaje:**
- Complexitate de timp $O(n^2)$, ineficient pentru seturi mari de date.
- Nu este un algoritm stabil în mod implicit.

## Aplicații Practice

Cycle Sortare este utilizat în aplicații unde numărul de scrieri este critic, cum ar fi:
- Sortarea datelor în memorie limitată.
- Sortarea datelor în sisteme de fișiere unde scrierea pe disc este costisitoare.
- Algoritmi de sortare în bazele de date care necesită minimizarea operațiunilor de scriere.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*