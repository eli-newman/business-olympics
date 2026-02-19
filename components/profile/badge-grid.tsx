'use client'

const BADGES = [
  { id: 'first_steps', emoji: '\u{1F331}', name: 'First Steps', desc: 'Completed onboarding' },
  { id: 'debt_slayer', emoji: '\u{1F4AA}', name: 'Debt Slayer', desc: 'Made 3 months of extra payments' },
  { id: 'investor', emoji: '\u{1F4C8}', name: 'Investor', desc: 'Made your first investment' },
  { id: 'saver', emoji: '\u{26A1}', name: 'Emergency Saver', desc: 'Hit $500 in savings' },
]

export function BadgeGrid({ unlockedBadges }: { unlockedBadges: string[] }) {
  return (
    <div className="bg-zinc-900 rounded-2xl p-4 mb-4">
      <h3 className="text-sm text-zinc-400 mb-3">Badges</h3>
      <div className="grid grid-cols-2 gap-3">
        {BADGES.map((badge) => {
          const unlocked = unlockedBadges.includes(badge.id)
          return (
            <div
              key={badge.id}
              className={
                unlocked
                  ? 'bg-zinc-800 border border-electric/30 text-white rounded-xl p-3'
                  : 'bg-zinc-900/50 border border-zinc-800 text-zinc-600 opacity-60 rounded-xl p-3'
              }
            >
              <div className="text-2xl mb-1">{unlocked ? badge.emoji : '\u{1F512}'}</div>
              <div className="text-sm font-medium">{badge.name}</div>
              <div className="text-xs mt-0.5 opacity-70">{badge.desc}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
