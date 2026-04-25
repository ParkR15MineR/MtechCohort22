import { useState } from 'react'
import './App.css'
import { useState, useEffect } from 'react'; // Don't forget to import useEffect

// Inside your App component:
useEffect(() => {
  localStorage.setItem("my_tasks", JSON.stringify(tasks));
}, [tasks]);

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedtasks = localStorage.getItem("my_tasks");
    return savedtasks ? JSON.parse(savedtasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("my_tasks", JSON.stringify(tasks));
  });
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("All");

  const addTask = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTasks([...tasks, { id: crypto.randomUUID(), text, completed: false }]);
    setText("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // This handles your "Filter" requirement
  const filteredTasks = tasks.filter(t => {
    if (filter === "Active") return !t.completed;
    if (filter === "Completed") return t.completed;
    return true;
  });

  return (
    <div className="app-wrapper">
      <h1>Task Manager</h1>
      
      <form onSubmit={addTask}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New task..." />
        <button type="submit">Add</button>
      </form>

      <div className="filters">
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Active")}>Active</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
      </div>

      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>
            <span 
              onClick={() => toggleTask(task.id)}
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      
      <p>{tasks.filter(t => !t.completed).length} items left</p>
    </div>
  );
}

export default App