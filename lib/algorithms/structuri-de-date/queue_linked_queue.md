<!-- custom-doc -->
# Coadă Înlănțuită Coadă

Coadă Înlănțuită Coadă este o structură de date care permite stocarea și gestionarea elementelor într-o ordine specifică, utilizând o abordare bazată pe noduri înlănțuite. Spre deosebire de o coadă standard, care este adesea implementată folosind un tablou sau o listă, coada înlănțuită utilizează noduri care conțin referințe către următorul nod, permițând astfel o gestionare dinamică a memoriei.

## Reprezentare Vizuală

Structura unei cozi înlănțuite poate fi reprezentată astfel:

```
+------+    +------+    +------+
|  1   | -> |  2   | -> |  3   |
+------+    +------+    +------+
```

Fiecare nod conține un element și o referință către următorul nod din coadă. În acest exemplu, nodul 1 este primul element, urmat de nodul 2 și nodul 3.

### Exemplu Pas cu Pas

1. **Adăugare Element**: Adăugăm elementul 4 în coadă.
```
+------+    +------+    +------+    +------+
|  1   | -> |  2   | -> |  3   | -> |  4   |
+------+    +------+    +------+    +------+
```
2. **Eliminare Element**: Eliminăm elementul 1.
```
+------+    +------+    +------+
|  2   | -> |  3   | -> |  4   |
+------+    +------+    +------+
```

## Matematică / Logică

Complexitatea temporală a operațiunilor de bază ale cozii înlănțuite este dată de următoarele formule:

- Adăugare (enqueue): $O(1)$
- Eliminare (dequeue): $O(1)$
- Accesare (peek): $O(1)$

## Tabel de Complextitate

| Operație   | Cel Mai Bun | Mediu   | Cel Mai Rău |
|------------|-------------|---------|--------------|
| Adăugare   | $O(1)$      | $O(1)$  | $O(1)$       |
| Eliminare  | $O(1)$      | $O(1)$  | $O(1)$       |
| Accesare   | $O(1)$      | $O(1)$  | $O(1)$       |

## Avantaje și Dezavantaje

**Avantaje:**
- Utilizare eficientă a memoriei prin alocarea dinamică a nodurilor.
- Operații de adăugare și eliminare rapide, în timp constant.
- Flexibilitate în gestionarea dimensiunii cozii.

**Dezavantaje:**
- Necesită gestionarea manuală a memoriei, ceea ce poate duce la scurgeri de memorie dacă nu este gestionată corect.
- Accesul la elemente intermediare este mai lent comparativ cu o coadă implementată pe un tablou.

## Aplicații Practice

Coadă Înlănțuită Coadă este utilizată în diverse aplicații, cum ar fi:
- Gestionarea sarcinilor în sistemele de operare (scheduler).
- Implementarea algoritmilor de căutare în lățime (BFS) în grafuri.
- Cozi de așteptare pentru resurse partajate în aplicații distribuite.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*