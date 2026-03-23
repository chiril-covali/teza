<!-- custom-doc -->
# Shell Sortare

Shell Sortare este un algoritm de sortare care extinde algoritmul de sortare prin inserție, având ca scop îmbunătățirea eficienței acestuia prin compararea și schimbarea elementelor care sunt distanțate. Algoritmul a fost dezvoltat de Donald Shell în 1959 și este cunoscut pentru capacitatea sa de a sorta liste mari de date într-un timp relativ scurt.

## Reprezentare Vizuală

Un exemplu simplu de sortare folosind Shell Sortare pe lista `[5, 2, 9, 1, 5, 6]` cu un pas inițial de 3:

```
Pas 0: [5, 2, 9, 1, 5, 6]
Pas 1: [1, 2, 9, 5, 5, 6]
Pas 2: [1, 2, 5, 5, 6, 9]
```

### Exemplu Pas cu Pas

1. **Inițializare**: Lista `[5, 2, 9, 1, 5, 6]`
2. **Pas 1** (gap = 3):
   - Comparăm 5 și 1: `[1, 2, 9, 5, 5, 6]`
3. **Pas 2** (gap = 1):
   - Sortăm folosind inserția: `[1, 2, 5, 5, 6, 9]`

## Matematică / Logică

Algoritmul Shell Sortare utilizează o secvență de intervale (gaps) pentru a determina distanța între elementele comparate. O alegere comună pentru secvența de gaps este $h_k = \frac{n}{2^k}$, unde $n$ este numărul de elemente din listă.

Complexitatea temporală a algoritmului depinde de secvența de gaps utilizată. În cel mai bun caz, complexitatea este $O(n \log n)$, iar în cel mai rău caz, poate ajunge la $O(n^2)$.

## Tabel de Complextitate

| Caz            | Complexitate Timp | Complexitate Spațiu |
|----------------|-------------------|---------------------|
| Cel mai bun    | $O(n \log n)$     | $O(1)$              |
| Caz mediu      | $O(n \log n)$     | $O(1)$              |
| Cel mai rău    | $O(n^2)$          | $O(1)$              |

## Avantaje și Dezavantaje

### Avantaje
- Eficient pentru liste mari.
- Nu necesită spațiu suplimentar semnificativ (sortare in-place).
- Poate fi implementat cu ușurință.

### Dezavantaje
- Performanța depinde de secvența de gaps aleasă.
- Nu este stabil (nu păstrează ordinea elementelor egale).

## Aplicații Practice

Shell Sortare este utilizat în diverse aplicații, inclusiv:
- Sortarea datelor în baze de date.
- Preprocesarea datelor pentru algoritmi de învățare automată.
- Sortarea listelor de numere mari în aplicații financiare.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*