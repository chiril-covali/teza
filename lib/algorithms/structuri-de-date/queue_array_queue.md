<!-- custom-doc -->

# 🚀 **Coadă bazată pe Vector**

## 📝 **Descriere**

**Coadă bazată pe Vector** (Array Queue) este o implementare a structurii de date de tip coadă care utilizează un tablou (array) pentru stocarea elementelor. Funcționează pe principiul **FIFO** (First-In, First-Out), unde primul element adăugat este și primul care va fi eliminat. Este cea mai simplă formă de coadă, dar poate prezenta ineficiențe la eliminarea elementelor dacă nu este optimizată.

## 🖼️ **Reprezentare Vizuală**

![Queue Diagram](/docs-images/structuri-de-date/queue_array_queue.svg)
<!-- external-visual -->
![Resursă vizuală externă (structuri-de-date)](https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg)


```text
       Eliminare (Dequeue)                     Adăugare (Enqueue)
            ^                                       |
            |                                       v
      +-----+-----+-----+-----+-----+-----+-----+-----+
Index | [0] | [1] | [2] | [3] | [4] | [5] | ... | [n] |
      +-----+-----+-----+-----+-----+-----+-----+-----+
        ^                                       ^
        |                                       |
      Front                                   Rear
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Simplitate:** Foarte ușor de implementat folosind vectori nativi (ex: `push`/`shift`). | ⚠️ **Ineficiență la Dequeue:** Eliminarea elementului de la index 0 necesită deplasarea tuturor celorlalte elemente ($O(n)$). |
| 📊 **Performanță Cache:** Elementele sunt contigue în memorie, ceea ce accelerează accesul. | 📉 **Risipă de Spațiu:** Spațiul eliberat la începutul vectorului rămâne neutilizat fără o strategie de shift. |

## 🔢 **Analiză Matematică și Complexitate**

Complexitatea depinde de modul în care limbajul de programare gestionează re-indexarea vectorului la eliminare.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Enqueue (Adăugare)** | $O(1)$ |
| **Dequeue (Eliminare)** | $O(n)$ (în majoritatea implementărilor simple) |
| **Peek (Vizualizare)** | $O(1)$ |
| **Spațiu (Space)** | $O(n)$ |

## 💡 **Aplicații Practice**

- **Buffer-e simple:** Cozi de mesaje unde volumul de date este mic.
- **Procesarea Task-urilor:** Gestiunea sarcinilor care trebuie executate în ordinea sosirii.
- **Algoritmi elementari:** Utilizată în demonstrații educaționale pentru principiul FIFO.
- **Sisteme de imprimare:** Documentele sunt procesate în ordinea în care au fost trimise.
