export function toDateOnlyStr(d: string | undefined): string {
  if (!d) return '';
  try {
    const date = new Date(d);
    return date.toISOString().split('T')[0];
  } catch {
    return d.slice(0, 10);
  }
}

export function getTodayStr(): string {
  return new Date().toISOString().split('T')[0];
}
