<!-- custom-doc -->

# 🚀 **Coadă implementată cu Stive (Queue using Stacks)**

## 📝 **Descriere**

O **Coadă implementată cu Stive** este o structură de date care simulează comportamentul unei cozi (**FIFO** - First-In, First-Out) utilizând două stive (**LIFO** - Last-In, First-Out). Această tehnică demonstrează cum putem construi o structură de date complexă folosind primitive mai simple, inversând ordinea elementelor prin transferul acestora între cele două stive.

## 🖼️ **Reprezentare Vizuală**

![Queue using Stacks Animation](https://upload.wikimedia.org/wikipedia/commons/e/e0/QueueStack.gif)

```text
Stiva 1 (Inbox): Folosită pentru Enqueue (Adăugare)
Stiva 2 (Outbox): Folosită pentru Dequeue (Eliminare)

1. Enqueue(A), Enqueue(B) -> Stiva 1: [A, B] | Stiva 2: []
2. Dequeue() -> Transferă S1 în S2 -> Stiva 1: [] | Stiva 2: [B, A]
3. Pop din S2 -> Returnează A (Primul adăugat)
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Amortizare:** Operația de eliminare este foarte rapidă în majoritatea cazurilor ($O(1)$ amortizat). | ⚠️ **Transfer Costisitor:** Când Stiva 2 este goală, transferul tuturor elementelor din Stiva 1 durează $O(n)$. |
| 📊 **Flexibilitate:** Permite implementarea unei cozi în medii unde doar stivele sunt disponibile nativ. | 📉 **Memorie:** Utilizează spațiu dublu față de o coadă simplă pentru a stoca cele două stive. |

## 🔢 **Analiză Matematică și Complexitate**

Deși un singur `Dequeue` poate dura $O(n)$, pe parcursul a $n$ operații, fiecare element este mutat de cel mult două ori, rezultând o complexitate amortizată constantă.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Enqueue)** | $O(1)$ |
| **Timp (Dequeue)** | $O(1)$ (Amortizat) |
| **Spațiu (Space)** | $O(n)$ |

## 💡 **Aplicații Practice**

- **Interviuri Tehnice:** O problemă clasică pentru testarea înțelegerii structurilor de date fundamentale.
- **Sisteme cu resurse limitate:** Implementarea cozilor în limbaje sau platforme care oferă doar stive native.
- **Gestiunea fluxurilor de date:** Inversarea ordinii elementelor într-un mod controlat.
