export type DimensionId =
  | 'wissensart'
  | 'kognitiverProzess'
  | 'wissenseinheiten'
  | 'offenheit'
  | 'lebensweltbezug'
  | 'sprachlogischeKomplexitaet'
  | 'repraesentationsformen';

export interface DimensionStop {
  value: number;
  label: string;
}

export interface DimensionDef {
  id: DimensionId;
  label: string;
  rightLabel: string;
  description: string;
  stops: DimensionStop[];
}

export type SliderState = Record<DimensionId, number>;

export type TaskCategory =
  | 'zweck'
  | 'evta'
  | 'lukas'
  | 'offenheit'
  | 'transfer'
  | 'repraesentation';

export interface TaskType {
  id: string;
  category: TaskCategory;
  label: string;
  description: string;
  parentId?: string;
}

export interface DimensionCondition {
  dimensionId: DimensionId;
  acceptedValues: number[];
  weight: number;
}

export interface Rule {
  taskTypeId: string;
  conditions: DimensionCondition[];
}

export interface EvaluationResult {
  taskTypeId: string;
  score: number;
  isMatch: boolean;
}
