'use client'

import { useState } from 'react'
import { feedCards } from '@/lib/feed-data'
import { CategoryFilter } from '@/components/feed/category-filter'
import { FeedCard } from '@/components/feed/feed-card'

export default function FeedPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? feedCards
      : feedCards.filter(
          (c) => c.category === activeCategory.toLowerCase()
        )

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Header + Filter bar */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-black/80 backdrop-blur-sm">
        <div className="px-4 pt-3 pb-1">
          <span className="text-xl font-bold text-electric">Fin</span>
        </div>
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      </div>

      {/* Snap scroll container */}
      <div
        className="h-full pt-24"
        style={{
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {filtered.map((card) => (
          <FeedCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  )
}
