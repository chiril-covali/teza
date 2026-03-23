<!-- custom-doc -->
# Verificare Odd

Verificarea dacă un număr este impar (odd) este o operație fundamentală în matematică și informatică. Un număr întreg este considerat impar dacă nu este divizibil cu 2, adică există un rest de 1 atunci când este împărțit la 2. Această verificare este esențială în diverse aplicații, de la algoritmi simpli la structuri de date complexe.

## Reprezentare Vizuală

Pentru a verifica dacă un număr $n$ este impar, se poate utiliza următoarea logică:

```
n % 2 == 1
```

### Exemplu Pas cu Pas

Să considerăm numărul $7$:

1. Se calculează $7 \mod 2$.
2. Rezultatul este $1$.
3. Deoarece restul este $1$, concluzionăm că $7$ este un număr impar.

```
Număr: 7
  |
  +-- 7 % 2 = 1 (impar)
```

## Matematică / Logică

Logica de verificare a parității unui număr poate fi exprimată matematic prin:

$$
n \text{ este impar} \iff n \mod 2 = 1
$$

## Tabel de Complextitate

| Caz           | Complexitate Timp | Complexitate Spațiu |
|---------------|-------------------|---------------------|
| Cel mai bun   | $O(1)$            | $O(1)$              |
| Mediu         | $O(1)$            | $O(1)$              |
| Cel mai rău   | $O(1)$            | $O(1)$              |

## Avantaje și Dezavantaje

### Avantaje
- Simplu de implementat.
- Eficiență ridicată (complexitate constantă).
- Utilizare frecventă în algoritmi și structuri de date.

### Dezavantaje
- Limitat la verificarea parității (nu oferă informații suplimentare despre număr).
- Nu se aplică direct pentru numere reale sau fracționare.

## Aplicații Practice

- Determinarea parității în algoritmi de sortare.
- Utilizarea în jocuri pentru a decide cine începe primul.
- Implementarea de funcții de hash care depind de paritate.
- Filtrarea datelor în baze de date sau structuri de date.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*