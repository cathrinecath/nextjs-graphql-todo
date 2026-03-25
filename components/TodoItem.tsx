"use client";

import { Todo } from "@/types/todo";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
}

export default function TodoItem({ todo, onToggle }: Props) {
  return (
    <li
      onClick={() => onToggle(todo.id)}
      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-50 cursor-pointer transition group"
    >
      <span
        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition
          ${todo.completed
            ? "bg-indigo-500 border-indigo-500"
            : "border-gray-300 group-hover:border-indigo-400"
          }`}
      >
        {todo.completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <span
        className={`text-sm transition ${
          todo.completed ? "line-through text-gray-400" : "text-gray-700"
        }`}
      >
        {todo.text}
      </span>
    </li>
  );
}
