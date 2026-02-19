'use client'

import { useState } from 'react'
import type { UserProfile } from '@/types'
import { getProfile, saveProfile as saveProfileToStorage } from '@/lib/profile'

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    if (typeof window === 'undefined') return null
    return getProfile()
  })
  const loading = false

  return {
    profile,
    loading,
    saveProfile: (p: UserProfile) => {
      saveProfileToStorage(p)
      setProfile(p)
    },
  }
}
