<!-- custom-doc -->

# 🚀 **Listă Dublu Înlănțuită (Doubly Linked List)**

## 📝 **Descriere**

**Lista Dublu Înlănțuită** este o structură de date liniară formată dintr-o secvență de noduri. Spre deosebire de lista simplă, fiecare nod conține datele proprii și **două referințe** (pointeri): una către nodul următor și una către nodul anterior. Această configurație permite parcurgerea listei în ambele direcții și facilitează operații de ștergere mai flexibile.

## 🖼️ **Reprezentare Vizuală**

![Doubly Linked List Representation](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Doubly-linked-list.svg/400px-Doubly-linked-list.svg.png)

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
