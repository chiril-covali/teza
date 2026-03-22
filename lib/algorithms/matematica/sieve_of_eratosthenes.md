# Ciurul lui Eratostene

Slug: matematica_sieve_of_eratosthenes
Categorie: Matematică

## Introducere

Ciurul lui Eratostene este unul dintre cei mai vechi algoritmi cunoscuți din istoria matematicii și unul dintre cei mai eficienți pentru găsirea tuturor numerelor prime mai mici sau egale cu un număr dat n. Algoritmul a fost descris de matematicianul și geograful grec Eratostene din Cirene în jurul anului 240 î.Hr., în lucrările sale despre teoria numerelor.

Ideea centrală a algoritmului este elegantă: în loc să verifici fiecare număr individual dacă este prim, pornești de la cel mai mic număr prim (2) și elimini sistematic toți multiplii săi din listă, apoi treci la următorul număr neeliminat (care va fi cu siguranță prim) și repeți procesul. Ceea ce rămâne în final sunt exclusiv numerele prime.

Deși există algoritmi mai sofisticați pentru generarea numerelor prime (precum ciurul lui Atkin sau ciurul segmentat), ciurul lui Eratostene rămâne soluția de referință pentru intervalele de dimensiuni moderate datorită simplității sale și eficienței practice foarte bune.

## Descriere

Algoritmul operează pe un vector boolean de lungime n+1, unde poziția i indică dacă i este prim sau nu. Inițial toate pozițiile sunt marcate ca „prime" (true), iar 0 și 1 sunt excluse explicit.

**Pașii algoritmului:**
1. Creează un vector `estePrim[0..n]` inițializat cu valoarea `true`.
2. Setează `estePrim[0] = false` și `estePrim[1] = false` (0 și 1 nu sunt prime).
3. Începând cu p = 2, cât timp p² ≤ n:
   a. Dacă `estePrim[p]` este true (p este prim), marchează toți multiplii lui p (de la p² în sus) ca `false`.
   b. Incrementează p.
4. Colectează toate valorile i pentru care `estePrim[i]` este true — acestea sunt numerele prime.

**Notă importantă:** Eliminarea multiplilor începe de la p² (nu de la 2p) deoarece toți multiplii mai mici ai lui p au fost deja eliminați de primele prime mai mici.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| General | O(n log log n) | O(n) |

**Explicație:** Complexitatea temporală O(n log log n) provine din suma seriei armonice a primelor: suma 1/p pentru toate primele p ≤ n este aproximativ log(log(n)). Fiecare număr compus este marcat o singură dată pentru fiecare factor prim al său. Spațiul O(n) este necesar pentru vectorul boolean.

## Pseudocod

```
funcție ciurulLuiEratostene(n):
    estePrim ← vector de n+1 elemente, toate true
    estePrim[0] ← false
    estePrim[1] ← false

    pentru p de la 2 până la √n:
        dacă estePrim[p] = true:
            pentru multiplu de la p×p până la n cu pasul p:
                estePrim[multiplu] ← false

    prime ← listă goală
    pentru i de la 2 până la n:
        dacă estePrim[i] = true:
            adaugă i la prime

    returnează prime
```

## Exemple

**Exemplul 1:** Găsește toate numerele prime ≤ 30

Vectorul inițial: [F, F, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T]

- p=2: elimină 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30
- p=3: elimină 9, 15, 21, 27
- p=5: elimină 25
- √30 ≈ 5.47, deci ne oprim

Prime ≤ 30: **2, 3, 5, 7, 11, 13, 17, 19, 23, 29**

**Exemplul 2:** Câte prime există până la 100?

Folosind ciurul: există **25** numere prime până la 100.

**Exemplul 3:** Densitatea numerelor prime scade pe măsură ce n crește:
- Prime ≤ 100: 25 (25%)
- Prime ≤ 1.000: 168 (16.8%)
- Prime ≤ 10.000: 1.229 (12.29%)

Aceasta este ilustrarea teoremei numerelor prime: π(n) ≈ n / ln(n).

## Aplicații

- **Criptografie** – generarea numerelor prime mari este fundamentală în RSA, Diffie-Hellman și alte protocoale de criptare cu cheie publică.
- **Teoria numerelor** – studiul distribuției numerelor prime, conjectura lui Riemann.
- **Hashing** – tabelele de dispersie folosesc adesea numere prime pentru dimensiunea lor pentru a minimiza coliziunile.
- **Generarea de numere pseudo-aleatoare** – generatoarele liniare congruențiale folosesc numere prime.
- **Calcul paralel** – versiunile segmentate ale ciurului sunt folosite în calcul distribuit pentru a găsi prime extrem de mari.

## Observații din implementare

- Folosește cel puțin o buclă for în implementare.

## Resurse

- [Wikipedia – Ciurul lui Eratostene](https://ro.wikipedia.org/wiki/Ciurul_lui_Eratostene)
- [GeeksForGeeks – Sieve of Eratosthenes](https://www.geeksforgeeks.org/sieve-of-eratosthenes/)
- [Khan Academy – Sieve of Eratosthenes](https://www.khanacademy.org/computing/computer-science/cryptography/comp-number-theory/v/sieve-of-eratosthenes-prime-adventure-part-4)
