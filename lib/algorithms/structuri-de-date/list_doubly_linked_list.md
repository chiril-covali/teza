<!-- custom-doc -->
# 🚀 **Listă Dublu Înlănțuită (Doubly Linked List)**

## 📝 **Descriere**
**Lista Dublu Înlănțuită** este o variantă mai flexibilă a listei înlănțuite simple. Fiecare nod conține datele proprii și **două referințe** (pointeri): una către nodul următor și una către nodul anterior. Acest lucru permite parcurgerea listei în ambele direcții.

## 🖼️ **Reprezentare Vizuală**
![Doubly Linked List Representation](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Doubly-linked-list.svg/400px-Doubly-linked-list.svg.png)

**Diagramă ASCII (Noduri):**
```text
      NULL <- [ * | D1 | * ] <-> [ * | D2 | * ] -> NULL
                 Nod 1            Nod 2
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Parcurgere Bidirecțională:** Poți naviga înainte și înapoi cu ușurință. | ⚠️ **Memorie:** Consumă și mai mult spațiu (un pointer suplimentar pentru fiecare nod). |
| 📊 **Ștergere Eficientă:** Ștergerea unui nod este mult mai simplă dacă ai referința la el. | 📉 **Implementare:** Logica de inserare/ștergere este mai complexă (trebuie actualizați mai mulți pointeri). |

## 🔢 **Analiză Matematică și Complexitate**
Permite parcurgerea de la $Head$ la $Tail$ și invers.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Acces/Căutare)** | $O(n)$ |
| **Timp (Inserare/Ștergere la capete)** | $O(1)$ |
| **Spațiu (Space)** | $O(n)$ |

## 💡 **Aplicații Practice**
- **Browser History:** Navigarea "Back" și "Forward" prin paginile vizitate.
- **Redarea Muzicii:** Gestionarea listelor de redare (piesa anterioară / următoare).
- **Editor Text:** Deplasarea cursorului caracter cu caracter în ambele direcții.
