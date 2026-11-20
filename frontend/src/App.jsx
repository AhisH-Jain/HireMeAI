import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TerminalTwin from "./components/TerminalTwin";
import ContactModal from "./components/ContactModal";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) return stored;
      // Default to light to match the user's reference screenshot
      return "light";
    } catch {
      return "light";
    }
  });

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [candidate, setCandidate] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sync theme changes with DOM and localStorage
  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
      const meta = document.querySelector('meta[name="color-scheme"]');

      if (theme === "dark") {
        document.documentElement.classList.add("dark");
        if (meta) meta.content = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        if (meta) meta.content = "light";
      }
    } catch (e) {
      console.warn("Theme storage failed:", e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Fetch candidate data from backend
  useEffect(() => {
    async function fetchCandidate() {
      try {
        const res = await fetch(`${API_URL}/candidate`);
        if (res.ok) {
          const data = await res.json();
          setCandidate(data);
        }
      } catch (err) {
        console.warn(
          "Backend not currently reachable, using local resume data",
        );
      }
    }
    fetchCandidate();
  }, []);

  // Fast preset answers for quick commands to give instant response
  const presetCommands = {
    availability:
      "Available within 15 days. Happy with remote, hybrid, or relocating for the right team. Open to a paid trial week.",
    "/stack":
      "Full-Stack & AI Systems:\n• Frontend: React.js, Next.js, Tailwind CSS, TypeScript, HTML/CSS\n• Backend: Python, FastAPI, Node.js, Express.js, REST APIs\n• AI & GenAI: Groq API, LLMs, RAG, LangChain, Ollama, Vector Databases\n• Infra & DevOps: AWS, Docker, Kubernetes, Linux, CI/CD, Git",
    "/architecture":
      "Architecture Highlights:\n• HireMeAI: FastAPI backend + Groq LLM (gpt-oss-120b) + PDF parser + React.js client with responsive terminal UI.\n• VectorForge: Custom vector database using HNSW & KD-Tree algorithms, 768-dim Ollama embeddings, and RAG pipeline using Llama 3.2.",
    "/impact":
      "Key Impact & Accomplishments:\n• Engineered end-to-end RAG pipelines with sub-second retrieval using HNSW indexing.\n• Deployed scalable FastAPI services with structured JSON schema enforcement.\n• Built interactive AI digital twin for frictionless recruiter interactions.",
    "/projects":
      "Featured Projects:\n1. HireMeAI – AI-Powered Interactive Digital Twin (Python, FastAPI, React.js, Groq API)\n2. VectorForge – Custom Vector Database & RAG Engine (Python, FastAPI, Ollama, Llama 3.2)",
  };

  const handleSendMessage = async (input) => {
    if (!input || isLoading) return;

    const trimmed = input.trim();
    const userMessage = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);

    // Check if it's one of the quick slash commands
    const lower = trimmed.toLowerCase();
    if (presetCommands[lower]) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: presetCommands[lower] },
        ]);
      }, 150);
      return;
    }

    // Otherwise, call FastAPI /chat endpoint
    setIsLoading(true);
    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: trimmed,
          history: historyPayload,
        }),
      });

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.answer ||
            "I don't have enough information in my resume to answer that.",
        },
      ]);
    } catch (error) {
      console.warn("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            presetCommands[lower] ||
            "⚠️ Note: FastAPI backend is currently offline. You can start it via `uv run uvicorn backend.main:app --reload` to chat with the live Groq LLM.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 font-sans ${
        theme === "dark"
          ? "bg-grid-pattern-dark text-slate-100"
          : "bg-grid-pattern-light text-slate-900"
      }`}
    >
      {/* Top Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Page Content */}
      <main className="max-w-7xl mx-auto px-6 py-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Hero & Profile Details (7 Cols) */}
          <div className="lg:col-span-7">
            <HeroSection
              onRunCommand={handleSendMessage}
              candidate={candidate}
            />
          </div>

          {/* Right Column: Interactive macOS Terminal Twin (5 Cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <TerminalTwin
              onSendMessage={handleSendMessage}
              messages={messages}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        apiUrl={API_URL}
      />
    </div>
  );
}
