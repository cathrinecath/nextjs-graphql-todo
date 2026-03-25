import TodoSection from "@/components/TodoSection";
import StaticList from "@/components/StaticList";
import { StaticListData } from "@/types/todo";

const STATIC_LISTS: StaticListData[] = [
  {
    title: "Shopping List",
    emoji: "🛒",
    items: [
      { id: "s1", text: "Milk" },
      { id: "s2", text: "Eggs" },
      { id: "s3", text: "Bread" },
      { id: "s4", text: "Coffee" },
    ],
  },
  {
    title: "Work Tasks",
    emoji: "💼",
    items: [
      { id: "w1", text: "Review pull requests" },
      { id: "w2", text: "Team standup" },
      { id: "w3", text: "Update project docs" },
      { id: "w4", text: "Deploy to staging" },
    ],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto space-y-6">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">My Todos</h1>
          <p className="text-sm text-gray-400 mt-1">Press Enter to add a new item</p>
        </div>

        <TodoSection />

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 uppercase tracking-widest">Pinned Lists</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {STATIC_LISTS.map((list) => (
          <StaticList key={list.title} list={list} />
        ))}

      </div>
    </main>
  );
}
