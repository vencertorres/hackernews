export function pluralize(n: number, s: string) {
  return n > 1 ? `${n} ${s}s` : `${n} ${s}`;
}

export function getDomain(url: string) {
  return url ? new URL(url).host.replace(/^www\./, "") : "";
}
