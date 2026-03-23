<!-- custom-doc -->
# 🛡️ Santinelă
## 📝 Descriere
Santinela este un algoritm utilizat în căutarea în structuri de date, în special în listele ordonate. Acesta îmbunătățește eficiența căutării prin utilizarea unei tehnici simple de marcare a limitelor, permițând astfel o căutare mai rapidă a elementelor. Algoritmul funcționează prin compararea valorii căutate cu elementele din listă, dar în loc să se oprească la prima necorespondență, continuă să verifice până când găsește elementul sau ajunge la capătul listei.

## 🖼️ Reprezentare Vizuală
![Reprezentare Santinelă](https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Sentinel_node.svg/1200px-Sentinel_node.svg.png)

```
Lista: [10, 20, 30, 40, 50]
Căutare: 30

Pas 1: Verificare 10 (necorespunzător)
Pas 2: Verificare 20 (necorespunzător)
Pas 3: Verificare 30 (corespunzător) -> Găsit!
```

## ⚖️ Avantaje și Dezavantaje

| Avantaj                                   | Dezavantaj                               |
|-------------------------------------------|------------------------------------------|
| Reduce numărul de comparații necesare    | Necesită o structură de date specifică |
| Simplifică implementarea căutării        | Poate consuma mai multă memorie        |
| Ușor de implementat                       | Nu este optim pentru liste neordonate  |

## 🔢 Analiză Matematică și Complexitate

| Tipul Complexității | Complexitate     |
|---------------------|------------------|
| Căutare medie       | $O(n)$           |
| Căutare în cel mai rău caz | $O(n)$   |
| Căutare în cel mai bun caz | $O(1)$    |

## 💡 Aplicații Practice
Algoritmul de santinelă este utilizat în diverse aplicații, cum ar fi:
- Căutarea eficientă în baze de date.
- Implementarea structurilor de date în limbaje de programare.
- Optimizarea algoritmilor de căutare în aplicații de tip engine de căutare.