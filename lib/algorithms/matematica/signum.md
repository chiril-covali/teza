<!-- custom-doc -->
# Signum

Signum este o funcție matematică care determină semnul unui număr real. Aceasta este adesea utilizată în analize matematice și algoritmi pentru a simplifica calculele și a determina direcția unei valori. Funcția este definită astfel:

$$
\text{signum}(x) = 
\begin{cases} 
1 & \text{dacă } x > 0 \\
0 & \text{dacă } x = 0 \\
-1 & \text{dacă } x < 0 
\end{cases}
$$

## Reprezentare Vizuală

Funcția signum poate fi reprezentată grafic printr-o diagramă simplă:

```
    |
  1 |       *
    |       |
    |       |
  0 |-------|-------*-------*-------*-------*
    |       |       |       |       |
 -1 |       *       |       |       |
    |       |       |       |       |
    |-------|-------|-------|-------|
          -1      0       1       x
```

### Exemplu Pas cu Pas

Să considerăm un exemplu cu un set de valori: [-3, -1, 0, 2, 4].

1. **Pentru -3**: $\text{signum}(-3) = -1$
2. **Pentru -1**: $\text{signum}(-1) = -1$
3. **Pentru 0**: $\text{signum}(0) = 0$
4. **Pentru 2**: $\text{signum}(2) = 1$
5. **Pentru 4**: $\text{signum}(4) = 1$

Rezultatul final al funcției signum pentru acest set de valori este: [-1, -1, 0, 1, 1].

## Matematică / Logică

Funcția semnului este un instrument util în analiza matematică, având aplicații în optimizarea algoritmilor și în determinarea comportamentului funcțiilor. Aceasta poate fi folosită pentru a simplifica expresii matematice complexe.

## Tabel de Complextitate

| Caz            | Complexitate Timp | Complexitate Spațiu |
|----------------|-------------------|---------------------|
| Cel mai bun    | $O(1)$            | $O(1)$              |
| Mediu          | $O(1)$            | $O(1)$              |
| Cel mai rău    | $O(1)$            | $O(1)$              |

## Avantaje și Dezavantaje

**Avantaje:**
- Simplifică calculele matematice.
- Permite determinarea rapidă a semnului unui număr.
- Utilizată frecvent în algoritmi de optimizare.

**Dezavantaje:**
- Nu oferă informații despre magnitudinea valorii.
- Poate fi confuză pentru cei care nu sunt familiarizați cu conceptele matematice.

## Aplicații Practice

Funcția signum este utilizată în diverse domenii, inclusiv:
- Analiza numerică pentru determinarea direcției de creștere sau descreștere a funcțiilor.
- Algoritmi de optimizare în inteligența artificială.
- Procesarea semnalelor pentru a determina polaritatea semnalelor electrice.

---
*Acest document face parte din biblioteca de algoritmi a proiectului Teza.*