# Verificare Număr Impar

Slug: matematica_is_odd
Categorie: Matematică

## Introducere

Un număr întreg este **impar** dacă nu este divizibil cu 2, adică împărțirea la 2 lasă rest 1. Numerele impare formează mulțimea {..., -3, -1, 1, 3, 5, 7, ...}. Produsul a două numere impare este tot impar, dar suma lor este întotdeauna pară.

Proprietatea de imparitate are implicații interesante: orice număr impar la pătrat este impar, iar orice număr par la orice putere pozitivă este par. Aceste proprietăți sunt fundamentale în demonstrații matematice prin reducere la absurd.

În informatică, verificarea imparității este complementară verificării parității și apare deseori în algoritmi care procesează alternate sau tratează diferit elementele de pe pozițiile impare.

## Descriere

Verificarea se face prin testarea dacă restul împărțirii la 2 este 1 (sau diferit de 0). Folosind operații pe biți, un număr este impar dacă ultimul bit din reprezentarea sa binară este 1.

**Pașii algoritmului:**
1. Primește numărul întreg n.
2. Verifică dacă n % 2 != 0 (sau echivalent (n & 1) == 1).
3. Dacă da, returnează adevărat (numărul este impar).
4. Altfel, returnează fals.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| General | O(1) | O(1) |

**Explicație:** Operația de modulo sau AND pe biți se execută în timp constant, indiferent de valoarea lui n.

## Pseudocod

```
funcție esteImpar(n):
    returnează (n % 2 != 0)

// sau echivalent cu operație pe biți:
funcție esteImpar(n):
    returnează (n ȘI 1) == 1
```

## Exemple

- esteImpar(3) → 3 % 2 = 1 → **adevărat**
- esteImpar(8) → 8 % 2 = 0 → **fals**
- esteImpar(1) → **adevărat**
- esteImpar(-5) → -5 % 2 = -1 ≠ 0 → **adevărat**
- esteImpar(0) → **fals** (0 este par)

## Aplicații

- Algoritmi de sortare care separă elementele pare de cele impare
- Verificarea simetriei în structuri de date
- Generarea numerelor prime (toate numerele prime > 2 sunt impare)
- Algoritmi de compresie și codificare
- Matematică recreativă și puzzle-uri logice

## Resurse

- [Wikipedia - Parity (mathematics)](https://en.wikipedia.org/wiki/Parity_(mathematics))
- [GeeksForGeeks - Check if a number is even or odd](https://www.geeksforgeeks.org/check-if-a-number-is-even-or-odd/)
