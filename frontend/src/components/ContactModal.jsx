import React, { useState } from 'react'
import { X, Mail, Phone, MapPin, Download, Copy, Check, ExternalLink } from 'lucide-react'

const LinkedinIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current text-blue-500" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
)

const GithubIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current text-slate-800 dark:text-slate-200" viewBox="0 0 24 24">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
  </svg>
)

const LeetcodeIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current text-amber-500" viewBox="0 0 24 24">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.265a1.373 1.373 0 0 0-.414.974c0 .385.158.746.425.997l5.397 5.093a1.37 1.37 0 0 0 1.914 0 1.352 1.352 0 0 0 0-1.921l-4.437-4.172 4.437-4.436a1.365 1.365 0 0 0-.958-2.8zM17.848 10.93a1.372 1.372 0 0 0-.969.404l-3.327 3.328a1.355 1.355 0 0 0 0 1.921 1.372 1.372 0 0 0 1.938 0l3.327-3.328a1.367 1.367 0 0 0-.969-2.325z"/>
  </svg>
)

export default function ContactModal({ isOpen, onClose, apiUrl }) {
  const [copied, setCopied] = useState(false)
  const email = 'asjain0503@gmail.com'
  const phone = '+91 7209804300'

  if (!isOpen) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-[#faf8f5] dark:bg-[#121620] border border-black/10 dark:border-white/10 shadow-2xl p-6 text-slate-900 dark:text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
            // Direct Contact
          </span>
          <h3 className="text-2xl font-bold font-serif mt-1">Get in Touch</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Available for Software Engineer & AI Full-Stack Developer roles.
          </p>
        </div>

        {/* Contact Info Items */}
        <div className="space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08]">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span className="select-all">{email}</span>
            </div>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors"
              title="Copy Email"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08]">
            <Phone className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <span>{phone}</span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08]">
            <MapPin className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <span>Rajpura, Punjab, India (Open to Relocation)</span>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] hover:border-blue-500/50 text-xs font-mono font-medium transition-all"
          >
            <LinkedinIcon />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] hover:border-slate-500/50 text-xs font-mono font-medium transition-all"
          >
            <GithubIcon />
            <span>GitHub</span>
          </a>
          <a
            href="https://leetcode.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] hover:border-amber-500/50 text-xs font-mono font-medium transition-all"
          >
            <LeetcodeIcon />
            <span>LeetCode</span>
          </a>
        </div>

        {/* Resume Download Action */}
        <div className="mt-5 pt-4 border-t border-black/10 dark:border-white/10">
          <a
            href={`${apiUrl}/resume/download`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-semibold text-xs hover:opacity-90 active:scale-[0.98] transition-all shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume (PDF)</span>
          </a>
        </div>
      </div>
    </div>
  )
}
