# Algoritmul lui Dijkstra
# Scop: Găsește cel mai scurt drum de la un nod sursă la toate celelalte noduri într-un graf ponderat

# Inițializare
distances = {} # distanța de la start la fiecare nod
PENTRU fiecare nod:
    distances[nod] = INFINIT

distances[start] = 0
heap = COADĂ_PRIORITATE_VIDĂ
ADAUGĂ (0, start) în heap

CÂT TIMP heap NU E goală:
    # Extrage nodul cu cea mai mică distanță
    (current_distance, node) = EXTRAGE_MINIM din heap
    
    # Ignoră dacă am găsit deja un drum mai scurt
    DACĂ current_distance > distances[node]:
        CONTINUĂ
    
    # Explorează vecinii
    PENTRU fiecare (neighbor, weight) al node:
        new_distance = current_distance + weight
        
        # Dacă am găsit un drum mai scurt
        DACĂ new_distance < distances[neighbor]:
            distances[neighbor] = new_distance
            ADAUGĂ (new_distance, neighbor) în heap

RETURNEAZĂ distances  # Distanțele minime de la start
