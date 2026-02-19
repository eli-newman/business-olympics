'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getProfile } from '@/lib/profile'
import { OnboardingFlow } from '@/components/onboarding/onboarding-flow'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const profile = getProfile()
    if (profile) {
      router.replace('/feed')
    }
  }, [router])

  return <OnboardingFlow />
}
