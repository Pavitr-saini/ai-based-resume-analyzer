import zlib from "zlib";

// Common industry skills and keywords database
const KNOWN_SKILLS = [
  // Programming Languages
  "javascript", "typescript", "python", "java", "c++", "c#", "go", "golang", "rust", "ruby", "php", "swift", "kotlin", "html", "html5", "css", "css3", "sass", "scss", "sql", "r", "dart",
  // Frontend
  "react", "react.js", "next.js", "nextjs", "vue", "vue.js", "angular", "svelte", "tailwind", "tailwind css", "bootstrap", "material-ui", "mui", "redux", "redux toolkit", "zustand", "mobx", "webpack", "vite", "babel", "responsive design", "web accessibility", "a11y", "ui/ux", "dom manipulation",
  // Backend & APIs
  "node.js", "nodejs", "express", "express.js", "nestjs", "fastapi", "flask", "django", "spring boot", "asp.net", "rest", "rest api", "restful api", "rest apis", "graphql", "grpc", "microservices", "serverless",
  // Databases & Caching
  "postgresql", "postgres", "mysql", "mongodb", "redis", "sqlite", "oracle", "dynamodb", "firebase", "supabase", "prisma", "mongoose", "sequelize", "database design", "indexing",
  // Cloud & DevOps
  "aws", "amazon web services", "azure", "gcp", "google cloud", "docker", "kubernetes", "ci/cd", "continuous integration", "github actions", "jenkins", "terraform", "linux", "nginx", "apache", "cloudflare", "vercel", "netlify",
  // Testing & Quality
  "jest", "cypress", "playwright", "mocha", "chai", "unit testing", "integration testing", "end-to-end testing", "e2e testing", "tdd", "test driven development",
  // Tools & Version Control
  "git", "github", "gitlab", "bitbucket", "jira", "confluence", "postman", "figma", "npm", "yarn", "pnpm", "docker compose",
  // Concepts & Methodologies
  "agile", "scrum", "kanban", "system design", "software architecture", "object-oriented programming", "oop", "functional programming", "clean code", "performance optimization", "seo", "cross-browser compatibility", "code review", "problem solving", "leadership", "communication"
];

// Strong action verbs to detect impact
const ACTION_VERBS = [
  "architected", "spearheaded", "engineered", "orchestrated", "implemented", "developed",
  "designed", "delivered", "built", "optimized", "streamlined", "accelerated", "reduced",
  "increased", "boosted", "scaled", "automated", "refactored", "integrated", "managed",
  "led", "directed", "mentored", "launched", "standardized", "transformed"
];

// Standard ATS sections
const SECTION_PATTERNS = {
  contact: /(?:email|phone|linkedin|github|portfolio|contact|address)/i,
  summary: /(?:summary|objective|profile|about me|professional summary)/i,
  experience: /(?:experience|employment|work history|career history|work experience|professional experience)/i,
  skills: /(?:skills|technologies|technical stack|competencies|proficiencies|tools)/i,
  education: /(?:education|academic|degree|university|college|bachelor|master|b\.tech|m\.tech|b\.s\.|m\.s\.)/i,
  projects: /(?:projects|personal projects|key projects|academic projects)/i,
  certifications: /(?:certifications|certificates|licenses|accreditations)/i
};

/**
 * Pure Node.js helper to extract text streams directly from PDF buffer
 * Works without any external binary/native canvas dependencies.
 */
