// input + “Add” button

import { useState } from "react";

function AddTodo({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    onAdd(t);
    setText("");
  };

  return (
    <form className="header" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        placeholder="Add a new task…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="addBtn" type="submit" disabled={!text.trim()}>
        Add
      </button>
    </form>
  );
}

export default AddTodo;
