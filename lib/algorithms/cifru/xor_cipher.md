# Cifrul XOR

Slug: cifru_xor_cipher
Categorie: Cifrare

## Introducere

Cifrul XOR este un algoritm de criptare simetrică ce utilizează operația logică **XOR** (sau exclusiv) la nivel de biți. Este unul din cele mai simple și mai elegante mecanisme de cifrare: același algoritm și aceeași cheie sunt folosite atât pentru criptare, cât și pentru decriptare. Această proprietate provine direct din auto-inversa naturii operației XOR: `(a XOR b) XOR b = a`.

Rădăcinile cifrului XOR se regăsesc în **one-time pad** (blocul unic de unică folosință), inventat de Frank Miller în 1882 și reinventat de Gilbert Vernam în 1917, care a brevetat un sistem de criptare telegrafica bazat pe XOR. Claude Shannon a demonstrat în 1949 că one-time pad-ul este **perfect sigur din punct de vedere teoretic** — dacă cheia este aleatorie, de aceeași lungime cu mesajul și folosită o singură dată, cifrul XOR este imposibil de spart.

Cu toate acestea, în practică cifrul XOR simplu cu o cheie scurtă repetată este **vulnerabil** și nu trebuie folosit pentru securitate serioasă. Dacă cheia se repetă, analiza de frecvență și atacul prin text cunoscut pot recupera atât mesajul, cât și cheia. Totuși, cifrul XOR rămâne fundamental în criptografie modernă: algoritmii AES, ChaCha20 și One-Time Pad se bazează pe XOR ca operație de bază.

## Descriere

Operația XOR (⊕) la nivel de biți funcționează pe fiecare pereche de biți conform tabelului de adevăr: `0⊕0=0`, `0⊕1=1`, `1⊕0=1`, `1⊕1=0`. Pentru criptare, fiecare byte al mesajului este combinat cu XOR cu byte-ul corespunzător al cheii (care se repetă ciclic dacă este mai scurtă decât mesajul).

**Pașii algoritmului:**

1. Convertește mesajul și cheia în secvențe de bytes.
2. Pentru fiecare byte `i` al mesajului:
   a. Calculează `mesajCriptat[i] = mesaj[i] XOR cheie[i mod lungime(cheie)]`.
3. Rezultatul este mesajul criptat.

**Decriptare (identică cu criptarea):**
1. Pentru fiecare byte `i` al mesajului criptat:
   a. Calculează `mesajDecriptat[i] = mesajCriptat[i] XOR cheie[i mod lungime(cheie)]`.

Proprietatea magică: `(M XOR K) XOR K = M XOR (K XOR K) = M XOR 0 = M` ✓

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| Cel mai bun | O(n) | O(n) |
| Mediu | O(n) | O(n) |
| Cel mai rău | O(n) | O(n) |

**Explicație:** Algoritmul parcurge fiecare din cele `n` bytes ale mesajului exact o dată, efectuând o singură operație XOR per byte — operație de cost constant O(1). Deci complexitatea de timp totală este O(n), unde `n` este lungimea mesajului. Spațiul necesar este O(n) pentru stocarea mesajului criptat/decriptat (dacă nu se face modificarea „in-place"). Dacă modificarea se face direct în buffer, spațiul poate fi redus la O(1) auxiliar.

## Pseudocod

```
CIFRARE_XOR(mesaj, cheie):
    n ← lungime(mesaj)
    m ← lungime(cheie)
    rezultat ← tablou de n bytes

    PENTRU i DE LA 0 LA n - 1:
        rezultat[i] ← mesaj[i] XOR cheie[i mod m]

    RETURNEAZĂ rezultat

// Decriptarea este identică:
DECIFRARE_XOR(mesajCriptat, cheie):
    RETURNEAZĂ CIFRARE_XOR(mesajCriptat, cheie)
```

## Exemple

**Exemplu pas cu pas:**

Mesaj: `"HELLO"` → bytes: `[72, 69, 76, 76, 79]` (ASCII)
Cheie: `"KEY"` → bytes: `[75, 69, 89]` (ASCII)

**Criptare:**
```
Indice:  0      1      2      3      4
Mesaj:   72     69     76     76     79    (H E L L O)
Cheie:   75     69     89     75     69    (K E Y K E — cheia se repetă ciclic)
XOR:     3      0      21     3      26
Criptat: \x03   \x00   \x15   \x03   \x1A
```

Calculul detaliat:
- `H(72) XOR K(75) = 01001000 XOR 01001011 = 00000011 = 3`
- `E(69) XOR E(69) = 01000101 XOR 01000101 = 00000000 = 0`
- `L(76) XOR Y(89) = 01001100 XOR 01011001 = 00010101 = 21`
- `L(76) XOR K(75) = 01001100 XOR 01001011 = 00000111 = 7` *(corecție: 76⊕75=3)*

**Decriptare:**
```
Criptat: [3, 0, 21, 3, 26]
Cheie:   [75, 69, 89, 75, 69]
XOR:     72, 69, 76, 76, 79 = "HELLO" ✓
```

**Demonstrarea vulnerabilității (cheie repetată):**
Dacă avem două mesaje criptate cu aceeași cheie: `C1 = M1 XOR K` și `C2 = M2 XOR K`, atunci:
`C1 XOR C2 = (M1 XOR K) XOR (M2 XOR K) = M1 XOR M2`
— cheia dispare! Dacă M1 sau M2 este cunoscut, celălalt poate fi dedus.

## Aplicații

- **One-Time Pad:** Forma perfectă a cifrului XOR cu cheie aleatorie, nedeterministă, de lungimea mesajului. Singura schemă de criptare dovedită matematic perfect sigură.
- **Stream Ciphers:** Algoritmi moderni ca RC4, ChaCha20/Poly1305, Salsa20 generează un keystream pseudoaleator și îl combină cu mesajul prin XOR.
- **Algoritmi simetrici moderni:** AES (Advanced Encryption Standard) folosește XOR în etapele `AddRoundKey` pentru combinarea datelor cu cheia de rundă.
- **Protocoale de rețea:** HTTPS/TLS folosesc XOR prin stream cipher-uri pentru criptarea traficului web.
- **Checksum și detecția erorilor:** Paritatea (XOR pe toți biții) detectează erori de transmisie în protocoale seriale.
- **Hash functions:** SHA-256, MD5 și alte funcții hash folosesc XOR ca operație primară.
- **Obfuscare simplă:** Ascunderea datelor în aplicații mobile sau fișiere de configurare (nu pentru securitate serioasă).
- **RAID și backup:** RAID-5 folosește XOR pentru calculul parității, permițând reconstrucția datelor în caz de defect al unui disc.

## Resurse

- [Wikipedia - XOR Cipher](https://en.wikipedia.org/wiki/XOR_cipher)
- [Wikipedia - One-time Pad](https://en.wikipedia.org/wiki/One-time_pad)
- [GeeksForGeeks - XOR Cipher](https://www.geeksforgeeks.org/xor-cipher/)
- [Crypto101 - XOR](https://crypto101.io/)
- [CryptoHack - XOR Challenges](https://cryptohack.org/challenges/introduction/)
