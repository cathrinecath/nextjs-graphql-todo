"use client";

import { memo, useState, KeyboardEvent } from "react";

interface Props {
  onAdd: (text: string) => void;
}

export default memo(function TodoInput({ onAdd }: Props) {
  const [value, setValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      onAdd(value);
      setValue("");
    }
  };

  return (
    <div className="w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What do you need to do? Press Enter to add..."
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
      />
    </div>
  );
});
