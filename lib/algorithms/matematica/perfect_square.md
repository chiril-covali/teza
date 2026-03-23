<!-- custom-doc -->
# Perfect Square

Un număr perfect pătrat este un număr întreg care poate fi exprimat ca pătratul unui alt număr întreg. De exemplu, numerele 0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 sunt toate numere perfecte pătrate, deoarece ele pot fi scrise ca $0^2$, $1^2$, $2^2$, $3^2$, $4^2$, $5^2$, $6^2$, $7^2$, $8^2$, $9^2$, respectiv $10^2$.

## Reprezentare Vizuală

Reprezentarea unui număr perfect pătrat poate fi realizată printr-o diagramă simplă:

```
Numere perfecte pătrate:
0:  0
1:  1
2:  4
3:  9
4:  16
5:  25
6:  36
7:  49
8:  64
9:  81
10: 100
```

Exemplu pas cu pas pentru a verifica dacă 25 este un număr perfect pătrat:

1. Calculăm rădăcina pătrată: $\sqrt{25} = 5$.
2. Verificăm dacă $5^2 = 25$.
3. Constatăm că 25 este un număr perfect pătrat.

## Matematică / Logică

Un număr $n$ este un număr perfect pătrat dacă există un număr întreg $k$ astfel încât:

$$ n = k^2 $$

Pentru a determina dacă un număr este perfect pătrat, se poate utiliza metoda de verificare a rădăcinii pătrate, având în vedere că:

$$ k = \sqrt{n} $$

Dacă $k$ este un număr întreg, atunci $n$ este un perfect square.

## Tabel de Complextitate

| Caz                | Complexitate Timp | Complexitate Spațiu |
|--------------------|-------------------|---------------------|
| Cel mai bun        | $O(1)$            | $O(1)$              |
| Caz mediu          | $O(\sqrt{n})$     | $O(1)$              |
| Cel mai rău       | $O(\sqrt{n})$     | $O(1)$              |

## Avantaje și Dezavantaje

**Avantaje:**
- Ușor de calculat și verificat.
- Utilizat în diverse aplicații matematice și algoritmice.
- Permite optimizări în anumite probleme de programare.

**Dezavantaje:**
- Limitat la numere întregi.
- Poate necesita verificări suplimentare în cazul numerelor mari.

## Aplicații Practice

Numerele perfecte pătrate au aplicații în diverse domenii, cum ar fi:

- **Geometrie**: Calcularea ariilor pătratelor.
- **Criptografie**: Algoritmi care se bazează pe proprietățile numerelor întregi.
- **Teoria numerelor**: Studiul proprietăților numerelor întregi și al relațiilor dintre ele.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*