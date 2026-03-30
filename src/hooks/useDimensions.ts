import { useState, useMemo, useCallback, useEffect } from 'react';
import type { DimensionId, SliderState, Rule } from '../types';
import { defaultSliderState } from '../data/dimensions';
import { rules as defaultRules } from '../data/rules';
import { evaluate } from '../engine/evaluator';

const STORAGE_KEY_SLIDERS = 'aufgabenkompass-sliders';
const STORAGE_KEY_RULES = 'aufgabenkompass-rules';

function loadSliders(): SliderState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_SLIDERS);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultSliderState;
}

function loadRules(): Rule[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_RULES);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultRules;
}

export function useDimensions() {
  const [sliderState, setSliderState] = useState<SliderState>(loadSliders);
  const [rules, setRules] = useState<Rule[]>(loadRules);

  const setDimension = useCallback((id: DimensionId, value: number) => {
    setSliderState((prev) => ({ ...prev, [id]: value }));
  }, []);

  const resetRules = useCallback(() => {
    setRules(defaultRules);
    localStorage.removeItem(STORAGE_KEY_RULES);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SLIDERS, JSON.stringify(sliderState));
  }, [sliderState]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_RULES, JSON.stringify(rules));
  }, [rules]);

  const results = useMemo(() => evaluate(sliderState, rules), [sliderState, rules]);

  return { sliderState, setDimension, results, rules, setRules, resetRules };
}
