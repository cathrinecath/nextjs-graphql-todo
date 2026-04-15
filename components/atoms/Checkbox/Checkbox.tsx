'use client'

interface CheckboxProps {
  checked: boolean
  onChange: () => void
  id: string
}

export default function Checkbox({ checked, onChange, id }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-amber-500 focus:ring-amber-400"
    />
  )
}
