<!-- custom-doc -->
# Set Set

Un set este o structură de date care stochează o colecție de elemente unice, fără o ordine specifică. Aceasta permite operații eficiente de adăugare, eliminare și căutare a elementelor. Seturile sunt utilizate frecvent în programare datorită capacității lor de a gestiona datele fără duplicare.

## Reprezentare Vizuală

Un set poate fi reprezentat printr-o diagramă simplă:

```
Set = {a, b, c, d}
```

### Exemplu pas cu pas

1. Adăugăm elemente:
   - Set = {}
   - Adaugă 'a' → Set = {a}
   - Adaugă 'b' → Set = {a, b}
   - Adaugă 'a' (duplicat) → Set rămâne {a, b}
   - Adaugă 'c' → Set = {a, b, c}

2. Eliminăm un element:
   - Set = {a, b, c}
   - Elimină 'b' → Set = {a, c}

## Matematică / Logică

Operațiile de bază ale seturilor pot fi descrise prin complexitate:

- Adăugarea unui element: $O(1)$ în medie
- Eliminarea unui element: $O(1)$ în medie
- Căutarea unui element: $O(1)$ în medie

Aceste operații sunt eficiente datorită utilizării unor structuri de date de tip hash.

## Tabel de Complextitate

| Operație           | Cel mai bun caz | Caz mediu | Cel mai rău caz |
|--------------------|------------------|-----------|------------------|
| Adăugare           | $O(1)$           | $O(1)$    | $O(n)$           |
| Eliminare          | $O(1)$           | $O(1)$    | $O(n)$           |
| Căutare            | $O(1)$           | $O(1)$    | $O(n)$           |

## Avantaje și Dezavantaje

**Avantaje:**
- Permite stocarea de elemente unice.
- Operații rapide de adăugare, eliminare și căutare.
- Ușor de implementat și utilizat.

**Dezavantaje:**
- Nu păstrează ordinea elementelor.
- Poate consuma mai multă memorie în cazul coliziunilor în structurile de tip hash.
- Nu permite duplicate, ceea ce poate fi o limitare în anumite aplicații.

## Aplicații Practice

Seturile sunt utilizate în diverse domenii, printre care:
- Eliminarea duplicatelor din liste.
- Implementarea funcțiilor de căutare rapidă.
- Analiza datelor, cum ar fi identificarea elementelor comune între două colecții.
- Gestionarea permisiunilor și a rolurilor în aplicații software.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*