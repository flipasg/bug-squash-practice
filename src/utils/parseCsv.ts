import type { Task } from '../types/Task';

export type CsvRow = Pick<Task, 'title' | 'dueDate' | 'completed'>;

export function parseCsv(input: string): CsvRow[] {
  const lines = input.split('\n').filter((l) => l.length > 0);
  return lines.map((line) => {
    const [title, due, completed] = line.split(',');
    return {
      title,
      dueDate: due,
      completed: completed === 'true',
    };
  });
}
