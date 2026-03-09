"use client";

import { LightBulbIcon } from "@primer/octicons-react";
import { AlgorithmMeta } from "@lib/algorithm-meta";

type SuggestedQuestionsProps = {
  meta: AlgorithmMeta;
  currentStepIndex: number;
  hasTrace: boolean;
  onSelectQuestion: (question: string) => void;
};

// Algorithm comparisons mapping
const ALGORITHM_COMPARISONS: Record<string, string> = {
  "sortare-bule": "sortare rapidă",
  "sortare-rapida": "sortare cu bule",
  "cautare-binara": "căutare liniară",
  "parcurgere-latime": "parcurgere în adâncime (DFS)",
  "dijkstra": "Bellman-Ford",
};

export function SuggestedQuestions({ meta, currentStepIndex, hasTrace, onSelectQuestion }: SuggestedQuestionsProps) {
  const questions: string[] = [];

  // General question about the algorithm
  questions.push(`Ce face algoritmul ${meta.name} și când se folosește?`);

  // Complexity question
  questions.push(
    `De ce ${meta.name} are complexitatea ${meta.timeComplexity.average}? Când este mai rapid decât alternativele?`
  );

  // Current step question (only if there's a trace and we're in progress)
  if (hasTrace && currentStepIndex >= 0) {
    questions.push(`Ce se întâmplă exact la pasul ${currentStepIndex + 1}?`);
  }

  // Comparison question (if we have a known comparison)
  const comparisonAlgo = ALGORITHM_COMPARISONS[meta.slug];
  if (comparisonAlgo) {
    questions.push(`Care este diferența dintre ${meta.name} și ${comparisonAlgo}?`);
  } else {
    // Generic comparison question
    questions.push(`În ce situații ${meta.name} este mai eficient decât alte algoritmi?`);
  }

  // Take only first 3 questions
  const displayQuestions = questions.slice(0, 3);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <LightBulbIcon size={14} />
        <span>Întrebări sugerate</span>
      </div>
      <div className="flex flex-col gap-2">
        {displayQuestions.map((question, idx) => (
          <button
            key={idx}
            onClick={() => onSelectQuestion(question)}
            className="text-left text-xs bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-700 px-3 py-2 rounded-lg border border-slate-200 hover:border-sky-300 transition-all"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
