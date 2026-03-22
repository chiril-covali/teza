# Sortare prin Heap (Heap Sort)

## Introducere

Sortarea prin heap (Heap Sort) este un algoritm de sortare bazat pe comparații care folosește o structură de date de tip heap binar pentru a gestiona eficient extragerea elementului maxim (sau minim). Algoritmul a fost inventat de J. W. J. Williams în 1964 și îmbunătățit ulterior de Robert Floyd în același an, care a propus construcția mai eficientă a heap-ului (heapify de jos în sus).

Heap Sort combină cele mai bune proprietăți ale sortării prin inserție (in-place, O(1) spațiu) și ale sortării prin interclasare (O(n log n) garantat în toate cazurile). Spre deosebire de Quick Sort, nu are un caz degenerat O(n²), iar spre deosebire de Merge Sort, nu necesită memorie auxiliară suplimentară.

Dezavantajul principal al Heap Sort față de Quick Sort este comportamentul mai puțin prietenos față de memoria cache: accesele la heap sunt mai dispersate în memorie, ceea ce duce la mai multe ratări de cache și, în practică, la o viteză mai mică decât Quick Sort, deși complexitatea teoretică este identică.

## Descriere

Algoritmul funcționează în două faze. Prima fază construiește un max-heap din tabloul de intrare (un arbore binar complet în care fiecare nod este mai mare sau egal cu copiii săi). A doua fază extrage repetat rădăcina (elementul maxim) din heap, o plasează la sfârșitul tabloului și reface proprietatea de heap pentru porțiunea rămasă.

**Pașii algoritmului:**

1. Construiește un max-heap din tabloul de intrare (heapify de jos în sus, pornind de la ultimul nod intern).
2. Primul element (rădăcina) este maximul — interschimbă-l cu ultimul element al heap-ului.
3. Reduce dimensiunea heap-ului cu 1 (ultimul element este acum la locul lui final).
4. Reface proprietatea de max-heap pentru noua rădăcină (operația sift-down/heapify).
5. Repetă pașii 2–4 până când heap-ul are un singur element.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(n log n) | O(1) |
| Mediu | O(n log n) | O(1) |
| Cel mai rău | O(n log n) | O(1) |

**Explicație:** Construcția heap-ului costă O(n) (nu O(n log n) cum s-ar putea crede intuitiv — demonstrația matematică arată că suma înălțimilor nodurilor este O(n)). Faza de extracție repetată costă O(n log n): n extracții × O(log n) pentru refacerea heap-ului. Total: O(n log n) în toate cazurile. Spațiul este O(1) deoarece heap-ul este construit in-place în același tablou. Stiva de recursivitate pentru heapify iterativ este O(1).

## Pseudocod

```
functie heapSort(A, n):
    // Construieste max-heap
    pentru i de la n/2-1 la 0 (descrescator):
        heapify(A, n, i)
    // Extrage elemente din heap
    pentru i de la n-1 la 1 (descrescator):
        interschimba A[0] cu A[i]
        heapify(A, i, 0)

functie heapify(A, n, i):
    maxim = i
    stanga = 2*i + 1
    dreapta = 2*i + 2
    daca stanga < n si A[stanga] > A[maxim]:
        maxim = stanga
    daca dreapta < n si A[dreapta] > A[maxim]:
        maxim = dreapta
    daca maxim != i:
        interschimba A[i] cu A[maxim]
        heapify(A, n, maxim)
```

## Exemple

**Tablou inițial:** `[4, 10, 3, 5, 1]`

**Faza 1 – Construcția max-heap-ului:**
- Structura inițială ca arbore binar:
```
        4
      /   \
    10     3
   /  \
  5    1
```
- Heapify de la nodul 1 (valoarea 10): copiii sunt 5 și 1, 10 > 5 și 10 > 1, nu se schimbă.
- Heapify de la nodul 0 (valoarea 4): copiii sunt 10 și 3, max=10 la stânga → interschimbă 4 cu 10.
```
       10
      /   \
    4      3
   / \
  5   1
```
- Heapify de la nodul 1 (valoarea 4): copiii sunt 5 și 1, max=5 → interschimbă 4 cu 5.
```
       10
      /   \
    5      3
   / \
  4   1
```
- **Max-heap construit:** `[10, 5, 3, 4, 1]`

**Faza 2 – Extragerea elementelor:**
- Extrage 10 (A[0] ↔ A[4]): `[1, 5, 3, 4, | 10]` → heapify → `[5, 4, 3, 1, | 10]`
- Extrage 5 (A[0] ↔ A[3]): `[1, 4, 3, | 5, 10]` → heapify → `[4, 1, 3, | 5, 10]`
- Extrage 4 (A[0] ↔ A[2]): `[3, 1, | 4, 5, 10]` → heapify → `[3, 1, | 4, 5, 10]`
- Extrage 3 (A[0] ↔ A[1]): `[1, | 3, 4, 5, 10]`

**Tablou final sortat:** `[1, 3, 4, 5, 10]`

## Aplicații

- **Cozi de priorități:** Structura de heap (nu algoritmul în sine) este folosită extensiv în cozi de priorități.
- **Algoritmul lui Dijkstra:** Heap-ul minim accelerează extragerea nodului cu distanța minimă.
- **Garanție O(n log n) fără spațiu extra:** Când nu se poate accepta cazul O(n²) al Quick Sort și nu există memorie pentru Merge Sort.
- **Sisteme în timp real:** Complexitatea garantată îl face adecvat pentru sisteme cu constrângeri stricte de timp.
- **Medii cu resurse limitate:** Spațiul O(1) îl face atractiv pentru sisteme embedded.

## Resurse

- [Wikipedia – Heapsort](https://en.wikipedia.org/wiki/Heapsort)
- [GeeksForGeeks – Heap Sort](https://www.geeksforgeeks.org/heap-sort/)
- [Visualgo – Sorting](https://visualgo.net/en/sorting)
- [GeeksForGeeks – Binary Heap](https://www.geeksforgeeks.org/binary-heap/)
