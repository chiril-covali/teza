<!-- custom-doc -->
# Set Hartă Set

Setul Hartă Set (sau Hash Set) este o structură de date care combină caracteristicile unui set și ale unei hărți (hash map). Aceasta permite stocarea unui număr de elemente unice și oferă acces rapid la acestea prin utilizarea unei funcții de hash. Setul Hartă Set este utilizat frecvent pentru a verifica existența unui element, a adăuga sau a elimina elemente într-un mod eficient.

## Reprezentare Vizuală

O reprezentare simplificată a unui Set Hartă Set poate fi ilustrată astfel:

```
+-----------------+
|  Indice         |
+-----------------+
|  0 | 1 | 2 | 3 | 4 |
+-----------------+
|    |   |   |   |   |
|    |   |   |   |   |
|    |   |   |   |   |
+-----------------+
```

Fiecare indice corespunde unei valori hash calculate pe baza elementului. De exemplu, pentru un set de elemente `{3, 7, 10}`, funcția de hash ar putea produce următoarele indici:

```
+-----------------+
|  Indice         |
+-----------------+
|  0 | 1 | 2 | 3 | 4 |
+-----------------+
|    | 3 |   | 7 | 10|
+-----------------+
```

## Matematică / Logică

Complexitatea medie a operațiunilor de adăugare, căutare și ștergere într-un Set Hartă Set este $O(1)$, datorită utilizării funcțiilor de hash. Totuși, în cazul coliziunilor, complexitatea poate ajunge la $O(n)$ în cel mai rău caz.

## Tabel de Complextitate

| Operațiune       | Cel mai bun caz | Caz mediu | Cel mai rău caz |
|------------------|-----------------|-----------|------------------|
| Adăugare         | $O(1)$          | $O(1)$    | $O(n)$           |
| Căutare          | $O(1)$          | $O(1)$    | $O(n)$           |
| Ștergere         | $O(1)$          | $O(1)$    | $O(n)$           |

## Avantaje și Dezavantaje

**Avantaje:**
- Acces rapid la elemente.
- Permite stocarea elementelor unice.
- Operațiuni eficiente de adăugare și ștergere.

**Dezavantaje:**
- Poate consuma multă memorie în cazul unor funcții de hash ineficiente.
- Performanța poate scădea în cazul coliziunilor frecvente.
- Nu păstrează ordinea elementelor.

## Aplicații Practice

Setul Hartă Set este utilizat în diverse aplicații, cum ar fi:
- Verificarea existenței elementelor într-o colecție (ex: verificarea duplicatelor).
- Implementarea algoritmilor de căutare și filtrare.
- Stocarea seturilor de date unice în aplicații de analiză a datelor.
- Gestionarea sesiunilor utilizatorilor în aplicații web.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*