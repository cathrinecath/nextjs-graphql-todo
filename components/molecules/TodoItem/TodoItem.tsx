'use client'

import { Trash2 } from 'lucide-react'
import { Checkbox, Button } from '@/components/atoms'
import { Todo } from '@/types/todo'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-50">
      <Checkbox id={todo.id} checked={todo.completed} onChange={() => onToggle(todo.id)} />
      <label
        htmlFor={todo.id}
        className={`flex-1 cursor-pointer text-sm ${todo.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}
      >
        {todo.text}
      </label>
      <Button
        variant="danger"
        size="sm"
        onClick={() => onDelete(todo.id)}
        className="h-11 px-3 transition-opacity [@media(hover:hover)]:h-auto [@media(hover:hover)]:px-2.5 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100"
        aria-label="Delete todo"
      >
        <Trash2 size={13} />
      </Button>
    </div>
  )
}
