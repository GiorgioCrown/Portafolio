const btn =
  "rounded-md border px-3 py-1.5 text-sm transition-colors";
const solid = "bg-indigo-600 text-white border-indigo-600";
const ghost = "border-slate-700 text-slate-300 hover:bg-slate-800";

const TodoFilters = ({ filter, setFilter }) => (
  <div className="inline-flex gap-2">
    <button className={`${btn} ${filter==='all'?solid:ghost}`} onClick={() => setFilter("all")}>
      Todas
    </button>
    <button className={`${btn} ${filter==='active'?solid:ghost}`} onClick={() => setFilter("active")}>
      Pendientes
    </button>
    <button className={`${btn} ${filter==='done'?solid:ghost}`} onClick={() => setFilter("done")}>
      Completadas
    </button>
  </div>
);

export default TodoFilters;
