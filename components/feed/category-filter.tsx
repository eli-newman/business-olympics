'use client'

const categories = ['All', 'Budgeting', 'Debt', 'Investing', 'Credit']

interface CategoryFilterProps {
  active: string
  onChange: (cat: string) => void
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div
      className="flex gap-2 px-4 py-3 overflow-x-auto"
      style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
    >
      {categories.map((cat) => {
        const isActive = active === cat
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors ${
              isActive
                ? 'bg-electric text-black font-semibold'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-700'
            }`}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
