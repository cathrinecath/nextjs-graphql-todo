import { Todo } from '@/types/todo'
import { rawBackendTodos, RawTodo } from '@/mock/rawBackend'

function normalize(raw: RawTodo): Todo {
  return {
    id: raw.todo_ID,
    text: raw.ToDo_Text,
    completed: raw.is_done,
    createdAt: raw.meta.created_at,
  }
}

let todos: Todo[] = rawBackendTodos.map(normalize)

export const typeDefs = `#graphql
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
    createdAt: String!
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    addTodo(text: String!): Todo!
    toggleTodo(id: ID!): Todo!
    deleteTodo(id: ID!): ID!
  }
`

export const resolvers = {
  Query: {
    todos: (): Todo[] => todos,
  },
  Mutation: {
    addTodo: (_: unknown, { text }: { text: string }): Todo => {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
      }
      todos = [...todos, newTodo]
      return newTodo
    },
    toggleTodo: (_: unknown, { id }: { id: string }): Todo => {
      const todo = todos.find((t) => t.id === id)
      if (!todo) throw new Error(`Todo ${id} not found`)
      todos = todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      return todos.find((t) => t.id === id)!
    },
    deleteTodo: (_: unknown, { id }: { id: string }): string => {
      todos = todos.filter((t) => t.id !== id)
      return id
    },
  },
}
