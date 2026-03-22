# Verificare An Bisect

Slug: matematica_is_leap_year
Categorie: Matematică

## Introducere

Un **an bisect** (sau an leap) este un an calendaristic care conține o zi suplimentară (29 februarie), totalizând 366 de zile în loc de 365. Această zi extra este adăugată pentru a sincroniza calendarul cu anul solar, care durează aproximativ 365,2425 de zile.

Conceptul a fost introdus de **Iulius Caesar** în 46 î.Hr. prin calendarul iulian, care considera orice an divizibil cu 4 ca bisect. Mai târziu, **Papa Grigore al XIII-lea** a rafinat această regulă în 1582 prin calendarul gregorian, care este standardul internațional astăzi.

Fără anii bisecți, calendarul s-ar decala față de anotimpuri cu aproximativ 6 ore pe an, ajungând după câteva secole să fie complet desincronizat cu ciclurile naturale.

## Descriere

Regula completă din calendarul gregorian pentru ani bisecți:
- Anul este bisect dacă este **divizibil cu 4**
- DAR **nu** dacă este divizibil cu 100 (ex: 1900 nu este bisect)
- CU EXCEPȚIA că dacă este **divizibil cu 400** este bisect (ex: 2000 este bisect)

**Pașii algoritmului:**
1. Verifică dacă anul este divizibil cu 400 → dacă da, este bisect.
2. Altfel, verifică dacă este divizibil cu 100 → dacă da, NU este bisect.
3. Altfel, verifică dacă este divizibil cu 4 → dacă da, este bisect.
4. Altfel, nu este bisect.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| General | O(1) | O(1) |

**Explicație:** Se efectuează cel mult 3 operații de modulo, deci complexitatea este constantă O(1).

## Pseudocod

```
funcție esteBisect(an):
    dacă (an % 400 == 0):
        returnează adevărat
    altfel dacă (an % 100 == 0):
        returnează fals
    altfel dacă (an % 4 == 0):
        returnează adevărat
    altfel:
        returnează fals

// Forma compactă:
returnează (an % 4 == 0 ȘI an % 100 != 0) SAU (an % 400 == 0)
```

## Exemple

- esteBisect(2024) → 2024 % 4 = 0, 2024 % 100 = 24 ≠ 0 → **adevărat** ✓
- esteBisect(1900) → 1900 % 100 = 0, 1900 % 400 = 300 ≠ 0 → **fals** ✓
- esteBisect(2000) → 2000 % 400 = 0 → **adevărat** ✓
- esteBisect(2023) → 2023 % 4 = 3 ≠ 0 → **fals** ✓

## Aplicații

- Calcul corect al datelor calendaristice în aplicații software
- Sisteme de planificare și calendar (Google Calendar, Outlook)
- Calcul al vârstei și al perioadelor de timp
- Sisteme financiare (calcul dobânzi pe zile)
- Astronomie și calcul orbital

## Resurse

- [Wikipedia - Leap year](https://en.wikipedia.org/wiki/Leap_year)
- [GeeksForGeeks - Program to check if a given year is leap year](https://www.geeksforgeeks.org/program-check-given-year-leap-year/)
