# Sortarea prin inserție (Insertion Sort)

## Descriere

Sortarea prin inserție este un algoritm simplu și intuitiv care construiește incremental o secvență sortată. Funcționează similar cu modul în care sortezi cărțile de joc în mână: iei fiecare carte și o inserezi la locul potrivit în partea deja sortată.

## Cum funcționează

1. **Împarte array-ul** în două părți:
   - Partea sortată (inițial doar primul element)
   - Partea nesortată (restul elementelor)

2. **Pentru fiecare element** din partea nesortată:
   - Salvează elementul ca "key"
   - Compară cu elementele din partea sortată (de la dreapta la stânga)
   - Mută elementele mai mari cu o poziție la dreapta
   - Inserează key la poziția corectă

3. **Repetă** până când toate elementele sunt în partea sortată

## Complexitate

- **Timp**:
  - Cel mai bun caz: **O(n)** - când array-ul este deja sortat
  - Caz mediu: **O(n²)** - când elementele sunt în ordine aleatoare
  - Cel mai rău caz: **O(n²)** - când array-ul este sortat descrescător
  
- **Spațiu**: **O(1)** - sortare in-place, fără memorie suplimentară

## Avantaje

✅ **Simplu** de implementat și înțeles  
✅ **Eficient pentru array-uri mici** (sub 50 de elemente)  
✅ **Stabil** - păstrează ordinea relativă a elementelor egale  
✅ **In-place** - sortează fără memorie suplimentară  
✅ **Adaptiv** - rapid pentru array-uri aproape sortate (O(n))  
✅ **Online** - poate sorta date care sosesc incremental

## Dezavantaje

❌ **Ineficient pentru array-uri mari** (O(n²))  
❌ **Multe operații** de mutare/copiere în cazul cel mai rău

## Când să folosești

- Array-uri **mici** (< 50 elemente)
- Date **aproape sortate** sau **parțial sortate**
- Când **stabilitatea** este importantă
- În **submeta algoritmilor hibrizi** (ex: Timsort folosește insertion sort pentru segmente mici)
- Când datele **sosesc incremental** (sorting online)

## Comparație cu alte algoritmi

| Algoritm | Timp mediu | Stabil | In-place |
|----------|-----------|--------|----------|
| Insertion Sort | O(n²) | Da | Da |
| Bubble Sort | O(n²) | Da | Da |
| Selection Sort | O(n²) | Nu | Da |
| Quick Sort | O(n log n) | Nu | Da |
| Merge Sort | O(n log n) | Da | Nu |

## Exemple de utilizare

- **Sorting în Python** - Timsort (algoritmul built-in) folosește insertion sort pentru segmente mici
- **Baze de date** - sortarea rezultatelor mici
- **Sisteme embedded** - când memoria este limitată
- **Gaming** - sortarea scoreboard-urilor mici
