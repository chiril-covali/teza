# Sortarea prin selecție (Selection Sort)

## Descriere

Sortarea prin selecție este un algoritm simplu de sortare care împarte array-ul în două părți: partea sortată și partea nesortată. În fiecare iterație, algoritmul găsește elementul minim din partea nesortată și îl plasează la sfârșitul părții sortate.

## Cum funcționează

1. **Împarte conceptual** array-ul în două părți:
   - Partea sortată (inițial goală, la început)
   - Partea nesortată (inițial tot array-ul)

2. **Pentru fiecare poziție** din array:
   - Găsește **minimul** din partea nesortată
   - **Schimbă** minimul cu primul element din partea nesortată
   - Mută granița dintre sortată/nesortată cu o poziție

3. **Repetă** până când toată partea nesortată este procesată

## Complexitate

- **Timp**:
  - Cel mai bun caz: **O(n²)** - mereu face același număr de comparații
  - Caz mediu: **O(n²)** 
  - Cel mai rău caz: **O(n²)**
  
- **Spațiu**: **O(1)** - sortare in-place

## Avantaje

✅ **Simplu** de implementat  
✅ **In-place** - sortează fără memorie suplimentară  
✅ **Număr minim de swap-uri** - maxim n-1 swap-uri (util când swap-ul este costisitor)  
✅ **Performanță predictibilă** - mereu O(n²), indiferent de input

## Dezavantaje

❌ **Ineficient pentru array-uri mari** (O(n²) mereu)  
❌ **Nestabil** - poate schimba ordinea elementelor egale  
❌ **Nu e adaptiv** - nu beneficiază de date parțial sortate

## Când să folosești

- Array-uri **foarte mici** (< 20 elemente)
- Când **swap-ul este costisitor** (ex: obiecte mari) - selection sort face maxim n-1 swap-uri
- Când **memoria** este extrem de limitată
- În **scopuri educaționale** pentru a învăța conceptele de sortare

## Comparație cu Insertion Sort

| Aspect | Selection Sort | Insertion Sort |
|--------|---------------|----------------|
| Comparații | O(n²) mereu | O(n²) worst, O(n) best |
| Swap-uri | O(n) maxim | O(n²) worst |
| Adaptiv | Nu | Da |
| Stabil | Nu | Da |
| Use case | Swap costisitor | Date aproape sortate |

## De ce este **nestabil**?

Selection Sort poate schimba ordinea relativă a elementelor egale când face swap-uri pe distanțe lungi.

Exemplu: `[4a, 2, 4b, 1]` → `[1, 2, 4b, 4a]` (4b vine înaintea 4a)

## Exemple de utilizare

- **Sisteme embedded** simple unde memoria e critică
- **Sorting bibliografii** unde swap-ul de obiecte mari e costisitor
- **Scopuri didactice** - exemplu simplu de algoritm greedy
