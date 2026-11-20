import React from 'react'
import { Sun, Moon, Terminal, Mail, Download, ExternalLink } from 'lucide-react'

export default function Navbar({ theme, onToggleTheme, onOpenContact }) {
  return (
    <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-black text-[#ccff00] dark:bg-white dark:text-black flex items-center justify-center font-mono font-bold text-sm shadow-sm select-none">
          &gt;_
        </div>
        <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
          Hire Me <span className="font-serif italic font-normal text-slate-800 dark:text-slate-200">AI</span>
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Status Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.1] text-xs font-mono text-slate-700 dark:text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>sys: open to roles</span>
        </div>

        {/* Dark / Light Mode Toggle Button */}
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="p-2 rounded-full bg-black/[0.05] dark:bg-white/[0.1] text-slate-800 dark:text-slate-200 hover:scale-105 active:scale-95 transition-all border border-black/[0.08] dark:border-white/[0.1]"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
        </button>

        {/* Contact Button */}
        <button
          type="button"
          onClick={onOpenContact}
          className="px-5 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-semibold hover:opacity-90 active:scale-95 transition-all shadow-sm"
        >
          Contact
        </button>
      </div>
    </header>
  )
}
