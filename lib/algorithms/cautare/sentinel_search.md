# Căutare cu Santinelă

Slug: cautare_sentinel_search
Categorie: Căutare

## Introducere

Căutarea cu santinelă (Sentinel Linear Search) este o optimizare a căutării liniare clasice care elimină **una din cele două verificări** de la fiecare iterație a buclei. Termenul „santinelă" (în română: „santinelă" sau „santinel") provine din contextul militar — un soldat de pază care anunță sosirea unui intrus. În contextul algoritmului, valoarea santinelă acționează ca un „capăt artificial" al tabloului care garantează că bucla se va opri.

Optimizarea a fost propusă și studiată în detaliu de **Donald Knuth** în lucrarea sa fundamentală „The Art of Computer Programming" (Vol. 3, 1973). Knuth a observat că în căutarea liniară standard, fiecare iterație necesită **două** condiții: verificarea limitei tabloului (`i < n`) și compararea cu elementul (`tablou[i] == țintă`). Prin plasarea valorii căutate ca element suplimentar la capătul tabloului, prima condiție devine redundantă — bucla se va opri oricum când va găsi santinela.

Deși complexitatea asimptotică rămâne O(n), optimizarea practică este semnificativă: pentru tablouri mari, reducerea numărului de comparații la jumătate poate duce la îmbunătățiri de 10-20% în timp real de execuție. Aceasta face algoritmul popular în contexte de performanță critică unde fiecare instrucțiune contează.

## Descriere

Algoritmul plasează temporar valoarea căutată (ținta) la **ultima poziție** a tabloului (sau la o poziție suplimentară). Aceasta garantează că bucla va găsi întotdeauna valoarea, eliminând necesitatea verificării limitei la fiecare pas. După ce bucla se termină, se verifică dacă indexul final este valid (nu este poziția santinelei) și dacă elementul găsit este cu adevărat ținta.

**Pașii algoritmului:**

1. Salvează ultimul element al tabloului: `ultimul = tablou[n-1]`.
2. Plasează santinela: `tablou[n-1] = țintă`.
3. Inițializează `i = 0`.
4. Cât timp `tablou[i] != țintă`: incrementează `i`.
5. Restaurează ultimul element: `tablou[n-1] = ultimul`.
6. Dacă `i < n-1` sau `ultimul == țintă`, returnează `i`. Altfel returnează `-1`.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(1) | O(1) |
| Mediu | O(n) | O(1) |
| Cel mai rău | O(n) | O(1) |

**Explicație:** Complexitatea asimptotică este identică cu căutarea liniară clasică — O(n). Diferența este în **constanta** ascunsă: căutarea liniară clasică execută `2n` operații (comparație limită + comparație element), pe când căutarea cu santinelă execută doar `n` comparații (doar comparație element). Aceasta duce la o accelerare constantă de ~2x, vizibilă în practică. Spațiul este O(1) — modificarea tabloului este temporară.

## Pseudocod

```
CĂUTARE_SANTINELĂ(tablou, n, țintă):
    // Plasează santinela
    ultimul ← tablou[n - 1]
    tablou[n - 1] ← țintă

    i ← 0
    CÂT TIMP tablou[i] ≠ țintă:
        i ← i + 1

    // Restaurează elementul original
    tablou[n - 1] ← ultimul

    // Verifică dacă am găsit elementul real (nu santinela)
    DACĂ i < n - 1 SAU tablou[n - 1] = țintă:
        RETURNEAZĂ i

    RETURNEAZĂ -1
```

## Exemple

**Exemplu comparație căutare liniară vs. santinelă:**

Tabloul `[5, 3, 8, 1, 9, 2, 7, 4, 6, 10]` (n=10), căutăm `7`.

**Căutare liniară clasică (la fiecare pas: 2 verificări):**
- `i=0`: `i<10?` ✓, `5==7?` ✗ → continuă
- `i=1`: `i<10?` ✓, `3==7?` ✗ → continuă
- ... (6 perechi de verificări)
- `i=6`: `i<10?` ✓, `7==7?` ✓ → **găsit!** (14 comparații totale)

**Căutare cu santinelă:**
- `tablou[9] = 10` → salvăm, punem `tablou[9] = 7` (santinela)
- `tablou[0]=5≠7`, `tablou[1]=3≠7`, `tablou[2]=8≠7`, `tablou[3]=1≠7`, `tablou[4]=9≠7`, `tablou[5]=2≠7`, `tablou[6]=7==7` → **stop!**
- Restaurăm `tablou[9] = 10`
- `i=6 < 9` → **returnează 6** (7 comparații totale — jumătate!)

**Exemplu element absent:** Tabloul `[1, 3, 5, 7, 9]` (n=5), căutăm `4`.
- Salvăm `tablou[4]=9`, punem `tablou[4]=4`
- Parcurgem: `1≠4`, `3≠4`, `5≠4`, `7≠4`, `4==4` → `i=4`
- Restaurăm `tablou[4]=9`
- `i=4` = `n-1` și `tablou[4]=9 ≠ 4` → **returnează -1**

## Aplicații

- **Kerneluri de sistem de operare:** În cod de nivel scăzut unde fiecare ciclu CPU contează (ex: căutare în tabele de pagini).
- **Procesare de date în timp real:** Algoritmi de procesare de semnale unde latența este critică.
- **Motoare de baze de date:** Scanări de tabele cu coloane multiple comparate frecvent.
- **Parsere și compilatoare:** Căutarea tokenurilor în tabele de simboluri mici.
- **Căutare în buffers:** Procesarea pachetelor de rețea sau stream-urilor media.
- **Algoritmi embedded:** Sisteme cu resurse limitate unde optimizările de nivel scăzut sunt esențiale.

## Resurse

- [Wikipedia - Linear Search (Sentinel)](https://en.wikipedia.org/wiki/Linear_search#With_a_sentinel)
- [GeeksForGeeks - Sentinel Linear Search](https://www.geeksforgeeks.org/sentinel-linear-search/)
- [Knuth, D.E. - The Art of Computer Programming, Vol. 3 (Sorting and Searching)](https://www-cs-faculty.stanford.edu/~knuth/taocp.html)
