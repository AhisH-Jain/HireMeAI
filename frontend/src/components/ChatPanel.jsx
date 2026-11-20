import React, { useState, useRef, useEffect } from 'react'
import {
  Send,
  Sparkles,
  RotateCcw,
  Bot,
  Code2,
  Database,
  HelpCircle,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react'
import ChatMessage from './ChatMessage'

export default function ChatPanel({
  messages,
  onSendMessage,
  onClearChat,
  isLoading,
  candidateName = 'Ashish Jain'
}) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return
    onSendMessage(input.trim())
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const starterPrompts = [
    {
      title: 'HireMeAI Architecture',
      desc: 'Walk me through how you built HireMeAI with FastAPI, Groq LLM, and React.',
      icon: Code2,
    },
    {
      title: 'VectorForge & RAG',
      desc: 'How did you build the custom vector database and RAG pipeline using HNSW and Llama 3.2?',
      icon: Database,
    },
    {
      title: 'AI & Full-Stack Skills',
      desc: 'What is your hands-on experience with LLMs, LangChain, FastAPI, and React?',
      icon: Sparkles,
    },
    {
      title: 'Why Hire Ashish?',
      desc: 'Why should we hire you as a Software Engineer or AI/Full-Stack Developer?',
      icon: HelpCircle,
    },
  ]

  return (
    <div className="h-full flex flex-col bg-slate-950 relative">
      {/* Chat Header */}
      <div className="h-16 px-6 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-tight">
                {candidateName}&apos;s AI Assistant
              </h2>
              <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-brand-400" />
              Verified & grounded strictly in candidate resume
            </p>
          </div>
        </div>

        {/* Reset / Actions */}
        {messages.length > 0 && (
          <button
            onClick={onClearChat}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg border border-slate-700/50 transition-colors"
            title="Start new conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.length === 0 ? (
          <div className="max-w-2xl mx-auto h-full flex flex-col justify-center py-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-500/20 to-indigo-500/20 border border-brand-500/30 text-brand-400 mb-4 shadow-xl shadow-brand-500/10">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Welcome to HireMeAI
              </h3>
              <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
                I am an interactive AI representative for <strong className="text-slate-200">{candidateName}</strong>.
                Ask me about work history, tech skills, metrics, and achievements.
              </p>
            </div>

            {/* Quick Starter Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {starterPrompts.map((item, idx) => {
                const Icon = item.icon
                return (
                  <button
                    key={idx}
                    onClick={() => onSendMessage(item.desc)}
                    className="p-4 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-brand-500/40 text-left transition-all hover:scale-[1.01] group shadow-sm"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="p-1.5 rounded-lg bg-slate-800 text-brand-400 group-hover:bg-brand-500/20 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-white group-hover:text-brand-300 transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300">
                      {item.desc}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-3">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} candidateName={candidateName} />
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-start gap-3 py-3 px-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 animate-pulse" />
                </div>
                <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-xs text-slate-400 ml-2 font-medium">Formulating answer from resume...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Chat Input Bar */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/60 backdrop-blur-md shrink-0">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask anything about ${candidateName}'s experience, skills, projects...`}
              disabled={isLoading}
              className="w-full pl-4 pr-24 py-3.5 bg-slate-900/90 border border-slate-700/80 hover:border-slate-600 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-2xl text-sm text-slate-100 placeholder-slate-500 outline-none transition-all disabled:opacity-60 shadow-inner"
            />

            <div className="absolute right-2 flex items-center gap-1.5">
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:bg-slate-800 text-white disabled:text-slate-600 transition-all disabled:cursor-not-allowed shadow-md shadow-brand-500/20 disabled:shadow-none hover:scale-105 active:scale-95"
                title="Send question (Enter)"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-slate-500">
            <span>Press <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono text-[10px]">Enter</kbd> to send</span>
            <span>Accurate & hallucination-free</span>
          </div>
        </form>
      </div>
    </div>
  )
}
