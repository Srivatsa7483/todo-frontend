// src/App.jsx
import React,{ useEffect, useState } from "react";
import TodoItem from "./TodoItem";

const BASE_URL = "http://localhost:3000";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // Fetch all todos
  const fetchTodos = async () => {
    const res = await fetch(`${BASE_URL}/todos`);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const res = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setText("");
  };

  // Toggle complete
  const handleToggle = async (id, completed) => {
    await fetch(`${BASE_URL}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    fetchTodos();
  };

  // Delete todo
  const handleDelete = async (id) => {
    await fetch(`${BASE_URL}/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">📝 To-Do Manager</h1>

      <form onSubmit={handleAdd} className="flex gap-3 mb-6 w-full max-w-md">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 rounded bg-gray-800 border border-gray-700"
          placeholder="Add a new task"
        />
        <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
          Add
        </button>
      </form>

      <div className="w-full max-w-md space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
