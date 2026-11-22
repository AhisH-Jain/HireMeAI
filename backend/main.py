from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from docx import Document
from PyPDF2 import PdfReader
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq
from pydantic import BaseModel, Field
import json
import os
import time

env_paths = [
    Path(__file__).parent / ".env",
    Path(__file__).parent.parent / ".env",
    Path.cwd() / ".env"
]
for p in env_paths:
    if p.exists():
        load_dotenv(p)
        break
else:
    load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))
model = "openai/gpt-oss-120b"


app = FastAPI(title="HireMeAI Backend")

# Configure CORS for trusted frontend origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://hiremeai-psi.vercel.app",
        "http://localhost:5173",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

# Parsing resume function


class Experience(BaseModel):
    company: str | None = None
    role: str | None = None
    duration: str | None = None
    description: str | None = None
    skills_used: list[str] = []


class Project(BaseModel):
    title: str | None = None
    technologies: list[str] = []
    description: str | None = None
    highlights: list[str] = []


class Resume(BaseModel):
    name: str | None = None
    email: str | None = None
    phone: str | None = None
    location: str | None = None
    summary: str | None = None

    total_experience_years: float | None = None

    skills: list[str] = []
    experiences: list[Experience] = []
    projects: list[Project] = []
    education: list[str] = []
    certifications: list[str] = []


resume_schema = Resume.model_json_schema()


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    question: str
    history: list[ChatMessage] = []


def ask_candidate(question: str, resume: Resume, history: list[ChatMessage] | None = None):
    system_prompt = f"""
You are an AI assistant representing a job candidate.
Below is everything you know about the candidate.

{resume.model_dump_json(indent=2)}

Rules:
1. Answer only using this information.
2. Never hallucinate.
3. If information is unavailable, say "I don't have enough information to answer that."
4. Be professional, engaging, and concise.
5. Answer as if HR or a hiring manager is interviewing this candidate.
"""
    messages = [{"role": "system", "content": system_prompt}]

    # Add recent history (last 6 messages) if available
    if history:
        for msg in history[-6:]:
            if msg.role in ("user", "assistant"):
                messages.append({"role": msg.role, "content": msg.content})

    # Add the current question
    messages.append({"role": "user", "content": question})

    response = client.chat.completions.create(
        model=model,
        messages=messages,
    )
    return response.choices[0].message.content


def parse_resume(resume_text):
    system_prompt = f"""
    You are an expert resume parser.

    Extract information from the resume based on its meaning,
    not only based on exact section headings.

    Different resumes may use different headings.

    For example:
    - Experience
    - Professional Experience
    - Work History
    - Employment
    - Internships

    These may all contain relevant experience.

    Skills may also appear in the skills section, work experience,
    internships or projects.

    Return ONLY valid JSON matching this schema:

    {resume_schema}

    Important rules:

    1. Do not invent information.
    2. If a value is not available, return null.
    3. If a list has no information, return an empty list.
    4. Include internships inside experiences.
    5. Extract skills mentioned across the entire resume.
    6. Include projects with title, technologies, description and bullet highlights.
    7. Extract location and professional summary if available.
    """
    user_prompt = f"""
    Parse the following resume:

    {resume_text}
    """
    message_system = {"role": "system", "content": system_prompt}
    message_user = {"role": "user", "content": user_prompt}
    messages = [message_system, message_user]
    response_format = {"type": "json_object"}
    response = client.chat.completions.create(
        model=model, messages=messages, response_format=response_format
    )
    raw_output = response.choices[0].message.content
    data = json.loads(raw_output)
    resume = Resume(**data)
    return resume


# PDF extraction function
def read_pdf(file_path):
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"
    return text


def get_resume_path() -> Path:
    # Check in same directory as this file first, then cwd
    local_path = Path(__file__).parent / "reference_resume.pdf"
    if local_path.exists():
        return local_path
    fallback_path = Path("reference_resume.pdf")
    if fallback_path.exists():
        return fallback_path
    raise FileNotFoundError("reference_resume.pdf not found")


_cached_resume: Resume | None = None


def get_parsed_resume() -> Resume:
    global _cached_resume
    if _cached_resume is None:
        path = get_resume_path()
        text = read_pdf(path)
        _cached_resume = parse_resume(text)
    return _cached_resume


@app.get("/")
def home():
    return {
        "status": "online",
        "service": "HireMeAI Backend",
        "endpoints": ["/candidate", "/chat", "/resume/download"]
    }


@app.get("/candidate")
def get_candidate():
    resume = get_parsed_resume()
    return resume


@app.get("/resume/download")
def download_resume():
    path = get_resume_path()
    return FileResponse(
        path=path,
        media_type="application/pdf",
        filename="resume.pdf"
    )


@app.post("/chat")
def chat(request: ChatRequest):
    resume = get_parsed_resume()
    answer = ask_candidate(request.question, resume, history=request.history)
    return {
        "answer": answer
    }
