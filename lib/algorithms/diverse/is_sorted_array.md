<!-- custom-doc -->

# 🚀 **Verificare Tablou Sortat**

## 📝 **Descriere**

**Verificarea unui tablou sortat** este o operație fundamentală care determină dacă elementele unei structuri de date sunt aranjate într-o ordine specifică (ascendentă sau descendentă). Algoritmul parcurge tabloul o singură dată, comparând fiecare element cu succesorul său pentru a valida relația de ordine. Această verificare este un pre-requizit crucial pentru algoritmi mai complecși, cum ar fi căutarea binară.

## 🖼️ **Reprezentare Vizuală**

![Linear Scan](/docs-images/diverse/is_sorted_array.svg)
<!-- external-visual -->
![Resursă vizuală externă (diverse)](https://cdn.pixabay.com/photo/2015/05/31/10/55/man-791049_1280.jpg)


```text
Tablou: [10, 20, 30, 45, 50]

Pas 1: 10 <= 20 ? Da ✅
Pas 2: 20 <= 30 ? Da ✅
Pas 3: 30 <= 45 ? Da ✅
Pas 4: 45 <= 50 ? Da ✅

Rezultat final: Tablou Sortat! 🚀
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Eficiență:** Timp de execuție liniar, optim pentru această problemă. | ⚠️ **Informație Limitată:** Confirmă doar ordinea, nu oferă detalii despre distribuția datelor. |
| 🛠️ **Simplitate:** Ușor de înțeles și de implementat în orice limbaj. | 📉 **Costiv la Modificări:** Orice schimbare în tablou necesită o nouă verificare completă. |
| 📊 **Early Exit:** Se poate opri imediat ce găsește prima pereche nesortată. | 🧩 **Dependență:** Rezultatul depinde strict de criteriul de comparație definit. |

## 🔢 **Analiză Matematică și Complexitate**

Algoritmul efectuează maximum $n-1$ comparații pentru un tablou cu $n$ elemente.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time) - Cel mai bun caz** | $O(1)$ (prima pereche e greșită) |
| **Timp (Time) - Caz Mediu/Pessim** | $O(n)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Validarea Datelor:** Asigurarea că datele de intrare sunt pregătite pentru algoritmi care necesită sortare (ex: Căutare Binară).
- **Testare Automată:** Verificarea corectitudinii algoritmilor de sortare (Unit Testing).
- **Optimizări:** Evitarea sortărilor inutile dacă tabloul este deja ordonat.
- **Sisteme de Baze de Date:** Menținerea integrității indexurilor ordonate.
