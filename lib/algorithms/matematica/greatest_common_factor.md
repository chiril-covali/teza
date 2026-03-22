# Cel Mai Mare Divizor Comun

Slug: matematica_greatest_common_factor
Categorie: Matematică

## Introducere

Cel mai mare divizor comun (CMDC) a două sau mai multe numere întregi este cel mai mare număr întreg pozitiv care divide fiecare dintre numerele date fără rest. De exemplu, CMDC(12, 8) = 4, deoarece 4 este cel mai mare număr care divide atât pe 12 cât și pe 8.

Algoritmul euclidian pentru calculul CMDC este unul dintre cei mai vechi algoritmi din istoria matematicii, descris de Euclid în lucrarea sa „Elementele" în jurul anului 300 î.Hr. (Cartea VII, Propozițiile 1 și 2). Este și unul dintre primele exemple de algoritm formal, demonstrând că un procedeu sistematic poate rezolva o problemă matematică în număr finit de pași.

CMDC este un concept fundamental cu aplicații extinse în teoria numerelor, reducerea fracțiilor, criptografie și programare. Împreună cu cel mai mic multiplu comun (CMMC), formează baza aritmeticii modulare și a multor algoritmi avansați.

## Descriere

**Algoritmul euclidian** se bazează pe proprietatea: CMDC(a, b) = CMDC(b, a mod b).

Această proprietate este valabilă deoarece orice divizor comun al lui a și b divide și pe (a mod b) = a - ⌊a/b⌋ × b, deci mulțimea divizorilor comuni ai lui (a, b) este identică cu mulțimea divizorilor comuni ai lui (b, a mod b).

**Pașii algoritmului:**
1. Dacă b = 0, returnează a (a este CMDC-ul).
2. Altfel, calculează restul r = a mod b.
3. Setează a = b și b = r.
4. Repetă de la pasul 1.

**Extindere pentru mai multe numere:** CMDC(a, b, c) = CMDC(CMDC(a, b), c), adică se poate aplica iterativ.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Algoritm euclidian (doi termeni) | O(log min(a,b)) | O(1) |
| Algoritm euclidian (n termeni) | O(n × log min) | O(1) |
| Versiunea recursivă | O(log min(a,b)) | O(log min(a,b)) — stivă |

**Explicație:** La fiecare pas al algoritmului euclidian, cel mai mic dintre cele două numere se reduce cu cel puțin jumătate după cel mult 2 iterații. Prin urmare, numărul de pași este proporțional cu log min(a,b). Complexitatea spațială este O(1) pentru varianta iterativă, deoarece nu se folosesc structuri de date auxiliare.

## Pseudocod

```
funcție cmdc(a, b):
    cât timp b ≠ 0:
        rest ← a mod b
        a ← b
        b ← rest
    returnează a

// Extensie pentru un vector de numere:
funcție cmdcVector(numere[]):
    rezultat ← numere[0]
    pentru i de la 1 până la lungime(numere) - 1:
        rezultat ← cmdc(rezultat, numere[i])
    returnează rezultat

// Varianta recursivă:
funcție cmdcRecursiv(a, b):
    dacă b = 0:
        returnează a
    returnează cmdcRecursiv(b, a mod b)
```

## Exemple

**Exemplul 1:** CMDC(48, 18)

| Pas | a | b | rest = a mod b |
|-----|---|---|----------------|
| 1 | 48 | 18 | 48 mod 18 = 12 |
| 2 | 18 | 12 | 18 mod 12 = 6 |
| 3 | 12 | 6 | 12 mod 6 = 0 |
| 4 | 6 | 0 | — stop — |

Rezultat: CMDC(48, 18) = **6**

Verificare: 48 = 6 × 8, 18 = 6 × 3 ✓

**Exemplul 2:** CMDC(100, 75, 50)

- CMDC(100, 75): 100 mod 75 = 25 → 75 mod 25 = 0 → CMDC = 25
- CMDC(25, 50): 50 mod 25 = 0 → CMDC = 25

Rezultat: CMDC(100, 75, 50) = **25**

**Exemplul 3:** Reducerea fracției 36/48

CMDC(36, 48): 48 mod 36 = 12 → 36 mod 12 = 0 → CMDC = 12

36/48 = (36÷12)/(48÷12) = **3/4**

## Aplicații

- **Reducerea fracțiilor** – o fracție a/b se simplifică prin împărțirea numărătorului și numitorului la CMDC(a, b).
- **Criptografie** – algoritmul euclidian extins calculează inversul modular, esențial în RSA.
- **Calculul CMMC** – CMMC(a, b) = a × b / CMDC(a, b).
- **Teoria numerelor** – verificarea dacă două numere sunt coprime (CMDC = 1).
- **Algoritmi de sincronizare** – în sisteme real-time, CMDC determină perioada comună.
- **Compresia datelor** – în algoritmi precum LZ77 pentru detectarea pattern-urilor repetate.

## Observații din implementare

- Folosește cel puțin o buclă while în implementare.
- Implementarea folosește funcții arrow/funcții compacte.

## Resurse

- [Wikipedia – Cel mai mare divizor comun](https://ro.wikipedia.org/wiki/Cel_mai_mare_divizor_comun)
- [GeeksForGeeks – GCD and LCM](https://www.geeksforgeeks.org/c-program-find-gcd-hcf-two-numbers/)
- [Khan Academy – Greatest common factor](https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-factors-and-multiples/cc-6th-gcf/v/greatest-common-divisor)
