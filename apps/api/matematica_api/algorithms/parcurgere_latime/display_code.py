# Algoritmul Parcurgere în lățime (BFS - Breadth-First Search)
# Scop: Explorează un graf nivel cu nivel, pornind de la un nod sursă

# Inițializare
queue = COADĂ_VIDĂ
visited = MULȚIME_VIDĂ
order = LISTĂ_VIDĂ

# Adaugă nodul de start
ADAUGĂ start în queue
MARCHEAZĂ start ca visited

CÂT TIMP queue NU E goală:
    # Scoate primul nod din coadă
    node = EXTRAGE din queue
    
    # Vizitează nodul curent
    VIZITEAZĂ node
    ADAUGĂ node în order
    
    # Explorează toți vecinii
    PENTRU fiecare neighbor al node:
        DACĂ neighbor NU este în visited:
            MARCHEAZĂ neighbor ca visited
            ADAUGĂ neighbor în queue

RETURNEAZĂ order  # Ordinea de vizitare a nodurilor
