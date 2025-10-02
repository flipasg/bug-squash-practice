import AddTaskForm from './components/AddTaskForm';
import StatsBar from './components/StatsBar';
import TaskList from './components/TaskList';
import { useTasks } from './hooks/useTasks';
import type { Task } from './types/Task';

const seed: Task[] = [
  {
    id: '1',
    title: 'Due yesterday',
    dueDate: new Date(Date.now() - 86400000).toISOString(),
    completed: false,
  },
  {
    id: '2',
    title: 'Due today',
    dueDate: new Date().toISOString(),
    completed: false,
  },
];

export default function App() {
  const { state, dispatch, filter, setFilter, filtered, stats } =
    useTasks(seed);

  return (
    <main>
      <div className='header'>
        <h1>Task Board</h1>
        <div className='card'>
          <label htmlFor='filter'>Filter</label>
          <select
            id='filter'
            aria-label='filter-select'
            data-testid='filter-select'
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option value='all'>All</option>
            <option value='completed'>Completed</option>
            <option value='active'>Active</option>
          </select>
        </div>
      </div>

      <AddTaskForm onAdd={(t) => dispatch({ type: 'add', task: t })} />

      <TaskList
        tasks={filtered}
        onToggle={(id) => dispatch({ type: 'toggle', id })}
      />

      <StatsBar
        total={stats.total}
        done={stats.done}
        rate={stats.completionRate}
        overdue={stats.overdue}
      />
    </main>
  );
}
