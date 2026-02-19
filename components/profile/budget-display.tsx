'use client'

const BUDGET_ROWS = [
  { label: 'Needs (50%)', amount: '$1,200', pct: 50, color: 'bg-blue-400' },
  { label: 'Wants (30%)', amount: '$720', pct: 30, color: 'bg-purple-400' },
  { label: 'Savings (20%)', amount: '$480', pct: 20, color: 'bg-electric' },
]

export function BudgetDisplay() {
  return (
    <div className="bg-zinc-900 rounded-2xl p-4 mb-4">
      <h3 className="text-sm text-zinc-400 mb-1">Monthly Budget (50/30/20)</h3>
      <p className="text-xs text-zinc-500 mb-3">$2,400/mo</p>
      <div className="space-y-3">
        {BUDGET_ROWS.map((row) => (
          <div key={row.label}>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-zinc-300">{row.label}</span>
              <span className="text-sm font-mono text-zinc-300">{row.amount}</span>
            </div>
            <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className={`h-full rounded-full ${row.color}`}
                style={{ width: `${(row.pct / 50) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-zinc-600 mt-3">Tap to customize</p>
    </div>
  )
}
