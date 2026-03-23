<!-- custom-doc -->
# Stivă Înlănțuită Listă Stivă

O stivă înlănțuită este o structură de date care combină caracteristicile unei stive cu cele ale unei liste înlănțuite. Aceasta permite stocarea elementelor într-o manieră LIFO (Last In, First Out), unde ultimul element adăugat este primul care va fi eliminat. Fiecare element al stivei este reprezentat printr-un nod al unei liste înlănțuite, care conține o referință la următorul nod.

## Reprezentare Vizuală

Structura unei stive înlănțuite poate fi reprezentată astfel:

```
+-------+      +-------+      +-------+
|  30   | ---> |  20   | ---> |  10   |
+-------+      +-------+      +-------+
```

În acest exemplu, 30 este ultimul element adăugat și va fi primul eliminat. Fiecare nod conține o valoare și o referință la următorul nod din stivă.

### Exemplu Pas cu Pas

1. **Adăugare element (Push)**: Adăugăm elementul 40.
```
+-------+      +-------+      +-------+      +-------+
|  40   | ---> |  30   | ---> |  20   | ---> |  10   |
+-------+      +-------+      +-------+      +-------+
```

2. **Eliminare element (Pop)**: Eliminăm elementul 40.
```
+-------+      +-------+      +-------+
|  30   | ---> |  20   | ---> |  10   |
+-------+      +-------+      +-------+
```

## Matematică / Logică

Complexitatea operațiunilor de bază pentru o stivă înlănțuită este:

- Adăugare (Push): $O(1)$
- Eliminare (Pop): $O(1)$
- Accesare vârf (Top): $O(1)$

Aceste operații sunt eficiente datorită accesului direct la vârful stivei.

## Tabel de Complextitate

| Operație | Caz Favorabil | Caz Mediu | Caz Defavorabil |
|----------|---------------|-----------|------------------|
| Push     | $O(1)$        | $O(1)$    | $O(1)$           |
| Pop      | $O(1)$        | $O(1)$    | $O(1)$           |
| Top      | $O(1)$        | $O(1)$    | $O(1)$           |

## Avantaje și Dezavantaje

**Avantaje:**
- Acces rapid la elementul de vârf.
- Implementare simplă și eficientă în memorie.
- Utilizare redusă a memoriei pentru stive mici.

**Dezavantaje:**
- Nu permite accesul aleator la elemente.
- Poate duce la consum mare de memorie în cazul stivelor foarte mari, din cauza alocării dinamice.

## Aplicații Practice

Stivele înlănțuite sunt utilizate în diverse aplicații, cum ar fi:
- Implementarea funcțiilor recursive.
- Gestionarea apelurilor de funcții în limbaje de programare.
- Evaluarea expresiilor matematice (de exemplu, în evaluarea postfix).
- Navigarea în structuri de date complexe, cum ar fi grafurile.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*