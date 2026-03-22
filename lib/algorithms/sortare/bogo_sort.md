# Sortare Stupidă (Bogo Sort)

## Introducere

Bogo Sort (cunoscut și ca Stupid Sort, Permutation Sort, Shotgun Sort sau Monkey Sort) este un algoritm de sortare extrem de ineficient, folosit exclusiv în scop umoristic și educațional. Algoritmul funcționează prin amestecarea aleatorie repetată a tabloului până când acesta se găsește, din întâmplare, în ordine sortată. Este analogul computațional al metodei „aruncă toate cărțile în aer și speră că aterrizează în ordine".

Denumirea „bogo" provine din termenul englezesc „bogus" (fals, absurd). Termenul „Monkey Sort" face referire la „teorema maimuței infinite" — dacă o maimuță tastează aleatoriu la nesfârșit, va produce în cele din urmă orice text finit, inclusiv opera completă a lui Shakespeare. Similar, Bogo Sort va sorta oricând tabloul, dar poate dura o eternitate.

Bogo Sort nu are o aplicație practică reală. Este menționat în literatura de informatică ca exemplu de algoritm incorect de proiectat și ca punct de referință pentru compararea performanței altor algoritmi. Complexitatea sa medie O((n+1)!) îl face inutilizabil pentru orice n > 10.

## Descriere

Algoritmul verifică dacă tabloul este sortat. Dacă nu, amestecă aleatoriu elementele și verifică din nou. Repetă procesul până când tabloul ajunge sortat, ceea ce se va întâmpla la un moment dat (cu probabilitate 1 după un număr infinit de încercări).

**Pașii algoritmului:**

1. Verifică dacă tabloul este sortat (parcurge tabloul și verifică că A[i] ≤ A[i+1] pentru toți i).
2. Dacă tabloul este sortat, oprește-te și returnează tabloul.
3. Dacă tabloul nu este sortat, amestecă aleatoriu toate elementele (shuffle).
4. Revino la pasul 1.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(n) | O(1) |
| Mediu | O((n+1)!) | O(n) |
| Cel mai rău | O(∞) | O(n) |

**Explicație:** Cazul cel mai bun este O(n): tabloul este deja sortat de la bun început (sau norocos la prima amestecare) — necesită doar o verificare lineară. Cazul mediu este O((n+1)!): probabilitatea ca o amestecare aleatorie să producă tabloul sortat este 1/n!, deci în medie sunt necesare n! încercări, fiecare cu o verificare O(n) → total O(n × n!) = O((n+1)!). Cazul cel mai rău este teoretic infinit — nu există garanție că algoritmul va termina (în practică, cu un generator de numere aleatoare bun, va termina eventual). Spațiul O(n) este necesar pentru stocarea tabloului.

**Comparație pentru n=10:**
- Bubble Sort: ~100 operații
- Quick Sort: ~33 operații
- Bogo Sort medie: ~10! = 3.628.800 operații

## Pseudocod

```
functie esteSort(A, n):
    pentru i de la 0 la n-2:
        daca A[i] > A[i+1]:
            returneaza fals
    returneaza adevarat

functie shuffle(A, n):
    pentru i de la n-1 la 1:
        j = numar_aleator_intre(0, i)
        interschimba A[i] cu A[j]

functie bogoSort(A, n):
    cat timp nu esteSort(A, n):
        shuffle(A, n)
    returneaza A
```

## Exemple

**Tablou inițial:** `[3, 2, 1]`

**Verificare 1:** 3 > 2 → nu e sortat → amestecare aleatorie: `[1, 3, 2]`
**Verificare 2:** 3 > 2 → nu e sortat → amestecare aleatorie: `[2, 1, 3]`
**Verificare 3:** 2 > 1 → nu e sortat → amestecare aleatorie: `[3, 1, 2]`
**Verificare 4:** 3 > 1 → nu e sortat → amestecare aleatorie: `[2, 3, 1]`
**Verificare 5:** 3 > 1 → nu e sortat → amestecare aleatorie: `[1, 2, 3]`
**Verificare 6:** 1 ≤ 2 ≤ 3 → **SORTAT!** → returnează `[1, 2, 3]`

Probabilitatea de a obține ordinea corectă la o amestecare: 1/3! = 1/6 ≈ 16.7%
Numărul mediu de amestecări: 6 (exact n! pentru n=3)

## Aplicații

- **Scop umoristic:** Frecvent menționat în glumele din comunitatea de programatori.
- **Scop educațional:** Ilustrează importanța alegerii algoritmului potrivit și costul ineficienței.
- **Punct de referință negativ:** Folosit pentru a arăta că nu orice algoritm care produce rezultat corect este acceptabil.
- **Interviuri tehnice:** Uneori menționat în discuții despre complexitate și design de algoritmi.
- **Teoria probabilităților:** Ilustrează concret conceptul de probabilitate în algoritmi randomizați.

## Resurse

- [Wikipedia – Bogosort](https://en.wikipedia.org/wiki/Bogosort)
- [GeeksForGeeks – BogoSort or Permutation Sort](https://www.geeksforgeeks.org/bogosort-permutation-sort/)
- [Sorting Algorithm Humor – CS Course Examples](https://cs.stackexchange.com/questions/tagged/sorting)
