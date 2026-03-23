<!-- custom-doc -->

# 🚀 **Cifrul XOR (XOR Cipher)**

## 📝 **Descriere**

**Cifrul XOR** este un algoritm de criptare simetrică simplu și eficient, bazat pe operația logică **eXclusive OR**. Acesta funcționează prin aplicarea operației XOR între fiecare bit al mesajului original și bitul corespunzător al unei chei secrete. O proprietate remarcabilă a acestui cifru este că aplicarea aceleiași operații a doua oară cu aceeași cheie va returna mesajul original.

## 🖼️ **Reprezentare Vizuală**

![XOR Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/XOR_ANSI.svg/200px-XOR_ANSI.svg.png)

```text
Mesaj (A): 1 0 1 0 (10 in decimal)
Cheie  (K): 1 1 0 0 (12 in decimal)
-------------------
Cifrat (C): 0 1 1 0 (6 in decimal) - A XOR K

Decriptare:
Cifrat (C): 0 1 1 0
Cheie  (K): 1 1 0 0
-------------------
Mesaj (A): 1 0 1 0 (Înapoi la original!)
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Viteză Extremă:** Operarea la nivel de biți este cea mai rapidă formă de calcul. | ⚠️ **Vulnerabilitate:** Dacă cheia este mai scurtă decât mesajul, este ușor de spart. |
| 📊 **Simetrie:** Același cod este folosit atât pentru criptare, cât și pentru decriptare. | 📉 **Securitate Scăzută:** Nu oferă protecție împotriva atacurilor bazate pe frecvență dacă este utilizat brut. |

## 🔢 **Analiză Matematică și Complexitate**

Proprietatea cheie: $(A \oplus K) \oplus K = A \oplus (K \oplus K) = A \oplus 0 = A$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(n)$ |
| **Spațiu (Space)** | $O(1)$ (sau $O(n)$ pentru rezultat) |

## 💡 **Aplicații Practice**

- **Criptografie de bază:** Componentă în algoritmi complecși precum AES.
- **Obfuscare:** Protejarea șirurilor de caractere simple în codul sursă.
- **One-Time Pad (OTP):** Dacă cheia este aleatorie și la fel de lungă ca mesajul, este teoretic imposibil de spart.
