// src/TodoItem.jsx
import React from "react";
import { FaTrash, FaCheck } from "react-icons/fa";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="flex justify-between items-center p-3 rounded bg-gray-800">
      <div
        className={`flex-1 cursor-pointer ${
          todo.completed ? "line-through text-gray-400" : ""
        }`}
        onClick={() => onToggle(todo._id, todo.completed)}
      >
        {todo.text}
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => onToggle(todo._id, todo.completed)}
          className="text-green-400 hover:text-green-600"
        >
          <FaCheck />
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          className="text-red-400 hover:text-red-600"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
