<!-- custom-doc -->

# 🚀 **Sita lui Eratostene (Sieve of Eratosthenes)**

## 📝 **Descriere**

**Sita lui Eratostene** este unul dintre cei mai vechi și eficienți algoritmi pentru a găsi toate **numerele prime** până la o anumită limită $n$. Acesta funcționează prin eliminarea succesivă a multiplilor fiecărui număr prim găsit, începând cu 2. Este algoritmul de referință pentru generarea tabelelor de numere prime.

## 🖼️ **Reprezentare Vizuală**

![Sieve Animation](https://upload.wikimedia.org/wikipedia/commons/b/b9/Sieve_of_Eratosthenes_animation.gif)

```text
Exemplu pentru n = 10:
[2, 3, 4, 5, 6, 7, 8, 9, 10]

1. Elimină multiplii lui 2 (mai mari decât 2): [2, 3, 5, 7, 9]
2. Elimină multiplii lui 3 (mai mari decât 3): [2, 3, 5, 7]

Rezultat final: {2, 3, 5, 7}
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| ✅ **Eficiență Maximă:** Cel mai rapid mod de a găsi toate primele într-un interval mare. | ⚠️ **Consum de Memorie:** Necesită un tablou de dimensiune $n$ pentru a marca numerele. |
| ✅ **Simplitate:** Ușor de înțeles și evită operațiile costisitoare de împărțire. | ❌ **Limită de Scalare:** Devine problematic pentru limite $n$ care depășesc memoria RAM disponibilă. |

## 🔢 **Analiză Matematică și Complexitate**

Algoritmul elimină multiplii lui $p$ începând de la $p^2$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(n \log \log n)$ |
| **Spațiu (Space)** | $O(n)$ |

## 💡 **Aplicații Practice**

- **Criptografie:** Pre-generarea listelor de numere prime pentru algoritmi de tip RSA.
- **Teoria Numerelor:** Studiul distribuției și densității numerelor prime în intervale mari.
- **Competiții de Programare:** Rezolvarea rapidă a problemelor de divizibilitate.
- **Securitate:** Generarea de parametri pentru protocoale de schimb de chei (Diffie-Hellman).
