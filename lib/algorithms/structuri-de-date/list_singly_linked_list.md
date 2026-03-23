<!-- custom-doc -->
# Listă Simplă Înlănțuită Listă

O listă simplă înlănțuită este o structură de date dinamică, formată dintr-o secvență de noduri, fiecare nod conținând un element de date și o referință (sau un pointer) către următorul nod din secvență. Această structură permite inserarea și ștergerea eficientă a elementelor, fără a necesita redimensionarea unui array, cum se întâmplă în cazul listelor statice.

## Reprezentare Vizuală

```
+------+    +------+    +------+
|  10  | -> |  20  | -> |  30  |
+------+    +------+    +------+
```

În exemplul de mai sus, lista conține trei noduri cu valorile 10, 20 și 30. Fiecare nod are un pointer către următorul nod din listă, iar ultimul nod (30) are pointerul setat la `null`, indicând sfârșitul listei.

### Exemplu Pas cu Pas

1. Crearea nodului cu valoarea 10.
2. Crearea nodului cu valoarea 20 și conectarea acestuia la nodul cu valoarea 10.
3. Crearea nodului cu valoarea 30 și conectarea acestuia la nodul cu valoarea 20.

## Matematică / Logică

Complexitatea temporală pentru operațiile de bază pe o listă simplă înlănțuită este:

- Inserare: $O(1)$ (în cazul inserării la început)
- Ștergere: $O(1)$ (în cazul ștergerii de la început)
- Căutare: $O(n)$ (în cel mai rău caz, trebuie să parcurgem toată lista)

## Tabel de Complextitate

| Operație       | Cel mai bun | Mediu  | Cel mai rău |
|----------------|-------------|--------|--------------|
| Inserare       | $O(1)$      | $O(1)$ | $O(1)$       |
| Ștergere       | $O(1)$      | $O(1)$ | $O(1)$       |
| Căutare        | $O(1)$      | $O(n)$ | $O(n)$       |
| Spațiu         | $O(n)$      | $O(n)$ | $O(n)$       |

## Avantaje și Dezavantaje

### Avantaje
- Dimensiune dinamică: permite creșterea și micșorarea listei fără a necesita redimensionare.
- Inserare și ștergere rapidă la începutul listei.
- Memorie eficient utilizată, deoarece nu se alocă spațiu pentru elemente neutilizate.

### Dezavantaje
- Accesul aleator la elemente este ineficient ($O(n)$).
- Consum mai mare de memorie datorită pointerilor suplimentari.
- Complexitate mai mare în implementare comparativ cu listele statice.

## Aplicații Practice

Listele simple înlănțuite sunt utilizate în diverse aplicații, printre care:
- Implementarea structurilor de date precum stive și cozi.
- Gestionarea memoriei în sistemele de operare (ex: liste de procese).
- Reprezentarea grafurilor prin liste de adiacență.
- Implementarea algoritmilor de sortare și căutare.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*