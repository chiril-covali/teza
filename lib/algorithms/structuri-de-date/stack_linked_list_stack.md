<!-- custom-doc -->

# 🚀 **Stivă (Listă Înlănțuită)**

## 📝 **Descriere**
O stivă este o structură de date de tip LIFO (Last-In, First-Out), unde ultimul element adăugat este primul extras. Implementarea prin listă simplu înlănțuită permite o gestionare dinamică a memoriei, evitând limitările de dimensiune fixă ale unui array, oferind performanțe constante ($O(1)$) pentru operațiile fundamentale la vârful stivei.

## 🖼️ **Reprezentare Vizuală**
![Diagramă Stivă](/docs-images/structuri-de-date/stack_linked_list_stack.svg)
<!-- external-visual -->
![Resursă vizuală externă (structuri-de-date)](https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg)


```text
Starea Stivei: [ Vârf ] -> [ Nod 3 ] -> [ Nod 2 ] -> [ Nod 1 ] -> NULL

PUSH(Nod 4):
[ Vârf ] -> [ Nod 4 ] -> [ Nod 3 ] -> [ Nod 2 ] -> [ Nod 1 ] -> NULL

POP():
[ Vârf ] -> [ Nod 3 ] -> [ Nod 2 ] -> [ Nod 1 ] -> NULL (Nod 4 este eliminat)
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaje | Dezavantaje |
| :--- | :--- |
| ✅ Dimensiune dinamică (fără overflow de dimensiune) | ❌ Memorie extra pentru stocarea pointerilor de legătură |
| ✅ Inserare și ștergere în timp constant $O(1)$ | ❌ Nu permite accesul aleatoriu la elemente |
| ✅ Fără limită de capacitate impusă anterior | ❌ Performanță cache mai slabă decât implementarea cu array |

## 🔢 **Analiză Matematică și Complexitate**
| Operație | Complexitate Timp | Complexitate Spațiu |
| :--- | :--- | :--- |
| Push (Adăugare) | $O(1)$ | $O(1)$ |
| Pop (Eliminare) | $O(1)$ | $O(1)$ |
| Peek (Vizualizare vârf) | $O(1)$ | $O(1)$ |
| Căutare element | $O(n)$ | $O(1)$ |
| Spațiu Total | - | $O(n)$ |

## 💡 **Aplicații Practice**
- **Gestionarea apelurilor de funcții** (Call Stack) în aproape toate limbajele de programare.
- **Implementarea funcției "Undo"** în editoare de text și aplicații grafice.
- **Evaluarea expresiilor matematice** prin utilizarea formei poloneze postfixate.
- **Inversarea unor șiruri** sau structuri de date.
- **Algoritmi de backtracking** și parcurgerea grafurilor în adâncime (DFS).
