# Sortare prin Selecție (Selection Sort)

## Introducere

Sortarea prin selecție este un algoritm de sortare simplu, bazat pe comparații, care funcționează prin găsirea repetată a minimului (sau maximului) din porțiunea nesortată a tabloului și plasarea lui la începutul (sau sfârșitul) acesteia. Este unul dintre primii algoritmi de sortare studiați în informatică, datorită simplității sale conceptuale.

Deși nu are un inventator specific documentat, algoritmul este studiat extensiv și descris în detaliu de Donald Knuth în „The Art of Computer Programming". Denumirea vine din mecanismul de bază: la fiecare pas, algoritmul „selectează" elementul minim din porțiunea nesortată.

Una dintre caracteristicile remarcabile ale sortării prin selecție este că realizează exact n-1 interschimbări (swap-uri), indiferent de datele de intrare, ceea ce îl face avantajos în situații unde costul scrierii în memorie este ridicat. Totuși, face întotdeauna O(n²) comparații, inclusiv în cazul cel mai bun, ceea ce îl face mai puțin eficient decât sortarea prin inserție pentru date aproape sortate.

## Descriere

Algoritmul împarte tabloul în două porțiuni: o porțiune sortată (inițial goală) și o porțiune nesortată (inițial întregul tablou). La fiecare iterație, algoritmul găsește cel mai mic element din porțiunea nesortată și îl interschimbă cu primul element al acesteia, extinzând astfel porțiunea sortată cu un element.

**Pașii algoritmului:**

1. Setează porțiunea sortată ca goală și porțiunea nesortată ca întreg tabloul.
2. Găsește indexul elementului minim din porțiunea nesortată.
3. Interschimbă elementul minim cu primul element al porțiunii nesortate.
4. Extinde porțiunea sortată cu un element (mută limita cu o poziție la dreapta).
5. Repetă pașii 2–4 până când porțiunea nesortată devine goală.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(n²) | O(1) |
| Mediu | O(n²) | O(1) |
| Cel mai rău | O(n²) | O(1) |

**Explicație:** Indiferent de starea inițială a tabloului, algoritmul trebuie să parcurgă toată porțiunea nesortată pentru a găsi minimul. Pentru n elemente, se fac n-1 + n-2 + ... + 1 = n(n-1)/2 comparații, deci O(n²) în toate cazurile. Numărul de interschimbări este exact n-1 (optim printre algoritmii de sortare bazați pe comparații). Spațiul auxiliar este O(1) — sortarea este in-place.

## Pseudocod

```
functie selectionSort(A, n):
    pentru i de la 0 la n-2:
        indexMin = i
        pentru j de la i+1 la n-1:
            daca A[j] < A[indexMin]:
                indexMin = j
        daca indexMin != i:
            interschimba A[i] cu A[indexMin]
    returneaza A
```

## Exemple

**Tablou inițial:** `[64, 25, 12, 22, 11]`

**Pasul 1** (i=0):
- Găsește minimul în `[64, 25, 12, 22, 11]` → minim=11, index=4
- Interschimbă A[0]=64 cu A[4]=11
- `[11, 25, 12, 22, 64]`

**Pasul 2** (i=1):
- Găsește minimul în `[25, 12, 22, 64]` → minim=12, index=2
- Interschimbă A[1]=25 cu A[2]=12
- `[11, 12, 25, 22, 64]`

**Pasul 3** (i=2):
- Găsește minimul în `[25, 22, 64]` → minim=22, index=3
- Interschimbă A[2]=25 cu A[3]=22
- `[11, 12, 22, 25, 64]`

**Pasul 4** (i=3):
- Găsește minimul în `[25, 64]` → minim=25, index=3
- A[3] este deja minimul, nu se interschimbă
- `[11, 12, 22, 25, 64]`

**Tablou final sortat:** `[11, 12, 22, 25, 64]`
Total interschimbări: 3 (față de potențial multe mai multe la bubble sort)

## Aplicații

- **Sisteme cu scrieri costisitoare:** Numărul minim de interschimbări (O(n)) face algoritmul ideal pentru memorii flash sau EEPROM unde scrierile sunt limitate.
- **Scop educațional:** Ușor de înțeles și implementat, ilustrează conceptul de invariant al buclei.
- **Seturi de date mici:** Eficient în practică pentru n < 20 de elemente, datorită constantei mici.
- **Sortare cu criterii multiple:** Varianta de heapsort derivă din principiile selecției.
- **Sortarea fișierelor mari cu chei mici:** Când costul de comparație este neglijabil față de cel de scriere.

## Resurse

- [Wikipedia – Selection Sort](https://en.wikipedia.org/wiki/Selection_sort)
- [GeeksForGeeks – Selection Sort](https://www.geeksforgeeks.org/selection-sort/)
- [Visualgo – Sorting](https://visualgo.net/en/sorting)
- [Khan Academy – Selection Sort](https://www.khanacademy.org/computing/computer-science/algorithms/selection-sort/a/selection-sort)
