<!-- custom-doc -->
# Verificare Square Free

Verificarea unui număr ca fiind "square free" se referă la determinarea dacă acesta nu este divizibil cu pătratul unui număr întreg mai mare decât 1. Un număr este considerat "square free" dacă nu există niciun întreg $k > 1$ astfel încât $k^2$ să fie un divizor al numărului respectiv.

## Reprezentare Vizuală

Un exemplu simplu pentru a verifica dacă numărul 30 este "square free":

1. Factorizăm 30: $30 = 2 \times 3 \times 5$
2. Verificăm pătratele numerelor întregi:
   - $2^2 = 4$ (nu este divizor)
   - $3^2 = 9$ (nu este divizor)
   - $5^2 = 25$ (nu este divizor)

Astfel, 30 este un număr "square free".

```
30
├── 2
├── 3
└── 5
```

## Matematică / Logică

Pentru a verifica dacă un număr $n$ este "square free", putem utiliza următoarea logică:

1. Calculăm toți factorii primi ai lui $n$.
2. Verificăm dacă pentru fiecare factor prim $p$, $p^2$ nu divide $n$.

Această verificare poate fi realizată eficient prin algoritmi care utilizează factorizarea.

## Tabel de Complextitate

| Caz                | Complexitate Timp | Complexitate Spațiu |
|--------------------|-------------------|---------------------|
| Cel mai bun        | $O(\sqrt{n})$     | $O(1)$              |
| Caz mediu          | $O(\sqrt{n})$     | $O(1)$              |
| Cel mai rău       | $O(\sqrt{n})$     | $O(1)$              |

## Avantaje și Dezavantaje

- **Avantaje**:
  - Ușor de implementat.
  - Eficient pentru numere mici și medii.
  - Util în diverse aplicații matematice și de teorie a numerelor.

- **Dezavantaje**:
  - Poate deveni ineficient pentru numere foarte mari.
  - Necesită o verificare exhaustivă a factorilor primi.

## Aplicații Practice

Algoritmul de verificare "square free" este utilizat în:

- Teoria numerelor, pentru studierea proprietăților numerelor.
- Criptografie, în generarea de chei și algoritmi de securitate.
- Analiza datelor, în special în statistica combinatorială și în problemele de optimizare.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*