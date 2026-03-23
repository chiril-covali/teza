<!-- custom-doc -->

# 🚀 **Coadă**

## 📝 **Descriere**

**Coadă** (Queue) este o structură de date liniară care urmează principiul **FIFO** (First-In, First-Out). Primul element adăugat în coadă este primul care va fi eliminat, exact ca o coadă reală de oameni la un ghișeu.

## 🖼️ **Reprezentare Vizuală**

![Queue Representation](/docs-images/structuri-de-date/queue_queue.svg)
<!-- external-visual -->
![Resursă vizuală externă (structuri-de-date)](https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg)


```text
      (Scoate) Front <--- [1, 2, 3] <--- Rear (Adaugă)
      1. Enqueue(4) -> [1, 2, 3, 4]
      2. Dequeue()  -> [2, 3, 4] (1 a fost eliminat)
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Corectitudine:** Garantează procesarea elementelor în ordinea sosirii. | ⚠️ **Acces Liniar:** Nu poți accesa elementele din mijloc fără a le scoate pe cele din față. |
| 📊 **Eficiență:** Operațiile de adăugare și eliminare sunt instantanee ($O(1)$). | 📉 **Overflow:** Dacă nu este circulară, spațiul de la începutul vectorului rămâne irosit. |

## 🔢 **Analiză Matematică și Complexitate**

Operațiile de bază sunt **Enqueue** (adăugare la spate) și **Dequeue** (eliminare din față).

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Enqueue/Dequeue)** | $O(1)$ |
| **Timp (Search)** | $O(n)$ |
| **Spațiu (Space)** | $O(n)$ |

## 💡 **Aplicații Practice**

- **Sisteme de Operare:** Gestionarea proceselor (Scheduling) și a buffer-elor de imprimare.
- **Networking:** Routerele folosesc cozi pentru a gestiona pachetele de date.
- **Asistență Clienți:** Sistemele automate de preluare a apelurilor telefonice.
