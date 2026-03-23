<!-- custom-doc -->

# 🚀 **Set**

## 📝 **Descriere**
Un set este o structură de date care stochează o colecție de elemente unice, fără o ordine specifică. Aceasta permite operații eficiente de adăugare, eliminare și căutare a elementelor, de regulă având o complexitate medie de $O(1)$. Seturile sunt fundamentale în informatică pentru gestionarea colecțiilor unde duplicatele nu sunt permise și unde apartenența unui element trebuie verificată rapid.

## 🖼️ **Reprezentare Vizuală**
![Diagramă Set](/docs-images/structuri-de-date/set_set.svg)
<!-- external-visual -->
![Resursă vizuală externă (structuri-de-date)](https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg)


```text
Set A: {1, 2, 3, 4}

Operație: Adaugă 5
Rezultat: {1, 2, 3, 4, 5}

Operație: Adaugă 2 (deja existent)
Rezultat: {1, 2, 3, 4, 5} (Nicio schimbare, elementul este unic)
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaje | Dezavantaje |
| :--- | :--- |
| ✅ Garantează unicitatea elementelor | ❌ Nu menține ordinea elementelor |
| ✅ Căutare, inserare și ștergere foarte rapide | ❌ Consum de memorie mai ridicat (Hash Table) |
| ✅ Ideal pentru operații matematice cu mulțimi | ❌ Nu permite accesul elementelor prin index |

## 🔢 **Analiză Matematică și Complexitate**
| Operație | Complexitate Timp | Complexitate Spațiu |
| :--- | :--- | :--- |
| Inserare | $O(1)$ (Mediu) / $O(n)$ (Worst) | $O(1)$ |
| Ștergere | $O(1)$ (Mediu) / $O(n)$ (Worst) | $O(1)$ |
| Căutare | $O(1)$ (Mediu) / $O(n)$ (Worst) | $O(1)$ |
| Spațiu Total | - | $O(n)$ |

## 💡 **Aplicații Practice**
- **Eliminarea duplicatelor** dintr-o listă sau dintr-un flux de date masiv.
- **Operații cu mulțimi** precum reuniunea, intersecția și diferența între colecții de date.
- **Verificarea rapidă a apartenenței** (ex: verificarea dacă un nume de utilizator este deja luat).
- **Tracking-ul elementelor vizitate** în algoritmi de parcurgere a grafurilor (BFS/DFS).
