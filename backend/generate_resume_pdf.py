from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from pathlib import Path

pdf_path = Path(r"c:\Users\Ashish12\bhaiya_ai_course\week2\hiremeai\backend\reference_resume.pdf")

doc = SimpleDocTemplate(
    str(pdf_path),
    pagesize=letter,
    leftMargin=36,
    rightMargin=36,
    topMargin=36,
    bottomMargin=36
)

styles = getSampleStyleSheet()

# Custom styles
name_style = ParagraphStyle(
    'NameStyle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=22,
    leading=26,
    textColor=colors.HexColor('#111827')
)

contact_right = ParagraphStyle(
    'ContactRight',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=12,
    alignment=2, # Right align
    textColor=colors.HexColor('#374151')
)

section_heading = ParagraphStyle(
    'SectionHeading',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=10,
    leading=13,
    textColor=colors.HexColor('#004085'),
    spaceBefore=6,
    spaceAfter=2
)

body_text = ParagraphStyle(
    'BodyTextCustom',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11.5,
    textColor=colors.HexColor('#1f2937')
)

bullet_text = ParagraphStyle(
    'BulletText',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11,
    leftIndent=12,
    firstLineIndent=-8,
    textColor=colors.HexColor('#1f2937'),
    spaceAfter=2
)

story = []

# Header Table
header_data = [
    [
        Paragraph("<b>Ashish Jain</b><br/><font size='8' color='#2563eb'>LinkedIn | GitHub | Leetcode</font>", name_style),
        Paragraph("Location: Rajpura, Punjab, India<br/>Email: <b>asjain0503@gmail.com</b> | Mobile: <b>+91 7209804300</b>", contact_right)
    ]
]
header_table = Table(header_data, colWidths=[270, 270])
header_table.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ('TOPPADDING', (0,0), (-1,-1), 0),
]))
story.append(header_table)
story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#004085'), spaceBefore=2, spaceAfter=4))

