<!-- custom-doc -->
# Set Hash Hartă Set

Setul Hash Hartă Set este o structură de date care combină caracteristicile unui set și ale unei hărți (sau dicționar). Aceasta permite stocarea și gestionarea eficientă a elementelor unice, asociind fiecărui element o valoare. Seturile Hash sunt utilizate frecvent datorită performanțelor lor excelente în ceea ce privește căutarea, inserarea și ștergerea elementelor.

## Reprezentare Vizuală

O reprezentare simplificată a unui set hash ar putea arăta astfel:

```
Index:  0    1    2    3    4    5    6    7
       +----+----+----+----+----+----+----+----+
       |    |    |    |    |    |    |    |    |
       +----+----+----+----+----+----+----+----+
       |    |    |    |    |    |    |    |    |
       +----+----+----+----+----+----+----+----+
```

Fiecare index corespunde unei valori hash generate dintr-un element. De exemplu, dacă inserăm elementele `A`, `B`, `C`, și `D`, harta ar putea arăta astfel:

```
Index:  0    1    2    3    4    5    6    7
       +----+----+----+----+----+----+----+----+
       | A  | B  |    | D  |    | C  |    |    |
       +----+----+----+----+----+----+----+----+
```

### Exemplu Pas cu Pas

1. Inserăm elementul `A`: se calculează hash-ul, să zicem 0.
2. Inserăm elementul `B`: hash-ul este 1.
3. Inserăm elementul `C`: hash-ul este 5.
4. Inserăm elementul `D`: hash-ul este 3.

## Matematică / Logică

Funcția hash $h(x)$ transformă un element $x$ într-un index care va fi utilizat pentru a stoca elementul în tabelul hash. Aceasta poate fi definită ca:

$$
h(x) = x \mod m
$$

unde $m$ este dimensiunea tabelului hash. Această funcție asigură că elementele sunt distribuite uniform în tabel.

## Tabel de Complextitate

| Operație         | Cel mai bun caz | Caz mediu | Cel mai rău caz |
|------------------|-----------------|-----------|------------------|
| Inserare         | $O(1)$          | $O(1)$    | $O(n)$           |
| Căutare          | $O(1)$          | $O(1)$    | $O(n)$           |
| Ștergere         | $O(1)$          | $O(1)$    | $O(n)$           |
| Spațiu           | $O(n)$          | $O(n)$    | $O(n)$           |

## Avantaje și Dezavantaje

### Avantaje
- Acces rapid la elemente prin funcții hash.
- Permite inserarea și ștergerea eficientă a elementelor.
- Stocarea elementelor unice.

### Dezavantaje
- Posibilitatea de coliziune (când două elemente diferite au același hash).
- Performanța poate scădea dacă tabela hash este prea plină.
- Necesită o funcție hash bună pentru a asigura o distribuție uniformă.

## Aplicații Practice

Seturile Hash sunt utilizate în diverse aplicații, inclusiv:
- Implementarea bazelor de date pentru gestionarea rapidă a datelor.
- Algoritmi de căutare și sortare.
- Stocarea sesiunilor utilizatorilor în aplicațiile web.
- Analiza datelor și procesarea acestora în timp real.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*