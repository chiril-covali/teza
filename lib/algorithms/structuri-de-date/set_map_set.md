<!-- custom-doc -->

# 🚀 **Set bazat pe Map (Map Set)**

## 📝 **Descriere**

Un **Set bazat pe Map** este o implementare a structurii de date de tip mulțime (Set) folosind un dicționar sau o hartă (Map) ca bază. În această abordare, elementele setului sunt stocate drept **chei** în Map, în timp ce valorile asociate sunt ignorate sau setate la o valoare fixă (dummy). Această metodă profită de mecanismele interne ale hărților pentru a asigura unicitatea cheilor și accesul rapid.

## 🖼️ **Reprezentare Vizuală**

![Venn Diagram for Set](https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Venn_A_subset_B.svg/400px-Venn_A_subset_B.svg.png)

```text
Map Intern (Element -> Există?):
{
  "A" : true,
  "B" : true,
  "C" : true
}

- Add("D") -> Map["D"] = true
- Has("A") -> return Map.has("A")
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Refolosire:** Utilizează o structură de date deja existentă și testată (Map). | ⚠️ **Spațiu irosit:** Valorile din Map ocupă memorie inutilă (deoarece ne interesează doar cheile). |
| 📊 **Unicitate Nativă:** Map-urile nu permit chei duplicate, rezolvând automat cerința principală a unui Set. | 📉 **Overhead:** Poate fi ușor mai lent decât o implementare de HashSet dedicată. |

## 🔢 **Analiză Matematică și Complexitate**

Complexitatea depinde de implementarea de bază a Map-ului (de obicei un Tabel Hash).

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Add/Remove/Has)** | $O(1)$ (Mediu) |
| **Timp (Iteration)** | $O(n)$ |
| **Spațiu (Space)** | $O(n)$ |

## 💡 **Aplicații Practice**

- **Implementarea Set în JS/TS:** Multe motoare JS implementează `Set` folosind o structură similară cu `Map`.
- **Filtrarea datelor:** Extragerea rapidă a valorilor unice dintr-un set de rezultate dintr-o bază de date.
- **Cache-uri simple:** Verificarea dacă un obiect a fost deja procesat într-un flux de lucru.
