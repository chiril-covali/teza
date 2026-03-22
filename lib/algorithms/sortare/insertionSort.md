# Sortare prin Inserție (Insertion Sort)

## Introducere

Sortarea prin inserție este un algoritm simplu și intuitiv care construiește tabloul sortat câte un element pe rând, inserând fiecare element nou în poziția corectă din porțiunea deja sortată. Algoritmul imită modul în care un om sortează cărțile de joc în mână: iei o carte nouă și o inserezi în poziția potrivită printre cărțile deja aranjate.

Algoritmul este cunoscut și utilizat de mult timp în informatică, dar nu are un inventator specific — este o formalizare a unei metode naturale de sortare umană. A fost studiat și analizat extensiv de Donald Knuth în „The Art of Computer Programming". Este eficient pentru seturi de date mici și aproape sortate, și este adesea folosit ca subroutină în algoritmi hibrid mai complecși.

Sortarea prin inserție are avantajul de a fi stabilă (menține ordinea relativă a elementelor egale), in-place (fără spațiu auxiliar semnificativ) și adaptivă (performează mai bine pe date aproape sortate). Din aceste motive, este folosită în practică în algoritmi precum Timsort (utilizat în Python și Java) pentru sortarea secvențelor mici.

## Descriere

Algoritmul împarte tabloul în două porțiuni: o porțiune sortată (inițial conținând doar primul element) și o porțiune nesortată. La fiecare pas, primul element din porțiunea nesortată este extras și inserat în poziția corectă din porțiunea sortată, deplasând elementele mai mari cu o poziție la dreapta pentru a face loc.

**Pașii algoritmului:**

1. Consideră primul element ca fiind deja sortat (porțiunea sortată are un singur element).
2. Ia următorul element din porțiunea nesortată (acesta devine „cheia").
3. Compară cheia cu elementele din porțiunea sortată, mergând de la dreapta spre stânga.
4. Deplasează cu o poziție la dreapta fiecare element sortat care este mai mare decât cheia.
5. Inserează cheia în poziția goală rămasă.
6. Repetă pașii 2–5 până când toate elementele sunt procesate.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(n) | O(1) |
| Mediu | O(n²) | O(1) |
| Cel mai rău | O(n²) | O(1) |

**Explicație:** Cazul cel mai bun apare când tabloul este deja sortat — fiecare element este comparat o singură dată cu precedentul și nu se face nicio deplasare, rezultând O(n). Cazul cel mai rău apare când tabloul este sortat invers — fiecare element trebuie deplasat la începutul porțiunii sortate, necesitând 1+2+...+(n-1) = n(n-1)/2 operații, adică O(n²). Spațiul este O(1) deoarece sortarea se face in-place.

## Pseudocod

```
functie insertionSort(A, n):
    pentru i de la 1 la n-1:
        cheie = A[i]
        j = i - 1
        cat timp j >= 0 si A[j] > cheie:
            A[j+1] = A[j]
            j = j - 1
        A[j+1] = cheie
    returneaza A
```

## Exemple

**Tablou inițial:** `[12, 11, 13, 5, 6]`

**Pasul 1** (i=1, cheie=11):
- 12 > 11 → deplasează 12 la dreapta
- Inserează 11 la poziția 0
- `[11, 12, 13, 5, 6]`

**Pasul 2** (i=2, cheie=13):
- 12 < 13 → nu deplasa nimic
- Inserează 13 la poziția 2 (rămâne pe loc)
- `[11, 12, 13, 5, 6]`

**Pasul 3** (i=3, cheie=5):
- 13 > 5 → deplasează 13
- 12 > 5 → deplasează 12
- 11 > 5 → deplasează 11
- Inserează 5 la poziția 0
- `[5, 11, 12, 13, 6]`

**Pasul 4** (i=4, cheie=6):
- 13 > 6 → deplasează 13
- 12 > 6 → deplasează 12
- 11 > 6 → deplasează 11
- 5 < 6 → stop
- Inserează 6 la poziția 1
- `[5, 6, 11, 12, 13]`

**Tablou final sortat:** `[5, 6, 11, 12, 13]`

## Aplicații

- **Date aproape sortate:** Performează excelent (aproape O(n)) când datele sunt parțial sortate deja.
- **Seturi de date mici:** Este unul dintre cei mai rapizi algoritmi pentru n < 20-30 de elemente.
- **Algoritmi hibrid:** Folosit ca subrutină în Timsort (Python, Java) și Introsort (C++ STL) pentru secvențe mici.
- **Sortare online (streaming):** Poate sorta date pe măsură ce sunt primite, fără a le stoca pe toate.
- **Sisteme embedded:** Datorită implementării simple și spațiului O(1), este potrivit pentru microcontrolere.
- **Sortarea mâinilor de cărți:** Reflectă direct modul în care oamenii sortează cărți de joc.

## Resurse

- [Wikipedia – Insertion Sort](https://en.wikipedia.org/wiki/Insertion_sort)
- [GeeksForGeeks – Insertion Sort](https://www.geeksforgeeks.org/insertion-sort/)
- [Visualgo – Sorting](https://visualgo.net/en/sorting)
- [Khan Academy – Insertion Sort](https://www.khanacademy.org/computing/computer-science/algorithms/insertion-sort/a/insertion-sort)
