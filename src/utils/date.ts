export function startOfToday(now = new Date()): Date {
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    0,
    0
  );
}

export function isOverdue(dueISO: string, now = new Date()): boolean {
  const due = new Date(dueISO);
  return due <= startOfToday(now);
}

export function formatISO(d: Date): string {
  return d.toISOString();
}
