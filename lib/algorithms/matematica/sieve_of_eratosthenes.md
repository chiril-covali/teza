<!-- custom-doc -->
# 🚀 **Sita lui Eratostene (Sieve of Eratosthenes)**

## 📝 **Descriere**
**Sita lui Eratostene** este unul dintre cei mai vechi și eficienți algoritmi pentru a găsi toate **numerele prime** până la o anumită limită $n$. Acesta funcționează prin eliminarea succesivă a multiplilor fiecărui număr prim găsit, începând cu 2.

## 🖼️ **Reprezentare Vizuală**
![Sieve Animation](https://upload.wikimedia.org/wikipedia/commons/b/b9/Sieve_of_Eratosthenes_animation.gif)

**Diagramă ASCII (Proces):**
```text
n = 10
[2, 3, 4, 5, 6, 7, 8, 9, 10]
1. Elimina multipli lui 2: [2, 3, 5, 7, 9]
2. Elimina multipli lui 3: [2, 3, 5, 7]
Rezultat: {2, 3, 5, 7}
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Eficiență Maximă:** Cel mai rapid mod de a găsi toate primele într-un interval mare. | ⚠️ **Memorie:** Necesită un tablou de dimensiune $n$ pentru a marca numerele. |
| 📊 **Simplitate:** Ușor de înțeles și evită operațiile costisitoare de împărțire. | 📉 **Limitare:** Ineficient pentru a verifica dacă un singur număr foarte mare este prim. |

## 🔢 **Analiză Matematică și Complexitate**
Algoritmul se bazează pe eliminarea multiplilor lui $p$ începând de la $p^2$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(n \log \log n)$ |
| **Spațiu (Space)** | $O(n)$ |

## 💡 **Aplicații Practice**
- **Criptografie:** Generarea numerelor prime necesare pentru algoritmii de tip RSA.
- **Teoria Numerelor:** Studiul distribuției numerelor prime.
- **Competiții de Programare:** Rezolvarea problemelor care implică proprietăți ale numerelor prime.
