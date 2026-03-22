# Generare Paranteze (Backtracking)

Slug: backtracking_generateparentheses
Categorie: Backtracking

## Introducere

Problema generării tuturor combinațiilor valide de `n` perechi de paranteze este un clasic al tehnicii de backtracking și al combinatoricii. Ea apare în numeroase contexte: de la validarea expresiilor aritmetice la generarea structurilor de arbori binari, de la teoria limbajelor formale la bioinformatică (structuri secundare ARN).

Numărul soluțiilor pentru `n` perechi de paranteze este dat de al `n`-lea **număr Catalan** `C(n) = C(2n, n) / (n+1)`. Numerele Catalan (denumite după matematicianul belgian Eugène Charles Catalan, 1814–1894) apar în mod surprinzător în numeroase probleme de numărare combinatorică: triangulații de poligoane, arbori binari complet, căi monotone sub diagonala unei grile pătrate. Primele valori sunt: C(1)=1, C(2)=2, C(3)=5, C(4)=14, C(5)=42.

Tehnica de backtracking folosită pentru generare construiește soluțiile incrementalmente, adăugând la fiecare pas fie o paranteză deschisă `(`, fie una închisă `)`, și abandonând (`backtrack`) ramurile care nu pot duce la soluții valide. Constrângerile de validitate sunt simple: numărul de paranteze deschise nu trebuie să depășească `n`, iar numărul de paranteze închise nu trebuie să depășească numărul celor deschise.

## Descriere

Algoritmul construiește soluțiile caracter cu caracter. La fiecare pas recursiv, avem doi indici: `deschise` (numărul de paranteze deschise adăugate până acum) și `închise` (numărul de paranteze închise adăugate). O soluție este completă când `deschise == închise == n`.

**Pașii algoritmului:**

1. Pornește cu un șir gol, `deschise=0`, `închise=0`.
2. La fiecare pas recursiv:
   a. Dacă `deschise < n`: adaugă `(` și apelează recursiv cu `deschise+1`.
   b. Dacă `închise < deschise`: adaugă `)` și apelează recursiv cu `închise+1`.
3. Dacă `deschise == n` și `închise == n`: adaugă șirul curent la lista rezultatelor.
4. **Backtrack:** la revenirea din apelul recursiv, șirul se „deface" automat (prin construcție).

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(4ⁿ / √n) | O(n) |
| Mediu | O(4ⁿ / √n) | O(n) |
| Cel mai rău | O(4ⁿ / √n) | O(n) |

**Explicație:** Numărul de soluții valide este al `n`-lea număr Catalan `C(n) ≈ 4ⁿ / (n^(3/2) · √π)`, care este O(4ⁿ / √n). Deoarece fiecare soluție are lungimea `2n`, complexitatea de timp (pentru a genera și tipări toate soluțiile) este O(n · Cₙ) = O(4ⁿ / √n). Adâncimea recursiei este `2n` (lungimea unui șir soluție), deci stiva folosește O(n) spațiu. Generarea în sine (fără stocare) necesită O(n) spațiu suplimentar.

## Pseudocod

```
GENEREAZĂ_PARANTEZE(n):
    rezultate ← []
    GENEREAZĂ(n, "", 0, 0, rezultate)
    RETURNEAZĂ rezultate

GENEREAZĂ(n, curent, deschise, închise, rezultate):
    DACĂ lungime(curent) = 2 * n:
        adaugă curent la rezultate
        RETURNEAZĂ

    DACĂ deschise < n:
        GENEREAZĂ(n, curent + "(", deschise + 1, închise, rezultate)

    DACĂ închise < deschise:
        GENEREAZĂ(n, curent + ")", deschise, închise + 1, rezultate)
```

## Exemple

**Exemplu pentru n=3:**

Arborele de backtracking (D=deschise, Î=închise):

```
"" (D=0, Î=0)
└── "(" (D=1, Î=0)
    ├── "((" (D=2, Î=0)
    │   ├── "(((" (D=3, Î=0)
    │   │   └── "((()": adaugă ")" → "((()" (D=3,Î=1)
    │   │       └── "((())": adaugă ")" → "((()))" ✓ [soluție 1]
    │   └── "(()": adaugă ")" → "(()" (D=2,Î=1)
    │       ├── "(()(" (D=3,Î=1)
    │       │   └── "(()()" → "(()())" ✓ [soluție 2]
    │       └── "(())" (D=2,Î=2)
    │           └── "(())(": adaugă "(" → "(())()" ✓ [soluție 3]
    └── "()" (D=1, Î=1)
        └── "()(" (D=2,Î=1)
            ├── "()((" (D=3,Î=1)
            │   └── "()(()" → "()(())" ✓ [soluție 4]
            └── "()()" (D=2,Î=2)
                └── "()()(": adaugă "(" → "()()()" ✓ [soluție 5]
```

**Rezultat pentru n=3:** `["((()))", "(()())", "(())()", "()(())", "()()()"]` — 5 soluții = C(3).

**Verificare:** C(3) = C(6,3)/4 = 20/4 = 5 ✓

## Aplicații

- **Compilatoare și parsere:** Validarea expresiilor matematice, verificarea parantezelor în cod sursă.
- **Bioinformatică:** Generarea structurilor secundare posibile ale moleculelor ARN (perechile de baze se comportă ca paranteze).
- **Generarea arborilor binari:** Există o bijecție între parantezările valide și arborii binari completamente nodați.
- **Calculul simbolic:** Generarea tuturor modurilor de a parenteza un produs de `n+1` matrice (problema lanțului de multiplicare a matricelor).
- **Teste de software:** Generarea de cazuri de test exhaustive pentru parsere de expresii.
- **Teoria limbajelor formale:** Generarea cuvintelor din limbajul Dyck (limbaj de paranteze echilibrate).

## Resurse

- [Wikipedia - Catalan Number](https://en.wikipedia.org/wiki/Catalan_number)
- [GeeksForGeeks - Generate all combinations of well-formed brackets](https://www.geeksforgeeks.org/print-all-combinations-of-balanced-parentheses/)
- [LeetCode #22 - Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)
- [Visualgo - Recursion Tree](https://visualgo.net/en/recursion)
