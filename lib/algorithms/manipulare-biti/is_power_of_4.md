<!-- custom-doc -->
# 🧠 Verificare Putere a lui 4

## 📝 Descriere
Verificarea dacă un număr este o putere a lui 4 este o problemă comună în manipularea biților. O putere a lui 4 poate fi exprimată sub forma $4^n$, unde $n$ este un număr întreg nenegativ. Această verificare poate fi realizată eficient prin manipularea biților, având în vedere că numerele care sunt puteri ale lui 4 au o reprezentare binară specifică.

## 🖼️ Reprezentare Vizuală
![Putere a lui 4](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Power_of_four.svg/1200px-Power_of_four.svg.png)

```
          1
         / \
        4   16
       / \   \
      16  64  256
```

## ⚖️ Avantaje și Dezavantaje

| Avantaj                                    | Dezavantaj                                  |
|--------------------------------------------|---------------------------------------------|
| Eficiență ridicată în verificarea rapidă   | Nu funcționează pentru numere negative     |
| Utilizare simplă a operațiilor pe biți     | Limitat la numere întregi                   |
| Consum redus de resurse                    | Necesită cunoștințe de bază în manipularea biților |

## 🔢 Analiză Matematică și Complexitate

| Metrică               | Valoare                       |
|-----------------------|-------------------------------|
| Complexitate temporală | $O(1)$                        |
| Complexitate spațială  | $O(1)$                        |

Pentru a determina dacă un număr $n$ este o putere a lui 4, se poate utiliza următoarea formulă:

$$
\text{Dacă } n > 0 \text{ și } (n \& (n - 1)) = 0 \text{ și } (n \% 3 = 1) \text{ atunci } n \text{ este o putere a lui 4.}
$$

## 💡 Aplicații Practice
Verificarea puterii lui 4 este utilizată în diverse aplicații, cum ar fi:
- Algoritmi de optimizare în jocuri video.
- Procesarea imaginilor, unde dimensiunile matricei trebuie să fie puteri ale lui 4 pentru a îmbunătăți performanța.
- În structuri de date, cum ar fi arborii de căutare, unde echilibrul este esențial.