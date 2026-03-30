import type { SliderState, Rule, EvaluationResult } from '../types';

export function evaluate(
  sliderState: SliderState,
  rules: Rule[]
): EvaluationResult[] {
  return rules.map((rule) => {
    let totalWeight = 0;
    let matchedWeight = 0;

    for (const condition of rule.conditions) {
      totalWeight += condition.weight;
      const currentValue = sliderState[condition.dimensionId];
      if (condition.acceptedValues.includes(currentValue)) {
        matchedWeight += condition.weight;
      }
    }

    const score = totalWeight > 0 ? matchedWeight / totalWeight : 0;

    return {
      taskTypeId: rule.taskTypeId,
      score,
      isMatch: score >= 0.6,
    };
  });
}
