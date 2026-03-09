"use client";

import { useState } from "react";
import { CheckCircleIcon, XCircleIcon, LightBulbIcon } from "@primer/octicons-react";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

interface AlgorithmQuizProps {
  algorithmSlug: string;
  currentStep?: number;
  onComplete?: (score: number) => void;
}

// Quiz database pentru fiecare algoritm
const QUIZ_DATA: Record<string, QuizQuestion[]> = {
  sortare_bule: [
    {
      id: "sb_1",
      question: "Care este complexitatea în cazul cel mai rău pentru Bubble Sort?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(2^n)"],
      correctAnswer: 2,
      explanation: "Bubble Sort compară fiecare element cu toate celelalte, rezultând O(n²) în cazul cel mai rău.",
      difficulty: "easy"
    },
    {
      id: "sb_2",
      question: "Când Bubble Sort are performanță O(n)?",
      options: [
        "Când array-ul este sortat descrescător",
        "Când array-ul este deja sortat",
        "Când array-ul are elemente duplicate",
        "Niciodată"
      ],
      correctAnswer: 1,
      explanation: "Când array-ul este deja sortat, Bubble Sort face o singură trecere fără swap-uri.",
      difficulty: "medium"
    },
    {
      id: "sb_3",
      question: "Bubble Sort este un algoritm stabil?",
      options: [
        "Da, păstrează ordinea relativă a elementelor egale",
        "Nu, schimbă ordinea elementelor egale",
        "Depinde de implementare",
        "Doar pentru array-uri mici"
      ],
      correctAnswer: 0,
      explanation: "Bubble Sort este stabil pentru că swap-urile păstrează ordinea relativă a elementelor egale.",
      difficulty: "hard"
    }
  ],
  sortare_rapida: [
    {
      id: "sr_1",
      question: "Care este elementul cheie în Quick Sort?",
      options: ["Minimum", "Maximum", "Pivot", "Median"],
      correctAnswer: 2,
      explanation: "Pivotul este elementul în jurul căruia se partiționează array-ul.",
      difficulty: "easy"
    },
    {
      id: "sr_2",
      question: "Care este complexitatea medie a Quick Sort?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      correctAnswer: 1,
      explanation: "Quick Sort are complexitate O(n log n) în medie, datorită partiționării eficiente.",
      difficulty: "medium"
    },
    {
      id: "sr_3",
      question: "Când Quick Sort are performanță O(n²)?",
      options: [
        "Când pivotul este ales random",
        "Când pivotul este mereu cel mai mic/mare element",
        "Când array-ul are multe duplicate",
        "Niciodată"
      ],
      correctAnswer: 1,
      explanation: "Când pivotul este mereu extrema, partiționarea este dezechilibrată, rezultând O(n²).",
      difficulty: "hard"
    }
  ],
  cautare_binara: [
    {
      id: "cb_1",
      question: "Binary Search funcționează doar pe array-uri:",
      options: ["Mari", "Mici", "Sortate", "Nesortate"],
      correctAnswer: 2,
      explanation: "Binary Search necesită array-ul să fie sortat pentru a funcționa corect.",
      difficulty: "easy"
    },
    {
      id: "cb_2",
      question: "Care este complexitatea Binary Search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correctAnswer: 1,
      explanation: "Binary Search înjumătățește spațiul de căutare la fiecare pas, rezultând O(log n).",
      difficulty: "medium"
    }
  ],  sortare_insertie: [
    {
      id: "si_1",
      question: "Insertion Sort construiește secvența sortată:",
      options: [
        "De la mijloc spre margini",
        "De la stânga la dreapta, inserând fiecare element",
        "De la dreapta la stânga",
        "Random"
      ],
      correctAnswer: 1,
      explanation: "Insertion Sort construiește incremental partea sortată de la stânga, inserând fiecare nou element la poziția corectă.",
      difficulty: "easy"
    },
    {
      id: "si_2",
      question: "Când Insertion Sort este cel mai rapid?",
      options: [
        "Când array-ul este sortat descrescător",
        "Când array-ul este deja sortat crescător",
        "Când elementele sunt random",
        "Pentru array-uri foarte mari"
      ],
      correctAnswer: 1,
      explanation: "Pentru array-uri deja sortate, Insertion Sort face doar O(n) comparații fără mutări, rezultând complexitate O(n).",
      difficulty: "medium"
    },
    {
      id: "si_3",
      question: "Insertion Sort este folosit în Timsort pentru:",
      options: [
        "Segmente mari (>64 elemente)",
        "Segmente mici (<64 elemente)",
        "Nu este folosit deloc",
        "Doar pentru merge"
      ],
      correctAnswer: 1,
      explanation: "Timsort (algoritmul de sortare din Python) folosește Insertion Sort pentru segmente mici, unde este foarte eficient.",
      difficulty: "hard"
    }
  ],
  selection_sort: [
    {
      id: "ss_1",
      question: "Selection Sort găsește în fiecare iterație:",
      options: [
        "Elementul maxim",
        "Elementul minim din partea nesortată",
        "Elementul median",
        "Elementul de pe mijloc"
      ],
      correctAnswer: 1,
      explanation: "Selection Sort găsește mereu elementul minim din partea nesortată și îl plasează la sfârșitul părții sortate.",
      difficulty: "easy"
    },
    {
      id: "ss_2",
      question: "Care este avantajul principal al Selection Sort?",
      options: [
        "Este cel mai rapid pentru array-uri mari",
        "Face maxim n-1 swap-uri (util când swap-ul e costisitor)",
        "Este adaptiv (rapid pentru date sortate)",
        "Este stabil"
      ],
      correctAnswer: 1,
      explanation: "Selection Sort face maxim n-1 swap-uri, indiferent de input, fiind util când operația de swap este costisitoare.",
      difficulty: "medium"
    },
    {
      id: "ss_3",
      question: "Selection Sort este un algoritm stabil?",
      options: [
        "Da, mereu",
        "Nu, poate schimba ordinea elementelor egale",
        "Depinde de implementare",
        "Doar pentru array-uri mici"
      ],
      correctAnswer: 1,
      explanation: "Selection Sort este nestabil pentru că swap-urile pe distanțe lungi pot schimba ordinea relativă a elementelor egale.",
      difficulty: "hard"
    }
  ],  dijkstra: [
    {
      id: "dj_1",
      question: "Ce tip de graf necesită algoritmul Dijkstra?",
      options: [
        "Graf cu muchii negative",
        "Graf cu muchii pozitive",
        "Graf neponderat",
        "Graf ciclic"
      ],
      correctAnswer: 1,
      explanation: "Dijkstra funcționează doar pentru grafuri cu muchii pozitive.",
      difficulty: "easy"
    },
    {
      id: "dj_2",
      question: "Ce structură de date optimizează Dijkstra?",
      options: ["Stack", "Queue", "Priority Queue (Min Heap)", "Hash Map"],
      correctAnswer: 2,
      explanation: "Priority Queue permite accesul rapid la nodul cu distanța minimă.",
      difficulty: "medium"
    }
  ],
  parcurgere_latime: [
    {
      id: "pl_1",
      question: "Ce structură de date folosește BFS?",
      options: ["Stack", "Queue", "Heap", "Tree"],
      correctAnswer: 1,
      explanation: "BFS folosește o coadă (FIFO) pentru a vizita nodurile nivel cu nivel.",
      difficulty: "easy"
    },
    {
      id: "pl_2",
      question: "BFS găsește cel mai scurt drum în grafuri:",
      options: [
        "Ponderate",
        "Nepondere sau cu muchii de cost egal",
        "Cu muchii negative",
        "Aciclice"
      ],
      correctAnswer: 1,
      explanation: "BFS garantează cel mai scurt drum în grafuri nepondere sau cu cost uniform.",
      difficulty: "medium"
    }  ],
  parcurgere_adancime: [
    {
      id: "dfs_1",
      question: "Ce structură de date folosește DFS?",
      options: ["Queue", "Stack (LIFO)", "Heap", "Hash Map"],
      correctAnswer: 1,
      explanation: "DFS folosește un stack (LIFO - Last In First Out) pentru a explora în adâncime și a face backtracking.",
      difficulty: "easy"
    },
    {
      id: "dfs_2",
      question: "DFS garantează găsirea celui mai scurt drum?",
      options: [
        "Da, întotdeauna",
        "Nu, găsește un drum oarecare",
        "Doar în grafuri ponderate",
        "Doar în arbori"
      ],
      correctAnswer: 1,
      explanation: "DFS explorează în adâncime și găsește UN drum, dar nu garantează că e cel mai scurt. Folosește BFS pentru shortest path.",
      difficulty: "medium"
    },
    {
      id: "dfs_3",
      question: "DFS este folositor pentru:",
      options: [
        "Găsirea celui mai scurt drum",
        "Detectarea ciclurilor și sortarea topologică",
        "Procesarea pe nivele",
        "Shortest path în grafuri ponderate"
      ],
      correctAnswer: 1,
      explanation: "DFS este ideal pentru detectarea ciclurilor, sortare topologică, și găsirea componentelor conexe.",
      difficulty: "hard"
    }  ]
};

