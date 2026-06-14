export const rawBackendTodos = [
  {
    todo_ID: "raw-1",
    ToDo_Text: "Water the plants 🌱",
    is_done: false,
    priority_lvl: 1,
    assigned_usr: "john_doe",
    meta: { created_at: "2026-03-20T08:00:00Z" },
  },
  {
    todo_ID: "raw-2",
    ToDo_Text: "Call a friend back ☎️",
    is_done: true,
    priority_lvl: 3,
    assigned_usr: "jane_smith",
    meta: { created_at: "2026-03-21T09:30:00Z" },
  },
  {
    todo_ID: "raw-3",
    ToDo_Text: "Take a short walk ☀️",
    is_done: false,
    priority_lvl: 2,
    assigned_usr: "john_doe",
    meta: { created_at: "2026-03-22T14:00:00Z" },
  },
];

export type RawTodo = (typeof rawBackendTodos)[number];
