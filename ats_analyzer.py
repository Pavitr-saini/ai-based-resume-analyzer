"""
ATS Analyzer Module in Python.
Replicates full parsing and ATS scoring logic with complete parity to Next.js version.
"""

import io
import re
from datetime import datetime

# Common industry skills and keywords database
KNOWN_SKILLS = [
    # Programming Languages
    "javascript", "typescript", "python", "java", "c++", "c#", "go", "golang", "rust", "ruby", "php", "swift", "kotlin", "html", "html5", "css", "css3", "sass", "scss", "sql", "r", "dart",
    # Frontend
    "react", "react.js", "next.js", "nextjs", "vue", "vue.js", "angular", "svelte", "tailwind", "tailwind css", "bootstrap", "material-ui", "mui", "redux", "redux toolkit", "zustand", "mobx", "webpack", "vite", "babel", "responsive design", "web accessibility", "a11y", "ui/ux", "dom manipulation",
    # Backend & APIs
    "node.js", "nodejs", "express", "express.js", "nestjs", "fastapi", "flask", "django", "spring boot", "asp.net", "rest", "rest api", "restful api", "rest apis", "graphql", "grpc", "microservices", "serverless",
    # Databases & Caching
    "postgresql", "postgres", "mysql", "mongodb", "redis", "sqlite", "oracle", "dynamodb", "firebase", "supabase", "prisma", "mongoose", "sequelize", "database design", "indexing",
    # Cloud & DevOps
    "aws", "amazon web services", "azure", "gcp", "google cloud", "docker", "kubernetes", "ci/cd", "continuous integration", "github actions", "jenkins", "terraform", "linux", "nginx", "apache", "cloudflare", "vercel", "netlify",
    # Testing & Quality
    "jest", "cypress", "playwright", "mocha", "chai", "unit testing", "integration testing", "end-to-end testing", "e2e testing", "tdd", "test driven development",
    # Tools & Version Control
    "git", "github", "gitlab", "bitbucket", "jira", "confluence", "postman", "figma", "npm", "yarn", "pnpm", "docker compose",
    # Concepts & Methodologies
    "agile", "scrum", "kanban", "system design", "software architecture", "object-oriented programming", "oop", "functional programming", "clean code", "performance optimization", "seo", "cross-browser compatibility", "code review", "problem solving", "leadership", "communication"
]

# Strong action verbs to detect impact
ACTION_VERBS = [
    "architected", "spearheaded", "engineered", "orchestrated", "implemented", "developed",
    "designed", "delivered", "built", "optimized", "streamlined", "accelerated", "reduced",
    "increased", "boosted", "scaled", "automated", "refactored", "integrated", "managed",
    "led", "directed", "mentored", "launched", "standardized", "transformed"
]

# Standard ATS sections
SECTION_PATTERNS = {
    "contact": re.compile(r"(?:email|phone|linkedin|github|portfolio|contact|address)", re.IGNORECASE),
    "summary": re.compile(r"(?:summary|objective|profile|about me|professional summary)", re.IGNORECASE),
    "experience": re.compile(r"(?:experience|employment|work history|career history|work experience|professional experience)", re.IGNORECASE),
    "skills": re.compile(r"(?:skills|technologies|technical stack|competencies|proficiencies|tools)", re.IGNORECASE),
    "education": re.compile(r"(?:education|academic|degree|university|college|bachelor|master|b\.tech|m\.tech|b\.s\.|m\.s\.)", re.IGNORECASE),
    "projects": re.compile(r"(?:projects|personal projects|key projects|academic projects)", re.IGNORECASE),
    "certifications": re.compile(r"(?:certifications|certificates|licenses|accreditations)", re.IGNORECASE)
}

SKILL_NAME_MAP = {
    "javascript": "JavaScript",
    "typescript": "TypeScript",
    "python": "Python",
    "java": "Java",
    "c++": "C++",
    "c#": "C#",
    "html": "HTML5",
    "html5": "HTML5",
    "css": "CSS3",
    "css3": "CSS3",
    "sql": "SQL",
    "react": "React.js",
    "react.js": "React.js",
    "next.js": "Next.js",
    "nextjs": "Next.js",
    "vue": "Vue.js",
    "vue.js": "Vue.js",
    "node.js": "Node.js",
    "nodejs": "Node.js",
    "express": "Express.js",
    "express.js": "Express.js",
    "rest api": "REST APIs",
    "rest apis": "REST APIs",
    "restful api": "REST APIs",
    "tailwind": "Tailwind CSS",
    "tailwind css": "Tailwind CSS",
    "aws": "AWS",
    "gcp": "Google Cloud",
    "ci/cd": "CI/CD",
    "ui/ux": "UI/UX",
    "seo": "SEO",
    "mongodb": "MongoDB",
    "postgresql": "PostgreSQL",
    "mysql": "MySQL",
    "github actions": "GitHub Actions",
    "docker": "Docker",
    "kubernetes": "Kubernetes",
    "graphql": "GraphQL"
}


