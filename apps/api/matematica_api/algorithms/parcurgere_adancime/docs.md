# Parcurgerea în adâncime (DFS - Depth First Search)

## Descriere

DFS este un algoritm fundamental pentru explorarea grafurilor care vizitează nodurile mergând cât mai adânc posibil pe fiecare ramură înainte de a face backtracking. Este ca și cum ai explora un labirint mergând mereu înainte până dai de un drum fără ieșire, apoi te întorci și încerci o altă cale.

## Cum funcționează

1. **Pornește** de la nodul start și marcheazăl ca vizitat
2. **Explorează** un vecin nevizitat și repetă procesul recursiv
3. **Backtracking**: când un nodnu mai are vecini nevizitați, te întorci la nodul anterior
4. **Continuă** până când toate nodurile accesibile sunt vizitate

### Implementare

Poate fi implementat în două moduri:
- **Recursiv** - natural și elegant, folosește stack-ul de apeluri
- **Iterativ** - folosește un stack explicit (LIFO)

## Complexitate

- **Timp**: **O(V + E)** 
  - V = număr de noduri (vertices)
  - E = număr de muchii (edges)
  - Vizităm fiecare nod o dată și explorăm fiecare muchie o dată
  
- **Spațiu**: **O(V)** - pentru stack (în cazul cel mai rău, un lanț de V noduri)

## Proprietăți

🔹 **Completitudine**: Găsește soluția dacă există (pentru grafuri finite)  
🔹 **Optimalitate**: NU garantează drumul cel mai scurt  
🔹 **Ordine**: Explorare în **adâncime** (depth-first)

## Avantaje

✅ **Simplu** de implementat (special recursiv)  
✅ **Eficient pentru memorie** în grafuri late (wide)  
✅ **Detectează cicluri** în grafuri  
✅ **Găsește componente conexe**  
✅ **Sortare topologică** în grafuri orientate aciclice (DAG)  
✅ **Path-finding** - găsește UN drum (nu neapărat cel mai scurt)

## Dezavantaje

❌ **Nu garantează drumul cel mai scurt**  
❌ **Poate fi ineficient** în grafuri adânci cu soluții aproape de rădăcină  
❌ **Stack overflow** în implementarea recursivă pentru grafuri foarte adânci

## Aplicații practice

### 1. Detectarea ciclurilor
```python
def has_cycle_dfs(graph):
    visited = set()
    rec_stack = set()
    
    for node in graph:
        if detect_cycle(node, visited, rec_stack, graph):
            return True
    return False
```

### 2. Componente conexe
Găsește toate sub-grafurile conectate într-un graf neorientat.

### 3. Sortare topologică
Ordonează taskuri cu dependențe (build systems, prerequisite courses).

### 4. Path-finding în labirinturi
Găsește dacă există un drum de la start la finish.

### 5. Puzzle solving
Sudoku, N-Queens, labirinturi - explorează toate posibilitățile.

## DFS vs BFS

| Aspect | DFS | BFS |
|--------|-----|-----|
| Structură | Stack (LIFO) | Queue (FIFO) |
| Explorare | În adâncime | Pe nivele |
| Drum găsit | Orice drum | Cel mai scurt |
| Memorie | O(h) - înălțime | O(w) - lățime |
| Use case | Cicluri, sortare topologică | Shortest path |

## Variante de DFS

1. **Pre-order DFS** - procesează nodul înainte de copii
2. **Post-order DFS** - procesează nodul după copii (util pentru sortare topologică)
3. **In-order DFS** - specifică arborilor binari de căutare

## Exemplo real

**Analiza dependențelor în build systems**:
- Maven, Gradle folosesc DFS pentru a determina ordinea în care să compileze modulele
- Detectează dependențe circulare (cicluri)

**Git internals**:
- Git folosește DFS pentru a traversa istoricul commit-urilor
- `git log` folosește DFS pentru a afișa commit-urile

## Când să folosești DFS

✓ Detectare cicluri în grafuri  
✓ Sortare topologică  
✓ Găsirea componentelor conexe  
✓ Path-finding când orice drum este acceptabil  
✓ Puzzle solving cu backtracking  
✓ Când graful este foarte lat și BFS ar consuma prea multă memorie
