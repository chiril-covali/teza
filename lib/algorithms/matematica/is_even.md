<!-- custom-doc -->
# Verificare Even

Verificarea parității unui număr se referă la determinarea dacă un număr întreg este par sau impar. Un număr este considerat par dacă este divizibil cu 2, adică nu are rest la împărțirea cu 2. În schimb, un număr este impar dacă are un rest de 1 la această împărțire.

## Reprezentare Vizuală

```
Număr: 8
Verificare: 8 % 2 = 0 (Par)

Număr: 7
Verificare: 7 % 2 = 1 (Impar)
```

### Exemplu Pas cu Pas

1. Primul număr: 10
   - 10 % 2 = 0 → Par
2. Al doilea număr: 15
   - 15 % 2 = 1 → Impar

## Matematică / Logică

Pentru un număr întreg $n$, verificarea parității se poate exprima prin următoarea formulă:

$$
\text{Paritate}(n) = 
\begin{cases} 
\text{Par} & \text{dacă } n \mod 2 = 0 \\
\text{Impar} & \text{dacă } n \mod 2 = 1 
\end{cases}
$$

## Tabel de Complextitate

| Caz          | Complexitate Timp | Complexitate Spațiu |
|--------------|-------------------|---------------------|
| Cel mai bun  | $O(1)$            | $O(1)$              |
| Mediu        | $O(1)$            | $O(1)$              |
| Cel mai rău  | $O(1)$            | $O(1)$              |

## Avantaje și Dezavantaje

**Avantaje:**
- Simplu de implementat.
- Timp de execuție constant, $O(1)$.
- Utilizare eficientă a resurselor de memorie.

**Dezavantaje:**
- Nu oferă informații suplimentare despre număr (ex: divizibilitate cu alte numere).
- Limitat la numere întregi.

## Aplicații Practice

- **Programare**: Verificarea parității este frecvent utilizată în algoritmi de sortare și filtrare.
- **Teoria numerelor**: Utilizată în studii de divizibilitate și în probleme de combinatorică.
- **Criptografie**: Paritatea este folosită în generarea de chei și în algoritmi de verificare a integrității datelor.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*