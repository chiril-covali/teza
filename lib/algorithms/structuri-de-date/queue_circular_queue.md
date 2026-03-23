<!-- custom-doc -->

# 🚀 **Coadă Circulară (Circular Queue)**

## 📝 **Descriere**

**Coadă Circulară** este o variantă optimizată a cozii liniare în care ultima poziție a vectorului este conectată logic cu prima poziție, formând un cerc. Această structură rezolvă problema majoră a cozii bazate pe vector: **risipa de spațiu**. Într-o coadă circulară, spațiul eliberat prin eliminarea elementelor (dequeue) este reutilizat imediat pentru noi adăugări (enqueue).

## 🖼️ **Reprezentare Vizuală**

![Circular Queue Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Circular_buffer.svg/400px-Circular_buffer.svg.png)

```text
           [0]  [1]  [2]
          +----+----+----+
     +--- | 10 | 20 |    | <--- Front (0)
     |    +----+----+----+
     |      ^         |
     |      |         |
     +------+---------+
            Circular Wrap
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Eficiență Maximă:** Reutilizează complet spațiul din memorie fără a muta elementele. | ⚠️ **Capacitate Fixă:** În varianta standard, dimensiunea trebuie cunoscută de la început. |
| 📊 **Performanță Constantă:** Atât `enqueue` cât și `dequeue` se execută în $O(1)$. | 📉 **Logică Complexă:** Necesită utilizarea aritmeticii modulare pentru gestionarea indicilor. |

## 🔢 **Analiză Matematică și Complexitate**

Calculul indicilor se bazează pe operația **modulo** ($n$ fiind dimensiunea cozii):
`index_nou = (index_actual + 1) % n`

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Enqueue** | $O(1)$ |
| **Dequeue** | $O(1)$ |
| **Condiție Full** | `(rear + 1) % n == front` |
| **Spațiu (Space)** | $O(n)$ |

## 💡 **Aplicații Practice**

- **CPU Scheduling:** Algoritmul Round-Robin pentru partajarea timpului procesorului.
- **Streaming Audio/Video:** Buffere care trebuie să mențină un flux continuu de date.
- **Sisteme Embedded:** Gestionarea întreruperilor și a bufferelor de memorie limitată.
- **Networking:** Gestionarea pachetelor de date în routere.
