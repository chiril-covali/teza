# Algoritmul Floyd-Warshall

Slug: grafuri_floyd_warshall
Categorie: Grafuri

## Introducere

Algoritmul Floyd-Warshall rezolvă problema **celui mai scurt drum între toate perechile de noduri** (All-Pairs Shortest Path — APSP) dintr-un graf ponderat. Spre deosebire de Dijkstra sau Bellman-Ford care calculează drumurile de la o singură sursă, Floyd-Warshall calculează simultan distanțele minime între oricare două noduri ale grafului.

Algoritmul a fost publicat de **Robert W. Floyd** în 1962 în articolul „Algorithm 97: Shortest Path". La scurt timp, **Stephen Warshall** a publicat un algoritm similar pentru calculul închiderii tranzitive a unui graf. Bernard Roy descrisese un algoritm echivalent în 1959. Ideea centrală provine din **programarea dinamică** și se bazează pe principiul optimalității al lui Bellman.

Floyd-Warshall suportă ponderi negative pe muchii, dar **nu funcționează corect în prezența ciclurilor de cost negativ** (care ar permite drumuri de lungime -∞). Totuși, algoritmul poate detecta prezența ciclurilor negative verificând diagonala matricei de distanțe după execuție — dacă dist[i][i] < 0, există un ciclu negativ.

## Descriere

Algoritmul utilizează o matrice bidimensională `dist[i][j]` care reprezintă distanța minimă de la nodul `i` la nodul `j`. Ideea de bază este: pentru fiecare nod intermediar `k`, verificăm dacă trecerea prin `k` îmbunătățește drumul de la `i` la `j`.

Recurența este: `dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`

**Pașii algoritmului:**

1. Inițializează matricea `dist` cu ponderile muchiilor directe: `dist[i][j] = w(i,j)` dacă există muchia i→j, altfel ∞.
2. Setează `dist[i][i] = 0` pentru orice nod `i`.
3. Pentru fiecare nod intermediar `k` de la 1 la V:
   a. Pentru fiecare nod sursă `i` de la 1 la V:
      - Pentru fiecare nod destinație `j` de la 1 la V:
        - Dacă `dist[i][k] + dist[k][j] < dist[i][j]`:
          - Actualizează `dist[i][j] ← dist[i][k] + dist[k][j]`.
4. Verifică diagonala: dacă `dist[i][i] < 0`, există ciclu negativ.
5. Returnează matricea `dist`.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| General | O(V³) | O(V²) |
| Detectare ciclu negativ | O(V³) | O(V²) |

**Explicație:** Algoritmul constă din trei bucle imbricate, fiecare parcurgând cele V noduri → O(V³). Complexitatea spațială este O(V²) pentru matricea de distanțe (și opțional O(V²) pentru matricea de predecesori). Deși ineficient pentru grafuri rare cu V mare, este optim pentru grafuri dense unde E ≈ V² (rulând V aplicații Dijkstra ar costa O(V³ log V)).

## Pseudocod

```
FloydWarshall(graf):
  n ← numărul de noduri
  dist ← matrice n×n inițializată cu ∞
  pred ← matrice n×n inițializată cu null

  // Inițializare cu muchiile directe
  pentru fiecare nod i:
    dist[i][i] ← 0
  pentru fiecare muchie (i, j, w):
    dist[i][j] ← w
    pred[i][j] ← i

  // Programare dinamică pe nodul intermediar k
  pentru k de la 0 la n-1:
    pentru i de la 0 la n-1:
      pentru j de la 0 la n-1:
        dacă dist[i][k] + dist[k][j] < dist[i][j]:
          dist[i][j] ← dist[i][k] + dist[k][j]
          pred[i][j] ← pred[k][j]

  // Verificare ciclu negativ
  pentru i de la 0 la n-1:
    dacă dist[i][i] < 0:
      returnează null  // ciclu negativ

  returnează dist, pred
```

## Exemple

Considerăm graful orientat cu 4 noduri:

```
  1 --(3)--→ 2
  |  ↖       |
 (8)  (4)   (2)
  ↓          ↓
  3 --(1)--→ 4 --((-5))--→ 1
```

Muchii: 1→2(3), 1→3(8), 2→4(2), 4→1(-5), 4→3(1). Ciclul 1→2→4→1 are cost total 3+2+(-5)=0, deci nu este un ciclu negativ. Algoritmul funcționează corect.

**Matrice inițială dist:**
```
     1    2    3    4
1  [ 0,   3,   8,   ∞ ]
2  [ ∞,   0,   ∞,   2 ]
3  [ ∞,   ∞,   0,   ∞ ]
4  [-5,   ∞,   1,   0 ]
```

**După k=1** (intermediar nodul 1): Se îmbunătățesc drumurile care trec prin 1.

**După k=2** (intermediar nodul 2): dist[1][4]=3+2=5.

**După k=3** (intermediar nodul 3): Nicio îmbunătățire.

**După k=4** (intermediar nodul 4):
- dist[1][1] = min(0, 5+(-5)) = 0 (nu negativ)
- dist[2][1] = min(∞, 2+(-5)) = -3
- dist[1][3] = min(8, 5+1) = 6

**Matrice finală dist:**
```
     1    2    3    4
1  [ 0,   3,   6,   5 ]
2  [-3,   0,   3,   2 ]
3  [ ∞,   ∞,   0,   ∞ ]
4  [-5,  -2,   1,   0 ]
```

## Aplicații

- **Rețele de transport:** Calcularea tuturor distanțelor minime între orașe dintr-o rețea rutieră.
- **Rețele informatice:** Determinarea celor mai scurte rute între toate perechile de routere.
- **Căutarea în baze de date:** Calculul distanțelor tranzitive în grafuri de relații.
- **Recunoașterea tiparelor:** Compararea grafurilor de similitudine.
- **Jocuri:** Calculul tuturor distanțelor pe harte pentru strategii optime.
- **Bioinformatică:** Analiza rețelelor de interacțiune proteică.
- **Închidere tranzitivă:** Varianta algoritmului (Warshall pur) determină dacă există orice cale între oricare pereche de noduri.

## Resurse

- [Wikipedia — Floyd–Warshall algorithm](https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm)
- [GeeksForGeeks — Floyd Warshall Algorithm](https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/)
- [Visualgo — All-Pairs Shortest Paths](https://visualgo.net/en/apsp)
- [CP-Algorithms — Floyd-Warshall Algorithm](https://cp-algorithms.com/graph/all-pair-shortest-path-floyd-warshall.html)
