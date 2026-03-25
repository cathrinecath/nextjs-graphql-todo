"use client";

import { useTodos } from "@/hooks/useTodos";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

export default function TodoSection() {
  const { todos, loading, addTodo, toggleTodo } = useTodos();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} loading={loading} onToggle={toggleTodo} />
    </div>
  );
}
