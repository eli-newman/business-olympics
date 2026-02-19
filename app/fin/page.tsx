'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useChat } from 'ai/react'
import { Send } from 'lucide-react'
import { useProfile } from '@/hooks/use-profile'
import { ChatMessage } from '@/components/fin/chat-message'
import { TypingIndicator } from '@/components/fin/typing-indicator'
import { SuggestedPrompts } from '@/components/fin/suggested-prompts'

const FALLBACK_MESSAGE =
  "Based on your situation, I'd focus on one thing at a time. The most important move is usually building a small $500 emergency buffer first, then tackling your highest-interest debt. Want me to walk through a specific plan?"

export default function FinPage() {
  const { profile } = useProfile()
  const scrollRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const fallbackSentRef = useRef(false)

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: '/api/chat',
    body: { userProfile: profile },
    onFinish: () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      fallbackSentRef.current = false
    },
    onError: () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      if (!fallbackSentRef.current) {
        fallbackSentRef.current = true
        append({ role: 'assistant', content: FALLBACK_MESSAGE })
      }
    },
  })

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleSend = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!input.trim()) return
      fallbackSentRef.current = false
      handleSubmit(e)
      timeoutRef.current = setTimeout(() => {
        if (!fallbackSentRef.current) {
          fallbackSentRef.current = true
          append({ role: 'assistant', content: FALLBACK_MESSAGE })
        }
        timeoutRef.current = null
      }, 8000)
    },
    [input, handleSubmit, append],
  )

  const handlePromptSelect = useCallback(
    (prompt: string) => {
      fallbackSentRef.current = false
      append({ role: 'user', content: prompt })
      timeoutRef.current = setTimeout(() => {
        if (!fallbackSentRef.current) {
          fallbackSentRef.current = true
          append({ role: 'assistant', content: FALLBACK_MESSAGE })
        }
        timeoutRef.current = null
      }, 8000)
    },
    [append],
  )

  const lastMessage = messages[messages.length - 1]
  const showTyping = isLoading && lastMessage?.role === 'user'

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-black border-b border-zinc-900 px-4 py-3">
        <h1 className="text-xl font-bold text-electric">Fin</h1>
        <p className="text-xs text-zinc-500">AI Financial Advisor</p>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pt-20 pb-32 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">
                Hey{profile?.name ? `, ${profile.name}` : ''}! I&apos;m Fin.
              </h2>
              <p className="text-sm text-zinc-400">
                Your AI financial advisor. Ask me anything about money.
              </p>
            </div>
            <SuggestedPrompts onSelect={handlePromptSelect} />
          </div>
        ) : (
          <>
            {messages.map((m) => (
              <ChatMessage key={m.id} role={m.role as 'user' | 'assistant'} content={m.content} />
            ))}
            {showTyping && <TypingIndicator />}
          </>
        )}
      </div>

      {/* Input */}
      <div className="fixed bottom-16 left-0 right-0 bg-black border-t border-zinc-900 px-4 py-3">
        <form onSubmit={handleSend} className="flex gap-2 items-center">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask Fin anything..."
            className="bg-zinc-900 border border-zinc-700 text-white rounded-full px-4 py-3 flex-1 outline-none focus:border-electric placeholder:text-zinc-500 text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-electric text-black rounded-full p-3 disabled:opacity-50 transition-opacity"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  )
}
