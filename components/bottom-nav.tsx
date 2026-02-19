'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Newspaper, MessageCircle, User } from 'lucide-react'

const tabs = [
  { href: '/feed', label: 'Feed', icon: Newspaper },
  { href: '/fin', label: 'Fin', icon: MessageCircle },
  { href: '/profile', label: 'Profile', icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-zinc-950 border-t border-zinc-800 pb-safe z-50">
      <div className="flex items-center justify-around max-w-md mx-auto h-14">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href)
          const Icon = tab.icon
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 ${
                isActive ? 'text-electric' : 'text-zinc-500'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
