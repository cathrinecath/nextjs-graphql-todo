'use client'

import { Badge } from '@/components/atoms'

export type FilterType = 'all' | 'active' | 'completed'

interface FilterTabsProps {
  active: FilterType
  counts: Record<FilterType, number>
  onChange: (filter: FilterType) => void
}

const tabs: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
]

export default function FilterTabs({ active, counts, onChange }: FilterTabsProps) {
  return (
    <div className="flex gap-1">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            active === key
              ? 'bg-amber-50 text-amber-700'
              : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
          }`}
        >
          {label}
          <Badge count={counts[key]} />
        </button>
      ))}
    </div>
  )
}
