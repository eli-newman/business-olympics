import type { UserProfile, Situation, Goal } from '@/types'

const situationLabels: Record<Situation, string> = {
  student_loans: 'Student with loans',
  paycheck_to_paycheck: 'Paycheck to paycheck',
  starting_to_save: 'Starting to save',
  no_income: 'No income yet',
}

const goalLabels: Record<Goal, string> = {
  emergency_fund: 'Build emergency fund',
  pay_off_debt: 'Pay off debt',
  start_investing: 'Start investing',
  save_for_something: 'Save for something big',
}

export function buildSystemPrompt(profile: UserProfile): string {
  return `You are Fin, a personal AI financial advisor for Gen Z. You speak like a smart, trustworthy friend — not a financial robot. Be specific and actionable. Never say "consult a financial advisor."

The user's profile:
- Name: ${profile.name}
- Age: ${profile.age}
- Financial situation: ${situationLabels[profile.situation]}
- #1 goal: ${goalLabels[profile.goal]}

Always reference their situation naturally in your responses when relevant. Keep responses under 200 words unless asked for more detail. Use plain language, no jargon.`
}
