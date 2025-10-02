import type { Task } from '../types/Task';

export default function TaskItem({
  task,
  onToggle,
}: {
  task: Task;
  onToggle: (id: string) => void;
}) {
  return (
    <li>
      <label>
        <input
          aria-label={`toggle-${task.title}`}
          type='checkbox'
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        {task.title} —{' '}
        <span className='small'>
          {new Date(task.dueDate).toLocaleDateString()}
        </span>
      </label>
    </li>
  );
}