function extractPdfTextDirectly(buffer) {
  try {
    const raw = buffer.toString("binary");
    let fullText = "";

    // Match all stream ... endstream blocks
    const streamRegex = /stream[\r\n]+([\s\S]*?)[\r\n]+endstream/g;
    let match;
    while ((match = streamRegex.exec(raw)) !== null) {
      let content = "";
      const streamBytes = Buffer.from(match[1], "binary");

      // Try zlib inflate
      try {
        content = zlib.inflateSync(streamBytes).toString("utf8");
      } catch {
        try {
          content = zlib.inflateRawSync(streamBytes).toString("utf8");
        } catch {
          content = streamBytes.toString("utf8");
        }
      }

      // Extract text in Tj operators: (text) Tj
      const tjMatches = content.match(/\(([^()]*)\)\s*Tj/g) || [];
      for (const tm of tjMatches) {
        const text = tm.replace(/^\(/, "").replace(/\)\s*Tj$/, "").trim();
        if (text) fullText += text + " ";
      }

      // Extract text in TJ operators: [(text) 10 (text)] TJ
      const tjArrayMatches = content.match(/\[([\s\S]*?)\]\s*TJ/g) || [];
      for (const tam of tjArrayMatches) {
        const innerStrings = tam.match(/\(([^()]*)\)/g) || [];
        for (const str of innerStrings) {
          const text = str.slice(1, -1).trim();
          if (text) fullText += text + " ";
        }
      }
    }

    // Clean up text
    const clean = fullText
      .replace(/\\([()\\])/g, "$1") // unescape parens and backslashes
      .replace(/[^\x20-\x7E\r\n\t]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return clean;
  } catch (err) {
    console.warn("Direct PDF stream parser warning:", err.message);
    return "";
  }
}

/**
 * Extract plain text from PDF, DOCX, or text file buffer
 */
export async function extractTextFromBuffer(buffer, mimeType, filename = "") {
  const ext = filename.split(".").pop()?.toLowerCase() || "";

  // 1. Plain text file Handling
  if (mimeType === "text/plain" || ext === "txt") {
    const text = buffer.toString("utf8").trim();
    if (text.length > 20) return text;
  }

  // 2. DOCX Handling (Dynamic import of mammoth)
  if (
    mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    ext === "docx"
  ) {
    try {
      const mammothModule = await import("mammoth");
      const mammoth = mammothModule.default || mammothModule;
      const result = await mammoth.extractRawText({ buffer });
      if (result?.value && result.value.trim().length > 20) {
        return result.value.trim();
      }
    } catch (err) {
      console.warn("Mammoth extraction warning:", err.message);
    }
  }

  // 3. PDF Handling
  if (mimeType === "application/pdf" || ext === "pdf") {
    // Attempt A: Dynamic import of pdf-parse
    try {
      const pdfModule = await import("pdf-parse");
      const PDFParse = pdfModule.PDFParse || pdfModule.default;
      if (typeof PDFParse === "function") {
        const parser = new PDFParse({ data: buffer });
        const result = await parser.getText();
        if (typeof parser.destroy === "function") {
          await parser.destroy();
        }
        if (result?.text && result.text.trim().length > 20) {
          return result.text.trim();
        }
      } else if (typeof pdfModule === "function") {
        const result = await pdfModule(buffer);
        if (result?.text && result.text.trim().length > 20) {
          return result.text.trim();
        }
      }
    } catch (err) {
      console.warn("pdf-parse library warning, falling back to stream parser:", err.message);
    }

    // Attempt B: Pure Node.js PDF Stream Extraction (zero external dependencies)
    try {
      const directPdfText = extractPdfTextDirectly(buffer);
      if (directPdfText && directPdfText.length > 30) {
        return directPdfText;
      }
    } catch (err) {
      console.warn("Direct PDF stream parser warning:", err.message);
    }
  }

  // 4. Fallback: Clean printable string decode
  try {
    const rawStr = buffer.toString("utf8");
    // Remove binary unprintable characters
    const cleanStr = rawStr.replace(/[^\x20-\x7E\r\n\t]/g, " ").replace(/\s+/g, " ").trim();
    if (cleanStr.length > 50) {
      return cleanStr;
    }
  } catch (err) {
    console.error("String decode error:", err);
  }

  throw new Error("Unable to extract text from the uploaded resume file. Please ensure it is a valid PDF or DOCX file.");
}

/**
 * Extract keywords, skills, and phrases from text
 */
function extractKeywords(text) {
  const normalized = text.toLowerCase();
  const foundSkills = new Set();
  
  // 1. Check known skills library
  for (const skill of KNOWN_SKILLS) {
    // Escape regex special chars
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(?:^|[\\s,;()·/•|\\-])${escaped}(?:[\\s,;()·/•|\\-]|$)`, "i");
    if (regex.test(normalized)) {
      foundSkills.add(skill);
    }
  }

  // 2. Extract capitalized / prominent technical terms or acronyms (e.g. AWS, CI/CD, REST)
  const technicalWords = text.match(/\b[A-Z][a-zA-Z0-9+#.-]{1,15}\b/g) || [];
  for (const word of technicalWords) {
    const w = word.toLowerCase();
    if (KNOWN_SKILLS.includes(w)) {
      foundSkills.add(w);
    }
  }

  return Array.from(foundSkills);
}

/**
 * Format skill name nicely (e.g. "javascript" -> "JavaScript", "react.js" -> "React.js")
 */
function formatSkillName(skill) {
  const map = {
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
  };

  if (map[skill.toLowerCase()]) {
    return map[skill.toLowerCase()];
  }

  // Capitalize words
  return skill
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Comprehensive ATS analysis engine
 */
export function analyzeResumeATS(resumeText, jobDescription) {
  if (!resumeText || resumeText.length < 50) {
    throw new Error("Resume content is too short or empty to analyze.");
  }

  if (!jobDescription || jobDescription.trim().length < 10) {
    throw new Error("Job description is required to calculate ATS match.");
  }

  const resumeLower = resumeText.toLowerCase();
  const jobLower = jobDescription.toLowerCase();

  // 1. Keyword extraction
  const resumeKeywords = extractKeywords(resumeText);
  const jobKeywords = extractKeywords(jobDescription);

  // Fallback: If job description didn't match known skills list, extract significant terms
  if (jobKeywords.length < 3) {
    const rawTokens = jobDescription
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .map(t => t.toLowerCase())
      .filter(t => t.length > 3 && !["with", "from", "that", "this", "have", "will", "your", "must", "work", "team", "role"].includes(t));
    
    const uniqueTokens = Array.from(new Set(rawTokens)).slice(0, 10);
    for (const t of uniqueTokens) {
      if (!jobKeywords.includes(t)) jobKeywords.push(t);
    }
  }

  // Matched & Missing
  const matchedSet = new Set();
  const missingSet = new Set();

  for (const jk of jobKeywords) {
    if (resumeKeywords.includes(jk) || resumeLower.includes(jk)) {
      matchedSet.add(jk);
    } else {
      missingSet.add(jk);
    }
  }

  const matchedKeywords = Array.from(new Set(Array.from(matchedSet).map(formatSkillName)));
  const missingKeywordsRaw = Array.from(missingSet);

  // Priority ranking for missing keywords with deduplicated names
  const seenMissing = new Set();
  const missingKeywords = [];

  for (let idx = 0; idx < missingKeywordsRaw.length; idx++) {
    const kw = missingKeywordsRaw[idx];
    const formattedName = formatSkillName(kw);

    if (matchedKeywords.includes(formattedName) || seenMissing.has(formattedName)) {
      continue;
    }
    seenMissing.add(formattedName);

    const occurrences = (jobLower.match(new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi")) || []).length;
    let importance = "Recommended";
    let boost = "+4% ATS Score";
    
    if (occurrences >= 2 || idx < 3) {
      importance = "High Priority";
      boost = "+8% ATS Score";
    }

    missingKeywords.push({
      name: formattedName,
      importance,
      boost,
      reason: occurrences > 1 
        ? `Mentioned ${occurrences} times in job requirements` 
        : `Key qualification expected for this role`
    });
  }

  // 2. Sections detection
  const detectedSections = {};
  let detectedSectionsCount = 0;
  for (const [section, pattern] of Object.entries(SECTION_PATTERNS)) {
    const present = pattern.test(resumeText);
    detectedSections[section] = present;
    if (present) detectedSectionsCount++;
  }

  // 3. Action verbs and measurable impact
  let actionVerbCount = 0;
  for (const verb of ACTION_VERBS) {
    const regex = new RegExp(`\\b${verb}\\b`, "i");
    if (regex.test(resumeLower)) {
      actionVerbCount++;
    }
  }

  // Look for percentages (30%), numbers ($50k, 10+, 500+), metrics
  const metricMatches = resumeText.match(/\b(?:\d+[%kK+]|\$\d+|\d+\s*(?:users|clients|ms|seconds|hours|team members|projects))\b/g) || [];
  const metricCount = metricMatches.length;

  // 4. Scoring Algorithm
  // A. Keyword Coverage (0 - 40 points)
  const matchRatio = jobKeywords.length > 0 ? (matchedSet.size / jobKeywords.length) : 0.8;
  const keywordScore = Math.min(40, Math.round(matchRatio * 40));

  // B. Section Structure & ATS Parsability (0 - 25 points)
  // Essential sections: experience, skills, education, contact
  const coreSections = ["experience", "skills", "education", "contact"];
  const coreCount = coreSections.filter(s => detectedSections[s]).length;
  const formattingScore = Math.min(25, coreCount * 5 + (detectedSectionsCount > 4 ? 5 : 0));

  // C. Measurable Impact & Action Verbs (0 - 20 points)
  const verbScore = Math.min(10, actionVerbCount * 2);
  const metricScore = Math.min(10, metricCount * 2.5);
  const impactScore = Math.round(verbScore + metricScore);

  // D. Content Depth & Length (0 - 15 points)
  const wordCount = resumeText.trim().split(/\s+/).length;
  let lengthScore = 15;
  if (wordCount < 150) lengthScore = 6;
  else if (wordCount < 300) lengthScore = 10;
  else if (wordCount > 1200) lengthScore = 12; // slightly penalize excessively verbose resumes

  // Total ATS Score (0 - 100)
  const rawATS = keywordScore + formattingScore + impactScore + lengthScore;
  const atsScore = Math.max(30, Math.min(98, rawATS));

  // Job Match Percentage (0 - 100%)
  const rawJobMatch = Math.round((matchedSet.size / Math.max(1, jobKeywords.length)) * 100);
  const jobMatch = Math.max(25, Math.min(98, rawJobMatch));

  // Rating and status text
  let scoreStatus = "Good Resume Score";
  let scoreGrade = "Good";
  let statusColor = "text-indigo-400";

  if (atsScore >= 85) {
    scoreStatus = "Excellent ATS Optimization";
    scoreGrade = "Excellent";
    statusColor = "text-emerald-400";
  } else if (atsScore >= 70) {
    scoreStatus = "Good Resume Score";
    scoreGrade = "Good";
    statusColor = "text-indigo-400";
  } else if (atsScore >= 55) {
    scoreStatus = "Moderate - Needs Optimization";
    scoreGrade = "Average";
    statusColor = "text-amber-400";
  } else {
    scoreStatus = "Low ATS Compatibility";
    scoreGrade = "Needs Work";
    statusColor = "text-rose-400";
  }

  // 5. Strengths
  const strengths = [];
  if (matchedKeywords.length >= 5) {
    strengths.push(`Strong keyword match: Detected ${matchedKeywords.slice(0, 4).join(", ")} matching the job specifications.`);
  }
  if (detectedSections.experience && detectedSections.skills) {
    strengths.push("Well-structured document with clear Work Experience and Technical Skills sections.");
  }
  if (metricCount >= 2) {
    strengths.push("Good inclusion of quantifiable metrics and achievements in role descriptions.");
  }
  if (actionVerbCount >= 3) {
    strengths.push("Strong use of active industry verbs demonstrating leadership and ownership.");
  }
  if (strengths.length === 0) {
    strengths.push("Clean plain text layout that can be parsed by modern automated applicant scanners.");
  }

  // 6. Actionable Suggestions
  const suggestions = [];
  
  if (missingKeywords.length > 0) {
    const topMissing = missingKeywords.slice(0, 3).map(k => k.name).join(", ");
    suggestions.push({
      priority: "High Priority",
      badge: "Keyword Gap",
      text: `Incorporate missing target keywords: ${topMissing}`,
      recommendation: `Add these competencies to your Skills list and reference them in project or work experience bullet points.`
    });
  }

  if (metricCount < 3) {
    suggestions.push({
      priority: "Recommended",
      badge: "Quantifiable Impact",
      text: "Add measurable numbers and percentages to your bullet points",
      recommendation: "Recruiters and ATS favor results like 'improved speed by 30%' or 'managed database of 50k+ records' over passive duties."
    });
  }

  if (!detectedSections.summary) {
    suggestions.push({
      priority: "Recommended",
      badge: "Professional Summary",
      text: "Add a concise 2-3 line Professional Summary at the top",
      recommendation: "Summarize your core tech stack, years of experience, and target specialty to anchor the ATS index."
    });
  }

  if (actionVerbCount < 3) {
    suggestions.push({
      priority: "Content Polish",
      badge: "Action Verbs",
      text: "Replace passive phrases with strong dynamic action verbs",
      recommendation: "Replace phrases like 'Responsible for' or 'Worked on' with 'Architected', 'Spearheaded', 'Engineered', or 'Delivered'."
    });
  }

  if (suggestions.length < 3) {
    suggestions.push({
      priority: "Standard",
      badge: "ATS Cleanliness",
      text: "Maintain a standard single-column layout without tables or graphics",
      recommendation: "Ensure headings match standard labels (Experience, Education, Skills) to avoid parser errors."
    });
  }

  // 7. Dynamic Bullet Point Rewrites
  // Find lines in resume that look like bullet points
  const candidateBullets = resumeText
    .split(/[\r\n]+/)
    .map(line => line.replace(/^[\s•\-\*▪]+/, "").trim())
    .filter(line => line.length > 25 && line.length < 180 && !line.includes(":") && !line.endsWith("@gmail.com"));

  const rewrites = [];
  if (candidateBullets.length > 0) {
    const sampleBullet = candidateBullets[0];
    rewrites.push({
      original: sampleBullet,
      improved: `Spearheaded ${sampleBullet.replace(/^(worked on|helped with|responsible for)\s*/i, "")}, boosting team productivity and system efficiency by 28%.`
    });
  } else {
    rewrites.push({
      original: "Responsible for developing UI components and fixing bugs.",
      improved: "Architected 15+ reusable responsive UI components and resolved critical bug tickets, improving user retention by 22%."
    });
  }

  return {
    atsScore,
    scoreStatus,
    scoreGrade,
    statusColor,
    jobMatch,
    matchedKeywordsCount: matchedKeywords.length,
    matchedKeywords,
    missingKeywords,
    breakdown: {
      skillsMatch: Math.min(100, Math.round(matchRatio * 100)),
      experienceImpact: Math.min(100, Math.round((impactScore / 20) * 100)),
      formattingATS: Math.min(100, Math.round((formattingScore / 25) * 100)),
      contentDepth: Math.min(100, Math.round((lengthScore / 15) * 100))
    },
    detectedSections,
    strengths,
    suggestions,
    rewrites,
    analyzedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  };
}
