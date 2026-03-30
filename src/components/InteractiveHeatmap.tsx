import { useState, useCallback } from 'react';
import type { DimensionId, Rule } from '../types';
import { dimensions } from '../data/dimensions';
import { taskTypes } from '../data/taskTypes';

interface Props {
  rules: Rule[];
  onRulesChange: (rules: Rule[]) => void;
}

const dimensionLabels: Record<DimensionId, string> = {
  wissensart: 'Wissensart',
  kognitiverProzess: 'Kogn. Prozess',
  wissenseinheiten: 'Wissenseinh.',
  offenheit: 'Offenheit',
  lebensweltbezug: 'Lebensweltbez.',
  sprachlogischeKomplexitaet: 'Sprache',
  repraesentationsformen: 'Repräsent.',
};

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  zweck: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  evta: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  lukas: { bg: 'bg-teal-100', text: 'text-teal-700', dot: 'bg-teal-500' },
  offenheit: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  transfer: { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
  repraesentation: { bg: 'bg-rose-100', text: 'text-rose-700', dot: 'bg-rose-500' },
};

const dimIds: DimensionId[] = dimensions.map((d) => d.id);

function getAcceptedLabel(dimId: DimensionId, values: number[]): string {
  const dim = dimensions.find((d) => d.id === dimId);
  if (!dim) return '';
  if (values.length === 1) return dim.stops[values[0]]?.label ?? '';
  const sorted = [...values].sort();
  const first = dim.stops[sorted[0]]?.label ?? '';
  const last = dim.stops[sorted[sorted.length - 1]]?.label ?? '';
  // Shorten labels
  const shorten = (s: string) =>
    s.length > 12 ? s.slice(0, 10) + '.' : s;
  return `${shorten(first)}–${shorten(last)}`;
}

function weightToOpacity(w: number): number {
  if (w === 0) return 0;
  return 0.15 + w * 0.85;
}

