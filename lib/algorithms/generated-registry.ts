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
    "name": "Căutare Binară (Vizualizat)",
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
    "name": "Interpolare Căutare",
    "category": "Căutare",
    "complexity": "",
    "description": "Interpolare Căutare este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "cautare_jump_search",
    "name": "Salturi Căutare",
    "category": "Căutare",
    "complexity": "",
    "description": "Salturi Căutare este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "cautare_sentinel_search",
    "name": "Santinelă Căutare",
    "category": "Căutare",
    "complexity": "",
    "description": "Santinelă Căutare este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "diverse_is_sorted_array",
    "name": "Verificare Sorted Array",
    "category": "Diverse",
    "complexity": "",
    "description": "Verificare Sorted Array este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "diverse_parse_nested_brackets",
    "name": "Parse Nested Brackets",
    "category": "Diverse",
    "complexity": "",
    "description": "Parse Nested Brackets este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "diverse_shuffle_array",
    "name": "Shuffle Array",
    "category": "Diverse",
    "complexity": "",
    "description": "Shuffle Array este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
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
    "name": "Bipartite Graf",
    "category": "Grafuri",
    "complexity": "",
    "description": "Bipartite Graf este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "grafuri_edmonds_karp",
    "name": "Edmonds Karp",
    "category": "Grafuri",
    "complexity": "",
    "description": "Edmonds Karp este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "grafuri_floyd_warshall",
    "name": "Floyd Warshall",
    "category": "Grafuri",
    "complexity": "",
    "description": "Floyd Warshall este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "grafuri_johnson",
    "name": "Johnson",
    "category": "Grafuri",
    "complexity": "",
    "description": "Johnson este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "grafuri_kosajaru",
    "name": "Kosajaru",
    "category": "Grafuri",
    "complexity": "",
    "description": "Kosajaru este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "grafuri_kruskal",
    "name": "Kruskal",
    "category": "Grafuri",
    "complexity": "",
    "description": "Kruskal este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
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
    "description": "Prim este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "grafuri_tarjan",
    "name": "Tarjan",
    "category": "Grafuri",
    "complexity": "",
    "description": "Tarjan este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
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
    "name": "Absolute Value",
    "category": "Matematică",
    "complexity": "",
    "description": "Absolute Value este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_aliquot_sum",
    "name": "Aliquot Sum",
    "category": "Matematică",
    "complexity": "",
    "description": "Aliquot Sum este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_armstrong_number",
    "name": "Armstrong Number",
    "category": "Matematică",
    "complexity": "",
    "description": "Armstrong Number este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_binary_convert",
    "name": "Binară Convert",
    "category": "Matematică",
    "complexity": "",
    "description": "Binară Convert este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_binomial_coefficient",
    "name": "Binomial Coefficient",
    "category": "Matematică",
    "complexity": "",
    "description": "Binomial Coefficient este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_calculate_mean",
    "name": "Calculate Mean",
    "category": "Matematică",
    "complexity": "",
    "description": "Calculate Mean este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_calculate_median",
    "name": "Calculate Median",
    "category": "Matematică",
    "complexity": "",
    "description": "Calculate Median este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_degrees_to_radians",
    "name": "Degrees To Radians",
    "category": "Matematică",
    "complexity": "",
    "description": "Degrees To Radians este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_digit_sum",
    "name": "Digit Sum",
    "category": "Matematică",
    "complexity": "",
    "description": "Digit Sum este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_double_factorial_iterative",
    "name": "Double Factorial Iterative",
    "category": "Matematică",
    "complexity": "",
    "description": "Double Factorial Iterative este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_euler_totient",
    "name": "Euler Totient",
    "category": "Matematică",
    "complexity": "",
    "description": "Euler Totient este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_factorial",
    "name": "Factorial",
    "category": "Matematică",
    "complexity": "",
    "description": "Factorial este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_factors",
    "name": "Factors",
    "category": "Matematică",
    "complexity": "",
    "description": "Factors este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_fibonacci",
    "name": "Fibonacci",
    "category": "Matematică",
    "complexity": "",
    "description": "Fibonacci este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_find_min",
    "name": "Find Min",
    "category": "Matematică",
    "complexity": "",
    "description": "Find Min este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_gaussian_elimination",
    "name": "Gaussian Elimination",
    "category": "Matematică",
    "complexity": "",
    "description": "Gaussian Elimination este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_greatest_common_factor",
    "name": "Greatest Common Factor",
    "category": "Matematică",
    "complexity": "",
    "description": "Greatest Common Factor este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_hamming_distance",
    "name": "Hamming Distance",
    "category": "Matematică",
    "complexity": "",
    "description": "Hamming Distance este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_series_hexagonal_numbers",
    "name": "Series Hexagonal Numbers",
    "category": "Matematică",
    "complexity": "",
    "description": "Series Hexagonal Numbers este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_is_divisible",
    "name": "Verificare Divisible",
    "category": "Matematică",
    "complexity": "",
    "description": "Verificare Divisible este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_is_even",
    "name": "Verificare Even",
    "category": "Matematică",
    "complexity": "",
    "description": "Verificare Even este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_is_leap_year",
    "name": "Verificare Leap Year",
    "category": "Matematică",
    "complexity": "",
    "description": "Verificare Leap Year este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_is_odd",
    "name": "Verificare Odd",
    "category": "Matematică",
    "complexity": "",
    "description": "Verificare Odd este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_is_palindrome",
    "name": "Verificare Palindrome",
    "category": "Matematică",
    "complexity": "",
    "description": "Verificare Palindrome este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_is_square_free",
    "name": "Verificare Square Free",
    "category": "Matematică",
    "complexity": "",
    "description": "Verificare Square Free este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_juggler_sequence",
    "name": "Juggler Sequence",
    "category": "Matematică",
    "complexity": "",
    "description": "Juggler Sequence este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_lowest_common_multiple",
    "name": "Lowest Common Multiple",
    "category": "Matematică",
    "complexity": "",
    "description": "Lowest Common Multiple este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_matrix_multiplication",
    "name": "Matrix Multiplication",
    "category": "Matematică",
    "complexity": "",
    "description": "Matrix Multiplication este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_number_of_digits",
    "name": "Number de Digits",
    "category": "Matematică",
    "complexity": "",
    "description": "Number de Digits este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_pascals_triangle",
    "name": "Pascals Triangle",
    "category": "Matematică",
    "complexity": "",
    "description": "Pascals Triangle este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_perfect_cube",
    "name": "Perfect Cube",
    "category": "Matematică",
    "complexity": "",
    "description": "Perfect Cube este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_perfect_number",
    "name": "Perfect Number",
    "category": "Matematică",
    "complexity": "",
    "description": "Perfect Number este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_perfect_square",
    "name": "Perfect Square",
    "category": "Matematică",
    "complexity": "",
    "description": "Perfect Square este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_prime_factorization",
    "name": "Prime Factorization",
    "category": "Matematică",
    "complexity": "",
    "description": "Prime Factorization este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_primes",
    "name": "Primes",
    "category": "Matematică",
    "complexity": "",
    "description": "Primes este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_pronic_number",
    "name": "Pronic Number",
    "category": "Matematică",
    "complexity": "",
    "description": "Pronic Number este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_radians_to_degrees",
    "name": "Radians To Degrees",
    "category": "Matematică",
    "complexity": "",
    "description": "Radians To Degrees este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_sieve_of_eratosthenes",
    "name": "Sieve de Eratosthenes",
    "category": "Matematică",
    "complexity": "",
    "description": "Sieve de Eratosthenes este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_signum",
    "name": "Signum",
    "category": "Matematică",
    "complexity": "",
    "description": "Signum este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_square_root",
    "name": "Square Root",
    "category": "Matematică",
    "complexity": "",
    "description": "Square Root este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_ugly_numbers",
    "name": "Ugly Numbers",
    "category": "Matematică",
    "complexity": "",
    "description": "Ugly Numbers este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "matematica_zellers_congruence",
    "name": "Zellers Congruence",
    "category": "Matematică",
    "complexity": "",
    "description": "Zellers Congruence este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "programare-dinamica_lcs",
    "name": "Cel mai lung subșir comun (LCS)",
    "category": "Programare Dinamică",
    "complexity": "T: O(N*M), S: O(N*M)",
    "description": "Găsește cel mai lung șir de caractere care apare în aceeași ordine în două șiruri."
  },
  {
    "slug": "programare-dinamica_coin_change",
    "name": "Problema Restului (Coin Change)",
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
    "name": "Arbore Sortare",
    "category": "Sortare",
    "complexity": "",
    "description": "Arbore Sortare este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "sortare_bogo_sort",
    "name": "Bogo Sortare",
    "category": "Sortare",
    "complexity": "",
    "description": "Bogo Sortare este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "sortare_counting_sort",
    "name": "Counting Sortare",
    "category": "Sortare",
    "complexity": "",
    "description": "Counting Sortare este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "sortare_cycle_sort",
    "name": "Cycle Sortare",
    "category": "Sortare",
    "complexity": "",
    "description": "Cycle Sortare este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "sortare_gnome_sort",
    "name": "Gnome Sortare",
    "category": "Sortare",
    "complexity": "",
    "description": "Gnome Sortare este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "sortare_heap_sort",
    "name": "Heap Sortare",
    "category": "Sortare",
    "complexity": "",
    "description": "Heap Sortare este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "sortare_quick_select",
    "name": "Quick Select",
    "category": "Sortare",
    "complexity": "",
    "description": "Quick Select este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "sortare_shell_sort",
    "name": "Shell Sortare",
    "category": "Sortare",
    "complexity": "",
    "description": "Shell Sortare este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "sortare_quickSort",
    "name": "Sortare Rapidă (Vizualizat)",
    "category": "Sortare",
    "complexity": "T: O(N log N), S: O(log N)",
    "description": "Vizualizare interactivă a partiționării și recursivității în Quick Sort."
  },
  {
    "slug": "sortare_mergeSort",
    "name": "Sortare prin Interclasare (Vizualizat)",
    "category": "Sortare",
    "complexity": "T: O(N log N), S: O(N)",
    "description": "Animație clară a procesului de 'Divide et Impera' în Merge Sort."
  },
  {
    "slug": "sortare_bubbleSort",
    "name": "Sortare prin Metoda Bulelor (Vizualizat)",
    "category": "Sortare",
    "complexity": "T: O(N^2), S: O(1)",
    "description": "O animație pas-cu-pas a modului în care Bubble Sort ordonează elementele."
  },
  {
    "slug": "sortare_swap_sort",
    "name": "Swap Sortare",
    "category": "Sortare",
    "complexity": "",
    "description": "Swap Sortare este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "sortare_insertionSort",
    "name": "Insertion Sortare",
    "category": "Sortare",
    "complexity": "",
    "description": "Insertion Sortare este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "sortare_selectionSort",
    "name": "Selection Sortare",
    "category": "Sortare",
    "complexity": "",
    "description": "Selection Sortare este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
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
    "name": "Coadă Circulară Coadă",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "Coadă Circulară Coadă este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "structuri-de-date_list_doubly_linked_list",
    "name": "Listă Dublu Înlănțuită Listă",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "Listă Dublu Înlănțuită Listă este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "structuri-de-date_map_hash_map",
    "name": "Hartă Hash Hartă",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "Hartă Hash Hartă este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "structuri-de-date_set_hash_map_set",
    "name": "Set Hash Hartă Set",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "Set Hash Hartă Set este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "structuri-de-date_heap_heap",
    "name": "Heap (Grămadă)",
    "category": "Structuri de Date",
    "complexity": "T: O(log N), S: O(N)",
    "description": "O structură de date arborescentă care permite accesul rapid la elementul minim sau maxim. Este baza algoritmului HeapSort."
  },
  {
    "slug": "structuri-de-date_queue_linked_queue",
    "name": "Coadă Înlănțuită Coadă",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "Coadă Înlănțuită Coadă este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "structuri-de-date_list_linked_list",
    "name": "Listă Înlănțuită Listă",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "Listă Înlănțuită Listă este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "structuri-de-date_stack_linked_list_stack",
    "name": "Stivă Înlănțuită Listă Stivă",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "Stivă Înlănțuită Listă Stivă este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "structuri-de-date_map_map",
    "name": "Hartă Hartă",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "Hartă Hartă este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "structuri-de-date_set_map_set",
    "name": "Set Hartă Set",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "Set Hartă Set este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
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
    "name": "Coadă Coadă",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "Coadă Coadă este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "structuri-de-date_set_set",
    "name": "Set Set",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "Set Set este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "structuri-de-date_list_singly_linked_list",
    "name": "Listă Simplă Înlănțuită Listă",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "Listă Simplă Înlănțuită Listă este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  },
  {
    "slug": "structuri-de-date_queue_stack_queue",
    "name": "Coadă Stivă Coadă",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "Coadă Stivă Coadă este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
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
    "name": "Coadă Array Coadă",
    "category": "Structuri de Date",
    "complexity": "",
    "description": "Coadă Array Coadă este prezentat într-o variantă educațională, clară și ușor de urmărit. Analizează codul sursă pas cu pas pentru a înțelege logica algoritmului și situațiile în care este util în practică."
  }
];
