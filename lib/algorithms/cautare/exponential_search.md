# Căutare Exponențială

Slug: cautare_exponential_search
Categorie: Căutare

## Introducere

Căutarea exponențială este un algoritm de căutare conceput special pentru tablouri sortate de dimensiune necunoscută sau foarte mare (inclusiv tablouri „infinite"). A fost propus de Bentley și Yao în 1976, în lucrarea lor despre optimizarea algoritmilor de căutare pentru diferite modele de acces la date.

Numele provine din strategia de explorare a intervalelor: indexul de verificare crește exponențial (1, 2, 4, 8, 16, ...) până când se găsește un element mai mare sau egal cu ținta. Aceasta permite localizarea rapidă a unui interval de dimensiune rezonabilă care conține elementul, după care se aplică căutarea binară clasică.

Marele avantaj față de căutarea binară standard este că nu necesită cunoașterea prealabilă a dimensiunii tabloului. Este deosebit de util în situații practice cum ar fi căutarea în fișiere indexate de dimensiuni mari, căutarea în fluxuri de date sau în implementările de dicționare extensibile. Performanța sa este O(log n), identică cu căutarea binară, dar cu o constantă ușor diferită care poate fi avantajoasă când elementul se află aproape de începutul tabloului.

## Descriere

Algoritmul funcționează în două faze: **faza de găsire a intervalului** și **faza de căutare binară**. În prima fază, se verifică pozițiile 1, 2, 4, 8, 16, ... până când valoarea de la acea poziție depășește sau egalează ținta. Aceasta definește intervalul `[i/2, min(i, n-1)]`. În faza a doua, se aplică căutarea binară pe acest interval.

**Pașii algoritmului:**

1. Dacă `tablou[0] == țintă`, returnează `0`.
2. Inițializează `i = 1`.
3. Cât timp `i < n` și `tablou[i] <= țintă`: dublează `i` (`i = i * 2`).
4. Aplică căutarea binară pe intervalul `[i/2, min(i, n-1)]`.
5. Returnează rezultatul căutării binare.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(1) | O(1) |
| Mediu | O(log n) | O(1) |
| Cel mai rău | O(log n) | O(1) |

**Explicație:** Faza exponențială necesită O(log n) pași pentru a găsi intervalul (indexul se dublează, deci după `k` pași avem `i = 2^k ≈ n`, adică `k = log₂(n)` pași). Căutarea binară aplicată pe intervalul `[i/2, i]` de dimensiune `i/2 ≈ n/2` necesită de asemenea O(log n) pași. Total: O(log n). Spațiul este O(1) pentru versiunea iterativă.

## Pseudocod

```
CĂUTARE_EXPONENȚIALĂ(tablou, n, țintă):
    DACĂ tablou[0] = țintă:
        RETURNEAZĂ 0

    i ← 1
    CÂT TIMP i < n ȘI tablou[i] ≤ țintă:
        i ← i * 2

    // Aplică căutare binară în intervalul [i/2, min(i, n-1)]
    stânga ← i / 2
    dreapta ← min(i, n - 1)
    RETURNEAZĂ CĂUTARE_BINARĂ(tablou, stânga, dreapta, țintă)
```

## Exemple

**Exemplu concret:** Fie tabloul `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]` (n=16) și ținta `11`.

**Faza exponențială:**
- `i=1`: `tablou[1]=2 ≤ 11` → `i=2`
- `i=2`: `tablou[2]=3 ≤ 11` → `i=4`
- `i=4`: `tablou[4]=5 ≤ 11` → `i=8`
- `i=8`: `tablou[8]=9 ≤ 11` → `i=16`
- `i=16`: `16 ≥ n=16` → se oprește

Intervalul pentru căutarea binară: `[8, 15]` → `[9, 10, 11, 12, 13, 14, 15, 16]`

**Faza binară în `[8, 15]`:**
- `mijloc=11` → `tablou[11]=12 > 11` → `dreapta=10`
- `mijloc=9` → `tablou[9]=10 < 11` → `stânga=10`
- `mijloc=10` → `tablou[10]=11 == 11` → **găsit la indexul 10!**

## Aplicații

- **Tablouri de dimensiune necunoscută:** Ideal pentru cazurile în care `n` nu este cunoscut dinainte (tablouri infinite, fluxuri de date).
- **Sisteme de fișiere:** Căutarea în fișiere index de dimensiuni foarte mari unde nu se cunoaște exact numărul de înregistrări.
- **Biblioteci de căutare:** Util ca alternativă la căutarea binară când elementele mici sunt mai frecvent căutate (complexitate mai bună pentru elementele de la început).
- **Baze de date extensibile:** Structuri de date B-tree sau skip list unde dimensiunea crește dinamic.
- **Căutare în șiruri de caractere:** Poate fi aplicat pentru a găsi poziția unui caracter în șiruri de lungime necunoscută.

## Resurse

- [Wikipedia - Exponential Search](https://en.wikipedia.org/wiki/Exponential_search)
- [GeeksForGeeks - Exponential Search](https://www.geeksforgeeks.org/exponential-search/)
- [Bentley & Yao, 1976 - Original Paper](https://dl.acm.org/doi/10.1145/800105.803400)
