'use client'

import { useState, useMemo } from 'react'
import { useTodos } from '@/hooks/useTodos'
import { FilterTabs, FilterType } from '@/components/molecules'
import TodoInput from '@/components/organisms/TodoInput/TodoInput'
import TodoList from '@/components/organisms/TodoList/TodoList'

export default function TodoSection() {
  const { todos, loading, addTodo, toggleTodo, deleteTodo } = useTodos()
  const [filter, setFilter] = useState<FilterType>('all')

  const filtered = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed)
    if (filter === 'completed') return todos.filter((t) => t.completed)
    return todos
  }, [todos, filter])

  const counts = useMemo(
    () => ({
      all: todos.length,
      active: todos.filter((t) => !t.completed).length,
      completed: todos.filter((t) => t.completed).length,
    }),
    [todos]
  )

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <TodoInput onAdd={addTodo} />
      <FilterTabs active={filter} counts={counts} onChange={setFilter} />
      <TodoList todos={filtered} loading={loading} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  )
}
