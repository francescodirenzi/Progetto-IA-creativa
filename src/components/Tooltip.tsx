import { useMemo, useState } from "react";
import { Info } from "lucide-react";

type Props = {
  content: string;
  label: string;
};

export function Tooltip({ content, label }: Props) {
  const [open, setOpen] = useState(false);
  const id = useMemo(
    () => `tip-${Math.random().toString(16).slice(2)}`,
    [],
  );

  return (
    <span className="relative inline-flex items-center gap-2">
      <span className="text-sm font-medium text-zinc-100">{label}</span>
      <button
        type="button"
        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950/40 text-zinc-300 hover:bg-zinc-900/60 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label={`Info: ${label}`}
        aria-describedby={open ? id : undefined}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <Info className="h-4 w-4" />
      </button>

      {open ? (
        <div
          id={id}
          role="tooltip"
          className="absolute left-0 top-full z-20 mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-xs leading-relaxed text-zinc-200 shadow-xl"
        >
          {content}
        </div>
      ) : null}
    </span>
  );
}

