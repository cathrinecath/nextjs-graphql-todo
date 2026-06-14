'use client'

import { Check } from 'lucide-react'

interface CheckboxProps {
  checked: boolean
  onChange: () => void
  id: string
}

export default function Checkbox({ checked, onChange, id }: CheckboxProps) {
  return (
    <span className="relative inline-flex shrink-0">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 bg-white transition-colors hover:border-amber-400 checked:border-amber-500 checked:bg-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-1"
      />
      <Check
        size={14}
        strokeWidth={3}
        className="pointer-events-none absolute inset-0 m-auto text-white opacity-0 transition-opacity peer-checked:opacity-100"
      />
    </span>
  )
}
