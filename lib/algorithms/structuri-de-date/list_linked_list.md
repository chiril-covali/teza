<!-- custom-doc -->
# 🚀 **Listă Înlănțuită (Linked List)**

## 📝 **Descriere**
**Lista Înlănțuită** este o structură de date liniară în care elementele nu sunt stocate în locații de memorie contigue. Fiecare element, numit **nod**, conține două părți: data propriu-zisă și o referință (**pointer**) către nodul următor din secvență.

## 🖼️ **Reprezentare Vizuală**
![Linked List Representation](https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Singly-linked-list.svg/400px-Singly-linked-list.svg.png)

**Diagramă ASCII (Noduri):**
```text
      Head -> [D1 | *] -> [D2 | *] -> [D3 | NULL]
               Nod 1       Nod 2       Nod 3
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Dinamism:** Poate crește sau scădea în dimensiune în timpul execuției. | ⚠️ **Acces Liniar:** Pentru a ajunge la al 10-lea element, trebuie să parcurgi primele 9. |
| 📊 **Inserare/Ștergere:** Foarte rapidă dacă se cunoaște locația nodului ($O(1)$). | 📉 **Memorie:** Consumă mai mult spațiu din cauza stocării pointerilor. |

## 🔢 **Analiză Matematică și Complexitate**
Accesul la un element la indexul $k$ necesită parcurgerea de la $Head$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Acces/Căutare)** | $O(n)$ |
| **Timp (Inserare/Ștergere la Head)** | $O(1)$ |
| **Spațiu (Space)** | $O(n)$ |

## 💡 **Aplicații Practice**
- **Gestionarea Memoriei:** Alocarea dinamică a spațiului în sistemele de operare.
- **Implementarea altor structuri:** Stivele și cozile sunt adesea implementate folosind liste înlănțuite.
- **Aplicații de tip "Undo":** Navigarea între stările programului.
