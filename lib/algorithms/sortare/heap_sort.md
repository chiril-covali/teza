<!-- custom-doc -->
# Heap Sortare

Heap Sortare este un algoritm de sortare bazat pe structura de date numită heap, care este o variantă a unui arbore binar. Acest algoritm transformă un tablou într-un heap, apoi extrage elementele din heap pentru a le plasa în ordinea corectă. Heap Sortare are o complexitate de timp de $O(n \log n)$, ceea ce îl face eficient pentru sortarea unor colecții mari de date.

## Reprezentare Vizuală

Un heap este o structură de date care satisface proprietatea heap-ului: pentru un heap maxim, fiecare nod părinte este mai mare sau egal cu nodurile sale fiice. Iată un exemplu de heap maxim:

```
        10
       /  \
      9    8
     / \  / \
    7  6 5   4
```

### Exemplu Pas cu Pas

Să sortăm tabloul `[4, 10, 3, 5, 1]` folosind Heap Sortare:

1. Construim heap-ul maxim:
```
        10
       /  \
      5    8
     / \  / \
    4  1 3
```

2. Extragem elementul maxim (10) și plasăm ultimul element (1) la rădăcină, apoi ajustăm heap-ul:
```
        5
       /  \
      4    3
     / \
    1  8
```

3. Continuăm procesul până când toate elementele sunt sortate:
```
Sortare finală: [1, 3, 4, 5, 10]
```

## Matematică / Logică

Complexitatea temporală a algoritmului Heap Sortare este dată de formula:

- Construirea heap-ului: $O(n)$
- Extracția elementului maxim: $O(\log n)$

Astfel, complexitatea totală este:

$$O(n + n \log n) = O(n \log n)$$

## Tabel de Complextitate

| Caz                | Complexitate Timp | Complexitate Spațiu |
|--------------------|-------------------|---------------------|
| Cel mai bun        | $O(n \log n)$     | $O(1)$              |
| Caz mediu         | $O(n \log n)$     | $O(1)$              |
| Cel mai rău       | $O(n \log n)$     | $O(1)$              |

## Avantaje și Dezavantaje

### Avantaje
- Stabilitatea în timp: $O(n \log n)$ în toate cazurile.
- Spațiu constant: nu necesită memorie suplimentară semnificativă.
- Funcționează bine pe date mari.

### Dezavantaje
- Nu este un algoritm stabil de sortare.
- Performanța poate fi mai slabă comparativ cu alte algoritmi de sortare pentru date mici.

## Aplicații Practice

Heap Sortare este utilizat în diverse aplicații, inclusiv:
- Sortarea listelor mari de date.
- Implementarea structurilor de date de tip priority queue.
- Algoritmi de scheduling în sisteme de operare.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*