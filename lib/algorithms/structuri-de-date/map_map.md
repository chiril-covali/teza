<!-- custom-doc -->
# Hartă Hartă

O hartă hartă este o structură de date care asociază chei cu valori, permițând accesul rapid la date prin intermediul unei funcții de hash. Aceasta este utilizată frecvent în programare pentru a stoca și a gestiona datele într-un mod eficient, facilitând căutarea, inserarea și ștergerea elementelor.

## Reprezentare Vizuală

O hartă hartă poate fi reprezentată printr-un tabel, unde fiecare element este stocat într-o poziție determinată de o funcție de hash aplicată cheii sale.

```
+-------+-------+
| Cheie | Valoare|
+-------+-------+
|   1   |   A   |
|   2   |   B   |
|   3   |   C   |
|   4   |   D   |
+-------+-------+
```

### Exemplu Pas cu Pas

1. Se definește o funcție de hash care mapează cheile la indecși.
2. Se inserează o cheie, de exemplu, `1`, care este mapată la indexul `0`.
3. Valoarea asociată, `A`, este stocată în tabel la indexul `0`.

## Matematică / Logică

Funcția de hash $h(k)$ transformă o cheie $k$ într-un index $i$, astfel încât $i = h(k) \mod m$, unde $m$ este dimensiunea tabelului. Complexitatea medie a operațiunilor de căutare, inserare și ștergere este $O(1)$, dar în cel mai rău caz poate ajunge la $O(n)$ în cazul coliziunilor.

## Tabel de Complextitate

| Operație         | Cel mai bun caz | Caz mediu | Cel mai rău caz |
|------------------|-----------------|-----------|------------------|
| Căutare          | $O(1)$          | $O(1)$    | $O(n)$           |
| Inserare         | $O(1)$          | $O(1)$    | $O(n)$           |
| Ștergere         | $O(1)$          | $O(1)$    | $O(n)$           |

## Avantaje și Dezavantaje

### Avantaje
- Acces rapid la date.
- Inserții și ștergeri eficiente.
- Flexibilitate în gestionarea datelor.

### Dezavantaje
- Posibilitatea coliziunilor, care pot afecta performanța.
- Necesitatea unei funcții de hash eficiente.
- Consum de memorie potențial mare, în funcție de implementare.

## Aplicații Practice

Hărțile hărți sunt utilizate în diverse domenii, inclusiv:
- Baze de date pentru stocarea rapidă a informațiilor.
- Implementarea structurilor de date precum dicționare și seturi.
- Algoritmi de căutare și sortare care necesită acces rapid la date.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*