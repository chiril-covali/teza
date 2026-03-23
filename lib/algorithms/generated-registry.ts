import { AlgorithmMeta } from "./types";

export const allAlgorithmsMeta: AlgorithmMeta[] = [
  {
    "slug": "backtracking_generateparentheses",
    "name": "Generare Paranteze",
    "category": "Backtracking",
    "complexity": "T: O(4^n / sqrt(n)), S: O(n)",
    "description": "Produce toate combinațiile valide de n perechi de paranteze care se închid corect. Algoritmul folosește backtracking pentru a asigura că nicio paranteză nu se închide înainte de a fi deschisă."
  },
  {
    "slug": "backtracking_all_combinations_of_size_k",
    "name": "Toate Combinările de Dimensiune K",
    "category": "Backtracking",
    "complexity": "T: O(k * C(n, k)), S: O(k)",
    "description": "Generează toate submulțimile posibile de exact k elemente dintr-o mulțime de n numere. Este util în probleme de optimizare unde trebuie să verificăm toate grupările posibile."
  },
  {
    "slug": "cifru_xor_cipher",
    "name": "Cifrul XOR",
    "category": "Cifrare",
    "complexity": "T: O(N), S: O(N)",
    "description": "O metodă simplă de criptare care aplică operația logică XOR între fiecare caracter al textului și o cheie secretă."
  },
  {
    "slug": "cautare_binarySearch",
    "name": "Căutare Binară",
    "category": "Căutare",
    "complexity": "T: O(log N), S: O(1)",
    "description": "Versiune interactivă a căutării binare, ideală pentru înțelegerea procesului de divizare."
  },
  {
    "slug": "cautare_exponential_search",
    "name": "Căutare Exponențială",
    "category": "Căutare",
    "complexity": "T: O(log N), S: O(1)",
    "description": "Găsește rapid intervalul în care s-ar putea afla elementul și apoi aplică căutarea binară."
  },
  {
    "slug": "cautare_fibonacci_search",
    "name": "Căutare Fibonacci",
    "category": "Căutare",
    "complexity": "T: O(log N), S: O(1)",
    "description": "O metodă de căutare într-un vector sortat care folosește numerele Fibonacci pentru a diviza intervalele."
  },
  {
    "slug": "cautare_linear_search",
    "name": "Căutare Liniară",
    "category": "Căutare",
    "complexity": "T: O(N), S: O(1)",
    "description": "Verifică fiecare element pe rând până găsește valoarea căutată."
  },
  {
    "slug": "cautare_interpolation_search",
    "name": "Căutare prin Interpolare",
    "category": "Căutare",
    "complexity": "",
    "description": "Estimează poziția elementului folosind interpolarea liniară, accelerând căutarea în vectori cu distribuție uniformă."
  },
  {
    "slug": "cautare_jump_search",
    "name": "Căutare prin Salturi",
    "category": "Căutare",
    "complexity": "",
    "description": "Sare cu pași de √n în vectorul sortat, apoi aplică căutare liniară în blocul potrivit."
  },
  {
    "slug": "cautare_sentinel_search",
    "name": "Căutare cu Santinelă",
    "category": "Căutare",
    "complexity": "",
    "description": "Varianta optimizată a căutării liniare care elimină verificarea limitei de array prin plasarea elementului căutat la final."
  },
  {
    "slug": "diverse_is_sorted_array",
    "name": "Verificare Vector Sortat",
    "category": "Diverse",
    "complexity": "",
    "description": "Verifică dacă elementele unui vector sunt aranjate în ordine crescătoare."
  },
  {
    "slug": "diverse_parse_nested_brackets",
    "name": "Analiza Parantezelor Imbricate",
    "category": "Diverse",
    "complexity": "",
    "description": "Analizează un șir de caractere și verifică dacă parantezele sunt corect imbricate și echilibrate."
  },
  {
    "slug": "diverse_shuffle_array",
    "name": "Amestecarea Elementelor",
    "category": "Diverse",
    "complexity": "",
    "description": "Amestecă aleatoriu elementele unui vector folosind algoritmul Fisher-Yates."
  },
  {
    "slug": "grafuri_bellman_ford",
    "name": "Algoritmul Bellman-Ford",
    "category": "Grafuri",
    "complexity": "T: O(V*E), S: O(V)",
    "description": "Găsește drumurile minime de la o sursă, putând detecta cicluri de cost negativ."
  },
  {
    "slug": "grafuri_dijkstra",
    "name": "Algoritmul Dijkstra",
    "category": "Grafuri",
    "complexity": "T: O((V+E)log V), S: O(V)",
    "description": "Găsește cele mai scurte drumuri de la un nod de start întrun graf cu costuri pozitive."
  },
  {
    "slug": "grafuri_bipartite_graph",
    "name": "Graf Bipartit",
    "category": "Grafuri",
    "complexity": "",
    "description": "Verifică dacă un graf poate fi împărțit în două mulțimi disjuncte de noduri astfel încât fiecare muchie să conecteze noduri din mulțimi diferite."
  },
  {
    "slug": "grafuri_edmonds_karp",
    "name": "Edmonds Karp",
    "category": "Grafuri",
    "complexity": "",
    "description": "Implementare BFS a algoritmului Ford-Fulkerson pentru fluxul maxim într-o rețea."
  },
  {
    "slug": "grafuri_floyd_warshall",
    "name": "Floyd Warshall",
    "category": "Grafuri",
    "complexity": "",
    "description": "Găsește drumurile minime între toate perechile de noduri dintr-un graf ponderat."
  },
  {
    "slug": "grafuri_johnson",
    "name": "Johnson",
    "category": "Grafuri",
    "complexity": "",
    "description": "Algoritm pentru calculul drumurilor minime între toate perechile de noduri într-un graf cu ponderi, inclusiv negative."
  },
  {
    "slug": "grafuri_kosaraju",
    "name": "Kosaraju",
    "category": "Grafuri",
    "complexity": "",
    "description": "Găsește componentele tare conexe ale unui graf orientat folosind două parcurgeri DFS."
  },
  {
    "slug": "grafuri_kruskal",
    "name": "Kruskal",
    "category": "Grafuri",
    "complexity": "",
    "description": "Construiește arborele parțial de cost minim prin selectarea succesivă a muchiilor cu ponderea cea mai mică."
  },
  {
    "slug": "grafuri_dfs",
    "name": "Parcurgere în Adâncime (DFS)",
    "category": "Grafuri",
    "complexity": "T: O(V+E), S: O(V)",
    "description": "Explorează graful mergând cât mai adânc pe fiecare ramură înainte de a reveni (backtracking)."
  },
  {
    "slug": "grafuri_bfs",
    "name": "Parcurgere în Lățime (BFS)",
    "category": "Grafuri",
    "complexity": "T: O(V+E), S: O(V)",
    "description": "Explorează un graf nivel cu nivel, fiind util pentru găsirea celui mai scurt drum în grafuri neponderate."
  },
  {
    "slug": "grafuri_prim",
    "name": "Prim",
    "category": "Grafuri",
    "complexity": "",
    "description": "Determină arborele parțial de cost minim pornind de la un nod și adăugând iterativ cea mai apropiată muchie conectată."
  },
  {
    "slug": "grafuri_tarjan",
    "name": "Tarjan",
    "category": "Grafuri",
    "complexity": "",
    "description": "Identifică componentele tare conexe ale unui graf orientat într-o singură parcurgere DFS."
  },
  {
    "slug": "manipulare-biti_add_binary",
    "name": "Adunare Binară",
    "category": "Manipulare Biți",
    "complexity": "T: O(max(N, M)), S: O(max(N, M))",
    "description": "Adună două numere reprezentate ca șiruri de caractere binare (0 și 1), simulând adunarea pe hârtie cu transport (carry)."
  },
  {
    "slug": "manipulare-biti_log_two",
    "name": "Logaritm în Baza 2",
    "category": "Manipulare Biți",
    "complexity": "T: O(log N), S: O(1)",
    "description": "Calculează partea întreagă a logaritmului în baza 2 a unui număr prin deplasări succesive la dreapta ale biților."
  },
  {
    "slug": "manipulare-biti_is_power_of_2",
    "name": "Verificare Putere a lui 2",
    "category": "Manipulare Biți",
    "complexity": "T: O(1), S: O(1)",
    "description": "Verifică dacă un număr este o putere a lui 2 folosind proprietatea că în format binar, puterile lui 2 au un singur bit de 1."
  },
  {
    "slug": "manipulare-biti_is_power_of_4",
    "name": "Verificare Putere a lui 4",
    "category": "Manipulare Biți",
    "complexity": "T: O(1), S: O(1)",
    "description": "Verifică dacă un număr este o putere a lui 4 prin confirmarea că este putere a lui 2 și că bitul de 1 se află pe o poziție pară."
  },
  {
    "slug": "matematica_absolute_value",
    "name": "Valoare Absolută",
    "category": "Matematică",
    "complexity": "",
    "description": "Calculează valoarea absolută (modulul) a unui număr real, reprezentând distanța sa față de origine."
  },
  {
    "slug": "matematica_aliquot_sum",
    "name": "Suma Alicotă",
    "category": "Matematică",
    "complexity": "",
    "description": "Calculează suma tuturor divizorilor proprii ai unui număr întreg pozitiv, excluzând numărul însuși."
  },
  {
    "slug": "matematica_armstrong_number",
    "name": "Număr Armstrong",
    "category": "Matematică",
    "complexity": "",
    "description": "Verifică dacă un număr este egal cu suma propriilor cifre ridicate la puterea numărului de cifre."
  },
  {
    "slug": "matematica_binary_convert",
    "name": "Conversie în Binar",
    "category": "Matematică",
    "complexity": "",
    "description": "Realizează conversia numerelor între sistemul zecimal și cel binar."
  },
  {
    "slug": "matematica_binomial_coefficient",
    "name": "Coeficientul Binomial",
    "category": "Matematică",
    "complexity": "",
    "description": "Calculează numărul de moduri în care se pot alege k elemente dintr-o mulțime de n elemente."
  },
  {
    "slug": "matematica_calculate_mean",
    "name": "Calculul Mediei Aritmetice",
    "category": "Matematică",
    "complexity": "",
    "description": "Determină media aritmetică a unui set de numere prin raportul dintre suma lor și numărul total de elemente."
  },
  {
    "slug": "matematica_calculate_median",
    "name": "Calculul Medianei",
    "category": "Matematică",
    "complexity": "",
    "description": "Găsește valoarea centrală a unui set de date ordonate, care separă jumătatea superioară de cea inferioară."
  },
  {
    "slug": "matematica_degrees_to_radians",
    "name": "Grade în Radiani",
    "category": "Matematică",
    "complexity": "",
    "description": "Transformă măsura unui unghi din grade sexagesimale în radiani folosind constanta PI."
  },
  {
    "slug": "matematica_digit_sum",
    "name": "Suma Cifrelor",
    "category": "Matematică",
    "complexity": "",
    "description": "Calculează suma cifrelor unui număr întreg în baza 10."
  },
  {
    "slug": "matematica_double_factorial_iterative",
    "name": "Dublu Factorial Iterativ",
    "category": "Matematică",
    "complexity": "",
    "description": "Calculează produsul numerelor întregi pozitive care au aceeași paritate ca n și sunt mai mici sau egale cu acesta."
  },
  {
    "slug": "matematica_euler_totient",
    "name": "Funcția Euler Totient",
    "category": "Matematică",
    "complexity": "",
    "description": "Determină numărul de numere întregi pozitive mai mici decât n care sunt prime cu n."
  },
  {
    "slug": "matematica_factorial",
    "name": "Factorial",
    "category": "Matematică",
    "complexity": "",
    "description": "Calculează produsul tuturor numerelor întregi pozitive mai mici sau egale cu n."
  },
  {
    "slug": "matematica_factors",
    "name": "Factorizare",
    "category": "Matematică",
    "complexity": "",
    "description": "Identifică toți divizorii întregi ai unui număr dat."
  },
  {
    "slug": "matematica_fibonacci",
    "name": "Fibonacci",
    "category": "Matematică",
    "complexity": "",
    "description": "Generează termenii șirului în care fiecare număr este suma celor două precedente."
  },
  {
    "slug": "matematica_find_min",
    "name": "Valoarea Minimă",
    "category": "Matematică",
    "complexity": "",
    "description": "Identifică cel mai mic element dintr-o listă sau un set de date numerice."
  },
  {
    "slug": "matematica_gaussian_elimination",
    "name": "Eliminarea Gaussiană",
    "category": "Matematică",
    "complexity": "",
    "description": "Rezolvă sisteme de ecuații liniare prin transformarea matricei coeficienților într-o formă eșalonată."
  },
  {
    "slug": "matematica_greatest_common_factor",
    "name": "Cel mai Mare Divizor Comun",
    "category": "Matematică",
    "complexity": "",
    "description": "Determină cel mai mare număr întreg care divide fără rest două sau mai multe numere date."
  },
  {
    "slug": "matematica_hamming_distance",
    "name": "Distanța Hamming",
    "category": "Matematică",
    "complexity": "",
    "description": "Măsoară numărul de poziții în care simbolurile corespunzătoare a două șiruri de lungime egală sunt diferite."
  },
  {
    "slug": "matematica_series_hexagonal_numbers",
    "name": "Șirul Numerelor Hexagonale",
    "category": "Matematică",
    "complexity": "",
    "description": "Generează numerele dintr-un șir figurativ care reprezintă puncte aranjate sub formă de hexagoane."
  },
  {
    "slug": "matematica_is_divisible",
    "name": "Verificare Divizibilitate",
    "category": "Matematică",
    "complexity": "",
    "description": "Verifică dacă un număr se divide exact la un alt număr, fără a lăsa rest."
  },
  {
    "slug": "matematica_is_even",
    "name": "Verificare Număr Par",
    "category": "Matematică",
    "complexity": "",
    "description": "Verifică dacă un număr întreg este par (divizibil cu 2)."
  },
  {
    "slug": "matematica_is_leap_year",
    "name": "Verificare An Bisect",
    "category": "Matematică",
    "complexity": "",
    "description": "Determină dacă un an calendaristic are 366 de zile conform regulilor calendarului gregorian."
  },
  {
    "slug": "matematica_is_odd",
    "name": "Verificare Număr Impar",
    "category": "Matematică",
    "complexity": "",
    "description": "Verifică dacă un număr întreg este impar (nu se divide exact cu 2)."
  },
  {
    "slug": "matematica_is_palindrome",
    "name": "Verificare Palindrom",
    "category": "Matematică",
    "complexity": "",
    "description": "Verifică dacă un număr sau un șir de caractere se citește la fel de la stânga la dreapta și de la dreapta la stânga."
  },
  {
    "slug": "matematica_is_square_free",
    "name": "Verificare Număr Liber de Pătrate",
    "category": "Matematică",
    "complexity": "",
    "description": "Verifică dacă un număr nu este divizibil cu niciun pătrat perfect mai mare decât 1."
  },
  {
    "slug": "matematica_juggler_sequence",
    "name": "Șirul Juggler",
    "category": "Matematică",
    "complexity": "",
    "description": "Generează o secvență iterativă de numere întregi folosind puteri fracționare, care începe de la un număr pozitiv."
  },
  {
    "slug": "matematica_lowest_common_multiple",
    "name": "Cel mai Mic Multiplu Comun",
    "category": "Matematică",
    "complexity": "",
    "description": "Calculează cel mai mic număr întreg care este divizibil cu toate numerele dintr-un set dat."
  },
  {
    "slug": "matematica_matrix_multiplication",
    "name": "Înmulțirea Matricelor",
    "category": "Matematică",
    "complexity": "",
    "description": "Realizează operația aritmetică de înmulțire a două matrice pentru a produce o matrice nouă."
  },
  {
    "slug": "matematica_number_of_digits",
    "name": "Numărul de Cifre",
    "category": "Matematică",
    "complexity": "",
    "description": "Calculează numărul total de cifre ale unui număr întreg."
  },
  {
    "slug": "matematica_pascals_triangle",
    "name": "Triunghiul lui Pascal",
    "category": "Matematică",
    "complexity": "",
    "description": "Generează un aranjament triunghiular de numere unde fiecare valoare este suma celor două numere de deasupra sa."
  },
  {
    "slug": "matematica_perfect_cube",
    "name": "Cub Perfect",
    "category": "Matematică",
    "complexity": "",
    "description": "Verifică dacă un număr este rezultatul ridicării la puterea a treia a unui alt număr întreg."
  },
  {
    "slug": "matematica_perfect_number",
    "name": "Număr Perfect",
    "category": "Matematică",
    "complexity": "",
    "description": "Verifică dacă un număr este egal cu suma divizorilor săi proprii pozitivi."
  },
  {
    "slug": "matematica_perfect_square",
    "name": "Pătrat Perfect",
    "category": "Matematică",
    "complexity": "",
    "description": "Verifică dacă un număr este pătratul unui alt număr întreg."
  },
  {
    "slug": "matematica_prime_factorization",
    "name": "Descompunere în Factori Primi",
    "category": "Matematică",
    "complexity": "",
    "description": "Descompune un număr întreg în produs de numere prime."
  },
  {
    "slug": "matematica_primes",
    "name": "Numere Prime",
    "category": "Matematică",
    "complexity": "",
    "description": "Identifică sau generează numerele naturale mai mari decât 1 care au exact doi divizori: 1 și ele însele."
  },
  {
    "slug": "matematica_pronic_number",
    "name": "Număr Pronic",
    "category": "Matematică",
    "complexity": "",
    "description": "Verifică dacă un număr este produsul a două numere întregi consecutive."
  },
  {
    "slug": "matematica_radians_to_degrees",
    "name": "Radiani în Grade",
    "category": "Matematică",
    "complexity": "",
    "description": "Transformă măsura unui unghi din radiani în grade sexagesimale."
  },
  {
    "slug": "matematica_sieve_of_eratosthenes",
    "name": "Ciurul lui Eratostene",
    "category": "Matematică",
    "complexity": "",
    "description": "Algoritm eficient pentru găsirea tuturor numerelor prime până la o limită dată."
  },
  {
    "slug": "matematica_signum",
    "name": "Funcția Signum",
    "category": "Matematică",
    "complexity": "",
    "description": "Extrage semnul unui număr real, returnând -1, 0 sau 1 în funcție de valoarea acestuia."
  },
  {
    "slug": "matematica_square_root",
    "name": "Rădăcina Pătrată",
    "category": "Matematică",
    "complexity": "",
    "description": "Calculează rădăcina pătrată a unui număr, adică valoarea care înmulțită cu ea însăși dă numărul inițial."
  },
  {
    "slug": "matematica_ugly_numbers",
    "name": "Numere Urâte",
    "category": "Matematică",
    "complexity": "",
    "description": "Identifică numerele ai căror singuri factori primi sunt 2, 3 sau 5."
  },
  {
    "slug": "matematica_zellers_congruence",
    "name": "Congruența Zeller",
    "category": "Matematică",
    "complexity": "",
    "description": "Calculează ziua săptămânii pentru orice dată calendaristică din trecut sau viitor."
  },
  {
    "slug": "programare-dinamica_lcs",
    "name": "Subsecvența Comună Maximă (LCS)",
    "category": "Programare Dinamică",
    "complexity": "T: O(N*M), S: O(N*M)",
    "description": "Găsește cel mai lung șir de caractere care apare în aceeași ordine în două șiruri."
  },
  {
    "slug": "programare-dinamica_coin_change",
    "name": "Problema Restului (Schimb Monede)",
    "category": "Programare Dinamică",
    "complexity": "T: O(S*n), S: O(S)",
    "description": "Determină numărul minim de monede pentru a obține o sumă, optimizând subproblemele repetate."
  },
  {
    "slug": "programare-dinamica_knapsack",
    "name": "Problema Rucsacului (0/1 Knapsack)",
    "category": "Programare Dinamică",
    "complexity": "T: O(N*W), S: O(N*W)",
    "description": "Maximizează valoarea obiectelor dintr-un rucsac fără a depăși capacitatea de greutate."
  },
  {
    "slug": "sortare_tree_sort",
    "name": "Sortare cu Arbore",
    "category": "Sortare",
    "complexity": "",
    "description": "Construiește un arbore binar de căutare din elementele unui tablou și apoi îl parcurge în inordine pentru a obține elementele sortate."
  },
  {
    "slug": "sortare_bogo_sort",
    "name": "Bogo Sortare",
    "category": "Sortare",
    "complexity": "",
    "description": "O metodă de sortare extrem de ineficientă care generează permutări aleatorii până când tabloul devine ordonat."
  },
  {
    "slug": "sortare_counting_sort",
    "name": "Sortare prin Numărare",
    "category": "Sortare",
    "complexity": "",
    "description": "Sortează elementele prin numărarea aparițiilor fiecărei valori unice, fiind eficient pentru intervale mici de valori."
  },
  {
    "slug": "sortare_cycle_sort",
    "name": "Sortare Ciclică",
    "category": "Sortare",
    "complexity": "",
    "description": "Un algoritm de sortare pe loc care minimizează numărul total de scrieri în memorie."
  },
  {
    "slug": "sortare_gnome_sort",
    "name": "Sortare Gnome",
    "category": "Sortare",
    "complexity": "",
    "description": "Sortează o listă prin mutarea repetată a unui element spre poziția sa corectă, similar cu sortarea prin inserție dar cu un singur ciclu."
  },
  {
    "slug": "sortare_heap_sort",
    "name": "Sortare cu Heap",
    "category": "Sortare",
    "complexity": "",
    "description": "Utilizează o structură de date de tip heap pentru a extrage succesiv elementul maxim sau minim și a ordona tabloul."
  },
  {
    "slug": "sortare_quick_select",
    "name": "Selecție Rapidă",
    "category": "Sortare",
    "complexity": "",
    "description": "Un algoritm de selecție pentru a găsi al k-lea cel mai mic element dintr-o listă neordonată."
  },
  {
    "slug": "sortare_shell_sort",
    "name": "Sortare Shell",
    "category": "Sortare",
    "complexity": "",
    "description": "O generalizare a sortării prin inserție care permite schimbul de elemente aflate la distanțe mari."
  },
  {
    "slug": "sortare_quickSort",
    "name": "Sortare Rapidă",
    "category": "Sortare",
    "complexity": "T: O(N log N), S: O(log N)",
    "description": "Vizualizare interactivă a partiționării și recursivității în Quick Sort."
  },
  {
    "slug": "sortare_mergeSort",
    "name": "Sortare prin Interclasare",
    "category": "Sortare",
    "complexity": "T: O(N log N), S: O(N)",
    "description": "Animație clară a procesului de 'Divide et Impera' în Merge Sort."
  },
  {
    "slug": "sortare_bubbleSort",
    "name": "Sortare prin Metoda Bulelor",
    "category": "Sortare",
    "complexity": "T: O(N^2), S: O(1)",
    "description": "O animație pas-cu-pas a modului în care Bubble Sort ordonează elementele."
  },
  {
    "slug": "sortare_swap_sort",
    "name": "Sortare prin Interschimb",
    "category": "Sortare",
    "complexity": "",
    "description": "Sortează elementele prin interschimbări directe bazate pe compararea valorilor adiacente sau a pozițiilor corecte."
  },
  {
    "slug": "sortare_insertionSort",
    "name": "Sortare prin Inserție",
    "category": "Sortare",
    "complexity": "",
    "description": "Construiește lista sortată finală prin inserarea succesivă a fiecărui element nou pe poziția sa corectă."
  },
  {
    "slug": "sortare_selectionSort",
    "name": "Sortare prin Selecție",
    "category": "Sortare",
    "complexity": "",
    "description": "Sortează un tablou prin selectarea repetată a celui mai mic element din partea neordonată și mutarea lui la început."
  },
  {
    "slug": "structuri-de-date_tree_binary_search_tree",
    "name": "Arbore Binar de Căutare (BST)",
    "category": "Structuri de Date",
    "complexity": "T: O(log N) mediu, S: O(N)",
    "description": "Arbore în care nodul stâng < părinte < nodul drept. Permite căutări, inserări și ștergeri eficiente."
  },
  {
    "slug": "structuri-de-date_queue_circular_queue",
    "name": "Coadă Circulară",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "Implementează o coadă folosind un tablou fix unde ultima poziție este conectată la prima pentru a reutiliza spațiul."
  },
  {
    "slug": "structuri-de-date_list_doubly_linked_list",
    "name": "Listă Dublu Înlănțuită",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "O listă în care fiecare element conține referințe atât către nodul următor, cât și către cel anterior."
  },
  {
    "slug": "structuri-de-date_map_hash_map",
    "name": "Tabelă Hash",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "O structură de date care asociază chei cu valori folosind o funcție de dispersie (hash) pentru acces rapid."
  },
  {
    "slug": "structuri-de-date_set_hash_map_set",
    "name": "Mulțime Hash",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "Implementează o mulțime de elemente unice folosind mecanismul intern al unui tabel de dispersie."
  },
  {
    "slug": "structuri-de-date_heap_heap",
    "name": "Heap (Grămadă de Prioritate)",
    "category": "Structuri de Date",
    "complexity": "T: O(log N), S: O(N)",
    "description": "O structură de date arborescentă care permite accesul rapid la elementul minim sau maxim. Este baza algoritmului HeapSort."
  },
  {
    "slug": "structuri-de-date_queue_linked_queue",
    "name": "Coadă Înlănțuită",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "O coadă implementată dinamic folosind noduri de listă înlănțuită pentru a permite dimensiuni variabile."
  },
  {
    "slug": "structuri-de-date_list_linked_list",
    "name": "Listă Înlănțuită",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "O structură de date liniară în care elementele sunt stocate în noduri conectate prin pointeri."
  },
  {
    "slug": "structuri-de-date_stack_linked_list_stack",
    "name": "Stivă Înlănțuită",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "Implementează o stivă folosind o listă înlănțuită, urmând principiul LIFO (Last-In, First-Out)."
  },
  {
    "slug": "structuri-de-date_map_map",
    "name": "Hartă (Map)",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "O colecție de perechi cheie-valoare care garantează unicitatea cheilor și permite regăsirea rapidă a datelor."
  },
  {
    "slug": "structuri-de-date_set_map_set",
    "name": "Mulțime cu Hartă",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "O implementare a unei mulțimi bazată pe structura de date de tip Map pentru a asigura elemente distincte."
  },
  {
    "slug": "structuri-de-date_disjoint_set_disjoint_set",
    "name": "Mulțimi Disjuncte (Union-Find)",
    "category": "Structuri de Date",
    "complexity": "T: O(α(N)), S: O(N)",
    "description": "Gestionează o colecție de elemente divizate în submulțimi care nu se suprapun. Este esențial pentru algoritmi precum Kruskal."
  },
  {
    "slug": "structuri-de-date_queue_queue",
    "name": "Coadă",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "O structură de date liniară care urmează principiul FIFO (First-In, First-Out) pentru gestionarea elementelor."
  },
  {
    "slug": "structuri-de-date_set_set",
    "name": "Mulțime (Set)",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "Reprezintă o colecție de elemente distincte, fără o ordine specifică."
  },
  {
    "slug": "structuri-de-date_list_singly_linked_list",
    "name": "Listă Simplu Înlănțuită",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "O listă înlănțuită în care fiecare nod conține date și o referință către elementul următor."
  },
  {
    "slug": "structuri-de-date_queue_stack_queue",
    "name": "Coadă din Stive",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "Implementează comportamentul unei cozi folosind două stive pentru a gestiona ordinea elementelor."
  },
  {
    "slug": "structuri-de-date_stack_stack",
    "name": "Stivă",
    "category": "Structuri de Date",
    "complexity": "T: O(1), S: O(N)",
    "description": "Structură de date liniară bazată pe principiul LIFO. Adăugarea și eliminarea se fac doar pe la 'vârf'."
  },
  {
    "slug": "structuri-de-date_tries_tries",
    "name": "Trie (Arbore de Prefix)",
    "category": "Structuri de Date",
    "complexity": "T: O(L), S: O(N*L)",
    "description": "Structură arborescentă specializată în stocarea și căutarea șirurilor de caractere (ex: dicționare)."
  },
  {
    "slug": "structuri-de-date_queue_array_queue",
    "name": "Coadă pe Tablou",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "O coadă implementată clasic folosind un tablou pentru stocarea elementelor."
  }
];
