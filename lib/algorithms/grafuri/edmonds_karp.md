# Algoritmul Edmonds-Karp (Flux Maxim)

Slug: grafuri_edmonds_karp
Categorie: Grafuri

## Introducere

Algoritmul Edmonds-Karp rezolvă problema **fluxului maxim** (Maximum Flow) într-o rețea de flux. O rețea de flux este un graf orientat ponderat în care fiecare muchie are o **capacitate** (cantitatea maximă de „flux" ce poate trece prin ea). Scopul este maximizarea fluxului total de la un nod **sursă** (s) la un nod **destinație/receptor** (t).

Algoritmul a fost publicat de **Jack Edmonds** și **Richard Karp** în 1972, ca o implementare specifică a algoritmului Ford-Fulkerson. Contribuția majoră a lui Edmonds-Karp față de Ford-Fulkerson este alegerea explicită a **BFS** pentru găsirea căilor de augmentare, garantând terminarea în timp polinomial. Ford-Fulkerson generic cu DFS poate cicla infinit pentru capacități iraționale.

Teorema fundamentală a fluxului maxim — **Max-Flow Min-Cut Theorem** — demonstrează că fluxul maxim dintr-o rețea este egal cu capacitatea minimă a unei **tăieturi** (un set de muchii a căror eliminare deconectează sursa de receptor). Această dualitate este utilizată extensiv în optimizare și teoria rețelelor.

## Descriere

Algoritmul Edmonds-Karp este o implementare a metodei **Ford-Fulkerson** care folosește BFS pentru a găsi căi de augmentare. O **cale de augmentare** este o cale de la sursă la receptor în **graful rezidual** (graful care ține evidența capacității rămase pe fiecare muchie). Fluxul este augmentat cu minimul capacităților reziduale de pe cale.

**Graful rezidual** conține pentru fiecare muchie originală `(u,v,cap)` și o muchie inversă `(v,u,0)` care permite „anularea" fluxului deja trimis — mecanism critic pentru corectitudinea algoritmului.

**Pașii algoritmului:**

1. Inițializează graful rezidual cu capacitățile originale.
2. Repetă câtă vreme există o cale de augmentare:
   a. Găsește cea mai scurtă cale de augmentare de la sursă la receptor folosind **BFS** pe graful rezidual.
   b. Dacă nu există cale → **STOP**.
   c. Calculează fluxul de augmentat: `flux = min(capacitate reziduală pe cale)`.
   d. Actualizează graful rezidual: scade `flux` din capacitățile muchiilor de pe cale și adaugă `flux` la muchiile inverse.
   e. Adaugă `flux` la fluxul total.
3. Returnează fluxul total maxim.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| General | O(V · E²) | O(V + E) |

**Explicație:** Algoritmul efectuează cel mult O(V · E) iterații de augmentare (numărul maxim de căi augmentante distincte), fiecare necesitând o parcurgere BFS de cost O(E) → O(V · E²). Spațiul O(V + E) este pentru graful rezidual și structurile BFS. Aceasta îmbunătățește teoretic Ford-Fulkerson generic, dar în practică ambele sunt adesea mult mai rapide.

## Pseudocod

```
EdmondsKarp(capacitate, sursă, receptor):
  n ← numărul de noduri
  // Graful rezidual inițializat cu capacitățile originale
  rezidual ← copie a matricei capacitate
  flux_total ← 0

  cât timp există cale de la sursă la receptor în rezidual:
    // BFS pentru cea mai scurtă cale
    coadă ← [sursă]
    vizitat ← {sursă}
    parinte ← {sursă: null}

    cât timp coada nu este goală și receptor nu în vizitat:
      u ← extrage din coadă
      pentru fiecare v de la 0 la n-1:
        dacă v nu în vizitat și rezidual[u][v] > 0:
          parinte[v] ← u
          adaugă v în vizitat
          adaugă v în coadă

    dacă receptor nu în vizitat: break  // nu mai există cale

    // Calculează fluxul minim pe cale
    flux_cale ← ∞
    v ← receptor
    cât timp v ≠ sursă:
      u ← parinte[v]
      flux_cale ← min(flux_cale, rezidual[u][v])
      v ← u

    // Actualizează graful rezidual
    v ← receptor
    cât timp v ≠ sursă:
      u ← parinte[v]
      rezidual[u][v] -= flux_cale
      rezidual[v][u] += flux_cale
      v ← u

    flux_total += flux_cale

  returnează flux_total
```

## Exemple

Considerăm rețeaua de flux:

```
       10        10
  s --------→ a --------→ t
  |           ↑           ↑
  |     10    |     10    |
  +--------→ b -------→--+
             ↑
          (capacitate limitantă: muchia a→b are cap. 1)
```

Rețea simplificată cu capacități:
- s→a: 10, s→b: 10, a→t: 10, b→t: 10, a→b: 1

**Iterația 1:** BFS găsește calea s→a→t (flux=10). Rezidual: s→a devine 0, a→t devine 0.

**Iterația 2:** BFS găsește calea s→b→t (flux=10). Rezidual: s→b devine 0, b→t devine 0.

**Iterația 3:** BFS nu găsește nicio cale de la s la t → STOP.

**Flux maxim = 20.**

**Tăietura minimă:** {s→a, s→b} cu capacitate totală 10+10=20 ✓ (Max-Flow = Min-Cut).

## Aplicații

- **Rețele de calculatoare:** Maximizarea lățimii de bandă prin rețele de routere.
- **Logistică și transport:** Maximizarea mărfii transportate printr-o rețea de drumuri/căi ferate.
- **Cuplaj bipartit maxim:** Orice problemă de cuplaj poate fi redusă la flux maxim.
- **Segmentarea imaginilor:** Algoritmul Graph-Cut în computer vision folosește min-cut/max-flow.
- **Planificarea proiectelor:** Alocarea optimă a resurselor în rețele de activități.
- **Distribuția energiei electrice:** Maximizarea puterii transmise printr-o rețea electrică.
- **Flux în rețele sociale:** Maximizarea influenței sau a distribuției de informații.

## Resurse

- [Wikipedia — Edmonds–Karp algorithm](https://en.wikipedia.org/wiki/Edmonds%E2%80%93Karp_algorithm)
- [GeeksForGeeks — Edmonds-Karp Algorithm](https://www.geeksforgeeks.org/edmonds-karp-algorithm-for-maximum-flow/)
- [Visualgo — Network Flow](https://visualgo.net/en/maxflow)
- [CP-Algorithms — Maximum flow — Ford-Fulkerson and Edmonds-Karp](https://cp-algorithms.com/graph/edmonds_karp.html)
