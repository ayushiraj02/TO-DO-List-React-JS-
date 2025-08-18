// single task row

function TodoItem({ todo, onToggle, onDelete }) {
  const { id, text, completed } = todo;

  return (
    <div className="item">
      <input
        className="checkbox"
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />
      <div className={`text ${completed ? "done" : ""}`}>{text}</div>
      <button className="delBtn" onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}

export default TodoItem;
