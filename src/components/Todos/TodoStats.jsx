const TodoStats = ({ total, done }) => {
    const percent = total ? Math.round((done / total) * 100) : 0;
    return (
      <div>
        <h2 className="m-0 text-xl font-semibold">To-Do App</h2>
        <p className="m-0 text-slate-400 text-sm">
          {done}/{total} completadas ({percent}%)
        </p>
      </div>
    );
  };
  
  export default TodoStats;
  