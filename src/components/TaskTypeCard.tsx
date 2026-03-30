import type { TaskType } from '../types';

interface Props {
  taskType: TaskType;
  score: number;
  isMatch: boolean;
}

export function TaskTypeCard({ taskType, score, isMatch }: Props) {
  const isSubType = !!taskType.parentId;

  return (
    <div
      className={`rounded-lg border p-3 transition-all duration-300 ${
        isSubType ? 'ml-4' : ''
      } ${
        isMatch
          ? 'bg-emerald-50 border-emerald-200 shadow-sm'
          : 'bg-gray-50 border-gray-100 opacity-40'
      }`}
    >
      <div className="flex items-center justify-between">
        <h4
          className={`text-sm font-semibold ${
            isMatch ? 'text-emerald-800' : 'text-gray-400'
          }`}
        >
          {taskType.label}
        </h4>
        {isMatch && (
          <div className="flex items-center gap-1">
            <div className="h-1.5 w-12 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.round(score * 100)}%` }}
              />
            </div>
            <span className="text-xs text-emerald-600 font-medium w-8 text-right">
              {Math.round(score * 100)}%
            </span>
          </div>
        )}
      </div>
      <p
        className={`text-xs mt-1 ${
          isMatch ? 'text-emerald-600' : 'text-gray-300'
        }`}
      >
        {taskType.description}
      </p>
    </div>
  );
}