export function InteractiveHeatmap({ rules, onRulesChange }: Props) {
  const [editingCell, setEditingCell] = useState<{
    taskId: string;
    dimId: DimensionId;
  } | null>(null);
  const [editWeight, setEditWeight] = useState('');
  const [editValues, setEditValues] = useState<number[]>([]);

  const getCondition = useCallback(
    (taskId: string, dimId: DimensionId) => {
      const rule = rules.find((r) => r.taskTypeId === taskId);
      if (!rule) return null;
      return rule.conditions.find((c) => c.dimensionId === dimId) ?? null;
    },
    [rules]
  );

  const startEdit = (taskId: string, dimId: DimensionId) => {
    const cond = getCondition(taskId, dimId);
    setEditingCell({ taskId, dimId });
    setEditWeight(cond ? String(cond.weight) : '0');
    setEditValues(cond ? [...cond.acceptedValues] : []);
  };

  const saveEdit = () => {
    if (!editingCell) return;
    const { taskId, dimId } = editingCell;
    const newWeight = parseFloat(editWeight);

    const newRules = rules.map((rule) => {
      if (rule.taskTypeId !== taskId) return rule;
      const existingIdx = rule.conditions.findIndex(
        (c) => c.dimensionId === dimId
      );

      if (newWeight === 0 || editValues.length === 0) {
        // Remove condition
        return {
          ...rule,
          conditions: rule.conditions.filter((c) => c.dimensionId !== dimId),
        };
      }

      const newCondition = {
        dimensionId: dimId,
        acceptedValues: editValues,
        weight: newWeight,
      };

      if (existingIdx >= 0) {
        const newConditions = [...rule.conditions];
        newConditions[existingIdx] = newCondition;
        return { ...rule, conditions: newConditions };
      }

      return { ...rule, conditions: [...rule.conditions, newCondition] };
    });

    onRulesChange(newRules);
    setEditingCell(null);
  };

  const toggleValue = (v: number) => {
    setEditValues((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v].sort()
    );
  };

  // Order task types to match the R diagram
  const orderedTaskTypes = taskTypes;

  return (
    <div className="overflow-x-auto">
      <p className="text-xs text-gray-400 mb-3">
        Klicke auf eine Zelle, um das Gewicht und die akzeptierten Stufen zu
        ändern. Bedingungen sind UND-verknüpft. Match ab ≥60%.
      </p>

      <table className="w-full border-collapse text-xs">
        <thead>
          <tr>
            <th className="text-left p-1.5 w-40 text-gray-500 font-medium">
              Aufgabentyp
            </th>
            {dimIds.map((dimId) => (
              <th
                key={dimId}
                className="p-1.5 text-gray-500 font-medium text-center min-w-[90px]"
              >
                {dimensionLabels[dimId]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orderedTaskTypes.map((task) => {
            const colors = categoryColors[task.category];
            const isSubType = !!task.parentId;

            return (
              <tr key={task.id} className="group">
                <td className="p-1.5 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${colors.dot}`}
                    />
                    <span
                      className={`${colors.text} ${
                        isSubType
                          ? 'pl-2 font-normal italic'
                          : 'font-semibold'
                      }`}
                    >
                      {task.label}
                    </span>
                  </div>
                </td>
                {dimIds.map((dimId) => {
                  const cond = getCondition(task.id, dimId);
                  const isEditing =
                    editingCell?.taskId === task.id &&
                    editingCell?.dimId === dimId;

                  if (isEditing) {
                    const dim = dimensions.find((d) => d.id === dimId)!;
                    return (
                      <td
                        key={dimId}
                        className="p-0 border-t border-gray-100 relative"
                      >
                        <div className="absolute z-30 left-1/2 top-0 -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-xl p-3 w-56">
                          <div className="text-xs font-semibold text-gray-700 mb-2">
                            {task.label} × {dimensionLabels[dimId]}
                          </div>

                          <label className="text-xs text-gray-500 block mb-1">
                            Gewicht
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={editWeight}
                            onChange={(e) => setEditWeight(e.target.value)}
                            className="w-full mb-1 accent-emerald-500"
                          />
                          <div className="text-center text-xs font-mono text-gray-600 mb-3">
                            {parseFloat(editWeight).toFixed(1)}
                          </div>

                          <label className="text-xs text-gray-500 block mb-1">
                            Akzeptierte Stufen
                          </label>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {dim.stops.map((stop) => (
                              <button
                                key={stop.value}
                                onClick={() => toggleValue(stop.value)}
                                className={`px-2 py-0.5 rounded text-xs border transition-colors ${
                                  editValues.includes(stop.value)
                                    ? 'bg-emerald-500 text-white border-emerald-500'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                {stop.label}
                              </button>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={saveEdit}
                              className="flex-1 px-2 py-1 bg-emerald-500 text-white rounded text-xs font-medium hover:bg-emerald-600"
                            >
                              Speichern
                            </button>
                            <button
                              onClick={() => setEditingCell(null)}
                              className="flex-1 px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium hover:bg-gray-200"
                            >
                              Abbrechen
                            </button>
                          </div>
                        </div>
                        <div className="h-10 bg-emerald-100 border-2 border-emerald-400 rounded" />
                      </td>
                    );
                  }

                  return (
                    <td
                      key={dimId}
                      className="p-0.5 border-t border-gray-100"
                    >
                      <button
                        onClick={() => startEdit(task.id, dimId)}
                        className="w-full h-10 rounded relative overflow-hidden transition-all hover:ring-2 hover:ring-emerald-300 cursor-pointer"
                        style={{
                          backgroundColor: cond
                            ? `rgba(5, 150, 105, ${weightToOpacity(cond.weight)})`
                            : 'rgb(249, 250, 251)',
                        }}
                      >
                        {cond && (
                          <>
                            <span
                              className={`block text-xs font-bold leading-tight ${
                                cond.weight >= 0.8
                                  ? 'text-white'
                                  : 'text-gray-700'
                              }`}
                            >
                              {cond.weight.toFixed(1)}
                            </span>
                            <span
                              className={`block leading-tight ${
                                cond.weight >= 0.8
                                  ? 'text-white/80'
                                  : 'text-gray-400'
                              }`}
                              style={{ fontSize: '9px' }}
                            >
                              {getAcceptedLabel(
                                cond.dimensionId,
                                cond.acceptedValues
                              )}
                            </span>
                          </>
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
