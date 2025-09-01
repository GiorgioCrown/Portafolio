import { useEffect, useMemo, useReducer, useState } from "react";
import { load, save } from "../../lib/storage.js";
import TodoInput from "../../components/Todos/TodoInput.jsx";
import TodoFilters from "../../components/Todos/TodoFilters.jsx";
import TodoStats from "../../components/Todos/TodoStats.jsx";
import TodoList from "../../components/Todos/TodoList.jsx";

const LS_KEY = "todos.v1";

const newId = () => crypto.randomUUID?.() || String(Date.now() + Math.random());

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [{ id: newId(), title: action.title, done: false, createdAt: Date.now() }, ...state];
    case "TOGGLE":
      return state.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t));
    case "EDIT":
      return state.map((t) => (t.id === action.id ? { ...t, title: action.title } : t));
    case "REMOVE":
      return state.filter((t) => t.id !== action.id);
    case "CLEAR_DONE":
      return state.filter((t) => !t.done);
    case "LOAD":
      return action.payload;
    default:
      return state;
  }
};

const Todos = () => {
  const [state, dispatch] = useReducer(reducer, []);
  const [filter, setFilter] = useState("all"); // all | active | done

  // Carga inicial
  useEffect(() => {
    const initial = load(LS_KEY, []);
    dispatch({ type: "LOAD", payload: initial });
  }, []);

  // Persistencia
  useEffect(() => {
    save(LS_KEY, state);
  }, [state]);

  const visible = useMemo(() => {
    if (filter === "active") return state.filter((i) => !i.done);
    if (filter === "done") return state.filter((i) => i.done);
    return state;
  }, [state, filter]);

  const stats = useMemo(() => {
    const total = state.length;
    const done = state.filter((i) => i.done).length;
    return { total, done };
  }, [state]);

  return (
    <section className="py-12">
      <div className="container mx-auto max-w-3xl px-4">
        {/* Header: título + filtros */}
        <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <TodoStats total={stats.total} done={stats.done} />
          <TodoFilters filter={filter} setFilter={setFilter} />
        </div>

        {/* Form + lista */}
        <div className="grid gap-3">
          <TodoInput onAdd={(title) => dispatch({ type: "ADD", title })} />
          <TodoList
            items={visible}
            onToggle={(id) => dispatch({ type: "TOGGLE", id })}
            onRemove={(id) => dispatch({ type: "REMOVE", id })}
            onEdit={(id, title) => dispatch({ type: "EDIT", id, title })}
          />
        </div>

        {/* Acciones secundarias */}
        <div className="mt-4">
          <button
            className="rounded-md border border-slate-700 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800"
            onClick={() => dispatch({ type: "CLEAR_DONE" })}
          >
            Limpiar completadas
          </button>
        </div>
      </div>
    </section>
  );
};

export default Todos;
