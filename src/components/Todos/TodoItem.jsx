import { useState } from "react";

const TodoItem = ({ item, onToggle, onRemove, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(item.title);

  const save = () => {
    const t = draft.trim();
    if (t && t !== item.title) onEdit(item.id, t);
    setEditing(false);
  };

  return (
    <li className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2">
      <input
        type="checkbox"
        className="size-4 accent-indigo-500"
        checked={item.done}
        onChange={() => onToggle(item.id)}
        aria-label="Marcar completada"
      />

      {editing ? (
        <div className="flex w-full items-center gap-2">
          <input
            className="flex-1 rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && save()}
            autoFocus
          />
          <button className="rounded-md bg-indigo-600 px-2 py-1 text-sm text-white hover:bg-indigo-700"
                  onClick={save}>Guardar</button>
          <button className="rounded-md border border-slate-700 px-2 py-1 text-sm text-slate-300 hover:bg-slate-800"
                  onClick={() => { setEditing(false); setDraft(item.title); }}>
            Cancelar
          </button>
        </div>
      ) : (
        <>
          <span
            className={`flex-1 ${item.done ? "line-through text-slate-500" : ""}`}
            title={item.title}
          >
            {item.title}
          </span>
          <div className="inline-flex gap-2">
            <button
              className="rounded-md border border-slate-700 px-2 py-1 text-sm text-slate-300 hover:bg-slate-800"
              onClick={() => setEditing(true)}
            >
              Editar
            </button>
            <button
              className="rounded-md border border-rose-700 px-2 py-1 text-sm text-rose-300 hover:bg-rose-900/40"
              onClick={() => onRemove(item.id)}
            >
              Borrar
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
