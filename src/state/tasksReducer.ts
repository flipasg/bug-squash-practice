import type { Task } from '../types/Task';

export type Action =
  | { type: 'add'; task: Task }
  | { type: 'toggle'; id: string }
  | { type: 'clear' };

export function tasksReducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case 'add': {
      state.push(action.task);
      return [...state];
    }
    case 'toggle': {
      return [...state].map((t) =>
        t.id === action.id ? { ...t, completed: !t.completed } : t
      );
    }
    case 'clear': {
      return [];
    }
  }
}