def format_skill_name(skill: str) -> str:
    """Format skill name with correct casing."""
    lower = skill.lower().strip()
    if lower in SKILL_NAME_MAP:
        return SKILL_NAME_MAP[lower]
    return " ".join(word.capitalize() for word in skill.split(" "))


def extract_text_from_file(file_bytes: bytes, filename: str = "", content_type: str = "") -> str:
    """Extract plain text from PDF, DOCX, or text file."""
    ext = filename.split(".")[-1].lower() if "." in filename else ""

    # 1. Plain text file handling
    if content_type == "text/plain" or ext == "txt":
        try:
            text = file_bytes.decode("utf-8", errors="ignore").strip()
            if len(text) > 20:
                return text
        except Exception:
            pass

    # 2. DOCX Handling
    if content_type in [
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword"
    ] or ext in ["docx", "doc"]:
        # Try mammoth
        try:
            import mammoth
            result = mammoth.extract_raw_text(io.BytesIO(file_bytes))
            if result.value and len(result.value.strip()) > 20:
                return result.value.strip()
        except Exception as e:
            print("Mammoth extraction warning:", e)

        # Fallback to python-docx
        try:
            import docx
            doc = docx.Document(io.BytesIO(file_bytes))
            paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
            for table in doc.tables:
                for row in table.rows:
                    for cell in row.cells:
                        if cell.text.strip():
                            paragraphs.append(cell.text.strip())
            joined = "\n".join(paragraphs).strip()
            if len(joined) > 20:
                return joined
        except Exception as e:
            print("python-docx extraction warning:", e)

    # 3. PDF Handling
    if content_type == "application/pdf" or ext == "pdf":
        # Attempt A: pypdf
        try:
            import pypdf
            reader = pypdf.PdfReader(io.BytesIO(file_bytes))
            extracted_pages = []
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    extracted_pages.append(page_text)
            full_text = "\n".join(extracted_pages).strip()
            if len(full_text) > 20:
                return full_text
        except Exception as e:
            print("pypdf extraction warning:", e)

        # Attempt B: pdfplumber
        try:
            import pdfplumber
            with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
                pages_text = [p.extract_text() or "" for p in pdf.pages]
            full_text = "\n".join(pages_text).strip()
            if len(full_text) > 20:
                return full_text
        except Exception as e:
            print("pdfplumber extraction warning:", e)

    # 4. Fallback: Clean printable string decode
    try:
        raw_str = file_bytes.decode("utf-8", errors="ignore")
        clean_str = re.sub(r"[^\x20-\x7E\r\n\t]", " ", raw_str)
        clean_str = re.sub(r"\s+", " ", clean_str).strip()
        if len(clean_str) > 50:
            return clean_str
    except Exception as e:
        print("Fallback decode warning:", e)

    raise ValueError("Unable to extract text from the uploaded resume file. Please ensure it is a valid PDF or DOCX file.")


def extract_keywords(text: str) -> list[str]:
    """Extract skills and keywords matching known skills or technical words."""
    normalized = text.lower()
    found_skills = set()

    for skill in KNOWN_SKILLS:
        escaped = re.escape(skill)
        pattern = rf"(?:^|[\s,;()·/•|\-]){escaped}(?:[\s,;()·/•|\-]|$)"
        if re.search(pattern, normalized, re.IGNORECASE):
            found_skills.add(skill)

    technical_words = re.findall(r"\b[A-Z][a-zA-Z0-9+#.-]{1,15}\b", text)
    for word in technical_words:
        w = word.lower()
        if w in KNOWN_SKILLS:
            found_skills.add(w)

    return list(found_skills)


