interface BadgeProps {
  count: number
}

export default function Badge({ count }: BadgeProps) {
  return (
    <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-100 px-1 text-[10px] font-semibold text-amber-700">
      {count}
    </span>
  )
}
