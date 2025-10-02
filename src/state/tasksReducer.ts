import type { Task } from '../types/Task';

export type Action =
  | { type: 'add'; task: Task }
  | { type: 'toggle'; id: string }
  | { type: 'clear' };

export function tasksReducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case 'add': {
      const newState = [...state];
      newState.push(action.task);
      return newState;
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
