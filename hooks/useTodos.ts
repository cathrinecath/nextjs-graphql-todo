'use client'

import { useQuery, useMutation } from '@apollo/client/react'
import { useCallback } from 'react'
import { GET_TODOS } from '@/graphql/queries'
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from '@/graphql/mutations'
import { Todo } from '@/types/todo'

export function useTodos() {
  const { data, loading, error } = useQuery<{ todos: Todo[] }>(GET_TODOS)

  const [addTodoMutation] = useMutation<{ addTodo: Todo }>(ADD_TODO, {
    update(cache, { data }) {
      if (!data) return
      const existing = cache.readQuery<{ todos: Todo[] }>({ query: GET_TODOS })
      cache.writeQuery({
        query: GET_TODOS,
        data: { todos: [...(existing?.todos ?? []), data.addTodo] },
      })
    },
  })

  const [toggleTodoMutation] = useMutation<{ toggleTodo: Pick<Todo, 'id' | 'completed'> }>(TOGGLE_TODO, {
    optimisticResponse({ id }) {
      const current = data?.todos.find((t) => t.id === id)
      return {
        toggleTodo: {
          id,
          completed: !current?.completed,
        },
      }
    },
    update(cache, { data }) {
      if (!data) return
      const existing = cache.readQuery<{ todos: Todo[] }>({ query: GET_TODOS })
      cache.writeQuery({
        query: GET_TODOS,
        data: {
          todos: existing!.todos.map((t) =>
            t.id === data.toggleTodo.id ? { ...t, completed: data.toggleTodo.completed } : t
          ),
        },
      })
    },
  })

  const [deleteTodoMutation] = useMutation<{ deleteTodo: string }>(DELETE_TODO, {
    update(cache, { data }) {
      if (!data) return
      const existing = cache.readQuery<{ todos: Todo[] }>({ query: GET_TODOS })
      cache.writeQuery({
        query: GET_TODOS,
        data: { todos: existing!.todos.filter((t) => t.id !== data.deleteTodo) },
      })
    },
  })

  const addTodo = useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return
      addTodoMutation({
        variables: { text: trimmed },
        optimisticResponse: {
          addTodo: {
            id: `temp-${Date.now()}`,
            text: trimmed,
            completed: false,
            createdAt: new Date().toISOString(),
          },
        },
      })
    },
    [addTodoMutation]
  )

  const toggleTodo = useCallback(
    (id: string) => toggleTodoMutation({ variables: { id } }),
    [toggleTodoMutation]
  )

  const deleteTodo = useCallback(
    (id: string) => deleteTodoMutation({ variables: { id } }),
    [deleteTodoMutation]
  )

  return { todos: data?.todos ?? [], loading, error, addTodo, toggleTodo, deleteTodo }
}
