<!-- custom-doc -->
# 🚀 **Logaritm în Baza 2 (Log2 Bitwise)**

## 📝 **Descriere**
Calcularea **Logaritmului în baza 2** al unui număr întreg pozitiv $n$ revine la găsirea poziției celui mai semnificativ bit setat (MSB). Într-un sistem binar, $\lfloor \log_2(n) \rfloor$ indică puterea maximă a lui 2 care este mai mică sau egală cu $n$. Folosind manipularea de biți, acest calcul devine extrem de rapid, evitând funcțiile matematice costisitoare din punct de vedere al resurselor.

## 🖼️ **Reprezentare Vizuală**
![Binary Powers](https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Binary_tree_powers_of_2.svg/300px-Binary_tree_powers_of_2.svg.png)

**Diagramă ASCII (Exemplu: n=16):**
```text
n = 16
Binar: 0 0 0 1 0 0 0 0
Index: 7 6 5 4 3 2 1 0
             ^
Cel mai semnificativ bit este la index 4.
Rezultat: log2(16) = 4.
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Performanță:** Mult mai rapid decât funcția `Math.log()` pentru numere întregi. | ⚠️ **Precizie:** Calculează doar partea întreagă a logaritmului (floor). |
| 📊 **Fără Float:** Nu necesită operații cu numere în virgulă mobilă, fiind ideal pentru sisteme embedded. | 📉 **Domeniu:** Funcționează doar pe numere întregi pozitive. |

## 🔢 **Analiză Matematică și Complexitate**
Algoritmul poate fi implementat printr-o buclă de deplasare la dreapta ($n \gg 1$) sau folosind instrucțiuni CPU dedicate (ex: `CLZ` - Count Leading Zeros).

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Bit-shift)** | $O(\log n)$ |
| **Timp (CLZ)** | $O(1)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**
- **Sisteme de Fișiere:** Calcularea numărului de biți necesari pentru a stoca o adresă.
- **Grafică pe Calculator:** Determinarea nivelului de detaliu (Mipmapping).
- **Algoritmi Divide et Impera:** Calcularea înălțimii arborilor echilibrați.
