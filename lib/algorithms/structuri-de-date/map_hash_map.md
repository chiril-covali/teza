<!-- custom-doc -->
# Hartă Hash Hartă

Harta Hash Hartă este o structură de date care asociază chei cu valori, utilizând o funcție de hash pentru a determina indexul în care sunt stocate valorile. Această structură permite accesul rapid la date, având un timp mediu de acces constant, $O(1)$, datorită distribuției eficiente a datelor.

## Reprezentare Vizuală

O hartă hash poate fi reprezentată printr-un array în care fiecare index conține o listă de perechi cheie-valoare. Iată un exemplu simplu:

```
Index:   0       1       2       3       4
        +-------+-------+-------+-------+-------+
        |       |       |       |       |       |
        |       |       |       |       |       |
        +-------+-------+-------+-------+-------+
        |       |       |       |       |       |
        |       |       |       |       |       |
        +-------+-------+-------+-------+-------+
        |       |       |       |       |       |
        |       |       |       |       |       |
        +-------+-------+-------+-------+-------+
```

Să presupunem că dorim să inserăm următoarele perechi cheie-valoare: (1, "A"), (2, "B"), (3, "C"). Funcția de hash folosită este simplă: $hash(key) = key \mod 5$.

1. `hash(1) = 1` → Stocăm "A" la indexul 1.
2. `hash(2) = 2` → Stocăm "B" la indexul 2.
3. `hash(3) = 3` → Stocăm "C" la indexul 3.

Reprezentarea finală va fi:

```
Index:   0       1       2       3       4
        +-------+-------+-------+-------+-------+
        |       |  (1, A)| (2, B)| (3, C)|       |
        +-------+-------+-------+-------+-------+
```

## Matematică / Logică

Complexitatea timpului pentru operațiile de inserare, căutare și ștergere într-o hartă hash este, în medie, $O(1)$, dar în cel mai rău caz poate ajunge la $O(n)$, atunci când toate cheile sunt mapate la același index (coliziune). Formula generală pentru complexitatea timpului este:

- Căutare: $O(1)$ (medie), $O(n)$ (rău)
- Inserare: $O(1)$ (medie), $O(n)$ (rău)
- Ștergere: $O(1)$ (medie), $O(n)$ (rău)

## Tabel de Complextitate

| Operație  | Caz Favorabil | Caz Mediu | Caz Defavorabil |
|-----------|----------------|-----------|-----------------|
| Căutare   | $O(1)$         | $O(1)$    | $O(n)$          |
| Inserare  | $O(1)$         | $O(1)$    | $O(n)$          |
| Ștergere  | $O(1)$         | $O(1)$    | $O(n)$          |

## Avantaje și Dezavantaje

**Avantaje:**
- Acces rapid la date (timp constant mediu).
- Ușor de implementat și utilizat.
- Flexibilitate în gestionarea datelor.

**Dezavantaje:**
- Posibilitatea coliziunilor, care pot afecta performanța.
- Necesită o funcție de hash eficientă.
- Spațiul de memorie poate fi ineficient utilizat.

## Aplicații Practice

Harta Hash Hartă este utilizată pe scară largă în diverse aplicații, cum ar fi:
- Implementarea bazelor de date pentru stocarea rapidă a informațiilor.
- Gestionarea sesiunilor în aplicațiile web.
- Implementarea cache-urilor pentru acces rapid la date frecvent utilizate.
- Algoritmi de căutare și sortare care necesită acces rapid la elemente.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*