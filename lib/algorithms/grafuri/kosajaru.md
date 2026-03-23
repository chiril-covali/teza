<!-- custom-doc -->
# 🏗️ Kosajaru

## 📝 Descriere
Algoritmul Kosajaru este o metodă utilizată pentru a determina componentele tare conexe ale unui graf orientat. Acesta funcționează prin două parcurgeri ale grafului: prima în ordinea topologică și a doua pe graful transpus. Această abordare permite identificarea eficientă a subgrafurilor care sunt conexe între ele.

## 🖼️ Reprezentare Vizuală
![Reprezentare Kosajaru](https://upload.wikimedia.org/wikipedia/commons/9/9b/Kosaraju.svg)

```
    A → B → C
    ↑   ↓
    D ← E
```

## ⚖️ Avantaje și Dezavantaje

| Avantaj                                      | Dezavantaj                                  |
|----------------------------------------------|---------------------------------------------|
| Eficient pentru grafuri mari                  | Necesită două parcurgeri ale grafului       |
| Permite identificarea rapidă a componentelor conexe | Implementarea poate fi complexă pentru începători |
| Funcționează bine în cazul grafurilor dense  | Nu este optim pentru grafuri foarte sparse |

## 🔢 Analiză Matematică și Complexitate

| Metrică                   | Valoare         |
|---------------------------|------------------|
| Complexitate temporală     | O(V + E)         |
| Complexitate spațială      | O(V)             |
| V - numărul de vârfuri    |                  |
| E - numărul de muchii     |                  |

## 💡 Aplicații Practice
Algoritmul este folosit în diverse domenii, cum ar fi analiza rețelelor sociale, determinarea grupurilor de utilizatori conectați, optimizarea fluxurilor de date în rețelele de calculatoare și în procesarea limbajului natural pentru a identifica relațiile între entități. De asemenea, este util în dezvoltarea sistemelor de recomandare și în analiza structurilor de date complexe.