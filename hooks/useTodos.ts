"use client";

import { useQuery, useMutation } from "@apollo/client/react";
import { useCallback } from "react";
import { GET_TODOS } from "@/graphql/queries";
import { ADD_TODO, TOGGLE_TODO } from "@/graphql/mutations";
import { Todo } from "@/types/todo";

export function useTodos() {
  const { data, loading, error } = useQuery<{ todos: Todo[] }>(GET_TODOS);

  const [addTodoMutation] = useMutation(ADD_TODO, {
    update(cache, { data: { addTodo } }) {
      const existing = cache.readQuery<{ todos: Todo[] }>({ query: GET_TODOS });
      cache.writeQuery({
        query: GET_TODOS,
        data: { todos: [...(existing?.todos ?? []), addTodo] },
      });
    },
  });

  const [toggleTodoMutation] = useMutation(TOGGLE_TODO, {
    optimisticResponse({ id }) {
      const current = data?.todos.find((t) => t.id === id);
      return {
        toggleTodo: {
          __typename: "Todo",
          id,
          completed: !current?.completed,
        },
      };
    },
    update(cache, { data: { toggleTodo } }) {
      const existing = cache.readQuery<{ todos: Todo[] }>({ query: GET_TODOS });
      cache.writeQuery({
        query: GET_TODOS,
        data: {
          todos: existing!.todos.map((t) =>
            t.id === toggleTodo.id ? { ...t, completed: toggleTodo.completed } : t
          ),
        },
      });
    },
  });

  const addTodo = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addTodoMutation({
      variables: { text: trimmed },
      optimisticResponse: {
        addTodo: {
          __typename: "Todo",
          id: `temp-${Date.now()}`,
          text: trimmed,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      },
    });
  }, [addTodoMutation]);

  const toggleTodo = useCallback((id: string) => {
    toggleTodoMutation({ variables: { id } });
  }, [toggleTodoMutation]);

  return { todos: data?.todos ?? [], loading, error, addTodo, toggleTodo };
}
