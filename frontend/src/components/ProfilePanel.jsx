import React, { useState } from 'react'
import {
  Code2,
  GraduationCap,
  Download,
  Mail,
  Sparkles,
  MapPin,
  Check,
  Copy,
  ExternalLink,
  Award,
  ChevronDown,
  ChevronRight,
  PanelLeftClose
} from 'lucide-react'

const LinkedinIcon = () => (
  <svg className="w-3 h-3 fill-current text-blue-400" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
)

const GithubIcon = () => (
  <svg className="w-3 h-3 fill-current text-slate-300" viewBox="0 0 24 24">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
  </svg>
)

const LeetcodeIcon = () => (
  <svg className="w-3 h-3 fill-current text-amber-400" viewBox="0 0 24 24">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.265a1.373 1.373 0 0 0-.414.974c0 .385.158.746.425.997l5.397 5.093a1.37 1.37 0 0 0 1.914 0 1.352 1.352 0 0 0 0-1.921l-4.437-4.172 4.437-4.436a1.365 1.365 0 0 0-.958-2.8zM17.848 10.93a1.372 1.372 0 0 0-.969.404l-3.327 3.328a1.355 1.355 0 0 0 0 1.921 1.372 1.372 0 0 0 1.938 0l3.327-3.328a1.367 1.367 0 0 0-.969-2.325z"/>
  </svg>
)

