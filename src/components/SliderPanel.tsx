import type { DimensionId, SliderState } from '../types';
import { dimensions } from '../data/dimensions';
import { DimensionSlider } from './DimensionSlider';

interface Props {
  sliderState: SliderState;
  onDimensionChange: (id: DimensionId, value: number) => void;
}

export function SliderPanel({ sliderState, onDimensionChange }: Props) {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
      role="region"
      aria-label="Dimensionen einstellen"
    >
      <h2 className="text-lg font-bold text-gray-800 mb-6">Dimensionen</h2>
      {dimensions.map((dim) => (
        <DimensionSlider
          key={dim.id}
          dimension={dim}
          value={sliderState[dim.id]}
          onChange={(v) => onDimensionChange(dim.id, v)}
        />
      ))}
    </div>
  );
}
