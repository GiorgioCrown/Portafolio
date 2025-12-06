import { useState } from "react";

const TodoInput = ({ onAdd }) => {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const title = text.trim();
    if (!title) return;
    onAdd(title);
    setText("");
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-12 gap-2">
      <input
        className="col-span-9 md:col-span-10 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Escribe una tarea…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Nueva tarea"
      />
      <button
        type="submit"
        className="col-span-3 md:col-span-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 px-3 py-2 font-medium text-white transition-colors"
      >
        Agregar
      </button>
    </form>
  );
};

export default TodoInput;
