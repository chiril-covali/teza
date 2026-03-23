<!-- custom-doc -->
# Coadă bazată pe Vector (Array Queue)

**Coadă bazată pe Vector** (Array Queue) este cea mai simplă formă de implementare a structurii de date de tip coadă, utilizând un tablou (array) pentru a stoca elementele conform principiului **FIFO** (First-In, First-Out).

---

## 🏗️ Reprezentare Vizuală

Într-o coadă bazată pe vector, elementele sunt adăugate la sfârșit și eliminate de la început.

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

---

## ⚙️ Detalii de Implementare

În această versiune specifică, utilizăm metodele native ale limbajului (cum ar fi `push` și `shift` în JavaScript/TypeScript):

1. **Enqueue (Adăugare):** Adaugă un element la sfârșitul vectorului. Complexitate: $O(1)$.
2. **Dequeue (Eliminare):** Elimină primul element din vector. **Atenție:** În majoritatea implementărilor bazate pe vectori dinamici, această operație are complexitate $O(n)$ deoarece toate elementele rămase trebuie re-indexate (mutate cu o poziție la stânga).

---

## ⚖️ Avantaje și Dezavantaje

### Avantaje
- **Simplitate:** Este extrem de ușor de înțeles și de implementat.
- **Performanță Cache:** Elementele sunt stocate în locații de memorie contigue, ceea ce favorizează viteza de acces a procesorului.
- **Fără pointeri extra:** Spre deosebire de listele înlănțuite, nu consumă memorie suplimentară pentru a stoca adresele elementelor următoare.

### Dezavantaje
- **Ineficiență la Eliminare:** Operația `dequeue` este costisitoare ($O(n)$) dacă nu se folosește o abordare circulară.
- **Risipă de spațiu:** Dacă nu este implementată circular, spațiul eliberat la începutul vectorului rămâne neutilizat până la o eventuală resetare a cozii.

---

## 📊 Analiza Complexității

| Operație | Timp (Time Complexity) | Spațiu (Space Complexity) |
| :--- | :--- | :--- |
| **Enqueue** | $O(1)$ | $O(1)$ |
| **Dequeue** | $O(n)$ | $O(1)$ |
| **Peek (Front)** | $O(1)$ | $O(1)$ |
| **IsEmpty** | $O(1)$ | $O(1)$ |

---

## 💡 Recomandare
Pentru aplicații care necesită un volum mare de date și performanță ridicată, se recomandă utilizarea unei **Cozi Circulare** sau a unei **Cozi bazate pe Listă Înlănțuită** pentru a obține o complexitate de $O(1)$ la eliminare.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*
