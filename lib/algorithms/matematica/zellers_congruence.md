<!-- custom-doc -->
# Zellers Congruence

Zellers Congruence este un algoritm matematic utilizat pentru a determina ziua săptămânii pentru o dată dată în formatul zi, lună, an. Algoritmul este eficient și simplu, bazându-se pe o formulă care implică operații aritmetice și modulo.

## Reprezentare Vizuală

Formula Zeller este dată de:

$$
h = \left(q + \left\lfloor \frac{13(m + 1)}{5} \right\rfloor + K + \left\lfloor \frac{K}{4} \right\rfloor + \left\lfloor \frac{J}{4} \right\rfloor - 2J\right) \mod 7
$$

unde:
- $h$ este ziua săptămânii (0 = sâmbătă, 1 = duminică, 2 = luni, etc.)
- $q$ este ziua lunii
- $m$ este luna (3 = martie, 4 = aprilie, ..., 12 = decembrie; ianuarie și februarie sunt considerate luni 13 și 14 ale anului precedent)
- $K$ este anul secolului (anul % 100)
- $J$ este secolul (anul / 100)

### Exemplu Pas cu Pas

Să determinăm ziua săptămânii pentru 4 iulie 2023:

1. $q = 4$
2. $m = 5$ (iulie este luna 5)
3. $K = 23$ (2023 % 100)
4. $J = 20$ (2023 / 100)

Aplicăm formula:

$$
h = \left(4 + \left\lfloor \frac{13(5 + 1)}{5} \right\rfloor + 23 + \left\lfloor \frac{23}{4} \right\rfloor + \left\lfloor \frac{20}{4} \right\rfloor - 2 \cdot 20\right) \mod 7
$$

Calculăm fiecare termen:

- $\left\lfloor \frac{13(6)}{5} \right\rfloor = \left\lfloor 15.6 \right\rfloor = 15$
- $\left\lfloor \frac{23}{4} \right\rfloor = 5$
- $\left\lfloor \frac{20}{4} \right\rfloor = 5$

Deci:

$$
h = (4 + 15 + 23 + 5 + 5 - 40) \mod 7 = 12 \mod 7 = 5
$$

Astfel, 4 iulie 2023 este o zi de marți (5).

## Matematică / Logică

Algoritmul se bazează pe aritmetica modulară, iar formula poate fi interpretată ca o combinație de termeni care ajustează ziua lunii și anul pentru a obține rezultatul dorit. Aceasta poate fi exprimată matematic prin:

$$
h = (q + \left\lfloor \frac{13(m + 1)}{5} \right\rfloor + K + \left\lfloor \frac{K}{4} \right\rfloor + \left\lfloor \frac{J}{4} \right\rfloor - 2J) \mod 7
$$

## Tabel de Complextitate

| Caz          | Complexitate Timp | Complexitate Spațiu |
|--------------|-------------------|---------------------|
| Cel mai bun  | $O(1)$            | $O(1)$              |
| Mediu        | $O(1)$            | $O(1)$              |
| Cel mai rău  | $O(1)$            | $O(1)$              |

## Avantaje și Dezavantaje

### Avantaje
- Rapid și eficient, cu complexitate constantă.
- Nu necesită date suplimentare sau structuri complexe.
- Poate fi implementat ușor în diverse limbaje de programare.

### Dezavantaje
- Necesită ajustări pentru lunile ianuarie și februarie.
- Nu este intuitiv pentru utilizatorii fără cunoștințe matematice.

## Aplicații Practice

Zellers Congruence este utilizat în diverse aplicații, inclusiv:
- Calcularea zilei săptămânii pentru date istorice sau viitoare.
- Implementarea de calendare în software-uri și aplicații.
- Analiza datelor temporale în statistici și științe sociale.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*