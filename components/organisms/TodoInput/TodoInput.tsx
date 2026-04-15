'use client'

import { useState, KeyboardEvent } from 'react'
import { Plus } from 'lucide-react'
import { Input, Button } from '@/components/atoms'

interface TodoInputProps {
  onAdd: (text: string) => void
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState('')

  function handleAdd() {
    if (!value.trim()) return
    onAdd(value)
    setValue('')
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Add a new task..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleAdd} disabled={!value.trim()} aria-label="Add task">
        <Plus size={16} />
      </Button>
    </div>
  )
}
