# Algoritmul Căutare binară (Binary Search)
# Scop: Găsește poziția unui element într-un tablou SORTAT prin înjumătățirea spațiului de căutare

# Precondițe: arr trebuie să fie sortat
lo = 0
hi = lungime(arr) - 1
found_index = -1

CÂT TIMP lo <= hi:
    # Calculează mijlocul intervalului
    mid = (lo + hi) / 2
    
    DACĂ arr[mid] == target:
        # Am găsit elementul
        found_index = mid
        IEȘIRE din buclă
    
    DACĂ arr[mid] < target:
        # Ținta e în jumătatea dreaptă
        lo = mid + 1
    ALTFEL:
        # Ținta e în jumătatea stângă
        hi = mid - 1

RETURNEAZĂ found_index  # -1 dacă nu a fost găsit
