import type { EvaluationResult, TaskCategory } from '../types';
import { taskTypes, categoryLabels } from '../data/taskTypes';

interface Props {
  results: EvaluationResult[];
}

const categoryOrder: TaskCategory[] = [
  'zweck',
  'evta',
  'lukas',
  'offenheit',
  'transfer',
  'repraesentation',
];

const categoryStyles: Record<
  TaskCategory,
  { dot: string; matchBg: string; matchBorder: string; matchText: string; accent: string }
> = {
  zweck: {
    dot: 'bg-blue-500',
    matchBg: 'bg-blue-50',
    matchBorder: 'border-blue-200',
    matchText: 'text-blue-800',
    accent: 'bg-blue-500',
  },
  evta: {
    dot: 'bg-emerald-500',
    matchBg: 'bg-emerald-50',
    matchBorder: 'border-emerald-200',
    matchText: 'text-emerald-800',
    accent: 'bg-emerald-500',
  },
  lukas: {
    dot: 'bg-teal-500',
    matchBg: 'bg-teal-50',
    matchBorder: 'border-teal-200',
    matchText: 'text-teal-800',
    accent: 'bg-teal-500',
  },
  offenheit: {
    dot: 'bg-amber-500',
    matchBg: 'bg-amber-50',
    matchBorder: 'border-amber-200',
    matchText: 'text-amber-800',
    accent: 'bg-amber-500',
  },
  transfer: {
    dot: 'bg-purple-500',
    matchBg: 'bg-purple-50',
    matchBorder: 'border-purple-200',
    matchText: 'text-purple-800',
    accent: 'bg-purple-500',
  },
  repraesentation: {
    dot: 'bg-rose-500',
    matchBg: 'bg-rose-50',
    matchBorder: 'border-rose-200',
    matchText: 'text-rose-800',
    accent: 'bg-rose-500',
  },
};

export function ResultPanel({ results }: Props) {
  const resultMap = new Map(results.map((r) => [r.taskTypeId, r]));

  return (
    <div className="space-y-4" role="region" aria-label="Empfohlene Aufgabentypen" aria-live="polite">
      <h2 className="text-lg font-bold text-gray-800">Empfohlene Aufgabentypen</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categoryOrder.map((cat) => {
          const style = categoryStyles[cat];
          const allItems = taskTypes.filter((t) => t.category === cat);
          const topLevel = allItems.filter((t) => !t.parentId);
          const subItems = allItems.filter((t) => !!t.parentId);

          const matchedTop = topLevel.filter(
            (t) => resultMap.get(t.id)?.isMatch
          );
          const unmatchedTop = topLevel.filter(
            (t) => !resultMap.get(t.id)?.isMatch
          );
          const matchedSub = subItems.filter(
            (t) => resultMap.get(t.id)?.isMatch
          );

          const hasAnyMatch = matchedTop.length > 0 || matchedSub.length > 0;

          return (
            <div
              key={cat}
              className={`rounded-xl border p-4 transition-all duration-300 ${
                hasAnyMatch
                  ? `${style.matchBg} ${style.matchBorder}`
                  : 'bg-gray-50 border-gray-100'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
                <h3
                  className={`text-xs font-bold uppercase tracking-wider ${
                    hasAnyMatch ? 'text-gray-600' : 'text-gray-300'
                  }`}
                >
                  {categoryLabels[cat]}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {matchedTop.map((t) => {
                  const score = resultMap.get(t.id)?.score ?? 0;
                  const pct = Math.round(score * 100);
                  return (
                    <div key={t.id} className="group relative">
                      <span
                        className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold border ${style.matchBorder} ${style.matchText} shadow-sm overflow-hidden`}
                      >
                        <span
                          className={`absolute inset-0 ${style.accent} opacity-15 transition-all duration-500`}
                          style={{ width: `${pct}%` }}
                        />
                        <span className="relative">{t.label}</span>
                        <span className="relative text-xs font-medium opacity-70">
                          {pct}%
                        </span>
                      </span>
                      <div
                        role="tooltip"
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20"
                      >
                        {t.description}
                      </div>
                    </div>
                  );
                })}

                {matchedSub.map((t) => {
                  const score = resultMap.get(t.id)?.score ?? 0;
                  const pct = Math.round(score * 100);
                  return (
                    <div key={t.id} className="group relative">
                      <span
                        className={`relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${style.matchBorder} ${style.matchText} overflow-hidden`}
                      >
                        <span
                          className={`absolute inset-0 ${style.accent} opacity-10 transition-all duration-500`}
                          style={{ width: `${pct}%` }}
                        />
                        <span className="relative">{t.label}</span>
                        <span className="relative opacity-60">{pct}%</span>
                      </span>
                      <div
                        role="tooltip"
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20"
                      >
                        {t.description}
                      </div>
                    </div>
                  );
                })}
              </div>

              {unmatchedTop.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-gray-200/50">
                  <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                    {unmatchedTop.map((t) => (
                      <span
                        key={t.id}
                        className="text-xs text-gray-300 line-through decoration-gray-200"
                      >
                        {t.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
