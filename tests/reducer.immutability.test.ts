import { describe, expect, it } from 'vitest';
import { tasksReducer } from '../src/state/tasksReducer';

describe('tasksReducer', () => {
  it('does not mutate previous state', () => {
    const prev = [] as any[];
    const next = tasksReducer(prev, {
      type: 'add',
      task: {
        id: '1',
        title: 'A',
        dueDate: new Date().toISOString(),
        completed: false,
      },
    });
    expect(next).not.toBe(prev);
    expect(prev).toHaveLength(0);
    expect(next).toHaveLength(1);
  });
});
