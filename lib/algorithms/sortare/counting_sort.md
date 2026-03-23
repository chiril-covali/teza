<!-- custom-doc -->
# Counting Sortare

Counting Sortare este un algoritm de sortare non-comparativ, care se bazează pe numărarea aparițiilor fiecărui element dintr-un interval specificat. Este eficient pentru sortarea numerelor întregi sau a altor tipuri de date discrete, având o complexitate de timp liniară în funcție de dimensiunea datelor de intrare.

## Reprezentare Vizuală

Să considerăm un exemplu simplu de sortare a unui vector de numere întregi: `[4, 2, 2, 8, 3, 3, 1]`.

1. **Numărăm aparițiile fiecărui element:**

```
Element: 1  2  3  4  8
Count:   1  2  2  1  1
```

2. **Construim vectorul de ieșire:**

```
Index:  0  1  2  3  4  5  6
Output: 1  2  2  3  3  4  8
```

## Matematică / Logică

Algoritmul Counting Sortare funcționează pe baza următoarei logici:

1. Se determină intervalul valorilor de intrare (minim și maxim).
2. Se creează un vector de numărare (count) cu dimensiunea intervalului, inițializat cu zero.
3. Se numără aparițiile fiecărui element în vectorul de intrare.
4. Se acumulează valorile din vectorul de numărare pentru a determina pozițiile finale ale elementelor în vectorul de ieșire.

Complexitatea temporală a algoritmului este dată de formula:

$$O(n + k)$$

unde $n$ este numărul de elemente din vectorul de intrare, iar $k$ este valoarea maximă a elementelor din vector.

## Tabel de Complextitate

| Caz               | Complexitate Timp | Complexitate Spațiu |
|-------------------|-------------------|---------------------|
| Cel mai bun       | $O(n + k)$        | $O(k)$              |
| Caz mediu         | $O(n + k)$        | $O(k)$              |
| Cel mai rău      | $O(n + k)$        | $O(k)$              |

## Avantaje și Dezavantaje

### Avantaje
- Eficient pentru intervale mici de valori.
- Complexitate liniară în funcție de dimensiunea datelor de intrare.
- Stabil (menține ordinea elementelor cu valori egale).

### Dezavantaje
- Necesită un spațiu suplimentar proporțional cu intervalul de valori.
- Nu este potrivit pentru date cu valori foarte mari sau variate.
- Nu poate fi folosit pentru date de tipuri diferite (de exemplu, stringuri).

## Aplicații Practice

Counting Sortare este utilizat în diverse aplicații, cum ar fi:
- Sortarea numerelor întregi în jocuri video.
- Procesarea datelor în statistici și analize de date.
- Sortarea frecvențelor în algoritmi de compresie a datelor.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*