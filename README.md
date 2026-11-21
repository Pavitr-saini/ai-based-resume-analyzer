# AI-Resume Analyzer & ATS Optimizer

A full-stack AI-powered Resume Analyzer built with **Next.js (App Router)**, **React**, **Tailwind CSS**, and an **ATS Intelligence Engine**.

## 🚀 Features

- **Document Parser**: Supports PDF (`.pdf`), Microsoft Word (`.docx`), and text files up to 5 MB.
- **ATS Scoring Algorithm**:
  - Technical keyword matching against target job specifications.
  - Measurable impact detection (percentages, metrics, dynamic action verbs).
  - Standard ATS section compliance (Contact, Summary, Experience, Skills, Education, Projects).
  - Length and readability scoring.
- **Keyword Gap Analysis**:
  - Matched skills inventory.
  - High-priority missing keywords with estimated score boost percentages.
- **Tailored Recommendations**: Real, prioritized suggestions based on the uploaded resume and job description.
- **AI Bullet Point Enhancer**: Rewrites passive resume statements into high-impact metric statements.
- **Modern Responsive UI**: Built with dark mode aesthetics, interactive meters, and real-time status feedback.

## 🛠️ Tech Stack & Architecture

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS 4, Lucide React icons.
- **Backend**: Next.js Server Route Handlers (`/api/analyze`).
- **Parsing Engines**: `pdf-parse` (v2), `mammoth` (DOCX extraction).
- **Core Engine**: `lib/atsAnalyzer.js` (NLP keyword tokenizer, section classifier, and scoring system).

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📡 Backend API Reference

### `POST /api/analyze`
Accepts `multipart/form-data`:
- `resume`: File (PDF or DOCX document)
- `jobDescription`: string (Target job requirements)

Returns structured JSON:
```json
{
  "success": true,
  "data": {
    "fileName": "resume.pdf",
    "fileSizeMB": "0.15",
    "atsScore": 84,
    "scoreStatus": "Good Resume Score",
    "jobMatch": 79,
    "matchedKeywordsCount": 12,
    "matchedKeywords": ["React.js", "TypeScript", "Tailwind CSS"],
    "missingKeywords": [
      { "name": "GraphQL", "importance": "High Priority", "boost": "+8% ATS Score" }
    ],
    "breakdown": {
      "skillsMatch": 80,
      "experienceImpact": 75,
      "formattingATS": 90,
      "contentDepth": 85
    },
    "detectedSections": {
      "contact": true,
      "summary": true,
      "experience": true,
      "skills": true,
      "education": true,
      "projects": true
    },
    "strengths": [...],
    "suggestions": [...],
    "rewrites": [...]
  }
}
```
