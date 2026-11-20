import React, { useState, useRef, useEffect } from "react";
import { RotateCcw, Send, CornerDownLeft } from "lucide-react";

export default function TerminalTwin({ onSendMessage, messages, isLoading }) {
  const [input, setInput] = useState("");
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickCommands = [
    { label: "/skills", command: "What are your technical skills?" },
    { label: "/projects", command: "Tell me about your featured projects." },
    { label: "/experience", command: "What is your work experience?" },
    {
      label: "/education",
      command: "What is your educational background?",
    },
    { label: "/why-hire", command: "Why should we hire you?" },
  ];

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput("");
  };

  const handleQuickCommand = (cmd) => {
    if (isLoading) return;
    onSendMessage(cmd);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full h-full min-h-[540px] max-h-[640px] rounded-3xl bg-[#0e121a] border border-slate-800 shadow-2xl flex flex-col overflow-hidden font-mono text-xs sm:text-sm select-text">
      {/* macOS Window Title Bar */}
      <div className="px-4 py-3 bg-[#131822] border-b border-slate-800 flex items-center justify-between shrink-0 select-none">
        {/* 3 Traffic Light Dots */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
        </div>

        {/* Window Title */}
        <div className="text-slate-400 text-xs font-mono font-medium flex items-center gap-1.5">
          <span>~/ashish-twin &mdash; zsh</span>
        </div>

        {/* Terminal Info Badge */}
        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
          <span>v1.0 online</span>
        </div>
      </div>

      {/* Terminal Output Screen */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 text-slate-300 scroll-smooth">
        {/* Welcome Greeting */}
        <div className="text-slate-400 leading-relaxed">
          Ashish.twin v1.0 ready. Run a command to query my experience.
        </div>

        {/* Default / Initial interaction shown in reference screenshot */}
        {messages.length === 0 && (
          <div className="space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 text-white">
              <span className="text-[#ccff00] font-bold">&rarr;</span>
              <span className="text-[#bbf451] font-semibold">recruiter</span>
              <span className="text-slate-500">$</span>
              <span className="text-white font-medium">/availability</span>
            </div>
            <p className="text-slate-300 leading-relaxed pl-4 border-l border-slate-700/60">
              Available within 30 days. Happy with remote, hybrid, or relocating
              for the right team. Open to a paid trial week.
            </p>
          </div>
        )}

        {/* Message Log */}
        {messages.map((msg, idx) => (
          <div key={idx} className="space-y-1.5 animate-fadeIn">
            {msg.role === "user" ? (
              <div className="flex items-start gap-2 text-white pt-2">
                <span className="text-[#ccff00] font-bold shrink-0">
                  &rarr;
                </span>
                <span className="text-[#bbf451] font-semibold shrink-0">
                  recruiter
                </span>
                <span className="text-slate-500 shrink-0">$</span>
                <span className="text-white font-medium break-all">
                  {msg.content}
                </span>
              </div>
            ) : (
              <div className="text-slate-300 leading-relaxed pl-4 border-l border-slate-700/60 whitespace-pre-wrap">
                {msg.content}
              </div>
            )}
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 pl-4 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-ping" />
            <span className="text-xs text-slate-400">
              processing query from resume knowledge base...
            </span>
          </div>
        )}

        {/* Anchor to scroll */}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Input Line */}
      <form
        onSubmit={handleSubmit}
        className="px-4 py-3 bg-[#111622] border-t border-slate-800 flex items-center gap-2"
      >
        <span className="text-[#ccff00] font-bold text-sm shrink-0">
          &rarr;
        </span>
        <span className="text-[#bbf451] font-semibold text-xs shrink-0">
          recruiter
        </span>
        <span className="text-slate-500 text-xs shrink-0">$</span>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type a command or ask a question..."
          disabled={isLoading}
          className="flex-1 bg-transparent text-white placeholder-slate-600 outline-none text-xs sm:text-sm font-mono caret-[#ccff00]"
          autoComplete="off"
          spellCheck="false"
        />

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-[#ccff00] text-slate-300 hover:text-black disabled:opacity-30 disabled:hover:bg-white/10 disabled:hover:text-slate-300 transition-colors"
          title="Execute Command"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Quick Command Chips Footer (matching reference image) */}
      <div className="px-4 py-3 bg-[#0d1017] border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
        {quickCommands.map((cmd, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleQuickCommand(cmd.command)}
            className="px-3 py-1.5 rounded-xl bg-[#171d2b] hover:bg-[#ccff00] text-slate-300 hover:text-black border border-slate-700/60 hover:border-[#ccff00] transition-all text-xs font-mono font-medium shrink-0 active:scale-95"
          >
            {cmd.label}
          </button>
        ))}
      </div>
    </div>
  );
}
