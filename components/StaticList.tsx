import { StaticListData } from "@/types/todo";

interface Props {
  list: StaticListData;
}

export default function StaticList({ list }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-base font-semibold text-gray-700 mb-3">
        {list.emoji} {list.title}
      </h2>
      <ul className="space-y-2">
        {list.items.map((item) => (
          <li key={item.id} className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-300 flex-shrink-0" />
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
