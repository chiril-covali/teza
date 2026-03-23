<!-- custom-doc -->
# Primes

Numerele prime sunt numere naturale mai mari decât 1 care nu au alți divizori în afară de 1 și ele însele. Cu alte cuvinte, un număr prim este un număr care nu poate fi exprimat ca produsul a două numere naturale mai mici. Primele câteva numere prime sunt 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, etc.

## Reprezentare Vizuală

Un exemplu simplu de identificare a numerelor prime este metoda „Sieve of Eratosthenes” (Situația lui Eratostene). Această metodă marchează numerele compuse prin eliminarea multiplii numerelor prime.

```
Numere:  1  2  3  4  5  6  7  8  9  10
         -----------------------------
Marcat:  X  P  P  X  P  X  P  X  X  X
```

Pas cu pas:
1. Începem cu o listă de numere de la 2 la n.
2. Luăm primul număr (2) și marcăm toți multiplii săi.
3. Continuăm cu următorul număr ne-marcat (3) și repetăm procesul.
4. Continuăm până când am trecut prin toate numerele.

## Matematică / Logică

Numerele prime sunt fundamentale în teoria numerelor, iar proprietățile lor sunt studiate în profunzime. O formulă importantă în contextul numerelor prime este Teorema lui Dirichlet, care afirmă că există infinit de multe numere prime în orice progresie aritmetică a formei $a + nd$, unde $a$ și $d$ sunt întregi coprimi.

## Tabel de Complextitate

| Caz               | Complexitate Timp | Complexitate Spațiu |
|-------------------|-------------------|---------------------|
| Cel mai bun       | $O(n \log \log n)$| $O(n)$              |
| Mediu             | $O(n \log \log n)$| $O(n)$              |
| Cel mai rău      | $O(n \log \log n)$| $O(n)$              |

## Avantaje și Dezavantaje

**Avantaje:**
- Numerele prime sunt esențiale în criptografie, în special în algoritmi de criptare precum RSA.
- Ele ajută la optimizarea algoritmilor de căutare și sortare.
- Oferă o bază solidă pentru teoria numerelor și studiul structurilor matematice.

**Dezavantaje:**
- Identificarea numerelor prime mari poate fi computațional costisitoare.
- Există multe conjecturi nerezolvate în legătură cu distribuția numerelor prime, ceea ce complică studiul lor.

## Aplicații Practice

Numerele prime sunt utilizate pe scară largă în criptografie, în special în algoritmi de criptare simetrică și asimetrică. De asemenea, ele sunt folosite în generarea de numere aleatoare, în algoritmi de hashing și în diverse aplicații de securitate informatică. În plus, numerele prime au aplicații în teoria grafurilor și în analiza datelor.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*