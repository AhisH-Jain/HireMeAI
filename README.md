# HireMeAI — AI-Powered Professional Digital Twin

An interactive AI-powered digital twin that represents a candidate's professional profile, skills, education, and projects. Recruiters can explore the candidate's profile, download their resume, and interact with an AI assistant to get answers to professional questions.

\<p align="center">
&#x20; \<a href="[https://hiremeai-psi.vercel.app](https://hiremeai-psi.vercel.app)">Live Demo\</a> ·
&#x20; \<a href="[https://hiremeai-api.vercel.app](https://hiremeai-api.vercel.app)">Backend API\</a>
\</p>

---

## Overview

HireMeAI transforms a traditional resume into an interactive experience.

Instead of simply reading a static PDF, recruiters can explore structured candidate information and ask questions through an AI-powered chat interface.

The backend extracts structured information from a PDF resume and uses a Groq-hosted LLM to answer questions based on the candidate's actual resume data.

## Features

- **Interactive Candidate Profile** — Explore professional skills, projects, education, certifications, and experience.
- **AI-Powered Chat Assistant** — Ask questions about the candidate using natural language.
- **Resume Parsing** — Extract structured information from PDF resumes using an LLM.
- **Context-Aware Conversations** — Maintains recent conversation history for more relevant responses.
- **Resume Download** — Download the original PDF resume directly.
- **Responsive Interface** — Designed for desktop and mobile screens.
- **Dark and Light Themes** — Switch between visual themes.
- **Quick Commands** — Access predefined responses for common recruiter queries.
- **Contact Modal** — Provides a direct way to contact the candidate.

## Live Demo

| Component   | URL                                                                |
| ----------- | ------------------------------------------------------------------ |
| Frontend    | [https://hiremeai-psi.vercel.app](https://hiremeai-psi.vercel.app) |
| Backend API | [https://hiremeai-api.vercel.app](https://hiremeai-api.vercel.app) |

## Tech Stack

### Frontend

- React 18
- Vite
- Tailwind CSS
- Lucide React
- JavaScript (ES Modules)

### Backend

- Python 3.14+
- FastAPI
- Groq API
- `openai/gpt-oss-120b`
- Pydantic
- PyPDF2
- python-docx
- python-dotenv
- Uvicorn

### Deployment & Tools

- Git and GitHub
- Vercel
- uv (Python package and project manager)
- npm

## Architecture

```text
                  Recruiter
                      |
                      v
             React + Vite Frontend
                      |
                      | REST API
                      v
                FastAPI Backend
                      |
              +-------+-------+
              |               |
              v               v
         PDF Resume       Groq API
              |               |
              v               v
        Resume Parsing   LLM Processing
              |               |
              +-------+-------+
                      |
                      v
             Structured Candidate
                   Profile
                      |
                      v
             AI-Generated Answers
                      |
                      v
                Frontend UI
```

The backend parses the resume into a structured Pydantic model and caches the parsed profile in memory. Candidate information is then used as context for AI-generated recruiter responses.

## API Endpoints

| Method | Endpoint           | Description                                      |
| ------ | ------------------ | ------------------------------------------------ |
| GET    | `/`                | Backend health and service information           |
| GET    | `/candidate`       | Returns the structured candidate profile         |
| POST   | `/chat`            | Answers recruiter questions using resume context |
| GET    | `/resume/download` | Downloads the original PDF resume                |

### Chat API Example

**Request:**

```json
{
  "question": "What technologies does the candidate work with?",
  "history": []
}
```

**Response:**

```json
{
  "answer": "The candidate has experience with..."
}
```

## Getting Started

Follow these instructions to run HireMeAI locally.

### Prerequisites

Install the following:

- Python 3.14 or later
- [uv](https://docs.astral.sh/uv/)
- Node.js and npm
- A Groq API key from [Groq Console](https://console.groq.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/AhisH-Jain/HireMeAI.git
cd HireMeAI
```

### 2. Set Up the Backend

Install Python dependencies:

```bash
uv sync --locked
```

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Start the FastAPI server:

```bash
uv run uvicorn backend.main:app --reload --port 8000
```

Backend runs at:

```text
http://localhost:8000
```

Interactive API documentation:

```text
http://localhost:8000/docs
```

### 3. Set Up the Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env.local` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:8000
```

Start the development server:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

You can now interact with HireMeAI locally.

## Environment Variables

| Variable       | Location | Description                     |
| -------------- | -------- | ------------------------------- |
| `GROQ_API_KEY` | Backend  | Authentication for Groq API     |
| `VITE_API_URL` | Frontend | Base URL of the FastAPI backend |

**Important:** Never commit `.env`, `.env.local`, API keys, or other secrets to GitHub.

The repository includes `.env.example` files as configuration templates.

## Deployment

HireMeAI is deployed using two separate Vercel projects connected to the same GitHub repository.

### Backend Deployment

- Platform: Vercel
- Framework: FastAPI
- Root Directory: Repository root (`./`)
- Entry Point: `backend.main:app`
- Environment Variable: `GROQ_API_KEY`

### Frontend Deployment

- Platform: Vercel
- Framework: Vite
- Root Directory: `frontend`
- Environment Variable: `VITE_API_URL`

Set `VITE_API_URL` to your deployed backend URL:

```env
VITE_API_URL=https://hiremeai-api.vercel.app
```

## Project Structure

```text
HireMeAI/
│
├── backend/
│   ├── main.py
│   ├── generate_resume_pdf.py
│   └── reference_resume.pdf
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatMessage.jsx
│   │   │   ├── ChatPanel.jsx
│   │   │   ├── ContactModal.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProfilePanel.jsx
│   │   │   └── TerminalTwin.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── src/
│   └── hiremeai/
│       └── __init__.py
│
├── .env.example
├── .gitignore
├── .python-version
├── pyproject.toml
├── uv.lock
└── README.md
```

## Security & Privacy Notes

- Keep API keys in environment variables, never in source code.
- The included `reference_resume.pdf` is publicly downloadable through the resume endpoint. Do not include confidential information in it.
- Avoid exposing private candidate information beyond what is intended for public access.
- Consider restricting backend CORS origins to trusted frontend domains when adapting the application for other deployments.

## Future Improvements

- Support multiple resume formats and document uploads.
- Add authentication and recruiter-specific sessions.
- Introduce resume version management.
- Add analytics for recruiter interactions.
- Improve conversation persistence and observability.

## Author

**Ashish Jain**

Full-Stack & AI Systems Developer

- GitHub: [AhisH-Jain](https://github.com/AhisH-Jain)
- LinkedIn: [Ashish Jain ](https://www.linkedin.com/in/ashishjain05/)

---

\<p align="center">
&#x20; Built with Python, React, FastAPI, and LLMs.
\</p>
