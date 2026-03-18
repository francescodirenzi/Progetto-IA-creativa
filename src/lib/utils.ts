export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function roundToStep(value: number, step: number) {
  const inv = 1 / step;
  return Math.round(value * inv) / inv;
}

export function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

