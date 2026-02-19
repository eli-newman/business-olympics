'use client'

import type { Goal } from '@/types'
import { Progress } from '@/components/ui/progress'

const GOAL_DATA: Record<Goal, { label: string; description: string; progress: number }> = {
  emergency_fund: { label: 'Build Emergency Fund', description: '3-6 months of expenses', progress: 23 },
  pay_off_debt: { label: 'Pay Off Debt', description: 'Eliminate high-interest debt', progress: 15 },
  start_investing: { label: 'Start Investing', description: 'First $1,000 invested', progress: 8 },
  save_for_something: { label: 'Save for a Goal', description: 'Hit your savings target', progress: 31 },
}

export function GoalProgress({ goal }: { goal: Goal }) {
  const data = GOAL_DATA[goal]

  return (
    <div className="bg-zinc-900 rounded-2xl p-4 mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold text-white">{data.label}</span>
        <span className="text-electric text-sm font-mono">{data.progress}%</span>
      </div>
      <p className="text-xs text-zinc-400 mb-3">{data.description}</p>
      <Progress value={data.progress} className="h-2 [&>div]:bg-electric" />
    </div>
  )
}
