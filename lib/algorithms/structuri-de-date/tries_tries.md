<!-- custom-doc -->

# 🚀 **Trie (Arbore de Prefix)**

## 📝 **Descriere**

**Trie** este o structură de date ierarhică specializată pentru stocarea și căutarea rapidă a seturilor de șiruri de caractere (cuvinte). Spre deosebire de un arbore binar, niciun nod nu stochează cheia completă; în schimb, poziția sa în arbore definește cheia, fiecare nod reprezentând un caracter al unui prefix.

## 🖼️ **Reprezentare Vizuală**

![Trie Representation](https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Trie_example.svg/400px-Trie_example.svg.png)

```text
      (Root)
        |
       (c)
        |
       (a)
      /   \
    (t)*  (r)*  (* = sfârșit de cuvânt)
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Viteză:** Căutarea depinde doar de lungimea cuvântului ($L$), nu de câte cuvinte sunt stocate. | ⚠️ **Memorie:** Poate consuma mult spațiu dacă prefixele nu sunt comune (multe noduri). |
| 📊 **Prefix Matching:** Ideal pentru a găsi toate cuvintele care încep cu un anumit prefix. | 📉 **Implementare:** Mai complexă decât o tabelă de dispersie (hash table). |

## 🔢 **Analiză Matematică și Complexitate**

Dacă $L$ este lungimea cheii căutate.

| Tip Complexitate | Valoare |
| :--- | :--- |
| **Timp (Inserare/Căutare)** | $O(L)$ |
| **Spațiu (Space)** | $O(N \cdot M)$ ($N$ cuvinte, $M$ lungime medie) |

## 💡 **Aplicații Practice**

- **Autocompletare:** Sugerarea cuvintelor în timp ce utilizatorul tastează (Google Search).
- **Corector Ortografic:** Verificarea rapidă a prezenței unui cuvânt într-un dicționar.
- **Rutare IP:** Găsirea celei mai lungi potriviri de prefix în tabelele de rutare.
