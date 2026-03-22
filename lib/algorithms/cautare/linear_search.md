# Căutare Liniară

Slug: cautare_linear_search
Categorie: Căutare

## Introducere

Căutarea liniară (sau căutarea secvențială) este cel mai simplu algoritm de căutare posibil. Ideea sa este intuitivă: pentru a găsi un element într-o colecție, se parcurge colecția de la un capăt la celălalt, comparând fiecare element cu valoarea căutată, până când se găsește sau se epuizează toate elementele.

Deși nu există un „inventator" specific — algoritmul este atât de natural încât a apărut în mod independent în numeroase contexte — el reprezintă punctul de plecare în studiul algoritmilor de căutare. Este algoritmul pe care oamenii îl aplică instinctiv atunci când caută un element într-o listă neordonată, de exemplu când caută un nume într-o listă de participanți nesortată.

Principalul avantaj al căutării liniare față de algoritmi mai avansați (cum ar fi căutarea binară) este că **nu necesită ca tabloul să fie sortat**. Aceasta îl face util în situații în care datele sunt nesortate sau în care costul sortării ar depăși beneficiul obținut. De asemenea, pentru tablouri foarte mici (sub ~10 elemente), căutarea liniară poate fi chiar mai rapidă decât căutarea binară, datorită constantelor overhead mai mici.

## Descriere

Algoritmul parcurge tabloul element cu element, de la primul la ultimul (sau invers). La fiecare pas, elementul curent este comparat cu valoarea căutată (ținta). Dacă se găsește o potrivire, se returnează indexul elementului. Dacă se ajunge la sfârșitul tabloului fără o potrivire, se returnează o valoare specială (de obicei `-1`) indicând că elementul nu există.

**Pașii algoritmului:**

1. Inițializează un index `i = 0`.
2. Cât timp `i < lungime(tablou)`:
   a. Dacă `tablou[i] == țintă`, returnează `i`.
   b. Incrementează `i = i + 1`.
3. Returnează `-1` (elementul nu a fost găsit).

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(1) | O(1) |
| Mediu | O(n) | O(1) |
| Cel mai rău | O(n) | O(1) |

**Explicație:** În cel mai bun caz, elementul căutat se află pe prima poziție, deci este nevoie de o singură comparație. În cazul mediu și cel mai rău (elementul este pe ultima poziție sau absent), se parcurg toate cele `n` elemente. Complexitatea spațială este O(1) deoarece algoritmul folosește doar o variabilă de index — nu alocă memorie suplimentară proporțională cu dimensiunea intrării.

## Pseudocod

```
CĂUTARE_LINIARĂ(tablou, țintă):
    PENTRU i DE LA 0 LA lungime(tablou) - 1:
        DACĂ tablou[i] = țintă:
            RETURNEAZĂ i
    RETURNEAZĂ -1
```

## Exemple

**Exemplu găsire cu succes:** Fie tabloul `[64, 25, 12, 22, 11]` și ținta `22`.

- `i=0`: `tablou[0]=64 ≠ 22` → continuă
- `i=1`: `tablou[1]=25 ≠ 22` → continuă
- `i=2`: `tablou[2]=12 ≠ 22` → continuă
- `i=3`: `tablou[3]=22 == 22` → **găsit la indexul 3!**

Au fost necesare 4 comparații.

**Exemplu element absent:** Fie tabloul `[5, 3, 9, 1, 7]` și ținta `4`.

- `i=0`: `5 ≠ 4`, `i=1`: `3 ≠ 4`, `i=2`: `9 ≠ 4`, `i=3`: `1 ≠ 4`, `i=4`: `7 ≠ 4`
- Bucla se termină → **returnează -1** (elementul 4 nu există în tablou)

Au fost necesare 5 comparații (toate elementele).

**Comparație cu căutarea binară:** Dacă tabloul are 1.000.000 de elemente și elementul este la mijloc, căutarea liniară necesită ~500.000 de comparații, în timp ce căutarea binară necesită doar ~20.

## Aplicații

- **Tablouri mici:** Pentru colecții cu mai puțin de ~20 de elemente, este adesea mai rapid decât alternativele, datorită costului redus de implementare și overhead-ului scăzut.
- **Date nesortate:** Singurul algoritm simplu de căutare aplicabil când datele nu sunt sortate și nu merită costul sortării.
- **Căutare în liste înlănțuite:** Structurile de date înlănțuite nu permit acces aleator, deci căutarea binară nu se poate aplica direct.
- **Algoritm de bază:** Folosit ca subroutine în algoritmi mai complecși, de exemplu în căutarea prin salt (jump search).
- **Găsirea tuturor aparițiilor:** Spre deosebire de căutarea binară (care găsește o singură apariție), căutarea liniară poate fi ușor modificată să returneze toate aparițiile unui element.
- **Procesare de fișiere:** Căutarea unui cuvânt cheie într-un fișier text sau log neindexat.

## Resurse

- [Wikipedia - Linear Search](https://en.wikipedia.org/wiki/Linear_search)
- [GeeksForGeeks - Linear Search](https://www.geeksforgeeks.org/linear-search/)
- [Visualgo - Linear Search](https://visualgo.net/en/sorting)
- [Khan Academy - Linear Search](https://www.khanacademy.org/computing/computer-science/algorithms/intro-to-algorithms/a/a-guessing-game)