def analyze_resume_ats(resume_text: str, job_description: str) -> dict:
    """Perform comprehensive ATS scoring and gap analysis."""
    if not resume_text or len(resume_text.strip()) < 50:
        raise ValueError("Resume content is too short or empty to analyze.")

    if not job_description or len(job_description.strip()) < 10:
        raise ValueError("Job description is required to calculate ATS match.")

    resume_lower = resume_text.lower()
    job_lower = job_description.lower()

    # 1. Keyword extraction
    resume_keywords = extract_keywords(resume_text)
    job_keywords = extract_keywords(job_description)

    # Fallback if job keywords are few
    if len(job_keywords) < 3:
        raw_tokens = re.sub(r"[^\w\s]", " ", job_description).split()
        stopwords = {"with", "from", "that", "this", "have", "will", "your", "must", "work", "team", "role", "about", "their", "more"}
        unique_tokens = []
        for t in raw_tokens:
            tl = t.lower()
            if len(tl) > 3 and tl not in stopwords and tl not in unique_tokens:
                unique_tokens.append(tl)
            if len(unique_tokens) >= 10:
                break
        for t in unique_tokens:
            if t not in job_keywords:
                job_keywords.append(t)

    # Matched & Missing
    matched_set = set()
    missing_set = set()

    for jk in job_keywords:
        if jk in resume_keywords or jk in resume_lower:
            matched_set.add(jk)
        else:
            missing_set.add(jk)

    matched_keywords = sorted(list({format_skill_name(s) for s in matched_set}))
    missing_keywords_raw = list(missing_set)

    seen_missing = set()
    missing_keywords = []

    for idx, kw in enumerate(missing_keywords_raw):
        formatted_name = format_skill_name(kw)
        if formatted_name in matched_keywords or formatted_name in seen_missing:
            continue
        seen_missing.add(formatted_name)

        occurrences = len(re.findall(rf"\b{re.escape(kw)}\b", job_lower, re.IGNORECASE))
        importance = "Recommended"
        boost = "+4% ATS Score"

        if occurrences >= 2 or idx < 3:
            importance = "High Priority"
            boost = "+8% ATS Score"

        reason = f"Mentioned {occurrences} times in job requirements" if occurrences > 1 else "Key qualification expected for this role"

        missing_keywords.append({
            "name": formatted_name,
            "importance": importance,
            "boost": boost,
            "reason": reason
        })

    # 2. Sections detection
    detected_sections = {}
    detected_sections_count = 0
    for section, pattern in SECTION_PATTERNS.items():
        present = bool(pattern.search(resume_text))
        detected_sections[section] = present
        if present:
            detected_sections_count += 1

    # 3. Action verbs and measurable impact
    action_verb_count = 0
    for verb in ACTION_VERBS:
        if re.search(rf"\b{verb}\b", resume_lower, re.IGNORECASE):
            action_verb_count += 1

    metric_matches = re.findall(
        r"\b(?:\d+[%kK+]|\$\d+|\d+\s*(?:users|clients|ms|seconds|hours|team members|projects))\b",
        resume_text
    )
    metric_count = len(metric_matches)

    # 4. Scoring Algorithm
    # A. Keyword Coverage (0 - 40 points)
    match_ratio = (len(matched_set) / len(job_keywords)) if job_keywords else 0.8
    keyword_score = min(40, round(match_ratio * 40))

    # B. Section Structure & ATS Parsability (0 - 25 points)
    core_sections = ["experience", "skills", "education", "contact"]
    core_count = sum(1 for s in core_sections if detected_sections.get(s))
    formatting_score = min(25, core_count * 5 + (5 if detected_sections_count > 4 else 0))

    # C. Measurable Impact & Action Verbs (0 - 20 points)
    verb_score = min(10, action_verb_count * 2)
    metric_score = min(10, round(metric_count * 2.5))
    impact_score = round(verb_score + metric_score)

    # D. Content Depth & Length (0 - 15 points)
    word_count = len(resume_text.strip().split())
    if word_count < 150:
        length_score = 6
    elif word_count < 300:
        length_score = 10
    elif word_count > 1200:
        length_score = 12
    else:
        length_score = 15

    raw_ats = keyword_score + formatting_score + impact_score + length_score
    ats_score = max(30, min(98, raw_ats))

    raw_job_match = round((len(matched_set) / max(1, len(job_keywords))) * 100)
    job_match = max(25, min(98, raw_job_match))

    if ats_score >= 85:
        score_status = "Excellent ATS Optimization"
        score_grade = "Excellent"
        status_color = "text-emerald-400"
    elif ats_score >= 70:
        score_status = "Good Resume Score"
        score_grade = "Good"
        status_color = "text-indigo-400"
    elif ats_score >= 55:
        score_status = "Moderate - Needs Optimization"
        score_grade = "Average"
        status_color = "text-amber-400"
    else:
        score_status = "Low ATS Compatibility"
        score_grade = "Needs Work"
        status_color = "text-rose-400"

    # 5. Strengths
    strengths = []
    if len(matched_keywords) >= 5:
        strengths.append(f"Strong keyword match: Detected {', '.join(matched_keywords[:4])} matching the job specifications.")
    if detected_sections.get("experience") and detected_sections.get("skills"):
        strengths.append("Well-structured document with clear Work Experience and Technical Skills sections.")
    if metric_count >= 2:
        strengths.append("Good inclusion of quantifiable metrics and achievements in role descriptions.")
    if action_verb_count >= 3:
        strengths.append("Strong use of active industry verbs demonstrating leadership and ownership.")
    if not strengths:
        strengths.append("Clean plain text layout that can be parsed by modern automated applicant scanners.")

    # 6. Actionable Suggestions
    suggestions = []
    if missing_keywords:
        top_missing = ", ".join(k["name"] for k in missing_keywords[:3])
        suggestions.append({
            "priority": "High Priority",
            "badge": "Keyword Gap",
            "text": f"Incorporate missing target keywords: {top_missing}",
            "recommendation": "Add these competencies to your Skills list and reference them in project or work experience bullet points."
        })

    if metric_count < 3:
        suggestions.append({
            "priority": "Recommended",
            "badge": "Quantifiable Impact",
            "text": "Add measurable numbers and percentages to your bullet points",
            "recommendation": "Recruiters and ATS favor results like 'improved speed by 30%' or 'managed database of 50k+ records' over passive duties."
        })

    if not detected_sections.get("summary"):
        suggestions.append({
            "priority": "Recommended",
            "badge": "Professional Summary",
            "text": "Add a concise 2-3 line Professional Summary at the top",
            "recommendation": "Summarize your core tech stack, years of experience, and target specialty to anchor the ATS index."
        })

    if action_verb_count < 3:
        suggestions.append({
            "priority": "Content Polish",
            "badge": "Action Verbs",
            "text": "Replace passive phrases with strong dynamic action verbs",
            "recommendation": "Replace phrases like 'Responsible for' or 'Worked on' with 'Architected', 'Spearheaded', 'Engineered', or 'Delivered'."
        })

    if len(suggestions) < 3:
        suggestions.append({
            "priority": "Standard",
            "badge": "ATS Cleanliness",
            "text": "Maintain a standard single-column layout without tables or graphics",
            "recommendation": "Ensure headings match standard labels (Experience, Education, Skills) to avoid parser errors."
        })

    # 7. Dynamic Bullet Point Rewrites
    candidate_bullets = [
        re.sub(r"^[\s•\-*▪]+", "", line).strip()
        for line in re.split(r"[\r\n]+", resume_text)
    ]
    candidate_bullets = [
        b for b in candidate_bullets
        if 25 < len(b) < 180 and ":" not in b and not b.endswith("@gmail.com")
    ]

    rewrites = []
    if candidate_bullets:
        sample_bullet = candidate_bullets[0]
        cleaned_bullet = re.sub(r"^(worked on|helped with|responsible for)\s*", "", sample_bullet, flags=re.IGNORECASE)
        rewrites.append({
            "original": sample_bullet,
            "improved": f"Spearheaded {cleaned_bullet}, boosting team productivity and system efficiency by 28%."
        })
    else:
        rewrites.append({
            "original": "Responsible for developing UI components and fixing bugs.",
            "improved": "Architected 15+ reusable responsive UI components and resolved critical bug tickets, improving user retention by 22%."
        })

    return {
        "atsScore": ats_score,
        "scoreStatus": score_status,
        "scoreGrade": score_grade,
        "statusColor": status_color,
        "jobMatch": job_match,
        "matchedKeywordsCount": len(matched_keywords),
        "matchedKeywords": matched_keywords,
        "missingKeywords": missing_keywords,
        "breakdown": {
            "skillsMatch": min(100, round(match_ratio * 100)),
            "experienceImpact": min(100, round((impact_score / 20) * 100)),
            "formattingATS": min(100, round((formatting_score / 25) * 100)),
            "contentDepth": min(100, round((length_score / 15) * 100))
        },
        "detectedSections": detected_sections,
        "strengths": strengths,
        "suggestions": suggestions,
        "rewrites": rewrites,
        "analyzedAt": datetime.now().strftime("%I:%M %p")
    }
