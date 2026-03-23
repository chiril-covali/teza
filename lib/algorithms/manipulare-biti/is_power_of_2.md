<!-- custom-doc -->

# 🚀 **Verificare Putere a lui 2 (Is Power of 2)**

## 📝 **Descriere**

Verificarea dacă un număr $n$ este o putere a lui 2 ($2^0, 2^1, 2^2 \dots$) se poate face instantaneu folosind o proprietate elegantă a sistemului binar. În format binar, orice putere a lui 2 are exact un singur bit setat pe $1$ (ex: $8 = 1000_2$), iar numărul precedent ($n-1$) are toți biții de după acea poziție setați pe $1$ (ex: $7 = 0111_2$).

## 🖼️ **Reprezentare Vizuală**

![Binary Powers Table](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Power_of_two_binary.svg/300px-Power_of_two_binary.svg.png)

```text
n = 8  (1000)
n-1 = 7 (0111)
--------------
n & (n-1) = 0000

Dacă rezultatul este 0, n este putere a lui 2!
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Viteză Constantă:** Se rezolvă într-o singură operație CPU ($O(1)$). | ⚠️ **Cazul zero:** Necesită tratare specială pentru $n=0$ (care nu e putere a lui 2). |
| 📊 **Eficiență:** Nu necesită bucle, logaritmi sau împărțiri repetate. | 📉 **Specificitate:** Funcționează strict pentru puteri ale bazei 2. |

## 🔢 **Analiză Matematică și Complexitate**

Condiția logică: `(n > 0) && ((n & (n - 1)) == 0)`.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(1)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Alocarea Memoriei:** Multe sisteme alocă memorie în blocuri de dimensiuni puteri ale lui 2 (Buddy allocation).
- **Grafică pe Calculator:** Verificarea texturilor (Power-of-two textures) pentru compatibilitate cu GPU-uri vechi.
- **Algoritmi de tip FFT:** Fast Fourier Transform necesită adesea ca dimensiunea intrării să fie o putere a lui 2.
