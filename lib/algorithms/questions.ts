export const ALGORITHM_QUESTIONS: Record<string, string[]> = {
  // Backtracking
  backtracking_generateparentheses: [
    "De ce complexitatea de timp este legată de numerele lui Catalan?",
    "Cum funcționează backtracking-ul pentru a valida parantezele?",
    "Care sunt regulile de adăugare a parantezelor deschise vs închise?"
  ],
  backtracking_all_combinations_of_size_k: [
    "Cum se optimizează generarea pentru a evita duplicarea combinărilor?",
    "Care este diferența dintre permutări și combinări din punct de vedere computațional?",
    "De ce complexitatea spațială este O(k)?"
  ],

  // Cifrare
  cifru_xor_cipher: [
    "De ce aplicarea repetată a XOR cu aceeași cheie decriptează textul?",
    "Cât de sigur este cifrul XOR împotriva analizei de frecvență?",
    "Ce este un 'One-Time Pad' și cum se leagă de cifrul XOR?"
  ],

  // Căutare
  cautare_binarySearch: [
    "De ce trebuie ca tabloul să fie obligatoriu sortat pentru a folosi căutarea binară?",
    "Cum se previne depășirea de memorie (integer overflow) la calcularea mijlocului?",
    "De ce este complexitatea de timp exact O(log n)?"
  ],
  cautare_exponential_search: [
    "Când este căutarea exponențială mai eficientă decât cea binară simplă?",
    "Cum se folosește căutarea exponențială pe structuri de date de dimensiune necunoscută?",
    "Care este rolul primei faze a algoritmului (găsirea limitelor)?"
  ],
  cautare_fibonacci_search: [
    "De ce folosește acest algoritm numerele lui Fibonacci pentru divizarea intervalului?",
    "Care sunt avantajele căutării Fibonacci în sistemele cu acces lent la memorie?",
    "Cum se compară eficiența sa cu căutarea binară clasică?"
  ],
  cautare_linear_search: [
    "De ce este căutarea liniară preferată pentru tablouri nesortate mici?",
    "Care este complexitatea de timp în cel mai rău caz și în cazul mediu?",
    "Cum putem optimiza căutarea liniară (de exemplu, prin transpoziție)?"
  ],
  cautare_interpolation_search: [
    "De ce este căutarea prin interpolare mai rapidă (O(log log n)) pe date uniform distribuite?",
    "Ce se întâmplă dacă distribuția datelor nu este uniformă?",
    "Cum funcționează formula de estimare a poziției?"
  ],
  cautare_jump_search: [
    "De ce dimensiunea optimă a saltului este exact rădăcina pătrată din n?",
    "Cum se compară căutarea prin salturi cu cea liniară și binară?",
    "De ce necesită ca elementele să fie sortate?"
  ],
  cautare_sentinel_search: [
    "Cum reduce santinela numărul de comparații din bucla principală?",
    "Ce reprezintă santinela și unde este plasată în tablou?",
    "Este complexitatea asimptotică diferită de cea a căutării liniare clasice?"
  ],

  // Diverse
  diverse_is_sorted_array: [
    "Cum putem verifica dacă un tablou este sortat într-o singură trecere?",
    "Cum se extinde algoritmul pentru a verifica sortarea descrescătoare sau cu duplicate?",
    "Care este complexitatea asimptotică în cel mai bun caz?"
  ],
  diverse_parse_nested_brackets: [
    "Cum ajută o stivă la determinarea validității parantezelor imbricate?",
    "Ce se întâmplă când parantezele nu sunt închise corect?",
    "Cum funcționează algoritmul pe șiruri care conțin și alte caractere?"
  ],
  diverse_shuffle_array: [
    "De ce algoritmul Fisher-Yates garantează o amestecare uniformă (nepărtinitoare)?",
    "Cum se diferențiază amestecarea corectă de una naivă (cu swap-uri aleatorii)?",
    "Care este complexitatea de timp a algoritmului Fisher-Yates?"
  ],

  // Grafuri
  grafuri_bellman_ford: [
    "Cum detectează algoritmul Bellman-Ford ciclurile de cost negativ?",
    "De ce are Bellman-Ford complexitatea O(V*E) față de O((V+E)log V) la Dijkstra?",
    "Câte relaxări de muchii sunt necesare în total și de ce?"
  ],
  grafuri_dijkstra: [
    "De ce nu funcționează algoritmul lui Dijkstra pe grafuri cu costuri negative?",
    "Cum optimizează o coadă de priorități (Min-Heap) pașii algoritmului?",
    "Care este diferența dintre Dijkstra și algoritmul A*?"
  ],
  grafuri_bipartite_graph: [
    "Ce este un graf bipartit și cum se poate colora în 2 culori?",
    "Cum se folosește parcurgerea BFS sau DFS pentru verificarea bipartiției?",
    "Ce legătură are un ciclu de lungime impară cu bipartirea grafului?"
  ],
  grafuri_edmonds_karp: [
    "De ce folosește Edmonds-Karp parcurgerea BFS în loc de DFS pentru drumurile de augmentare?",
    "Cum garantează Edmonds-Karp terminarea algoritmului pe capacități reale?",
    "Care este complexitatea de timp a algoritmului Edmonds-Karp?"
  ],
  grafuri_floyd_warshall: [
    "Cum funcționează principiul programării dinamice în Floyd-Warshall?",
    "De ce are algoritmul complexitatea O(V^3) și cum stochează drumurile?",
    "Cum detectează Floyd-Warshall ciclurile negative pe diagonala matricei?"
  ],
  grafuri_johnson: [
    "De ce folosește algoritmul lui Johnson tehnica de reponderare a muchiilor?",
    "Cum combină Johnson algoritmii Bellman-Ford și Dijkstra pentru drumuri minime?",
    "Când este algoritmul lui Johnson mai rapid decât Floyd-Warshall?"
  ],
  grafuri_kosaraju: [
    "De ce necesită algoritmul transpunerea (inversarea) muchiilor grafului?",
    "Cum garantează cele două parcurgeri DFS identificarea componentelor tare conexe?",
    "Care este complexitatea de timp și spațiu a algoritmului?"
  ],
  grafuri_kruskal: [
    "De ce necesită algoritmul lui Kruskal sortarea muchiilor crescător după cost?",
    "Cum ajută structura Disjoint Set (Union-Find) la detectarea ciclurilor?",
    "Care este complexitatea de timp a algoritmului Kruskal?"
  ],
  grafuri_dfs: [
    "Cum funcționează stiva recursivă în parcurgerea în adâncime?",
    "Care sunt aplicațiile practice ale DFS (ex. sortare topologică)?",
    "Cum se clasifică muchiile în timpul unei parcurgeri DFS (tree, back, forward, cross)?"
  ],
  grafuri_bfs: [
    "De ce parcurgerea în lățime folosește o coadă (FIFO) în loc de stivă?",
    "Cum garantează BFS găsirea celui mai scurt drum în grafuri neponderate?",
    "Care este complexitatea de timp și spațiu a BFS?"
  ],
  grafuri_prim: [
    "Care este diferența conceptuală dintre algoritmul lui Prim și cel al lui Kruskal?",
    "Cum se extinde arborele parțial de cost minim pas cu pas în Prim?",
    "De ce este Prim mai eficient pe grafuri dense în comparație cu Kruskal?"
  ],
  grafuri_tarjan: [
    "Cum folosește Tarjan indicii de ordine și valorile 'low' pentru a găsi componentele tare conexe?",
    "De ce este algoritmul lui Tarjan mai eficient decât Kosaraju în practică?",
    "Cum funcționează stiva de noduri în timpul parcurgerii DFS din algoritm?"
  ],

  // Manipulare Biți
  "manipulare-biti_add_binary": [
    "Cum se simulează bit cu bit operația de transport (carry) în baza 2?",
    "Cum putem aduna două numere binare folosind doar operatori pe biți (XOR, AND, shift)?",
    "De ce este complexitatea de timp proporțională cu lungimea șirurilor?"
  ],
  "manipulare-biti_log_two": [
    "Cum calculează deplasarea la dreapta (`>>`) partea întreagă a logaritmului?",
    "Cum putem optimiza logaritmul în baza 2 folosind căutarea binară pe biți?",
    "Care sunt cazurile excepționale (de exemplu, log(0))?"
  ],
  "manipulare-biti_is_power_of_2": [
    "De ce funcționează expresia de verificare bitwise `n & (n - 1) == 0`?",
    "Cum se tratează valorile mai mici sau egale cu 0 în această verificare?",
    "De ce are această verificare o complexitate de timp de O(1)?"
  ],
  "manipulare-biti_is_power_of_4": [
    "De ce o putere a lui 4 trebuie să fie mai întâi o putere a lui 2?",
    "Cum ajută masca hexazecimală `0x55555555` la validarea puterilor lui 4?",
    "Ce alte metode matematice sau bitwise există pentru această verificare?"
  ],

  // Matematică
  matematica_absolute_value: [
    "Ce reprezintă geometric valoarea absolută (modulul) pe axa numerelor?",
    "De ce este importantă determinarea semnului numărului în acest calcul?",
    "Cum se scrie funcția modul fără a folosi instrucțiuni condiționale (if)?"
  ],
  matematica_aliquot_sum: [
    "Ce este o sumă Aliquot și cum se calculează divizorii proprii ai unui număr?",
    "Cum se clasifică numerele în funcție de suma Aliquot (perfecte, deficiente, abundente)?",
    "Cum putem optimiza găsirea divizorilor până la radicalul din N?"
  ],
  matematica_armstrong_number: [
    "Ce proprietate matematică deosebită definește un număr Armstrong (narcisist)?",
    "Cum se determină eficient numărul de cifre ale unui număr natural?",
    "Care sunt toate numerele Armstrong de 3 cifre existente în baza 10?"
  ],
  matematica_binary_convert: [
    "Cum funcționează metoda împărțirilor succesive la 2 pentru conversia în binar?",
    "Cum se face conversia inversă din binar în zecimal folosind ponderi?",
    "Ce este reprezentarea în complement față de 2 pentru numere negative?"
  ],
  matematica_binomial_coefficient: [
    "Cum ne ajută triunghiul lui Pascal la calcularea rapidă a coeficienților binomiali?",
    "De ce formula directă cu factoriale poate duce la depășiri (overflow) de memorie?",
    "Cum putem optimiza spațiul folosit la programarea dinamică pentru coeficienți?"
  ],
  matematica_calculate_mean: [
    "Cum se definește media aritmetică a unui set de date și unde se folosește?",
    "De ce media aritmetică este sensibilă la valori extreme (outliers)?",
    "Cum se calculează media ponderată și când este ea necesară?"
  ],
  matematica_calculate_median: [
    "Cum se determină mediana unui set de date și de ce este importantă sortarea prealabilă?",
    "Care este diferența dintre calcularea medianei pentru un număr par vs impar de elemente?",
    "De ce este mediana un indicator de tendință centrală mai robust decât media?"
  ],
  matematica_degrees_to_radians: [
    "Care este relația matematică exactă dintre grade și radiani?",
    "De ce se folosesc radianii ca unitate standard în analizele matematice și fizice?",
    "Cum se reprezintă constanta PI cu acuratețe maximă în programare?"
  ],
  matematica_digit_sum: [
    "Cum se extrage fiecare cifră a unui număr prin operații aritmetice (împărțire și modulo)?",
    "Ce reprezintă rădăcina digitală a unui număr și cum se calculează în O(1)?",
    "De ce este suma cifrelor utilă în criteriile de divizibilitate (cu 3 și 9)?"
  ],
  matematica_double_factorial_iterative: [
    "Care este diferența dintre factorialul dublu (n!!) și factorialul clasic (n!)?",
    "Cum diferă calculul factorialului dublu pentru numere pare vs impare?",
    "Care sunt aplicațiile practice ale factorialului dublu în combinatorică?"
  ],
  matematica_euler_totient: [
    "Ce calculează funcția Totient (phi) a lui Euler pentru un număr întreg N?",
    "Cum simplifică factorizarea în numere prime calculul funcției phi?",
    "Care este rolul funcției Totient a lui Euler în algoritmul de criptare RSA?"
  ],
  matematica_factorial: [
    "Cum se definește recursiv și iterativ factorialul unui număr?",
    "De ce crește funcția factorial atât de rapid și cum se evită depășirea tipurilor de date?",
    "Care este complexitatea de timp și spațiu pentru versiunea recursivă?"
  ],
  matematica_factors: [
    "De ce este suficient să căutăm divizorii unui număr N doar până la rădăcina sa pătrată?",
    "Care este diferența dintre un divizor propriu și unul impropriu?",
    "Cum putem folosi divizorii pentru a determina dacă un număr este prim?"
  ],
  matematica_fibonacci: [
    "Cum se generează șirul lui Fibonacci și care este relația lui cu Proporția de Aur?",
    "De ce implementarea recursivă simplă are o complexitate exponențială O(2^n)?",
    "Cum putem calcula al N-lea termen în O(log N) folosind ridicarea la putere a matricilor?"
  ],
  matematica_find_min: [
    "Cum se determină elementul minim dintr-un tablou neordonat?",
    "De ce este complexitatea de timp O(n) inevitabilă pentru tablouri neordonate?",
    "Cum putem găsi simultan minimul și maximul dintr-un tablou cu mai puține comparații?"
  ],
  matematica_gaussian_elimination: [
    "Cum funcționează metoda eliminării gaussiene pentru rezolvarea sistemelor de ecuații liniare?",
    "Ce reprezintă operația de 'pivotare' și de ce este crucială pentru stabilitatea numerică?",
    "Ce se întâmplă dacă determinantul matricei sistemului este zero?"
  ],
  matematica_greatest_common_factor: [
    "De ce este algoritmul lui Euclid atât de rapid și cum se demonstrează eficiența lui?",
    "Cum funcționează varianta bazată pe scăderi repetate față de restul împărțirii?",
    "Cum putem calcula cel mai mare divizor comun pentru trei sau mai multe numere?"
  ],
  matematica_hamming_distance: [
    "Ce măsoară distanța Hamming între două șiruri de aceeași lungime?",
    "Cum se folosește operația XOR pe biți pentru a calcula distanța Hamming rapid?",
    "Unde se aplică distanța Hamming în codurile de detectare și corectare a erorilor?"
  ],
  matematica_series_hexagonal_numbers: [
    "Ce formulă matematică definește numerele hexagonale din această serie?",
    "Cum putem verifica dacă un număr dat este hexagonal utilizând ecuații de gradul doi?",
    "Care este relația dintre numerele hexagonale și alte numere poligonale (ex. triunghiulare)?"
  ],
  matematica_is_divisible: [
    "Cum funcționează operatorul modulo (%) în determinarea divizibilității?",
    "Cum putem verifica divizibilitatea cu numere mari fără a efectua împărțirea propriu-zisă?",
    "De ce diviziunea la zero aruncă o excepție în majoritatea limbajelor de programare?"
  ],
  matematica_is_even: [
    "Cum se verifică dacă un număr este par folosind operația bitwise AND (`n & 1`)?",
    "De ce este verificarea bitwise mai rapidă decât operatorul modulo (`n % 2 == 0`)?",
    "Cum se comportă numerele negative în această verificare?"
  ],
  matematica_is_leap_year: [
    "Care sunt regulile exacte ale calendarului gregorian pentru stabilirea anilor bisecți?",
    "De ce anii divizibili cu 100 nu sunt bisecți, dar cei divizibili cu 400 sunt bisecți?",
    "Cum influențează existența anilor bisecți acuratețea măsurării timpului?"
  ],
  matematica_is_odd: [
    "De ce ultimul bit al oricărui număr impar este întotdeauna 1 în binar?",
    "Care este complexitatea de timp pentru testul bitwise de număr impar?",
    "Ce se întâmplă la testarea numărului zero?"
  ],
  matematica_is_palindrome: [
    "Cum putem verifica dacă un număr este palindrom fără a-l converti în șir de caractere?",
    "Cum se construiește oglinditul unui număr prin înmulțire și împărțire repetată cu 10?",
    "Se pot aplica aceleași concepte și pentru numere scrise în alte baze?"
  ],
  matematica_is_square_free: [
    "Ce reprezintă un număr liber de pătrate ('square-free')?",
    "Cum ne ajută factorizarea în numere prime pentru a verifica dacă un număr este liber de pătrate?",
    "De ce numerele prime sunt întotdeauna libere de pătrate?"
  ],
  matematica_juggler_sequence: [
    "Cum se definesc termenii din secvența Juggler folosind radicali?",
    "Ce este ipoteza de convergență pentru secvențele Juggler?",
    "De ce valorile din această secvență pot atinge cifre foarte mari înainte de a coborî la 1?"
  ],
  matematica_lowest_common_multiple: [
    "Care este relația matematică fundamentală între CMMMC și CMMDC pentru două numere?",
    "Cum se extinde algoritmul de calcul al CMMMC pentru un tablou întreg de numere?",
    "Cum se poate calcula CMMMC prin factorizare în numere prime?"
  ],
  matematica_matrix_multiplication: [
    "Care sunt regulile de compatibilitate pentru înmulțirea a două matrici?",
    "De ce algoritmul naiv de înmulțire are complexitatea O(n^3) și cum se realizează el?",
    "Ce este algoritmul lui Strassen și cum îmbunătățește el complexitatea de timp?"
  ],
  matematica_number_of_digits: [
    "Cum putem afla numărul de cifre al unui întreg în O(1) folosind logaritmul în baza 10?",
    "Cum funcționează metoda iterativă prin împărțire la 10?",
    "Cum se tratează numărul zero și numerele negative în acest algoritm?"
  ],
  matematica_pascals_triangle: [
    "Cum se generează triunghiul lui Pascal nivel cu nivel?",
    "Ce legătură directă au elementele din triunghi cu coeficienții binomiali?",
    "Cum putem optimiza spațiul de memorie pentru a returna doar ultimul rând generated?"
  ],
  matematica_perfect_cube: [
    "Cum verificăm dacă un număr este cub perfect utilizând funcții de radical?",
    "De ce pot apărea erori de rotunjire la utilizarea funcției pow() și cum le evităm?",
    "Care este legătura dintre cuburile perfecte și sumele de numere impare consecutive?"
  ],
  matematica_perfect_number: [
    "Ce proprietate deosebită definește un număr perfect în raport cu divizorii săi?",
    "Care este formula lui Euclid-Euler pentru generarea numerelor perfecte pare?",
    "Există numere perfecte impare? Ce știe matematica modernă despre asta?"
  ],
  matematica_perfect_square: [
    "De ce un pătrat perfect în baza 10 se poate termina doar în cifrele 0, 1, 4, 5, 6 sau 9?",
    "Cum se poate folosi căutarea binară pentru a verifica dacă un număr este pătrat perfect?",
    "Care este cel mai rapid mod de a face această verificare fără radicali?"
  ],
  matematica_prime_factorization: [
    "De ce orice număr întreg mai mare decât 1 se poate scrie în mod unic ca produs de numere prime?",
    "Cum funcționează algoritmul de factorizare prin împărțiri succesive începând de la 2?",
    "Cum ne ajută Ciurul lui Eratostene pentru a accelera factorizarea pe multiple interogări?"
  ],
  matematica_primes: [
    "Ce este un număr prim și de ce 1 nu este considerat prim în matematica modernă?",
    "Cum funcționează testul naiv de primalitate cu complexitatea O(√n)?",
    "Ce teste probabilistice (de exemplu, Miller-Rabin) se folosesc pentru numere foarte mari?"
  ],
  matematica_pronic_number: [
    "Ce este un număr pronic (sau oblong) și cum se definește el ca produs?",
    "Cum se verifică dacă un număr este pronic rezolvând o ecuație sau folosind radicali?",
    "Care este legătura dintre numerele pronice și pătratele perfecte?"
  ],
  matematica_radians_to_degrees: [
    "Cum se efectuează conversia din radiani în grade în mod matematic?",
    "De ce este importantă corectarea unghiurilor pentru a se încadra în intervalul [0, 360)?",
    "Cum se reprezintă constanta 180 / PI în cod pentru a asigura precizia?"
  ],
  matematica_sieve_of_eratosthenes: [
    "De ce se oprește marcarea multiplilor la rădăcina pătrată a numărului maxim?",
    "Care este diferența de performanță între Ciur și testarea individuală a fiecărui număr?",
    "Cum funcționează varianta segmentată a Ciurului lui Eratostene pentru numere mari?"
  ],
  matematica_signum: [
    "Ce face funcția Signum (sgn) și care sunt cele trei valori pe care le poate returna?",
    "Cum se scrie o implementare compactă a funcției Signum în Javascript în O(1)?",
    "Unde se utilizează funcția signum în algoritmii de fizică sau geometrie computațională?"
  ],
  matematica_square_root: [
    "Cum funcționează metoda lui Newton (sau babiloniană) pentru calcularea radicalului?",
    "De ce converge metoda lui Newton extrem de rapid (convergență pătratică)?",
    "Cum putem calcula radicalul întreg folosind căutarea binară?"
  ],
  matematica_ugly_numbers: [
    "Ce sunt numerele 'Ugly' (urâte) și ce factori primi au voie să aibă?",
    "Cum se folosește programarea dinamică pentru a genera al N-lea număr Ugly?",
    "Cum se verifică dacă un număr specific este Ugly prin împărțiri succesive la 2, 3 și 5?"
  ],
  matematica_zellers_congruence: [
    "Cum calculează formula lui Zeller ziua săptămânii pentru orice dată calendaristică?",
    "De ce ianuarie și februarie sunt considerate lunile 13 și 14 ale anului precedent?",
    "Cum tratează formula anii bisecți și schimbările dintre calendarul iulian și gregorian?"
  ],

  // Programare Dinamică
  "programare-dinamica_lcs": [
    "Ce reprezintă cel mai lung subșir comun (LCS) și unde se aplică în practică?",
    "Cum se construiește matricea DP pentru LCS și care este regula de tranziție?",
    "Cum putem reconstitui subșirul propriu-zis mergând înapoi prin matricea DP?"
  ],
  "programare-dinamica_coin_change": [
    "Cum se formulează subproblema în problema schimbului de monede?",
    "Care este diferența dintre aflarea numărului minim de monede și determinarea tuturor combinărilor posibile?",
    "De ce abordarea lacomă (greedy) nu garantează soluția optimă pentru orice sistem de monede?"
  ],
  "programare-dinamica_knapsack": [
    "Care este diferența dintre problema rucsacului 0-1 și problema rucsacului fracționar?",
    "Cum se completează tabela DP și ce reprezintă stările sale (greutate vs valoare)?",
    "Cum se poate reduce complexitatea spațială a tabelului DP la un singur vector unidimensional?"
  ],

  // Sortare
  sortare_tree_sort: [
    "Cum funcționează sortarea prin arbori (Tree Sort) utilizând un arbore binar de căutare (BST)?",
    "De ce parcurgerea în inordine (in-order) a BST produce elementele în ordine sortată?",
    "Ce se întâmplă cu complexitatea de timp dacă arborele devine dezechilibrat (linie)?"
  ],
  sortare_bogo_sort: [
    "De ce este Bogo Sort considerat cel mai ineficient algoritm de sortare?",
    "Cum funcționează algoritmul (amestecare aleatorie repetată până la sortare)?",
    "Care este complexitatea medie și cea în cel mai rău caz (care este infinită)?"
  ],
  sortare_counting_sort: [
    "De ce este Counting Sort un algoritm de sortare stabil și fără comparații?",
    "Când este recomandat Counting Sort și care sunt limitările legate de plaja de valori?",
    "Cum se folosește vectorul de frecvențe pentru a calcula pozițiile finale ale elementelor?"
  ],
  sortare_cycle_sort: [
    "De ce este Cycle Sort optim din punct de vedere al numărului de scrieri în memorie?",
    "Cum funcționează conceptul de 'ciclu' de permutări în Cycle Sort?",
    "Care sunt aplicațiile practice unde Cycle Sort este preferat datorită uzurii hardware?"
  ],
  sortare_gnome_sort: [
    "De ce este Gnome Sort comparat cu modul în care un pitic de grădină aranjează ghivecele?",
    "Cum se aseamănă Gnome Sort cu Insertion Sort ca mod de funcționare?",
    "Care este complexitatea în cel mai rău caz și în cel mai bun caz?"
  ],
  sortare_heap_sort: [
    "Cum folosește Heap Sort structura de date Max-Heap pentru a sorta tabloul?",
    "De ce este Heap Sort garantat O(n log n) în cel mai rău caz, spre deosebire de Quick Sort?",
    "Ce este procesul de 'heapify' și cum se construiește heap-ul inițial în O(n)?"
  ],
  sortare_quick_select: [
    "Ce problemă rezolvă algoritmul Quick Select în timp liniar mediu?",
    "Cum folosește Quick Select tehnica de partitionare din Quick Sort?",
    "De ce necesită explorarea unei singure părți a partiției, spre deosebire de Quick Sort?"
  ],
  sortare_shell_sort: [
    "Cum îmbunătățește Shell Sort algoritmul Insertion Sort prin sortarea la distanțe (gap)?",
    "Cum influențează alegerea secvenței de distanțe complexitatea asimptotică a algoritmului?",
    "Ce se întâmplă când distanța (gap) ajunge la valoarea 1?"
  ],
  sortare_quickSort: [
    "Cum influențează alegerea pivotului performanța algoritmului Quick Sort?",
    "Cum se poate evita cel mai defavorabil caz de complexitate O(n^2)?",
    "De ce este Quick Sort adesea mai rapid în practică decât Merge Sort?"
  ],
  sortare_mergeSort: [
    "Cum aplică Merge Sort paradigma 'Divide et Impera' pentru a sorta tabloul?",
    "De ce este Merge Sort un algoritm stabil și care este complexitatea sa spațială?",
    "Cum funcționează operația de interclasare (merge) a două sub-tablouri deja sortate?"
  ],
  sortare_bubbleSort: [
    "De ce este Bubble Sort considerat ineficient pentru seturi mari de date?",
    "Cum ajută fanionul 'swapped' la oprirea timpurie a algoritmului?",
    "Care este cel mai bun caz ca timp și când se întâmplă el?"
  ],
  sortare_swap_sort: [
    "Ce înseamnă sortare prin interschimbare directă și prin ce se diferențiază de Bubble Sort?",
    "De ce are complexitatea de timp O(n^2) și cum funcționează buclele sale?",
    "Este Swap Sort un algoritm stabil?"
  ],
  sortare_insertionSort: [
    "Cum simulează Insertion Sort aranjarea cărților de joc în mână?",
    "De ce este Insertion Sort extrem de rapid pe tablouri aproape sortate (O(n))?",
    "Cum funcționează deplasarea elementelor pentru a face loc noului element inserat?"
  ],
  sortare_selectionSort: [
    "Cum funcționează selecția repetată a minimului în Selection Sort?",
    "De ce Selection Sort face întotdeauna același număr de comparații, indiferent de sortarea inițială?",
    "Care este numărul maxim de interschimbări (swap-uri) efectuate de Selection Sort?"
  ],

  // Structuri de Date
  "structuri-de-date_tree_binary_search_tree": [
    "Ce proprietate structurală definește un arbore binar de căutare (BST)?",
    "Cum variază complexitatea operațiilor pe un BST echilibrat vs unul degenerat?",
    "Cum funcționează parcurgerea în inordine (in-order) pentru a obține valorile sortate?"
  ],
  "structuri-de-date_queue_circular_queue": [
    "De ce este coada circulară mai eficientă din punct de vedere al utilizării memoriei decât o coadă simplă pe tablou?",
    "Cum funcționează aritmetica modulară pentru a roti indicii front și rear?",
    "Cum se face distincția dintre starea de coadă goală și coadă plină?"
  ],
  "structuri-de-date_list_doubly_linked_list": [
    "Care este avantajul listei dublu înlănțuite față de cea simplu înlănțuită?",
    "Cum se modifică legăturile pointerilor (next și prev) la inserarea unui nod nou?",
    "Care este costul suplimentar de memorie pentru stocarea legăturilor bidirecționale?"
  ],
  "structuri-de-date_map_hash_map": [
    "Cum funcționează o funcție de dispersie (hash function) în maparea cheilor pe indici?",
    "Cum se rezolvă coliziunile în hash maps (adresare deschisă vs înlănțuire directă)?",
    "De ce operațiile au o complexitate medie de O(1), dar în cel mai rău caz pot deveni O(n)?"
  ],
  "structuri-de-date_set_hash_map_set": [
    "Cum folosește o mulțime (Set) structura Hash Map la nivel intern?",
    "De ce elementele unei mulțimi sunt unice și cum se verifică prezența în O(1)?",
    "Care este complexitatea de timp pentru operațiile de intersecție și reuniune?"
  ],
  "structuri-de-date_heap_heap": [
    "Care sunt regulile structurale și de ordine ale unui heap (Max-Heap sau Min-Heap)?",
    "Cum se stochează un heap binar complet într-un tablou fără a folosi pointeri?",
    "Cum funcționează operațiile de inserare și ștergere a rădăcinii în O(log n)?"
  ],
  "structuri-de-date_queue_linked_queue": [
    "Cum elimină implementarea cozii prin listă înlănțuită limitarea dimensiunii maxime?",
    "Cum se actualizează pointerii front și rear la operațiile de enqueue și dequeue?",
    "De ce toate operațiile pe coadă înlănțuită sunt garantate în timp O(1)?"
  ],
  "structuri-de-date_list_linked_list": [
    "Ce reprezintă un nod într-o listă înlănțuită și ce conține el?",
    "Cum se parcurge o listă înlănțuită pentru a găsi un element (complexitate O(n))?",
    "Cum se inserează sau se șterge un nod din interiorul listei?"
  ],
  "structuri-de-date_stack_linked_list_stack": [
    "Cum se implementează o stivă folosind o listă înlănțuită?",
    "De ce operațiile PUSH și POP se fac la începutul listei pentru eficiență O(1)?",
    "Cum se previne fenomenul de stack underflow?"
  ],
  "structuri-de-date_map_map": [
    "Ce reprezintă structura de tip Map (Dicționar) și cum asociază cheile cu valori?",
    "Care este diferența dintre un Map ordonat (bazat pe arbori) și unul neordonat (hash map)?",
    "Cum se parcurg toate perechile cheie-valoare din structură?"
  ],
  "structuri-de-date_set_map_set": [
    "Cum se utilizează un Map ordonat (Red-Black Tree) pentru a implementa o mulțime?",
    "Care sunt avantajele păstrării elementelor sortate într-o mulțime?",
    "Care este complexitatea operațiilor de căutare, inserare și ștergere (O(log n))?"
  ],
  "structuri-de-date_disjoint_set_disjoint_set": [
    "Ce problemă rezolvă structura de date Disjoint Set (Union-Find)?",
    "Cum funcționează optimizările de tip 'Reuniune după rang' și 'Compresia căii'?",
    "De ce este complexitatea operațiilor aproape constantă (funcția inversă Ackermann)?"
  ],
  "structuri-de-date_queue_queue": [
    "Cum se definește principiul FIFO (First-In, First-Out) al cozii?",
    "Ce operații de bază definește o coadă și unde este folosită în sisteme?",
    "Ce este un buffer circular și cum previne mutarea elementelor în memorie?"
  ],
  "structuri-de-date_set_set": [
    "Ce operații pe mulțimi matematice implementează structura Set?",
    "Cum se evită adăugarea duplicatelor într-o mulțime?",
    "Care este diferența dintre un Set și o Listă din punct de vedere al căutării?"
  ],
  "structuri-de-date_list_singly_linked_list": [
    "Cum funcționează o listă simplu înlănțuită în memorie?",
    "De ce nu putem parcurge o listă simplu înlănțuită în sens invers?",
    "Cum se șterge ultimul nod al listei și de ce necesită timp O(n)?"
  ],
  "structuri-de-date_queue_stack_queue": [
    "Cum se poate implementa o coadă folosind două stive?",
    "Care este costul amortizat al operațiilor într-o coadă bazată pe două stive?",
    "De ce este această abordare un exercițiu clasic de design algoritmic?"
  ],
  "structuri-de-date_stack_stack": [
    "Cum se definește principiul LIFO (Last-In, First-Out) al stivei?",
    "Unde se folosește stiva în rularea programelor (Call Stack)?",
    "Care sunt complexitățile operațiilor PUSH, POP și PEEK?"
  ],
  "structuri-de-date_tries_tries": [
    "Ce este un arbore Trie (arbore de prefixe) și unde este utilizat (ex. auto-complete)?",
    "Cum se reprezintă nodurile și legăturile de caractere într-un Trie?",
    "De ce este căutarea unui cuvânt dependentă doar de lungimea cuvântului, nu de numărul de cuvinte?"
  ],
  "structuri-de-date_queue_array_queue": [
    "Cum se implementează o coadă pe un simplu tablou?",
    "De ce operația de dequeue pe tablou simplu poate necesita deplasarea tuturor elementelor (O(n))?",
    "Cum putem optimiza acest lucru folosind doi indici (front și rear)?"
  ]
};
