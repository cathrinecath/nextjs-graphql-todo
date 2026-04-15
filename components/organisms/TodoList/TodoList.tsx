'use client'

import { ClipboardList } from 'lucide-react'
import { Skeleton } from '@/components/atoms'
import { TodoItem } from '@/components/molecules'
import { Todo } from '@/types/todo'

interface TodoListProps {
  todos: Todo[]
  loading: boolean
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TodoList({ todos, loading, onToggle, onDelete }: TodoListProps) {
  if (loading) {
    return (
      <div className="flex flex-col gap-2 pt-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    )
  }

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <ClipboardList size={32} className="mb-2 text-slate-200" />
        <p className="text-sm text-slate-400">Nothing here yet. Add your first task above.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-0.5">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  )
}
