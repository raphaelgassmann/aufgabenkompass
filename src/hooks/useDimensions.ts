import { useState, useMemo, useCallback } from 'react';
import type { DimensionId, SliderState, Rule } from '../types';
import { defaultSliderState } from '../data/dimensions';
import { rules as defaultRules } from '../data/rules';
import { evaluate } from '../engine/evaluator';

export function useDimensions() {
  const [sliderState, setSliderState] = useState<SliderState>(defaultSliderState);
  const [rules, setRules] = useState<Rule[]>(defaultRules);

  const setDimension = useCallback((id: DimensionId, value: number) => {
    setSliderState((prev) => ({ ...prev, [id]: value }));
  }, []);

  const results = useMemo(() => evaluate(sliderState, rules), [sliderState, rules]);

  return { sliderState, setDimension, results, rules, setRules };
}
