<!-- custom-doc -->

# 🚀 **Hartă (Map / Dictionary)**

## 📝 **Descriere**

O **Hartă** (Map), cunoscută și sub numele de **Dicționar** sau **Tablou Asociativ**, este o colecție abstractă de perechi de tip **(Cheie, Valoare)**. Fiecare cheie este unică în cadrul hărții și este utilizată pentru a accesa valoarea asociată ei. Această structură abstractizează conceptul de căutare rapidă, fiind implementată de obicei prin Tabele Hash sau Arbori Balansați.

## 🖼️ **Reprezentare Vizuală**

![Map Conceptual Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Map_data_structure.svg/400px-Map_data_structure.svg.png)

```text
     [ Cheie ]           [ Valoare ]
       "RO"      --->    "România"
       "FR"      --->    "Franța"
       "DE"      --->    "Germania"
```

## ⚖️ **Avantaje și Dezavantaje**

| Avantaj | Dezavantaj |
| :--- | :--- |
| 🚀 **Acces Intuitiv:** Datele sunt accesate prin nume/etichete, nu prin indici numerici. | ⚠️ **Lipsa Ordinii:** În multe implementări, ordinea inserării nu este garantată. |
| 📊 **Unicitate Garantată:** Previne automat duplicatele pentru cheile de acces. | 📉 **Complexitate Implementare:** Mai complexă decât un vector simplu. |

## 🔢 **Analiză Matematică și Complexitate**

Complexitatea depinde de implementarea de bază (Hash Map sau Balanced Tree).

| Tip Complexitate | Hash Map | Balanced Tree |
| :--- | :--- | :--- |
| **Căutare** | $O(1)$ | $O(\log n)$ |
| **Inserare** | $O(1)$ | $O(\log n)$ |
| **Ștergere** | $O(1)$ | $O(\log n)$ |
| **Spațiu (Space)** | $O(n)$ | $O(n)$ |

## 💡 **Aplicații Practice**

- **Configurații:** Stocarea setărilor unei aplicații (Cheie=NumeSetare, Valoare=Valoare).
- **Numărarea frecvenței:** Contorizarea aparițiilor cuvintelor într-un text.
- **Sisteme de Mapare:** Asocierea codurilor de țară cu numele complet sau steaguri.
- **JSON / Obiecte:** Formatul de bază pentru schimbul de date în web (perechi cheie-valoare).
