# Verificare Număr Par

Slug: matematica_is_even
Categorie: Matematică

## Introducere

Un număr întreg este **par** dacă este divizibil cu 2, adică împărțirea sa la 2 nu lasă rest. Această proprietate fundamentală a numerelor întregi este una din primele noțiuni studiate în aritmetică și teoria numerelor.

Numerele pare formează mulțimea {..., -4, -2, 0, 2, 4, 6, ...}. Suma, diferența și produsul a două numere pare este tot par. Paritatea unui număr poate fi verificată rapid prin examinarea ultimei cifre zecimale sau a ultimului bit în reprezentarea binară.

Verificarea parității este o operație extrem de frecventă în programare, folosită în algoritmi de sortare, generatori de numere, protocoale de comunicație și multe altele.

## Descriere

Există două metode principale pentru a verifica dacă un număr este par:

1. **Metoda modulo:** verifică dacă restul împărțirii la 2 este zero: n % 2 == 0
2. **Metoda bitwise:** verifică dacă ultimul bit este 0: (n & 1) == 0

Metoda bitwise este mai eficientă deoarece operația AND pe biți este implementată direct în hardware și nu necesită o împărțire.

**Pașii algoritmului:**
1. Primește numărul întreg n.
2. Verifică dacă n % 2 == 0 (sau echivalent (n & 1) == 0).
3. Dacă da, returnează adevărat (numărul este par).
4. Altfel, returnează fals.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| General | O(1) | O(1) |

**Explicație:** Operația se efectuează într-un număr constant de pași, indiferent de valoarea lui n. Atât modulo cât și AND pe biți sunt operații elementare O(1).

## Pseudocod

```
funcție estePar(n):
    returnează (n % 2 == 0)

// sau echivalent cu operație pe biți:
funcție estePar(n):
    returnează (n ȘI 1) == 0
```

## Exemple

- estePar(4) → 4 % 2 = 0 → **adevărat**
- estePar(7) → 7 % 2 = 1 → **fals**
- estePar(0) → 0 % 2 = 0 → **adevărat** (0 este par)
- estePar(-6) → -6 % 2 = 0 → **adevărat**
- estePar(100) → **adevărat**

## Aplicații

- Parcurgerea alternativă a elementelor dintr-un șir (indici pari/impari)
- Algoritmi de divide et impera (împărțire pe jumătăți)
- Generarea tablelor de șah (celule albe/negre)
- Protocoale de paritate pentru detectarea erorilor de transmisie
- Criptografie: algoritmi RSA verifică paritatea exponenților

## Resurse

- [Wikipedia - Parity (mathematics)](https://en.wikipedia.org/wiki/Parity_(mathematics))
- [GeeksForGeeks - Check if a number is even or odd](https://www.geeksforgeeks.org/check-if-a-number-is-even-or-odd/)
