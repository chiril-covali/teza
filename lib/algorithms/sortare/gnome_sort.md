# Sortare Gnome (Gnome Sort)

## Introducere

Sortarea Gnome (Gnome Sort), numită și Stupid Sort în varianta sa originală, este un algoritm de sortare simplu bazat pe comparații, conceptual similar cu sortarea prin inserție. A fost propus de Hamid Sarbazi-Azad în 2000 sub numele de „Stupid Sort", iar mai târziu Dick Grune i-a dat denumirea mai prietenoasă de „Gnome Sort" în 2000, inspirat de o analogie cu un grădinar gnome care sortează ghivece de flori.

Analogia originală: un gnome de grădină sortează un șir de ghivece de flori după înălțime. Gnome-ul se uită la ghivecele adiacente — dacă sunt în ordine corectă, avansează înainte; dacă nu, le interschimbă și face un pas înapoi pentru a verifica din nou. Procesul continuă până când gnome-ul ajunge la capătul șirului.

Deși algoritmul nu este eficient pentru seturi mari de date (O(n²) în cazul mediu), are o implementare extrem de simplă — poate fi scris în 5-6 linii de cod — și este util în scop educațional pentru înțelegerea principiilor de bază ale sortării.

## Descriere

Algoritmul menține un pointer curent care parcurge tabloul. La fiecare poziție, dacă elementele de la pozițiile curente și precedente sunt în ordine corectă (sau pointer-ul este la început), avansează. Dacă nu sunt în ordine, le interschimbă și se întoarce un pas înapoi. Procesul continuă până când pointer-ul ajunge la capătul tabloului.

**Pașii algoritmului:**

1. Inițializează pointer-ul `pos = 0`.
2. Dacă `pos = 0`, incrementează `pos` (nu există element precedent de comparat).
3. Dacă `A[pos] >= A[pos-1]`, elementele sunt în ordine — incrementează `pos`.
4. Dacă `A[pos] < A[pos-1]`, elementele sunt în ordine greșită:
   - Interschimbă `A[pos]` cu `A[pos-1]`.
   - Decrementează `pos` (întoarce-te un pas înapoi).
5. Repetă pașii 2–4 până când `pos = n` (capătul tabloului).

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(n) | O(1) |
| Mediu | O(n²) | O(1) |
| Cel mai rău | O(n²) | O(1) |

**Explicație:** Cazul cel mai bun apare când tabloul este deja sortat — pointer-ul avansează continuu fără nicio întoarcere, rezultând O(n). Cazul cel mai rău apare când tabloul este sortat descrescător — pentru fiecare element, pointer-ul trebuie să se întoarcă până la poziția 0, rezultând 0+1+2+...+(n-1) = O(n²) operații. Spațiul este O(1) — sortarea este in-place, fără structuri auxiliare.

## Pseudocod

```
functie gnomeSort(A, n):
    pos = 0
    cat timp pos < n:
        daca pos == 0:
            pos++
        altfel daca A[pos] >= A[pos-1]:
            pos++
        altfel:
            interschimba A[pos] cu A[pos-1]
            pos--
    returneaza A
```

## Exemple

**Tablou inițial:** `[34, 2, 10, -9]`

**Iterații:**
- pos=0 → pos++ → pos=1
- pos=1: A[1]=2 < A[0]=34 → interschimbă → `[2, 34, 10, -9]`, pos=0
- pos=0 → pos++ → pos=1
- pos=1: A[1]=34 >= A[0]=2 → pos++ → pos=2
- pos=2: A[2]=10 < A[1]=34 → interschimbă → `[2, 10, 34, -9]`, pos=1
- pos=1: A[1]=10 >= A[0]=2 → pos++ → pos=2
- pos=2: A[2]=34 >= A[1]=10 → pos++ → pos=3
- pos=3: A[3]=-9 < A[2]=34 → interschimbă → `[2, 10, -9, 34]`, pos=2
- pos=2: A[2]=-9 < A[1]=10 → interschimbă → `[2, -9, 10, 34]`, pos=1
- pos=1: A[1]=-9 < A[0]=2 → interschimbă → `[-9, 2, 10, 34]`, pos=0
- pos=0 → pos++ → pos=1
- pos=1: A[1]=2 >= A[0]=-9 → pos++ → pos=2
- pos=2: A[2]=10 >= A[1]=2 → pos++ → pos=3
- pos=3: A[3]=34 >= A[2]=10 → pos++ → pos=4 = n → STOP

**Tablou final sortat:** `[-9, 2, 10, 34]`

## Aplicații

- **Scop educațional:** Implementarea extrem de simplă îl face ideal pentru predarea conceptelor fundamentale de sortare.
- **Prototipare rapidă:** Când se dorește o implementare de sortare corectă în minimum de cod.
- **Seturi de date foarte mici:** n < 10 elemente, unde simplitatea depășește importanța performanței.
- **Verificarea corectitudinii:** Poate fi folosit ca referință simplă pentru testarea altor algoritmi de sortare.

## Resurse

- [Wikipedia – Gnome Sort](https://en.wikipedia.org/wiki/Gnome_sort)
- [GeeksForGeeks – Gnome Sort](https://www.geeksforgeeks.org/gnome-sort-a-stupid-one/)
- [Dick Grune – Gnome Sort original](https://dickgrune.com/Programs/gnomesort.html)
- [Visualgo – Sorting](https://visualgo.net/en/sorting)
