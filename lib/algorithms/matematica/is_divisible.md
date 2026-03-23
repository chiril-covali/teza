<!-- custom-doc -->
# Verificare Divisible

Verificarea divisibilității este un proces matematic prin care se determină dacă un număr întreg este divizibil cu un alt număr întreg, fără a lăsa rest. Această operație este fundamentală în teoria numerelor și are aplicații în diverse domenii, inclusiv criptografie, algoritmi și programare.

## Reprezentare Vizuală

Un exemplu simplu de verificare a divisibilității poate fi ilustrat printr-un algoritm care verifică dacă un număr $n$ este divizibil cu un număr $d$. Algoritmul poate fi descris astfel:

1. Se calculează restul împărțirii lui $n$ la $d$.
2. Dacă restul este 0, atunci $n$ este divizibil cu $d$; altfel, nu este.

```
Verificare Divisible(n, d):
    rest = n % d
    dacă rest == 0:
        return True
    altfel:
        return False
```

### Exemplu Pas cu Pas

Să considerăm $n = 10$ și $d = 2$:

```
1. rest = 10 % 2
2. rest = 0
3. 10 este divizibil cu 2
```

## Matematică / Logică

Verificarea divisibilității se bazează pe următoarea formulă:

$$
n \mod d = 0 \implies n \text{ este divizibil cu } d
$$

unde $\mod$ reprezintă operația de calculare a restului.

## Tabel de Complextitate

| Caz               | Complexitate Timp | Complexitate Spațiu |
|-------------------|-------------------|---------------------|
| Cel mai bun       | $O(1)$            | $O(1)$              |
| Caz mediu        | $O(1)$            | $O(1)$              |
| Cel mai rău      | $O(1)$            | $O(1)$              |

## Avantaje și Dezavantaje

**Avantaje:**
- Simplu de implementat.
- Eficient din punct de vedere al timpului de execuție.
- Utilizat frecvent în algoritmi și structuri de date.

**Dezavantaje:**
- Limitat la numere întregi.
- Nu oferă informații suplimentare despre numerele verificate (de exemplu, nu identifică factorii).

## Aplicații Practice

- **Criptografie**: Verificarea divisibilității este esențială în algoritmi de criptare, cum ar fi RSA.
- **Algoritmi de sortare**: Folosit în algoritmi care necesită gruparea numerelor în funcție de criterii de divisibilitate.
- **Analiza datelor**: Utilizat în statistici pentru a verifica condiții de grupare.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*