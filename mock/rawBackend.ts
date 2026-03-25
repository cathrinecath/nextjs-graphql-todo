export const rawBackendTodos = [
  {
    todo_ID: "raw-1",
    ToDo_Text: "Review pull requests",
    is_done: false,
    priority_lvl: 1,
    assigned_usr: "john_doe",
    meta: { created_at: "2026-03-20T08:00:00Z" },
  },
  {
    todo_ID: "raw-2",
    ToDo_Text: "Update project documentation",
    is_done: true,
    priority_lvl: 3,
    assigned_usr: "jane_smith",
    meta: { created_at: "2026-03-21T09:30:00Z" },
  },
  {
    todo_ID: "raw-3",
    ToDo_Text: "Deploy to staging",
    is_done: false,
    priority_lvl: 2,
    assigned_usr: "john_doe",
    meta: { created_at: "2026-03-22T14:00:00Z" },
  },
];

export type RawTodo = (typeof rawBackendTodos)[number];
