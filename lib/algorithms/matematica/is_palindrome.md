<!-- custom-doc -->

# 🚀 **Verificare Palindrom**

## 📝 **Descriere**

Un **palindrom** este un număr sau un șir de caractere care se citește la fel de la stânga la dreapta și de la dreapta la stânga (ex: 121, 44, "radar"). În cazul numerelor, algoritmul verifică dacă numărul original este egal cu inversul său, fără a converti neapărat numărul într-un șir de caractere (pentru eficiență).

## 🖼️ **Reprezentare Vizuală**

![Palindrome Concept](/docs-images/matematica/is_palindrome.svg)
<!-- external-visual -->
![Resursă vizuală externă (matematica)](https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg)


```text
Original: 12321

1. Extrage cifrele: 1, 2, 3, 2, 1
2. Reconstruiește invers: (((1*10+2)*10+3)*10+2)*10+1 = 12321
3. Compară: 12321 == 12321 ✅

Rezultat: Este palindrom.
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Eficiență:** Se poate verifica în timp logaritmic raportat la mărimea numărului. | ⚠️ **Overflow:** Inversul unui număr mare poate depăși limita tipului de date (ex: 32-bit int). |
| 📊 **Fără conversie de tip:** Operarea directă pe numere economisește memorie. | 📉 **Simetrie:** Ignoră semnele (numerele negative nu sunt de obicei considerate palindromuri). |

## 🔢 **Analiză Matematică și Complexitate**

Algoritmul parcurge fiecare cifră o singură dată.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(\log_{10} n)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Teoria Numerelor:** Studiul numerelor cu proprietăți simetrice (ex: primele palindromice).
- **Prelucrarea Textului:** Verificarea simetriei în șiruri de caractere sau secvențe ADN.
- **Logica de Interfață:** Validarea datelor introduse de utilizatori în jocuri de cuvinte.
