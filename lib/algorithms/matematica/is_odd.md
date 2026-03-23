<!-- custom-doc -->

# 🚀 **Număr Impar**

## 📝 **Descriere**

Un număr întreg $n$ se numește **impar** dacă nu este divizibil cu 2. Din punct de vedere matematic, un număr impar are întotdeauna forma $n = 2k + 1$, unde $k$ este un număr întreg. În informatică, această verificare este una dintre cele mai simple și frecvente operații.

## 🖼️ **Reprezentare Vizuală**
![Even and Odd Numbers](/docs-images/matematica/is_odd.svg)
<!-- external-visual -->
![Resursă vizuală externă (matematica)](https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg)


```text
7 / 2 = 3 rest 1  ==> IMPAR (True)
6 / 2 = 3 rest 0  ==> NU ESTE IMPAR (False)

Bitwise:
7 (binar: 0111) & 1 = 1  ==> IMPAR
6 (binar: 0110) & 1 = 0  ==> PAR
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Performanță Maximă:** Verificarea bitwise este aproape instantanee la nivel hardware. | ⚠️ **Tipuri de Date:** Nu se aplică direct numerelor în virgulă mobilă (floating point). |
| 📊 **Simplitate:** Codul este extrem de scurt și ușor de citit (ex: `n % 2 != 0`). | 📉 **Semn:** La unele limbaje (ex: C++), modulo pentru numere negative poate fi diferit de cel pentru pozitive. |

## 🔢 **Analiză Matematică și Complexitate**
$n \text{ este impar} \iff n \equiv 1 \pmod 2$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(1)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**
- **Logica Jocului:** Alternarea între doi jucători (ex: jucătorul 1 la ture impare).
- **Stilizare Interfață:** Colorarea diferită a rândurilor impare într-un tabel (zebra striping).
- **Algoritmi de Tip Divide et Impera:** Gestionarea cazurilor în care dimensiunea problemei este impară.
