<!-- custom-doc -->
# Number de Digits

Numărul de cifre (Number of Digits) se referă la determinarea cantității de cifre care compun un număr întreg. Această problemă este frecvent întâlnită în matematică și informatică, având aplicații în diverse algoritmi și structuri de date.

## Reprezentare Vizuală

Pentru a determina numărul de cifre ale unui număr întreg $n$, putem utiliza o abordare simplă. De exemplu, considerăm numărul $n = 12345$. 

```
n = 12345
Cifre: 1 2 3 4 5
Numărul de cifre: 5
```

Un alt mod de a vizualiza acest proces este printr-o diagramă de tip arbore:

```
n
├── 1
├── 2
├── 3
├── 4
└── 5
```

## Matematică / Logică

Numărul de cifre al unui număr întreg $n$ poate fi determinat folosind logaritmi. Formula generală este:

$$
d(n) = \lfloor \log_{10}(n) \rfloor + 1
$$

unde $d(n)$ reprezintă numărul de cifre al lui $n$ și $\lfloor x \rfloor$ este funcția parte întreagă.

## Tabel de Complextitate

| Caz               | Complexitate Timp | Complexitate Spațiu |
|-------------------|-------------------|---------------------|
| Cel mai bun       | $O(1)$            | $O(1)$              |
| Mediu             | $O(1)$            | $O(1)$              |
| Cel mai rău      | $O(1)$            | $O(1)$              |

## Avantaje și Dezavantaje

### Avantaje
- Simplu de implementat.
- Eficient din punct de vedere al timpului și spațiului.
- Utilizabil în diverse aplicații matematice.

### Dezavantaje
- Funcționează doar pentru numere întregi pozitive.
- Nu se aplică direct pentru numere în formă de string.

## Aplicații Practice

Algoritmul de determinare a numărului de cifre este utilizat în:
- Validarea datelor de intrare în aplicații (ex: numere de telefon, coduri poștale).
- Calculul dimensiunii necesare pentru stocarea numerelor în baze de date.
- Analiza complexității algoritmilor care manipulează numere întregi.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*