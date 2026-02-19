import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { buildSystemPrompt } from '@/lib/system-prompt'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages, userProfile } = await req.json()
  const systemPrompt = userProfile
    ? buildSystemPrompt(userProfile)
    : 'You are Fin, an AI financial advisor for Gen Z. Be helpful, specific, and speak like a smart friend.'

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    system: systemPrompt,
    messages,
  })

  return result.toDataStreamResponse()
}
