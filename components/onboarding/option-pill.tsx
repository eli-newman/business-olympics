'use client'

import { motion } from 'framer-motion'

interface OptionPillProps {
  label: string
  selected: boolean
  onClick: () => void
}

export function OptionPill({ label, selected, onClick }: OptionPillProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`border rounded-full px-4 py-3 w-full text-left transition-colors ${
        selected
          ? 'border-electric text-electric bg-electric/10'
          : 'border-zinc-700 text-zinc-300'
      }`}
    >
      {label}
    </motion.button>
  )
}
