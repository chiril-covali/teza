<!-- custom-doc -->
# Bogo Sortare

Bogo Sortare, cunoscută și sub denumirea de "sortare bazată pe permutări aleatorii", este un algoritm de sortare extrem de ineficient, care funcționează prin generarea aleatorie a permutărilor unei liste până când aceasta devine sortată. Este considerat un algoritm de sortare de tip "brute-force" și este utilizat mai mult ca o curiositate decât ca o soluție practică.

## Reprezentare Vizuală

Să considerăm un exemplu simplu cu lista `[3, 2, 1]`. Bogo Sortare va genera permutări aleatorii ale acestei liste până când obține lista sortată `[1, 2, 3]`.

```
Permutări generate:
1. [3, 1, 2] - nesortat
2. [2, 1, 3] - nesortat
3. [1, 3, 2] - nesortat
4. [1, 2, 3] - sortat
```

## Matematică / Logică

Bogo Sortare are o complexitate teoretică de $O(n!)$, deoarece numărul de permutări posibile pentru o listă de lungime $n$ este $n!$. Aceasta înseamnă că, în cel mai rău caz, algoritmul va genera toate permutările posibile ale listei.

## Tabel de Complextitate

| Caz              | Complexitate Timp | Complexitate Spațiu |
|------------------|-------------------|---------------------|
| Cel mai bun      | $O(n)$            | $O(n)$              |
| Mediu            | $O(n!)$           | $O(n)$              |
| Cel mai rău     | $O(n!)$           | $O(n)$              |

## Avantaje și Dezavantaje

**Avantaje:**
- Simplu de implementat.
- Ilustrează conceptul de permutare aleatorie.

**Dezavantaje:**
- Extrem de ineficient pentru liste mari.
- Nu este utilizat în practică datorită performanței slabe.
- Nu garantează o soluție rapidă, chiar și pentru liste mici.

## Aplicații Practice

Bogo Sortare nu are aplicații practice în viața reală datorită ineficienței sale. Este folosit în principal în scopuri educaționale pentru a demonstra concepte de bază în teoria algoritmilor și pentru a ilustra limitările algoritmilor de sortare bazate pe permutări aleatorii.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*