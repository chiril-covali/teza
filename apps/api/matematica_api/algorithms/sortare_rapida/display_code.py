# Algoritmul Sortare rapidă (Quick Sort)
# Scop: Sortează prin împărțire: alege un pivot, plasează elementele mai mici în stânga și mai mari în dreapta

FUNCȚIE quick_sort(arr, low, high):
    DACĂ low >= high:
        RETURNEAZĂ
    
    # Partitionare: alege arr[high] ca pivot
    pivot = arr[high]
    i = low
    
    PENTRU j de la low la high-1:
        DACĂ arr[j] <= pivot:
            INTERSCHIMBĂ arr[i] cu arr[j]
            i = i + 1
    
    # Plasează pivotul la poziția corectă
    INTERSCHIMBĂ arr[i] cu arr[high]
    pivot_index = i
    
    # Sortează recursiv cele două părți
    quick_sort(arr, low, pivot_index - 1)
    quick_sort(arr, pivot_index + 1, high)

# Pornește sortarea
quick_sort(arr, 0, lungime(arr) - 1)
