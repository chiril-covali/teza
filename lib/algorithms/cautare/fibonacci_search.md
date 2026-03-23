<!-- custom-doc -->

# 🚀 **Căutare Fibonacci**

## 📝 **Descriere**

**Căutarea Fibonacci** este un algoritm de căutare pentru tablouri **sortate** care utilizează numerele din șirul lui Fibonacci pentru a determina punctele de divizare a intervalului de căutare. Similar cu căutarea binară, acesta folosește o strategie de tip "divide et impera", dar cu o distribuție diferită a intervalelor, ceea ce poate fi avantajos în sisteme unde operațiile de acces la memorie sunt costisitoare.

## 🖼️ **Reprezentare Vizuală**

![Fibonacci Search Diagram](/docs-images/cautare/fibonacci_search.svg)
<!-- external-visual -->
![Resursă vizuală externă (cautare)](https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80)


```text
n=11, Fib(k)=13, Fib(k-1)=8, Fib(k-2)=5
1. Identifică cel mai mic număr Fibonacci ≥ n (aici 13).
2. Divizează tabloul folosind Fib(k-2).
3. Offset inițial = -1. i = min(offset + Fib(k-2), n-1).
4. Ajustează Fib(k) și offset-ul în funcție de comparație.
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Fără împărțiri:** Folosește doar adunări și scăderi (mai rapid pe CPU-uri vechi). | ⚠️ **Precondiție:** Necesită tabloul sortat și acces la șirul Fibonacci. |
| 📊 **Localitate cache:** Accesează datele în intervale mai restrânse decât căutarea binară. | 📉 **Complexitate:** Mai greu de implementat corect decât căutarea binară. |

## 🔢 **Analiză Matematică și Complexitate**

Algoritmul reduce intervalul de căutare folosind raportul numerelor Fibonacci adiacente (care tinde spre Secțiunea de Aur $\phi \approx 1.618$).

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Worst Case)** | $O(\log n)$ |
| **Timp (Best Case)** | $O(1)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Sisteme cu resurse limitate:** Unde operația de împărțire (necesară la căutarea binară) este lentă sau absentă hardware.
- **Optimizarea cache-ului:** Când se caută în seturi de date care nu încap complet în cache-ul L1.
- **Baze de date:** Ca alternativă la alte metode de căutare logaritmică.
