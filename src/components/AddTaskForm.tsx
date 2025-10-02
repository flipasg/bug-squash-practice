import { useId, useState } from 'react';
import type { Task } from '../types/Task';
import { formatISO } from '../utils/date';

export default function AddTaskForm({ onAdd }: { onAdd: (t: Task) => void }) {
  const [title, setTitle] = useState('');
  const [due, setDue] = useState('');
  const id = useId();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !due) return;
    onAdd({
      id: crypto.randomUUID(),
      title,
      dueDate: formatISO(new Date(due)),
      completed: false,
    });
    setTitle('');
    setDue('');
  }

  return (
    <form onSubmit={handleSubmit} aria-label='add-task-form' className='card'>
      <div className='row'>
        <div>
          <label htmlFor={id + '-title'}>Title</label>
          <input
            id={id + '-title'}
            data-testid='task-title-input'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Pay invoices'
          />
        </div>
        <div>
          <label htmlFor={id + '-due'}>Due</label>
          <input
            id={id + '-due'}
            type='date'
            data-testid='task-date-input'
            value={due}
            onChange={(e) => setDue(e.target.value)}
          />
        </div>
        <div style={{ alignSelf: 'end' }}>
          <button type='submit'>Add</button>
        </div>
      </div>
    </form>
  );
}
