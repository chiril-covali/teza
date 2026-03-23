<!-- custom-doc -->

# 🚀 **Analiză Parantezelor Imbricate**

## 📝 **Descriere**

**Analiza parantezelor imbricate** este un algoritm clasic utilizat pentru a valida corectitudinea sintactică a unei expresii. Acesta utilizează o structură de date de tip **Stivă (Stack)** pentru a urmări parantezele deschise și a se asigura că fiecare este închisă corect, respectând ordinea **LIFO** (Last-In, First-Out). Este un pas esențial în procesarea limbajelor de programare și a formatelor de date precum JSON sau XML.

## 🖼️ **Reprezentare Vizuală**

![Stack Visualization](/docs-images/diverse/parse_nested_brackets.svg)
<!-- external-visual -->
![Resursă vizuală externă (diverse)](https://cdn.pixabay.com/photo/2015/05/31/10/55/man-791049_1280.jpg)


```text
Expresie: ( [ ] )

1. Întâlnește '(' -> Adaugă în stivă: ['(']
2. Întâlnește '[' -> Adaugă în stivă: ['(', '[']
3. Întâlnește ']' -> Scoate din stivă '['. Se potrivesc? Da ✅. Stivă: ['(']
4. Întâlnește ')' -> Scoate din stivă '('. Se potrivesc? Da ✅. Stivă: []

Final: Stiva este goală? Da ✅. Expresia este validă!
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Corectitudine:** Garantează validarea perfectă a oricărei adâncimi de imbricare. | ⚠️ **Memorie:** Necesită spațiu suplimentar proporțional cu numărul de paranteze. |
| 🛠️ **Extensibilitate:** Poate fi adaptat ușor pentru multiple tipuri de delimitatori ((), [], {}). | 📉 **Erori de Tip:** Necesită logică suplimentară pentru a identifica exact unde s-a produs eroarea. |
| 📊 **Viteză:** Procesează șirul într-o singură parcurgere liniară. | 🧩 **Sintaxă Fixă:** Nu poate gestiona reguli gramaticale foarte complexe fără un parser complet. |

## 🔢 **Analiză Matematică și Complexitate**

Algoritmul parcurge fiecare caracter o singură dată și efectuează operații de stivă în timp constant.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Time)** | $O(n)$ |
| **Spațiu (Space)** | $O(n)$ (în cel mai rău caz, toate sunt paranteze deschise) |

## 💡 **Aplicații Practice**

- **Compilatoare și Interpretoare:** Verificarea blocurilor de cod în limbaje precum C++, Java sau Python.
- **Editor de Texte:** Funcția de "Bracket Matching" care evidențiază perechea unei paranteze.
- **Validare Formate:** Verificarea structurii documentelor JSON, XML sau HTML.
- **Calculatoare Matematice:** Evaluarea expresiilor cu priorități definite prin paranteze.
