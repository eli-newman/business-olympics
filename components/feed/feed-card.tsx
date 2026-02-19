'use client'

import { motion } from 'framer-motion'
import type { FeedCard as FeedCardType } from '@/types'

interface FeedCardProps {
  card: FeedCardType
}

export function FeedCard({ card }: FeedCardProps) {
  return (
    <div
      className="relative w-full flex flex-col justify-end"
      style={{ scrollSnapAlign: 'start', height: '100svh' }}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-b ${card.gradient}`} />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <motion.div
        className="relative z-10 p-6 pb-24"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Category badge */}
        <span className="inline-block bg-white/10 text-white text-xs uppercase tracking-wider rounded-full px-3 py-1 mb-3">
          {card.category}
        </span>

        {/* Emoji */}
        <div className="text-5xl mb-3">{card.emoji}</div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-2">{card.title}</h2>

        {/* Body */}
        <p className="text-zinc-300 text-sm leading-relaxed mb-4">{card.body}</p>

        {/* Stat */}
        {card.stat && (
          <div className="bg-electric/20 border border-electric/30 text-electric text-sm font-medium rounded-lg p-3">
            {card.stat}
          </div>
        )}
      </motion.div>
    </div>
  )
}
