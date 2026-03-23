<!-- custom-doc -->
# 🚀 **Adunare Binară (Binary Addition)**

## 📝 **Descriere**
**Adunarea Binară** este operația fundamentală prin care se calculează suma a două numere reprezentate în baza 2. Procesul este identic cu adunarea în baza 10, dar regulile sunt mai simple: $0+0=0$, $0+1=1$, $1+0=1$ și $1+1=10$ (adică $0$ cu transport/carry $1$). Algoritmul poate fi implementat eficient la nivel de biți folosind operatorii XOR și AND.

## 🖼️ **Reprezentare Vizuală**
![Binary Addition](https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Binary_addition.svg/300px-Binary_addition.svg.png)

**Diagramă ASCII (Exemplu):**
```text
   Carry:  1 1 0 0
   Num 1:    1 0 1 1  (11)
   Num 2:  + 0 1 1 0  (6)
   ------------------
   Suma :    1 0 0 0 1  (17)
```

## ⚖️ **Avantaje și Dezavantaje**
| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Viteză Hardware:** Este cea mai rapidă operație executată de procesor (ALU). | ⚠️ **Complexitate pentru oameni:** Mai greu de citit și verificat manual decât baza 10. |
| 📊 **Implementare Bitwise:** Permite adunarea numerelor folosind doar logică digitală, fără operatori aritmetici. | 📉 **Gestiunea Carry:** Necesită atenție suplimentară pentru transportul biților la numere foarte lungi. |

## 🔢 **Analiză Matematică și Complexitate**
Logica bitwise:
- Suma fără carry: $a \oplus b$
- Carry: $(a \text{ AND } b) \ll 1$

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(n)$ (unde $n$ este nr. de biți) |
| **Spațiu (Space)** | $O(n)$ (pentru stocarea rezultatului) |

## 💡 **Aplicații Practice**
- **Arhitectura Calculatoarelor:** Unitatea Aritmetico-Logică (ALU) din inima procesorului.
- **Criptografie:** Componentă de bază în manipularea fluxurilor de date securizate.
- **Optimizări:** Calcularea sumelor în sisteme cu resurse extrem de limitate.