# PROFESSIONAL SUMMARY
story.append(Paragraph("PROFESSIONAL SUMMARY", section_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#93c5fd'), spaceBefore=1, spaceAfter=4))
summary_p = "Full-Stack AI Developer and final-year Computer Science student with hands-on experience building end-to-end applications using Python, FastAPI, React.js, and Node.js. Skilled in integrating Large Language Models (LLMs), building REST APIs, and implementing Retrieval-Augmented Generation (RAG) pipelines. Familiar with AWS, Docker, Kubernetes, CI/CD, and DevOps practices for deploying scalable applications. Seeking a Software Engineer or AI/Full-Stack Developer role."
story.append(Paragraph(summary_p, body_text))

# TECHNICAL SKILLS
story.append(Paragraph("TECHNICAL SKILLS", section_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#93c5fd'), spaceBefore=1, spaceAfter=4))

skills_data = [
    [Paragraph("<b>Languages</b>", body_text), Paragraph(": Python, Java, JavaScript, SQL, HTML, CSS", body_text)],
    [Paragraph("<b>Frontend</b>", body_text), Paragraph(": React.js, Next.js, Tailwind CSS", body_text)],
    [Paragraph("<b>Backend</b>", body_text), Paragraph(": Node.js, Express.js, FastAPI, REST APIs", body_text)],
    [Paragraph("<b>Databases</b>", body_text), Paragraph(": MongoDB, MySQL, Firebase, Vector Databases", body_text)],
    [Paragraph("<b>AI & Gen AI</b>", body_text), Paragraph(": LLMs, RAG, LangChain, AI Agents, Prompt Engineering, Groq API, Ollama", body_text)],
    [Paragraph("<b>Tools & Platforms</b>", body_text), Paragraph(": Git, GitHub, Postman, Visual Studio Code, Claude Code, Codex", body_text)],
    [Paragraph("<b>Cloud & DevOps</b>", body_text), Paragraph(": AWS, Docker, Kubernetes, Linux, CI/CD, Auto Scaling, Load Balancing", body_text)],
    [Paragraph("<b>Concepts</b>", body_text), Paragraph(": DSA, Agile, Scrum, Computer Networking", body_text)],
]
skills_table = Table(skills_data, colWidths=[105, 435])
skills_table.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ('TOPPADDING', (0,0), (-1,-1), 1),
    ('BOTTOMPADDING', (0,0), (-1,-1), 1),
]))
story.append(skills_table)

# PROJECTS
story.append(Paragraph("PROJECTS", section_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#93c5fd'), spaceBefore=1, spaceAfter=4))

# Project 1: HireMeAI
p1_header = [
    [Paragraph("<b>HireMeAI – AI-Powered Interactive Digital Twin</b>", body_text), Paragraph("<font color='#4b5563'><i>Python, FastAPI, React.js, Groq API</i></font>", contact_right)]
]
t1 = Table(p1_header, colWidths=[360, 180])
t1.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 1), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
story.append(t1)

p1_bullets = [
    "• Developed an AI-powered digital twin that lets recruiters interact with a candidate's profile through <b>resume-grounded conversations</b>.",
    "• Built REST APIs using <b>FastAPI</b> and integrated the <b>Groq LLM</b> to generate context-aware responses from structured resume data.",
    "• Implemented PDF parsing, structured data extraction, and conversation history management.",
    "• Designed a responsive <b>React.js interface</b> with interactive chat, skill-based prompts, profile insights, and resume download functionality."
]
for b in p1_bullets:
    story.append(Paragraph(b, bullet_text))

story.append(Spacer(1, 3))

# Project 2: VectorForge
p2_header = [
    [Paragraph("<b>VectorForge – Custom Vector Database and RAG Engine</b>", body_text), Paragraph("<font color='#4b5563'><i>Python, FastAPI, Ollama, Llama 3.2</i></font>", contact_right)]
]
t2 = Table(p2_header, colWidths=[360, 180])
t2.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 1), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
story.append(t2)

p2_bullets = [
    "• Built a custom vector database using <b>HNSW, KD-Tree, and brute-force algorithms</b> for fast similarity search.",
    "• Generated <b>768-dimensional embeddings</b> with Ollama models and stored documents as overlapping text chunks.",
    "• Developed a <b>Retrieval-Augmented Generation (RAG)</b> pipeline using HNSW search and <b>Llama 3.2</b> to produce context-aware answers.",
    "• Created FastAPI REST APIs and a web interface for vector management, document search, performance benchmarking, and PCA-based visualization."
]
for b in p2_bullets:
    story.append(Paragraph(b, bullet_text))

# EDUCATION
story.append(Paragraph("EDUCATION", section_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#93c5fd'), spaceBefore=1, spaceAfter=4))

edu_data = [
    [Paragraph("<b>Chitkara University</b><br/>Bachelor of Engineering in Computer Science and Engineering | <b>CGPA: 7.64</b>", body_text), Paragraph("Rajpura, Punjab, India<br/><i>Aug 2023 – Jul 2027</i>", contact_right)],
    [Paragraph("<b>Sanskar Bharti Global School</b><br/>Class XII | CBSE | Percentage: <b>78%</b>", body_text), Paragraph("Phulparas<br/><i>2022</i>", contact_right)],
    [Paragraph("<b>Sanskar Bharti Global School</b><br/>Class X | CBSE | Percentage: <b>70.8%</b>", body_text), Paragraph("Phulparas<br/><i>2020</i>", contact_right)],
]
t_edu = Table(edu_data, colWidths=[380, 160])
t_edu.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ('TOPPADDING', (0,0), (-1,-1), 2),
    ('BOTTOMPADDING', (0,0), (-1,-1), 2),
]))
story.append(t_edu)

# CERTIFICATIONS
story.append(Paragraph("CERTIFICATIONS", section_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#93c5fd'), spaceBefore=1, spaceAfter=4))

certs = [
    "• SQL Foundations – Microsoft (Coursera)",
    "• Introduction to Agile Development and Scrum – IBM (Coursera)",
    "• Introduction to Cloud Computing – IBM (Coursera)",
    "• Introduction to DevOps – IBM (Coursera)",
    "• Networking Fundamentals – Akamai (Coursera)"
]
for c in certs:
    story.append(Paragraph(c, bullet_text))

doc.build(story)
print("PDF successfully generated at:", pdf_path)
