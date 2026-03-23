<!-- custom-doc -->

# 🚀 **Set bazat pe Tabelă Hash (Hash Map Set)**

## 📝 **Descriere**

Un **Set bazat pe Tabelă Hash** (sau simplu, `HashSet`) este o structură de date care stochează elemente unice, fără o ordine garantată. Aceasta folosește o funcție de **dispersie** (hash function) pentru a mapa elementele într-o tabelă internă, permițând accesul extrem de rapid la date. Dacă se dorește adăugarea unui element care există deja, operația este pur și simplu ignorată, garantând astfel unicitatea.

## 🖼️ **Reprezentare Vizuală**

![Hash Table Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Hash_table_3_1_1_0_1_0_0_SP.svg/400px-Hash_table_3_1_1_0_1_0_0_SP.svg.png)

```text
Cheie (x) -> h(x) -> Index în Tabelă
------------------------------------
"mere"    -> hash(4) -> [mere, valoare]
"pere"    -> hash(7) -> [pere, valoare]
"prune"   -> hash(4) -> Coliziune! (Se rezolvă prin înlănțuire)
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Viteză:** Căutarea, inserarea și ștergerea sunt extrem de rapide (în medie). | ⚠️ **Lipsa Ordinii:** Elementele nu sunt stocate în ordinea inserării sau a valorii. |
| 📊 **Unicitate:** Garantează automat că setul nu conține duplicate. | 📉 **Memorie:** Poate consuma mai mult spațiu decât un vector pentru a evita coliziunile. |

## 🔢 **Analiză Matematică și Complexitate**

Performanța depinde de calitatea funcției de hash și de factorul de încărcare al tabelei.

| Tip Complexitate | Valoare Medie | Cel mai rău caz |
| :--- | :--- | :--- |
| **Inserare (Add)** | $O(1)$ | $O(n)$ |
| **Ștergere (Remove)** | $O(1)$ | $O(n)$ |
| **Căutare (Has)** | $O(1)$ | $O(n)$ |
| **Spațiu (Space)** | $O(n)$ | $O(n)$ |

## 💡 **Aplicații Practice**

- **Eliminarea duplicatelor:** Modul cel mai eficient de a filtra elementele unice dintr-o listă mare.
- **Verificarea apartenenței:** Rapidă în algoritmi care necesită verificări frecvente (ex: jocuri, dicționare).
- **Intersecții de seturi:** Compararea rapidă a două colecții mari de date.
