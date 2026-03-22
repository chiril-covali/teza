# Algoritmul Bellman-Ford

Slug: grafuri_bellman_ford
Categorie: Grafuri

## Introducere

Algoritmul Bellman-Ford rezolvă problema **celui mai scurt drum de la o sursă unică** (Single-Source Shortest Path) într-un graf ponderat, cu posibilitatea de a gestiona **ponderi negative** pe muchii. Spre deosebire de algoritmul Dijkstra, care funcționează doar cu ponderi nenegative, Bellman-Ford poate detecta și raporta existența **ciclurilor de cost negativ** (situații în care suma ponderilor unui ciclu este negativă, ceea ce face ca drumul cel mai scurt să fie -∞).

Algoritmul a fost dezvoltat independent de **Richard Bellman** (1958, articolul „On a Routing Problem") și **Lester Ford Jr.** (1956, raport tehnic). Alfonso Shimbel descrisese un algoritm similar în 1955. Ulterior, Edward Moore a contribuit la generalizarea sa, motiv pentru care uneori este numit Bellman-Ford-Moore.

Bellman-Ford are o complexitate mai mare decât Dijkstra, dar este indispensabil în contextele cu ponderi negative, cum ar fi modelarea câștigurilor și pierderilor financiare, algoritmii de arbitraj în tranzacționare, sau rețelele de telecomunicații cu costuri variabile. Este utilizat și în protocoale de rutare precum RIP (Routing Information Protocol).

## Descriere

Algoritmul se bazează pe principiul **relaxării repetate a muchiilor**: dacă distanța la un nod `v` poate fi îmbunătățită trecând prin muchia `u→v`, atunci actualizăm distanța lui `v`. Procesul de relaxare se repetă de **V-1 ori** (unde V este numărul de noduri), deoarece cel mai lung drum simplu (fără cicluri) poate conține cel mult V-1 muchii.

**Pașii algoritmului:**

1. Inițializează distanța sursă la 0 și toate celelalte distanțe la infinit.
2. Repetă de V-1 ori:
   a. Pentru fiecare muchie (u, v) cu pondere w din graf:
      - Dacă `distanță[u] + w < distanță[v]`: actualizează `distanță[v] ← distanță[u] + w`.
3. Verificare cicluri negative (pasul al V-lea):
   - Pentru fiecare muchie (u, v) cu pondere w:
     - Dacă `distanță[u] + w < distanță[v]`: există un ciclu negativ → returnează eroare/null.
4. Returnează vectorul distanțelor.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| General | O(V · E) | O(V) |
| Graf dens (E ≈ V²) | O(V³) | O(V) |

**Explicație:** Algoritmul efectuează V-1 iterații, fiecare parcurgând toate E muchiile grafului → O(V · E). Spațiul necesar este O(V) pentru vectorul distanțelor și al predecesorilor. Aceasta îl face mai lent decât Dijkstra pentru grafuri fără ponderi negative, dar unica opțiune viabilă simplă pentru grafuri cu ponderi negative.

## Pseudocod

```
BellmanFord(graf, sursă):
  n ← numărul de noduri
  distanță ← array de dimensiune n, inițializat cu ∞
  anterior ← array de dimensiune n, inițializat cu null

  distanță[sursă] ← 0

  // Relaxare V-1 ori
  pentru i de la 1 la n-1:
    pentru fiecare muchie (u, v, w) în muchiile grafului:
      dacă distanță[u] ≠ ∞ și distanță[u] + w < distanță[v]:
        distanță[v] ← distanță[u] + w
        anterior[v] ← u

  // Detectare ciclu negativ
  pentru fiecare muchie (u, v, w) în muchiile grafului:
    dacă distanță[u] ≠ ∞ și distanță[u] + w < distanță[v]:
      returnează null  // ciclu negativ detectat

  returnează distanță, anterior
```

## Exemple

Considerăm graful orientat ponderat (cu o pondere negativă):

```
  1 --(-1)-→ 2 --(4)--→ 3
  |          |          ↑
 (6)        (3)        (2)
  ↓          ↓          |
  4 --(5)--→ 3          4
```

Muchii: 1→2(-1), 1→4(6), 2→3(4), 2→4(3), 4→3(5), 3→... Sursă: 1.

**Inițializare:** dist = [0, ∞, ∞, ∞] (indexuri 1-4).

**Iterația 1** (relaxăm toate muchiile):
- 1→2(-1): dist[2] = 0+(-1) = -1 ✓
- 1→4(6): dist[4] = 0+6 = 6 ✓
- 2→3(4): dist[3] = -1+4 = 3 ✓
- 2→4(3): dist[4] = min(6, -1+3) = 2 ✓
- 4→3(5): dist[3] = min(3, 2+5) = 3 (nu se îmbunătățește)

**Iterația 2** (verificare convergență):
- Nu se mai îmbunătățește nicio distanță.

**Iteratiile 3...V-1:** Nicio modificare.

**Verificare ciclu negativ:** Niciuna dintre muchii nu mai poate fi relaxată → **Nu există ciclu negativ**.

**Distanțe finale:** d(1)=0, d(2)=-1, d(3)=3, d(4)=2.

## Aplicații

- **Rețele cu costuri variabile:** Rutarea în rețele unde latența sau costul poate fi negativ (reduceri, bonusuri).
- **Arbitraj financiar:** Detectarea oportunităților de arbitraj în piețele valutare (ciclu negativ = profit garantat).
- **Protocoale de rutare:** RIP (Routing Information Protocol) folosește o variantă a Bellman-Ford distribuită.
- **Analiza dependențelor temporale:** Planificarea proiectelor cu constrângeri de tip „diferență" (Constraint Networks).
- **Procesarea tranzacțiilor:** Detectarea secvențelor de tranzacții cu profit net negativ (fraudă).
- **Jocuri și simulări:** Sisteme cu penalizări și bonusuri complexe.

## Resurse

- [Wikipedia — Bellman–Ford algorithm](https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm)
- [GeeksForGeeks — Bellman-Ford Algorithm](https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/)
- [Visualgo — Single-Source Shortest Paths](https://visualgo.net/en/sssp)
- [CP-Algorithms — Bellman-Ford Algorithm](https://cp-algorithms.com/graph/bellman_ford.html)
