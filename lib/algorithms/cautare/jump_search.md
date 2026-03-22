# Căutare prin Salturi (Jump Search)

Slug: cautare_jump_search
Categorie: Căutare

## Introducere

Căutarea prin salturi (Jump Search) este un algoritm de căutare pentru tablouri sortate care reprezintă un compromis inteligent între căutarea liniară (O(n)) și căutarea binară (O(log n)). A fost inventat de **A.K. Chandra** în 1971 și popularizat în 1978 prin lucrarea lui J.L. Bentley și colab., care au analizat formal complexitatea sa și l-au comparat cu alte metode.

Ideea cheie este să „sari" înainte cu pași de dimensiune fixă `√n` pentru a localiza blocul care ar putea conține elementul căutat, iar apoi să efectuezi o căutare liniară în acel bloc mic. Aceasta evită traversarea completă a tabloului (ca la căutarea liniară) și este mai simplă de implementat decât căutarea binară, nefiind recursivă.

Dimensiunea optimă a pasului este `√n` — aceasta minimizează numărul total de comparații. Dacă pasul este mai mic, se fac prea multe salturi; dacă este mai mare, căutarea liniară în ultimul bloc devine prea lungă. Complexitatea totală este O(√n), ceea ce se situează perfect între O(n) și O(log n) pe axa de eficiență a algoritmilor de căutare.

## Descriere

Algoritmul parcurge tabloul în „salturi" de `m = √n` poziții, verificând la fiecare salt dacă elementul de la poziția curentă este mai mare sau egal cu ținta. Odată ce s-a găsit un bloc în care ținta s-ar putea afla, se face o căutare liniară înapoi în acel bloc.

**Pașii algoritmului:**

1. Calculează dimensiunea pasului `m = floor(√n)`.
2. Setează `anterior = 0` și `curent = m`.
3. Cât timp `curent < n` și `tablou[curent] < țintă`: `anterior = curent`, `curent += m`.
4. Efectuează căutare liniară de la `anterior` la `min(curent, n-1)`.
5. Dacă se găsește elementul, returnează indexul. Altfel returnează `-1`.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(1) | O(1) |
| Mediu | O(√n) | O(1) |
| Cel mai rău | O(√n) | O(1) |

**Explicație:** În faza de salt, se execută cel mult `√n` salturi până la capătul tabloului. În faza de căutare liniară, blocul are cel mult `√n` elemente. Numărul total de comparații este `√n + √n = 2√n = O(√n)`. Dimensiunea pasului `√n` este optimă: pentru pas `m`, numărul total de comparații este `n/m + m - 1`, minim când `m = √n`. Spațiul este O(1) — nu se alocă memorie suplimentară.

## Pseudocod

```
CĂUTARE_SALT(tablou, n, țintă):
    pas ← floor(√n)
    anterior ← 0

    // Faza de salt
    CÂT TIMP tablou[min(pas, n) - 1] < țintă:
        anterior ← pas
        pas ← pas + floor(√n)
        DACĂ anterior ≥ n:
            RETURNEAZĂ -1

    // Faza de căutare liniară în bloc
    CÂT TIMP tablou[anterior] < țintă:
        anterior ← anterior + 1
        DACĂ anterior = min(pas, n):
            RETURNEAZĂ -1

    // Verificare finală
    DACĂ tablou[anterior] = țintă:
        RETURNEAZĂ anterior

    RETURNEAZĂ -1
```

## Exemple

**Exemplu concret:** Fie tabloul `[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377]` (n=15) și ținta `55`.

**Calculare pas:** `pas = floor(√15) = 3`

**Faza de salt:**
- Verifică `tablou[2] = 1 < 55` → `anterior=3, pas=6`
- Verifică `tablou[5] = 5 < 55` → `anterior=6, pas=9`
- Verifică `tablou[8] = 21 < 55` → `anterior=9, pas=12`
- Verifică `tablou[11] = 89 ≥ 55` → **stop! Bloc: `[9, 12)`**

**Faza de căutare liniară în `[9, 11]`:**
- `tablou[9] = 34 < 55` → `anterior=10`
- `tablou[10] = 55 == 55` → **găsit la indexul 10!**

Total comparații: 4 (salt) + 2 (liniară) = **6 comparații** față de O(n)=15 la căutarea liniară.

## Aplicații

- **Sisteme cu acces secvențial costisitor:** Utile pentru medii de stocare (benzi magnetice, HDD) unde căutarea „înapoi" este costisitoare sau imposibilă.
- **Structuri de date sortate:** Căutare în liste înlănțuite sortate (unde accesul aleator nu este posibil dar saltul înainte este eficient).
- **Baze de date:** Ca alternativă simplă la căutarea binară în indexuri sortate de dimensiune medie.
- **Algoritmi de compresie:** Căutarea în dicționare comprimate de dimensiune medie.
- **Procesare de semnale:** Căutarea unui prag în semnale sortate (ex: date de la senzori).
- **Jocuri video:** Căutarea în tabele de scoruri sau liste de entități sortate după prioritate.

## Resurse

- [Wikipedia - Jump Search](https://en.wikipedia.org/wiki/Jump_search)
- [GeeksForGeeks - Jump Search](https://www.geeksforgeeks.org/jump-search/)
- [Visualgo - Searching Algorithms](https://visualgo.net/en/sorting)
- [Bentley, J.L. (1978) - Programming pearls: algorithm design techniques](https://dl.acm.org/doi/10.1145/358396.358400)
