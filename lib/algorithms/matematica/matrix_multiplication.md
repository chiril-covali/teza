# Înmulțirea Matricelor

Slug: matematica_matrix_multiplication
Categorie: Matematică

## Introducere

Înmulțirea matricelor este operația fundamentală a algebrei liniare, definită pentru o matrice A de dimensiune m×n și o matrice B de dimensiune n×p, producând o matrice C de dimensiune m×p. A fost formalizată de Arthur Cayley în 1855 și stă la baza calculului numeric modern.

Această operație este esențială în grafică pe calculator (transformări geometrice), rețele neuronale (propagarea înainte), fizică (transformări de coordonate) și rezolvarea sistemelor de ecuații liniare.

## Descriere

**Definiție:** C[i][j] = Σ A[i][k] × B[k][j], pentru k de la 0 la n-1.

**Pașii algoritmului:**
1. Verifică că numărul de coloane din A egal cu numărul de rânduri din B.
2. Creează matricea rezultat C de dimensiune m×p, inițializată cu 0.
3. Pentru fiecare i (rând A), j (coloană B), k (coloană A / rând B): C[i][j] += A[i][k] × B[k][j].
4. Returnează C.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Algoritm naiv | O(n³) | O(n²) |
| Strassen | O(n^2.807) | O(n²) |
| Coppersmith-Winograd | O(n^2.373) | O(n²) |

**Explicație:** Algoritmul naiv folosește 3 bucle imbricate. Strassen reduce numărul de înmulțiri prin divide et impera.

## Pseudocod

```
funcție înmulțireMatrice(A, B):
    m ← rânduri(A), n ← coloane(A), p ← coloane(B)
    C ← matrice m×p de zerouri
    pentru i de la 0 la m-1:
        pentru j de la 0 la p-1:
            pentru k de la 0 la n-1:
                C[i][j] ← C[i][j] + A[i][k] × B[k][j]
    returnează C
```

## Exemple

**A (2×3) × B (3×2):**
```
A = [[1,2,3],    B = [[7,8],     C = [[1×7+2×9+3×11, 1×8+2×10+3×12],
     [4,5,6]]         [9,10],         [4×7+5×9+6×11, 4×8+5×10+6×12]]
                      [11,12]]
  = [[58, 64],
     [139, 154]]
```

## Aplicații

- **Grafică 3D** – rotații, scalări, translații prin matrice de transformare 4×4.
- **Machine Learning** – propagarea în rețele neuronale profunde.
- **Rezolvarea sistemelor liniare** – Ax = b prin eliminare gaussiană.
- **Procesarea semnalelor** – transformata Fourier discretă.
- **Mecanică cuantică** – operatorii sunt reprezentați ca matrice.

## Observații din implementare

- Folosește cel puțin o buclă for în implementare.
- Implementarea folosește funcții arrow/funcții compacte.

## Resurse

- [Wikipedia – Înmulțirea matricelor](https://ro.wikipedia.org/wiki/%C3%8Enul%C8%9Birea_matricelor)
- [GeeksForGeeks – Matrix Multiplication](https://www.geeksforgeeks.org/c-program-multiply-two-matrices/)
