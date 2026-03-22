# Calculul Mediei Aritmetice

Slug: matematica_calculate_mean
Categorie: Matematică

## Introducere

Media aritmetică este cea mai utilizată măsură a tendinței centrale în statistică și analiză a datelor. Reprezintă suma tuturor valorilor unui set de date împărțită la numărul de elemente. Este un concept intuitiv care oferă o valoare „reprezentativă" a întregului set.

Deși conceptul de medie este folosit din antichitate, formalizarea sa matematică modernă a apărut odată cu dezvoltarea statisticii în sec. XVII-XVIII, prin lucrările lui Francis Galton, Karl Pearson și alții. Împreună cu mediana și modul, formează triada măsurilor de tendință centrală.

## Descriere

**Definiție:** x̄ = (x₁ + x₂ + ... + xₙ) / n = (1/n) × Σᵢ xᵢ

**Pașii algoritmului:**
1. Inițializează suma = 0.
2. Parcurge fiecare element din vector și adaugă-l la sumă.
3. Împarte suma la numărul de elemente n.
4. Returnează rezultatul.

## Complexitate

| Caz | Timp | Spațiu |
|-----|------|--------|
| General | O(n) | O(1) |

**Explicație:** Se parcurge o singură dată vectorul de n elemente, folosind o singură variabilă acumulatoare.

## Pseudocod

```
funcție medie(v[]):
    dacă lungime(v) = 0:
        returnează 0
    sumă ← 0
    pentru fiecare x în v:
        sumă ← sumă + x
    returnează sumă / lungime(v)
```

## Exemple

**Exemplul 1:** v = [4, 8, 6, 5, 3, 2, 8, 9, 2, 5]

Sumă = 4+8+6+5+3+2+8+9+2+5 = 52; n = 10

**Medie = 52 / 10 = 5.2**

**Exemplul 2:** Temperaturi zilnice (°C): [22, 25, 19, 28, 23]

Medie = (22+25+19+28+23)/5 = 117/5 = **23.4°C**

**Limitare – sensibilitate la valori extreme:**

v = [1, 2, 3, 4, 100] → Media = 110/5 = **22**, deși 4 din 5 valori sunt sub 5. Mediana (3) ar fi mai reprezentativă.

## Aplicații

- **Statistică descriptivă** – rezumarea seturilor de date numerice.
- **Machine learning** – normalizarea datelor (Z-score): z = (x - x̄) / σ.
- **Finanțe** – media mobilă pentru analiza tendințelor bursiere.
- **Fizică** – valoarea medie a măsurătorilor experimentale.
- **Informatică** – calculul timpului mediu de răspuns al unui server.
- **Monitorizare** – media ponderată în sisteme de evaluare și notare.

## Observații din implementare

- Implementarea folosește funcții arrow/funcții compacte.

## Resurse

- [Wikipedia – Medie aritmetică](https://ro.wikipedia.org/wiki/Medie_aritmetic%C4%83)
- [GeeksForGeeks – Mean of array](https://www.geeksforgeeks.org/program-for-mean-and-median-of-an-unsorted-array/)
