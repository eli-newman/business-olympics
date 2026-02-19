export type Situation = 'student_loans' | 'paycheck_to_paycheck' | 'starting_to_save' | 'no_income'

export type Goal = 'emergency_fund' | 'pay_off_debt' | 'start_investing' | 'save_for_something'

export interface UserProfile {
  name: string
  age: number
  situation: Situation
  goal: Goal
  createdAt: string
}

export interface FeedCard {
  id: string
  category: 'budgeting' | 'debt' | 'investing' | 'credit'
  title: string
  body: string
  stat?: string
  emoji: string
  gradient: string
}
