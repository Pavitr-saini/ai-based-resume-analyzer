"use client";

import { useState } from "react";
import {
    Sparkles,
    Upload,
    FileText,
    CheckCircle2,
    AlertTriangle,
    Target,
    BarChart3,
    ArrowRight,
    RefreshCw,
    X,
    Check,
    TrendingUp,
    ShieldCheck,
    Zap,
    Download,
    Layers,
    ListChecks
} from "lucide-react";

export default function AnalyzePage() {
    const [resume, setResume] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState(null);
    const [activeTab, setActiveTab] = useState("all");

    // Sample job description template for quick testing
    const sampleJob = `We are looking for a Senior Frontend Developer with expertise in React.js, Next.js, and TypeScript.
Key Responsibilities:
• Build high-performance, accessible, responsive user interfaces using React, Next.js, and Tailwind CSS.
• Integrate with REST APIs and GraphQL microservices.
• Write unit and integration tests using Jest and Cypress.
• Collaborate with backend engineers, designers, and product managers in an Agile environment.
• Optimize application loading speed, SEO, and web performance.

Requirements:
• 3+ years experience with modern JavaScript (ES6+), TypeScript, and React.js.
• Strong experience with responsive design and CSS frameworks like Tailwind CSS.
• Experience with Git, GitHub Actions, CI/CD, and Docker is a plus.
• Strong problem-solving skills and communication.`;

    // Handle resume upload
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain"
        ];

        const isAllowedExt = file.name.endsWith(".pdf") || file.name.endsWith(".docx") || file.name.endsWith(".txt");

        if (!allowedTypes.includes(file.type) && !isAllowedExt) {
            setError("Please upload a PDF (.pdf) or Word (.docx) document.");
            e.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("File size must be less than 5 MB.");
            e.target.value = "";
            return;
        }

        setResume(file);
        setError("");
    };

    // Remove uploaded resume
    const removeResume = () => {
        setResume(null);
        setShowResults(false);
        setResults(null);
        const fileInput = document.getElementById("resume-upload");
        if (fileInput) fileInput.value = "";
    };

    // Run real backend analysis
    const handleAnalyze = async () => {
        if (!resume) {
            setError("Please upload your resume first (PDF or DOCX).");
            return;
        }

        if (!jobDescription.trim()) {
            setError("Please enter or paste the target job description.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("resume", resume);
            formData.append("jobDescription", jobDescription);

            const response = await fetch("/api/analyze", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || "Analysis failed. Please verify your file and try again.");
            }

            setResults(result.data);
            setShowResults(true);

            // Smooth scroll to results
            setTimeout(() => {
                const resultsElement = document.getElementById("analysis-results");
                if (resultsElement) {
                    resultsElement.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        } catch (err) {
            console.error("Analysis Error:", err);
            setError(err.message || "Failed to connect to the backend server. Please try again.");
            setShowResults(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050816] text-white">
            <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:py-20">

                {/* Page Heading */}
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        AI-Powered ATS Resume Analysis
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                        Analyze Your{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Resume
                        </span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                        Upload your resume and paste the job description to run deep ATS parsing, 
                        keyword gap matching, and actionable AI optimizations.
                    </p>
                </div>

                {/* Upload and Job Description Cards */}
                <div className="grid gap-7 lg:grid-cols-2">

                    {/* Resume Upload Card */}
                    <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c1325] p-6 sm:p-8">
                        <div>
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-400">
                                    <Upload className="w-5 h-5" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold">Upload Resume</h2>
                                    <p className="mt-1 text-sm text-slate-400">
                                        Upload your latest PDF or Word document
                                    </p>
                                </div>
                            </div>

                            <label
                                htmlFor="resume-upload"
                                className="flex min-h-[230px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-[#080e20] px-5 py-8 text-center transition hover:border-indigo-500 hover:bg-indigo-500/5"
                            >
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">
                                    <FileText className="w-8 h-8" />
                                </div>

                                <p className="font-medium text-white">
                                    Click to upload your resume
                                </p>

                                <p className="mt-2 text-sm text-slate-400">
                                    or drag and drop your file here
                                </p>

                                <p className="mt-4 text-xs text-slate-500">
                                    PDF or DOCX · Maximum size 5 MB
                                </p>

                                <input
                                    id="resume-upload"
                                    type="file"
                                    accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* Uploaded File Details */}
                        {resume && (
                            <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                                <div className="flex min-w-0 items-center gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-xl text-green-400">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </span>

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium text-white">
                                            {resume.name}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-400">
                                            {(resume.size / 1024 / 1024).toFixed(2)} MB · Ready for analysis
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={removeResume}
                                    className="shrink-0 rounded-lg p-2 text-sm text-red-400 transition hover:bg-red-500/10"
                                    title="Remove file"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Job Description Card */}
                    <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c1325] p-6 sm:p-8">
                        <div>
                            <div className="mb-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-xl text-purple-400">
                                        <Target className="w-5 h-5" />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            Job Description
                                        </h2>
                                        <p className="mt-1 text-sm text-slate-400">
                                            Paste target role requirements
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setJobDescription(sampleJob)}
                                    className="text-xs text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 rounded-lg transition"
                                >
                                    Insert Sample Job
                                </button>
                            </div>

                            <textarea
                                value={jobDescription}
                                onChange={(e) => {
                                    setJobDescription(e.target.value);
                                    setError("");
                                }}
                                placeholder="Paste the job description here...

Example:
We are looking for a Frontend Developer with React, JavaScript, and Tailwind CSS.
Requirements:
• Experience with React and Next.js
• Understanding of REST APIs and Git
• Strong problem-solving skills"
                                className="min-h-[230px] w-full resize-y rounded-xl border border-slate-700 bg-[#080e20] p-4 text-sm leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="mt-3 flex justify-between text-xs text-slate-500">
                            <span>Real-time keyword extractor active</span>
                            <span>{jobDescription.length} characters</span>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Analyze Button */}
                <div className="mt-9 text-center">
                    <button
                        type="button"
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="inline-flex min-w-[240px] items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.02] hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? (
                            <>
                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                <span>Analyzing with Backend Engine...</span>
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                <span>Analyze Resume with AI</span>
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>

                    <p className="mt-4 text-xs text-slate-500">
                        Analyzed securely on your backend · PDF & Word DOCX text extraction
                    </p>
                </div>

                {/* Real Dynamic Backend Results */}
                {showResults && results && (
                    <div id="analysis-results" className="mt-16 space-y-8 animate-[fadeIn_0.5s_ease-in-out]">
                        
                        {/* Status Header */}
                        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
                            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                                <CheckCircle2 className="w-4 h-4" />
                                Backend Analysis Complete · Processed at {results.analyzedAt}
                            </div>

                            <h2 className="mt-3 text-3xl font-bold">
                                ATS Performance Diagnostic Report
                            </h2>

                            <p className="mt-2 text-sm text-slate-400">
                                Analyzed file: <strong className="text-white">{results.fileName}</strong> ({results.fileSizeMB} MB)
                            </p>
                        </div>

                        {/* Top Metric Score Cards */}
                        <div className="grid gap-5 sm:grid-cols-3">

                            {/* ATS Score */}
                            <div className="rounded-2xl border border-white/10 bg-[#0c1325] p-6 text-center shadow-lg">
                                <p className="text-sm font-medium text-slate-400">Overall ATS Score</p>

                                <p className="mt-4 text-5xl font-extrabold text-indigo-400">
                                    {results.atsScore}
                                    <span className="text-2xl text-slate-500">/100</span>
                                </p>

                                <p className={`mt-3 text-sm font-semibold ${results.statusColor || "text-emerald-400"}`}>
                                    {results.scoreStatus}
                                </p>
                            </div>

                            {/* Job Match */}
                            <div className="rounded-2xl border border-white/10 bg-[#0c1325] p-6 text-center shadow-lg">
                                <p className="text-sm font-medium text-slate-400">Job Description Match</p>

                                <p className="mt-4 text-5xl font-extrabold text-blue-400">
                                    {results.jobMatch}%
                                </p>

                                <p className="mt-3 text-sm text-slate-400">
                                    Competency & qualification overlap
                                </p>
                            </div>

                            {/* Keywords Count */}
                            <div className="rounded-2xl border border-white/10 bg-[#0c1325] p-6 text-center shadow-lg">
                                <p className="text-sm font-medium text-slate-400">
                                    Keywords Found
                                </p>

                                <p className="mt-4 text-5xl font-extrabold text-purple-400">
                                    {results.matchedKeywordsCount}
                                </p>

                                <p className="mt-3 text-sm text-slate-400">
                                    Industry skills & tech terms verified
                                </p>
                            </div>
                        </div>

                        {/* Section & Category Diagnostic Meters */}
                        <div className="grid gap-7 lg:grid-cols-2">
                            
                            {/* Category Scoring Meters */}
                            <div className="rounded-2xl border border-white/10 bg-[#0c1325] p-6 sm:p-8">
                                <div className="flex items-center gap-2 mb-6">
                                    <BarChart3 className="w-5 h-5 text-indigo-400" />
                                    <h3 className="text-lg font-semibold text-white">Score Breakdown</h3>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1.5">
                                            <span className="text-slate-300">Technical Skills Coverage</span>
                                            <span className="font-semibold text-indigo-300">{results.breakdown?.skillsMatch || 0}%</span>
                                        </div>
                                        <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                                                style={{ width: `${results.breakdown?.skillsMatch || 0}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-sm mb-1.5">
                                            <span className="text-slate-300">Experience & Measurable Metrics</span>
                                            <span className="font-semibold text-blue-300">{results.breakdown?.experienceImpact || 0}%</span>
                                        </div>
                                        <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                                style={{ width: `${results.breakdown?.experienceImpact || 0}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-sm mb-1.5">
                                            <span className="text-slate-300">ATS Structure & Formatting</span>
                                            <span className="font-semibold text-emerald-300">{results.breakdown?.formattingATS || 0}%</span>
                                        </div>
                                        <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                                                style={{ width: `${results.breakdown?.formattingATS || 0}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-sm mb-1.5">
                                            <span className="text-slate-300">Content Depth & Length</span>
                                            <span className="font-semibold text-purple-300">{results.breakdown?.contentDepth || 0}%</span>
                                        </div>
                                        <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                                                style={{ width: `${results.breakdown?.contentDepth || 0}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Standard ATS Sections Check */}
                            <div className="rounded-2xl border border-white/10 bg-[#0c1325] p-6 sm:p-8">
                                <div className="flex items-center gap-2 mb-6">
                                    <ListChecks className="w-5 h-5 text-purple-400" />
                                    <h3 className="text-lg font-semibold text-white">ATS Section Verification</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { label: "Contact Information", key: "contact" },
                                        { label: "Professional Summary", key: "summary" },
                                        { label: "Work Experience", key: "experience" },
                                        { label: "Skills / Tech Stack", key: "skills" },
                                        { label: "Education History", key: "education" },
                                        { label: "Key Projects", key: "projects" },
                                    ].map((sec) => {
                                        const detected = results.detectedSections?.[sec.key];
                                        return (
                                            <div
                                                key={sec.key}
                                                className={`flex items-center gap-2.5 rounded-xl border p-3 text-xs sm:text-sm ${
                                                    detected
                                                        ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-300"
                                                        : "border-slate-800 bg-slate-900/40 text-slate-400"
                                                }`}
                                            >
                                                {detected ? (
                                                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                                ) : (
                                                    <X className="w-4 h-4 text-slate-500 shrink-0" />
                                                )}
                                                <span className="truncate">{sec.label}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <p className="mt-5 text-xs text-slate-400 leading-relaxed">
                                    Standard section headers allow automated Applicant Tracking Systems to catalog your credentials without parsing faults.
                                </p>
                            </div>
                        </div>

                        {/* Keyword Comparison (Matched vs Missing) */}
                        <div className="rounded-2xl border border-white/10 bg-[#0c1325] p-6 sm:p-8">
                            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <Layers className="w-5 h-5 text-indigo-400" />
                                Keyword Gap Analysis
                            </h3>

                            <div className="grid gap-6 md:grid-cols-2">
                                
                                {/* Matched Keywords */}
                                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-semibold text-emerald-300 flex items-center gap-1.5">
                                            <CheckCircle2 className="w-4 h-4" />
                                            Matched Skills ({results.matchedKeywords?.length || 0})
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {results.matchedKeywords && results.matchedKeywords.length > 0 ? (
                                            results.matchedKeywords.map((kw, i) => (
                                                <span
                                                    key={i}
                                                    className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-200"
                                                >
                                                    <Check className="w-3 h-3" />
                                                    {kw}
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-xs text-slate-400">No direct technical keywords matched yet.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Missing Keywords */}
                                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-semibold text-amber-300 flex items-center gap-1.5">
                                            <AlertTriangle className="w-4 h-4" />
                                            Missing High-Value Keywords ({results.missingKeywords?.length || 0})
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        {results.missingKeywords && results.missingKeywords.length > 0 ? (
                                            results.missingKeywords.slice(0, 5).map((item, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center justify-between rounded-lg border border-amber-500/20 bg-amber-500/10 p-2.5 text-xs"
                                                >
                                                    <div>
                                                        <span className="font-semibold text-white">{item.name}</span>
                                                        <span className="ml-2 text-slate-400">{item.reason}</span>
                                                    </div>
                                                    <span className="shrink-0 rounded bg-amber-400/20 px-2 py-0.5 text-[11px] font-semibold text-amber-300">
                                                        {item.boost}
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-xs text-emerald-400">Great job! All core skills from the job description are matched.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Real Actionable Recommendations */}
                        <div className="rounded-2xl border border-white/10 bg-[#0c1325] p-6 sm:p-8">
                            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-indigo-400" />
                                Tailored Improvement Recommendations
                            </h3>

                            <div className="space-y-4">
                                {results.suggestions && results.suggestions.map((sug, idx) => (
                                    <div
                                        key={idx}
                                        className="rounded-xl border border-slate-800 bg-[#080e20] p-4 sm:p-5 transition hover:border-slate-700"
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-300">
                                                {sug.priority}
                                            </span>
                                            <h4 className="text-sm font-semibold text-white">{sug.text}</h4>
                                        </div>
                                        <p className="text-xs text-slate-400 leading-relaxed">
                                            {sug.recommendation}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* AI Bullet Point Rewrite Example */}
                        {results.rewrites && results.rewrites.length > 0 && (
                            <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-[#0c1325] to-[#111936] p-6 sm:p-8">
                                <div className="flex items-center gap-2 mb-5">
                                    <Zap className="w-5 h-5 text-yellow-400" />
                                    <h3 className="text-xl font-semibold text-white">AI Bullet Point Enhancer</h3>
                                </div>

                                {results.rewrites.map((rw, i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="rounded-xl border border-slate-800 bg-black/30 p-4">
                                            <p className="text-xs font-semibold text-slate-400 mb-1">Original Bullet (From Resume):</p>
                                            <p className="text-sm text-slate-300 font-mono">"{rw.original}"</p>
                                        </div>

                                        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                                            <p className="text-xs font-semibold text-emerald-400 mb-1">AI Optimized High-Impact Version:</p>
                                            <p className="text-sm text-emerald-200 font-medium">"{rw.improved}"</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Action Footer */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
                            <span>Ready to re-test after making resume updates?</span>
                            <button
                                type="button"
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                                className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition"
                            >
                                <RefreshCw className="w-3.5 h-3.5" />
                                Analyze another file or role
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
