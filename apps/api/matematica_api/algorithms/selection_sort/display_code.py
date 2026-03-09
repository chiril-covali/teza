CODE = """
def selection_sort(arr):
    n = len(arr)
    
    # Iterăm prin fiecare poziție
    for i in range(n - 1):
        # Găsim index-ul minimului din partea nesortată
        min_idx = i
        
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        # Schimbăm minimul cu elementul de pe poziția curentă
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr
"""
