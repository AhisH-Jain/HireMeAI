# HireMeAI 🤖💼

An AI-powered interactive digital twin representing your professional background, skills, and projects based strictly on your resume.

---

## 🏗️ Architecture

- **Backend**: FastAPI + Groq LLM (`openai/gpt-oss-120b`) + PyPDF2 + Pydantic
  - `GET /candidate` - Returns parsed, structured candidate profile (name, experience, skills, education)
  - `POST /chat` - Answers recruiter questions using resume facts (with conversation history support)
  - `GET /resume/download` - Serves `reference_resume.pdf` for direct download
  - Built-in **resume caching** (instant response time) & **CORS middleware**
- **Frontend**: React 18 + Vite + Tailwind CSS + Lucide Icons
  - **Concept A: Split-screen Interactive Digital Twin**
  - Left Panel: Profile card, quick stats, skills badges (click-to-ask), work experience cards, resume download & contact buttons
  - Right Panel: Full conversational chat, recruiter icebreaker prompt cards, typing indicator, markdown formatting, copy-to-clipboard
  - **Mobile Responsive**: Seamless tab toggle between Profile & Chat on smaller screens

---

## 🚀 How to Run

### Step 1: Start the Backend (Port 8000)
Open a terminal in the project root:
```bash
cd c:\Users\Ashish12\bhaiya_ai_course\week2\hiremeai
uv run uvicorn backend.main:app --reload --port 8000
```
API docs available at: `http://localhost:8000/docs`

### Step 2: Start the Frontend (Port 5173)
Open a second terminal:
```bash
cd c:\Users\Ashish12\bhaiya_ai_course\week2\hiremeai\frontend
npm run dev
```
Open **`http://localhost:5173`** in your browser to start chatting!
