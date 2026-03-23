<!-- custom-doc -->

# 🚀 **Numere Prime (Primes)**

## 📝 **Descriere**

Un **Număr Prim** este un număr natural mai mare decât 1 care are exact doi divizori pozitivi: 1 și el însuși. Numerele prime sunt "atomii" matematicii, deoarece orice număr compus poate fi construit prin înmulțirea numerelor prime. Primul număr prim și singurul par este 2.

## 🖼️ **Reprezentare Vizuală**

![Primes Table](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Primes-table.svg/500px-Primes-table.svg.png)

```text
Identificare (Sita lui Eratostene):
Numere:  2  3  4  5  6  7  8  9  10
        --------------------------
Status:  P  P  X  P  X  P  X  X  X  (P=Prim, X=Compus)

Primele numere prime: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29...
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| ✅ **Securitate:** Stau la baza întregii infrastructuri de criptare de pe internet (HTTPS, SSL). | ⚠️ **Cost Computațional:** Testarea primalității pentru numere foarte mari necesită algoritmi complecși (ex: Miller-Rabin). |
| ✅ **Distribuție:** Deși par aleatorii, distribuția lor urmează legi matematice precise (Teorema Numerelor Prime). | ❌ **Infinitate:** Deși știm că sunt infinite, găsirea următorului număr prim "gigant" este extrem de grea. |

## 🔢 **Analiză Matematică și Complexitate**

Verificarea primalității unui număr $n$ se face prin diviziune până la $\sqrt{n}$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Verificare)** | $O(\sqrt{n})$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Criptografie Asimetrică:** Generarea perechilor de chei publice și private (RSA).
- **Tabele de Hash:** Utilizarea numerelor prime pentru dimensiunea tabelelor pentru a minimiza coliziunile.
- **Generarea Numerelor Pseudo-aleatorii:** Algoritmi care folosesc modulo numere prime mari.
- **Teoria Muzicii:** Studiul intervalelor și al ritmurilor non-repetitive.
