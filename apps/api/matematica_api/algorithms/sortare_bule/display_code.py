# Algoritmul Sortare cu bule (Bubble Sort)
# Scop: Sortează un tablou comparând perechi adiacente și interschimbându-le dacă sunt în ordine greșită

PENTRU fiecare trecere i de la 0 la n-1:
    swapped = FALS
    
    # Compară perechi adiacente
    PENTRU fiecare poziție j de la 0 la n-i-2:
        DACĂ arr[j] > arr[j+1]:
            # Elementele sunt în ordine greșită, interschimbă-le
            INTERSCHIMBĂ arr[j] cu arr[j+1]
            swapped = ADEVĂRAT
    
    # Dacă nu s-a făcut nicio interschimbare, tabloul este sortat
    DACĂ swapped == FALS:
        IEȘIRE din buclă

RETURNEAZĂ arr
