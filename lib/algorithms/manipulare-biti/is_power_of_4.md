<!-- custom-doc -->

# 🚀 **Verificare Putere a lui 4 (Is Power of 4)**

## 📝 **Descriere**

Verificarea dacă un număr întreg $n$ este o putere a lui 4 ($4^0, 4^1, 4^2 \dots$) implică verificarea a trei condiții esențiale: numărul trebuie să fie mai mare decât zero, trebuie să fie o putere a lui 2 (un singur bit de 1) și bitul setat trebuie să se afle pe o poziție pară (0, 2, 4, etc.). Această verificare se poate face extrem de eficient prin operații bitwise sau prin restul împărțirii la 3.

## 🖼️ **Reprezentare Vizuală**

![Power of 4 Binary](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Power_of_two_binary.svg/300px-Power_of_two_binary.svg.png)

```text
n = 16 (4^2)
Binar: 0001 0000
Index: 7654 3210
Bitul 1 este la indexul 4 (par) -> OK!

n = 8 (2^3)
Binar: 0000 1000
Index: 7654 3210
Bitul 1 este la indexul 3 (impar) -> Nu este putere de 4!
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Performanță maximă:** Se execută în timp constant $O(1)$ folosind biți. | ⚠️ **Complexitate conceptuală:** Necesită înțelegerea modului de reprezentare a numerelor în binar. |
| 📊 **Fără bucle:** Evită utilizarea logaritmilor sau a împărțirilor repetate. | 📉 **Specificitate:** Rezolvă doar cazul bazei 4. |

## 🔢 **Analiză Matematică și Complexitate**

Condiția optimă: `(n > 0) && (n & (n - 1) == 0) && (n % 3 == 1)`.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(1)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Grafică pe Calculator:** Lucrul cu structuri de date de tip Quadtree.
- **Optimizarea Memoriei:** Alocarea resurselor în sisteme care utilizează blocuri de dimensiune $4^n$.
- **Procesarea Imaginilor:** Algoritmi de scalare și compresie care se bazează pe subdiviziuni pătratice.
- **Teoria Numerelor:** Proprietăți specifice resturilor puterilor în diferite baze.
