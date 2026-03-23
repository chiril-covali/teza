<!-- custom-doc -->
# Coadă Circulară (Circular Queue)

**Coadă Circulară** este o variantă avansată a structurii de date de tip coadă (liniară) în care ultima poziție este conectată înapoi la prima poziție, formând un cerc logic. Aceasta rezolvă principala problemă a cozii liniare: **risipa de spațiu**.

---

## 🏗️ Reprezentare Vizuală

Într-o coadă liniară, odată ce elementele sunt eliminate (dequeue), spațiul eliberat la începutul vectorului rămâne neutilizat. Coada circulară refolosește acest spațiu prin „întoarcerea” indicatorului la început.

### Structura logică:
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

---

## 🌟 Avantajele Cozii Circulare față de Coada Liniară

Utilizarea unei cozi circulare oferă mai multe beneficii critice în dezvoltarea software-ului:

### 1. Utilizarea Eficientă a Memoriei
În coada liniară, dacă `rear` (spatele) ajunge la capătul vectorului, nu mai putem adăuga elemente noi, chiar dacă există spațiu liber la începutul vectorului creat prin operații de eliminare. Coada circulară elimină acest „fals overflow” prin reutilizarea spațiului eliberat.

### 2. Complexitate Constantă $O(1)$
Toate operațiile fundamentale (`enqueue` și `dequeue`) se realizează în timp constant, $O(1)$. În coada liniară, pentru a refolosi spațiul, ar fi necesară deplasarea tuturor elementelor la stânga, o operație costisitoare de $O(n)$.

### 3. Ideală pentru Sisteme în Timp Real
Datorită performanței predictibile și gestionării automate a buffer-ului, este utilizată intens în:
- **Programarea proceselor (CPU Scheduling):** Algoritmul Round-robin.
- **Transmiterea datelor (Data Streaming):** Buffere audio/video.
- **Gestionarea întreruperilor:** În sistemele embedded.

---

## 📊 Analiza Comparativă

| Caracteristică | Coadă Liniară | Coadă Circulară |
| :--- | :--- | :--- |
| **Utilizarea Memoriei** | Ineficientă (spațiu irosit la început) | Eficientă (reutilizează spațiul liber) |
| **Condiție de "Full"** | `rear == size - 1` | `(rear + 1) % size == front` |
| **Performanță** | $O(1)$ sau $O(n)$ (dacă se face shift) | Întotdeauna $O(1)$ |
| **Complexitate Logică** | Simplă | Puțin mai complexă (aritmetică modulară) |

---

## 🔢 Detalii Matematice

Operațiile se bazează pe **aritmetica modulară**. Dacă $n$ este dimensiunea vectorului, noua poziție a indexului se calculează astfel:

$$ \text{index\_nou} = (\text{index\_actual} + 1) \pmod{n} $$

### Condiții critice:
- **Coadă Golică:** `front == -1`
- **Coadă Plină:** `(rear + 1) % size == front`

---

## 🚀 Implementare (Sumar)
Implementarea folosește un vector de dimensiune fixă și doi indicatori, `frontIndex` și `rearIndex`. 

- **Enqueue:** Crește `rearIndex` circular și adaugă elementul.
- **Dequeue:** Returnează elementul de la `frontIndex` și îl avansează circular.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*
