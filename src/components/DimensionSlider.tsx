import * as Slider from '@radix-ui/react-slider';
import { Info } from 'lucide-react';
import type { DimensionDef } from '../types';

interface Props {
  dimension: DimensionDef;
  value: number;
  onChange: (value: number) => void;
}

export function DimensionSlider({ dimension, value, onChange }: Props) {
  const max = dimension.stops.length - 1;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-baseline mb-2">
        <label className="text-sm font-semibold text-gray-700">
          {dimension.label}
        </label>
        <span className="group/info relative inline-flex items-center gap-1 text-xs text-emerald-600 font-medium cursor-help">
          {dimension.rightLabel}
          <Info className="w-3.5 h-3.5 text-emerald-400" />
          <span className="absolute right-0 bottom-full mb-2 w-64 px-3 py-2 bg-gray-800 text-white text-xs leading-relaxed rounded-lg opacity-0 group-hover/info:opacity-100 transition-opacity pointer-events-none z-20 text-left font-normal">
            {dimension.description}
          </span>
        </span>
      </div>

      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={[value]}
        min={0}
        max={max}
        step={1}
        onValueChange={([v]) => onChange(v)}
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
          <Slider.Range className="absolute bg-emerald-500 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-emerald-500 rounded-full shadow-md hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors cursor-grab active:cursor-grabbing" />
      </Slider.Root>

      <div className="flex justify-between mt-1">
        {dimension.stops.map((stop) => (
          <span
            key={stop.value}
            className={`text-xs transition-colors ${
              stop.value === value
                ? 'text-emerald-700 font-semibold'
                : 'text-gray-400'
            }`}
            style={{
              width: `${100 / dimension.stops.length}%`,
              textAlign:
                stop.value === 0
                  ? 'left'
                  : stop.value === max
                    ? 'right'
                    : 'center',
            }}
          >
            {stop.label}
          </span>
        ))}
      </div>
    </div>
  );
}
