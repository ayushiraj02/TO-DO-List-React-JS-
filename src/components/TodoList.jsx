// loops over tasks and renders items
import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onDelete }) {
  if (!todos.length) {
    return <p style={{ opacity: 0.7, marginTop: 12 }}>No tasks yet. Add one!</p>;
  }

  return (
    <div className="list">
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;
