"use client";

import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
  loading: boolean;
  onToggle: (id: string) => void;
}

export default function TodoList({ todos, loading, onToggle }: Props) {
  if (loading) {
    return (
      <div className="mt-4 space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <p className="mt-4 text-sm text-gray-400 text-center py-6">
        No todos yet — add one above!
      </p>
    );
  }

  return (
    <ul className="mt-2 divide-y divide-gray-100">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
}
