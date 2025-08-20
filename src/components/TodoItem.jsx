// single task row
// input + checkbox + text + edit + delete + due date
// drag and drop support
// import necessary libraries
// src/components/TodoItem.jsx
import { useState } from "react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


function TodoItem({ todo, onToggle, onDelete, onEdit,onUpdateDueDate }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  const { id, text, completed,dueDate } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [showDatePicker, setShowDatePicker] = useState(false);


  // const handleEdit = () => {
  //   console.log("Edit button clicked for task:", id, "Editing mode:", !isEditing);

  //   if (isEditing) {
  //     if (editText.trim() && onEdit) {  // Added onEdit check
  //       onEdit(id, editText.trim());
  //     }
  //   }
  //   setIsEditing(!isEditing);
  // };


  const handleEdit = () => {
  console.log("Edit button clicked for task:", id, "Editing mode:", !isEditing);

  if (isEditing) {
    const trimmedText = editText.trim();
    if (trimmedText && onEdit) {
      onEdit(id, trimmedText);
    } else {
      console.log("Edit canceled: Text is empty or invalid.");
    }
  }
  setIsEditing(!isEditing);
};

  const handleDelete = () => {
    console.log("Delete button clicked for task:", id);

    if (window.confirm("Are you sure you want to delete this task?")) {
          console.log("Delete confirmed for task:", id);

      onDelete(id);
    }else {
    console.log("Delete cancelled for task:", id);
  }
};

const handleDateChange = (e) => {
    console.log("Date changed for task:", id, "New date:", e.target.value);

  onUpdateDueDate(id, e.target.value || null);
  setShowDatePicker(false); // Add this to close the date picker
};

// Also add log for checkbox
const handleToggle = () => {
  console.log("Checkbox toggled for task:", id, "Current completed:", completed);
  onToggle(id);
};

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      // {...listeners}
      className="item"
    >
      <span {...listeners} style={{ cursor: "grab", marginRight: 8 }}>⠿</span>
    
      <input
        className="checkbox"
        type="checkbox"
        checked={completed}
        // onChange={() => onToggle(id)}
        onChange={handleToggle}
      />

      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="input"
            autoFocus
          />
          <button onClick={() => setShowDatePicker(!showDatePicker)}>
            📅
          </button>
          {showDatePicker && (
            <input
              type="date"
              value={dueDate || ''}
              onChange={handleDateChange}
              className="date-input"
            />
          )}
        </div>
      ) : (
        <div className="text-container">
          <div className={`text ${completed ? "done" : ""}`}>{text}</div>
          {dueDate && (
            <div className={`due-date ${new Date(dueDate) < new Date() ? "overdue" :       "upcoming"}`}>
            📅 {new Date(dueDate).toLocaleDateString()}
          </div>
          )}

          

        </div>
        
      )}
      {/* Action buttons */}
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


