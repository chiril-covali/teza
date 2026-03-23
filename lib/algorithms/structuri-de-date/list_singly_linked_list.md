<!-- custom-doc -->

# 🚀 **Listă Simplu Înlănțuită**

## 📝 **Descriere**

O **Listă Simplu Înlănțuită** este cea mai elementară formă de listă înlănțuită. Fiecare nod din listă conține o valoare și o singură referință către nodul imediat următor. Este o structură unidirecțională, ceea ce înseamnă că parcurgerea se poate face doar într-un singur sens (de la început spre sfârșit).

## 🖼️ **Reprezentare Vizuală**

![Singly Linked List Diagram](/docs-images/structuri-de-date/list_singly_linked_list.svg)
<!-- external-visual -->
![Resursă vizuală externă (structuri-de-date)](https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg)


```text
      [ 10 | * ] -> [ 20 | * ] -> [ 30 | NULL ]
        Nod 1         Nod 2         Nod 3 (Tail)
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Eficiență la Inserare:** Inserarea la începutul listei este extrem de rapidă $O(1)$. | ⚠️ **Lipsa Accesului Aleator:** Nu se poate accesa direct un element prin index (ca la vectori). |
| 📊 **Flexibilitate:** Nu necesită un bloc de memorie contiguu, evitând fragmentarea. | 📉 **Unidirecționalitate:** Nu se poate naviga înapoi către nodul anterior. |

## 🔢 **Analiză Matematică și Complexitate**

Fiecare nod ocupă `sizeof(data) + sizeof(pointer)` bytes.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Căutare** | $O(n)$ |
| **Inserare la Început** | $O(1)$ |
| **Ștergere la Început** | $O(1)$ |
| **Spațiu (Space)** | $O(n)$ |

## 💡 **Aplicații Practice**

- **Implementarea Listelor de Adiacență:** Reprezentarea grafurilor rare.
- **Gestionarea Hashtable-urilor:** Tehnica de "Chaining" pentru rezolvarea coliziunilor.
- **Algoritmi de Polinoame:** Stocarea coeficienților nenuli ai unui polinom.
- **Pool-uri de obiecte:** Gestiunea resurselor reutilizabile.
