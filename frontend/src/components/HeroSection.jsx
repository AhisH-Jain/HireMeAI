import React, { useState } from "react";
import {
  MapPin,
  Sparkles,
  Code2,
  Wrench,
  GraduationCap,
  Award,
  ChevronDown,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export default function HeroSection({ onRunCommand, candidate }) {
  // Expandable sections (collapsed by default as requested)
  const [expanded, setExpanded] = useState({
    skills: false,
    projects: false,
    education: false,
    certifications: false,
  });

  const toggle = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // All technical skills grouped by category (used for the Skills accordion)
  const skillCategories = [
    {
      label: "Languages",
      color: "text-sky-400",
      skills: ["Python", "Java", "JavaScript", "SQL", "HTML", "CSS"],
    },
    {
      label: "Frontend",
      color: "text-emerald-400",
      skills: ["React.js", "Next.js", "Tailwind CSS"],
    },
    {
      label: "Backend",
      color: "text-purple-400",
      skills: ["Node.js", "Express.js", "FastAPI", "REST APIs"],
    },
    {
      label: "Databases",
      color: "text-orange-400",
      skills: ["MongoDB", "MySQL", "Firebase", "Vector Databases"],
    },
    {
      label: "AI & Gen AI",
      color: "text-red-400",
      skills: [
        "LLMs",
        "RAG",
        "LangChain",
        "AI Agents",
        "Prompt Engineering",
        "Groq API",
        "Ollama",
      ],
    },
    {
      label: "Tools & Platforms",
      color: "text-amber-400",
      skills: [
        "Git",
        "GitHub",
        "Postman",
        "Visual Studio Code",
        "Claude Code",
        "Codex",
      ],
    },
    {
      label: "Cloud & DevOps",
      color: "text-teal-400",
      skills: [
        "AWS",
        "Docker",
        "Kubernetes",
        "Linux",
        "CI/CD",
        "Auto Scaling",
        "Load Balancing",
      ],
    },
    {
      label: "Concepts",
      color: "text-pink-400",
      skills: ["DSA", "Agile", "Scrum", "Computer Networking"],
    },
  ];

  const projects = [
    {
      title: "HireMeAI – AI-Powered Interactive Digital Twin",
      tech: ["Python", "FastAPI", "React.js", "Groq API"],
      desc: "Interactive digital twin letting recruiters interview candidate profile through resume-grounded conversations.",
      command: "/projects",
    },
    {
      title: "VectorForge – Custom Vector Database & RAG Engine",
      tech: ["Python", "FastAPI", "Ollama", "Llama 3.2"],
      desc: "Custom vector database with HNSW, KD-Tree algorithms, and an end-to-end RAG pipeline.",
      command: "/architecture",
    },
  ];

  const education = [
    "Chitkara University — B.E. in Computer Science & Engineering (CGPA: 7.64 | 2023–2027)",
    "Sanskar Bharti Global School — Class XII CBSE (78% | 2022)",
    "Sanskar Bharti Global School — Class X CBSE (70.8% | 2020)",
  ];

  const certifications = [
    "SQL Foundations – Microsoft",
    "Introduction to Agile Development & Scrum – IBM",
    "Introduction to Cloud Computing – IBM",
    "Introduction to DevOps – IBM",
    "Networking Fundamentals – Akamai",
  ];

  return (
    <div className="flex flex-col space-y-8 max-w-xl">
      {/* Monospace Role Comment */}
      <div className="font-mono text-xs sm:text-sm tracking-wider text-slate-500 dark:text-slate-400 font-medium">
        &#47;&#47; FULL-STACK &amp; AI SYSTEMS ENGINEER
      </div>

      {/* Main Heading with Neon Lime Highlighter on "Jain." */}
      <div>
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.04]">
          Ashish
          <br />
          <span className="relative inline-block mt-1">
            <span className="relative z-10 text-slate-900 dark:text-slate-900">
              Jain.
            </span>
            <span
              className="absolute left-0 bottom-1.5 w-full h-[0.9em] bg-[#ccff00] -z-0 rounded-sm"
              aria-hidden="true"
            />
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mt-5">
          I build full-stack products with LLMs inside. Skip the
          r&eacute;sum&eacute; &mdash; query my AI twin.
        </p>

        {/* Location & Status Line */}
        <div className="flex items-center gap-2 mt-4 font-mono text-xs text-slate-500 dark:text-slate-400">
          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span>India</span>
          <span className="text-slate-400">&bull;</span>
          <span>open to remote &#47; relocation</span>
        </div>
      </div>

      {/* Expandable Sections (Technical Skills, Featured Projects, Education, Certifications) */}
      <div className="pt-2 space-y-3">
        <div className="pt-2 space-y-3">
          <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-[#121620]/70 overflow-hidden shadow-sm">
            <button
              type="button"
              onClick={() => toggle("skills")}
              aria-expanded={expanded.skills}
              className="w-full flex items-center justify-between p-3.5 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Technical Skills
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-slate-500 dark:text-slate-400">
                  {skillCategories.reduce(
                    (acc, cat) => acc + cat.skills.length,
                    0,
                  )}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                  expanded.skills ? "rotate-180 text-black dark:text-white" : ""
                }`}
              />
            </button>

            {expanded.skills && (
              <div className="p-4 pt-3 border-t border-black/[0.06] dark:border-white/[0.06] space-y-4">
                {skillCategories.map((cat, cIdx) => (
                  <div key={cIdx}>
                    <span
                      className={`font-mono text-[11px] font-bold uppercase tracking-widest mb-2 block ${cat.color}`}
                    >
                      {cat.label}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill, sIdx) => (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() =>
                            onRunCommand(
                              `Tell me about your experience with ${skill}.`,
                            )
                          }
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#151a26] hover:bg-[#ccff00]/20 dark:hover:bg-[#ccff00]/20 border border-black/[0.08] dark:border-white/[0.08] hover:border-[#ccff00] text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-[#ccff00] transition-all cursor-pointer text-xs font-mono font-medium"
                          title={`Ask AI Twin about ${skill}`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Featured Projects Accordion */}
        <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-[#121620]/70 overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => toggle("projects")}
            aria-expanded={expanded.projects}
            className="w-full flex items-center justify-between p-3.5 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-colors text-left"
          >
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Featured Projects
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-slate-500 dark:text-slate-400">
                {projects.length}
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                expanded.projects ? "rotate-180 text-black dark:text-white" : ""
              }`}
            />
          </button>

          {expanded.projects && (
            <div className="p-4 pt-2 border-t border-black/[0.06] dark:border-white/[0.06] space-y-3">
              {projects.map((proj, pIdx) => (
                <div
                  key={pIdx}
                  onClick={() => onRunCommand(proj.command)}
                  className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.06] cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold font-mono text-slate-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-[#ccff00]">
                      {proj.title}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400 group-hover:text-black dark:group-hover:text-white">
                      run {proj.command} &rarr
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {proj.desc}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {proj.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-slate-700 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Education Accordion */}
        <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-[#121620]/70 overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => toggle("education")}
            aria-expanded={expanded.education}
            className="w-full flex items-center justify-between p-3.5 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-colors text-left"
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Education
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-slate-500 dark:text-slate-400">
                {education.length}
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                expanded.education
                  ? "rotate-180 text-black dark:text-white"
                  : ""
              }`}
            />
          </button>

          {expanded.education && (
            <div className="p-4 pt-2 border-t border-black/[0.06] dark:border-white/[0.06] space-y-2">
              {education.map((edu, eIdx) => (
                <div
                  key={eIdx}
                  className="p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] text-xs font-mono text-slate-700 dark:text-slate-300 leading-relaxed"
                >
                  {edu}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Certifications Accordion */}
        <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-[#121620]/70 overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => toggle("certifications")}
            aria-expanded={expanded.certifications}
            className="w-full flex items-center justify-between p-3.5 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-colors text-left"
          >
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Certifications
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-slate-500 dark:text-slate-400">
                {certifications.length}
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                expanded.certifications
                  ? "rotate-180 text-black dark:text-white"
                  : ""
              }`}
            />
          </button>

          {expanded.certifications && (
            <div className="p-4 pt-2 border-t border-black/[0.06] dark:border-white/[0.06] space-y-1.5">
              {certifications.map((cert, cIdx) => (
                <div
                  key={cIdx}
                  className="flex items-center gap-2 p-2 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] text-xs font-mono text-slate-700 dark:text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
