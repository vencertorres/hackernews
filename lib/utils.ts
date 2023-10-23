export function pluralize(n: number, s: string) {
  return n > 1 ? `${n} ${s}s` : `${n} ${s}`;
}
