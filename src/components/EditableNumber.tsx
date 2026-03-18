import { useEffect, useMemo, useRef, useState } from "react";
import { clamp, roundToStep } from "../lib/utils";

type Props = {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (next: number) => void;
  format?: (n: number) => string;
};

export function EditableNumber({
  value,
  min,
  max,
  step,
  onChange,
  format,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<string>(String(value));
  const inputRef = useRef<HTMLInputElement | null>(null);
  const id = useMemo(
    () => `num-${Math.random().toString(16).slice(2)}`,
    [],
  );

  useEffect(() => {
    if (!editing) setDraft(String(value));
  }, [value, editing]);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  function commit(raw: string) {
    const parsed = Number(raw);
    if (Number.isFinite(parsed)) {
      const next = roundToStep(clamp(parsed, min, max), step);
      onChange(next);
      setDraft(String(next));
      return;
    }
    setDraft(String(value));
  }

  if (!editing) {
    return (
      <button
        type="button"
        className="rounded-md border border-zinc-800 bg-zinc-950/40 px-2 py-1 text-xs tabular-nums text-zinc-100 hover:bg-zinc-900/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Modifica valore numerico"
        onClick={() => setEditing(true)}
      >
        {format ? format(value) : value}
      </button>
    );
  }

  return (
    <input
      id={id}
      ref={inputRef}
      type="number"
      inputMode="decimal"
      className="w-20 rounded-md border border-zinc-800 bg-zinc-950/40 px-2 py-1 text-xs tabular-nums text-zinc-100 outline-none focus:ring-2 focus:ring-indigo-500"
      min={min}
      max={max}
      step={step}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => {
        commit(draft);
        setEditing(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          commit(draft);
          setEditing(false);
        }
        if (e.key === "Escape") {
          e.preventDefault();
          setDraft(String(value));
          setEditing(false);
        }
      }}
    />
  );
}

