'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useProfile } from '@/hooks/use-profile'
import type { Situation, Goal } from '@/types'
import { GoalProgress } from '@/components/profile/goal-progress'
import { NetWorthCard } from '@/components/profile/net-worth-card'
import { BudgetDisplay } from '@/components/profile/budget-display'
import { BadgeGrid } from '@/components/profile/badge-grid'

const SITUATION_OPTIONS: { value: Situation; label: string }[] = [
  { value: 'student_loans', label: 'Student Loans' },
  { value: 'paycheck_to_paycheck', label: 'Paycheck to Paycheck' },
  { value: 'starting_to_save', label: 'Starting to Save' },
  { value: 'no_income', label: 'No Income' },
]

const GOAL_OPTIONS: { value: Goal; label: string }[] = [
  { value: 'emergency_fund', label: 'Emergency Fund' },
  { value: 'pay_off_debt', label: 'Pay Off Debt' },
  { value: 'start_investing', label: 'Start Investing' },
  { value: 'save_for_something', label: 'Save for Something' },
]

export default function ProfilePage() {
  const { profile, loading, saveProfile } = useProfile()
  const [editMode, setEditMode] = useState(false)
  const [formState, setFormState] = useState(() => ({
    name: profile?.name ?? '',
    age: profile?.age ?? 18,
    situation: (profile?.situation ?? 'starting_to_save') as Situation,
    goal: (profile?.goal ?? 'emergency_fund') as Goal,
  }))

  function handleSave() {
    if (!profile) return
    saveProfile({ ...profile, ...formState })
    setEditMode(false)
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-black px-4 py-6 pb-24">
        <h1 className="text-2xl font-bold text-white mb-6">Profile</h1>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-zinc-900 rounded-2xl p-4 h-24 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black px-4 py-6 pb-24">
        <h1 className="text-2xl font-bold text-white mb-4">Profile</h1>
        <p className="text-zinc-400 mb-4">Complete onboarding to see your profile</p>
        <Link href="/" className="text-electric underline">
          Go to onboarding
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-black px-4 py-6 pb-24">
      <h1 className="text-2xl font-bold text-white mb-6">Profile</h1>

      {/* YOUR INFO */}
      <div className="bg-zinc-900 rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm text-zinc-400">Your Info</h2>
          {editMode ? (
            <button onClick={handleSave} className="text-electric text-sm font-medium">
              Save
            </button>
          ) : (
            <button onClick={() => setEditMode(true)} className="text-electric text-sm font-medium">
              Edit
            </button>
          )}
        </div>

        {editMode ? (
          <div className="space-y-3">
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Name</label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                className="bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2 w-full text-sm outline-none focus:border-electric"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Age</label>
              <input
                type="number"
                value={formState.age}
                onChange={(e) => setFormState((s) => ({ ...s, age: parseInt(e.target.value) || 0 }))}
                className="bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2 w-full text-sm outline-none focus:border-electric"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Situation</label>
              <div className="flex flex-wrap gap-2">
                {SITUATION_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFormState((s) => ({ ...s, situation: opt.value }))}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      formState.situation === opt.value
                        ? 'bg-electric text-black'
                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Goal</label>
              <div className="flex flex-wrap gap-2">
                {GOAL_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFormState((s) => ({ ...s, goal: opt.value }))}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      formState.goal === opt.value
                        ? 'bg-electric text-black'
                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-zinc-400 text-sm">Name</span>
              <span className="text-white text-sm">{profile.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400 text-sm">Age</span>
              <span className="text-white text-sm">{profile.age}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400 text-sm">Situation</span>
              <span className="text-white text-sm">
                {SITUATION_OPTIONS.find((o) => o.value === profile.situation)?.label}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400 text-sm">Goal</span>
              <span className="text-white text-sm">
                {GOAL_OPTIONS.find((o) => o.value === profile.goal)?.label}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* GOAL PROGRESS */}
      <GoalProgress goal={profile.goal} />

      {/* NET WORTH */}
      <NetWorthCard />

      {/* BUDGET */}
      <BudgetDisplay />

      {/* BADGES */}
      <BadgeGrid unlockedBadges={['first_steps']} />
    </div>
  )
}
