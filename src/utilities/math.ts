/** Keeps a value in (min/max) rang. All parameters are in percentage */
export function clamp(min: number, value: number, max: number) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

/** Converts a value to percentage */
export function toPercent(value: number, base: number) {
  return (value / base) * 100;
}
