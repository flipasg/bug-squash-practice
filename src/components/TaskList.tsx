import type { Task } from '../types/Task';
import TaskItem from './TaskItem';

export default function TaskList({
  tasks,
  onToggle,
}: {
  tasks: Task[];
  onToggle: (id: string) => void;
}) {
  if (tasks.length === 0) return <p role='status'>No tasks</p>;
  return (
    <ul aria-label='task-list' className='card'>
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} />
      ))}
    </ul>
  );
}
