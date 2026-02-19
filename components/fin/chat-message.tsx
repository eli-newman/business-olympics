'use client'

interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="bg-electric text-black rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%]">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start">
      <span className="text-xs text-electric mb-1">Fin</span>
      <div className="bg-zinc-900 text-white rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%]">
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  )
}
