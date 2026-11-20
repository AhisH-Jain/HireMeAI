import React, { useState } from 'react'
import { Bot, User, Copy, Check } from 'lucide-react'

// Simple Markdown-style formatter for bullets, bold, and code blocks
function FormattedContent({ content }) {
  const lines = content.split('\n')

  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim()
        if (!trimmed) {
          return <div key={idx} className="h-2" />
        }

        // Bullet point
        if (trimmed.startsWith('•') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const bulletText = trimmed.replace(/^[•\-\*]\s*/, '')
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
              <div className="flex-1">
                <ParseInline text={bulletText} />
              </div>
            </div>
          )
        }

        // Numbered list
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/)
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="font-mono text-xs text-brand-400 font-semibold shrink-0 mt-0.5">
                {numMatch[1]}.
              </span>
              <div className="flex-1">
                <ParseInline text={numMatch[2]} />
              </div>
            </div>
          )
        }

        return (
          <p key={idx}>
            <ParseInline text={trimmed} />
          </p>
        )
      })}
    </div>
  )
}

function ParseInline({ text }) {
  // Regex to split by bold (**text**) and code (`code`)
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g)

  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold text-white">
              {part.slice(2, -2)}
            </strong>
          )
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={i}
              className="px-1.5 py-0.5 text-xs font-mono bg-slate-800 text-brand-300 rounded border border-slate-700/50"
            >
              {part.slice(1, -1)}
            </code>
          )
        }
        return part
      })}
    </span>
  )
}

export default function ChatMessage({ message, candidateName = 'Rohit' }) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={`group flex items-start gap-3 py-3 px-2 rounded-2xl transition-colors ${
        isUser ? 'flex-row-reverse' : 'hover:bg-slate-900/40'
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
          isUser
            ? 'bg-slate-700 text-slate-200'
            : 'bg-gradient-to-tr from-brand-600 to-indigo-600 text-white ring-2 ring-brand-500/30'
        }`}
      >
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>

      {/* Content Bubble */}
      <div
        className={`max-w-[82%] relative rounded-2xl px-4 py-3 shadow-sm ${
          isUser
            ? 'bg-brand-600 text-white rounded-tr-none'
            : 'bg-slate-800/80 text-slate-200 border border-slate-700/60 rounded-tl-none backdrop-blur-md'
        }`}
      >
        {/* Header Info */}
        <div
          className={`flex items-center gap-2 mb-1.5 text-[11px] ${
            isUser ? 'justify-end text-brand-200' : 'text-slate-400'
          }`}
        >
          <span className="font-semibold">{isUser ? 'You (Recruiter / Visitor)' : `${candidateName}'s AI Twin`}</span>
          {message.timestamp && (
            <>
              <span>•</span>
              <span className="font-mono">{message.timestamp}</span>
            </>
          )}

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 hover:text-white transition-opacity ml-1 p-0.5"
            title="Copy message"
          >
            {copied ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </button>
        </div>

        {/* Message Body */}
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        ) : (
          <FormattedContent content={message.content} />
        )}
      </div>
    </div>
  )
}
