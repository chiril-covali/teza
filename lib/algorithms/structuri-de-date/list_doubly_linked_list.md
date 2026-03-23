<!-- custom-doc -->

# 🚀 **Listă Dublu Înlănțuită**

## 📝 **Descriere**

**Lista Dublu Înlănțuită** este o structură de date liniară formată dintr-o secvență de noduri. Spre deosebire de lista simplă, fiecare nod conține datele proprii și **două referințe** (pointeri): una către nodul următor și una către nodul anterior. Această configurație permite parcurgerea listei în ambele direcții și facilitează operații de ștergere mai flexibile.

## 🖼️ **Reprezentare Vizuală**

![Doubly Linked List Representation](/docs-images/structuri-de-date/list_doubly_linked_list.svg)
<!-- external-visual -->
![Resursă vizuală externă (structuri-de-date)](https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg)


```text
      [Prev|D1|Next] <-> [Prev|D2|Next] <-> [Prev|D3|Next]
            ^                  ^                  ^
          Head               Nod 2               Tail
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Parcurgere Bidirecțională:** Permite navigarea "înainte" și "înapoi" cu aceeași eficiență. | ⚠️ **Memorie Suplimentară:** Fiecare nod necesită spațiu pentru doi pointeri în loc de unul. |
| 📊 **Ștergere Eficientă:** Ștergerea unui nod cunoscut se face în $O(1)$ fără a parcurge lista. | 📉 **Implementare Complexă:** Necesită actualizarea mai multor pointeri la fiecare inserare/ștergere. |

## 🔢 **Analiză Matematică și Complexitate**

Navigarea se face de la `Head` spre `Tail` sau invers, folosind pointerii `next` și `prev`.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Acces/Căutare** | $O(n)$ |
| **Inserare/Ștergere la capete** | $O(1)$ |
| **Inserare/Ștergere la mijloc** | $O(1)$ (dacă nodul este cunoscut) |
| **Spațiu (Space)** | $O(n)$ |

## 💡 **Aplicații Practice**

- **Browser History:** Navigarea rapidă între paginile vizitate (Back / Forward).
- **Playliste Muzicale:** Trecerea la piesa anterioară sau următoare.
- **Editor Text:** Gestionarea cursorului și a operațiilor de tip Undo/Redo.
- **Algoritmul LRU Cache:** Gestionarea eficientă a elementelor recent utilizate.
