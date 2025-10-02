import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../src/App';

function countTasks() {
  return screen.queryAllByRole('checkbox').length;
}

describe('App integration', () => {
  it('adds a task and filters by completed correctly', async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Title/i), 'New Task');
    const date = new Date('2025-10-05');
    await user.type(
      screen.getByLabelText(/Due/i),
      date.toISOString().slice(0, 10)
    );
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(countTasks()).toBe(3);

    const boxes = screen.getAllByRole('checkbox');
    await user.click(boxes[boxes.length - 1]);

    await user.selectOptions(
      screen.getByLabelText('filter-select'),
      'completed'
    );

    const listed = screen.getAllByRole('checkbox');
    expect(listed.length).toBe(1);
    expect(listed.every((b) => (b as HTMLInputElement).checked)).toBe(true);

    const stats = screen.getByLabelText('stats');
    expect(stats.textContent).toMatch(/rate:0\\.33/);
  });

  it('filters to active shows only unchecked', async () => {
    render(<App />);
    const user = userEvent.setup();

    const boxes = screen.getAllByRole('checkbox');
    await user.click(boxes[0]);
    await user.selectOptions(screen.getByLabelText('filter-select'), 'active');
    const listed = screen.getAllByRole('checkbox');
    expect(listed.every((b) => !(b as HTMLInputElement).checked)).toBe(true);
  });

  it('sorts by due date ascending (earliest first)', () => {
    render(<App />);
    const items = screen.getAllByRole('checkbox');
    const firstLabel = items[0].closest('label')!.textContent!;
    expect(firstLabel.toLowerCase()).toContain('yesterday');
  });
});
