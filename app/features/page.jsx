import Link from "next/link";
import {
    Sparkles,
    FileText,
    Search,
    Target,
    TrendingUp,
    ShieldCheck,
    Brain,
    CheckCircle2,
    XCircle,
    ArrowRight,
    Zap,
    Award,
    BarChart3,
    BriefcaseBusiness,
    SpellCheck,
    Lightbulb,
    ScanSearch,
    Check,
    X,
    FileCode,
    Cpu,
    HelpCircle
} from "lucide-react";

export default function FeaturesPage() {
    const coreEngines = [
        {
            icon: <FileCode className="w-6 h-6 text-blue-400" />,
            badge: "Engine 01",
            title: "Multi-Format Document Parsing Engine",
            description: "Deep binary and stream parser supporting Microsoft Word (.docx), PDF documents, and plain text without third-party cloud intermediaries.",
            highlights: [
                "Extracts structured text streams in-memory",
                "Detects complex multi-column layouts and formatting hazards",
                "Identifies hidden ASCII and non-printable encoding errors"
            ]
        },
        {
            icon: <ScanSearch className="w-6 h-6 text-purple-400" />,
            badge: "Engine 02",
            title: "Keyword Gap & Semantic Skill Matcher",
            description: "Tokenizes both unigram and bigram keyphrases from the target job posting and cross-references them against our 200+ technology skill ontology.",
            highlights: [
                "Separates core requirements from secondary bonus skills",
                "Calculates exact keyword recurrence frequencies",
                "Predicts individual skill gap point penalties"
            ]
        },
        {
            icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
            badge: "Engine 03",
            title: "4-Quadrant Weighted ATS Scoring Matrix",
            description: "A balanced mathematical scoring algorithm replicating standard corporate ATS filtering thresholds.",
            highlights: [
                "Keyword Coverage: 40% weighting",
                "Structure & Section Compliance: 25% weighting",
                "Quantifiable Impact & Metrics: 20% weighting",
                "Content Conciseness & Depth: 15% weighting"
            ]
        },
        {
            icon: <Award className="w-6 h-6 text-amber-400" />,
            badge: "Engine 04",
            title: "ATS Section Architecture Validator",
            description: "Inspects your resume for standard corporate headings required by automated document indexing systems.",
            highlights: [
                "Flags non-standard custom labels that confuse OCR parsers",
                "Verifies Contact, Summary, Experience, Skills, Education, Projects",
                "Ensures chronological consistency and clean header separation"
            ]
        },
        {
            icon: <TrendingUp className="w-6 h-6 text-cyan-400" />,
            badge: "Engine 05",
            title: "Quantifiable Impact & Metric Analyzer",
            description: "Scans each experience bullet point for percentages, revenue metrics, user scales, and measurable business impact.",
            highlights: [
                "Distinguishes passive job duties from active achievements",
                "Scans for metric indicators (%, $, k+, ms, user counts)",
                "Scores overall density of quantifiable bullet statements"
            ]
        },
        {
            icon: <Zap className="w-6 h-6 text-rose-400" />,
            badge: "Engine 06",
            title: "AI Dynamic Bullet Point Rewriter",
            description: "Identifies passive phrasing and provides instant, high-impact before-and-after bullet point transformations.",
            highlights: [
                "Replaces weak verbs ('assisted with', 'responsible for')",
                "Injects active power verbs ('architected', 'spearheaded', 'scaled')",
                "Formats achievements into standard Google XYZ formula format"
            ]
        }
    ];

    const comparisonData = [
        {
            feature: "Real-time in-memory PDF & Word parsing",
            resumeAI: true,
            humanReview: false,
            genericTool: false
        },
        {
            feature: "Custom Job Description alignment cross-check",
            resumeAI: true,
            humanReview: true,
            genericTool: false
        },
        {
            feature: "Dynamic Skill Gap with Score Boost %",
            resumeAI: true,
            humanReview: false,
            genericTool: false
        },
        {
            feature: "Automated before/after bullet rewrites",
            resumeAI: true,
            humanReview: true,
            genericTool: false
        },
        {
            feature: "Turnaround time under 30 seconds",
            resumeAI: true,
            humanReview: false,
            genericTool: true
        },
        {
            feature: "100% Privacy — no permanent resume storage",
            resumeAI: true,
            humanReview: false,
            genericTool: false
        }
    ];

    const faqs = [
        {
            q: "How does ResumeAI calculate my ATS Score?",
            a: "Our scoring algorithm evaluates 4 key dimensions: Keyword Density (up to 40 pts), Section Architecture & Format Parsability (up to 25 pts), Quantifiable Metrics & Action Verbs (up to 20 pts), and Content Length & Depth (up to 15 pts)."
        },
        {
            q: "Which file formats give the best ATS results?",
            a: "PDF and Microsoft Word (.docx) are the two gold standards accepted by over 99% of Applicant Tracking Systems. ResumeAI natively parses both formats without corrupting character encodings."
        },
        {
            q: "Why is matching the specific job description so important?",
            a: "Corporate ATS filters rank candidates based on keyword overlap with the specific job requisition. A generic resume often misses exact skill variants (e.g. 'React.js' vs 'Frontend Frameworks') that algorithmic filters search for."
        },
        {
            q: "Is my resume confidential and secure?",
            a: "Yes. Your resume file is processed directly in server memory during your request and is discarded immediately after analysis. We never sell, store, or train models on your personal resume data."
        }
    ];

    return (
        <main className="min-h-screen bg-[#050816] text-white">

            {/* FEATURES HERO HEADER */}
            <section className="relative px-5 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-16 border-b border-white/10 bg-[#080e20]">
                <div className="max-w-[1200px] mx-auto text-center space-y-5">
                    
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-400/20 bg-indigo-500/10 text-indigo-300 text-xs sm:text-sm font-semibold">
                        <Cpu className="w-4 h-4 text-indigo-400" />
                        Comprehensive Feature Specifications
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
                        Built-In Tools Engineered to{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                            Beat Corporate ATS
                        </span>
                    </h1>

                    <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                        Explore the specialized parsing engines, semantic tokenizers, and AI diagnostic systems that power every ResumeAI evaluation.
                    </p>

                    <div className="pt-2">
                        <Link
                            href="/analyze"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 hover:scale-105 transition-all"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>Try These Features On Your Resume</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                </div>
            </section>

            {/* 6 CORE ENGINES DETAILED BREAKDOWN */}
            <section className="py-20 px-5 sm:px-8 lg:px-12 max-w-[1300px] mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-[2px] text-indigo-400">
                        Architectural Deep-Dive
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                        Six Specialized Analysis Engines
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base">
                        Every upload is inspected through a rigorous multi-stage pipeline.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coreEngines.map((engine) => (
                        <div
                            key={engine.title}
                            className="p-7 rounded-2xl border border-white/10 bg-[#0c1325] hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                        {engine.icon}
                                    </div>
                                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                                        {engine.badge}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2.5">
                                    {engine.title}
                                </h3>

                                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                                    {engine.description}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-white/5 space-y-2">
                                {engine.highlights.map((h, i) => (
                                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                        <span>{h}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* COMPARISON MATRIX SECTION */}
            <section className="py-20 px-5 sm:px-8 border-y border-white/10 bg-[#080e20]">
                <div className="max-w-5xl mx-auto">
                    
                    <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
                        <span className="text-xs font-bold uppercase tracking-[2px] text-indigo-400">
                            Feature Comparison
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                            Why ResumeAI Stands Out
                        </h2>
                        <p className="text-slate-400 text-sm">
                            Compare our integrated AI pipeline against traditional reviews and generic online checkers.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#0c1325] overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-white/10 bg-[#080e20] text-xs uppercase tracking-wider text-slate-400">
                                        <th className="p-4 sm:p-5">Feature Capability</th>
                                        <th className="p-4 sm:p-5 text-indigo-400 font-bold">ResumeAI</th>
                                        <th className="p-4 sm:p-5 text-slate-400">Human Review</th>
                                        <th className="p-4 sm:p-5 text-slate-400">Generic ATS Checkers</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {comparisonData.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-white/[0.02] transition">
                                            <td className="p-4 sm:p-5 text-white font-medium">{row.feature}</td>
                                            
                                            <td className="p-4 sm:p-5">
                                                {row.resumeAI ? (
                                                    <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400 text-xs">
                                                        <Check className="w-4 h-4 text-emerald-400" /> Yes
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-600 text-xs">—</span>
                                                )}
                                            </td>

                                            <td className="p-4 sm:p-5">
                                                {row.humanReview ? (
                                                    <span className="inline-flex items-center gap-1.5 text-slate-300 text-xs">
                                                        <Check className="w-4 h-4 text-slate-400" /> Yes
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-600 text-xs">—</span>
                                                )}
                                            </td>

                                            <td className="p-4 sm:p-5">
                                                {row.genericTool ? (
                                                    <span className="inline-flex items-center gap-1.5 text-slate-300 text-xs">
                                                        <Check className="w-4 h-4 text-slate-400" /> Limited
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-600 text-xs">—</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </section>

            {/* TECHNICAL FAQ SECTION */}
            <section className="py-20 px-5 sm:px-8 max-w-4xl mx-auto">
                <div className="text-center mb-14 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-[2px] text-indigo-400">
                        Frequently Asked Questions
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                        Everything You Need to Know
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="p-6 rounded-2xl border border-white/10 bg-[#0c1325]"
                        >
                            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-2">
                                <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                                {faq.q}
                            </h3>
                            <p className="text-sm text-slate-400 leading-relaxed pl-6">
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* BOTTOM CALL TO ACTION */}
            <section className="py-16 px-5 sm:px-8 border-t border-white/10 bg-[#080e20] text-center">
                <div className="max-w-2xl mx-auto space-y-5">
                    <h2 className="text-3xl font-extrabold text-white">
                        Put These Engines to Work on Your Resume
                    </h2>
                    <p className="text-sm text-slate-400">
                        Upload your PDF or Word document now and see your ATS compatibility score in under 30 seconds.
                    </p>
                    <Link
                        href="/analyze"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:scale-105 transition-all"
                    >
                        <span>Start Free Resume Analysis</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

        </main>
    );
}
