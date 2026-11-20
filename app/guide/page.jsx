import Link from "next/link";
import { BookOpen, ArrowRight, CheckCircle2, AlertTriangle, Target, Sparkles, Check, X } from "lucide-react";

export const metadata = {
    title: "ATS System Guide | ResumeAI ATS Optimizer",
    description: "The complete guide to understanding Applicant Tracking Systems (ATS), how algorithms score your resume, and how to pass filters.",
};

export default function GuidePage() {
    const rules = [
        {
            num: "01",
            title: "Mirror Exact Technical Keyword Variants",
            desc: "If the job description requests 'React.js' and 'TypeScript', avoid writing generic terms like 'Frontend frameworks'. Algorithmic tokenizers perform literal and bi-gram phrase matches."
        },
        {
            num: "02",
            title: "Stick to Standard Section Headings",
            desc: "Use conventional titles: Summary, Work Experience, Skills, Education, Projects. Creative labels like 'Where I've Been' or 'Passions' cause ATS parsers to misclassify data."
        },
        {
            num: "03",
            title: "Quantify Impact With Google XYZ Metrics",
            desc: "Frame achievements as: Accomplished [X] as measured by [Y], by doing [Z]. For example: 'Reduced page latency by 42% by migrating 15 API routes to Next.js server components.'"
        },
        {
            num: "04",
            title: "Avoid Parsing Traps (Tables & Multi-Columns)",
            desc: "Multi-column layouts often read out-of-order in older ATS engines like Taleo or Workday, splicing two separate columns into unreadable garbled sentences."
        },
        {
            num: "05",
            title: "Use Supported File Formats (.pdf & .docx)",
            desc: "Stick strictly to text-based PDF or Word (.docx) formats. Avoid image-only scans or Photoshop-designed resumes that cannot be indexed via OCR."
        }
    ];

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            {/* Header */}
            <div className="border-b border-white/10 bg-[#080e20] py-16 px-6 lg:px-10 text-center">
                <div className="max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-400/20 bg-purple-500/10 text-purple-300 text-xs font-semibold">
                        <BookOpen className="w-4 h-4" />
                        <span>ATS Intelligence & Screening Guide</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
                        How Applicant Tracking Systems{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Actually Work
                        </span>
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                        Over 75% of resumes are discarded by corporate algorithms before reaching a human recruiter. Learn how to beat the filters.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
                {/* What is ATS */}
                <section className="p-8 rounded-2xl border border-white/10 bg-[#0c1325] space-y-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Target className="w-6 h-6 text-indigo-400" />
                        What is an Applicant Tracking System (ATS)?
                    </h2>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        An Applicant Tracking System (ATS) is software used by employers (such as Workday, Greenhouse, Taleo, and Lever) to collect, parse, rank, and index job applications. When you apply online, an ATS ingests your document, tokenizes your experience, and gives recruiters a sorted list of candidates ranked by keyword compatibility.
                    </p>
                </section>

                {/* 5 Essential Rules */}
                <section className="space-y-6">
                    <div className="text-center max-w-2xl mx-auto">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Actionable Blueprint</span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                            5 Rules to Pass Any ATS Filter
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {rules.map((rule) => (
                            <div key={rule.num} className="p-6 rounded-2xl border border-white/10 bg-[#0c1325] hover:border-indigo-500/30 transition">
                                <span className="text-2xl font-black text-indigo-400/40">{rule.num}</span>
                                <h3 className="text-lg font-bold text-white mt-2 mb-2">{rule.title}</h3>
                                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{rule.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Do's and Don'ts */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-white text-center">ATS Quick Comparison</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Do's */}
                        <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-3">
                            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                                <Check className="w-5 h-5" /> What to Do
                            </h3>
                            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>Use standard fonts like Arial, Calibri, or Inter</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>Include a dedicated Skills section with comma-separated terms</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>Tailor technical keywords for each specific job posting</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>Test your score using ResumeAI before sending your application</span>
                                </li>
                            </ul>
                        </div>

                        {/* Don'ts */}
                        <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-500/5 space-y-3">
                            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                                <X className="w-5 h-5" /> What to Avoid
                            </h3>
                            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                                <li className="flex items-start gap-2">
                                    <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                                    <span>Don't put vital contact info inside header/footer bands</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                                    <span>Don't use rating bars or stars to depict skill proficiency</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                                    <span>Don't upload images, screenshots, or Canva graphics without text</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                                    <span>Don't hide invisible white text keywords (modern ATS flags this)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Bottom Call to Action */}
                <div className="p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-blue-900/30 to-purple-900/30 text-center space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                        Ready to Test Your Resume Against Modern ATS Rules?
                    </h2>
                    <p className="text-slate-300 text-sm max-w-xl mx-auto">
                        Upload your resume now to run our live ATS compatibility check, identify missing keywords, and get instant suggestions.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/analyze"
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm shadow-lg hover:scale-105 transition"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>Run Free ATS Check Now</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
