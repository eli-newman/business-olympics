'use client'

const prompts = [
  'Where should I put my first $500?',
  "Explain credit scores like I'm 5",
  'Help me make a budget',
  'Should I pay off loans or invest first?',
]

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void
}

export function SuggestedPrompts({ onSelect }: SuggestedPromptsProps) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          onClick={() => onSelect(prompt)}
          className="border border-zinc-700 bg-zinc-900/50 text-zinc-300 text-sm rounded-xl px-4 py-3 text-left transition-colors hover:border-electric/50 hover:text-white"
        >
          {prompt}
        </button>
      ))}
    </div>
  )
}
