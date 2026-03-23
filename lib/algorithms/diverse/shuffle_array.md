<!-- custom-doc -->

# 🚀 **Amestecarea unui Tablou (Fisher-Yates Shuffle)**

## 📝 **Descriere**

**Algoritmul Fisher-Yates** (cunoscut și sub numele de Knuth Shuffle) este metoda optimă și standard pentru a genera o permutare aleatorie a unui tablou finit. Spre deosebire de metodele naive, acest algoritm garantează că fiecare permutare posibilă are o probabilitate egală de a apărea ($1/n!$), rezultând o amestecare perfect uniformă și imparțială.

## 🖼️ **Reprezentare Vizuală**

![Fisher-Yates Shuffle](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Fisher-Yates_shuffle.svg/400px-Fisher-Yates_shuffle.svg.png)

```text
Tablou inițial: [A, B, C, D, E] (n=5)

1. Alege i=4, index aleator j ∈ [0..4]. Swap(4, j).
2. Alege i=3, index aleator j ∈ [0..3]. Swap(3, j).
3. Alege i=2, index aleator j ∈ [0..2]. Swap(2, j).
4. Alege i=1, index aleator j ∈ [0..1]. Swap(1, j).

Rezultat: Tablou amestecat uniform! 🎲
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Imparțialitate:** Produce o amestecare statistic perfectă (unbiased). | ⚠️ **Sursă de Hazard:** Calitatea depinde critic de generatorul de numere aleatorii (PRNG). |
| 📊 **Eficiență Spațială:** Se realizează "in-place", folosind memorie suplimentară minimă. | 📉 **Implementare Naivă:** Mulți dezvoltatori implementează greșit varianta $O(n^2)$. |
| 🛠️ **Performanță:** Timp de execuție liniar, indiferent de dimensiunea datelor. | 🧩 **Determinism:** Necesită un "seed" bun pentru a fi cu adevărat imprevizibil. |

## 🔢 **Analiză Matematică și Complexitate**

Algoritmul parcurge tabloul o singură dată, efectuând $n-1$ schimburi (swaps).

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(n)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Jocuri de Noroc:** Amestecarea pachetelor de cărți în cazinouri online și jocuri video.
- **Streaming Muzical:** Generarea listelor de redare "Shuffle" (ex: Spotify, Apple Music).
- **Știința Datelor:** Randomizarea seturilor de date pentru antrenarea modelelor de Machine Learning.
- **Securitate:** Generarea de parole sau chei criptografice bazate pe permutări.
