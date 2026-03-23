<!-- custom-doc -->
# Coadă Stivă Coadă

Coadă Stivă Coadă este o structură de date care combină caracteristicile unei cozi și ale unei stive. Aceasta permite adăugarea și eliminarea elementelor în moduri specifice, având la bază principiile FIFO (First In, First Out) pentru coadă și LIFO (Last In, First Out) pentru stivă. Această structură este utilă în diverse aplicații, unde este necesară gestionarea eficientă a datelor.

## Reprezentare Vizuală

O reprezentare simplificată a unei cozi stivă coadă poate fi ilustrată astfel:

```
+---+   +---+   +---+
| 1 |   | 2 |   | 3 |
+---+   +---+   +---+
|   |   |   |   |   |
|   |   |   |   |   |
+---+   +---+   +---+
```

În această diagramă, elementele sunt adăugate în stivă (LIFO) și apoi extrase în ordine inversă. De exemplu, dacă adăugăm elementele 1, 2, 3, iar apoi le extragem, ordinea de extragere va fi 3, 2, 1.

### Exemplu Pas cu Pas

1. Adăugăm elementul 1.
2. Adăugăm elementul 2.
3. Adăugăm elementul 3.
4. Extragem elementul (se va extrage 3).
5. Extragem următorul element (se va extrage 2).
6. Extragem ultimul element (se va extrage 1).

## Matematică / Logică

Complexitatea temporală a operațiunilor de bază (adăugare și extragere) este $O(1)$, ceea ce înseamnă că timpul necesar pentru a efectua aceste operațiuni nu depinde de dimensiunea structurii de date.

## Tabel de Complextitate

| Operațiune       | Caz Favorabil | Caz Mediu | Caz Defavorabil |
|------------------|---------------|-----------|------------------|
| Adăugare         | $O(1)$        | $O(1)$    | $O(1)$           |
| Extracție        | $O(1)$        | $O(1)$    | $O(1)$           |
| Spațiu           | $O(n)$        | $O(n)$    | $O(n)$           |

## Avantaje și Dezavantaje

**Avantaje:**
- Permite gestionarea eficientă a datelor.
- Timp constant pentru operațiunile de adăugare și extragere.
- Utilizare simplă și intuitivă.

**Dezavantaje:**
- Limitarea dimensiunii stivei poate duce la pierderi de date.
- Nu permite accesul aleator la elemente, ci doar la cele din vârf.

## Aplicații Practice

Coadă Stivă Coadă este utilizată în diverse domenii, cum ar fi:
- Gestionarea sarcinilor în sistemele de operare.
- Implementarea algoritmilor de backtracking.
- Procesarea datelor în aplicații de tip browser, unde se utilizează stive pentru gestionarea istoricului navigării.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*