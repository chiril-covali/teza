# Toate Combinările de Dimensiune K (Backtracking)

Slug: backtracking_all_combinations_of_size_k
Categorie: Backtracking

## Introducere

Problema generării tuturor combinațiilor de dimensiune `k` dintr-o mulțime de `n` elemente este una din problemele fundamentale ale combinatoricii și informaticii. O combinație de dimensiune `k` este o submulțime de exact `k` elemente, fără a ține cont de ordinea lor (spre deosebire de permutări, unde ordinea contează).

Numărul de astfel de combinații este dat de **coeficientul binomial** (sau „combinări din n luate câte k"):
`C(n, k) = n! / (k! · (n-k)!)`

Această valoare apare în formula binomului lui Newton, în probabilitate (numărul de moduri de a alege `k` elemente favorabile din `n`) și în numeroase alte domenii matematice. Triunghi lui Pascal, studiat de Blaise Pascal (1623–1662), oferă o metodă elegantă de calcul: `C(n,k) = C(n-1,k-1) + C(n-1,k)`.

Algoritmul de backtracking este abordarea naturală pentru generarea acestor combinații: construim combinația element cu element, alegând la fiecare pas un element din mulțimea disponibilă, și „dăm înapoi" (backtrack) atunci când am completat o combinație sau când nu mai pot exista suficiente elemente pentru a completa combinația curentă.

## Descriere

Algoritmul generează combinații în ordine lexicografică. Menține un tablou `combinație` de dimensiune `k` și un index de start care asigură că nu se repetă elementele și că ordinea este crescătoare (garantând că fiecare submulțime este generată o singură dată).

**Pașii algoritmului:**

1. Apelează recursiv funcția `backtrack(start, combinațieCurentă)`.
2. Dacă `|combinațieCurentă| == k`: adaugă combinația la rezultate și returnează.
3. Parcurge `i` de la `start` la `n - (k - |combinațieCurentă|)` (pruning: trebuie să rămână suficiente elemente).
4. Adaugă `i` la `combinațieCurentă`.
5. Apelează recursiv `backtrack(i+1, combinațieCurentă)`.
6. Elimină ultimul element din `combinațieCurentă` (**backtrack**).

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(C(n,k) · k) | O(k) |
| Mediu | O(C(n,k) · k) | O(k) |
| Cel mai rău | O(C(n,k) · k) | O(k) |

**Explicație:** Există `C(n,k)` combinații distincte, iar pentru fiecare se construiește un array de `k` elemente (costul copierii). Adâncimea recursiei este `k` (se adaugă câte un element la fiecare nivel), deci stiva folosește O(k) spațiu. Optimizarea prin „pruning" (condiția de stop anticipat) reduce semnificativ numărul de noduri explorate în arborele de recursie față de o abordare naivă, dar complexitatea asimptotică rămâne același.

## Pseudocod

```
COMBINĂRI(n, k):
    rezultate ← []
    BACKTRACK(1, [], n, k, rezultate)
    RETURNEAZĂ rezultate

BACKTRACK(start, curentă, n, k, rezultate):
    DACĂ lungime(curentă) = k:
        adaugă copie a lui curentă la rezultate
        RETURNEAZĂ

    // Pruning: trebuie să mai existe destule elemente
    rămase ← k - lungime(curentă)
    PENTRU i DE LA start LA n - rămase + 1:
        adaugă i la curentă
        BACKTRACK(i + 1, curentă, n, k, rezultate)
        elimină ultimul element din curentă  // backtrack
```

## Exemple

**Exemplu n=4, k=2:** Generare combinări din `{1, 2, 3, 4}` luate câte `2`.

Arborele de backtracking:
```
start=1: alege 1
  start=2: alege 2 → [1,2] ✓ (lungime=k)
  start=3: alege 3 → [1,3] ✓
  start=4: alege 4 → [1,4] ✓
start=2: alege 2
  start=3: alege 3 → [2,3] ✓
  start=4: alege 4 → [2,4] ✓
start=3: alege 3
  start=4: alege 4 → [3,4] ✓
```

**Rezultat:** `[[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]]` — 6 combinații = C(4,2) ✓

**Exemplu n=5, k=3:** C(5,3) = 10 combinații.
```
[1,2,3], [1,2,4], [1,2,5], [1,3,4], [1,3,5],
[1,4,5], [2,3,4], [2,3,5], [2,4,5], [3,4,5]
```

**Demonstrarea pruning-ului (optimizare):** Pentru n=5, k=3, când `curentă=[4]` și `start=5`:
- `rămase = 3 - 1 = 2` elemente necesare
- Limita superioară: `5 - 2 + 1 = 4`
- Deoarece `start=5 > 4`, bucla nu se execută → **ramură tăiată** fără explorare inutilă.

## Aplicații

- **Probabilitate și statistică:** Calculul probabilităților combinatoriale (ex: probabilitatea de a obține o anumită mână de poker).
- **Bioinformatică:** Selectarea subseturilor de gene pentru analiză, alinierea secvențelor ADN.
- **Criptografie:** Generarea cheilor și testarea combinațiilor în analize de securitate.
- **Optimizare combinatorică:** Problema rucsacului (knapsack), acoperirea mulțimilor (set cover), selecția de portofoliu.
- **Machine Learning:** Feature selection — alegerea celor mai relevante `k` caracteristici din `n` disponibile.
- **Testare software:** Generarea cazurilor de test prin combinarea `k` din `n` parametri (testare combinatorică).
- **Jocuri și puzzle-uri:** Generarea tuturor stărilor posibile în jocuri de strategie, rezolvarea Sudoku.
- **Calcul distribuit:** Partajarea secretelor (Secret Sharing Schemes) folosind combinări.

## Resurse

- [Wikipedia - Combination](https://en.wikipedia.org/wiki/Combination)
- [GeeksForGeeks - Print all possible combinations of r elements in a given array](https://www.geeksforgeeks.org/print-all-possible-combinations-of-r-elements-in-a-given-array-of-size-n/)
- [LeetCode #77 - Combinations](https://leetcode.com/problems/combinations/)
- [Wikipedia - Catalan Number & Backtracking](https://en.wikipedia.org/wiki/Backtracking)
