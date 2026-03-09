CODE = """
def insertion_sort(arr):
    n = len(arr)
    
    # Iterăm prin fiecare element începând de la al doilea
    for i in range(1, n):
        key = arr[i]  # Elementul de inserat
        j = i - 1
        
        # Mutăm elementele mai mari cu o poziție la dreapta
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        # Inserăm key la poziția corectă
        arr[j + 1] = key
    
    return arr
"""
