<!-- custom-doc -->
# Arbore Sortare

Arborele de sortare, cunoscut și sub denumirea de arbore binar de căutare (Binary Search Tree - BST), este o structură de date care permite stocarea și organizarea eficientă a datelor, facilitând operațiuni precum căutarea, inserarea și ștergerea elementelor. Fiecare nod din arbore conține o valoare, iar nodurile sunt organizate astfel încât pentru orice nod dat, valorile din subarborele stâng sunt mai mici, iar valorile din subarborele drept sunt mai mari.

## Reprezentare Vizuală

Un exemplu simplu de arbore de sortare ar putea arăta astfel:

```
        8
       / \
      3   10
     / \    \
    1   6    14
       / \   /
      4   7 13
```

### Exemplu Pas cu Pas

1. Inserarea valorii 8:
```
        8
```
2. Inserarea valorii 3:
```
        8
       /
      3
```
3. Inserarea valorii 10:
```
        8
       / \
      3   10
```
4. Continuarea inserării valorilor 1, 6, 14, 4, 7, 13 va duce la arborele prezentat mai sus.

## Matematică / Logică

Complexitatea temporală a operațiunilor de căutare, inserare și ștergere în arborele de sortare este în general $O(h)$, unde $h$ este înălțimea arborelui. În cel mai rău caz, arborele poate degenera într-o listă legată, ceea ce duce la o complexitate de $O(n)$. Totuși, în cazul unui arbore echilibrat, complexitatea devine $O(log n)$.

## Tabel de Complextitate

| Operațiune       | Cel mai bun caz | Caz mediu | Cel mai rău caz |
|------------------|----------------|-----------|------------------|
| Căutare          | $O(log n)$     | $O(log n)$| $O(n)$           |
| Inserare         | $O(log n)$     | $O(log n)$| $O(n)$           |
| Ștergere         | $O(log n)$     | $O(log n)$| $O(n)$           |
| Spațiu           | $O(n)$         | $O(n)$    | $O(n)$           |

## Avantaje și Dezavantaje

### Avantaje
- Permite căutări rapide în medie ($O(log n)$).
- Inserarea și ștergerea sunt eficiente în cazul arborilor echilibrați.
- Structura de date dinamică, permite adăugarea și eliminarea ușoară a elementelor.

### Dezavantaje
- Performanța poate scădea semnificativ în cazul arborilor dezechilibrați.
- Necesită o gestionare atentă pentru a menține echilibrul (de exemplu, folosind arbori AVL sau arbori roșu-negru).
- Spațiul de stocare poate fi mai mare comparativ cu alte structuri de date, cum ar fi array-urile.

## Aplicații Practice

Arborele de sortare este utilizat în diverse aplicații, cum ar fi:
- Implementarea bazelor de date pentru căutarea rapidă a înregistrărilor.
- Algoritmi de sortare și căutare în limbaje de programare.
- Structuri de date pentru gestionarea memoriei în sisteme de operare.
- Implementarea unor funcționalități de autocompletare în aplicații de căutare.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*