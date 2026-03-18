import { Tooltip } from "./Tooltip";
import { EditableNumber } from "./EditableNumber";
import { clamp, roundToStep } from "../lib/utils";

type Props = {
  label: string;
  description: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (next: number) => void;
  format?: (n: number) => string;
};

export function ParamSlider({
  label,
  description,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: Props) {
  const v = clamp(value, min, max);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
      <div className="flex items-start justify-between gap-3">
        <Tooltip label={label} content={description} />
        <EditableNumber
          value={v}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          format={format}
        />
      </div>

      <div className="mt-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={v}
          onChange={(e) => onChange(roundToStep(Number(e.target.value), step))}
          className="w-full accent-indigo-500"
          aria-label={label}
        />
        <div className="mt-2 flex justify-between text-[11px] tabular-nums text-zinc-400">
          <span>{format ? format(min) : min}</span>
          <span>{format ? format(max) : max}</span>
        </div>
      </div>
    </div>
  );
}

