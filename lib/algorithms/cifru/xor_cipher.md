<!-- custom-doc -->

# 🚀 **Cifrul XOR (XOR Cipher)**

## 📝 **Descriere**

**Cifrul XOR** este un algoritm de criptare simetrică simplu și eficient, bazat pe operația logică **eXclusive OR**. Acesta funcționează prin aplicarea operației XOR între fiecare bit al mesajului original și bitul corespunzător al unei chei secrete. O proprietate remarcabilă a acestui cifru este că aplicarea aceleiași operații a doua oară cu aceeași cheie va returna mesajul original, făcând algoritmul auto-inversibil.

## 🖼️ **Reprezentare Vizuală**

![XOR Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/XOR_ANSI.svg/200px-XOR_ANSI.svg.png)

```text
Mesaj (A): 1 0 1 0 (10 în decimal)
Cheie  (K): 1 1 0 0 (12 în decimal)
-------------------
Cifrat (C): 0 1 1 0 (6 în decimal) - A XOR K

Decriptare:
Cifrat (C): 0 1 1 0
Cheie  (K): 1 1 0 0
-------------------
Mesaj (A): 1 0 1 0 (Înapoi la original!)
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Viteză Extremă:** Operarea la nivel de biți este cea mai rapidă formă de calcul. | ⚠️ **Vulnerabilitate:** Dacă cheia este mai scurtă decât mesajul, este vulnerabil la atacuri. |
| 📊 **Simetrie:** Același cod este folosit atât pentru criptare, cât și pentru decriptare. | 📉 **Securitate Scăzută:** Nu oferă protecție împotriva atacurilor bazate pe frecvență dacă este utilizat brut. |
| 🛠️ **Simplitate:** Foarte ușor de implementat pe orice arhitectură hardware. | 🔑 **Gestiunea Cheilor:** Necesită o metodă sigură de partajare a cheii secrete. |

## 🔢 **Analiză Matematică și Complexitate**

Proprietatea fundamentală: $(A \oplus K) \oplus K = A \oplus (K \oplus K) = A \oplus 0 = A$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(n)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Criptografie de bază:** Componentă esențială în algoritmi complecși precum AES.
- **Obfuscare:** Protejarea șirurilor de caractere simple în codul sursă pentru a preveni citirea directă.
- **One-Time Pad (OTP):** Dacă cheia este perfect aleatorie și la fel de lungă ca mesajul, este teoretic imposibil de spart.
- **Integritate:** Utilizat în calculul unor sume de control (checksums) simple.
