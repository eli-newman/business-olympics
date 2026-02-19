'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface OnboardingCardProps {
  question: string
  subtitle?: string
  children: ReactNode
  onNext: () => void
  onBack?: () => void
  isLast?: boolean
  canProceed: boolean
  step: number
}

const TOTAL_STEPS = 4

export function OnboardingCard({
  question,
  subtitle,
  children,
  onNext,
  onBack,
  isLast,
  canProceed,
  step,
}: OnboardingCardProps) {
  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="min-h-screen bg-black flex flex-col justify-center px-6 absolute inset-0"
    >
      {/* Progress dots */}
      <div className="absolute top-12 left-0 right-0 flex justify-center gap-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i <= step ? 'bg-electric' : 'bg-zinc-700'
            }`}
          />
        ))}
      </div>

      {/* Back button */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-12 left-6 text-zinc-400 hover:text-white transition-colors"
          aria-label="Go back"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Content */}
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl font-bold text-white">{question}</h1>
        {subtitle && <p className="text-zinc-400 text-sm">{subtitle}</p>}
      </div>

      <div className="flex flex-col gap-3">{children}</div>

      {/* Next button */}
      <div className="mt-12">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="w-full py-4 rounded-xl font-semibold text-lg transition-all bg-electric text-black disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {isLast ? 'Get Started' : 'Continue'}
        </button>
      </div>
    </motion.div>
  )
}
