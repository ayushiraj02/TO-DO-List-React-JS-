
// src/App.jsx
import { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import FilterButtons from "./components/FilterButtons";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState('all'); // Default filter to 'all'

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Define editTodo BEFORE using it in JSX
  const editTodo = (id, newText) => {
      console.log("App: Editing task", id, "New text:", newText);

    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  };

  const addTodo = (text, dueDate = null) => {
  setTodos((prev) => [
    ...prev,
    { id: Date.now(), text, completed: false, dueDate },
  ]);
};

  const toggleTodo = (id) => {
    console.log("App: Toggling task", id);
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTodo = (id) => {
    console.log("App: Deleting task", id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const completedCount = todos.filter((t) => t.completed).length;

  // Filter todos based on current filter
  const filteredTodos = todos.filter(todo => {
    switch(filter) {
      case 'active': return !todo.completed;
      case 'completed': return todo.completed;
      default: return true;
    }
  });



const handleDragEnd = (event) => {
  const { active, over } = event;
  
  if (over && active.id !== over.id) { // Added null check for 'over'
    setTodos((items) => {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);
      
      return arrayMove(items, oldIndex, newIndex);
    });
  }
};


// Add this function to update due dates
const updateDueDate = (id, dueDate) => {
  console.log("App: Updating due date for task", id, "New date:", dueDate);


  setTodos(prev => prev.map(t => 
    t.id === id ? { ...t, dueDate } : t
  ));
};

  return (
    <div className="app">
      <h1 style={{ marginTop: 0 }}>Write It Down ✍️</h1>

      <AddTodo onAdd={addTodo} />

      {/* Add Filter Buttons */}
      <FilterButtons currentFilter={filter} onFilterChange={setFilter} />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={filteredTodos.map(t => t.id)}>
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            onUpdateDueDate={updateDueDate}
          />
        </SortableContext>
      </DndContext>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
        <span>{todos.length} total • {completedCount} done</span>
        <button className="clearBtn" onClick={clearCompleted} disabled={!completedCount}>
          Clear completed
        </button>
      </div>
    </div>
  );
}

export default App;