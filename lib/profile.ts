import type { UserProfile } from '@/types'

const KEY = 'fin_profile'

export function getProfile(): UserProfile | null {
  try {
    if (typeof window === 'undefined') return null
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    return JSON.parse(raw) as UserProfile
  } catch {
    return null
  }
}

export function saveProfile(profile: UserProfile): void {
  try {
    if (typeof window === 'undefined') return
    localStorage.setItem(KEY, JSON.stringify(profile))
  } catch {
    // silently fail in SSR or storage-restricted environments
  }
}

export function clearProfile(): void {
  try {
    if (typeof window === 'undefined') return
    localStorage.removeItem(KEY)
  } catch {
    // silently fail
  }
}
