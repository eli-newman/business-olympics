'use client'

import { motion } from 'framer-motion'

export function TypingIndicator() {
  return (
    <div className="flex flex-col items-start">
      <span className="text-xs text-electric mb-1">Fin</span>
      <div className="bg-zinc-900 rounded-2xl rounded-bl-sm px-4 py-3 w-16 flex items-center justify-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-zinc-500 rounded-full"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  )
}
