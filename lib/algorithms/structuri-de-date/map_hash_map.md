<!-- custom-doc -->

# 🚀 **Tabelă Hash (Hash Map)**

## 📝 **Descriere**

O **Tabelă Hash** (sau Hash Map) este o structură de date care implementează un tablou asociativ, o structură care corelează **chei** cu **valori**. Folosește o **funcție de hash** pentru a transforma cheia într-un index într-un tablou de "bucket-uri" sau "slot-uri", de unde valoarea dorită poate fi găsită rapid. Este una dintre cele mai eficiente structuri pentru căutări și inserări.

## 🖼️ **Reprezentare Vizuală**

![Hash Map Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Hash_table_3_1_1_0_1_0_0_SP.svg/400px-Hash_table_3_1_1_0_1_0_0_SP.svg.png)

```text
Cheie (Key) ----> [ Funcție Hash ] ----> Index [0...N] ----> Valoare (Value)

Exemplu:
"Nume"   ----> Hash("Nume") % 10 = 4 ----> Index 4: "Ion"
"Vârstă" ----> Hash("Vârstă") % 10 = 7 ----> Index 7: 25
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Viteză Uimitoare:** Timp mediu de acces constant $O(1)$ pentru toate operațiile de bază. | ⚠️ **Coliziuni:** Mai multe chei pot genera același index, necesitând mecanisme de rezolvare. |
| 📊 **Versatilitate:** Permite utilizarea oricărui tip de date ca și cheie (șiruri, obiecte). | 📉 **Consum Memorie:** Necesită un spațiu mai mare decât datele stocate pentru a minimiza coliziunile. |

## 🔢 **Analiză Matematică și Complexitate**

Performanța depinde de uniformitatea funcției de hash și de "Load Factor" ($\lambda = n/m$).

| Tip Complexitate | Caz Mediu | Caz Defavorabil |
| :--- | :--- | :--- |
| **Căutare** | $O(1)$ | $O(n)$ |
| **Inserare** | $O(1)$ | $O(n)$ |
| **Ștergere** | $O(1)$ | $O(n)$ |
| **Spațiu (Space)** | $O(n)$ | $O(n)$ |

## 💡 **Aplicații Practice**

- **Baze de Date:** Indexarea rapidă a înregistrărilor.
- **Caching:** Stocarea temporară a rezultatelor costisitoare (ex. Redis).
- **Compilatoare:** Tabele de simboluri pentru identificatori și variabile.
- **Securitate:** Verificarea integrității datelor prin funcții hash.
