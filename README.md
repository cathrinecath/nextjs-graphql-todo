# Next.js GraphQL Todo

A full-stack todo app built with **Next.js 16 App Router**, **TypeScript**, **Tailwind CSS**, **GraphQL**, and **Apollo Client v4**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| API | GraphQL — Apollo Server 5 via Next.js Route Handler |
| Data fetching | Apollo Client v4 with optimistic UI |
| Font | Geist (next/font) |

---

## Architecture

```
Browser
  ↓
page.tsx (Server Component)
  ↓
TodoSection (Client Component — Apollo hooks)
  ↓
POST /api/graphql (Apollo Server route handler)
  ↓
GraphQL Resolver — normalizes mock data into clean shape
  ↓
In-memory store (resets on server restart)
```

---

## Folder Structure

```
├── app/
│   ├── api/graphql/route.ts     # Apollo Server — GraphQL endpoint
│   ├── layout.tsx               # Root layout, wraps tree with ApolloProvider
│   └── page.tsx                 # Server component — TodoSection + two pinned StaticLists
├── components/
│   ├── TodoSection.tsx          # Client boundary — composes input + list via useTodos
│   ├── TodoInput.tsx            # Memoized controlled input, submits on Enter
│   ├── TodoItem.tsx             # Single todo row, click to toggle
│   ├── TodoList.tsx             # Renders Apollo cache data, handles loading skeleton
│   └── StaticList.tsx           # Server-safe read-only list, driven by props
├── graphql/
│   ├── client.ts                # Apollo Client singleton (HttpLink + InMemoryCache)
│   ├── schema.ts                # Type defs, resolvers, normalize() function
│   ├── queries.ts               # GET_TODOS
│   └── mutations.ts             # ADD_TODO, TOGGLE_TODO
├── hooks/
│   └── useTodos.ts              # Query + mutations with optimistic responses
├── mock/
│   └── rawBackend.ts            # Simulated messy third-party data shape
├── providers/
│   └── ApolloProvider.tsx       # "use client" wrapper to mount ApolloProvider
└── types/
    └── todo.ts                  # Todo, StaticItem, StaticListData interfaces
```

---

## Rendering

| Component | Type | Why |
|---|---|---|
| `page.tsx` | Server | No hooks, layout only |
| `layout.tsx` | Server | Delegates client boundary to `ApolloProvider.tsx` |
| `ApolloProvider.tsx` | Client | Apollo requires browser context |
| `TodoSection.tsx` | Client | Calls `useTodos` (Apollo hook) |
| `TodoInput.tsx` | Client | Controlled input with local state, wrapped in `memo` |
| `TodoList.tsx` | Client | Renders from Apollo cache |
| `TodoItem.tsx` | Client | Click handler for toggle |
| `StaticList.tsx` | Server-safe | No hooks, pure render |

---

## Optimistic UI

When the user presses Enter:

1. Apollo writes to the local cache immediately with a temp ID
2. `TodoList` re-renders instantly — no waiting for the server
3. Mutation fires to `/api/graphql` in the background
4. Server confirms → temp ID replaced with real UUID
5. On failure → Apollo rolls back the cache automatically

`TodoInput` skips re-renders on every add because it's wrapped in `React.memo` and `addTodo` is stable via `useCallback`.

---

## Data Normalization

The mock backend returns inconsistently shaped data. The GraphQL resolver normalizes it once at the boundary:

```
Raw shape               Normalized
──────────────          ──────────
todo_ID            →    id
ToDo_Text          →    text
is_done            →    completed
meta.created_at    →    createdAt
priority_lvl       →    (dropped)
assigned_usr       →    (dropped)
```

Components only ever see `{ id, text, completed, createdAt }`.

---

## GraphQL Schema

```graphql
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
}
```

---

## Getting Started

> Requires **Node.js >= 20.9.0** (required by Next.js 16 + Apollo Server 5).

```bash
npm install
npm run dev
```

Open http://localhost:3000

```bash
# Production
npm run build
npm start
```

---

## Notes

- **Data does not persist on refresh** by design — todos are stored in a server-side in-memory array that resets when the Next.js process restarts. To persist data, replace the `todos` array in `graphql/schema.ts` with a database (e.g. Prisma, Supabase).
- **Adding a new pinned list**: add an entry to the `STATIC_LISTS` array in `app/page.tsx` — no component changes needed.
- **Deployment**: Vercel works zero-config. Connect a real DB before deploying to production.
