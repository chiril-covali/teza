<!-- custom-doc -->
# 🚀 **Căutare prin Salturi (Jump Search)**

## 📝 **Descriere**
**Jump Search** este un algoritm de căutare pentru tablouri **sortate**. Acesta îmbunătățește căutarea liniară prin verificarea unui număr mai mic de elemente, "sărind" peste blocuri de dimensiune fixă. Dacă se găsește un bloc unde elementul căutat ar putea exista, se efectuează o căutare liniară doar în interiorul acelui bloc.

## 🖼️ **Reprezentare Vizuală**
![Jump Search Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Jump_Search_Algorithm.png/400px-Jump_Search_Algorithm.png)

**Diagramă ASCII (Salturi):**
```text
Target: 55, Salt: 4
[10, 20, 30, 40, | 50, 60, 70, 80, | 90]
Pas 1: Salt la index 4 (Val: 50). 50 < 55.
Pas 2: Salt la index 8 (Val: 90). 90 > 55.
Pas 3: Căutare liniară între index 4 și 8.
Găsit la index 5! (Dacă există)
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Eficiență:** Mai rapid decât căutarea liniară ($O(\sqrt{n})$ vs $O(n)$). | ⚠️ **Precondiție:** Tabloul **trebuie să fie sortat** în prealabil. |
| 📊 **Echilibru:** Mai lent decât căutarea binară, dar face mai puține "sărituri înapoi" (util pe medii fizice lente). | 📉 **Configurare:** Necesită alegerea unei dimensiuni optime pentru salt ($\sqrt{n}$). |

## 🔢 **Analiză Matematică și Complexitate**
Dimensiunea optimă a saltului este $m = \sqrt{n}$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(\sqrt{n})$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**
- **Sisteme unde "saltul înapoi" este costisitor:** De exemplu, căutarea pe benzi magnetice sau sisteme de fișiere secvențiale vechi.
- **Seturi de date mari:** Când căutarea binară ar cauza prea multe erori de cache (cache misses) din cauza salturilor prea mari.
