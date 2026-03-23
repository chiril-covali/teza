<!-- custom-doc -->

# 🚀 **Listă Înlănțuită (Linked List)**

## 📝 **Descriere**

**Lista Înlănțuită** este o structură de date liniară în care elementele (numite noduri) nu sunt stocate în locații de memorie contigue. Fiecare **nod** este un obiect independent care conține datele propriu-zise și o referință (**pointer**) către următorul nod din secvență. Această structură permite o gestionare dinamică și flexibilă a memoriei, fiind fundamentul multor altor structuri de date.

## 🖼️ **Reprezentare Vizuală**

![Linked List Representation](https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Singly-linked-list.svg/400px-Singly-linked-list.svg.png)

```text
      Head -> [Data | Next] -> [Data | Next] -> [Data | NULL]
               Nod 1            Nod 2            Nod 3
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Dinamism:** Dimensiunea listei poate crește sau scădea fără a necesita realocări costisitoare. | ⚠️ **Acces Secvențial:** Pentru a ajunge la elementul $k$, trebuie parcurse toate elementele anterioare. |
| 📊 **Inserare/Ștergere Rapidă:** Adăugarea sau eliminarea la începutul listei se face în $O(1)$. | 📉 **Consum Memorie:** Fiecare element necesită spațiu suplimentar pentru stocarea pointerului. |

## 🔢 **Analiză Matematică și Complexitate**

Accesul la un element necesită parcurgerea listei de la `Head`.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Acces/Căutare** | $O(n)$ |
| **Inserare/Ștergere la Head** | $O(1)$ |
| **Inserare/Ștergere la Tail** | $O(n)$ (fără pointer direct la Tail) |
| **Spațiu (Space)** | $O(n)$ |

## 💡 **Aplicații Practice**

- **Gestiunea Memoriei:** Liste de blocuri libere în sistemele de operare (Heap management).
- **Implementarea Stivelor/Cozilor:** Liste dinamice care nu necesită redimensionare.
- **Aplicații Undo/Redo:** Menținerea unui istoric al acțiunilor utilizatorului.
- **Sisteme de fișiere:** Înlănțuirea sectoarelor de date pe disc (FAT).
