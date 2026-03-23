<!-- custom-doc -->

# 🚀 **Factorial Dublu (Double Factorial)**

## 📝 **Descriere**

**Factorialul Dublu** al unui număr întreg pozitiv $n$, notat cu $n!!$, este produsul tuturor numerelor întregi de la 1 (sau 2) până la $n$ care au aceeași paritate cu $n$. Atenție: $n!!$ **nu** este același lucru cu $(n!)!$. Dacă $n$ este par, rezultatul este produsul numerelor pare; dacă este impar, rezultatul este produsul numerelor impare.

## 🖼️ **Reprezentare Vizuală**

![Factorial Comparison](https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Comparison_of_factorial_functions.svg/400px-Comparison_of_factorial_functions.svg.png)

```text
8!! = 8 * 6 * 4 * 2 = 384
7!! = 7 * 5 * 3 * 1 = 105

Diferență:
5!   = 5 * 4 * 3 * 2 * 1 = 120
5!!  = 5 * 3 * 1         = 15
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Eficiență:** Crește mult mai lent decât factorialul simplu, permițând calcule pe numere mai mari. | ⚠️ **Confuzie:** Notația este adesea confundată cu factorialul iterat (dublu factorial). |
| 📊 **Utilitate:** Esențial în formulele trigonometrice și de integrare. | 📉 **Implementare:** Necesită tratarea separată a cazurilor de paritate. |

## 🔢 **Analiză Matematică și Complexitate**

Definiția recursivă:
$n!! = n \cdot (n-2)!!$ cu $0!! = 1$ și $1!! = 1$.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(n/2) \approx O(n)$ |
| **Spațiu (Space)** | $O(1)$ |

## 💡 **Aplicații Practice**

- **Fizică Cuantică:** Apare în integralele de tip Gaussian și mecanica undelor.
- **Teoria Probabilităților:** Calcularea momentelor distribuției normale.
- **Geometrie:** Calcularea volumului unei n-sfere (hipersferă).
