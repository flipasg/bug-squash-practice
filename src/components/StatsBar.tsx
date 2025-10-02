export default function StatsBar({
  total,
  done,
  rate,
  overdue,
}: {
  total: number;
  done: number;
  rate: number;
  overdue: number;
}) {
  return (
    <div aria-label='stats' className='card'>
      <span className='stat'>total:{total}</span>
      <span className='stat'>done:{done}</span>
      <span className='stat'>rate:{rate.toFixed(2)}</span>
      <span className='stat'>overdue:{overdue}</span>
    </div>
  );
}