export default function ProfilePanel({ candidate, onSelectPrompt, apiUrl, onClose }) {
  const [copiedEmail, setCopiedEmail] = useState(false)

  // Expandable sections state (ALL sections NOT expanded by default as requested)
  const [expandedSections, setExpandedSections] = useState({
    projects: false,
    skills: false,
    education: false,
    certifications: false,
  })

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const allExpanded =
    expandedSections.projects &&
    expandedSections.skills &&
    expandedSections.education &&
    expandedSections.certifications

  const toggleAll = () => {
    const nextState = !allExpanded
    setExpandedSections({
      projects: nextState,
      skills: nextState,
      education: nextState,
      certifications: nextState,
    })
  }

  const name = candidate?.name || 'Ashish Jain'
  const email = candidate?.email || 'asjain0503@gmail.com'
  const phone = candidate?.phone || '+91 7209804300'
  const location = candidate?.location || 'Rajpura, Punjab, India'
  const summary = candidate?.summary || 'Full-Stack AI Developer and final-year Computer Science student skilled in Python, FastAPI, React.js, LLMs, RAG, and Cloud/DevOps.'

  const skills = candidate?.skills?.length
    ? candidate.skills
    : [
        'Python', 'FastAPI', 'React.js', 'Next.js', 'Node.js', 'LLMs', 'RAG',
        'LangChain', 'Groq API', 'Ollama', 'Docker', 'Kubernetes', 'AWS', 'MongoDB', 'MySQL'
      ]

  const projects = candidate?.projects?.length
    ? candidate.projects
    : [
        {
          title: 'HireMeAI – AI-Powered Interactive Digital Twin',
          technologies: ['Python', 'FastAPI', 'React.js', 'Groq API'],
          description: 'Interactive digital twin letting recruiters interview candidate profile through resume-grounded conversations.',
          highlights: [
            'Built REST APIs using FastAPI and integrated Groq LLM for context-aware responses.',
            'Implemented PDF parsing and conversation history management.',
            'Designed responsive React.js interface with resume download.'
          ]
        },
        {
          title: 'VectorForge – Custom Vector Database and RAG Engine',
          technologies: ['Python', 'FastAPI', 'Ollama', 'Llama 3.2'],
          description: 'Custom vector database with HNSW search and end-to-end RAG pipeline.',
          highlights: [
            'Built vector DB using HNSW, KD-Tree, and brute-force algorithms.',
            'Generated 768-dim embeddings with Ollama models.',
            'Developed RAG pipeline using Llama 3.2 for context-aware QA.'
          ]
        }
      ]

  const education = candidate?.education?.length
    ? candidate.education
    : [
        'Chitkara University — B.E. in Computer Science and Engineering (CGPA: 7.64 | 2023–2027)',
        'Sanskar Bharti Global School — Class XII CBSE (78% | 2022)',
        'Sanskar Bharti Global School — Class X CBSE (70.8% | 2020)'
      ]

  const certifications = candidate?.certifications?.length
    ? candidate.certifications
    : [
        'SQL Foundations – Microsoft',
        'Introduction to Agile Development & Scrum – IBM',
        'Introduction to Cloud Computing – IBM',
        'Introduction to DevOps – IBM',
        'Networking Fundamentals – Akamai'
      ]

  const handleCopyEmail = () => {
    if (email) {
      navigator.clipboard.writeText(email)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    }
  }

  return (
    <div className="h-full flex flex-col bg-slate-900/80 border-r border-slate-800/80 backdrop-blur-xl overflow-y-auto">
      {/* Profile Header */}
      <div className="p-6 border-b border-slate-800/80 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start gap-4">
          <div className="relative group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-indigo-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-brand-500/20 ring-2 ring-brand-400/30">
              {name.charAt(0)}
            </div>
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-slate-900" title="Actively Seeking Software Engineer & AI Roles" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <h1 className="text-xl font-bold text-white tracking-tight truncate">{name}</h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full uppercase tracking-wider shrink-0">
                  Open to Work
                </span>
              </div>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700/60 transition-colors shrink-0"
                  title="Collapse Profile Section"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-sm font-semibold text-brand-400 mt-0.5 truncate">
              Full-Stack AI Developer
            </p>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{location}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300 font-medium">B.E. CSE (2023–2027)</span>
            </div>
          </div>
        </div>

        {/* Professional Summary Snippet */}
        <p className="text-xs text-slate-400 mt-3.5 leading-relaxed line-clamp-3 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60">
          {summary}
        </p>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <a
            href={`${apiUrl}/resume/download`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-xl bg-brand-500 hover:bg-brand-600 text-white shadow-md shadow-brand-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5" />
            Download Resume
          </a>

          <button
            onClick={handleCopyEmail}
            className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {copiedEmail ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>

        {/* External Social Links */}
        <div className="flex items-center gap-2 mt-3 text-slate-400">
          <a
            href={`mailto:${email}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 text-[11px] rounded-lg bg-slate-800/50 hover:bg-slate-800 hover:text-white transition-colors border border-slate-800"
            title={email}
          >
            <Mail className="w-3 h-3 text-slate-400" />
            <span className="truncate">Email</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 text-[11px] rounded-lg bg-slate-800/50 hover:bg-slate-800 hover:text-white transition-colors border border-slate-800"
          >
            <LinkedinIcon />
            <span>LinkedIn</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 text-[11px] rounded-lg bg-slate-800/50 hover:bg-slate-800 hover:text-white transition-colors border border-slate-800"
          >
            <GithubIcon />
            <span>GitHub</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>
          <a
            href="https://leetcode.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 text-[11px] rounded-lg bg-slate-800/50 hover:bg-slate-800 hover:text-white transition-colors border border-slate-800"
          >
            <LeetcodeIcon />
            <span>LeetCode</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>
        </div>
      </div>

      {/* Profile Details Sections */}
      <section aria-label="Candidate profile sections" className="p-6 space-y-5 flex-1">
        {/* Global Expand/Collapse Helper */}
        <div className="flex items-center justify-between pb-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Profile Sections
          </span>
          <button
            type="button"
            onClick={toggleAll}
            aria-expanded={allExpanded}
            className="text-[11px] font-medium text-brand-400 hover:text-brand-300 transition-colors"
          >
            {allExpanded ? 'Collapse All' : 'Expand All'}
          </button>
        </div>

        {/* Featured Projects Section (Expandable Accordion - Collapsed by default) */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 overflow-hidden transition-all shadow-sm">
          <button
            type="button"
            onClick={() => toggleSection('projects')}
            aria-expanded={expandedSections.projects}
            aria-controls="section-projects"
            className="w-full flex items-center justify-between p-3.5 bg-slate-800/30 hover:bg-slate-800/60 transition-colors text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-brand-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors">
                Featured Projects
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50">
                {projects.length}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-200">
              <span className="text-[11px] text-slate-500 font-medium">
                {expandedSections.projects ? 'Contract' : 'Expand'}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  expandedSections.projects ? 'rotate-180 text-brand-400' : ''
                }`}
              />
            </div>
          </button>

          {expandedSections.projects && (
            <div id="section-projects" className="p-3.5 pt-2 border-t border-slate-800/60 space-y-3">
              {projects.map((proj, idx) => {
                const title = typeof proj === 'string' ? proj : proj.title
                const desc = typeof proj === 'object' ? proj.description : null
                const tech = typeof proj === 'object' ? proj.technologies : []

                return (
                  <div
                    key={idx}
                    onClick={() => onSelectPrompt(`Walk me through your project "${title}". How is it built and what problems does it solve?`)}
                    className="p-3.5 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-800 hover:border-brand-500/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-white group-hover:text-brand-300 transition-colors">
                        {title}
                      </h3>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-brand-400 transition-colors shrink-0 mt-0.5" />
                    </div>

                    {tech && tech.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {tech.map((t, tidx) => (
                          <span key={tidx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-brand-300 border border-slate-700/50">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {desc && (
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {desc}
                      </p>
                    )}

                    <div className="flex items-center gap-1 text-[11px] text-brand-400/80 mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Ask AI about technical architecture</span>
                      <span>→</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Technical Skills Section (Expandable Accordion - Collapsed by default) */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 overflow-hidden transition-all shadow-sm">
          <button
            type="button"
            onClick={() => toggleSection('skills')}
            aria-expanded={expandedSections.skills}
            aria-controls="section-skills"
            className="w-full flex items-center justify-between p-3.5 bg-slate-800/30 hover:bg-slate-800/60 transition-colors text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors">
                Technical Skills
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50">
                {skills.length}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-200">
              <span className="text-[11px] text-slate-500 font-medium">
                {expandedSections.skills ? 'Contract' : 'Expand'}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  expandedSections.skills ? 'rotate-180 text-brand-400' : ''
                }`}
              />
            </div>
          </button>

          {expandedSections.skills && (
            <div id="section-skills" className="p-3.5 pt-2 border-t border-slate-800/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-slate-500">Click any skill to ask AI</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectPrompt(`What experience do you have with ${skill}? Can you share examples?`)}
                    className="group/btn px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/70 hover:bg-brand-500/10 text-slate-300 hover:text-brand-300 border border-slate-700/50 hover:border-brand-500/30 transition-all text-left flex items-center gap-1.5"
                    title={`Ask AI about ${skill}`}
                  >
                    <span>{skill}</span>
                    <span className="opacity-0 group-hover/btn:opacity-100 text-[10px] text-brand-400 transition-opacity">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Education Section (Expandable Accordion - Collapsed by default) */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 overflow-hidden transition-all shadow-sm">
          <button
            type="button"
            onClick={() => toggleSection('education')}
            aria-expanded={expandedSections.education}
            aria-controls="section-education"
            className="w-full flex items-center justify-between p-3.5 bg-slate-800/30 hover:bg-slate-800/60 transition-colors text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-brand-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors">
                Education
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50">
                {education.length}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-200">
              <span className="text-[11px] text-slate-500 font-medium">
                {expandedSections.education ? 'Contract' : 'Expand'}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  expandedSections.education ? 'rotate-180 text-brand-400' : ''
                }`}
              />
            </div>
          </button>

          {expandedSections.education && (
            <div id="section-education" className="p-3.5 pt-2 border-t border-slate-800/60 space-y-2">
              {education.map((edu, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-800/40 border border-slate-800/60 text-xs text-slate-300 leading-relaxed">
                  {edu}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Certifications Section (Expandable Accordion - Collapsed by default) */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 overflow-hidden transition-all shadow-sm">
          <button
            type="button"
            onClick={() => toggleSection('certifications')}
            aria-expanded={expandedSections.certifications}
            aria-controls="section-certifications"
            className="w-full flex items-center justify-between p-3.5 bg-slate-800/30 hover:bg-slate-800/60 transition-colors text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors">
                Certifications
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50">
                {certifications.length}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-200">
              <span className="text-[11px] text-slate-500 font-medium">
                {expandedSections.certifications ? 'Contract' : 'Expand'}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  expandedSections.certifications ? 'rotate-180 text-brand-400' : ''
                }`}
              />
            </div>
          </button>

          {expandedSections.certifications && (
            <div id="section-certifications" className="p-3.5 pt-2 border-t border-slate-800/60 space-y-1.5">
              {certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-800/30 border border-slate-800/80 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
                  <span className="truncate">{cert}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800/80 text-center text-[11px] text-slate-500">
        AI Digital Twin powered by <span className="text-slate-400 font-semibold">HireMeAI</span>
      </div>
    </div>
  )
}
