# NestList — Personal Checklist App

A clean, minimal checklist app built with Next.js 16, TypeScript, GraphQL, and Apollo Client. Add tasks, toggle completion, filter by status, and delete — all with optimistic UI updates.

**Live demo:** [nextjs-graphql-todo.vercel.app](https://nextjs-graphql-todo.vercel.app)

---

## Features

- **Add tasks** — type and press Enter or click the button
- **Toggle complete** — checkbox with instant optimistic update
- **Delete tasks** — hover to reveal delete button
- **Filter tabs** — all / active / completed with live counts
- **Loading skeleton** — skeleton screen on initial load

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| API | GraphQL — Apollo Server 5 via Next.js Route Handler |
| Data fetching | Apollo Client v4 with optimistic UI |
| Icons | Lucide React |

---

## Architecture

```
page.tsx (Server Component)
  └── TodoSection (Client — Apollo hooks, filter state)
        ├── TodoInput (Client — controlled input)
        ├── FilterTabs (Client — all/active/completed)
        └── TodoList (Client — renders filtered todos)
              └── TodoItem (Client — toggle + delete)

POST /api/graphql
  └── Apollo Server route handler
        └── GraphQL resolvers — normalizes mock data
```

### Server vs Client

Components are server by default. Client (`'use client'`) only where required:

| Component | Type | Reason |
|---|---|---|
| `page.tsx` | Server | No hooks, layout only |
| `Badge`, `Skeleton` | Server | Pure display |
| `TodoSection` | Client | Apollo hooks + filter state |
| `TodoList` | Client | Receives function props |
| `TodoItem` | Client | onClick handlers |
| `TodoInput` | Client | useState + keyboard events |
| `FilterTabs` | Client | onClick handlers |

### Optimistic UI

When a user adds, toggles, or deletes a task:
1. Apollo writes to the local cache immediately
2. UI updates instantly — no waiting for the server
3. Mutation fires to `/api/graphql` in the background
4. On failure — Apollo rolls back the cache automatically

### Data Normalization

The mock backend returns inconsistently shaped data. The GraphQL resolver normalizes it once at the boundary so components only ever see `{ id, text, completed, createdAt }`.

```
todo_ID        →  id
ToDo_Text      →  text
is_done        →  completed
meta.created_at → createdAt
```

---

## Folder Structure

```
src/
├── app/
│   ├── api/graphql/       # Apollo Server route handler
│   ├── loading.tsx        # Skeleton loading screen
│   └── page.tsx           # Root page (server component)
├── components/
│   ├── atoms/             # Button, Badge, Input, Checkbox, Skeleton
│   ├── molecules/         # TodoItem, FilterTabs
│   └── organisms/         # TodoSection, TodoList, TodoInput
├── graphql/
│   ├── client.ts          # Apollo Client singleton
│   ├── schema.ts          # Type defs + resolvers
│   ├── queries.ts         # GET_TODOS
│   └── mutations.ts       # ADD_TODO, TOGGLE_TODO, DELETE_TODO
├── hooks/
│   └── useTodos.ts        # Query + mutations with optimistic responses
├── mock/
│   └── rawBackend.ts      # Simulated third-party data shape
└── types/
    └── todo.ts            # Todo interface
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> Note: Data resets on server restart — todos are stored in memory by design.
