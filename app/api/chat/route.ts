import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { buildSystemPrompt } from '@/lib/system-prompt'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages, userProfile } = await req.json()
  const systemPrompt = userProfile
    ? buildSystemPrompt(userProfile)
    : 'You are Fin, a friendly and encouraging financial expert for college students. Only discuss financial topics. Always end with a clear next step. Use plain language.'

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    system: systemPrompt,
    messages,
  })

  return result.toDataStreamResponse()
}
