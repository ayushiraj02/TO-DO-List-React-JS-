// single task row
import { useState } from "react";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const { id, text, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleEdit = () => {
    if (isEditing) {
      if (editText.trim() && onEdit) {  // Added onEdit check
        onEdit(id, editText.trim());
      }
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(id);
    }
  };

  return (
    <div className="item">
      <input
        className="checkbox"
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="input"
          autoFocus
        />
      ) : (
        <div className={`text ${completed ? "done" : ""}`}>{text}</div>
      )}

      <div className="actions">
        <button className="editBtn" onClick={handleEdit}>
          {isEditing ? "Save" : "Edit"}
        </button>
        <button className="delBtn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;