<!-- custom-doc -->
# 🚀 Algoritmul Dijkstra

## 📝 Descriere
Algoritmul Dijkstra este o metodă eficientă pentru găsirea celui mai scurt drum într-un graf cu greutăți pozitive. Acesta a fost dezvoltat de către Edsger W. Dijkstra în 1956 și publicat în 1959. Algoritmul funcționează prin explorarea treptată a nodurilor din graf, actualizând distanțele minime către fiecare nod pe măsură ce progresează.

## 🖼️ Reprezentare Vizuală
![Reprezentare Vizuală](https://upload.wikimedia.org/wikipedia/commons/5/57/Dijkstra_Animation.gif)

```
   A
  / \
 1   4
/     \
B-------C
 \     /
  2   3
   \ /
    D
```

## ⚖️ Avantaje și Dezavantaje

| Avantaj                               | Dezavantaj                           |
|---------------------------------------|--------------------------------------|
| Găsește cel mai scurt drum optim     | Nu funcționează cu greutăți negative |
| Eficient pentru grafuri dense        | Complexitate O(V^2) în implementări simple |
| Ușor de implementat                   | Necesită memorie suplimentară pentru stocarea distanțelor |

## 🔢 Analiză Matematică și Complexitate

| Tipul Algoritmului | Complexitate Timp | Complexitate Spațiu |
|--------------------|-------------------|---------------------|
| Implementare simplă | O(V^2)            | O(V)                |
| Implementare cu heap (min-heap) | O(E log V)        | O(V)                |

## 💡 Aplicații Practice
Algoritmul este utilizat în diverse domenii, cum ar fi:
- **Sisteme de navigație**: pentru determinarea celor mai scurte rute între puncte.
- **Rețele de calculatoare**: pentru optimizarea rutei datelor.
- **Planificarea transportului**: pentru a minimiza costurile și timpul de livrare.
- **Jocuri video**: pentru a calcula rutele optime pentru personaje sau unități.