import TodoItem from "./TodoItem.jsx";

const TodoList = ({ items, onToggle, onRemove, onEdit }) => (
  <ul className="grid gap-2">
    {items.length === 0 ? (
      <li className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-6 text-center text-slate-500">
        Sin elementos
      </li>
    ) : (
      items.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          onToggle={onToggle}
          onRemove={onRemove}
          onEdit={onEdit}
        />
      ))
    )}
  </ul>
);

export default TodoList;
