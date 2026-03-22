# Șirul lui Fibonacci

Slug: matematica_fibonacci
Categorie: Matematică

## Introducere

Șirul lui Fibonacci este una dintre cele mai cunoscute și fascinante secvențe din matematică. Fiecare număr din șir este suma celor două numere precedente, începând cu 0 și 1. Astfel, șirul arată astfel: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...

Secvența poartă numele matematicianului italian Leonardo din Pisa, cunoscut sub pseudonimul Fibonacci, care a introdus-o în Europa occidentală în lucrarea sa „Liber Abaci" din 1202. Cu toate acestea, secvența era deja cunoscută în matematica indiană cu secole înainte, fiind descrisă de Virahanka și Hemachandra în contextul metricii poetice.

Șirul Fibonacci apare în mod surprinzător în natură: în aranjamentul semințelor de floarea-soarelui, în spiralele cochiliei melcului nautilius, în ramificarea copacilor și în filotaxia plantelor. Raportul dintre termeni consecutivi tinde spre numărul de aur φ ≈ 1.618, care apare frecvent în artă, arhitectură și biologie.

## Descriere

Șirul Fibonacci este definit prin relația de recurență:

- F(0) = 0
- F(1) = 1
- F(n) = F(n-1) + F(n-2), pentru n ≥ 2

Există mai multe abordări pentru calculul celui de-al n-lea termen:

1. **Recursiv naiv** – implementare directă a definiției, dar cu complexitate exponențială O(2ⁿ) din cauza recalculărilor repetate.
2. **Iterativ** – parcurgere liniară cu complexitate O(n), stocând doar ultimii doi termeni.
3. **Memoizare (programare dinamică)** – se rețin rezultatele deja calculate, reducând complexitatea la O(n).
4. **Formula lui Binet** – calcul direct în O(1) dar cu pierderi de precizie pentru n mare.

**Pașii algoritmului iterativ:**
1. Dacă n = 0, returnează 0.
2. Dacă n = 1, returnează 1.
3. Inițializează prev = 0 și curr = 1.
4. Repetă de n-1 ori: calculează next = prev + curr, actualizează prev = curr și curr = next.
5. Returnează curr.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Recursiv naiv | O(2ⁿ) | O(n) — stivă de apeluri |
| Iterativ | O(n) | O(1) |
| Programare dinamică | O(n) | O(n) |
| Formula lui Binet | O(1) | O(1) |

**Explicație:** Algoritmul iterativ este cel mai eficient în practică: parcurge o singură dată termenii de la 2 la n, menținând în memorie doar ultimii doi termeni calculați. Varianta recursivă naivă recalculează aceiași termeni de un număr exponențial de ori (de exemplu, F(5) recalculează F(3) de două ori, F(2) de trei ori etc.).

## Pseudocod

```
funcție fibonacci(n):
    dacă n = 0:
        returnează 0
    dacă n = 1:
        returnează 1

    prev ← 0
    curr ← 1

    pentru i de la 2 până la n:
        următor ← prev + curr
        prev ← curr
        curr ← următor

    returnează curr
```

## Exemple

**Exemplul 1:** Calculul lui F(7)

| Pas | prev | curr | următor |
|-----|------|------|---------|
| Start | 0 | 1 | — |
| i=2 | 1 | 1 | 1 |
| i=3 | 1 | 2 | 2 |
| i=4 | 2 | 3 | 3 |
| i=5 | 3 | 5 | 5 |
| i=6 | 5 | 8 | 8 |
| i=7 | 8 | 13 | 13 |

Rezultat: F(7) = **13**

**Exemplul 2:** Primii 10 termeni ai șirului

| n | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| F(n) | 0 | 1 | 1 | 2 | 3 | 5 | 8 | 13 | 21 | 34 |

**Exemplul 3:** Raportul aurului — F(8)/F(7) = 21/13 ≈ 1.615, F(10)/F(9) = 55/34 ≈ 1.6176, tinzând spre φ ≈ 1.6180.

## Aplicații

- **Natură și biologie** – aranjamentul petalelor, semințelor și spiralelor în plante urmează numerele Fibonacci.
- **Numărul de aur** – raportul F(n+1)/F(n) converge la φ ≈ 1.618, folosit în design și artă.
- **Criptografie** – unele scheme de codificare și generatoare de numere pseudo-aleatoare se bazează pe proprietățile Fibonacci.
- **Structuri de date** – heap-urile Fibonacci oferă operații amortizate eficiente, folosite în algoritmi de drum cel mai scurt.
- **Analiza algoritmilor** – worst-case pentru algoritmul Euclidean al celui mai mare divizor comun.
- **Finanțe** – analiza tehnică a piețelor folosește niveluri de retragere Fibonacci (23.6%, 38.2%, 61.8%).

## Observații din implementare

- Folosește cel puțin o buclă while în implementare.
- Folosește cel puțin o buclă for în implementare.
- Implementarea folosește funcții arrow/funcții compacte.

## Resurse

- [Wikipedia – Numărul Fibonacci](https://ro.wikipedia.org/wiki/%C8%98irul_lui_Fibonacci)
- [GeeksForGeeks – Fibonacci Number](https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/)
- [Khan Academy – Fibonacci și numărul de aur](https://www.khanacademy.org/math/math-for-fun-and-glory/vi-hart/spirals-fibonacci/v/fibonacci-spirals)
