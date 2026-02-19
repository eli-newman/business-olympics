'use client'

import ReactMarkdown from 'react-markdown'

interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="bg-electric text-black rounded-2xl rounded-br-sm px-4 py-3 max-w-[85%]">
          <p className="text-sm font-medium leading-relaxed">{content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <span className="text-[11px] font-semibold tracking-wider uppercase text-electric/70 px-1">
        Fin
      </span>
      <div className="bg-zinc-900 border border-zinc-800 text-white rounded-2xl rounded-bl-sm px-4 py-3 max-w-[90%] shadow-sm">
        <div className="prose-fin text-sm leading-relaxed">
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="mb-2 last:mb-0 leading-[1.7]">{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="font-700 text-white">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="text-zinc-300 not-italic font-medium">{children}</em>
              ),
              ul: ({ children }) => (
                <ul className="mb-2 last:mb-0 space-y-1 pl-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-2 last:mb-0 space-y-1 pl-1 list-decimal list-inside">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="flex gap-2 items-start text-zinc-200">
                  <span className="text-electric mt-[6px] text-[8px] shrink-0">●</span>
                  <span>{children}</span>
                </li>
              ),
              h1: ({ children }) => (
                <h1 className="text-base font-bold text-white mb-1 mt-2 first:mt-0">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-sm font-bold text-white mb-1 mt-2 first:mt-0">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-sm font-semibold text-electric mb-1 mt-2 first:mt-0">{children}</h3>
              ),
              code: ({ children }) => (
                <code className="bg-black/60 text-electric font-mono text-xs px-1.5 py-0.5 rounded">{children}</code>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-electric/50 pl-3 my-2 text-zinc-400">
                  {children}
                </blockquote>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
