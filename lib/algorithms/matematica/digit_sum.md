# Suma Cifrelor

Slug: matematica_digit_sum
Categorie: Matematică

## Introducere

Suma cifrelor unui număr natural este una dintre cele mai simple operații din teoria numerelor. Ea constă în adunarea tuturor cifrelor care compun reprezentarea zecimală a unui număr. De exemplu, pentru numărul 1234, suma cifrelor este 1+2+3+4=10.

Această operație are aplicații practice în regulile de divizibilitate: un număr este divizibil cu 9 dacă și numai dacă suma cifrelor sale este divizibilă cu 9. Similar, un număr este divizibil cu 3 dacă suma cifrelor este divizibilă cu 3.

Noțiunea de **rădăcină digitală** este strâns legată: se aplică suma cifrelor în mod repetat până se obține o singură cifră. De exemplu: 9875 → 9+8+7+5=29 → 2+9=11 → 1+1=2.

## Descriere

Algoritmul extrage pe rând ultima cifră a numărului folosind operatorul modulo (%) și o adaugă la suma totală, apoi împarte numărul la 10 pentru a elimina ultima cifră. Procesul se repetă cât timp numărul este mai mare ca zero.

**Definiție matematică:**
Dacă n = dₖdₖ₋₁...d₁d₀ în baza 10, atunci suma cifrelor S(n) = d₀ + d₁ + ... + dₖ.

**Pașii algoritmului:**
1. Inițializează suma cu 0.
2. Cât timp n > 0:
   a. Extrage ultima cifră: cifra = n % 10
   b. Adaugă cifra la sumă: suma = suma + cifra
   c. Elimină ultima cifră: n = floor(n / 10)
3. Returnează suma.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| General | O(log n) | O(1) |

**Explicație:** Numărul de iterații este egal cu numărul de cifre ale lui n, care este floor(log₁₀(n)) + 1, deci complexitatea de timp este O(log n). Se folosește spațiu constant O(1).

## Pseudocod

```
funcție sumacifrelor(n):
    suma ← 0
    cât timp n > 0:
        suma ← suma + (n % 10)
        n ← floor(n / 10)
    returnează suma
```

## Exemple

- sumacifrelor(123) = 1 + 2 + 3 = **6**
- sumacifrelor(9875) = 9 + 8 + 7 + 5 = **29**
- sumacifrelor(0) = **0**
- sumacifrelor(999) = 9 + 9 + 9 = **27** (divizibil cu 9 → 999 este divizibil cu 9 ✓)

## Aplicații

- Verificarea regulilor de divizibilitate cu 3 și 9
- Calculul rădăcinii digitale a unui număr
- Detectarea erorilor în coduri numerice (ISBN, coduri bare)
- Numerologie și criptografie simplă
- Validarea numerelor de identificare (CNP, IBAN)

## Resurse

- [Wikipedia - Digit sum](https://en.wikipedia.org/wiki/Digit_sum)
- [GeeksForGeeks - Program for Sum of the digits of a given number](https://www.geeksforgeeks.org/program-for-sum-of-the-digits-of-a-given-number/)
