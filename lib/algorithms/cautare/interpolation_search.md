<!-- custom-doc -->

# 🚀 **Căutarea prin Interpolare (Interpolation Search)**

## 📝 **Descriere**

**Căutarea prin Interpolare** este o variantă optimizată a căutării binare pentru tablouri **sortate** în care valorile sunt **distribuite uniform**. În loc să verifice mereu mijlocul, algoritmul estimează poziția probabilă a elementului folosind o formulă similară cu modul în care căutăm un nume într-o carte de telefon (dacă numele începe cu "B", căutăm aproape de început).

## 🖼️ **Reprezentare Vizuală**

![Interpolation Search Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Interpolation_Search_Algorithm.png/400px-Interpolation_Search_Algorithm.png)

```text
Țintă: 90
[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
Binară: Verifică mereu 50 (Mijloc)
Interpolare: Estimează că 90 este aproape de 100.
-> Verifică direct indexul 8! (Val: 90)
Găsit dintr-un singur pas!
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Ultra-Rapid:** Timp de execuție mediu de $O(\log \log n)$ pe date uniform distribuite. | ⚠️ **Sensibilitate:** Performanță foarte proastă ($O(n)$) dacă datele nu sunt uniforme. |
| 📊 **Eficient:** Mult mai rapid decât căutarea binară pentru seturi de date masive și ordonate. | 📉 **Complexitate:** Formula necesită calcule suplimentare (înmulțiri și împărțiri). |

## 🔢 **Analiză Matematică și Complexitate**

Formula de calcul pentru indexul estimat ($pos$):
$$pos = low + \left[ \frac{(target - arr[low]) \cdot (high - low)}{arr[high] - arr[low]} \right]$$

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Average Case)** | $O(\log \log n)$ |
| **Timp (Worst Case)** | $O(n)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Baze de date indexate:** Unde cheile (ex: ID-uri numerice) sunt generate secvențial sau uniform.
- **Sisteme de fișiere mari:** Localizarea record-urilor într-un fișier sortat de dimensiuni gigantice.
- **Biblioteci digitale:** Când distribuția cuvintelor sau a codurilor este previzibilă matematic.
