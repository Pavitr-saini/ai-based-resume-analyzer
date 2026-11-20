import Link from "next/link";
import {
    Sparkles,
    ArrowRight,
    FileCheck,
    CheckCircle2,
    TrendingUp,
    ShieldCheck,
    Zap,
    Target,
    BarChart3,
    Layers,
    Award,
    Users,
    ChevronRight
} from "lucide-react";

export default function Hero() {
    return (
        <div className="w-full bg-[#050816] text-white overflow-hidden">

            {/* HERO BANNER SECTION */}
            <section className="relative pt-16 sm:pt-24 pb-20 sm:pb-28 px-5 sm:px-8 lg:px-12">
                
                {/* Ambient glow backgrounds */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] sm:w-[850px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/20 to-purple-600/15 blur-[140px] pointer-events-none rounded-full" />
                <div className="absolute top-80 right-10 w-72 h-72 bg-purple-600/10 blur-[130px] pointer-events-none rounded-full" />

                <div className="relative max-w-[1300px] mx-auto">
                    
                    <div className="text-center max-w-4xl mx-auto space-y-6">
                        
                        {/* Pill Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-400/25 bg-indigo-500/10 text-indigo-300 text-xs sm:text-sm font-semibold shadow-sm">
                            <Sparkles className="w-4 h-4 text-indigo-400" />
                            <span>Next-Gen AI Resume Analyzer & ATS Optimizer</span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] sm:leading-[1.15]">
                            Land 3x More Interviews With An{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                                ATS-Optimized Resume
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-slate-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
                            Stop getting filtered out by automated hiring algorithms. Compare your resume directly against target job descriptions, uncover keyword gaps, and get instant AI optimizations.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link
                                href="/analyze"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-base shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                <Sparkles className="w-5 h-5" />
                                <span>Analyze Resume Free</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            <Link
                                href="/features"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl border border-white/10 bg-[#0c1325] hover:bg-white/5 text-slate-300 hover:text-white font-semibold text-base transition-all"
                            >
                                <span>Explore All Features</span>
                                <ChevronRight className="w-4 h-4 text-slate-400" />
                            </Link>
                        </div>

                        {/* Trust Micro-Copy */}
                        <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-xs text-slate-400">
                            <span className="inline-flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free instant ATS scoring
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> PDF & Word DOCX support
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Private — no data stored
                            </span>
                        </div>

                    </div>

                    {/* INTERACTIVE DASHBOARD PREVIEW MOCKUP */}
                    <div className="mt-14 sm:mt-20 max-w-5xl mx-auto rounded-3xl border border-white/10 bg-[#0a1022]/90 p-5 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-2xl">
                        
                        {/* Mock Window Bar */}
                        <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10 text-xs text-slate-400">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                <span className="ml-2 font-mono text-slate-400 hidden sm:inline">resumeai-scanner-v2.6 // live-diagnostic</span>
                            </div>
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-400 text-[11px] border border-emerald-500/20">
                                ● ATS Passed • 94% Top Match
                            </span>
                        </div>

                        {/* Top Mock Metrics */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            
                            <div className="p-4 sm:p-5 rounded-2xl bg-[#0e172e] border border-white/5">
                                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">ATS Compatibility</span>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-4xl sm:text-5xl font-black text-indigo-400">92</span>
                                    <span className="text-slate-500 text-sm">/ 100</span>
                                </div>
                                <p className="text-xs text-emerald-400 font-medium mt-1">Excellent Resume Score</p>
                            </div>

                            <div className="p-4 sm:p-5 rounded-2xl bg-[#0e172e] border border-white/5">
                                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Job Match Alignment</span>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-4xl sm:text-5xl font-black text-blue-400">88%</span>
                                </div>
                                <p className="text-xs text-slate-400 mt-1">Senior Frontend Engineer Role</p>
                            </div>

                            <div className="p-4 sm:p-5 rounded-2xl bg-[#0e172e] border border-white/5">
                                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Matched Keywords</span>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-4xl sm:text-5xl font-black text-purple-400">14</span>
                                    <span className="text-slate-500 text-xs">/ 16 skills</span>
                                </div>
                                <p className="text-xs text-purple-300 font-medium mt-1">High Skill Frequency</p>
                            </div>

                        </div>

                        {/* Matched Skills Chips in Preview */}
                        <div className="p-4 sm:p-5 rounded-2xl bg-[#0e172e] border border-white/5 mb-6">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 block">
                                Verified ATS Keywords in Resume
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {["React.js", "TypeScript", "Next.js", "Tailwind CSS", "REST APIs", "Jest", "Git", "Responsive Design", "Agile"].map((skill) => (
                                    <span key={skill} className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-200">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                        {skill}
                                    </span>
                                ))}
                                <span className="inline-flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs text-amber-300">
                                    + Missing: Docker (+6% boost)
                                </span>
                            </div>
                        </div>

                        {/* Live AI Bullet Rewrite Preview */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
                                    Original Bullet (Passive):
                                </span>
                                <p className="text-xs text-slate-300">
                                    "Worked on frontend features using React and fixed bugs for the application."
                                </p>
                            </div>
                            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                                    AI-Optimized (Metric-Driven):
                                </span>
                                <p className="text-xs text-emerald-200 font-medium">
                                    "Architected 12+ reusable React UI components, cutting latency by 35% and improving engagement."
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

            </section>

            {/* STATS BANNER */}
            <section className="py-12 border-y border-white/10 bg-[#080e20]">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                        <div className="text-3xl sm:text-4xl font-black text-indigo-400">75%</div>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1">Resumes screened out by ATS</p>
                    </div>
                    <div>
                        <div className="text-3xl sm:text-4xl font-black text-emerald-400">85%+</div>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1">Average score boost after AI</p>
                    </div>
                    <div>
                        <div className="text-3xl sm:text-4xl font-black text-blue-400">200+</div>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1">Tech skills & frameworks indexed</p>
                    </div>
                    <div>
                        <div className="text-3xl sm:text-4xl font-black text-purple-400">&lt; 15s</div>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1">Instant deep backend analysis</p>
                    </div>
                </div>
            </section>

            {/* THREE SIMPLE STEPS */}
            <section id="features" className="py-20 sm:py-28 px-5 sm:px-8 max-w-[1200px] mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-[2px] text-indigo-400">
                        Effortless 3-Step Process
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
                        How ResumeAI Works
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base">
                        From raw document to interview-ready resume in three simple steps.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            step: "01",
                            title: "Upload Your Resume",
                            desc: "Drop your existing resume in PDF, Word DOCX, or text format. Text is extracted directly into memory.",
                            icon: <FileCheck className="w-6 h-6 text-indigo-400" />
                        },
                        {
                            step: "02",
                            title: "Paste Job Requirements",
                            desc: "Paste the job description of your target role so the engine can extract core keywords and qualifications.",
                            icon: <Target className="w-6 h-6 text-blue-400" />
                        },
                        {
                            step: "03",
                            title: "Get ATS Optimization",
                            desc: "Review your detailed ATS score, missing keyword gaps, section health checks, and bullet point upgrades.",
                            icon: <Zap className="w-6 h-6 text-purple-400" />
                        }
                    ].map((card) => (
                        <div
                            key={card.step}
                            className="p-8 rounded-2xl border border-white/10 bg-[#0c1325] hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 relative group"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                                    {card.icon}
                                </div>
                                <span className="text-3xl font-black text-slate-700 group-hover:text-indigo-400/30 transition-colors">
                                    {card.step}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* BOTTOM CALL TO ACTION BANNER */}
            <section className="py-20 px-5 sm:px-8">
                <div className="max-w-5xl mx-auto rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-blue-900/30 via-indigo-900/30 to-purple-900/30 p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-3xl sm:text-5xl font-black text-white">
                            Ready to Pass the ATS Screening?
                        </h2>
                        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
                            Scan your resume in seconds, uncover blind spots, and start landing more callbacks today.
                        </p>
                        <div className="pt-2">
                            <Link
                                href="/analyze"
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 font-bold text-white shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all"
                            >
                                <Sparkles className="w-5 h-5" />
                                <span>Get Your Free ATS Score Now</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
