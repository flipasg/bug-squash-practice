import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, it } from 'vitest';
import App from '../src/App';

function countTasks() {
  return screen.queryAllByRole('checkbox').length;
}

describe('App integration', () => {
  beforeAll(() => {
    render(<App />);
  });

  it('adds a task and filters by completed correctly', async () => {
    const user = userEvent.setup();

    await user.type(screen.getByTestId('task-title-input'), 'New Task');
    const date = new Date('2025-10-05');
    await user.type(
      screen.getByTestId('task-date-input'),
      date.toISOString().slice(0, 10)
    );
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(countTasks()).toBe(3);

    const boxes = screen.getAllByRole('checkbox');
    await user.click(boxes[boxes.length - 1]);

    await user.selectOptions(screen.getByTestId('filter-select'), 'completed');

    const listed = screen.getAllByRole('checkbox');
    expect(listed.length).toBe(1);
    expect(listed.every((b) => (b as HTMLInputElement).checked)).toBe(true);

    const stats = screen.getByLabelText('stats');
    expect(stats.textContent).toContain('rate:0.33');
  });

  it('filters to active shows only unchecked', async () => {
    const user = userEvent.setup();

    const boxes = screen.getAllByRole('checkbox');
    await user.click(boxes[0]);
    await user.selectOptions(screen.getByTestId('filter-select'), 'active');
    const listed = screen.getAllByRole('checkbox');
    expect(listed.every((b) => !(b as HTMLInputElement).checked)).toBe(true);
  });

  it('sorts by due date ascending (earliest first)', () => {
    const items = screen.getAllByRole('checkbox');
    const firstLabel = items[0].closest('label')!.textContent!;
    expect(firstLabel.toLowerCase()).toContain('yesterday');
  });
});
