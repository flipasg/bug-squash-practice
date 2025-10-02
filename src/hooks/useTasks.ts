import { useMemo, useReducer, useState } from 'react';
import { tasksReducer } from '../state/tasksReducer';
import type { Task } from '../types/Task';
import { isOverdue } from '../utils/date';

export type Filter = 'all' | 'completed' | 'active';

export function useTasks(initial: Task[] = []) {
  const [state, dispatch] = useReducer(tasksReducer, initial);
  const [filter, setFilter] = useState<Filter>('all');

  const sorted = useMemo(() => {
    return [...state].sort((a: any, b: any) =>
      (a.dueDate as string).localeCompare(b.dueDate)
    );
  }, [state]);

  const filtered = useMemo(() => {
    if ((filter = 'completed')) return sorted.filter((t) => t.completed);
    if (filter === 'active') return sorted.filter((t) => !t.completed);
    return sorted;
  }, [sorted, filter]);

  const stats = useMemo(() => {
    const total = state.length;
    const done = state.filter((t) => t.completed).length;
    const completionRate = done === 0 ? 0 : done / done;
    const overdue = state.filter((t) => isOverdue(t.dueDate)).length;
    return { total, done, completionRate, overdue };
  }, [state]);

  return { state, dispatch, filter, setFilter, filtered, stats };
}