export default function AlgorithmQuiz({ algorithmSlug, currentStep, onComplete }: AlgorithmQuizProps) {
  const questions = QUIZ_DATA[algorithmSlug] || [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());
  const [quizComplete, setQuizComplete] = useState(false);

  if (questions.length === 0) {
    return (
      <div className="card text-center py-8">
        <LightBulbIcon size={32} className="mx-auto text-amber-500 mb-3" />
        <p className="text-sm text-slate-600">Quiz-uri vor fi disponibile în curând pentru acest algoritm!</p>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return; // Nu permite schimbarea după afișarea explicației
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setShowExplanation(true);
    
    if (!answeredQuestions.has(question.id) && isCorrect) {
      setScore(score + 1);
      setAnsweredQuestions(new Set([...answeredQuestions, question.id]));
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
      if (onComplete) {
        onComplete(score);
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions(new Set());
    setQuizComplete(false);
  };

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="card text-center space-y-4">
        <div className="text-4xl">
          {percentage >= 80 ? "🎉" : percentage >= 60 ? "👍" : "💪"}
        </div>
        <h3 className="text-xl font-bold text-slate-900">Quiz completat!</h3>
        <div className="text-3xl font-bold text-sky-600">
          {score} / {questions.length}
        </div>
        <p className="text-sm text-slate-600">
          {percentage >= 80 ? "Excelent! Ai înțeles foarte bine algoritmul!" :
           percentage >= 60 ? "Bine făcut! Mai citește documentația pentru a îmbunătăți." :
           "Continuă să studiezi! Încearcă din nou după ce revezi algoritmul."}
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={handleRestart}
            className="px-4 py-2 bg-sky-500 text-white rounded-lg font-semibold hover:bg-sky-600 transition-colors"
          >
            Încearcă din nou
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <LightBulbIcon size={20} className="text-amber-500" />
          <h3 className="font-semibold text-slate-900">Mini Challenge</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
            question.difficulty === "easy" ? "bg-emerald-100 text-emerald-700" :
            question.difficulty === "medium" ? "bg-amber-100 text-amber-700" :
            "bg-red-100 text-red-700"
          }`}>
            {question.difficulty === "easy" ? "Ușor" :
             question.difficulty === "medium" ? "Mediu" : "Greu"}
          </span>
          <span className="text-xs font-mono text-slate-500">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>
      </div>

      {/* Question */}
      <div>
        <p className="text-base font-semibold text-slate-900 mb-4">{question.question}</p>
        
        {/* Options */}
        <div className="space-y-2">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === question.correctAnswer;
            const showCorrect = showExplanation && isCorrectOption;
            const showIncorrect = showExplanation && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  showCorrect
                    ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                    : showIncorrect
                    ? "border-red-500 bg-red-50 text-red-900"
                    : isSelected
                    ? "border-sky-500 bg-sky-50 text-sky-900"
                    : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-slate-50"
                } ${showExplanation ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{option}</span>
                  {showCorrect && <CheckCircleIcon size={20} className="text-emerald-600" />}
                  {showIncorrect && <XCircleIcon size={20} className="text-red-600" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className={`rounded-lg p-4 border-2 ${
          isCorrect
            ? "bg-emerald-50 border-emerald-200"
            : "bg-amber-50 border-amber-200"
        }`}>
          <div className="flex items-start gap-2">
            {isCorrect ? (
              <CheckCircleIcon size={20} className="text-emerald-600 mt-0.5" />
            ) : (
              <LightBulbIcon size={20} className="text-amber-600 mt-0.5" />
            )}
            <div>
              <p className={`text-sm font-semibold mb-1 ${
                isCorrect ? "text-emerald-900" : "text-amber-900"
              }`}>
                {isCorrect ? "Corect!" : "Nu e corect"}
              </p>
              <p className={`text-sm ${
                isCorrect ? "text-emerald-700" : "text-amber-700"
              }`}>
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        {!showExplanation ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md"
          >
            Verifică răspunsul
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 px-4 py-2.5 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-500 transition-colors shadow-sm hover:shadow-md"
          >
            {currentQuestion < questions.length - 1 ? "Următoarea întrebare" : "Vezi rezultatul"}
          </button>
        )}
      </div>

      {/* Score */}
      <div className="text-center pt-2 border-t border-slate-200">
        <p className="text-xs text-slate-500">
          Scor curent: <span className="font-semibold text-sky-600">{score}</span> / {questions.length}
        </p>
      </div>
    </div>
  );
}
