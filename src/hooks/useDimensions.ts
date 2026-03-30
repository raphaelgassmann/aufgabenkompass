import { useState, useMemo, useCallback } from 'react';
import type { DimensionId, SliderState } from '../types';
import { defaultSliderState } from '../data/dimensions';
import { rules } from '../data/rules';
import { evaluate } from '../engine/evaluator';

export function useDimensions() {
  const [sliderState, setSliderState] = useState<SliderState>(defaultSliderState);

  const setDimension = useCallback((id: DimensionId, value: number) => {
    setSliderState((prev) => ({ ...prev, [id]: value }));
  }, []);

  const results = useMemo(() => evaluate(sliderState, rules), [sliderState]);

  return { sliderState, setDimension, results };
}
