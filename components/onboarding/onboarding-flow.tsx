'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import type { Situation, Goal } from '@/types'
import { saveProfile } from '@/lib/profile'
import { OnboardingCard } from './onboarding-card'
import { OptionPill } from './option-pill'

const SITUATIONS: { label: string; value: Situation }[] = [
  { label: 'Student with loans', value: 'student_loans' },
  { label: 'Paycheck to paycheck', value: 'paycheck_to_paycheck' },
  { label: 'Starting to save', value: 'starting_to_save' },
  { label: 'No income yet', value: 'no_income' },
]

const GOALS: { label: string; value: Goal }[] = [
  { label: 'Build an emergency fund', value: 'emergency_fund' },
  { label: 'Pay off my debt', value: 'pay_off_debt' },
  { label: 'Start investing', value: 'start_investing' },
  { label: 'Save for something big', value: 'save_for_something' },
]

export function OnboardingFlow() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [situation, setSituation] = useState<Situation | null>(null)
  const [goal, setGoal] = useState<Goal | null>(null)

  const parsedAge = parseInt(age, 10)

  const canProceed = [
    name.trim().length > 0,
    !isNaN(parsedAge) && parsedAge > 0 && parsedAge < 100,
    situation !== null,
    goal !== null,
  ][step]

  function handleNext() {
    if (!canProceed) return
    if (step < 3) {
      setStep(step + 1)
    } else {
      saveProfile({
        name: name.trim(),
        age: parsedAge,
        situation: situation!,
        goal: goal!,
        createdAt: new Date().toISOString(),
      })
      router.push('/feed')
    }
  }

  function handleBack() {
    if (step > 0) setStep(step - 1)
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <OnboardingCard
            key="step-0"
            question="What's your name?"
            subtitle="We'll personalize your experience"
            onNext={handleNext}
            canProceed={canProceed}
            step={step}
          >
            <input
              type="text"
              name="name"
              autoComplete="given-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type your name…"
              autoFocus
              className="bg-transparent border-b-2 border-electric text-white text-xl w-full py-2 focus-visible:outline-none placeholder:text-zinc-600"
              onKeyDown={(e) => e.key === 'Enter' && canProceed && handleNext()}
            />
          </OnboardingCard>
        )}

        {step === 1 && (
          <OnboardingCard
            key="step-1"
            question={`How old are you, ${name}?`}
            subtitle="This helps us tailor our advice"
            onNext={handleNext}
            onBack={handleBack}
            canProceed={canProceed}
            step={step}
          >
            <input
              type="number"
              name="age"
              autoComplete="off"
              inputMode="numeric"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g. 21"
              autoFocus
              className="bg-transparent border-b-2 border-electric text-white text-xl w-full py-2 focus-visible:outline-none placeholder:text-zinc-600"
              onKeyDown={(e) => e.key === 'Enter' && canProceed && handleNext()}
            />
          </OnboardingCard>
        )}

        {step === 2 && (
          <OnboardingCard
            key="step-2"
            question="What's your financial situation?"
            subtitle="No judgment — just helping you start"
            onNext={handleNext}
            onBack={handleBack}
            canProceed={canProceed}
            step={step}
          >
            {SITUATIONS.map((s) => (
              <OptionPill
                key={s.value}
                label={s.label}
                selected={situation === s.value}
                onClick={() => setSituation(s.value)}
              />
            ))}
          </OnboardingCard>
        )}

        {step === 3 && (
          <OnboardingCard
            key="step-3"
            question="What's your #1 financial goal?"
            subtitle="We'll build your plan around this"
            onNext={handleNext}
            onBack={handleBack}
            isLast
            canProceed={canProceed}
            step={step}
          >
            {GOALS.map((g) => (
              <OptionPill
                key={g.value}
                label={g.label}
                selected={goal === g.value}
                onClick={() => setGoal(g.value)}
              />
            ))}
          </OnboardingCard>
        )}
      </AnimatePresence>
    </div>
  )
}
