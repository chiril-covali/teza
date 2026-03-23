<!-- custom-doc -->
# 🚀 **Distanța Hamming (Hamming Distance)**

## 📝 **Descriere**
**Distanța Hamming** măsoară numărul de poziții în care caracterele (sau biții) corespunzătoare a două șiruri de lungime egală sunt diferite. În context binar, reprezintă numărul de biți care trebuie inversați pentru a transforma un număr în celălalt. Este o măsură fundamentală pentru detectarea erorilor în transmisiile de date.

## 🖼️ **Reprezentare Vizuală**
![Hamming Distance](https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Hamming_distance_3_bit_binary_cube.svg/300px-Hamming_distance_3_bit_binary_cube.svg.png)

**Diagramă ASCII (Exemplu):**
```text
Șir 1: 1 0 1 1 1 0 1
Șir 2: 1 0 0 1 0 0 1
       ^ ^ X ^ X ^ ^
           |   |
Diferențe găsite la index 2 și 4.
Distanța Hamming = 2.
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Viteză:** Calculul este extrem de rapid, implicând adesea o singură operație XOR urmată de numărarea biților setați. | ⚠️ **Restricție:** Funcționează **doar** pentru șiruri de lungimi egale. |
| 📊 **Fiabilitate:** Standardul de aur în codurile de corecție a erorilor (ECC). | 📉 **Limitare:** Nu ia în calcul inserările sau ștergerile (pentru asta se folosește Distanța Levenshtein). |

## 🔢 **Analiză Matematică și Complexitate**
Pentru două numere $a$ și $b$, distanța este numărul de biți setați în $a \oplus b$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(n)$ (unde $n$ este nr. de biți/caractere) |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**
- **Telecomunicații:** Detectarea și corectarea erorilor în semnalele digitale.
- **Bioinformatică:** Compararea secvențelor genetice de lungime fixă pentru a identifica mutații punctuale.
- **Criptografie:** Măsurarea "efectului de avalanșă" în funcțiile hash.
