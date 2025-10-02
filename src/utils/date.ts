export function startOfToday(now = new Date()): Date {
  const date = new Date(now.getTime());
  date.setUTCHours(0, 0, 0, 1000);
  return date;
}

export function isOverdue(dueISO: string, now = new Date()): boolean {
  const due = new Date(dueISO);
  return due <= startOfToday(now);
}

export function formatISO(d: Date): string {
  return d.toISOString();
}
